export interface GameDescriptorType {
  gameId: string;
}

export interface LinkListDescriptorType extends GameDescriptorType {
  title: string;
  href: string;
  hrefTitle: string;
}
export interface MatchDescriptorType extends GameDescriptorType {
  titleTemplate: string;
  titleVariableValues: string[];
  groupIds: string[];
  groupFiles?: string[];
  groupNames: string[];
  images: string[];
  imageGroupIds: string[];
  settingsTitle: string;
}
export interface TileDescriptorType extends GameDescriptorType {
  title: string;
  href: string;
  hrefTitle: string;
  media: string;
}
