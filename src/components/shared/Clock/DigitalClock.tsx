import React, { useState } from "react";
import "./Clock.css";
import { ClockTime } from "../../../model/clock.types";
import { COLORS } from "../../../utils/ConstantsUtil";
import { ClockUtil } from "../../../utils/ClockUtil";

interface DigitalClockType {
  id: string;
  time: ClockTime;
  height: number;
  backgroundColor?: string;
  outlineColor?: string;
  showHelp?: boolean;
}

export const DigitalClock = (props: DigitalClockType) => {
  const fullSizeHeight = 64;
  const sizeRatio = props.height / fullSizeHeight;
  const HeightToWidthRatio = 2.5;

  const svgDim = fullSizeHeight * sizeRatio + 2;

  const defaultBackgroundColor: string = COLORS.WHITE_03;
  const defaultOutlineColor: string = COLORS.RED_04;

  const fill: string = props.backgroundColor ? props.backgroundColor : defaultBackgroundColor; 
  const stroke: string = props.outlineColor ? props.outlineColor : defaultOutlineColor; 

  const showHelp: boolean = props.showHelp !== undefined ? props.showHelp : false;

  const [exposeHelp, setExposeHelp] = useState<boolean>(false);

  function exposeHelpHelpHandler() {
    setExposeHelp(!exposeHelp)
  }

  return (
    <svg id={props.id} width={svgDim * HeightToWidthRatio}  height={svgDim}>
      <g transform={`scale(${sizeRatio})`}>
        <g>
          <rect x={1} height={fullSizeHeight} y={(svgDim - fullSizeHeight*sizeRatio)/2} 
            width={fullSizeHeight*HeightToWidthRatio} 
            fill={fill} stroke={stroke} />
          <text 
            x={sizeRatio === 1 ? `50%` : fullSizeHeight*HeightToWidthRatio/2} 
            y={sizeRatio === 1 ? `50%` : fullSizeHeight/2} 
            dominantBaseline="middle" textAnchor="middle"
            className="clock-digital-time-text"
            fontSize={`${fullSizeHeight / 2}px`}
            fill={stroke}>
            {ClockUtil.timeToDigitalClockString(props.time)}
          </text>
        </g>
        { showHelp && props.time.getHour() > 12 &&
          <image x="2" y={fullSizeHeight-16} height="16" width="16" 
            href="resources/icons/help.png" 
            className="app-clickable"
            onClick={(event: React.MouseEvent<SVGImageElement>) => {
              exposeHelpHelpHandler(); 
              event.stopPropagation(); 
            }} 
          />
        }
        { exposeHelp && props.time.getHour() > 12 &&
          <text x="24" y={fullSizeHeight-2} fill="black"
             textAnchor="end">
            {props.time.getHour() - 12} + 12 = {props.time.getHour()}
          </text>
        }
      </g>
    </svg>
  );
}
