import { GameDescriptorType } from "./componentDescriptors.types";

export interface SortGameDescriptorType extends GameDescriptorType {
  titleTemplate: string;
  groups: SortGameGroupType[];
  entities: SortGameImageType[];
  selectGroupMessage?: string;
}

export type SortGameGroupType = {
  id: string;
  title: string;
  file?: string;
  cursor?: string;
  image?: string;
}

export type SortGameImageType = {
  id: string;
  title: string;
  file: string;
  groupId: string;
}