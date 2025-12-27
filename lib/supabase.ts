import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials niet gevonden. Portfolio metadata wordt niet opgeslagen.')
}

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey, {
      db: {
        schema: 'public',
      },
      global: {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      },
    })
  : null

// Portfolio metadata interface
export interface PortfolioPhoto {
  id?: string
  member_name: string
  cloudinary_url: string
  cloudinary_public_id: string
  title: string
  display_order: number
  created_at?: string
  updated_at?: string
}

// Functies voor portfolio metadata
export async function savePhotoMetadata(photo: Omit<PortfolioPhoto, 'id' | 'created_at' | 'updated_at'>) {
  if (!supabase) {
    console.warn('Supabase niet geconfigureerd, sla op in localStorage')
    return { success: false, error: 'Supabase niet geconfigureerd' }
  }

  try {
    const { data, error } = await supabase
      .from('portfolio_photos')
      .insert([photo])
      .select()
      .single()

    if (error) {
      console.error('Supabase insert error:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error: any) {
    console.error('Error saving photo metadata:', error)
    return { success: false, error: error.message }
  }
}

export async function getMemberPhotos(memberName: string): Promise<PortfolioPhoto[]> {
  if (!supabase) {
    return []
  }

  try {
    const { data, error } = await supabase
      .from('portfolio_photos')
      .select('*')
      .eq('member_name', memberName)
      .order('display_order', { ascending: true })

    if (error) {
      console.error('Supabase select error:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error getting member photos:', error)
    return []
  }
}

export async function updatePhotoMetadata(id: string, updates: Partial<PortfolioPhoto>) {
  if (!supabase) {
    return { success: false, error: 'Supabase niet geconfigureerd' }
  }

  try {
    const { data, error } = await supabase
      .from('portfolio_photos')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Supabase update error:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error: any) {
    console.error('Error updating photo metadata:', error)
    return { success: false, error: error.message }
  }
}

export async function deletePhotoMetadata(id: string) {
  if (!supabase) {
    return { success: false, error: 'Supabase niet geconfigureerd' }
  }

  try {
    const { error } = await supabase
      .from('portfolio_photos')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Supabase delete error:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error: any) {
    console.error('Error deleting photo metadata:', error)
    return { success: false, error: error.message }
  }
}

export async function updatePhotoOrder(memberName: string, photoIds: string[]) {
  if (!supabase) {
    return { success: false, error: 'Supabase niet geconfigureerd' }
  }

  try {
    // Update display_order voor elke foto
    const updates = photoIds.map((id, index) => ({
      id,
      display_order: index,
    }))

    for (const update of updates) {
      await supabase
        .from('portfolio_photos')
        .update({ display_order: update.display_order, updated_at: new Date().toISOString() })
        .eq('id', update.id)
    }

    return { success: true }
  } catch (error: any) {
    console.error('Error updating photo order:', error)
    return { success: false, error: error.message }
  }
}

// Haal alle foto's op van alle leden (voor hero slider)
export async function getAllPhotos(): Promise<PortfolioPhoto[]> {
  if (!supabase) {
    return []
  }

  try {
    // Haal alle foto's op met paginatie om de 1000-row limit te omzeilen
    let allPhotos: PortfolioPhoto[] = []
    let from = 0
    const pageSize = 1000
    let hasMore = true

    while (hasMore) {
      const { data, error } = await supabase
        .from('portfolio_photos')
        .select('*')
        .order('created_at', { ascending: false })
        .range(from, from + pageSize - 1)

      if (error) {
        console.error('Supabase select error:', error)
        break
      }

      if (data && data.length > 0) {
        allPhotos = allPhotos.concat(data)
        from += pageSize
        hasMore = data.length === pageSize
      } else {
        hasMore = false
      }
    }

    return allPhotos
  } catch (error) {
    console.error('Error getting all photos:', error)
    return []
  }
}

// ============================================
// PHOTO LIKES FUNCTIES
// ============================================

export interface PhotoLike {
  id?: string
  photo_id: string
  user_name: string
  created_at?: string
}

// Helper functie om public_id te extraheren uit Cloudinary URL
function extractPublicIdFromUrl(url: string): string {
  try {
    // Format: https://res.cloudinary.com/cloud_name/image/upload/v123/public_id.jpg
    const urlObj = new URL(url)
    const pathParts = urlObj.pathname.split('/')
    const uploadIndex = pathParts.indexOf('upload')
    
    if (uploadIndex !== -1 && pathParts.length > uploadIndex + 2) {
      // Skip 'v123' versie nummer, neem alles daarna en verwijder extensie
      const publicId = pathParts.slice(uploadIndex + 2).join('/').replace(/\.[^/.]+$/, '')
      return publicId
    }
  } catch (e) {
    // Ignore
  }
  return ''
}

export async function getPhotoLikes(photoId: string): Promise<string[]> {
  if (!supabase) {
    // Fallback naar localStorage
    if (typeof window !== 'undefined') {
      const likesData = JSON.parse(localStorage.getItem('photoLikes') || '{}')
      return likesData[photoId] || []
    }
    return []
  }

  try {
    // Probeer eerst met de opgegeven photoId
    let { data, error } = await supabase
      .from('photo_likes')
      .select('user_name')
      .eq('photo_id', photoId)

    if (error) {
      console.error('Supabase select error:', error)
      // Fallback naar localStorage
      if (typeof window !== 'undefined') {
        const likesData = JSON.parse(localStorage.getItem('photoLikes') || '{}')
        return likesData[photoId] || []
      }
      return []
    }

    let likes = (data || []).map(like => like.user_name)
    
    // Als er geen likes gevonden zijn, probeer ook met alternatieve photoId formaten
    // (voor backwards compatibility met oude data)
    if (likes.length === 0) {
      // Als photoId een URL is, probeer de public_id te extraheren
      if (photoId.includes('cloudinary.com')) {
        const extractedPublicId = extractPublicIdFromUrl(photoId)
        if (extractedPublicId) {
          const { data: altData } = await supabase
            .from('photo_likes')
            .select('user_name')
            .eq('photo_id', extractedPublicId)
          if (altData && altData.length > 0) {
            likes = altData.map(like => like.user_name)
          }
        }
      }
      
      // Probeer ook met localStorage als fallback
      if (likes.length === 0 && typeof window !== 'undefined') {
        const likesData = JSON.parse(localStorage.getItem('photoLikes') || '{}')
        if (likesData[photoId] && likesData[photoId].length > 0) {
          return likesData[photoId]
        }
      }
    }

    return likes
  } catch (error) {
    console.error('Error getting photo likes:', error)
    // Fallback naar localStorage
    if (typeof window !== 'undefined') {
      const likesData = JSON.parse(localStorage.getItem('photoLikes') || '{}')
      return likesData[photoId] || []
    }
    return []
  }
}

export async function togglePhotoLike(photoId: string, userName: string): Promise<boolean> {
  if (!supabase) {
    // Fallback naar localStorage
    if (typeof window !== 'undefined') {
      const likesData = JSON.parse(localStorage.getItem('photoLikes') || '{}')
      if (!likesData[photoId]) {
        likesData[photoId] = []
      }
      const likes = likesData[photoId]
      const index = likes.indexOf(userName)
      if (index > -1) {
        likes.splice(index, 1)
      } else {
        likes.push(userName)
      }
      localStorage.setItem('photoLikes', JSON.stringify(likesData))
      return index === -1 // Return true if liked, false if unliked
    }
    return false
  }

  try {
    // Check if like exists (gebruik geen .single() om 406 errors te voorkomen)
    const { data: existing, error: selectError } = await supabase
      .from('photo_likes')
      .select('id')
      .eq('photo_id', photoId)
      .eq('user_name', userName)
      .limit(1)

    if (selectError) {
      console.error('Supabase select error:', selectError)
      return false
    }

    if (existing && existing.length > 0) {
      // Unlike
      const { error } = await supabase
        .from('photo_likes')
        .delete()
        .eq('photo_id', photoId)
        .eq('user_name', userName)

      if (error) {
        console.error('Supabase delete error:', error)
        return false
      }
      return false // Unliked
    } else {
      // Like
      const { error } = await supabase
        .from('photo_likes')
        .insert([{ photo_id: photoId, user_name: userName }])

      if (error) {
        console.error('Supabase insert error:', error)
        return false
      }
      return true // Liked
    }
  } catch (error) {
    console.error('Error toggling photo like:', error)
    return false
  }
}

// ============================================
// PHOTO COMMENTS FUNCTIES
// ============================================

export interface PhotoComment {
  id?: string
  photo_id: string
  user_name: string
  text: string
  parent_comment_id?: string | null
  created_at?: string
  replies?: PhotoComment[]
}

// Batch functie om alle likes voor meerdere foto's tegelijk op te halen
export async function getBatchPhotoLikes(photoIds: string[]): Promise<Record<string, string[]>> {
  if (!supabase || photoIds.length === 0) {
    return {}
  }

  try {
    // Gebruik .in() om alle photo_ids in één query op te halen
    const { data, error } = await supabase
      .from('photo_likes')
      .select('photo_id, user_name')
      .in('photo_id', photoIds)

    if (error) {
      console.error('Supabase batch select error:', error)
      return {}
    }

    // Groepeer likes per photo_id
    const likesMap: Record<string, string[]> = {}
    photoIds.forEach(id => {
      likesMap[id] = []
    })

    if (data) {
      data.forEach((like: { photo_id: string; user_name: string }) => {
        if (!likesMap[like.photo_id]) {
          likesMap[like.photo_id] = []
        }
        likesMap[like.photo_id].push(like.user_name)
      })
    }

    return likesMap
  } catch (error) {
    console.error('Error getting batch photo likes:', error)
    return {}
  }
}

// Batch functie om alle comments voor meerdere foto's tegelijk op te halen
export async function getBatchPhotoComments(photoIds: string[]): Promise<Record<string, PhotoComment[]>> {
  if (!supabase || photoIds.length === 0) {
    return {}
  }

  try {
    // Gebruik .in() om alle photo_ids in één query op te halen
    const { data, error } = await supabase
      .from('photo_comments')
      .select('*')
      .in('photo_id', photoIds)
      .order('created_at', { ascending: true })

    if (error) {
      console.error('Supabase batch select error:', error)
      return {}
    }

    // Groepeer comments per photo_id en organiseer in parent-child structuur
    const commentsMap: Record<string, PhotoComment[]> = {}
    photoIds.forEach(id => {
      commentsMap[id] = []
    })

    if (data) {
      const comments = (data || []) as PhotoComment[]
      
      // Organize comments into parent-child structure per photo
      const commentsById: Record<string, PhotoComment> = {}
      
      // Eerst maak alle comments aan met lege replies array
      comments.forEach(comment => {
        commentsById[comment.id || ''] = { ...comment, replies: [] }
      })
      
      // Dan organiseer ze per photo_id
      comments.forEach(comment => {
        const photoId = comment.photo_id
        if (!commentsMap[photoId]) {
          commentsMap[photoId] = []
        }
        
        if (!comment.parent_comment_id) {
          // Parent comment - voeg toe aan de lijst voor deze photo
          const parentComment = commentsById[comment.id || '']
          if (parentComment) {
            commentsMap[photoId].push(parentComment)
          }
        }
      })
      
      // Voeg replies toe aan hun parent comments
      comments.forEach(comment => {
        if (comment.parent_comment_id) {
          // Reply - zoek de parent comment in alle photos
          const parentId = comment.parent_comment_id
          const parentComment = commentsById[parentId]
          
          if (parentComment) {
            if (!parentComment.replies) {
              parentComment.replies = []
            }
            const replyComment = commentsById[comment.id || '']
            if (replyComment) {
              parentComment.replies.push(replyComment)
            }
          }
        }
      })
      
      // Sorteer replies binnen elke parent
      Object.values(commentsMap).forEach(photoComments => {
        photoComments.forEach(parent => {
          if (parent.replies && parent.replies.length > 0) {
            parent.replies.sort((a, b) => {
              const dateA = a.created_at ? new Date(a.created_at).getTime() : 0
              const dateB = b.created_at ? new Date(b.created_at).getTime() : 0
              return dateA - dateB
            })
          }
        })
      })
    }

    return commentsMap
  } catch (error) {
    console.error('Error getting batch photo comments:', error)
    return {}
  }
}

export async function getPhotoComments(photoId: string): Promise<PhotoComment[]> {
  if (!supabase) {
    // Fallback naar localStorage
    if (typeof window !== 'undefined') {
      const commentsData = JSON.parse(localStorage.getItem('photoComments') || '{}')
      return commentsData[photoId] || []
    }
    return []
  }

  try {
    // Probeer eerst met de opgegeven photoId
    let { data, error } = await supabase
      .from('photo_comments')
      .select('*')
      .eq('photo_id', photoId)
      .order('created_at', { ascending: true })

    if (error) {
      console.error('Supabase select error:', error)
      // Fallback naar localStorage
      if (typeof window !== 'undefined') {
        const commentsData = JSON.parse(localStorage.getItem('photoComments') || '{}')
        return commentsData[photoId] || []
      }
      return []
    }

    let comments = (data || []) as PhotoComment[]
    
    // Als er geen comments gevonden zijn, probeer ook met alternatieve photoId formaten
    // (voor backwards compatibility met oude data)
    if (comments.length === 0) {
      // Als photoId een URL is, probeer de public_id te extraheren
      if (photoId.includes('cloudinary.com')) {
        const extractedPublicId = extractPublicIdFromUrl(photoId)
        if (extractedPublicId) {
          const { data: altData } = await supabase
            .from('photo_comments')
            .select('*')
            .eq('photo_id', extractedPublicId)
            .order('created_at', { ascending: true })
          if (altData && altData.length > 0) {
            comments = altData as PhotoComment[]
          }
        }
      }
      
      // Probeer ook met localStorage als fallback
      if (comments.length === 0 && typeof window !== 'undefined') {
        const commentsData = JSON.parse(localStorage.getItem('photoComments') || '{}')
        if (commentsData[photoId] && commentsData[photoId].length > 0) {
          return commentsData[photoId]
        }
      }
    }

    // Organize comments into parent-child structure
    const parentComments = comments.filter(c => !c.parent_comment_id)
    const replies = comments.filter(c => c.parent_comment_id)

    // Attach replies to parent comments
    parentComments.forEach(parent => {
      parent.replies = replies
        .filter(reply => reply.parent_comment_id === parent.id)
        .sort((a, b) => {
          const dateA = a.created_at ? new Date(a.created_at).getTime() : 0
          const dateB = b.created_at ? new Date(b.created_at).getTime() : 0
          return dateA - dateB
        })
    })

    // Als er geen comments gevonden zijn, probeer ook localStorage (voor backwards compatibility)
    if (parentComments.length === 0 && typeof window !== 'undefined') {
      const commentsData = JSON.parse(localStorage.getItem('photoComments') || '{}')
      if (commentsData[photoId] && commentsData[photoId].length > 0) {
        return commentsData[photoId]
      }
    }

    return parentComments
  } catch (error) {
    console.error('Error getting photo comments:', error)
    // Fallback naar localStorage
    if (typeof window !== 'undefined') {
      const commentsData = JSON.parse(localStorage.getItem('photoComments') || '{}')
      return commentsData[photoId] || []
    }
    return []
  }
}

export async function addPhotoComment(photoId: string, userName: string, text: string, parentCommentId?: string | null): Promise<PhotoComment | null> {
  if (!supabase) {
    // Fallback naar localStorage
    if (typeof window !== 'undefined') {
      const commentsData = JSON.parse(localStorage.getItem('photoComments') || '{}')
      if (!commentsData[photoId]) {
        commentsData[photoId] = []
      }

      const comment: PhotoComment = {
        id: `comment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        photo_id: photoId,
        user_name: userName,
        text,
        parent_comment_id: parentCommentId || null,
        created_at: new Date().toISOString(),
        replies: []
      }

      if (parentCommentId) {
        // Find parent comment and add reply
        const parentIndex = commentsData[photoId].findIndex((c: PhotoComment) => c.id === parentCommentId)
        if (parentIndex !== -1) {
          if (!commentsData[photoId][parentIndex].replies) {
            commentsData[photoId][parentIndex].replies = []
          }
          commentsData[photoId][parentIndex].replies.push(comment)
        }
      } else {
        commentsData[photoId].push(comment)
      }

      localStorage.setItem('photoComments', JSON.stringify(commentsData))
      return comment
    }
    return null
  }

  try {
    const { data, error } = await supabase
      .from('photo_comments')
      .insert([{
        photo_id: photoId,
        user_name: userName,
        text,
        parent_comment_id: parentCommentId || null
      }])
      .select()
      .single()

    if (error) {
      console.error('Supabase insert error:', error)
      return null
    }

    return data as PhotoComment
  } catch (error) {
    console.error('Error adding photo comment:', error)
    return null
  }
}

export async function deletePhotoComment(commentId: string): Promise<boolean> {
  if (!supabase) {
    return false
  }

  try {
    const { error } = await supabase
      .from('photo_comments')
      .delete()
      .eq('id', commentId)

    if (error) {
      console.error('Supabase delete error:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error deleting photo comment:', error)
    return false
  }
}

// ============================================
// FOTO VAN DE MAAND FUNCTIES
// ============================================

export interface FotoSubmission {
  id?: string
  month_key: string
  photographer: string
  title: string
  cloudinary_url: string
  cloudinary_public_id: string
  upload_date?: string
  excursion_id?: string | null
  excursion_title?: string | null
  excursion_location?: string | null
  excursion_date?: string | null
}

export interface FotoVote {
  id?: string
  submission_id: string
  voter_name: string
  created_at?: string
}

export async function getFotoSubmissions(monthKey: string): Promise<FotoSubmission[]> {
  if (!supabase) {
    // Fallback naar localStorage
    if (typeof window !== 'undefined') {
      const submissions = JSON.parse(localStorage.getItem('fotoVanDeMaandSubmissions') || '{}')
      const monthData = submissions[monthKey] || { submissions: [] }
      return monthData.submissions || []
    }
    return []
  }

  try {
    const { data, error } = await supabase
      .from('foto_van_de_maand_submissions')
      .select('*')
      .eq('month_key', monthKey)
      .order('upload_date', { ascending: false })

    if (error) {
      console.error('Supabase select error:', error)
      // Fallback naar localStorage
      if (typeof window !== 'undefined') {
        const submissions = JSON.parse(localStorage.getItem('fotoVanDeMaandSubmissions') || '{}')
        const monthData = submissions[monthKey] || { submissions: [] }
        return monthData.submissions || []
      }
      return []
    }

    return (data || []) as FotoSubmission[]
  } catch (error) {
    console.error('Error getting foto submissions:', error)
    // Fallback naar localStorage
    if (typeof window !== 'undefined') {
      const submissions = JSON.parse(localStorage.getItem('fotoVanDeMaandSubmissions') || '{}')
      const monthData = submissions[monthKey] || { submissions: [] }
      return monthData.submissions || []
    }
    return []
  }
}

export async function addFotoSubmission(submission: Omit<FotoSubmission, 'id' | 'upload_date'>): Promise<FotoSubmission | null> {
  if (!supabase) {
    // Fallback naar localStorage
    if (typeof window !== 'undefined') {
      const submissions = JSON.parse(localStorage.getItem('fotoVanDeMaandSubmissions') || '{}')
      const monthData = submissions[submission.month_key] || { submissions: [] }

      const newSubmission: FotoSubmission = {
        ...submission,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        upload_date: new Date().toISOString()
      }

      monthData.submissions.push(newSubmission)
      submissions[submission.month_key] = monthData
      localStorage.setItem('fotoVanDeMaandSubmissions', JSON.stringify(submissions))
      return newSubmission
    }
    return null
  }

  try {
    const { data, error } = await supabase
      .from('foto_van_de_maand_submissions')
      .insert([submission])
      .select()
      .single()

    if (error) {
      console.error('Supabase insert error:', error)
      return null
    }

    return data as FotoSubmission
  } catch (error) {
    console.error('Error adding foto submission:', error)
    return null
  }
}

export async function getFotoVotes(submissionId: string): Promise<string[]> {
  if (!supabase) {
    return []
  }

  try {
    const { data, error } = await supabase
      .from('foto_van_de_maand_votes')
      .select('voter_name')
      .eq('submission_id', submissionId)

    if (error) {
      console.error('Supabase select error:', error)
      return []
    }

    return (data || []).map(vote => vote.voter_name)
  } catch (error) {
    console.error('Error getting foto votes:', error)
    return []
  }
}

export async function toggleFotoVote(submissionId: string, voterName: string): Promise<boolean> {
  if (!supabase) {
    return false
  }

  try {
    // Check if vote exists
    const { data: existing } = await supabase
      .from('foto_van_de_maand_votes')
      .select('id')
      .eq('submission_id', submissionId)
      .eq('voter_name', voterName)
      .single()

    if (existing) {
      // Unvote
      const { error } = await supabase
        .from('foto_van_de_maand_votes')
        .delete()
        .eq('submission_id', submissionId)
        .eq('voter_name', voterName)

      if (error) {
        console.error('Supabase delete error:', error)
        return false
      }
      return false // Unvoted
    } else {
      // Vote
      const { error } = await supabase
        .from('foto_van_de_maand_votes')
        .insert([{ submission_id: submissionId, voter_name: voterName }])

      if (error) {
        console.error('Supabase insert error:', error)
        return false
      }
      return true // Voted
    }
  } catch (error) {
    console.error('Error toggling foto vote:', error)
    return false
  }
}

export async function deleteFotoSubmission(submissionId: string): Promise<boolean> {
  if (!supabase) {
    return false
  }

  try {
    const { error } = await supabase
      .from('foto_van_de_maand_submissions')
      .delete()
      .eq('id', submissionId)

    if (error) {
      console.error('Supabase delete error:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error deleting foto submission:', error)
    return false
  }
}

// ============================================
// AGENDA EVENTS
// ============================================

export interface AgendaEventSupabase {
  id: string
  title: string
  date: string
  time?: string | null
  location?: string | null
  description?: string | null
  icon?: string
  created_by: string
  created_at: string
  updated_at: string
}

export async function getAgendaEvents(): Promise<AgendaEventSupabase[]> {
  if (!supabase) {
    console.warn('Supabase niet geconfigureerd')
    return []
  }

  try {
    const { data, error } = await supabase
      .from('agenda_events')
      .select('*')
      .order('date', { ascending: true })
      .order('time', { ascending: true, nullsFirst: false })

    if (error) {
      console.error('Supabase select error:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error fetching agenda events:', error)
    return []
  }
}

export async function addAgendaEvent(event: Omit<AgendaEventSupabase, 'id' | 'created_at' | 'updated_at'>): Promise<AgendaEventSupabase | null> {
  if (!supabase) {
    console.warn('Supabase niet geconfigureerd')
    return null
  }

  try {
    const { data, error } = await supabase
      .from('agenda_events')
      .insert([event])
      .select()
      .single()

    if (error) {
      console.error('Supabase insert error:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error adding agenda event:', error)
    return null
  }
}

export async function deleteAgendaEvent(eventId: string): Promise<boolean> {
  if (!supabase) {
    return false
  }

  try {
    const { error } = await supabase
      .from('agenda_events')
      .delete()
      .eq('id', eventId)

    if (error) {
      console.error('Supabase delete error:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error deleting agenda event:', error)
    return false
  }
}

// ============================================
// USER ACCOUNTS
// ============================================

export interface UserAccountSupabase {
  id: string
  member_name: string
  password_hash: string
  must_change_password: boolean
  created_at: string
  updated_at: string
  last_password_change?: string | null
}

export async function getUserAccount(memberName: string): Promise<UserAccountSupabase | null> {
  if (!supabase) {
    return null
  }

  try {
    const { data, error } = await supabase
      .from('user_accounts')
      .select('*')
      .eq('member_name', memberName)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        // Geen account gevonden - dit is OK
        return null
      }
      // Negeer network errors (CORS, 502, etc.) - account bestaat mogelijk wel maar is niet bereikbaar
      if (error.message?.includes('Failed to fetch') || error.message?.includes('CORS') || error.code === '') {
        return null // Return null zodat fallback naar localStorage wordt gebruikt
      }
      // Alleen andere errors loggen
      if (error.code !== 'PGRST116') {
        console.error('Supabase select error:', error)
      }
      return null
    }

    return data
  } catch (error: any) {
    // Negeer network errors - account bestaat mogelijk wel maar is niet bereikbaar
    if (error?.message?.includes('Failed to fetch') || error?.message?.includes('CORS') || error?.code === 'ECONNREFUSED') {
      return null // Return null zodat fallback naar localStorage wordt gebruikt
    }
    console.error('Error fetching user account:', error)
    return null
  }
}

export async function createUserAccount(memberName: string, passwordHash: string): Promise<UserAccountSupabase | null> {
  if (!supabase) {
    return null
  }

  try {
    const { data, error } = await supabase
      .from('user_accounts')
      .insert([{
        member_name: memberName,
        password_hash: passwordHash,
        must_change_password: true
      }])
      .select()
      .single()

    if (error) {
      // Als account al bestaat (duplicate key), is dat OK - probeer het op te halen
      if (error.code === '23505' || error.message?.includes('duplicate')) {
        return await getUserAccount(memberName)
      }
      // Alleen andere errors loggen, niet duplicate key errors
      if (error.code !== '23505') {
        console.error('Supabase insert error:', error)
      }
      return null
    }

    return data
  } catch (error: any) {
    // Negeer network errors (CORS, 502, etc.) - account bestaat mogelijk al
    if (error?.message?.includes('Failed to fetch') || error?.message?.includes('CORS')) {
      // Probeer account op te halen als het mogelijk al bestaat
      return await getUserAccount(memberName)
    }
    console.error('Error creating user account:', error)
    return null
  }
}

export async function updateUserPassword(memberName: string, newPasswordHash: string): Promise<boolean> {
  if (!supabase) {
    return false
  }

  try {
    const { error } = await supabase
      .from('user_accounts')
      .update({
        password_hash: newPasswordHash,
        must_change_password: false,
        last_password_change: new Date().toISOString()
      })
      .eq('member_name', memberName)

    if (error) {
      console.error('Supabase update error:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error updating user password:', error)
    return false
  }
}

export async function checkUserMustChangePassword(memberName: string): Promise<boolean> {
  const account = await getUserAccount(memberName)
  return account?.must_change_password || false
}


