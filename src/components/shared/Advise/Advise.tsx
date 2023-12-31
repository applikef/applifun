import React, { useState } from "react";

import "./Advise.css";

interface AdvisePropsType {
  text?: string;
  default?: boolean;
}

export const Advise = (props: AdvisePropsType) => {
  const initClass:string = props.default && props.default === true ? "advise-show" : "advise-hide";
  const [adviseToggleClass, setAdviseToggleClass] = useState(initClass);

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