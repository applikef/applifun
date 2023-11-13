export type SortGameDescriptorType = {
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