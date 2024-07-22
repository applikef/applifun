import React from "react";
import { DeviceUtil } from "../../../utils/DeviceUtil";

export interface HelpProps {
  baseUrl?: string;
  gameId?: string;
  fileName?: string;
}

export const Help = (props: HelpProps) => {
  const baseUrl = props.baseUrl ? props.baseUrl : "";
  const fileName = props.gameId ? `${props.gameId}.html` : props.fileName;
  const smallDevice = DeviceUtil.isSmallDevice();

  return(
      <iframe title="mouseJumpingShapeClick" src={`${baseUrl}resources/help/${fileName}`} 
        height={smallDevice ? "250px" : "500px"} width={smallDevice ? "500px" : "1000px"}/>
  )
}