import { HOME_PAGE_PATH } from "./ConstantsUtil";

export class GeneralUtil {
  public static targetNavigationOnGameOver(isQuiz?: boolean) : string {
    return (isQuiz !== undefined && isQuiz) ? "/dayQuizDone" : HOME_PAGE_PATH;
  }
}