import React, { useContext, useRef, useState } from "react";

import "./../../../assets/styles/global.css";
import "./Match.css";

import { Banner } from "../../global/Banner/Banner";
import { MatchDescriptorType } from "../../componentDescriptors.types";
import { Notification, NotificationType } from "../../shared/Notification/Notification";

import { DeviceUtil } from "../../../utils/DeviceUtil";
import { ConstantsUtil } from "../../../utils/ConstantsUtil";
import { MediaUtil } from "../../../utils/MediaUtil";
import { FACES } from "../../shared/FaceFeedback/FaceFeedback";
import { ObjectsUtil } from "../../../utils/ObjectsUtil";
import { showWellDone } from "../../shared/WellDone/WellDone";
import { useNavigate } from "react-router-dom";
import GamesContext, { GamesContextType } from "../../../context/GamesContext";
import { PlayListNames } from "../../../assets/playLists";
import { PageHeader } from "../../shared/PageHeader/PageHeader";
import { MultiSelectionSettings } from "../../shared/MultiSelectionSettings/MultiSelectionSettings";

type ImageTitleNotificationType = {
  top: number,
  left: number,
  content: string
}

/********************************************
 * Match game 
 * An item out of a set of items is shown at the top (number, color, letter, etc.).
 * A set of images that correspond to the various items is shown at the bottom.
 * An image that corresponds to the shown item should be clicked. If an appropriate image
 * is clicked, hooray feedback is provided and another item is shown. If the image that is
 * clicked is wrond, an ouch feedback is provided and another image-click can be attempted 
 */
export interface MatchPropsType {
  gameDescriptor: MatchDescriptorType;
}

export const Match = (props: MatchPropsType) => {
  const { 
    audioOn, 
    isTablet
  } = useContext(GamesContext) as GamesContextType;

  const playerHooray:HTMLAudioElement = MediaUtil.pickPlayer(PlayListNames.SHORT_HOORAY);
  const playerOuch:HTMLAudioElement = MediaUtil.pickPlayer(PlayListNames.OUCH);

  const navigate = useNavigate();

  /***
   * Retrieve game descriptor values to local variables
   */
  const titles = props.gameDescriptor.titles;
  const titleAudioKeys = props.gameDescriptor.titleAudioKeys;
  const titleAudioHover = props.gameDescriptor.titleAudioHover ? props.gameDescriptor.titleAudioHover : undefined;
  const titleTemplate = props.gameDescriptor.titleTemplate;
  const titleVariableValues = props.gameDescriptor.titleVariableValues;
  const groupIds = props.gameDescriptor.groupIds;
  const groupFiles = MediaUtil.getCatalogImages(props.gameDescriptor.groupFiles);
  const groupNames = props.gameDescriptor.groupNames;
  const imageGroupIds = props.gameDescriptor.imageGroupIds;
  const images = MediaUtil.getCatalogImages(props.gameDescriptor.images);
  const imageTitles = props.gameDescriptor.imageTitles;

  const numberOfGroups = groupIds.length;
  const maxNumberOfValidGroups = Math.min(10,numberOfGroups);

  const [activeIndex, setActiveIndex] = 
    useState<number>(Math.floor(Math.random() * maxNumberOfValidGroups));
  const [gameSettingsDisplay, setGameSettingsDisplay] = useState<string>("game-settings-global-hide");
  const [imageTitleNotification, setImageTitleNotification] = 
    useState<ImageTitleNotificationType>({
      top: 0,
      left: 0,
      content: ""
    });
  const [feedbackFace, setFeedbackFace] = useState<FACES>(FACES.NONE);

  let validGroupValueIndices = 
    useRef<boolean[]>((new Array(numberOfGroups)).fill(false).map((v,i) => i < maxNumberOfValidGroups ? true : false));
  let validImages = useRef<string[]>(getvalidImages());

  let activeGroupId = useRef(groupIds[activeIndex]);
  let activeGroup = useRef(groupNames[activeIndex]);
  let activeGroupName = useRef(groupNames[activeIndex]);

  let showImageTitleNotification = useRef<boolean>(false);

  function getvalidImages() {
    return imageGroupIds.map((groupId, i) => {
      let groupIndex = groupIds.indexOf(groupId);
      return (groupIndex !== -1 && validGroupValueIndices.current[groupIndex] ? images[i] : "");
    })
  }

  function setTitle() : string {
    if (validImages.current.filter(x => x.length > 0).length === 0) {
      return "כל הכבוד!";
    }

    if (titleTemplate) {
      const titleAsArray = titleTemplate.split("$");
      if (titleAsArray.length < 3) {
        return titleAsArray[0];
      } 
      else if (titleVariableValues) {   
        const titleVariableValue = titleVariableValues[activeIndex];
        return titleAsArray[0] + titleVariableValue + titleAsArray[2];
      }
    }
    else if (titles && !ObjectsUtil.emptyString(titles[activeIndex])) {
      return titles[activeIndex];
    }
    return "";
  }

  function multipleGroupsProvided(): boolean {
    return (validGroupValueIndices.current.filter(x => x===true).length > 1)
  }

  function setActiveGroup() {
    let lastIndex = activeIndex;
    const relevantIndices = validGroupValueIndices.current.flatMap((b, i) => b ? i : []);
    let newIndex = relevantIndices[0];
    do {
      newIndex = Math.floor(Math.random() * relevantIndices.length);
    } while (relevantIndices[newIndex] === lastIndex && multipleGroupsProvided());
    newIndex = relevantIndices[newIndex];

    activeGroupId.current = groupIds[newIndex];
    activeGroup.current = groupNames[newIndex];
    activeGroupName.current = groupNames[newIndex];

    setActiveIndex(() => newIndex);
  }

  function updateActiveGroup() {
    setActiveGroup();
    setFeedbackFace(() => FACES.NONE);
  }

  function verifyImage(imageIndex: number) {
    const imageGroupId: string = imageGroupIds[imageIndex];

    if (imageGroupId === activeGroupId.current) {
      validImages.current[imageIndex] = "";
      showImageTitleNotification.current = false;
      if (validImages.current.every(ObjectsUtil.emptyString)) {
        showWellDone(audioOn);
        setFeedbackFace(() => FACES.NONE);
        setTimeout(() => {
          navigate("/");
        }, ConstantsUtil.pauseTimeout);
      }
      else {
        MediaUtil.player(playerHooray, audioOn);
        setFeedbackFace(() => FACES.HAPPY);
      }
      setTimeout(() => {
        updateValidGroupsOnItemMatch(imageIndex);
        // NETTA REQUIRED? setSelectedGroupValueIndices(validGroupValueIndices.current);
        setFeedbackFace(() => FACES.NONE);
        updateActiveGroup();
      }, ConstantsUtil.hoorayTimeout)
    }
    else {
      setFeedbackFace(() => FACES.WORRY);
      MediaUtil.player(playerOuch, audioOn);
      setTimeout(() => {
        setFeedbackFace(() => FACES.NONE);
      }, ConstantsUtil.hoorayTimeout)
    }
  }

  /** Returns groups that are relevant for at least one image */
  function updateValidGroupsOnItemMatch(imageIndex: number) {
    const imageGroupId: string = imageGroupIds[imageIndex];
    const groupIndex = groupIds.indexOf(imageGroupId);
    if (validGroupValueIndices.current[groupIndex]) {   // Valid group
      let clearGroup = true;
      for (let i=0; i < validImages.current.length; i++) {
        if (validImages.current[i].length > 0 && imageGroupIds[i] === imageGroupId) {    // Valid image
          clearGroup = false;
        }
      }
      if (clearGroup) {
        validGroupValueIndices.current[groupIndex] = false;
      }
    }
  }

  function handleSettingsCancel() {
    validImages.current = getvalidImages();
    setGameSettingsDisplay(()=>"game-settings-global-hide"); 
  }

  function handleSettingsDone(groupValueIndices: boolean[]) {
    validGroupValueIndices.current = groupValueIndices;
    showImageTitleNotification.current = false;
    validImages.current = getvalidImages();
    setActiveGroup();
    setGameSettingsDisplay(()=>"game-settings-global-hide")
  }

  return(
    <div className="app-page">
      <Banner gameId={props.gameDescriptor.gameId} 
        settings={() => setGameSettingsDisplay("game-settings-global-show")}/>

      <PageHeader title={setTitle()} 
        audio={titleAudioKeys ? [titleAudioKeys[activeIndex]] : undefined} 
        audioHover={titleAudioHover}
        feedbackFace={feedbackFace}/>      

      <div id="groupSplash" className="groupImage">
        {
          groupFiles && groupFiles.length > 0 ?
            <img src={groupFiles[activeIndex]} alt={ activeGroupName.current } 
              width={DeviceUtil.imageHeight(isTablet)} />
          :
            <span className="groupNameTitle">
              { groupIds[activeIndex] }
            </span> 
        }
        <div className="groupName">
          { activeGroupName.current } 
        </div>
      </div>
      <div className="imagesArea">
        {
          validImages.current.map((img,i) =>
            img.length > 0 &&
              <img src={ img } alt="" key={i} height={DeviceUtil.imageHeight(isTablet)}  
              onClick={(event:React.MouseEvent<HTMLElement>) => {
                showImageTitleNotification.current = true;
                setImageTitleNotification({
                  top: event.clientY,
                  left: event.clientX,
                  content: imageTitles ? imageTitles[i] : ""
                })
                verifyImage(i)}} 
              className="imageStyle" />
          )
        }
      </div>
      
      { showImageTitleNotification.current &&
        <Notification 
          type={NotificationType.PLAIN}
          content={[imageTitleNotification.content]} 
          style={{
            position: "absolute",
            top: imageTitleNotification.top,
            left: imageTitleNotification.left,
            display: imageTitleNotification.content.length > 0 ? "inline" : "none"
          }} 
        />
      }
      
        <MultiSelectionSettings
          className={ gameSettingsDisplay }
          title={props.gameDescriptor.settingsTitle}
          maxNumberOfValidGroups={maxNumberOfValidGroups}
          options={props.gameDescriptor.groupNames}
          handleSettingsDone={handleSettingsDone}
          handleSettingsCancel={handleSettingsCancel}
        />
    </div>
  )
}