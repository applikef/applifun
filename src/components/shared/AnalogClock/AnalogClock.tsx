import React, { MouseEventHandler, useState } from "react";
import "./AnalogClock.css";

interface AnalogClockType {
  id: string;
  time: string;
  r: number;
  showMinutes?: boolean;
  showQuaters?: boolean;
  backgroundColor?: string;
  outlineColor?: string;
  hoursHandColor?: string;
  minutesHandColor?: string;
}

export const AnalogClock = (props: AnalogClockType) => {
  const defaultHelpWidth = 30;
  const svgDim = (props.r + defaultHelpWidth) * 2 + 20;

  const hoursHandWidth = 4;
  const minutesHandWidth = 4;

  const hourAngle = Math.PI * 2 / 12;
  const hourShiftAngle = Math.PI * 2 / 12 / 60;
  const minuteAngle = Math.PI * 2 / 60;

  const defaultBackgroundColor: string = "#faebd7"    // --white-03
  const defaultOutlineColor: string = "#e6550d";      // --red-04
  const defaultHoursHandColor: string = "#e6550d";    
  const defaultMinutesHandColor: string = "#e6550d";  
  const defaultHelpBackgroundColor: string = "#fee5d9";    // --red-00
  const defaultHelpOutlineColor: string = "#fc9272";      // --red-02

  const timeAsArray: Array<string> = props.time.split(":");
  const hour: number = Number(timeAsArray[0]);
  const minutes: number = timeAsArray.length > 1 ? Number(timeAsArray[1]) : 0;

  const r:number = props.r;
  const cx:number = r + 10; 
  const cy:number = r + 10;
  const fill: string = props.backgroundColor ? props.backgroundColor : defaultBackgroundColor; 
  const stroke: string = props.outlineColor ? props.outlineColor : defaultOutlineColor; 

  const showMinutes:boolean = props.showMinutes ? props.showMinutes : false;
  const showQuaters:boolean = props.showQuaters ? props.showQuaters : false;

  const rHelp = r + defaultHelpWidth;

  const minutesHandColor: string = props.minutesHandColor ? props.minutesHandColor : defaultMinutesHandColor; 

  const hoursHandLength = r * 0.5;
  const minutesHandLength = r * 0.65;

  const [hoursHandColor, setHoursHandColor] = 
    useState<string>(props.hoursHandColor ? props.hoursHandColor : defaultHoursHandColor);

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

  function showHelp() {
    const helpColor = "#31a354"; // --green-03 
    let color: string = props.hoursHandColor ? props.hoursHandColor : defaultHoursHandColor; 
    if (hoursHandColor !== helpColor) {
      color = helpColor;
    }
    setHoursHandColor(color);
  }

  const hours = new Array(12).fill(null).map((_, i) => i + 1);
  const minutesLabels = new Array(12).fill(null).map((_, i) => (i + 1)*5);

  return (
    <svg id={props.id} width={svgDim}  height={svgDim}>
      <g transform="translate(30,30)">
        { showMinutes &&
          <g>
            <circle cx={cx} cy={cy} r={rHelp} fill={defaultHelpBackgroundColor} 
              stroke={defaultHelpOutlineColor} />
            {minutesLabels.map((min:number, i) => {
              return <text key={min} 
                x={calcXHourPosition(i+1, 0, (r+defaultHelpWidth)*0.9)} 
                y={calcYHourPosition(i+1,0, (r+defaultHelpWidth)*0.9)} 
                fill={defaultHelpOutlineColor}
                textAnchor="middle" dominantBaseline="central">{min}
              </text>
            })}
          </g>
        }

        < circle cx={cx} cy={cy} r={r} fill={fill} stroke={stroke} 
           className="app-clickable"
        />
        < circle cx={cx} cy={cy} r={3} fill={stroke} stroke={stroke} />
        {hours.map((hour:number, i) => {
          return <text key={hour} 
            x={calcXHourPosition(hour, 0, r*0.85)} y={calcYHourPosition(hour,0, r*0.85)} 
            stroke={stroke}
            textAnchor="middle" dominantBaseline="central">{hour}
          </text>
        })}

        <line id={`hoursHand_${props.id}`} x1={cx} y1={cy} 
          x2={calcXHourPosition(hour, minutes, hoursHandLength)} y2={calcYHourPosition(hour, minutes, hoursHandLength)} 
          stroke={hoursHandColor} strokeWidth={hoursHandWidth} className="clock-hand" />

        <line id={`minutesHand_${props.id}`} x1={cx} y1={cy} 
          x2={calcXMinutePosition(minutes, minutesHandLength)} 
          y2={calcYMinutePosition(minutes, minutesHandLength)} 
          stroke={minutesHandColor} strokeWidth={minutesHandWidth} className="clock-hand" />

        {showQuaters &&
          <g>
            <text key="quaterText" 
              x={cx + r + 4} y={cy} 
              stroke={defaultHelpOutlineColor}
              fontSize={14}
              textAnchor="end" dominantBaseline="central">ורבע
            </text>
            <text key="halfText" 
              x={cx} y={cy + r + 8} 
              stroke={defaultHelpOutlineColor}
              fontSize={14}
              textAnchor="middle" dominantBaseline="central">וחצי
            </text>
            <text key="quaterToText" 
              x={cx - r - 4} y={cy} 
              stroke={defaultHelpOutlineColor}
              fontSize={14}
              textAnchor="start" dominantBaseline="central">רבע ל
            </text>
          </g>
        }

        <image x="0" y={(r*2).toString()} height="24" width="24" 
          href="resources/icons/help.png" 
          className="app-clickable"
          onClick={(event: React.MouseEvent<SVGImageElement>) => {
            showHelp(); 
            event.stopPropagation(); 
          }} 
        />
      </g>
    </svg>
  );
}
