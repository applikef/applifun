import { MatchDescriptorType } from "../model/componentDescriptors.types";

export class QuizUtil {

  private static getQuizDescriptorFileName(): string {
    const quizCatalog: Array<any> = require("./../assets/quizCatalog.json");
    const date = new Date().getDate();

    const gameTypeIndex: number = date % quizCatalog.length;

    const gameDescriptors: Array<any> = quizCatalog[gameTypeIndex].descriptors;
    const quizIndex = date % gameDescriptors.length;

    const fileName = gameDescriptors[quizIndex].file;

    return fileName;
  }

  public static getMatchQuizDescriptor(): MatchDescriptorType {
    const fileName: string = QuizUtil.getQuizDescriptorFileName();
    const descriptor = require(`./../assets/descriptors/dayQuizDescriptors/${fileName}`);

    return descriptor;
  }
}