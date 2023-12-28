import React from "react";
import { FACES, FaceFeedback } from "../../shared/FaceFeedback/FaceFeedback";

import "./PageHeader.css";
import { WellDone } from "../WellDone/WellDone";

interface PageHeaderPropsType {
  feedbackFace: FACES;
  title: string;
}

export const PageHeader = (props: PageHeaderPropsType) => {
  return(
    <div>
      <div className="page-header-feedback-face">
        <FaceFeedback face={props.feedbackFace} />
        <WellDone />
      </div>
    
      <div  className="page-header-title">{props.title}</div>

    </div>
  )
}