import { GameDescriptorType } from "../../componentDescriptors.types";

export interface SelectGameDescriptorType extends GameDescriptorType {
  titleTemplate: string;
  groups: SelectGameGroupType[];
  entities: SelectGameImageType[];
  selectGroupMessage?: string;
}

export type SelectGameGroupType = {
  id: string;
  title: string;
  file?: string;
  cursor?: string;
  image?: string;
}

export type SelectGameImageType = {
  id: string;
  title: string;
  file: string;
  groupIds: Array<string>;
}