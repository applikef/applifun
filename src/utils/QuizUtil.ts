import { QuizDescriptor } from "../model/quiz.type";

export class QuizUtil {
  /* Reteived to a separate function to allow testing with various and 
    consistent numbers accross all class methods */
  private static getBaseValue(): number {
    const date = new Date().getDate();
    return date;
  }

  public static getQuizDescriptor(): QuizDescriptor {
    const quizCatalog = require("./../assets/quizCatalog.json");
    const descriptors: Array<QuizDescriptor> = quizCatalog.descriptors;

    const date = QuizUtil.getBaseValue();
    const gameTypeIndex: number = date % descriptors.length;
    const quizDescriptor: QuizDescriptor = descriptors[gameTypeIndex];

    return quizDescriptor;
  }
}