export interface LinkListDescriptorType {
  gameId: string;
  title: string;
  href: string;
  hrefTitle: string;
}

export interface MatchDescriptorType {
  gameId: string;
  titleTemplate: string;
  titleVariableValues: string[];
  groupIds: string[];
  groupFiles?: string[];
  groupNames: string[];
  images: string[];
  imageGroupIds: string[];
  buttonTitle: string;
}