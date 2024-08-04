import React from "react";

import "./FaceFeedback.css";
import { FEEDBACK_FACE_SIZE } from "../../../utils/ConstantsUtil";

export const enum FACES {
  HAPPY,
  WORRY,
  NONE
};

export interface FaceFeedbackProps {
  size?: FEEDBACK_FACE_SIZE;
  marginRight?: string;
  face: FACES;
};

export const FaceFeedback = (props: FaceFeedbackProps) => {
  const happyDisplay = props.face === FACES.HAPPY ? "inline" : "none";
  const worryDisplay = props.face === FACES.WORRY ? "inline" : "none";
  
  const zoomValue: string = (props.size === FEEDBACK_FACE_SIZE.M) ? "50%" : ((props.size === FEEDBACK_FACE_SIZE.S) ? "25%" : "100%");

  return (
    <>
      <img src="./resources/images/worry-face.png" alt="אוי"
            id="worry-face" className="face-feedback-global" 
            style={{ display: worryDisplay, zoom: zoomValue }} />

      <img src="./resources/images/happy-face.png" alt="אני שמח"
             id="happy-face" className="face-feedback-global" 
             style={{ display: happyDisplay, zoom: zoomValue }} />
    </>
  );
}