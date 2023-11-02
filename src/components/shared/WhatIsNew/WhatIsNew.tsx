import React, { useState } from "react";

import "./WhatIsNew.css";
import { UpdateRecordItemType, getUpdateRecords } from "../../../assets/updatesRecord";

export const WhatIsNew = () => {
  const [showUpdates, setShowUpdates] = useState<boolean>(false);

  const entries: UpdateRecordItemType[] = getUpdateRecords();

  return  (
    <div>
      <div className="app-title" style={{paddingRight: "20px"}}>
        <span 
          onMouseOver={() => setShowUpdates(true)}
          onMouseOut={() => setShowUpdates(false)}
        >
          <span className="app-font-normal">הצבע עם העכבר כדי לראות  </span>
          מה חדש?
        </span>
      </div>

      { showUpdates && 
        <div className="what-is-new-info-global">
          <div className="app-sub-title">מה חדש?</div>
          
          {entries.map((item: UpdateRecordItemType, i) => {
            return(
              <div key={i}>
                <div className="what-is-new-info-title">
                  {item.title}&nbsp;&nbsp;&nbsp;
                  <span className="app-font-sm">{item.date}</span>
                </div>
                <div>{item.content}</div>
              </div>
            )
          })}
        </div>
      }
    </div>
  )  
}