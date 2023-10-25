export type PointType = {
  x: string;
  y: string;
}

export type HomePageDescriptorType = {
  id: string;
  label: string;
  path: string;
  media: string;
  position: PointType;
  height?: number;
}

export const homePageDescriptor: HomePageDescriptorType[] = [
  {
    id: "colorMatch",
    label: "מוֹצְאִים תְּמוּנוֹת בְּצֶבַע",
    path: "/launch?gameId=colorMatch",
    media: "applifun/resources/images/colorSplashes.png",
    position: {
      x: "180px",
      y: "150px"
    },
    height: 200
  },
  {
    id: "numberMatch",
    label: "סוֹפְרִים דְּבָרִים",
    path: "/launch?gameId=numberMatch",
    media: "applifun/resources/images/numbersSplash.png",
    position: {
      x: "550px",
      y: "150px"
    },
    height: 200
  }
];