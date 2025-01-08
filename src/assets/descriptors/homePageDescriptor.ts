export type PointType = {
  x: string;
  y: string;
}

export type HomePageItemType = {
  id: string;
  label: string;
  path: string;
  hide?: boolean;
  media?: string;
  height?: number;
}

export type HomePageSectionType = {
  title?: string;
  media?: string;
  mobile?: boolean;
  hide?: boolean;
  items: HomePageItemType[];
}

export const homePageDescriptor: HomePageSectionType[] = [
  {
    title: "MyMouseTitle",
    media: "resources/images/mouse.png",
    items: [
      {
        id: "mouseJumpingShapeClick",
        label: "MyMouseLabel",
        path: "/launch?gameId=mouseJumpingShapeClick",
        media: "resources/images/mouse-frog-chase.png",
        height: 100
      }
    ]
  },
  {
    title: "MathTitle",
    media: "resources/images/numbers-splash.png",
    items: [
      {
        id: "numberLanguagesShow",
        label: "MathNumberLanguages",
        path: "/launch?gameId=numberLanguagesShow",
        media: "resources/images/number-languages-show-game.png",
        height: 100
      },
      {
        id: "numberMatch",
        label: "MathCounting",
        path: "/launch?gameId=numberMatch",
        media: "resources/images/find-number-game.png",
        height: 100
      },
      {
        id: "iCount",
        label: "MathNumbersInLine",
        path: "/launch?gameId=iCount",
        media: "resources/images/order-numbers-game.png",
        height: 100
      }
    ]
  },
  {
    title: "שָׂפָה",
    media: "resources/images/letters-splash.png",
    items: [
      {
        id: "letterMatch",
        label: "מִי מַתְחִיל בְּאוֹת?",
        path: "/launch?gameId=letterMatch",
        media: "resources/images/find-letter-game.png",
        height: 100
      },
      {
        id: "wordMatch",
        label: "קוֹרְאִים מִלִּים",
        path: "/launch?gameId=wordMatch",
        media: "resources/images/words-game.png",
        height: 100
      },
      {
        id: "iWriteWords",
        label: "מִלִּים מְבֻלְבָּלוֹת",
        path: "/launch?gameId=iWriteWords",
        media: "resources/images/order-letters-game.png",
        height: 100
      },
      {
        id: "synonymsPairs",
        label: "מִלִּים נִרְדָּפוֹת",
        path: "/launch?gameId=synonymsPairs",
        media: "resources/images/synonyms-game.png",
        height: 100
      }
    ]
  },
  {
    title: "כִּישּׁוּרֵי חַיִּים",
    media: "resources/images/more-games.png",
    items: [
      {
        id: "washHands",
        label: "שׁוֹטְפִים יָדַיִם",
        path: "/launch?gameId=washHands",
        media: "resources/images/wash-hands.jpg",
        height: 100
      },
      {
        id: "bathroomRoutine",
        label: "הוֹלְכִים לַשֵּׁרוּתִים",
        path: "/launch?gameId=bathroomRoutine",
        media: "resources/images/toilet.jpg",
        height: 100
      },
      {
        id: "morningRoutine",
        label: "מִסְתַּדְּרִים בַּבֹּקֶר",
        path: "/launch?gameId=morningRoutine",
        media: "resources/images/wake-up.jpg",
        height: 100
      },
      {
        id: "moodSelect",
        label: "אֵיךְ הֵם מַרְגִּישִׁים?",
        path: "/launch?gameId=moodSelect",
        media: "resources/images/feelings.jpg",
        height: 100
      },
      {
        id: "behaviorSelect",
        label: "כְּשֶׁאֲנִי מַרְגִּישׁ",
        path: "/launch?gameId=behaviorSelect",
        media: "resources/images/mood.png",
        height: 100
      }
    ]
  },
  {
    title: "שָׁעוֹן",
    media: "resources/images/clock.png",
    items: [
      {
        id: "whatIsTheTimeAnalog",
        label: "מָה הַשָּׁעָה?",
        path: "/launch?gameId=whatIsTheTimeAnalog",
        media: "resources/images/timeAnalog.png",
        height: 100
      },
      {
        id: "selectClockAnalog",
        label: "אֵיזֶה שָׁעוֹן?",
        path: "/launch?gameId=selectClockAnalog",
        media: "resources/images/clocksAnalog.png",
        height: 100
      },
      {
        id: "myScheduleAnalog",
        label: "סֵדֶר הַיּוֹם שֶׁלִּי - שְׁעוֹן מְחוֹגִים",
        path: "/launch?gameId=myScheduleAnalog",
        media: "resources/images/scheduleAnalog.png",
        height: 100,
        hide: true
      },
      {
        id: "myScheduleDigital",
        label: "סֵדֶר הַיּוֹם שֶׁלִּי - שָׁעוֹן דִּיגִיטָלִי",
        path: "/launch?gameId=myScheduleDigital",
        media: "resources/images/scheduleDigital.png",
        height: 100,
        hide: true
      }
    ]
  },
  {
    title: "מַרְגִּישִׁים",
    media: "resources/images/feeling-transparent.png",
    hide: true,
    items: [
      {
        id: "moodSelect",
        label: "אֵיךְ הֵם מַרְגִּישִׁים?",
        path: "/launch?gameId=moodSelect",
        media: "resources/images/feelings.jpg",
        height: 100
      },
      {
        id: "behaviorSelect",
        label: "כְּשֶׁאֲנִי מַרְגִּישׁ",
        path: "/launch?gameId=behaviorSelect",
        media: "resources/images/mood.png",
        height: 100
      }
    ]
  },
  {
    title: "מְמַיְּנִים",
    media: "resources/images/sort-games.png",
    items: [
      {
        id: "colorMatch",
        label: "מוֹצְאִים תְּמוּנוֹת בְּצֶבַע",
        path: "/launch?gameId=colorMatch",
        media: "resources/images/find-color-game.png",
        height: 100
      },
      {
        id: "colorSort",
        label: "בָּתֵּי הַצְּבָעִים",
        path: "/launch?gameId=colorSort",
        media: "resources/images/sort-by-color-game.png",
        height: 100
      },
      {
        id: "numberSort",
        label: "בָּתֵּי הַמִּסְפָּרִים",
        path: "/launch?gameId=numberSort",
        media: "resources/images/sort-by-number-game.png",
        height: 100
      },
      {
        id: "shapeSort",
        label: "בָּתֵּי הַצּוּרוֹת",
        path: "/launch?gameId=shapeSort",
        media: "resources/images/shape-sort-game.png",
        height: 100
      },
      {
        id: "moodSort",
        label: "מַּרְגִּישִׁים",
        path: "/launch?gameId=moodSort",
        media: "resources/images/feelings-sort.png",
        height: 100
      },
    ]
  },
  {
    /* hide: true, */
    title: "מְצַיְּרִים",
    media: "resources/images/pencil128.png",
    items: [
      {
        id: "codePlay",
        label: "מְצַיְּרִים",
        path: "/launch?gameId=codePlay",
        media: "resources/images/pencil128.png",
      }
    ]
  }
];