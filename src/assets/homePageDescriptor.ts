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
    label: "מוצא צבעים",
    path: "/launch?gameId=colorMatch",
    media: "resources/images/colorSplashes.png",
    position: {
      x: "180px",
      y: "150px"
    },
    height: 150
  },
  {
    id: "numberMatch",
    label: "סופר",
    path: "/launch?gameId=numberMatch",
    media: "resources/images/numbersSplash.png",
    position: {
      x: "180px",
      y: "450px"
    },
    height: 150
  }
];