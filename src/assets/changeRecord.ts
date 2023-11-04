export type ChangeRecordItemType = {
  title: string,
  date: string,
  content: string
}

export type ChangeRecordType = {
  first: number,
  entries: ChangeRecordItemType[]
}

export const getChangeRecords = () => {
  return changeRecord.entries.slice(0, changeRecord.first);
}

const changeRecord: ChangeRecordType = {
  "first": 4,
  "entries": [
    {
      "title": "משחקי 'אני עושה'",
      "date": "4-11-2023",
      "content": " אני רוחץ ידיים, הולך לשרותים ומסתדר בבוקר בהם הילד מסדר תמונות של פעולותיו על-פי סדר עשייתן הנכון"
    },
    {
      "title": "אפשרות להחביא את תפריט השליטה",
      "date": "2-11-2023",
      "content": "כניסה חדשה בקצה משמאל המאפשרת להחביא את התפריט. התפריט מוחלף בכניסה חיוורת מימין למעלה המאפשרת לפתוח אותו שוב"
    },
    {
      "title": "בחירת פריטים להתאמה במשחקי ההתאמה",
      "date": "31-10-2023",
      "content": "לחיצה על גלגל השניים פותחת רשימה של כל האפשרויות של הפריטים להתאמה (צבעים, אותיות,...). ניתן לבחור עד 10 פריטים מהרשימה. פריטים אלה יופיעו במשחק"
    },
    {
      "title": "משחק חדש",
      "date": "31-10-2023",
      "content": "התאמת תמונות לאותיות"
    }
  ]
}