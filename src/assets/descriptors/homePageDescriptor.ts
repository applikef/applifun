import { HomePageSectionType } from "../../model/componentDescriptors.types";

export const homePageDescriptor: HomePageSectionType[] = [
  {
    id: "myMouse",
    title: "MyMouseTitle",
    media: "resources/images/mouse.png",
    items: [
      {
        id: "mouseJumpingShapeClick",
        label: "MyMouseLabel",
        path: "/launch?gameId=mouseJumpingShapeClick",
        media: "resources/images/mouse-frog-chase.png",
        description: "MyMouseDescription",
        height: 100
      }
    ]
  },
  {
    id: "math",
    title: "MathTitle",
    media: "resources/images/numbers-splash.png",
    items: [
      {
        id: "numberLanguagesShow",
        label: "mathNumberLanguages",
        description: "mathNumberLanguagesDescription",
        path: "/launch?gameId=numberLanguagesShow",
        media: "resources/images/number-languages-show-game.png",
        height: 100
      },
      {
        id: "whichNumberAmI",
        label: "whichNumberAmI",
        description: "whichNumberAmIDescription",
        path: "/launch?gameId=whichNumberAmI",
        media: "resources/images/which-number-am-i.png",
        height: 100
      },
      {
        id: "numberMatch",
        label: "MathCounting",
        path: "/launch?gameId=numberMatch",
        description: "MathCountingDescription",
        media: "resources/images/find-number-game.png",
        height: 100
      },
      {
        id: "iCount",
        label: "MathNumbersInLine",
        path: "/launch?gameId=iCount",
        description: "MathNumbersInLineDescription",
        media: "resources/images/order-numbers-game.png",
        height: 100
      }
    ]
  },
  {
    id: "language",
    title: "שָׂפָה",
    media: "resources/images/letters-splash.png",
    items: [
      {
        id: "wordMatch",
        label: "קוֹרְאִים מִלִּים",
        path: "/launch?gameId=wordMatch",
        description: "wordMatchDescription",
        media: "resources/images/words-game.png",
        height: 100
      },
      {
        id: "letterMatch",
        label: "מִי מַתְחִיל בְּאוֹת?",
        path: "/launch?gameId=letterMatch",
        description: "letterMatchDescription",
        media: "resources/images/find-letter-game.png",
        height: 100
      },
      {
        id: "iWriteWords",
        label: "אֲנִי כּוֹתֵב מִילִּים",
        path: "/launch?gameId=iWriteWords",
        description: "iWriteWordsDescription",
        media: "resources/images/child-typing.jpg",
        height: 100
      },
      {
        id: "scrambledWords",
        label: "מִלִּים מְבֻלְבָּלוֹת",
        path: "/launch?gameId=scrambledWords",
        description: "scrambledWordsDescription",
        media: "resources/images/order-letters-game.png",
        height: 100
      },
      {
        id: "imageQuestPosition",
        label: "אֵיפֹה אֲנִי?",
        path: "/launch?gameId=imageQuestPosition",
        description: "imageQuestPositionDescription",
        media: "resources/images/image-quest-position.png",
        height: 100
      },
      {
        id: "synonymsPairs",
        label: "מִלִּים נִרְדָּפוֹת",
        path: "/launch?gameId=synonymsPairs",
        description: "synonymsPairsDescription",
        media: "resources/images/synonyms-game.png",
        height: 100
      }
    ]
  },
  {
    id: "imageQuest",
    title: "מָה בַּתְּמוּנָה?",
    media: "resources/images/image-quest-game.png",
    items: [
      {
        id: "imageQuestSort",
        label: "סִיווּג",
        path: "/launch?gameId=imageQuestSort",
        description: "imageQuestDescription",
        media: "resources/images/image-quest-sort.png",
        height: 100
      },
      {
        id: "imageQuestQuestions",
        label: "מִדְרַשׁ תְּמוּנָה",
        path: "/launch?gameId=imageQuestQuestions",
        description: "imageQuestDescription",
        media: "resources/images/image-quest-questions.png",
        height: 100
      }
    ]
  },
  {
    id: "capabilities",
    title: "כִּישּׁוּרֵי חַיִּים",
    media: "resources/images/more-games.png",
    items: [
      {
        id: "washHands",
        label: "שׁוֹטְפִים יָדַיִם",
        path: "/launch?gameId=washHands",
        description: "washHandsDescription",
        media: "resources/images/wash-hands.jpg",
        height: 100
      },
      {
        id: "bathroomRoutine",
        label: "הוֹלְכִים לַשֵּׁרוּתִים",
        path: "/launch?gameId=bathroomRoutine",
        description: "bathroomRoutineDescription",
        media: "resources/images/toilet.jpg",
        height: 100
      },
      {
        id: "morningRoutine",
        label: "מִסְתַּדְּרִים בַּבֹּקֶר",
        path: "/launch?gameId=morningRoutine",
        description: "morningRoutineDescription",
        media: "resources/images/wake-up.jpg",
        height: 100
      },
      {
        id: "moodSelect",
        label: "אֵיךְ הֵם מַרְגִּישִׁים?",
        path: "/launch?gameId=moodSelect",
        description: "moodSelectDescription",
        media: "resources/images/feelings.jpg",
        height: 100
      },
      {
        id: "behaviorSelect",
        label: "כְּשֶׁאֲנִי מַרְגִּישׁ",
        path: "/launch?gameId=behaviorSelect",
        description: "behaviorSelectDescription",
        media: "resources/images/mood.png",
        height: 100
      }
    ]
  },
  {
    id: "clock",
    title: "שָׁעוֹן",
    media: "resources/images/clock.png",
    education: "educationClock",
    items: [
      {
        id: "whatIsTheTimeAnalog",
        label: "מָה הַשָּׁעָה?",
        path: "/launch?gameId=whatIsTheTimeAnalog",
        description: "whatIsTheTimeAnalogDescription",
        media: "resources/images/timeAnalog.png",
        height: 100
      },
      {
        id: "selectClockAnalog",
        label: "אֵיזֶה שָׁעוֹן?",
        path: "/launch?gameId=selectClockAnalog",
        description: "selectClockAnalogDescription",
        media: "resources/images/clocksAnalog.png",
        height: 100
      },
      {
        id: "whatIsTheTimeDigial",
        label: "מָה הַשָּׁעָה? שָׁעוֹן דִּיגִיטָלִי",
        path: "/launch?gameId=whatIsTheTimeDigial",
        description: "whatIsTheTimeDigitalDescription",
        media: "resources/images/timeDigital.png",
        height: 100
      },
      {
        id: "selectClockDigital",
        label: "אֵיזֶה שָׁעוֹן? שָׁעוֹן דִּיגִיטָלִי",
        path: "/launch?gameId=selectClockDigital",
        description: "selectClockDigitalDescription",
        media: "resources/images/clocksDigital.png",
        height: 100
      },
      {
        id: "myScheduleAnalog",
        label: "myScheduleAnalog",
        path: "/launch?gameId=myScheduleAnalog",
        description: "myScheduleAnalogDescription",
        media: "resources/images/scheduleAnalog.png",
        height: 100
      },
      {
        id: "myScheduleDigital",
        label: "myScheduleDigital",
        path: "/launch?gameId=myScheduleDigital",
        description: "myScheduleDigitalDescription",
        media: "resources/images/scheduleDigital.png",
        height: 100
      }
    ]
  },
  {
    id: "sort",
    title: "מְמַיְּנִים",
    media: "resources/images/sort-games.png",
    items: [
      {
        id: "colorMatch",
        label: "מוֹצְאִים תְּמוּנוֹת בְּצֶבַע",
        path: "/launch?gameId=colorMatch",
        description: "colorMatchDescription",
        media: "resources/images/find-color-game.png",
        height: 100
      },
      {
        id: "colorSort",
        label: "בָּתֵּי הַצְּבָעִים",
        path: "/launch?gameId=colorSort",
        description: "colorSortDescription",
        media: "resources/images/sort-by-color-game.png",
        height: 100
      },
      {
        id: "numberSort",
        label: "בָּתֵּי הַמִּסְפָּרִים",
        path: "/launch?gameId=numberSort",
        description: "numberSortDescription",
        media: "resources/images/sort-by-number-game.png",
        height: 100
      },
      {
        id: "shapeSort",
        label: "בָּתֵּי הַצּוּרוֹת",
        path: "/launch?gameId=shapeSort",
        description: "shapeSortDescription",
        media: "resources/images/shape-sort-game.png",
        height: 100
      },
      {
        id: "moodSort",
        label: "מַּרְגִּישִׁים",
        path: "/launch?gameId=moodSort",
        description: "moodSortDescription",
        media: "resources/images/feelings-sort.png",
        height: 100
      },
    ]
  },
  {
    /* hide: true, */
    id: "drawing",
    title: "מְצַיְּרִים",
    media: "resources/images/pencil128.png",
    items: [
      {
        id: "codePlay",
        label: "מְצַיְּרִים",
        path: "/launch?gameId=codePlay",
        description: "codePlayDescription",
        media: "resources/images/pencil128.png",
      }
    ]
  }
];