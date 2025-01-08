import { PAIRS_LAYOUT } from "../utils/ConstantsUtil";

export type HomePageItemType = {
  id: string;
  label: string;
  path: string;
  hide?: boolean;
  media?: string;
  height?: number;
}

export type HomePageSectionType = {
  title?: string;
  media?: string;
  mobile?: boolean;
  hide?: boolean;
  items: HomePageItemType[];
}

export interface BaseItem {
  id: string;
  title?: string;
  name: string;
}

export interface GameDescriptorType {
  gameId: string;
  helpFile?: string;
  isQuiz?: boolean;
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
  showAdvise?: boolean;
  adviseText?: string;
  maxSelectedGroups?: number;
  groups: MatchGroup[];
  items: MatchItem[];
  settingsTitle: string;
}

export interface PairsItem {
  id: string;
  title: string;
  image?: string;
};

export interface PairsTupple extends Array<[PairsItem,PairsItem]> {};

export interface PairsDescriptorType extends GameDescriptorType {
  title?: string;
  titleAudioKeys?: string[];
  titleAudioHover?: string;
  titleVariableValues?: string[];
  layout?: PAIRS_LAYOUT;
  items: PairsTupple;
  settingsTitle: string;
}

export interface ScheduleEntry {
  time: string;
  activity: String;
}

export interface ScheduleDescriptorType extends GameDescriptorType {
  title: string;
  settingsTitle: string;
  schedule: Array<ScheduleEntry>;
}

export interface TileDescriptorType extends GameDescriptorType {
  title: string;
  href: string;
  hrefTitle: string;
  media: string;
}

export interface WhatIsTheTimeAnalogDescriptorType extends GameDescriptorType {
  title: string;
  settingsTitle: string;
  hourTypes: Array<BaseItem>;
}

export interface SelectClockAnalogDescriptorType extends GameDescriptorType {
  title: string;
  settingsTitle: string;
  hourTypes: Array<BaseItem>;
}

