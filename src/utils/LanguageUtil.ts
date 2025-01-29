export interface LetterDescriptor {
  id: string;
  title: string;
  name: string;
}

export const hebrewLetters: Array<LetterDescriptor> = [
  {
    "id": "א",
    "title": "א",
    "name": "אָלֶף"
  },
  {
    "id": "ב",
    "title": "ב",
    "name": "בֵּית"
  },
  {
    "id": "ג",
    "title": "ג",
    "name": "גִּימֶל"
  },
  {
    "id": "ד",
    "title": "ד",
    "name": "דָּלֶת"
  },
  {
    "id": "ה",
    "title": "ה",
    "name": "הֵא"
  },
  {
    "id": "ו",
    "title": "ו",
    "name": "וָו"
  },
  {
    "id": "ז",
    "title": "ז",
    "name": "זַיִן"
  },
  {
    "id": "ח",
    "title": "ח",
    "name": "חֵית"
  },
  {
    "id": "ט",
    "title": "ט",
    "name": "טֵית"
  },
  {
    "id": "י",
    "title": "י",
    "name": "יוֹד"
  },
  {
    "id": "כ",
    "title": "כ",
    "name": "כַּף"
  },
  {
    "id": "ל",
    "title": "ל",
    "name": "לָמֵד"
  },
  {
    "id": "מ",
    "title": "מ",
    "name": "מֵם"
  },
  {
    "id": "נ",
    "title": "נ",
    "name": "נוּן"
  },
  {
    "id": "ס",
    "title": "ס",
    "name": "סַמֵּךְ"
  },
  {
    "id": "ע",
    "title": "ע",
    "name": "עַיִן"
  },
  {
    "id": "פ",
    "title": "פ",
    "name": "פֵּא"
  },
  {
    "id": "צ",
    "title": "צ",
    "name": "צַדִּי"
  },
  {
    "id": "ק",
    "title": "ק",
    "name": "קוֹף"
  },
  {
    "id": "ר",
    "title": "ר",
    "name": "רֵישׁ"
  },
  {
    "id": "ש",
    "title": "ש",
    "name": "שִׁין"
  },
  {
    "id": "ת",
    "title": "ת",
    "name": "תָּו"
  }
];

export function getHerewLetter(letterId: string): LetterDescriptor | undefined {
  for (let i=0; i < hebrewLetters.length; i++) {
    if (hebrewLetters[i].id === letterId) {
      return hebrewLetters[i];
    }
  }
  console.log("getHerewLetter::unrecognized letter");
  return undefined;
}
