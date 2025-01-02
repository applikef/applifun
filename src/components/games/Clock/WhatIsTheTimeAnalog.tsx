import React, { useContext, useRef, useState } from "react";
import { AnalogClock } from "../../shared/Clock/AnalogClock/AnalogClock";
import { WhatIsTheTimeAnalogDescriptorType } from "../../../model/componentDescriptors.types";
import { ClockTime, TIME_SCOPE } from "../../../model/clock.types";
import { Banner } from "../../global/Banner/Banner";
import { PageHeader } from "../../shared/PageHeader/PageHeader";
import { FACES } from "../../shared/FaceFeedback/FaceFeedback";

import "./clock.css";
import { MediaUtil } from "../../../utils/MediaUtil";
import { ConstantsUtil } from "../../../utils/ConstantsUtil";
import GamesContext, { GamesContextType } from "../../../context/GamesContext";
import { PlayListNames } from "../../../assets/playLists";
import { ClockUtil } from "./ClockUtil";
import { SingleSelectionDialog } from "../../shared/SingleSelectionDialog/SingleSelectionDialog";

export interface WhatIsTheTimeAnalogType {
  gameDescriptor: WhatIsTheTimeAnalogDescriptorType;
}

export const WhatIsTheTimeAnalog  = (props: WhatIsTheTimeAnalogType) => {
  const { 
    audioOn
  } = useContext(GamesContext) as GamesContextType;

  const playerHooray:HTMLAudioElement = MediaUtil.pickPlayer(PlayListNames.SHORT_HOORAY);
  const playerOuch:HTMLAudioElement = MediaUtil.pickPlayer(PlayListNames.OUCH);

  const numberOfOptions: number = 5;
  const defaultTimeScope: TIME_SCOPE = TIME_SCOPE.HOURS_ONLY;

  const descriptor = props.gameDescriptor;
  const helpFileName: string | undefined = descriptor.helpFile ? descriptor.helpFile : undefined;

  const [feedbackFace, setFeedbackFace] = useState<FACES>(FACES.NONE);
  const [timeScope, setTimeScope] = useState<TIME_SCOPE>(defaultTimeScope);

  const [clockOptions, setClockOptions] = 
    useState<Array<ClockTime>>(() => ClockUtil.getOptionTimes(defaultTimeScope, numberOfOptions));
  let clockTime = useRef(clockOptions[Math.floor(Math.random() * (numberOfOptions-1))]);

  const [gameSettingsDisplay, setGameSettingsDisplay] = useState<string>("game-settings-global-hide");

  function updateTimes(scope: TIME_SCOPE) {
    const options = ClockUtil.getOptionTimes(scope, numberOfOptions);
    setClockOptions(options);
    let newTime = options[Math.floor(Math.random() * (numberOfOptions-1))];
    while (newTime.isEqual(clockTime.current)) {
      newTime = options[Math.floor(Math.random() * (numberOfOptions-1))];
    }
    clockTime.current = newTime; 
  }

  function verifyTime(selectedTime: ClockTime) {
    if (selectedTime.isEqual(clockTime.current)) {
      MediaUtil.player(playerHooray, audioOn);
      setFeedbackFace(() => FACES.HAPPY);

      setTimeout(() => {
        setFeedbackFace(() => FACES.NONE);
        updateTimes(timeScope);
      }, ConstantsUtil.hoorayShortTimeout)
    }
    else {
      setFeedbackFace(() => FACES.WORRY);
      MediaUtil.player(playerOuch, audioOn);
      setTimeout(() => {
        setFeedbackFace(() => FACES.NONE);
      }, ConstantsUtil.hoorayTimeout)
    }
  }

  function handleSettingsCancel() {
    setGameSettingsDisplay(()=>"game-settings-global-hide"); 
  }

  function handleSettingsDone(scopeOptionIndex: number) {
    setGameSettingsDisplay(()=>"game-settings-global-hide");
    let scopeAsString: string = descriptor.hourTypes[scopeOptionIndex].id;
    let scope: TIME_SCOPE = ClockUtil.getTimeScope(scopeAsString);
    setTimeScope(scope);
    updateTimes(scope);
  }

  return (
    <div className="app-page">
      <Banner gameId={descriptor.gameId} 
        helpFile={helpFileName}
        settings={() => setGameSettingsDisplay("game-settings-global-show")} 
        isQuiz={descriptor.isQuiz}
      />
      <div style={{display:"flex", flexDirection:"row", justifyContent: "space-between"}}>
        <PageHeader title={descriptor.title} 
          feedbackFace={ feedbackFace } />
      </div>

      <div style={{textAlign: "center"}}>
        <AnalogClock id="main" r={80} time={clockTime.current} timeScope={timeScope}/>

        <div>
          <span className="page-header-title font-size-xl">שָׁעָה</span>
          { 
            clockOptions.map((time: ClockTime, i: number) => {
              return <button key={i} className="app-button-widget"
                onClick={
                  ()=>verifyTime(new ClockTime(time.getHour(), time.getMinutes()))
                }>
                { (timeScope === TIME_SCOPE.HOURS_ONLY || timeScope === TIME_SCOPE.MINUTES) &&
                  <span>
                    {time.getHour()} 
                    {
                      timeScope === TIME_SCOPE.MINUTES && 
                        <span>:{ClockUtil.minutesToString(time.getMinutes())}</span>
                    }
                  </span>
                }
                { timeScope === TIME_SCOPE.QUARTERS &&
                  <span>
                    {
                      ClockUtil.getTimeAsText(timeScope, time)
                    }
                  </span>
                }
              </button>
            })
          }
        </div>
      </div>

      <SingleSelectionDialog
        className={ gameSettingsDisplay }
        title={descriptor.settingsTitle}
        options={descriptor.hourTypes.map((type)=> type.name)}
        handleDialogDone={handleSettingsDone}
        handleDialogCancel={handleSettingsCancel}
      />      
    </div>
  )

}