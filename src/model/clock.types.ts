export const enum TIME_SCOPE { 
  HOURS_ONLY, 
  MINUTES, 
  MINUTES_PAST_30, 
  QUARTERS 
}

export const TIME_QUARTERS = [0, 15, 30, 45];

export class ClockTime {
  private hour: number;
  private minutes: number;

  public constructor(hour: number, minutes: number) {
    this.hour = hour;
    this.minutes = minutes;
  }

  public getHour(): number {
    return this.hour;
  }

  public getMinutes() {
    return this.minutes;
  }
  
  public setHour(hour: number) {
    this.hour = hour;
  }

  public setMinutes(minutes: number) {
    this.minutes = minutes;
  }

  public isEqual(time: ClockTime): boolean {
    return time.hour === this.hour && time.minutes === this.minutes;
  }

  public isInClockScope(time: ClockTime, scope: TIME_SCOPE): boolean {
    switch(scope) {
      case TIME_SCOPE.MINUTES: {
        return true;
      }
      case TIME_SCOPE.HOURS_ONLY: {
        if (time.minutes === 0) {
          return true;
        }
        else {
          return false;
        }
      }
      case TIME_SCOPE.MINUTES_PAST_30: {
        if (time.minutes > 30) {
          return true;
        }
        else {
          return false;
        }
      }
      case TIME_SCOPE.QUARTERS: {
        if (TIME_QUARTERS.indexOf(time.minutes) > -1) {
          return true;
        }
        else {
          return false;
        }
      }
    }
    return false;
  }
}