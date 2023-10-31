export type PointType = {
  x: string;
  y: string;
}

export type HomePageDescriptorType = {
  id: string;
  label: string;
  path: string;
  media: string;
  height?: number;
}

export const homePageDescriptor: HomePageDescriptorType[] = [
  {
    id: "colorMatch",
    label: "מוֹצְאִים תְּמוּנוֹת בְּצֶבַע",
    path: "/launch?gameId=colorMatch",
    media: "resources/images/colorדSplash.png",
    height: 200
  },
  {
    id: "numberMatch",
    label: "סוֹפְרִים דְּבָרִים",
    path: "/launch?gameId=numberMatch",
    media: "resources/images/numbersSplash.png",
    height: 200
  },
  {
    id: "letterMatch",
    label: "מוֹצְאִים אוֹתִיּוֹת",
    path: "/launch?gameId=letterMatch",
    media: "resources/images/lettersSplash.png",
    height: 200
  }
];