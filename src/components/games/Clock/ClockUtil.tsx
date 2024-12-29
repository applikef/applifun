import { ClockTime, TIME_QUARTERS, TIME_SCOPE } from "../../../model/clock.types";

export class ClockUtil {
  private static clockTimeAsText: Array<string> = [
    "אַחַת",
    "שְׁתַּיִם",
    "שָׁלוֹשׁ",
    "אַרְבַּע",
    "חָמֵשׁ",
    "שֵׁשׁ",
    "שֶׁבַע",
    "שְׁמוֹנֶה",
    "תֵּשַׁע",
    "עֶשֶׂר",
    "אַחַת עֶשְׂרֵה",
    "שְׁתֵּים עֶשְׂרֵה"
  ];

  private static quartersAsText: Array<string> = [
    "וָרֶבַע",
    "וָחֵצִי",
    "רֶבַע לְ"
  ]

  private static getHour(): number {
    return Math.max(Math.floor(Math.random() * 12), 1);
  }
  
  private static getMinutes(): number {
    return Math.floor(Math.random() * 59);
  }
  
  private static getMinutesPast30(): number {
    return Math.floor(Math.random() * 28) + 31;
  }
  
  private static getQuarters(): number {
    const quarterIndex = Math.floor(Math.random() * 4);
    return (TIME_QUARTERS[quarterIndex])
  }
  
  public static getTime(scope: TIME_SCOPE): ClockTime {
    let time = new ClockTime(ClockUtil.getHour(), 0); 
    if (scope === TIME_SCOPE.HOURS_ONLY) {
      return time;
    }
    else if (scope === TIME_SCOPE.MINUTES) {
      time.setMinutes(ClockUtil.getMinutes());
      return time;
    }
    else if (scope === TIME_SCOPE.MINUTES_PAST_30) {
      time.setMinutes(ClockUtil.getMinutesPast30());
      return time;
    }
    else if (scope === TIME_SCOPE.QUARTERS) {
      time.setMinutes(ClockUtil.getQuarters());
      return time;
    }
    return time;
  }

  public static getTimeScope(scopeAsString: string): TIME_SCOPE {    
    switch (scopeAsString) {
      case "HOURS_ONLY": {
        return TIME_SCOPE.HOURS_ONLY;
      }
      case "QUARTERS": {
        return TIME_SCOPE.QUARTERS;
      }
      case "MINUTES": {
        return TIME_SCOPE.MINUTES;
      }
      case "MINUTES_PAST_30": {
        return TIME_SCOPE.MINUTES_PAST_30;
      }
    }
    return TIME_SCOPE.HOURS_ONLY;
  }
  
  public static getTimeAsText(scope: TIME_SCOPE, time: ClockTime): string {
    const timeAsString: string = `${ClockUtil.clockTimeAsText[time.getHour()-1]}`;
    switch (scope) {
      case TIME_SCOPE.HOURS_ONLY: {
        return timeAsString;
      }
      case TIME_SCOPE.QUARTERS: {
        let quarterIndex = TIME_QUARTERS.indexOf(time.getMinutes());
        if (quarterIndex > 0 && quarterIndex < 3) {
          return `${timeAsString} ${ClockUtil.quartersAsText[quarterIndex -1]}`;
        }
        else if (quarterIndex === 3) {
          return `${ClockUtil.quartersAsText[2]}${ClockUtil.clockTimeAsText[time.getHour()]}`
        }
        else {
          return timeAsString;
        }
      }
      case TIME_SCOPE.MINUTES: {
        if (time.getMinutes() > 0) {
          return `${timeAsString} ו-${time.getMinutes()} דקות`;
        }
        else {
          return timeAsString;
        }
      }
    }
    return timeAsString;
  }

  public static getOptionTimes(scope: TIME_SCOPE, numberOfOptions: number): Array<ClockTime> {
    let options: Array<ClockTime> = new Array(numberOfOptions);
    // Enforce unqiness
    options[0] = ClockUtil.getTime(scope);
    for (let i=1; i < numberOfOptions; i++) {
      let newOption = ClockUtil.getTime(scope);
      let unique = false;
      while (!unique) {
        newOption = ClockUtil.getTime(scope);
        for (let j=0; j < Math.max(0,i); j++) {
          if (options[j].isEqual(newOption)) {   
            unique = false;         
            break;
          }
          else {
            unique = true;
          }
        }
      }
      options[i] = newOption;
    }
    return options;
  }

  public static minutesToString(minutes: number): string {
    let minutesAsString = minutes.toString();
    if (minutesAsString.length === 2) {
      return minutesAsString;
    }
    return `0${minutesAsString}`;
  }
}