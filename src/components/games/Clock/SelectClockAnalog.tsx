import React, { useContext, useRef, useState } from "react";
import { AnalogClock } from "../../shared/AnalogClock/AnalogClock";
import { SelectClockAnalogDescriptorType } from "../../../model/componentDescriptors.types";
import { Banner } from "../../global/Banner/Banner";
import { PageHeader } from "../../shared/PageHeader/PageHeader";
import { ClockTime } from "../../../model/clock.types";
import { MediaUtil } from "../../../utils/MediaUtil";
import { PlayListNames } from "../../../assets/playLists";
import { FACES } from "../../shared/FaceFeedback/FaceFeedback";
import GamesContext, { GamesContextType } from "../../../context/GamesContext";
import { ConstantsUtil } from "../../../utils/ConstantsUtil";

export interface SelectClockAnalogType {
  gameDescriptor: SelectClockAnalogDescriptorType;
}

export const SelectClockAnalog  = (props: SelectClockAnalogType) => {
  const { 
    audioOn, 
  } = useContext(GamesContext) as GamesContextType;

  const playerHooray:HTMLAudioElement = MediaUtil.pickPlayer(PlayListNames.SHORT_HOORAY);
  const playerOuch:HTMLAudioElement = MediaUtil.pickPlayer(PlayListNames.OUCH);

  const clockTimeAsText: Array<string> = [
    "אַחַת",
    "שְׁתַּיִם",
    "שָׁלוֹשׁ",
    "אַרְבַּע",
    "חָמֵשׁ",
    "שֵׁשׁ",
    "שֶׁבַע",
    "שְׁמוֹנֶה",
    "תֵּשַׁע",
    "עֶשֶׂר",
    "אַחַת עֶשְׂרֵה",
    "שְׁתֵּים עֶשְׂרֵה"
  ];

  const descriptor = props.gameDescriptor;
  const helpFileName: string | undefined = descriptor.helpFile ? descriptor.helpFile : undefined;

  const [feedbackFace, setFeedbackFace] = useState<FACES>(FACES.NONE);
  const [clockOptions, setClockOptions] = 
    useState<Array<ClockTime>>(() => getOptionTimes());
  let clockTime = useRef(clockOptions[Math.floor(Math.random() * 4)]);
  
  const [gameSettingsDisplay, setGameSettingsDisplay] = useState<string>("game-settings-global-hide");

  const hours = new Array(12).fill(null).map((_, i) => i + 1);

  function getOptionTimes(): Array<ClockTime> {
    const numberOfOptions = 5;
    let options: Array<ClockTime> = new Array(numberOfOptions);
    // Enforce unqiness
    options[0] = getTime();
    for (let i=1; i < numberOfOptions; i++) {
      let newOption = getTime();
      let unique = false;
      while (!unique) {
        newOption = getTime();
        for (let j=0; j < Math.max(0,i); j++) {
          if (options[j].hour === newOption.hour) {   
            unique = false;         
            break;
          }
          else {
            unique = true;
          }
        }
      }
      options[i] = newOption;
    }
    return options;
  }

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

  function verifyClock(selectedHourIndex: number) {
    const selectedHour = clockOptions[selectedHourIndex].hour;
    if (selectedHour === clockTime.current.hour) {
      MediaUtil.player(playerHooray, audioOn);
      setFeedbackFace(() => FACES.HAPPY);

      setTimeout(() => {
        setFeedbackFace(() => FACES.NONE);
        const options = getOptionTimes();
        setClockOptions(options);
        const newTime = options[Math.floor(Math.random() * 4)];
        clockTime.current = newTime; 
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

      <div className="clock-time-label">{`${clockTimeAsText[clockTime.current.hour-1]}`}</div>
      <div style={{textAlign: "center"}}>
        {
          clockOptions.map((optionTime: ClockTime, i: number) => {
            return <span key={`clock-${i}`} onClick={()=>verifyClock(i)}>
              <AnalogClock id={`option-${i+1}`} r={80} 
                time={optionTime.hour.toString()} />
            </span>
          })
        }
      </div>
    </div>
)}