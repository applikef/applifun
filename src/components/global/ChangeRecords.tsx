import React from "react";

import "./../../assets/styles/global.css";

import { ChangeRecordItemType, getAllChangeRecords } from "../../assets/changeRecord";
import { Banner } from "./Banner/Banner";

export const ChangeRecords = () => {
  const entries: ChangeRecordItemType[] = getAllChangeRecords();
  
  return (
    <div className="app-page">
      <Banner gameId=""/>
      <div className="app-indent-top-32">
        <div className="app-title">רשימת עדכוני משחקים</div>
        
        {entries.map((item: ChangeRecordItemType, i) => {
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
    </div>
  )
}