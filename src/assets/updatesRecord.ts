export type UpdateRecordItemType = {
  title: string,
  date: string,
  content: string
}

export type UpdateRecordType = {
  first: number,
  entries: UpdateRecordItemType[]
}

export const getUpdateRecords = () => {
  return updateRecord.entries.slice(0, updateRecord.first);
}

const updateRecord: UpdateRecordType = {
  "first": 3,
  "entries": [
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