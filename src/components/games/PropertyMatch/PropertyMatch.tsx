import React, { useContext, useRef, useState } from "react";

import "./../../../assets/styles/global.css";
import "./PropertyMatch.css";

import { Banner } from "../../global/Banner/Banner";
import { Notification, NotificationType } from "../../shared/Notification/Notification";

import { DeviceUtil } from "../../../utils/DeviceUtil";
import { ConstantsUtil, DIRECTION } from "../../../utils/ConstantsUtil";
import { MediaUtil } from "../../../utils/MediaUtil";
import { FACES } from "../../shared/FaceFeedback/FaceFeedback";
import { ObjectsUtil } from "../../../utils/ObjectsUtil";
import { showWellDone } from "../../shared/WellDone/WellDone";
import { useNavigate } from "react-router-dom";
import GamesContext, { GamesContextType } from "../../../context/GamesContext";
import { PlayListNames } from "../../../assets/playLists";
import { PageHeader } from "../../shared/PageHeader/PageHeader";
import { Advise } from "../../shared/Advise/Advise";
import { GeneralUtil } from "../../../utils/GeneralUtil";
import { ScoreboardDescriptor } from "../../../model/global.types";
import { PropertyMatchDescriptorType, PropertyMatchItem } from "../../../model/componentDescriptors.types";

type ItemTitleNotificationType = {
  top: number,
  left: number,
  content: string
}

type ViewStateType = {
  items: PropertyMatchItem[],
  activeIndex: number
}

/********************************************
 * PropertyMatch game 
 * The name property of an item that is out of a set of items is shown at the top (number, color, letter, etc.).
 * If a name is not provided title is used.
 * A set of images that correspond to the various items is shown at the bottom.
 * An image that corresponds to the shown item should be clicked. If an appropriate image
 * is clicked, hooray feedback is provided and another item is shown. If the image that is
 * clicked is wrond, an ouch feedback is provided and another image-click can be attempted 
 */
export interface PropertyMatchPropsType {
  gameDescriptor: PropertyMatchDescriptorType;
}

export const PropertyMatch = (props: PropertyMatchPropsType) => {
  const { 
    audioOn, 
    isTablet
  } = useContext(GamesContext) as GamesContextType;

  const playerHooray:HTMLAudioElement = MediaUtil.pickPlayer(PlayListNames.SHORT_HOORAY);
  const playerOuch:HTMLAudioElement = MediaUtil.pickPlayer(PlayListNames.OUCH);

  const defaultMaxNumberOfValidItems: number = 10;

  const navigate = useNavigate();

  /***
   * Retrieve game descriptor values to local variables
   */
  let descriptor = useRef(props.gameDescriptor);
  const titleTemplate = descriptor.current.titleTemplate;
  const helpFileName = descriptor.current.helpFile ? 
      descriptor.current.helpFile 
    : undefined;

  const numberOfItems = descriptor.current.items.length;
  const maxNumberOfValidItems: number = 
    Math.min(numberOfItems, defaultMaxNumberOfValidItems);

  // let items: PropertyMatchItem[], 
  const [viewState, setViewState] = useState<ViewStateType>({
    items: ObjectsUtil.getRandomElements(descriptor.current.items, maxNumberOfValidItems),
    activeIndex: Math.floor(Math.random() * maxNumberOfValidItems)
  });

  const [itemTitleNotification, setItemTitleNotification] = 
    useState<ItemTitleNotificationType>({
      top: 0,
      left: 0,
      content: ""
    });
  const [feedbackFace, setFeedbackFace] = useState<FACES>(FACES.NONE);
  const [showAdviseDetails, setshowAdviseDetails] = useState<boolean>(false);

  let initialScores =  {
    scores: 0, 
    totalScores: viewState.items.filter((item) => item !== undefined).length,
    image: "resources/icons/smiley.png",
    outlineImage: "resources/icons/smiley-outline.png"
  };
  let [scores, setScores] = useState<ScoreboardDescriptor>(initialScores);

  let showItemTitleNotification = useRef<boolean>(false);

  function setTitle() : string {
    if (viewState.items.filter(x => x).length === 0) {
      return "כל הכבוד!";
    }

    const entityName = ObjectsUtil.getEntityName(viewState.items[viewState.activeIndex]);
    if (titleTemplate) {
      const titleAsArray = titleTemplate !== undefined ? 
        titleTemplate.split("$")
      : 
      [];
      if (titleAsArray.length < 3) {
        return titleAsArray[0];
      } 
      else if (entityName) {   
        return titleAsArray[0] + entityName + titleAsArray[2];
      }
    }
    else if (viewState.activeIndex > -1 && 
      !ObjectsUtil.emptyString(entityName)) {
      return entityName;
    }
    return "";
  }

  function verifyItem(item: PropertyMatchItem) {
    if (item.id === viewState.items[viewState.activeIndex].id) {
      let newItems: PropertyMatchItem[] = viewState.items.filter(item => item.id !== viewState.items[viewState.activeIndex].id);
      showItemTitleNotification.current = false;
      if (newItems.length === 0) {
        scores.scores++;
        setScores({...scores});
        showWellDone(audioOn);
        setFeedbackFace(() => FACES.NONE);
        setTimeout(() => {
          navigate(GeneralUtil.targetNavigationOnGameOver(descriptor.current.isQuiz));
        }, ConstantsUtil.gameOverPauseTimeout);
      }
      else {
        MediaUtil.player(playerHooray, audioOn);
        scores.scores++;
        setScores({...scores});
        setFeedbackFace(() => FACES.HAPPY);

        setViewState({
          items: newItems,
          activeIndex: Math.floor(Math.random() * newItems.length)
        });

        setTimeout(() => {
          setFeedbackFace(() => FACES.NONE);
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

  return(
    <div className="app-page">
      <Banner gameId={descriptor.current.gameId} 
        scoreboard={scores}
        helpFile={helpFileName} 
        isQuiz={descriptor.current.isQuiz}
      />
      <div style={{display:"flex", flexDirection:"row", justifyContent: "space-between"}}>
        <PageHeader title={setTitle()} 
          audio={viewState.items[viewState.activeIndex].titleAudioKey ? 
            [viewState.items[viewState.activeIndex].titleAudioKey!]
          : undefined} 
          audioHover={viewState.items[viewState.activeIndex].titleAudioHover ? 
            viewState.items[viewState.activeIndex].titleAudioHover 
          : ""} 
          feedbackFace={feedbackFace}/>      

        { descriptor.current.showAdvise === true &&
          <div onClick={() => setshowAdviseDetails(!showAdviseDetails)} 
            style={{ position: "relative" }}>
            <Advise text={descriptor.current.adviseText ? 
              descriptor.current.adviseText : "הסתכל על הרמז"} 
              direction={DIRECTION.LTR} forceReset={ false }/>
            {
              showAdviseDetails && viewState.items.map((item,i) =>
                item && item.image.length > 0 &&
                <div 
                  key={ i }
                  onClick={(event) => {event.stopPropagation();}}
                  className="match-item-titles"
                  style={{
                    position: "absolute", 
                    top: document.getElementById(item.id)?.getBoundingClientRect().top,
                    left: document.getElementById(item.id)?.getBoundingClientRect().left
                  }}>
                    { ObjectsUtil.getEntityName(item) }
                </div>
            )}
          </div>
        }
      </div>
      <div id="groupSplash" className="groupImage">
        {
          <div className="groupNameTitle">
            { ObjectsUtil.getEntityName(viewState.items[viewState.activeIndex])}
          </div> 
        }
      </div>
      <div className="imagesArea">
        {
          viewState.items.map((item,i) =>
            item && item.image.length > 0 &&
              <img src={ MediaUtil.getCatalogImage(item.image) } alt={item.title} 
              key={item.id} id={item.id} height={DeviceUtil.imageHeight(isTablet)}  
                onClick={(event:React.MouseEvent<HTMLElement>) => {
                  showItemTitleNotification.current = true;
                  setItemTitleNotification({
                    top: event.clientY,
                    left: event.clientX,
                    content: ObjectsUtil.getEntityName(viewState.items[i])
                  });
                  verifyItem(item)}} 
                className="imageStyle" />
          )
        }
      </div>
      
      { showItemTitleNotification.current &&
        <Notification 
          type={NotificationType.PLAIN}
          content={[itemTitleNotification.content]} 
          style={{
            position: "absolute",
            top: itemTitleNotification.top,
            left: itemTitleNotification.left,
            display: itemTitleNotification.content.length > 0 ? "inline" : "none"
          }} 
        />
      }
    </div>
  )
}