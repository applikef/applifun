import React, { useState } from "react";

import "./EducationClock.css";
import { AnalogClock } from "../shared/Clock/AnalogClock";
import { ClockTime } from "../../model/clock.types";
import { DigitalClock } from "../shared/Clock/DigitalClock";
import { Banner } from "../global/Banner/Banner";

export const EducationClock = () => {
  const highlightColor = "#0000ff";

  const morningHours = Array.from({length: 12}, (_, i) => i + 1);
  const afternoonHours = Array.from({length: 12}, (_, i) => i + 13);

  const [morningTime, setMorningTime] = useState<ClockTime>(new ClockTime(8,0));
  const [afternoonTime, setAfternoonTime] = useState<ClockTime>(new ClockTime(4,0));

  function morningDigitalClickHandler(hour: number) {
    setMorningTime(new ClockTime(hour, 0));
  }

  function afternoonDigitalClickHandler(hour: number) {
    setAfternoonTime(new ClockTime(hour, 0));
  }

  function getBorderMorningAnalog(hour: number): string {
    return (hour === morningTime.getHour() ? highlightColor : "");
  }

  function getBorderAfternoonAnalog(hour: number): string {
    return (hour-12 === afternoonTime.getHour() ? highlightColor : "");
  }

  return (
    <div className="app-page">
      <Banner gameId="" showLeftIconBar={false} />
      <div className="app-title">שָׁעוֹת בְּשָׁעוֹן דִּיגִיטָלִי</div>
      <div  className="app-show-flex-row">
        <div className="app-show-flex-column">
          <div className="app-sub-title education-clock-sub-title">לִפְנֵי הַצָּהֳרַיִים</div>
          <div className="app-show-flex-row">
            <div>
              {
                morningHours.map((hour: number) => {
                  return <span key={`morning-${hour}`} 
                    className="app-show-flex-column app-clickable"
                    onClick={() => {morningDigitalClickHandler(hour)}}>
                    <DigitalClock id={`morning-time-${hour}`}
                      time={new ClockTime(hour,0)} height={32} outlineColor={getBorderMorningAnalog(hour)}/>
                  </span>
                })
              }
            </div>
            <AnalogClock id={"morningClock"} time={morningTime} r={80} 
              hoursHandColor={highlightColor} showHelp={false}/>
          </div>
        </div>
        <div className="app-show-flex-column education-clock-left-column">
          <div className="app-sub-title education-clock-sub-title">אַחֲרֵי הַצָּהֳרַיִים</div>
          <div>
            <div className="app-show-flex-row">
              <div>
                {
                  afternoonHours.map((hour: number) => {
                    return <span key={`afternoon-${hour}`} 
                      className="app-show-flex-column app-clickable"
                    onClick={() => {afternoonDigitalClickHandler(hour)}}>
                      <DigitalClock id={`afternoon-time-${hour}`} 
                        time={new ClockTime(hour,0)} height={32} 
                        outlineColor={getBorderAfternoonAnalog(hour)}/>
                    </span>
                  })
                }
              </div>
              <AnalogClock id={"afternoonClock"} time={afternoonTime} r={80} 
                hoursHandColor={highlightColor} showHelp={false}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}