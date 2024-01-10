import React from "react";
import { FACES, FaceFeedback } from "../../shared/FaceFeedback/FaceFeedback";

import "./PageHeader.css";
import { WellDone } from "../WellDone/WellDone";
import { MediaUtil } from "../../../utils/MediaUtil";

interface PageHeaderPropsType {
  feedbackFace: FACES;
  title: string;
  image?: string;
}

export const PageHeader = (props: PageHeaderPropsType) => {
  return(
    <div>
      <div className="page-header-feedback-face">
        <FaceFeedback face={props.feedbackFace} />
        <WellDone />
      </div>
    
      <div className="page-header-title">
        { props.image && 
          <img src={ MediaUtil.getCatalogImage(props.image)} 
            alt="" className="page-header-image" />
        }
        <span>{props.title}</span>
      </div>

    </div>
  )
}