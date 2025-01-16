import React, { useState } from "react";

import "./EducationClock.css";
import { AnalogClock } from "../shared/Clock/AnalogClock";
import { ClockTime, TIME_SCOPE } from "../../model/clock.types";
import { DigitalClock } from "../shared/Clock/DigitalClock";
import { Banner } from "../global/Banner/Banner";
import { ClockUtil } from "../../utils/ClockUtil";

export const EducationClock = () => {
  const highlightColor = "#0000ff";
  const initialTime = "12:00";

  const morningHours = Array.from({length: 12}, (_, i) => i + 1);
  const afternoonHours = Array.from({length: 12}, (_, i) => i + 13);

  const [morningTime, setMorningTime] = useState<ClockTime>(new ClockTime(8,0));
  const [afternoonTime, setAfternoonTime] = useState<ClockTime>(new ClockTime(4,0));
  const [inputTime, setInputTime] = useState<ClockTime>(ClockUtil.digitalToClockTime(initialTime));
  const [digitalClass, setDigitalClass] = useState<string>("app-hide");
  const [analogClass, setAnalogClass] = useState<string>("app-show-inline");

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

  function validateClockInput() {
    const timeStr = document.getElementsByTagName("input")[0].value;
    if (ClockUtil.isValidTimeString(timeStr)) {
      setInputTime(ClockUtil.digitalToClockTime(timeStr));
    }
  }

  function digitalClickedHandler() {
    document.getElementById("digitalButton")!.classList.add("education-clock-button-selected");
    document.getElementById("analogButton")!.classList.remove("education-clock-button-selected");
    setAnalogClass("app-hide");
    setDigitalClass("app-show-inline");
  }

  function analogClickedHandler() {
    document.getElementById("analogButton")!.classList.add("education-clock-button-selected");
    document.getElementById("digitalButton")!.classList.remove("education-clock-button-selected");
    setAnalogClass("app-show-inline");
    setDigitalClass("app-hide");
  }

  return (
    <div className="app-page">
      <Banner gameId="" showLeftIconBar={false} />
      <button id="analogButton" className="app-button-widget education-clock-button-selected" 
        onClick={() => analogClickedHandler()}>מְחוֹגִים</button>
      <button id="digitalButton" className="app-button-widget" 
        onClick={() => digitalClickedHandler()}>דִּיגִיטָלִי</button>
      <span className="education-clock-title">
        הַקְלֵק עַל הַכַּפְתּוֹר שֶׁמַּרְאֶה אֶת סוּג הַשָּׁעוֹן שֶׁאַתָּה רוֹצֶה לִרְאוֹת
      </span>
      <div className={`${digitalClass}`}>
        <div className="education-clock-digital-title">הַקְלֵק עַל שָׁעוֹן דִּיגִיטָלִי כְּדֵי לִרְאוֹת אֶת הַשָּׁעָה הַמַּתְאִימָה בִּשְׁעוֹן הַמְּחוֹגִים</div>
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

      <div className={`app-show-flex-column app-center ${analogClass}`}> 
        <div className="education-clock-input">      
          <div>הַכְנֵס שָׁעָה כְּדֵי לִרְאוֹת אוֹתָהּ בַּשָּׁעוֹן</div>
          <input type="text" id="inputTime" name="inputTime" className="education-clock-input-time" 
            maxLength={5} placeholder="HH:MM"
            onChange={ () => validateClockInput() }></input>
        </div>
        <div className="app-center">
          <AnalogClock id={"inputAnalogClock"} time={inputTime} r={150} timeScope={TIME_SCOPE.MINUTES}
            showHelpOnStart={true}/>
        </div>
      </div>
    </div>
  )
}