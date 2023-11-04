export type PointType = {
  x: string;
  y: string;
}

export type HomePageItemType = {
  id: string;
  label: string;
  path: string;
  media: string;
  height?: number;
}

export type HomePageSectionType = {
  title?: string;
  items: HomePageItemType[];
}

export const homePageDescriptor: HomePageSectionType[] = [
  {
    items: [
      {
        id: "colorMatch",
        label: "מוֹצְאִים תְּמוּנוֹת בְּצֶבַע",
        path: "/launch?gameId=colorMatch",
        media: "resources/images/colors-splash.png",
        height: 100
      },
      {
        id: "numberMatch",
        label: "סוֹפְרִים דְּבָרִים",
        path: "/launch?gameId=numberMatch",
        media: "resources/images/numbers-splash.png",
        height: 100
      },
      {
        id: "letterMatch",
        label: "מוֹצְאִים אוֹתִיּוֹת",
        path: "/launch?gameId=letterMatch",
        media: "resources/images/letters-splash.png",
        height: 100
      }
    ]
  },
  {
    "title": "אֲנִי עוֹשֶׂה",
    "items": [
      {
        id: "washHands",
        label: "שׁוֹטֵף יָדַיִם",
        path: "/launch?gameId=washHands",
        media: "resources/images/wash-hands.jpg",
        height: 100
      },
      {
        id: "bathroomRoutine",
        label: "הוֹלֵךְ לַשֵּׁרוּתִים",
        path: "/launch?gameId=bathroomRoutine",
        media: "resources/images/toilet.jpg",
        height: 100
      },
      {
        id: "morningRoutine",
        label: "מִסְתַּדֵּר בַּבֹּקֶר",
        path: "/launch?gameId=morningRoutine",
        media: "resources/images/wake-up.jpg",
        height: 100
      }
    ]
  }
];