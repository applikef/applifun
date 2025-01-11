import React, { useContext, useRef, useState } from "react";
import { AnalogClock } from "../../shared/Clock/AnalogClock";
import { ScheduleDescriptorType, ScheduleEntry } from "../../../model/componentDescriptors.types";
import { Banner } from "../../global/Banner/Banner";
import { PageHeader } from "../../shared/PageHeader/PageHeader";
import { ClockTime, TIME_SCOPE } from "../../../model/clock.types";
import { MediaUtil } from "../../../utils/MediaUtil";
import { PlayListNames } from "../../../assets/playLists";
import { FACES } from "../../shared/FaceFeedback/FaceFeedback";
import GamesContext, { GamesContextType } from "../../../context/GamesContext";
import { ConstantsUtil } from "../../../utils/ConstantsUtil";
import { ClockUtil } from "../../../utils/ClockUtil";

import { ObjectsUtil } from "../../../utils/ObjectsUtil";
import { ClockIcon } from "../../shared/Clock/ClockIcon";
import { showWellDone } from "../../shared/WellDone/WellDone";
import { useNavigate } from "react-router-dom";
import { GeneralUtil } from "../../../utils/GeneralUtil";

import "./clockGames.css";

export interface MyScheduleAnalogType {
  gameDescriptor: ScheduleDescriptorType;
}

export const MyScheduleAnalog  = (props: MyScheduleAnalogType) => {
  const { 
    audioOn, 
  } = useContext(GamesContext) as GamesContextType;
  
  const navigate = useNavigate();

  const playerHooray:HTMLAudioElement = MediaUtil.pickPlayer(PlayListNames.SHORT_HOORAY);
  const playerOuch:HTMLAudioElement = MediaUtil.pickPlayer(PlayListNames.OUCH);

  const numberOfOptions: number = 5;
  
  const descriptor: ScheduleDescriptorType = props.gameDescriptor;
  const schedule: Array<ScheduleEntry> = descriptor.schedule;
  const helpFileName: string | undefined = descriptor.helpFile ? descriptor.helpFile : undefined;

  const [feedbackFace, setFeedbackFace] = useState<FACES>(FACES.NONE);
  const [scheduleActiveEntry, setScheduleActiveEntry] = useState<number>(0);
  let clockOptions = useRef(getClockOptions(scheduleActiveEntry));
  const [analogDone, setAnalogDone] = useState<boolean>(false);

  function verifyClock(selectedHourIndex: number) {
    if (clockOptions.current[selectedHourIndex].isEqual(
      ClockUtil.digitalToClockTime(schedule[scheduleActiveEntry].time))) {
      MediaUtil.player(playerHooray, audioOn);
      setFeedbackFace(() => FACES.HAPPY);

      if (scheduleActiveEntry === schedule.length-1) {
        setAnalogDone(true);
        setFeedbackFace(() => FACES.NONE);
        showWellDone(audioOn);
        setTimeout(() => {
          navigate(GeneralUtil.targetNavigationOnGameOver());
        }, ConstantsUtil.hoorayTimeout)
      }
      else {
        setTimeout(() => {
          clockOptions.current = getClockOptions(scheduleActiveEntry+1);
          setScheduleActiveEntry(() => scheduleActiveEntry+1);
        }, ConstantsUtil.hoorayShortTimeout)
      }
    }
    else {
      setFeedbackFace(() => FACES.WORRY);
      MediaUtil.player(playerOuch, audioOn);
      setTimeout(() => {
        setFeedbackFace(() => FACES.NONE);
      }, ConstantsUtil.hoorayTimeout)
    }
  }

  function getClockOptions(scheduleActiveEntry: number): Array<ClockTime> {
    let options = ObjectsUtil.shuffleArrayItems(ClockUtil.getOptionTimes(TIME_SCOPE.MINUTES, 
      numberOfOptions,
      true, 
      ClockUtil.digitalToClockTime(schedule[scheduleActiveEntry].time)));
    return options;
  }

  return (
    <div className="app-page">
      <Banner gameId={descriptor.gameId} 
        helpFile={helpFileName} 
        isQuiz={descriptor.isQuiz}
      />
      <div style={{display:"flex", flexDirection:"row", justifyContent: "space-between"}}>
        <PageHeader title={descriptor.title} 
          feedbackFace={ feedbackFace } />
      </div>

    <div className="my-schedule-content">
      <div className="my-schedule-activity-list">
        <table className="my-schedule-activity-table">
          <tbody>
            {
              schedule.map((entry: ScheduleEntry, entryNumber:number) => {
                return <tr key={`${entryNumber}`} 
                  className={`${entryNumber === scheduleActiveEntry ? "my-schedule-selected-row" : ""}`}>
                  <td> 
                    { (entryNumber < scheduleActiveEntry || analogDone) &&
                      <ClockIcon id={entryNumber.toString()} 
                        time={ClockUtil.digitalToClockTime(entry.time)} 
                        r={12} />
                    }
                  </td>
                  <td 
                    className="my-schedule-activity-cell">
                    {ClockUtil.getTimeAsText(TIME_SCOPE.MINUTES, ClockUtil.digitalToClockTime(entry.time))}
                  </td>
                  <td className="my-schedule-activity-cell">{entry.activity}</td>
                </tr>
              })
            }
          </tbody>
        </table>
      </div>
      <div className="my-schedule-activity-clocks">
        {
          clockOptions.current.map((optionTime: ClockTime, i: number) => {
            return <span key={`clock-${i}`} 
              onClick={()=>verifyClock(i)}
              className="app-clickable">
              <AnalogClock id={`option-${i+1}`} r={60}  
                time={optionTime} timeScope={TIME_SCOPE.MINUTES} />
            </span>
          })
        }
      </div>
    </div>
  </div>
)}