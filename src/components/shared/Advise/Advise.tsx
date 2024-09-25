import React, { useContext, useEffect, useState } from "react";

import "./Advise.css";
import { MediaUtil } from "../../../utils/MediaUtil";
import GamesContext, { GamesContextType } from "../../../context/GamesContext";

interface AdvisePropsType {
  text?: string;
  audio?: string;
  default?: boolean;
  direction?: string; 
  forceReset?: boolean;
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

  useEffect(()=>{
    if (props.forceReset !== undefined && props.forceReset) {
      setAdviseToggleClass("advise-hide")
    }
  }, [props.forceReset]);

  return (
    <div>
      { props.text && adviseToggleClass === "advise-hide" && 
        <img src="resources/icons/advise128.png" alt="הַקְלֵק לְקַבָּלַת עֶזְרָה" title="הַקְלֵק לְקַבָּלַת עֶזְרָה"
          className="advise-icon" onClick={() => 
            setAdviseToggleClass("advise-show") }>
        </img>
      }

      { props.text && adviseToggleClass === "advise-show" && 
        <div className="advise-show-global">
          { (props.direction === undefined || props.direction === MediaUtil.RTL) &&
            <img src="resources/icons/hand-point-left128.png" alt="הַקְלֵק לְהַסְתָּרַת הָעֶזְרָה" 
              title="הַקְלֵק לְהַסְתָּרַת הָעֶזְרָה"
              className="advise-icon" onClick={() => 
                setAdviseToggleClass("advise-hide") }>
            </img>
          }

          <div className={`advise-text ${adviseToggleClass}`}>
            { props.text }  
          </div>

          { props.direction === MediaUtil.LTR &&
            <img src="resources/icons/hand-point-right128.png" alt="הַקְלֵק לְהַסְתָּרַת הָעֶזְרָה" 
              title="הַקְלֵק לְהַסְתָּרַת הָעֶזְרָה"
              className="advise-icon" onClick={() => 
                setAdviseToggleClass("advise-hide") }>
            </img>
          }

        </div>
      }
    </div>
  )
}