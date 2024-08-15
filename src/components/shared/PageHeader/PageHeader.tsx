import React, { useContext } from "react";
import { FACES, FaceFeedback } from "../../shared/FaceFeedback/FaceFeedback";

import "./PageHeader.css";
import { WellDone } from "../WellDone/WellDone";
import { MediaUtil } from "../../../utils/MediaUtil";
import { TalkToMe } from "../TalkToMe/TalkToMe";
import { DeviceUtil } from "../../../utils/DeviceUtil";
import GamesContext, { GamesContextType } from "../../../context/GamesContext";
import { FONT_SIZE } from "../../../utils/ConstantsUtil";

interface PageHeaderPropsType {
  feedbackFace: FACES;
  title: string;
  image?: string;
  audio?: string[];
  audioHover?: string;
}

export const PageHeader = (props: PageHeaderPropsType) => {
  const {
    isTablet,
  } = useContext(GamesContext) as GamesContextType;

return(
    <div className="page-header-global">
      <div className="page-header-feedback-face">
        <FaceFeedback face={props.feedbackFace} />
        <WellDone />
      </div>
    
      <div className={`page-header-title ${DeviceUtil.getFontSize(isTablet, FONT_SIZE.XL)}`}>
        { props.image && 
          <img src={ MediaUtil.getCatalogImage(props.image)} 
            alt="" className="page-header-image" />
        }
        <span>
          { props.audio &&
            <TalkToMe audioList={props.audio!}
              audioHover={props.audioHover}
              direction={MediaUtil.RTL}/>
          }
          {props.title}
        </span>
      </div>

    </div>
  )
}