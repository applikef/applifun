import React, { useContext, useEffect, useState } from "react";

import "./Advise.css";
import { MediaUtil } from "../../../utils/MediaUtil";
import GamesContext, { GamesContextType } from "../../../context/GamesContext";

interface AdvisePropsType {
  text?: string;
  audio?: string;
  default?: boolean;
}

export const Advise = (props: AdvisePropsType) => {
  const { 
    audioOn 
  } = useContext(GamesContext) as GamesContextType;

  const initClass:string = props.default && props.default === true ? "advise-show" : "advise-hide";
  const [adviseToggleClass, setAdviseToggleClass] = useState<string>(initClass);

  useEffect(() => {
    if (adviseToggleClass === "advise-show" && props.audio) {
      MediaUtil.play(props.audio, audioOn);
    }
  }, [adviseToggleClass, audioOn, props.audio]);

  return (
    <span>
      { props.text && adviseToggleClass === "advise-hide" && 
        <img src="resources/icons/advise128.png" alt="הַקְלֵק לְקַבָּלַת עֶזְרָה" title="הַקְלֵק לְקַבָּלַת עֶזְרָה"
          className="advise-icon" onClick={() => 
            setAdviseToggleClass("advise-show") }>
        </img>
      }

      { props.text && adviseToggleClass === "advise-show" && 
        <span>
          <img src="resources/icons/hand-point-left128.png" alt="הַקְלֵק לְהַסְתָּרַת הָעֶזְרָה" 
            title="הַקְלֵק לְהַסְתָּרַת הָעֶזְרָה"
            className="advise-icon" onClick={() => 
              setAdviseToggleClass("advise-hide") }>
          </img>

          <span className={`advise-text ${adviseToggleClass}`}>
            { props.text }  
          </span>
        </span>
      }
    </span>
  )
}