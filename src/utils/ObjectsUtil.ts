export class ObjectsUtil {
  public static isNotSet = (object: any): boolean => {
    return object === undefined || 
      object === null || 
      (typeof(object) === 'string' && object.length === 0) ||     
      (typeof(object) === 'number' && Number.isNaN(Number(object)));     

  }

  public static isSet = (object: any): boolean => {
    return !this.isNotSet(object);     
  }

  public static getEnumKeyByEnumValue = (myEnum: any, enumValue?: string): any | undefined => {
    if (!enumValue) {
      return undefined;
    }

    let keys = Object.keys(myEnum).filter(x => myEnum[x] === enumValue);
    return keys.length > 0 ? keys[0] : undefined;
  }

  private static compareNumbers = (a: number, b: number) => {
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    }
    // a must be equal to b
    return 0;
  }

public static sortNumbers = (array: number[]) => {
    let orderedNumbers = [...array];
    orderedNumbers.join();
    orderedNumbers.sort(this.compareNumbers);
    return orderedNumbers;
  }

  public static shuffleArrayItems = (array: any[]) => { 
    let shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; 
    } 
    return shuffledArray; 
  }; 

  public static emptyString(str: string) {
    return str === undefined || str.length === 0;
  }

  public static getTitle(titleTemplate: string, titleVariableValue: string) {
    const titleAsArray = titleTemplate.split("$");
    if (titleAsArray.length < 3) {
      return "";
    }    
    return titleAsArray[0] + titleVariableValue + titleAsArray[2];
  }


}