import React, { useContext, useRef, useState } from "react";

import "./../../../assets/styles/global.css";
import "./Pairs.css";

import { Banner } from "../../global/Banner/Banner";
import { PairsDescriptorType, PairsItem, PairsTupple } from "../../../model/componentDescriptors.types";

import { ConstantsUtil, PAIRS_LAYOUT } from "../../../utils/ConstantsUtil";
import { MediaUtil } from "../../../utils/MediaUtil";
import { FACES } from "../../shared/FaceFeedback/FaceFeedback";
import { ObjectsUtil } from "../../../utils/ObjectsUtil";
import { showWellDone } from "../../shared/WellDone/WellDone";
import { useNavigate } from "react-router-dom";
import GamesContext, { GamesContextType } from "../../../context/GamesContext";
import { PlayListNames } from "../../../assets/playLists";
import { PageHeader } from "../../shared/PageHeader/PageHeader";
import { MultiSelectionSettings } from "../../shared/MultiSelectionSettings/MultiSelectionSettings";
import { GeneralUtil } from "../../../utils/GeneralUtil";

interface ActiveItemsType extends PairsItem {
  matchItem: string;
}

/********************************************
 * Pairs game 
 * List of words that is composed of pairs. the User clicks a word and then its pair.
 */
export interface PairsPropsType {
  gameDescriptor: PairsDescriptorType;
}

export const Pairs = (props: PairsPropsType) => {
  const { 
    audioOn, 
  } = useContext(GamesContext) as GamesContextType;

  const playerHooray:HTMLAudioElement = MediaUtil.pickPlayer(PlayListNames.SHORT_HOORAY);
  const playerOuch:HTMLAudioElement = MediaUtil.pickPlayer(PlayListNames.OUCH);

  const navigate = useNavigate();

  const maxNumberOfPairs = 6;

  /***
   * Retrieve game descriptor values to local variables
   */
  const descriptor: PairsDescriptorType = props.gameDescriptor;

  const title = descriptor.title ? descriptor.title : "";
  const titleAudioHover = descriptor.titleAudioHover ? descriptor.titleAudioHover : undefined;
  const items: PairsTupple = descriptor.items;
  const layout = descriptor.layout ? descriptor.layout : PAIRS_LAYOUT.FLOAT_TEXT;

  let numberOfPairs = useRef<number>(Math.min(items.length, maxNumberOfPairs));
  const [shuffledItems, setShuffledItems] = 
    useState<ActiveItemsType[]>(ObjectsUtil.shuffleArrayItems(
      serializeItems(items.slice(0, numberOfPairs.current))
    ));
  
  let clickCount = useRef<number>(-1);
  let lastItem = useRef<ActiveItemsType | undefined>(undefined);

  const helpFileName: string | undefined = descriptor.helpFile ? descriptor.helpFile : undefined;

  const [gameSettingsDisplay, setGameSettingsDisplay] = useState<string>("game-settings-global-hide");
  const [feedbackFace, setFeedbackFace] = useState<FACES>(FACES.NONE);

  function serializeItems(sourceItems: PairsTupple): Array<ActiveItemsType> {
    let itemsArray: ActiveItemsType[] = new Array(0);
    for (let i=0; i < sourceItems.length; i++) {
      let item1: ActiveItemsType = { 
        ...sourceItems[i][0],
        matchItem: sourceItems[i][1].id
      };
      let item2: ActiveItemsType = { 
        ...sourceItems[i][1],
        matchItem: sourceItems[i][0].id
      };
      itemsArray.push(item1);
      itemsArray.push(item2);
    }
    return itemsArray;
  }

  function highlightClickedItem(item: PairsItem) {
    let clickedItem = document.getElementById(item.id);
    clickedItem!.className = "pairs-button-selected"
  }

  function hidePair(item: ActiveItemsType) {
    document.getElementById(item.id)!.classList.add("pairs-hide-item");
    document.getElementById(item.matchItem)!.classList.add("pairs-hide-item");    
  }

  function itemClickHandler(item: ActiveItemsType) {
    clickCount.current = (clickCount.current+1) % 2;
    if (clickCount.current === 0) {
      setFeedbackFace(FACES.NONE);
      lastItem.current = item;
      highlightClickedItem(item);
    }
    else if (item.matchItem === lastItem.current?.id) {
      highlightClickedItem(item);
      hidePair(item);
      lastItem.current = undefined;  
      numberOfPairs.current--;  
      if (numberOfPairs.current === 0) {
        showWellDone(audioOn); 
      }
      else {
        setFeedbackFace(FACES.HAPPY);
        MediaUtil.player(playerHooray, audioOn);
      }
      setTimeout(() => { 
        if (numberOfPairs.current === 0) {
          navigate(GeneralUtil.targetNavigationOnGameOver());
        }
        else {
          setFeedbackFace(FACES.NONE);
        }
      }, ConstantsUtil.hoorayShortTimeout);
    }
    else {
      clickCount.current = (clickCount.current-1) % 2;  // Reset second click
      setFeedbackFace(FACES.WORRY);
      MediaUtil.player(playerOuch, audioOn);
      setTimeout(() => {
        setFeedbackFace(() => FACES.NONE);
      }, ConstantsUtil.hoorayTimeout)
    }
  }

  function handleSettingsCancel() {
    setGameSettingsDisplay(()=>"game-settings-global-hide"); 
  }

  function handleSettingsDone(tupleIndices: boolean[]) {
    let selectedPairs: Array<[PairsItem, PairsItem]> = Array(0);
    for (let i=0; i < tupleIndices.length; i++) {
      if (tupleIndices[i]) {
        selectedPairs.push(items[i]);
      }
    }
    numberOfPairs.current = selectedPairs.length;

    const selectedItems: ActiveItemsType[] = (ObjectsUtil.shuffleArrayItems(
      serializeItems(selectedPairs)
    ));

    clickCount.current = -1;
    setShuffledItems(()=>selectedItems);
    setGameSettingsDisplay(()=>"game-settings-global-hide")
  }

  return(
    <div className="app-page">
      <Banner gameId={descriptor.gameId} 
        helpFile={helpFileName} 
        isQuiz={descriptor.isQuiz}
        settings={() => setGameSettingsDisplay("game-settings-global-show")}/>

      <div className="pairs-page-content">
        <PageHeader title={title} 
          audioHover={titleAudioHover}
          feedbackFace={feedbackFace}/>      

        { layout === PAIRS_LAYOUT.FLOAT_TEXT && shuffledItems.length > 0 &&
          <div>
            {
              shuffledItems.map((item,i) =>
                <button key={item.id} className="app-button-widget" 
                  id={item.id}
                  onClick={ () => itemClickHandler(item)} >
                  {item.title}
                </button>
              )
            }
          </div>
        }
      </div>
      
      { maxNumberOfPairs > 0 &&
        <MultiSelectionSettings
        className={ gameSettingsDisplay }
        title={descriptor.settingsTitle}
        maxNumberOfValidGroups={maxNumberOfPairs}
        options={items.map((tupple)=> `${tupple[0].title}-${tupple[1].title}`)}
        handleSettingsDone={handleSettingsDone}
        handleSettingsCancel={handleSettingsCancel}
      />
      }

    </div>
  )
}