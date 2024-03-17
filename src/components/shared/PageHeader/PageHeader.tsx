import React from "react";
import { FACES, FaceFeedback } from "../../shared/FaceFeedback/FaceFeedback";

import "./PageHeader.css";
import { WellDone } from "../WellDone/WellDone";
import { MediaUtil } from "../../../utils/MediaUtil";
import { TalkToMe } from "../TalkToMe/TalkToMe";

interface PageHeaderPropsType {
  feedbackFace: FACES;
  title: string;
  image?: string;
  audio?: string[];
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
        <span>
          { props.audio &&
            <TalkToMe audioList={props.audio!}
              direction={MediaUtil.RTL}/>
          }
          {props.title}
        </span>
      </div>

    </div>
  )
}