export const activeMembers = [
  'albert van der Meij',
  'Anja Versteegen',
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
  'Hans van de Lest',
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
  return [...activeMembers, ...honoraryMembers]
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
  'Astrid Kasteleijn': '/images/astrid kasteleijn.jpg',
  'Astrid Sanders': '/images/Astrid Sanders zwart-wit.jpg',
  'Bert van Zijderveld': '/images/bert vna zijderveld.jpg',
  'Bianca Dekkers - van Uden': '/images/bianca dekker.jpg',
  'Corrie Cobussen': '/images/corrie cobussen.jpg',
  'Hans Haarsma': '/images/hans haarsma.jpg',
  'Ine Janssen': '/images/ine janssen.jpg',
  'Inge Pfeil': '/images/inge pfeil.jpg',
  'Jan Cobussen': '/images/jan cobussen.jpg',
  'Jos de Vaan': '/images/jos de vaan.jpg',
  'Karin Kalmar': '/images/Karin kalmar.jpg',
  'Marlies Reimering': '/images/marlies reimering.jpg',
  'Rob Hendriks': '/images/rob hendriks zwart-wit.jpg',
  'Ruud Cox': '/images/ruud cox.jpg',
  'Ton Leideritz': '/images/ton leideritz.jpg'
}

export function getMemberPhoto(name: string): string {
  if (memberPhotos[name]) {
    return memberPhotos[name]
  }
  
  const initials = getInitials(name)
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=200&background=1a1a1a&color=d4af37&bold=true&font-size=0.5`
}

export const memberEmails: Record<string, string> = {
  'albert van der Meij': 'hobby-Ab@outlook.com',
  'Anja Versteegen': 'fotomuis@outlook.com',
  'Anne-Marie Dennissen': 'amdennissen@gmail.com',
  'Ans Heisen': 'ans.heisen@gmail.com',
  'Astrid Kasteleijn': 'akasteleijn@telfort.nl',
  'Astrid Sanders': 'apemsanders01@hetnet.nl',
  'Bert van Zijderveld': 'vanzijderveld@gmail.com',
  'Bianca Dekkers - van Uden': 'biancadekkersvanuden@gmail.com',
  'Cocky Anderson': 'Cocky.anderson@gmail.com',
  'Corrie Cobussen': 'corrie0755@gmail.com',
  'Doris van de Laak': 'dorisvandelaak@hotmail.com',
  'Eva Veraa': 'evaveraa@hotmail.com',
  'Frank van den Broek': 'frankswinebrook@hotmail.com',
  'Gerhard Bod': 'gtpbod@hotmail.com',
  'Hans Haarsma': 'hans.haarsma@gmail.com',
  'Hans van de Lest': 'hansvdlest@hotmail.com',
  'Helen Henskens': 'h.henskens@gmail.com',
  'Henk Regeling': 'henk.regeling@gmail.com',
  'Ine Janssen': 'inepenm@gmail.com',
  'Inge Pfeil': 'pfeil011@gmail.com',
  'Jos de Vaan': 'ploinkie@gmail.com',
  'Jos Verleg': 'jos.verleg@gmail.com',
  'Karin Kalmar': 'skatingkarin@gmail.com',
  'Karin Kruithof': 'karbo91@hotmail.com',
  'Lize Dekkers': 'lize.dekkers.22@gmail.com',
  'Marlies Reimering': 'marliesr3@gmail.com',
  'Plony Bos': 'plbos05@yahoo.com',
  'Renate van den Hoorn': 'renatevdhoorn@gmail.com',
  'Rob Hendriks': 'robby.hendriks@kpnmail.nl',
  'Ron Cuppes': 'rcuppes@gmail.com',
  'Ruud Cox': 'ruudcox@telfort.nl',
  'Sandra van Kampen': 'sandra_kampen@hotmail.com',
  'Theo Dennissen': 'tawdennissen@gmail.com',
  'Tiemen Meertens': 'tiemenreload@live.nl',
  'Ton Leideritz': 'tleideritz@gmail.com',
  'Willeke Buijssen': 'W.buijssen@planet.nl'
}

export function getMemberEmail(name: string): string | undefined {
  return memberEmails[name]
}
