export interface GameDescriptorType {
  gameId: string;
}

export interface LinkListDescriptorType extends GameDescriptorType {
  title: string;
  href: string;
  hrefTitle: string;
}
export interface MatchDescriptorType extends GameDescriptorType {
  titles?: string[];
  titleAudioKeys?: string[];
  titleAudioHover?: string;
  titleTemplate?: string;
  titleVariableValues?: string[];
  groupIds: string[];
  groupFiles?: string[];
  groupNames: string[];
  images: string[];
  imageTitles?: string[];
  imageGroupIds: string[];
  settingsTitle: string;
}
export interface TileDescriptorType extends GameDescriptorType {
  title: string;
  href: string;
  hrefTitle: string;
  media: string;
}
