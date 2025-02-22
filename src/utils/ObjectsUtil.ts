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
    if (array.length > 1) {
      do {
        for (let i = shuffledArray.length - 1; i > 0; i--) { 
          const j = Math.floor(Math.random() * (i + 1)); 
          [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; 
        } 
      } while (ObjectsUtil.equalByValue(shuffledArray, array))
    }
    return shuffledArray; 
  }; 

  public static getArrayOfNumbers = (length: number) => {
    return Array.from(Array(length).keys())
  }

  public static generateRandomNumbers(min: number, max: number, numberOfNumbers: number): Array<number> {
    let arr = new Array<number>();
    let i = 0;
    while (i < numberOfNumbers) {
      let n = Math.floor(Math.random() * (max - min + 1)) + min;
      if (arr.includes(n)) {
        continue;
      }
      else {
        arr.push(n);
        i++;
      }
    }
    return arr;
  }

  // Used and tested for simple elements as strings
  public static equalByValue = (arr1: any[], arr2: any[]) => {
    if (arr1.length !== arr2.length) {
      return false;
    }

    for (let i=0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  }

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

  public static getEntityById(store: Array<any>, id: string): any | undefined {
    for (let i=0; i < store.length; i++) {
      if (store[i].id === id) {
        return store[i];
      }
    }
    return undefined;
  }

  public static getEntityIndexById(store: Array<any>, id: string): number {
    for (let i=0; i < store.length; i++) {
      if (store[i].id === id) {
        return i;
      }
    }
    return -1;
  }

  public static getNextIndexInBooleanArray(arrayOfIndices: boolean[], currentIndex: number): number | undefined {
    if (arrayOfIndices.length <= currentIndex + 1) {
      return undefined
    }

    let tmpArray = Array(arrayOfIndices.length).fill(-1);
    tmpArray = tmpArray.map((e,i) => (i > currentIndex && arrayOfIndices[i] === true) ? i : -1);
    tmpArray = tmpArray.filter((e) => e > 0);
    
    return tmpArray && tmpArray.length > 0 ? tmpArray[0] : undefined;
  }

}