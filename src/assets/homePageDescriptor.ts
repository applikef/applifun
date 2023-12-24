export type PointType = {
  x: string;
  y: string;
}

export type HomePageItemType = {
  id: string;
  label: string;
  path: string;
  media?: string;
  height?: number;
}

export type HomePageSectionType = {
  title?: string;
  media?: string;
  mobile?: boolean;
  items: HomePageItemType[];
}

export const homePageDescriptor: HomePageSectionType[] = [
  {
    title: "חֶשְׁבּוֹן",
    media: "resources/images/numbers-splash.png",
    items: [
      {
        id: "numberMatch",
        label: "אֵיפֹה יֵשׁ מִסְפָּר?",
        path: "/launch?gameId=numberMatch",
        media: "resources/images/find-number-game.png",
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
        id: "iCount",
        label: "מִסְפָּרִים בְּתוֹר",
        path: "/launch?gameId=iCount",
        media: "resources/images/order-numbers-game.png",
        height: 100
      }
    ]
  },
  {
    title: "קוֹרְאִים",
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
        id: "iWriteWords",
        label: "מִלִּים מְבֻלְבָּלוֹת",
        path: "/launch?gameId=iWriteWords",
        media: "resources/images/order-letters-game.png",
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
        id: "moodSort",
        label: "מַּרְגִּישִׁים",
        path: "/launch?gameId=moodSort",
        media: "resources/images/feelings-sort.png",
        height: 100
      },
    ]
  },
  {
    title: "הָעַכְבָּר שֶׁלִּי",
    media: "resources/images/mouse.png",
    items: [
      {
        id: "mouseJumpingShapeClick",
        label: "מִרְדָּף עַכְבָּר",
        path: "/launch?gameId=mouseJumpingShapeClick",
        media: "resources/images/mouse-frog-chase.png",
        height: 100
      }
    ]
  },
  {
    title: "מִשְׁתַּלְּבִים",
    media: "resources/images/more-games.png",
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
        label: "מָה עוֹשִׂים?",
        path: "/launch?gameId=behaviorSelect",
        media: "resources/images/mood.png",
        height: 100
      },
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
      }
    ]
  }
];