export type ChangeRecordItemType = {
  title: string,
  date: string,
  content: string
}

export type ChangeRecordType = {
  first: number,
  entries: ChangeRecordItemType[]
}

export const getChangeRecords = (): ChangeRecordItemType[] => {
  return changeRecord.entries.slice(0, changeRecord.first);
}

export const getAllChangeRecords = (): ChangeRecordItemType[] => {
  return changeRecord.entries;
}

const changeRecord: ChangeRecordType = {
  "first": 3,
  "entries": [
    {
      "title": "רשימת עידכוני משחקים",
      "date": "9-11-2023",
      "content": "ניתן לפתוח רשימה מלאה של עידכוני משחקים מעמוד הבית בנוסף לרשימת השינויים האחרונים שנפתחת מעמוד הכניסה"
    },
    {
      "title": "תמיכה בקול",
      "date": "9-11-2023",
      "content": "הוספת אפשרות להפעיל או להפסיק את התגובות הקוליות מתפריט השליטה של כל משחק"
    },
    {
      "title": "שיפור במשחקי ההתאמה",
      "date": "8-11-2023",
      "content": "תמונה שנבחרת ומתאימה במשחקי ההתאמה מוסרת מאוסף התמונות שמוצגות על המסך"
    },
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