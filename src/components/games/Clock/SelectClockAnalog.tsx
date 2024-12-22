import React from "react";
import { AnalogClock } from "../../shared/AnalogClock/AnalogClock";
import { SelectClockAnalogDescriptorType } from "../../../model/componentDescriptors.types";

export interface SelectClockAnalogType {
  gameDescriptor: SelectClockAnalogDescriptorType;
}

export const SelectClockAnalog  = (props: SelectClockAnalogType) => {
  return (
    <div>
      <div>
          <div>
            מה השעה?
          </div>
          <div style={{textAlign: "center"}}>
            <AnalogClock id="main" r={80} time={"4:30:00"} 
              hoursHandColor="#006d2c" showQuaters={true}/>
          </div>
        </div>
      <div>
        <div>
          איזה שעון מראה את השעה?
        </div>
        <AnalogClock id="main-1" r={80} time={"06:45"} showMinutes={true}/>
        <AnalogClock id="main-2" r={80} time={"7:00"}/>
      </div>
    </div>
  )

}