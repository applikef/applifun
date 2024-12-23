import React, { useContext, useState } from "react";
import { AnalogClock } from "../../shared/AnalogClock/AnalogClock";
import { WhatIsTheTimeAnalogDescriptorType } from "../../../model/componentDescriptors.types";
import { ClockTime } from "../../../model/clock.types";
import { Banner } from "../../global/Banner/Banner";
import { PageHeader } from "../../shared/PageHeader/PageHeader";
import { MultiSelectionSettings } from "../../shared/MultiSelectionSettings/MultiSelectionSettings";
import { FACES } from "../../shared/FaceFeedback/FaceFeedback";

import "./clock.css";
import { MediaUtil } from "../../../utils/MediaUtil";
import { ConstantsUtil } from "../../../utils/ConstantsUtil";
import GamesContext, { GamesContextType } from "../../../context/GamesContext";
import { PlayListNames } from "../../../assets/playLists";

export interface WhatIsTheTimeAnalogType {
  gameDescriptor: WhatIsTheTimeAnalogDescriptorType;
}

export const WhatIsTheTimeAnalog  = (props: WhatIsTheTimeAnalogType) => {
  const { 
    audioOn
  } = useContext(GamesContext) as GamesContextType;

  const playerHooray:HTMLAudioElement = MediaUtil.pickPlayer(PlayListNames.SHORT_HOORAY);
  const playerOuch:HTMLAudioElement = MediaUtil.pickPlayer(PlayListNames.OUCH);

  const descriptor = props.gameDescriptor;
  const helpFileName: string | undefined = descriptor.helpFile ? descriptor.helpFile : undefined;

  const [feedbackFace, setFeedbackFace] = useState<FACES>(FACES.NONE);
  const [clockTime, setClockTime] = useState<ClockTime>(getTime());
  const [gameSettingsDisplay, setGameSettingsDisplay] = useState<string>("game-settings-global-hide");

  const hours = new Array(12).fill(null).map((_, i) => i + 1);

  function getHour(): number {
    return Math.max(Math.floor(Math.random() * 12), 1);
  }

  function getTime(): ClockTime {
    const time = {
      "hour": getHour(),
      minutes: 0
    } 
    return time;
  }

  function verifyHour(selectedHour: number) {
    if (selectedHour === clockTime.hour) {
      MediaUtil.player(playerHooray, audioOn);
      setFeedbackFace(() => FACES.HAPPY);

      setTimeout(() => {
        setFeedbackFace(() => FACES.NONE);
        let newTime = getTime();
        while (newTime.hour === clockTime.hour) {
          newTime = getTime();
        }
        setClockTime(newTime); 
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

  function handleSettingsDone(groupValueIndices: boolean[]) {
    setGameSettingsDisplay(()=>"game-settings-global-hide")
  }

  // From Banner
  // settings={() => setGameSettingsDisplay("game-settings-global-show")}
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

      <div style={{textAlign: "center"}}>
        <AnalogClock id="main" r={80} time={clockTime.hour.toString()} />

        <div>
          <span className="page-header-title font-size-xl">שָׁעָה</span>
          { 
            hours.map((hour: number, i: number) => {
              return <button key={hour} className="app-clickable clock-hour-in-list"
                onClick={()=>verifyHour(hours.length-i)}>{hours[hours.length-i-1]}</button>
            })
          }
        </div>
      </div>

      <MultiSelectionSettings
        className={ gameSettingsDisplay }
        title={descriptor.settingsTitle}
        options={descriptor.hourTypes.map((type)=> type.name)}
        handleSettingsDone={handleSettingsDone}
        handleSettingsCancel={handleSettingsCancel}
      />

    </div>
  )

}