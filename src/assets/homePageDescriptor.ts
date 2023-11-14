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
        label: "מוֹצְאִים מִסְפָּר דְּבָרִים",
        path: "/launch?gameId=numberMatch",
        media: "resources/images/find-number-game.png",
        height: 100
      },
      {
        id: "numberSort",
        label: "סוֹפְרִים דְּבָרִים",
        path: "/launch?gameId=numberSort",
        media: "resources/images/sort-by-number-game.png",
        height: 100
      },
      {
        id: "iCount",
        label: "מְסַדְּרִים מִסְפָּרִים",
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
        label: "מוֹצְאִים אוֹתִיּוֹת",
        path: "/launch?gameId=letterMatch",
        media: "resources/images/find-letter-game.png",
        height: 100
      },
      {
        id: "iWriteWords",
        label: "מְסַדְּרִים מִלִּים",
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
        label: "מְמַיְּנִים תְּמוּנוֹת לְצֶבַע",
        path: "/launch?gameId=colorSort",
        media: "resources/images/sort-by-color-game.png",
        height: 100
      },
    ]
  },
  {
    title: "מִשְׁתַּלְּבִים",
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
      }
    ]
  }
];