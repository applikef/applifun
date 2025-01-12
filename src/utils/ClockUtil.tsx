import { ClockTime, TIME_QUARTERS, TIME_SCOPE } from "../model/clock.types";

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

  private static getRandomHour(): number {
    return Math.floor(Math.random() * 24);
  }
  
  private static getRandomMinutes(): number {
    return Math.floor(Math.random() * 59);
  }
  
  private static getRandomMinutesPast30(): number {
    return Math.floor(Math.random() * 28) + 31;
  }
  
  private static getRandomQuarters(): number {
    const quarterIndex = Math.floor(Math.random() * 4);
    return (TIME_QUARTERS[quarterIndex])
  }
  
  public static getRandomTime(scope: TIME_SCOPE): ClockTime {
    let time = new ClockTime(ClockUtil.getRandomHour(), 0); 
    if (scope === TIME_SCOPE.HOURS_ONLY) {
      return time;
    }
    else if (scope === TIME_SCOPE.MINUTES) {
      time.setMinutes(ClockUtil.getRandomMinutes());
      return time;
    }
    else if (scope === TIME_SCOPE.MINUTES_PAST_30) {
      time.setMinutes(ClockUtil.getRandomMinutesPast30());
      return time;
    }
    else if (scope === TIME_SCOPE.QUARTERS) {
      time.setMinutes(ClockUtil.getRandomQuarters());
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
  
  public static getHourAsText(hour: number): string {
    let time = 0;
    if (hour % 12 === 0) {
      time = 12;
    }
    else {
      time = hour % 12;
    }

    return ClockUtil.clockTimeAsText[time-1];
  }

  public static getTimeIntervalText(hour: number): string {
    if (hour >= 12 && hour < 15) {
      return `בַּצָּהֳרַיִים`;    
    }
    else if (hour >= 15 && hour <= 17) {
      return `אַחַר הַצָּהֳרַיִים`;    
    }
    else if (hour >= 18 && hour <= 19) {
      return `בָּעֶרֶב`;    
    }
    else if (hour === 0 || (hour >= 20 && hour <= 24)) {
      return `בַּלַּיְלָה`;
    }
    return "";
  }

  public static getTimeAsText(scope: TIME_SCOPE, time: ClockTime): string {
    const hour = time.getHour();
    const timeAsString: string = ClockUtil.getHourAsText(hour);
    switch (scope) {
      case TIME_SCOPE.HOURS_ONLY: {
        return `${ClockUtil.getHourAsText(hour)} ${ClockUtil.getTimeIntervalText(hour)}`;
      }
      case TIME_SCOPE.QUARTERS: {
        let quarterIndex = TIME_QUARTERS.indexOf(time.getMinutes());
        if (quarterIndex > 0 && quarterIndex < 3) {
          return `${timeAsString} ${ClockUtil.quartersAsText[quarterIndex -1]} ${ClockUtil.getTimeIntervalText(hour)}`;
        }
        else if (quarterIndex === 3) {
          return `${ClockUtil.quartersAsText[2]}${ClockUtil.getHourAsText(hour+1)} ${ClockUtil.getTimeIntervalText(hour+1)}`
        }
        else {
          return `${timeAsString} ${ClockUtil.getTimeIntervalText(hour)}`;
        }
      }
      case TIME_SCOPE.MINUTES: {
        if (time.getMinutes() > 1) {
          return `${timeAsString} וְ-${time.getMinutes()} דַּקּוֹת ${ClockUtil.getTimeIntervalText(hour+1)}`;
        }
        else if (time.getMinutes() === 1) {
          return `${timeAsString} וְדַקָּה ${ClockUtil.getTimeIntervalText(hour+1)}`
        }
        else {
          return timeAsString;
        }
      }
    }
    return timeAsString;
  }

  public static getOptionTimes(scope: TIME_SCOPE, numberOfOptions: number, 
    isAnalog?: boolean,
    mandatoryEntry?: ClockTime): Array<ClockTime> {
    const localIsAnalog = isAnalog === undefined ? false : isAnalog;
    let options: Array<ClockTime> = new Array(numberOfOptions);

    // Enforce unqiness
    options[0] = mandatoryEntry ? mandatoryEntry : ClockUtil.getRandomTime(scope);

    for (let i=1; i < numberOfOptions; i++) {
      let newOption = ClockUtil.getRandomTime(scope);
      let unique = false;
      while (!unique) {
        newOption = ClockUtil.getRandomTime(scope);
        for (let j=0; j < Math.max(0,i); j++) {
          if (options[j].isEqual(newOption) || 
            (localIsAnalog && options[j].toAnalog().isEqual(newOption.toAnalog()))) {   
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

  public static timeNumberToString(minutes: number): string {
    let minutesAsString = minutes.toString();
    if (minutesAsString.length === 2) {
      return minutesAsString;
    }
    return `0${minutesAsString}`;
  }

  public static timeToDigitalClockString(time: ClockTime): string {
    return `${ClockUtil.timeNumberToString(time.getHour())}:${ClockUtil.timeNumberToString(time.getMinutes())}`;
  }

  public static digitalToClockTime(digital:string): ClockTime {
    const timeArray: Array<string> = digital.split(":");
    const hour = Number(timeArray[0]);
    const minutes = timeArray.length > 1 ? Number(timeArray[1]) : 0;
    return new ClockTime(hour, minutes);
  }
}