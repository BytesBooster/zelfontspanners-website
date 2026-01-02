export const activeMembers = [
  'albert van der Meij',
  'Anja Versteegen',
  'Ann van rijn',
  'Anne-Marie Dennissen',
  'Ans Heisen',
  'Astrid Kasteleijn',
  'Astrid Sanders',
  'Bert van Zijderveld',
  'Bianca Dekkers - van Uden',
  'Cocky Anderson',
  'Corrie Cobussen',
  'Doris van de Laak',
  'Eva Veraa',
  'Frank van den Broek',
  'Gerhard Bod',
  'Hans Haarsma',
  'Hans van dfe Lest',
  'Helen Henskens',
  'Henk Regeling',
  'Ine Janssen',
  'Inge Pfeil',
  'Jan Cobussen',
  'Jos de Vaan',
  'Jos Verleg',
  'Karin Kalmar',
  'Karin Kruithof',
  'Lize Dekkers',
  'Marlies Reimering',
  'Plony Bos',
  'Renate van den Hoorn',
  'Rob Hendriks',
  'Ron Cuppes',
  'Ruud Cox',
  'Sandra van Kampen',
  'Theo Dennissen',
  'Tiemen Meertens',
  'Ton Leideritz',
  'Willeke Buijssen',
  'Tim Cobussen'
]

export const honoraryMembers: string[] = []

export function getAllMembers(): string[] {
  return ['Admin', ...activeMembers, ...honoraryMembers]
}

export function getInitials(name: string): string {
  const parts = name.split(' ')
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }
  return name.substring(0, 2).toUpperCase()
}

export const memberPhotos: Record<string, string> = {
  'Ans Heisen': '/images/ans heisen.jpg',
  'Astrid Sanders': '/images/Astrid Sanders zwart-wit.jpg',
  'Bert van Zijderveld': '/images/bert vna zijderveld.jpg',
  'Ine Janssen': '/images/ine janssen.jpg',
  'Inge Pfeil': '/images/inge pfeil.jpg',
  'Karin Kalmar': '/images/Karin kalmar.jpg',
  'Rob Hendriks': '/images/rob hendriks zwart-wit.jpg',
  'Ruud Cox': '/images/ruud cox.jpg'
}

export function getMemberPhoto(name: string): string {
  if (memberPhotos[name]) {
    return memberPhotos[name]
  }
  
  const initials = getInitials(name)
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=200&background=1a1a1a&color=d4af37&bold=true&font-size=0.5`
}
