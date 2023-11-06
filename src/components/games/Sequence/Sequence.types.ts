import { WordDescriptorType } from "../IWrite/Word.types";

export enum SequenceType {
  IMAGES = "images",
  WORD = "word",
  NUMBERS = "numbers"
}

export type SequenceDescriptorType = {
  type: SequenceType;
  title?: string;
  images?: ImageDescriptorType[];
  word?: WordDescriptorType;
  numbers?: NumbersDescriptorType;
}

export type ImageDescriptorType = {
  id: string,
  title: string,
  name?: string;
  file: string;
}

// Either range or values should be specified. If both are specified range is ignored
export type NumbersDescriptorType = {
  range?: number[];
  values?: number[]
}