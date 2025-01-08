import React, { useEffect, useState } from "react";
import "./Clock.css";
import { ClockTime, TIME_SCOPE } from "../../../model/clock.types";
import { COLORS } from "../../../utils/ConstantsUtil";

interface AnalogClockType {
  id: string;
  time: ClockTime;
  r: number;
  timeScope?: TIME_SCOPE;
  backgroundColor?: string;
  outlineColor?: string;
  hoursHandColor?: string;
  minutesHandColor?: string;
}

export const AnalogClock = (props: AnalogClockType) => {
  const defaultHelpWidth = 30;
  const fullSizeR = 80;
  const sizeRatio = props.r / fullSizeR;

  const svgDim = (fullSizeR + defaultHelpWidth) * sizeRatio * 2 + 20;

  const hoursHandWidth = 4;
  const minutesHandWidth = 4;

  const hourAngle = Math.PI * 2 / 12;
  const hourShiftAngle = Math.PI * 2 / 12 / 60;
  const minuteAngle = Math.PI * 2 / 60;

  const defaultBackgroundColor: string = COLORS.WHITE_03;
  const defaultOutlineColor: string = COLORS.RED_04;
  const defaultHoursHandColor: string = COLORS.RED_04;    
  const defaultMinutesHandColor: string = COLORS.RED_04;  
  const helpColor = COLORS.GREEN_03;
  const backgroundHelpColor = COLORS.GREEN_00;

  const hour: number = props.time.getHour();
  const minutes: number = props.time.getMinutes();
  const timeScope: TIME_SCOPE = props.timeScope ? props.timeScope : TIME_SCOPE.HOURS_ONLY;

  const r:number = fullSizeR;
  const cx:number = r + 10; 
  const cy:number = r + 10;
  const fill: string = props.backgroundColor ? props.backgroundColor : defaultBackgroundColor; 
  const stroke: string = props.outlineColor ? props.outlineColor : defaultOutlineColor; 

  const rHelp = r + defaultHelpWidth ;

  const hoursHandColor = props.hoursHandColor ? props.hoursHandColor : defaultHoursHandColor;
  const minutesHandColor: string = props.minutesHandColor ? props.minutesHandColor : defaultMinutesHandColor; 

  const hoursHandLength = r * 0.5;
  const minutesHandLength = r * 0.65;

  const [highlightHoursHand, setHighlightHoursHand] = useState<boolean>(false);
  const [showQuarters, setShowQuarters] = useState<boolean>(false);
  const [showMinutes, setShowMinutes] = useState<boolean>(false);

  const [forceRefresh, setForceRefresh] = useState<number>(0);

  useEffect(() => {
    setHighlightHoursHand(false);
    setShowMinutes(false);
    setShowQuarters(false);
  }, [timeScope]);

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

  function showHelpHandler() {
    if (timeScope === TIME_SCOPE.HOURS_ONLY) {
      setHighlightHoursHand(!highlightHoursHand);
    }

    if (timeScope === TIME_SCOPE.MINUTES) {
      setShowMinutes(!showMinutes);
    }

    if (timeScope === TIME_SCOPE.QUARTERS) {
      setShowQuarters(!showQuarters);
    }

    setForceRefresh(forceRefresh+1);
  }

  const hours = new Array(12).fill(null).map((_, i) => i + 1);
  const minutesLabels = new Array(12).fill(null).map((_, i) => (i + 1)*5);

  return (
    <svg id={props.id} width={svgDim}  height={svgDim}>
      { forceRefresh >= 0 &&
      <g transform={`translate(30,30) scale(${sizeRatio})`}>
        { showMinutes && timeScope === TIME_SCOPE.MINUTES &&
          <g>
            <circle cx={cx} cy={cy} r={rHelp} fill={backgroundHelpColor} 
              stroke={helpColor} />
            {minutesLabels.map((min:number, i) => {
              return <text key={min} 
                x={calcXHourPosition(i+1, 0, (r+defaultHelpWidth)*0.9)} 
                y={calcYHourPosition(i+1,0, (r+defaultHelpWidth)*0.9)} 
                fill={helpColor}
                textAnchor="middle" dominantBaseline="central">{min}
              </text>
            })}
          </g>
        }

        < circle cx={cx} cy={cy} r={r} fill={fill} stroke={stroke} />
        < circle cx={cx} cy={cy} r={3} fill={stroke} stroke={stroke} />
        {hours.map((hour:number, i) => {
          return <text key={hour} 
            x={calcXHourPosition(hour, 0, r*0.85)} y={calcYHourPosition(hour,0, r*0.85)} 
            stroke={stroke}
            textAnchor="middle" dominantBaseline="central">{hour}
          </text>
        })}

        { highlightHoursHand && timeScope === TIME_SCOPE.HOURS_ONLY &&
        <line id={`hoursHand_${props.id}`} x1={cx} y1={cy} 
          x2={calcXHourPosition(hour, minutes, hoursHandLength)} y2={calcYHourPosition(hour, minutes, hoursHandLength)} 
          stroke={helpColor} strokeWidth={hoursHandWidth} className="clock-hand" />
        }

        { !highlightHoursHand &&
        <line id={`hoursHand_${props.id}`} x1={cx} y1={cy} 
          x2={calcXHourPosition(hour, minutes, hoursHandLength)} y2={calcYHourPosition(hour, minutes, hoursHandLength)} 
          stroke={hoursHandColor} strokeWidth={hoursHandWidth} className="clock-hand" />
        }

        <line id={`minutesHand_${props.id}`} x1={cx} y1={cy} 
          x2={calcXMinutePosition(minutes, minutesHandLength)} 
          y2={calcYMinutePosition(minutes, minutesHandLength)} 
          stroke={minutesHandColor} strokeWidth={minutesHandWidth} className="clock-hand" />

        {showQuarters && timeScope === TIME_SCOPE.QUARTERS &&
          <g>
            <text key="quarterText" 
              x={cx + r + 4} y={cy} 
              stroke={helpColor}
              fontSize={14}
              textAnchor="end" dominantBaseline="central">ורבע
            </text>
            <text key="halfText" 
              x={cx} y={cy + r + 8} 
              stroke={helpColor}
              fontSize={14}
              textAnchor="middle" dominantBaseline="central">וחצי
            </text>
            <text key="quarterToText" 
              x={cx - r - 4} y={cy} 
              stroke={helpColor}
              fontSize={14}
              textAnchor="start" dominantBaseline="central">רבע ל
            </text>
          </g>
        }

        <image x="0" y={(r*2).toString()} height="24" width="24" 
          href="resources/icons/help.png" 
          className="app-clickable"
          onClick={(event: React.MouseEvent<SVGImageElement>) => {
            showHelpHandler(); 
            event.stopPropagation(); 
          }} 
        />
      </g>
}
    </svg>
  );
}
