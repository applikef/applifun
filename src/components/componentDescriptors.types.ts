export interface GameDescriptorType {
  gameId: string;
}

export interface LinkListDescriptorType extends GameDescriptorType {
  title: string;
  href: string;
  hrefTitle: string;
}

export interface MatchGroup {
  id: string;
  title?: string;
  name: string;
  image?: string;
}

export interface MatchItem {
  id: string;
  title: string;
  image: string;
  groupId: string;
}

export interface MatchDescriptorType extends GameDescriptorType {
  titles?: string[];
  titleAudioKeys?: string[];
  titleAudioHover?: string;
  titleTemplate?: string;
  titleVariableValues?: string[];
  groups: MatchGroup[];
  items: MatchItem[];
  settingsTitle: string;
}

export interface TileDescriptorType extends GameDescriptorType {
  title: string;
  href: string;
  hrefTitle: string;
  media: string;
}
