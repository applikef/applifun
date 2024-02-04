import { GameDescriptorType } from "../../componentDescriptors.types";

export interface SequenceDescriptorType extends GameDescriptorType {
  title?: string;
  settingsTitle?: string,
}

export interface ImageSequenceDescriptorType extends SequenceDescriptorType {
  images: ImageDescriptorType[];
}

export interface ImageDescriptorType {
  id: string,
  title: string,
  name?: string;
  file: string;
}

export interface LetterSequenceDescriptorType extends SequenceDescriptorType {
  words: WordDescriptorType[];
}

export interface WordDescriptorType {
  id: string,
  title: string,
  name: string,
  file: string;
  audio?: string;
}

export interface NumberSequenceDescriptorType extends SequenceDescriptorType {
  numberLists: NumberListDescriptorType[];
}

// Either range or values should be specified. If both are specified range is ignored
export interface NumberListDescriptorType {
  id: string,
  name: string,
  range?: number[];
  values?: number[]
}