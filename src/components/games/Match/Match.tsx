import React, { useContext, useEffect, useRef, useState } from "react";

import "./../../../assets/styles/global.css";
import "./Match.css";

import { Banner } from "../../global/Banner/Banner";
import { MatchDescriptorType, MatchItem } from "../../../model/componentDescriptors.types";
import { Notification, NotificationType } from "../../shared/Notification/Notification";

import { DeviceUtil } from "../../../utils/DeviceUtil";
import { ConstantsUtil, DIRECTION, HOME_PAGE_PATH } from "../../../utils/ConstantsUtil";
import { MediaUtil } from "../../../utils/MediaUtil";
import { FACES } from "../../shared/FaceFeedback/FaceFeedback";
import { ObjectsUtil } from "../../../utils/ObjectsUtil";
import { showWellDone } from "../../shared/WellDone/WellDone";
import { useNavigate } from "react-router-dom";
import GamesContext, { GamesContextType } from "../../../context/GamesContext";
import { PlayListNames } from "../../../assets/playLists";
import { PageHeader } from "../../shared/PageHeader/PageHeader";
import { MultiSelectionSettings } from "../../shared/MultiSelectionSettings/MultiSelectionSettings";
import { Advise } from "../../shared/Advise/Advise";

type ItemTitleNotificationType = {
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

  const [descriptor, setDescriptor] = 
    useState<MatchDescriptorType>(props.gameDescriptor);

  /***
   * Retrieve game descriptor values to local variables
   */
  const titles = descriptor.titles;
  const titleAudioKeys = descriptor.titleAudioKeys;
  const titleAudioHover = descriptor.titleAudioHover ? descriptor.titleAudioHover : undefined;
  const titleTemplate = descriptor.titleTemplate;
  const titleVariableValues = descriptor.titleVariableValues;
  const groups = descriptor.groups;
  const items = descriptor.items;
  const helpFileName: string | undefined = props.gameDescriptor.helpFile ? props.gameDescriptor.helpFile : undefined;

  const numberOfGroups = groups.length;

  const [maxNumberOfValidGroups, setMaxNumberOfValidGroups] = 
    useState<number>(Math.min(
      descriptor.maxSelectedGroups ? Math.min(descriptor.maxSelectedGroups,10) : 10,
      numberOfGroups
    ));

  const [activeIndex, setActiveIndex] = 
    useState<number>(Math.floor(Math.random() * maxNumberOfValidGroups));
  const [gameSettingsDisplay, setGameSettingsDisplay] = useState<string>("game-settings-global-hide");
  const [itemTitleNotification, setItemTitleNotification] = 
    useState<ItemTitleNotificationType>({
      top: 0,
      left: 0,
      content: ""
    });
  const [feedbackFace, setFeedbackFace] = useState<FACES>(FACES.NONE);
  const [showAdviseDetails, setshowAdviseDetails] = useState<boolean>(false);
  const [forceReset, setForceReset] = useState<boolean>(false);

  let validGroupValueIndices = 
    useRef<boolean[]>((new Array(numberOfGroups)).fill(false).map((v,i) => i < maxNumberOfValidGroups ? true : false));
  let validItems = useRef<Array<MatchItem | undefined>>(getvalidItems());

  let activeGroupId = useRef(groups[activeIndex].id);
  let activeGroupIdTitle = useRef(groups[activeIndex].title);
  let activeGroup = useRef(groups[activeIndex].name);

  let showItemTitleNotification = useRef<boolean>(false);

  useEffect(() => setForceReset(false), [forceReset]);

  /* Gor useRef current should be updated. If value is taken from the
   descriptor, it should use the parameter due to the delay of useState
   execution
  */
  function handleProfileChange(d: MatchDescriptorType) {
    setDescriptor(d);

    const maxNumberOfSelected: number = Math.min(
      d.maxSelectedGroups ? Math.min(d.maxSelectedGroups,10) : 10,
      numberOfGroups
    )
    setMaxNumberOfValidGroups(maxNumberOfSelected);

    validGroupValueIndices.current = 
      (new Array(numberOfGroups)).fill(false).map((v,i) => i < maxNumberOfSelected ? true : false);
    validItems.current = initValidItems(d);

    activeGroupId.current = d.groups[activeIndex].id;
    activeGroupIdTitle.current = d.groups[activeIndex].title;
    activeGroup.current = d.groups[activeIndex].name;

    showItemTitleNotification.current = false;
    setshowAdviseDetails(false);
    setForceReset(true);
  }

  function getGroupIndex(groupId: string) {
    for (let i=0; i < groups.length; i++) {
      if (groups[i].id === groupId) {
        return i;
      }
    }
    return -1;
  }

  function getvalidItems() {
    return items.map((item, i) => {
      let groupIndex = getGroupIndex(item.groupId);
      return (groupIndex !== -1 && validGroupValueIndices.current[groupIndex] ? 
        item : undefined);
    })
  }

  function initValidItems(d: MatchDescriptorType) {
    const items = d.items;
    return items.map((item, i) => {
      let groupIndex = getGroupIndex(item.groupId);
      return (groupIndex !== -1 && validGroupValueIndices.current[groupIndex] ? 
        item : undefined);
    })
  }

  function setTitle() : string {
    if (validItems.current.filter(x => x).length === 0) {
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
    else if (titles !== undefined && !ObjectsUtil.emptyString(titles[activeIndex])) {
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

    if (newIndex === undefined) {
      return;
    }

    activeGroupId.current = groups[newIndex].id;
    activeGroupIdTitle.current = groups[newIndex].title;
    activeGroup.current = groups[newIndex].name;

    setActiveIndex(() => newIndex);
  }

  function updateActiveGroup() {
    setActiveGroup();
    setFeedbackFace(() => FACES.NONE);
  }

  function verifyItem(item: MatchItem) {
    const itemGroupId: string = item.groupId;

    if (itemGroupId === activeGroupId.current) {
      const itemIndex = validItems.current.indexOf(item);
      validItems.current[itemIndex] = undefined;
      showItemTitleNotification.current = false;
      if (validItems.current.every((val)=> val === undefined)) {
        showWellDone(audioOn);
        setFeedbackFace(() => FACES.NONE);
        setTimeout(() => {
          navigate(HOME_PAGE_PATH);
        }, ConstantsUtil.shortPauseTimeout);
      }
      else {
        MediaUtil.player(playerHooray, audioOn);
        setFeedbackFace(() => FACES.HAPPY);
      }
      setTimeout(() => {
        updateValidGroupsOnItemMatch(item);
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

  function isGroupInValidItems(itemGroupId: string): boolean {
    for (let i=0; i < validItems.current.length; i++) {
      if (validItems.current[i]?.groupId === itemGroupId) {
        return true;
      }
    }
    return false;
  }

  /** Returns groups that are relevant for at least one item */
  function updateValidGroupsOnItemMatch(item: MatchItem) {
    const itemGroupId: string = item.groupId;
    const groupIndex = getGroupIndex(itemGroupId);
    if (groupIndex !== -1) {   // Valid group
      let clearGroup = true;
      for (let i=0; i < validItems.current.length; i++) {
        if (validItems.current[i] !== undefined && isGroupInValidItems(itemGroupId)) {    // Valid item
          clearGroup = false;
        }
      }
      if (clearGroup) {
        validGroupValueIndices.current[groupIndex] = false;
      }
    }
  }

  function handleSettingsCancel() {
    validItems.current = getvalidItems();
    setGameSettingsDisplay(()=>"game-settings-global-hide"); 
  }

  function handleSettingsDone(groupValueIndices: boolean[]) {
    validGroupValueIndices.current = groupValueIndices;
    showItemTitleNotification.current = false;
    validItems.current = getvalidItems();
    setActiveGroup();
    setGameSettingsDisplay(()=>"game-settings-global-hide")
  }

  return(
    <div className="app-page">
      <Banner gameId={descriptor.gameId} 
        profileHandler={ (d: MatchDescriptorType) => handleProfileChange(d) }
        helpFile={helpFileName} 
        isQuiz={props.gameDescriptor.isQuiz}
        settings={() => setGameSettingsDisplay("game-settings-global-show")}/>
      <div style={{display:"flex", flexDirection:"row", justifyContent: "space-between"}}>
        <PageHeader title={setTitle()} 
          audio={titleAudioKeys ? [titleAudioKeys[activeIndex]] : undefined} 
          audioHover={titleAudioHover}
          feedbackFace={feedbackFace}/>      

        { descriptor.showAdvise === true &&
          <div onClick={() => setshowAdviseDetails(!showAdviseDetails)} style={{ position: "relative" }}>
            <Advise text={descriptor.adviseText ? descriptor.adviseText : "הסתכל על הרמז"} 
              direction={DIRECTION.LTR} forceReset={ forceReset }/>
            {
              showAdviseDetails && validItems.current.map((item,i) =>
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
                    { item.title }
                </div>
            )}
          </div>
        }
      </div>
      <div id="groupSplash" className="groupImage">
        {
          groups[activeIndex].image !== undefined && 
            groups[activeIndex].image!.length > 0 ?
            <div>
              <img src={ MediaUtil.getCatalogImage(groups[activeIndex].image!) } 
                alt={ activeGroup.current } 
                width={DeviceUtil.imageHeight(isTablet)} />
              <div className="groupName">          
                { groups[activeIndex].name === activeGroup.current && 
                    <span>{ activeGroup.current }</span> 
                } 
              </div>
            </div>
          :
            <div>
              <span className="groupNameTitle">
                { groups[activeIndex].title }
              </span>
              <div className="groupName">          
                { groups[activeIndex].name !== groups[activeIndex].title &&
                    groups[activeIndex].name === activeGroup.current && 
                    <span>{ activeGroup.current }</span> 
                } 
              </div>
            </div> 
        }
      </div>
      <div className="imagesArea">
        {
          validItems.current.map((item,i) =>
            item && item.image.length > 0 &&
              <img src={ MediaUtil.getCatalogImage(item.image) } alt={item.title} 
              key={item.id} id={item.id} height={DeviceUtil.imageHeight(isTablet)}  
                onClick={(event:React.MouseEvent<HTMLElement>) => {
                  showItemTitleNotification.current = true;
                  setItemTitleNotification({
                    top: event.clientY,
                    left: event.clientX,
                    content: items[i].title ? items[i].title : ""
                  })
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
      
      { maxNumberOfValidGroups > 0 &&
        <MultiSelectionSettings
        className={ gameSettingsDisplay }
        title={descriptor.settingsTitle}
        maxNumberOfValidGroups={maxNumberOfValidGroups}
        options={groups.map((group)=> group.name)}
        handleSettingsDone={handleSettingsDone}
        handleSettingsCancel={handleSettingsCancel}
      />
      }
    </div>
  )
}