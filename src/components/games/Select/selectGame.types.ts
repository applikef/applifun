import { GameDescriptorType } from "../../componentDescriptors.types";

export type SelectGameGroupType = {
  id: string;
  title: string;
  file?: string;
  cursor?: string;
  image?: string;
}

export interface SelectGameDescriptorType extends GameDescriptorType {
  titleTemplate: string;
  groups: SelectGameGroupType[];
  entities: SelectGameImageType[];
  selectGroupMessage?: string;
}

export type SelectGameImageType = {
  id: string;
  title: string;
  file: string;
  // The groups for which the image is valid
  validGroupIds: Array<string>;
  // The groups in which this image will be presented. 
  // If undefined the image will be presented in all groups
  groupIds?: Array<string>;
}