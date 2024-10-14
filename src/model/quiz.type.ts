export const enum QuizGameType {
  MATCH = "Match",
  NUMBERS_SEQUENCE = "NumbersSequence",
  LETTERS_SEQUENCE = "LettersSequence",
  IMAGES_SEQUENCE = "ImagesSequence",
  SELECT = "Select",
  SORT = "Sort"
};

export interface QuizDescriptor {
  gameTypeId: QuizGameType;
  gameDescriptorFile: string;
}