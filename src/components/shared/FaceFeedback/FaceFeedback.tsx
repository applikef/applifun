import React from "react";

import "./FaceFeedback.css";

export const enum FACES {
  HAPPY,
  WORRY,
  NONE
};

export interface FaceFeedbackProps {
  size?: string;
  marginRight?: string;
  face: FACES;
};

export const FaceFeedback = (props: FaceFeedbackProps) => {
  const happyDisplay = props.face === FACES.HAPPY ? "inline" : "none";
  const worryDisplay = props.face === FACES.WORRY ? "inline" : "none";
  
  return (
    <>
      <img src="./resources/images/worry-face.png" alt="אוי"
            id="worry-face" className="face-feedback-global" style={{ display: worryDisplay }} />

      <img src="./resources/images/happy-face.png" alt="אני שמח"
             id="happy-face" className="face-feedback-global" style={{ display: happyDisplay }} />
    </>
  );
}