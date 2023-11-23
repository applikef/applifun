export type SequenceDescriptorType = {
  title?: string;
  settingsTitle?: string,
  images?: ImageDescriptorType[];
  words?: WordDescriptorType[];
  numberLists?: NumberListDescriptorType[];
}

export type ImageDescriptorType = {
  id: string,
  title: string,
  name?: string;
  file: string;
}

export type WordDescriptorType = {
  id: string,
  title: string,
  name: string,
  file: string;
}

// Either range or values should be specified. If both are specified range is ignored
export type NumberListDescriptorType = {
  id: string,
  name: string,
  range?: number[];
  values?: number[]
}