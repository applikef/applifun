import React from "react";
import "./Clock.css";
import { ClockTime, TIME_SCOPE } from "../../../model/clock.types";
import { COLORS } from "../../../utils/ConstantsUtil";

interface ClockIconType {
  id: string;
  time: ClockTime;
  r: number;
  timeScope?: TIME_SCOPE;
  backgroundColor?: string;
  outlineColor?: string;
  hoursHandColor?: string;
  minutesHandColor?: string;
}

export const ClockIcon = (props: ClockIconType) => {
  const fullSizeR = 32;
  const sizeRatio = props.r / fullSizeR;

  const svgDim = (fullSizeR * 2 + 16) * sizeRatio;

  const hoursHandWidth = 4;
  const minutesHandWidth = 4;

  const hourAngle = Math.PI * 2 / 12;
  const hourShiftAngle = Math.PI * 2 / 12 / 60;
  const minuteAngle = Math.PI * 2 / 60;

  const defaultBackgroundColor: string = COLORS.WHITE_03;
  const defaultOutlineColor: string = COLORS.RED_04;
  const defaultHoursHandColor: string = COLORS.RED_04;    
  const defaultMinutesHandColor: string = COLORS.RED_04;  

  const hour: number = props.time.getHour();
  const minutes: number = props.time.getMinutes();

  const r:number = fullSizeR;
  const cx:number = r + 10; 
  const cy:number = r + 10;
  const fill: string = props.backgroundColor ? props.backgroundColor : defaultBackgroundColor; 
  const stroke: string = props.outlineColor ? props.outlineColor : defaultOutlineColor; 

  const hoursHandColor = props.hoursHandColor ? props.hoursHandColor : defaultHoursHandColor;
  const minutesHandColor: string = props.minutesHandColor ? props.minutesHandColor : defaultMinutesHandColor; 

  const hoursHandLength = r * 0.5;
  const minutesHandLength = r * 0.65;

  function calcXHourPosition(hour: number, minutes: number, r: number) {
    return (cx + r * Math.cos((hour-3) * hourAngle + minutes * hourShiftAngle))
  }
  
  function calcYHourPosition(hour: number, minutes: number, r: number) {
    return (cy + r * Math.sin((hour-3) * hourAngle + minutes * hourShiftAngle))
  }

  function calcXMinutePosition(minutes: number, r: number) {
    return (cx + r * Math.cos((minutes - 15) * minuteAngle))
  }
  
  function calcYMinutePosition(minutes: number, r: number) {
    return (cy + r * Math.sin((minutes - 15) * minuteAngle))
  }

  return (
    <svg id={props.id} width={svgDim}  height={svgDim}>
      <g transform={`scale(${sizeRatio})`}>
        < circle cx={cx} cy={cy} r={r} fill={fill} stroke={stroke} />
        < circle cx={cx} cy={cy} r={3} fill={stroke} stroke={stroke} />

        <line id={`hoursHand_${props.id}`} x1={cx} y1={cy} 
          x2={calcXHourPosition(hour, minutes, hoursHandLength)} y2={calcYHourPosition(hour, minutes, hoursHandLength)} 
          stroke={hoursHandColor} strokeWidth={hoursHandWidth} className="clock-hand" />

        <line id={`minutesHand_${props.id}`} x1={cx} y1={cy} 
          x2={calcXMinutePosition(minutes, minutesHandLength)} 
          y2={calcYMinutePosition(minutes, minutesHandLength)} 
          stroke={minutesHandColor} strokeWidth={minutesHandWidth} className="clock-hand" />
      </g>
    </svg>
  );
}
