import React, { useState } from "react";

import "./Advise.css";

interface AdvisePropsType {
  text?: string;
}

export const Advise = (props: AdvisePropsType) => {
  const [adviseToggleClass, setAdviseToggleClass] = useState("advise-hide");

  return (
    <span>
      { props.text && adviseToggleClass === "advise-hide" && 
        <img src="resources/icons/advise128.png" alt="תעזור לי" title="תעזור לי"
          className="advise-icon" onClick={() => 
            setAdviseToggleClass("advise-show") }>
        </img>
      }

      { props.text && adviseToggleClass === "advise-show" && 
        <span>
          <img src="resources/icons/hand-point-left128.png" alt="תעזור לי" title="תעזור לי"
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