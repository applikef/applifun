import React, { ChangeEvent, useContext, useEffect, useRef, useState } from "react";

import "./Sequence.css";

import { FACES, FaceFeedback } from "../../shared/FaceFeedback/FaceFeedback";
import { WellDone, hideWellDone, showWellDone } from "../../shared/WellDone/WellDone";

import { MediaUtil } from "../../../utils/MediaUtil";
import { ObjectsUtil } from "../../../utils/ObjectsUtil";
import { PlayListNames } from "../../../assets/playLists";
import { Banner } from "../../shared/Banner/Banner";
import GamesContext, { GamesContextType } from "../../../context/GamesContext";
import { NumberSequenceDescriptorType, NumberListDescriptorType } from "./Sequence.types";
import { ConstantsUtil } from "../../../utils/ConstantsUtil";
import { useNavigate } from "react-router-dom";

const enum NumbersOrder {
  UP,
  DOWN
}

interface ViewEntry {
  value: number;
  show: boolean;
}

export interface NumberSequenceSettings {
  selectedNumberListIndices: boolean[],
  direction: NumbersOrder
}

export interface NumbersSequenceProps {
  gameDescriptor: NumberSequenceDescriptorType;
};

export const NumbersSequence = (props: NumbersSequenceProps) => {
  const numberListsCatalog = props.gameDescriptor.numberLists;
  const numberListsCatalogSize = numberListsCatalog.length;
  const gamePageTitle:string = props.gameDescriptor.title ? props.gameDescriptor.title : "";

  const { 
    audioOn 
  } = useContext(GamesContext) as GamesContextType;

  const playerHooray:HTMLAudioElement = MediaUtil.pickPlayer(PlayListNames.SHORT_HOORAY);
  const playerOuch:HTMLAudioElement = MediaUtil.pickPlayer(PlayListNames.OUCH);

  const Directions = {
    "UP": {
      id: NumbersOrder.UP,
      title: "עולה"
    },
    "DOWN": {
      id: NumbersOrder.DOWN,
      title: "יורד"
    }
  }

  const titleUp = gamePageTitle.replace("$value$", Directions.UP.title);
  const titleDown = gamePageTitle.replace("$value$", Directions.DOWN.title);

  const navigate = useNavigate();

  let selectedSequenceSteps = useRef<number[]>([]);
  function addSequenceStep(id: number) {
    selectedSequenceSteps.current.push(id);
  };

  const [numberLists, setNumberLists] = 
    useState<NumberListDescriptorType[]>(props.gameDescriptor.numberLists ?
      props.gameDescriptor.numberLists
//    ObjectsUtil.shuffleArrayItems(props.gameDescriptor.numberLists) 
    : []);
  const numberOfNumberLists = useRef<number>(props.gameDescriptor.numberLists!.length);

  const [feedbackFace, setFeedbackFace] = useState<FACES>(FACES.NONE);
  const [pageTitle, setPageTitle] = useState(titleUp);
  const [numberList, setNumberList] = useState<NumberListDescriptorType>(numberLists[0]);
  const [orderedNumbers, setOrderedNumbers] = useState<ViewEntry[]>([]);
  const [shuffledNumbers, setShuffledNumbers] = useState<ViewEntry[]>([]);
  const [gameSettinsDisplay, setGameSettinsDisplay] = useState<string>("game-settings-global-hide");
  const [pendingSelectedNumberListIndices, setPendingSelectedNumberListIndices] =
    useState<boolean[]>([]);
  const [selectedNumberListIndices, setSelectedNumberListIndices] =
    useState<boolean[]>([]);

  const [pendingDirection, setPendingDirection] = useState<NumbersOrder>(Directions.UP.id);
  const [direction, setDirection] = useState<NumbersOrder>(Directions.UP.id);

  let currentIndex = useRef<number>(0);

  useEffect(() => {
    setSelectedNumberListIndices(() => Array(numberListsCatalogSize).fill(true));
  }, [numberListsCatalogSize]);

  useEffect(() => {
    numberOfNumberLists.current = numberLists.length;
    setNumberList(numberLists[0]);
  }, [numberLists]);

  useEffect(() => {
    let tmpOrderedNumbers: number[] = [];
    if (numberList.range !== undefined && numberList.range.length === 2) {
      const length = numberList.range[1] - numberList.range[0] + 1;
      tmpOrderedNumbers = Array.from({length: length}, (_, i) => i + numberList.range![0])
    }
    else {      // value is defined and numbers are provided in order
      tmpOrderedNumbers = numberList.values!;
    }
    alert(tmpOrderedNumbers[0]);
    alert(direction);

    if (direction === NumbersOrder.DOWN) {
      tmpOrderedNumbers = tmpOrderedNumbers.reverse();
    }

    setOrderedNumbers(tmpOrderedNumbers.map((n:number) => {
      return({
        value: n,
        show: false
      });
    }));    

    setShuffledNumbers(() => 
      ObjectsUtil.shuffleArrayItems(tmpOrderedNumbers).map((n:number) => {
        return({
          value: n,
          show: true
        });
    }));
  }, [numberList, direction]);

  function getFeedbackId(n: number): string {
    return `feedback-${numberList.id}-${n}`;
  }

  function getBankId(n: number): string {
    return `bank-${numberList.id}-${n}`;
  }

  function getNumberIndex(numbersArr: ViewEntry[], n: number) {
    for (let i=0; i < numbersArr.length; i++) {
      const numberItem: ViewEntry = numbersArr[i];
      if (numberItem.value === n) {
        return i;
      }
    }
    return -1;
  }

  function verifyNumber(number: ViewEntry) {
    const numberValue: number = number.value;
    const numberOrderedIndex = getNumberIndex(orderedNumbers, numberValue);
    const numberShuffledIndex = getNumberIndex(shuffledNumbers, numberValue);
    if (numberOrderedIndex === selectedSequenceSteps.current.length) {
      addSequenceStep(numberValue);
      orderedNumbers[numberOrderedIndex].show = true;
      setOrderedNumbers([...orderedNumbers]);
      shuffledNumbers[numberShuffledIndex].show = false;
      setShuffledNumbers([...shuffledNumbers])

      setFeedbackFace(() => FACES.HAPPY);
      if (numberOrderedIndex === orderedNumbers.length-1) {
        showWellDone(audioOn);
        setTimeout(() => {
          getNextNumberList();
        }, ConstantsUtil.hoorayTimeout); 
      }
      else {
        MediaUtil.player(playerHooray, audioOn);
      }
    }
    else {
      setFeedbackFace(() => FACES.WORRY);
      MediaUtil.player(playerOuch, audioOn);
    }
  }

  function getNextNumberList() { 
    setTimeout(() =>{
      if (currentIndex.current < numberOfNumberLists.current-1) {
        // reset view
        selectedSequenceSteps.current = [];
        setFeedbackFace(FACES.NONE);
        //NETTA setPageTitle(() => direction === "UP" ? titleUp : titleDown);
        hideWellDone();

        currentIndex.current++;
        setNumberList(numberLists[currentIndex.current]);    
      }
      else {
        setTimeout(() => {
          navigate("/home");
        }, ConstantsUtil.hoorayTimeout);        
      }
    }, ConstantsUtil.hoorayTimeout)
  }

  function handleSettingsSelectNumberList(e:ChangeEvent<HTMLInputElement>, index: number) : boolean[] {
    const isChecked = e.target.checked;
    let settingArr = new Array(...pendingSelectedNumberListIndices)
    if (isChecked) {
        settingArr[index] = true;
    }
    else {
      settingArr[index] = false;
    }
    return settingArr;  
  }
  
  function handleSettingsCancel() {
    setGameSettinsDisplay(()=>"game-settings-global-hide"); 
  }

  function handleSettingsDone() {
    let newNumberLists:NumberListDescriptorType[] = [];
    for (let i=0; i < numberListsCatalogSize; i++) {
      if (pendingSelectedNumberListIndices[i]) {
        newNumberLists.push(numberListsCatalog[i]);
      }
    }
    selectedSequenceSteps.current = [];
    currentIndex.current = 0;
    setFeedbackFace(FACES.NONE);
    hideWellDone();

//    setNumberLists(()=>ObjectsUtil.shuffleArrayItems(newNumberLists));
    setNumberLists(()=>newNumberLists);
    setSelectedNumberListIndices(()=>pendingSelectedNumberListIndices);
    setDirection(() => pendingDirection);
    setPageTitle(() => pendingDirection === NumbersOrder.UP ? titleUp : titleDown);

    setGameSettinsDisplay(()=>"game-settings-global-hide")
  }

  return (
    <div className="app-page">
      <Banner settings={() => {
        setPendingSelectedNumberListIndices(() => selectedNumberListIndices);
        setPendingDirection(() => direction);
        setGameSettinsDisplay("game-settings-global-show")
      }}/>

      <div className="letters-sequence-global">
        <div className="sequence-container">
          <div className="app-title">{ pageTitle }</div>
          <div id="bank-area" className="sequence-source-images" >
            { shuffledNumbers.map((e:ViewEntry) =>
                e.show && <span className="sequence-letter" id={getBankId(e.value)} key={e.value} 
                  onClick={() => verifyNumber(e)}>{e.value}</span>
              )
            }
          </div>
        </div>

        <div className="sequence-feedback">
          <h3>
            פה למטה נראה את המספרים מסודרים
          </h3>

          <div>
          <div id="feedback-area">
            { orderedNumbers.map((e:ViewEntry) =>
                  e.show && <span className="sequence-feedback-letter sequence-letter" 
                    id={getFeedbackId(e.value)} 
                    key={e.value}>
                      {e.value}
                  </span>
                )
            }
          </div>  
            <span><FaceFeedback face={feedbackFace} /></span>
          </div>
        </div>
      </div>

      <WellDone />

      <div id="gameSettings" className={ gameSettinsDisplay }>
        <div>
          <div className="game-settings-title">
            { props.gameDescriptor.settingsTitle ?
                props.gameDescriptor.settingsTitle
              : "" 
            }
          </div>
          
          { numberListsCatalog.map(
            (numberList, i) => 
              <div className="game-settings-entry" key={i}>
                <input type="checkbox"
                  checked={pendingSelectedNumberListIndices[i]} 
                  onChange={(e:ChangeEvent<HTMLInputElement>) => {
                    const settingArr: boolean[] = handleSettingsSelectNumberList(e, i);
                    setPendingSelectedNumberListIndices(settingArr);
                  }}></input>
                <span key={i}>{numberList.name}</span>
              </div>
          )}
          <br/>
          <div>סדר המספרים</div>
          { Object.values(Directions).map(
            (d, i) => 
              <div className="game-settings-entry" key={i}>
                <input type="radio" name="direction"
                  checked={pendingDirection === d.id} 
                  onChange={(e:ChangeEvent<HTMLInputElement>) => {
                    setPendingDirection(d.id);
                  }}></input>
                <span key={i}>{d.title}</span>
              </div>
          )}
          <br/>
          <button className="app-button-primary-sm" onClick={() => {
            handleSettingsDone(); 
          }}>שמור</button>
          <button className="app-button-ghost-sm" onClick={() => {
            handleSettingsCancel();
          }}>בטל</button>
        </div>
      </div>

    </div>
  )
}