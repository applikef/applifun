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
      "title": "משחקים ללג בעומר",
      "date": "11-05-2025",
      "content": "משחקי שפה - קריאה וכתיבה של מילים, התאמת אות ראשונה ומילים מבולבלות; מדרש תמונה - מה בתמונה"
    },
    {
      "title": "משחק מיקום",
      "date": "23-02-2025",
      "content": "לימוד מושגים של מיקום יחסי: על, מתחת, ליד וכו'"
    },
    {
      "title": "מדרש תמונה",
      "date": "15-02-2025",
      "content": "שאלות על תוכן של תמונה. משחק ראשון עם תמונות פורים"
    },
    {
      "title": "משחקי קריאה לפורים",
      "date": "14-02-2025",
      "content": "רשימת מילים לפורים למשחקים קוראים מילים, מי מתחיל באות ומילים מבולבלות. שימוש ברשימה נעשה בבחירת הנושא פורים במסך הכניסה"
    },
    {
      "title": "משחק חשבון חדש",
      "date": "02-02-2025",
      "content": "איזה מספר אני? - על הילד להקליד את המספר שמתואר במספר היחידות, עשרות ומאות שבו"
    },
    {
      "title": "מי מתחיל באות, מילים מבולבלות",
      "date": "29-01-2025",
      "content": "רשימת מילים נוצרת אקרעית מהתמונות בקטלוג התמונות. בנוסף נושא של 'רשימות מוגדרות מראש' מספק את רשימת המילים הקבועה"
    },
    {
      "title": "קוראים מילים",
      "date": "28-01-2025",
      "content": "רשימת מילים נוצרת אקרעית מהתמונות בקטלוג התמונות. בנוסף נושא של 'רשימות מוגדרות מראש' מספק את רשימת המילים הקבועה"
    },
    {
      "title": "שפת המספרים",
      "date": "24-01-2025",
      "content": "תמיכה במשחק בתחום העשרת, המאה או האלף"
    },
    {
      "title": "שפת המספרים",
      "date": "16-01-2025",
      "content": "הוספת להקצאת מספר חדש מתוך המסך של המשחק"
    },
    {
      "title": "לימוד שעון",
      "date": "16-01-2025",
      "content": "הוספת שעון מחוגים למסך הלימוד של שעון"
    },
    {
      "title": "סדר היום שלי",
      "date": "16-01-2025",
      "content": "עדכון הפעילויות והזמנים שלהן"
    },
    {
      "title": "הרחבת מספרים בתור",
      "date": "15-01-2025",
      "content": "הרחבת טווח המספרים לסידור עד 10000"
    },
    {
      "title": "ארבעה משחקי שעון חדשים",
      "date": "12-01-2025",
      "content": "מה השעה ואיזה שעון לשעון דיגיטלי וסדר היום שלי לשעון מחוגים ולשעון דיגיטלי"
    },
    {
      "title": "הוספת תמיכה לחומר סיוע ללימוד",
      "date": "10-01-2025",
      "content": "במסך הבית אחרי הבחירה בשעון נוסף סמל של מורה ולוח. הקלה על הסמל פותחת עמוד עזר ללימוד קריאת שעות בשעון דיגיטלי"
    },
    {
      "title": "עדכון עמוד הבית",
      "date": "08-01-2025",
      "content": "שינוי מספר שמות של קבוצות (קוראים לשפה, עושים לכישורי חיים) הכנסת משחקי הקבוצה מרגישים לקבוצה כישורי חיים"
    },
    {
      "title": "משחק חדש: מילים נרדפות",
      "date": "08-01-2025",
      "content": "משחק ללמידת מילים נרדפות בקבוצת המשחקים קוראים"
    },
    {
      "title": "השלמת משחק מה השעה",
      "date": "29-12-2024",
      "content": "למשחק מה השעה? - הוספת תמיכה בדקות וברבעי שעות שלמות"
    },
    {
      "title": "השלמת משחק בחירת השעון",
      "date": "28-12-2024",
      "content": "למשחק איזה שעון? - הוספת תמיכה בדקות וברבעי שעות שלמות"
    },
    {
      "title": "משחקים חדשים - שעון",
      "date": "22-12-2024",
      "content": "מה השעה? - הילד בוחר את השעה שמראה שעון מחוגים. איזה שעון? - הילד בוחר את השעון שמראה את השעה המצויינת בראש העמוד. בגרסה זאת נתמכות שעות שלמות"
    },
    {
      "title": "מלים של סתיו וחנוכה ליתר משחקי הקריאה",
      "date": "10-12-2024",
      "content": "רשימת מלים מעודכנת למשחקים מילים מבולבלות ומי מתחיל באות, משתמש קרול"
    },
    {
      "title": "מלים של סתיו וחנוכה למשחק הקריאה",
      "date": "07-12-2024",
      "content": "רשימת מלים מעודכנת למשחק קוראים מלים, משתמש קרול"
    },
    {
      "title": "עידכונים לתחילת שימוש בכתה",
      "date": "05-12-2024",
      "content": "הורדת שאלה של יום והוספת שם משתמש כדי לאפשר מאפייני משחקים שונים למשתמשים שונים"
    },
    {
      "title": "הוספת שאלה של יום",
      "date": "09-10-2024",
      "content": "הוספת שאלה של יום כעמוד פתיחה לאפליקציה"
    },
    {
      "title": "הוספת יכולת לתרגום",
      "date": "29-08-2024",
      "content": "הוספת תמיכה לתרגום למספר שפות להוכחת היתכנות."
    },
    {
      "title": "הוספת משחק לציור",
      "date": "15-08-2024",
      "content": "משחק חדש: ציור על-ידי מתן הוראות למחשב"
    },
    {
      "title": "משחק חדש: קריאת מלים",
      "date": "15-08-2024",
      "content": "משחק חדש בקבוצת קוראים לזיהוי מלים שלמות"
    },
    {
      "title": "שיפור תצוגה על מכשירים קטנים",
      "date": "31-07-2024",
      "content": "שיפור תמיכה בזיהוי גודל מסך ושיפור התנהגות עמוד הבית ומספר משחקים"
    },
    {
      "title": "מייל לשליחת הערות",
      "date": "19-07-2024",
      "content": "הוספת מייל לתקשורת לעמוד הבית"
    },
    {
      "title": "משחק חשבון חדש",
      "date": "16-06-2024",
      "content": "מה אומר המספר מלמד על הייצוגים השונים של מספרים מ-1 עד 100: מילולי, כמותי, מספרים"
    },
    {
      "title": "מסכים קטניים",
      "date": "09-06-2024",
      "content": "שיפור LAYOUT על מסכים קטנים והוספת חץ המורה על תפריט המשנה בעמוד הבית"
    },
    {
      "title": "מסך כניסה",
      "date": "07-06-2024",
      "content": "מסך הכניסה הוא התפריט הראשי ולכן מאפשר REFRESH במידת הצורך"
    },
    {
      "title": "הוספת הוראות לחשבון - סופרים",
      "date": "06-06-2024",
      "content": "הוספת הוראות קוליות (על-פי המספר בהוראה) למשחק סופרים במשחקי החשבון"
    },
    {
      "title": "הוספת הוראות למשחקי העכבר",
      "date": "03-03-2024",
      "content": "הוספת הוראות (טקסט וקוליות) למשחק מרדף העכבר"
    },
    {
      "title": "הוספת קול להוראות כתובות",
      "date": "25-02-2024",
      "content": "הוספת הוראות קוליות למשחק מלים מבולבלות ולמשחקי עושים"
    },
    {
      "title": "הוספת ניקוד למילים מבולבלות",
      "date": "05-02-2024",
      "content": "הוספת ניקוד למילים שמוצגות בראש העמוד"
    },
    {
      "title": "הוספת קול למילים מבולבלות",
      "date": "04-02-2024",
      "content": "ניתן להקיש על אייקון של השמעת קול כדי לשמוע את המילה נאמרת"
    },
    {
      "title": "משחק חדש: בתי הצורות",
      "date": "15-01-2024",
      "content": "מיון תמונות של עצמים לפי צורתם לריבועים, מלבנים, משולשים ועיגולים"
    },
    {
      "title": "משחק מרגישים חדש: כשאני מרגיש",
      "date": "14-01-2024",
      "content": "הילד בוחר תמונות המתאימות לפעולות שעוזרות לו במצבי רוח שונים - עצוב, כועס, רעב. את מצבי הרוח ניתן לבחור בהגדרות המשחק"
    },
    {
      "title": "החזרת משחק רגשות ראשון משופר",
      "date": "10-01-2024",
      "content": "איך הם מרגישים מראה את הרגשות אחד אחרי השני ומאפשר לבחור בהגדרות חלק מהרגשות"
    },
    {
      "title": "שיפורים לאחר שיחה עם גלי",
      "date": "31-12-2023",
      "content": "שיפור המשוב הקולי והויזואלי, שינוי כיוון המספרים כשמסדרים אותם, הוספת המילה הנכונה באותיות מבולבלות, שיפור התמונות של ההליכה לשירותים, הסתרת משחקי הרגשות עד שיושלמו "
    },
    {
      "title": "משחקים חדשים",
      "date": "25-12-2023",
      "content": "התאמת תמונות למצב רוח והתאמת התנהגויות ראויות למצב רוח. ניתן להגדיר את מצב הרוח הנוכחי דרך ניהול המשחק"
    },
    {
      "title": "משחקים חדשים",
      "date": "25-12-2023",
      "content": "התאמת תמונות למצב רוח והתאמת התנהגויות ראויות למצב רוח. ניתן להגדיר את מצב הרוח הנוכחי דרך ניהול המשחק"
    },
    {
      "title": "עזרה",
      "date": "5-12-2023",
      "content": "הוספת עזרה כללית במסך הכניסה ולכל משחק בתפריט הניהול שלו"
    },
    {
      "title": "משחק חדש: מיומניות עכבר",
      "date": "3-12-2023",
      "content": "צפרדע קופצת ממקום למקום ועל הילד להקיש עליה על-פי המוגדר למשחק: לעמוד עם העכבר מעליה, לחיצת עכבר, או לחיצה כפולה. בהגדרות ניתן להגדיר את גודל הצפרדע"
    },
    {
      "title": "שיפור מסך הבית למסכים גדולים",
      "date": "27-11-2023",
      "content": "אוסף המשחקים ייראה ישירות על מסך גדול (הקשה אחת נדרשת לכניסה למשחק) ובהיררכיה של נושאים (נדרשת הקשה על נושא ובתוכו על המשחק הרצוי) עך מסך קטן"
    },
    {
      "title": "משחקי חשבון: הרחבה למספרים בתור",
      "date": "27-11-2023",
      "content": "ניתן לסדר מספר סדרות מספרים בסדר עולה או יורד ולבחור חלק מהסדרות למשחק. הבחירות דרך הקשה על גלגל השיניים למעלה מימין"
    },
    {
      "title": "משחק חדש: אותיות מבולבלות",
      "date": "19-11-2023",
      "content": "אותיות של מלים שונות המתארות עצמים המוצגים בתמונות מוצגות בסדר מבולבל ועל הילד לסדר אותן"
    },
    {
      "title": "הוספת משחקי מיון",
      "date": "14-11-2023",
      "content": "משחקי מיון חדשים לפי מספרים וצבעים. מספר המשחקים שגדל הביא לשינוי מסך הבית כך שיאפשר התנהלות עם משחקים רבים"
    },
    {
      "title": "עידכוני משחקים",
      "date": "10-11-2023",
      "content": "ממסך הבית ניתן לפתוח רשימה של כל עידכוני המשחקים. זאת בנוסף לעדכונים האחרונים אותם ניתן לראות ממסך הכניסה"
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