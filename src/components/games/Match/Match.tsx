import React, { ChangeEvent, useRef, useState } from "react";

import "./../../../assets/styles/global.css";
import "./Match.css";

import { Banner } from "../../shared/Banner/Banner";
import { MatchDescriptorType } from "../../componentDescriptors.types";
import { Notification, NotificationType } from "../../shared/Notification/Notification";

import { DeviceUtil } from "../../../utils/DeviceUtil";
import { ConstantsUtil } from "../../../utils/ConstantsUtil";
import { MediaUtil } from "../../../utils/MediaUtil";

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
  const playerHooray = MediaUtil.getHorrayPlayer();
  const playerOi = MediaUtil.getOuchPlayer();

  const smallDevice = DeviceUtil.isSmallDevice();

  /***
   * Retrieve game descriptor values to local variables
   */
  const titleTemplate = props.gameDescriptor.titleTemplate
  const titleVariableValues = props.gameDescriptor.titleVariableValues
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
  const [feedbackClass, setFeedbackClass] = useState<string>("feedbackImageHide");
  const [gameSettinsDisplay, setGameSettinsDisplay] = useState<string>("game-settings-global-hide");
  const [imageTitleNotification, setImageTitleNotification] = 
    useState<ImageTitleNotificationType>({
      top: 0,
      left: 0,
      content: ""
    });

  const [selectedGroupValueIndices, setSelectedGroupValueIndices] = 
    useState<boolean[]>((new Array(numberOfGroups)).fill(false).map((v,i) => i < maxNumberOfValidGroups ? true : false));

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

  function setTitle() {
    const titleAsArray = titleTemplate.split("$");
    if (titleAsArray.length < 3) {
      return "";
    }    
    const titleVariableValue = titleVariableValues[activeIndex];
    return titleAsArray[0] + titleVariableValue + titleAsArray[2];
  }

  function setActiveGroup() {
    let lastIndex = activeIndex;
    const relevantIndices = validGroupValueIndices.current.flatMap((b, i) => b ? i : []);
    let newIndex = relevantIndices[0];
    do {
      newIndex = Math.floor(Math.random() * relevantIndices.length);
    } while (relevantIndices[newIndex] === lastIndex);
    newIndex = relevantIndices[newIndex];

    activeGroupId.current = groupIds[newIndex];
    activeGroup.current = groupNames[newIndex];
    activeGroupName.current = groupNames[newIndex];

    setActiveIndex(() => newIndex);
  }

  function updateActiveGroup() {
    setActiveGroup();
    setFeedbackClass(() => "feedbackImageHide");
  }

  function verifyImage(imageGroupId: string) {
    if (imageGroupId === activeGroupId.current) {
      setFeedbackClass(() => "feedbackImageShow");
      playerHooray.play();
      setTimeout(() => {
        setFeedbackClass(() => "feedbackImageHide")
        updateActiveGroup();
      }, ConstantsUtil.hoorayTimeout)
    }
    else {
      setFeedbackClass(() => "feedbackImageHide");
      playerOi.play();
    }
  }

  function handleSettingsSelectGroup(e:ChangeEvent<HTMLInputElement>, index: number) : boolean[] {
    const isChecked = e.target.checked;
    let settingArr = new Array(...selectedGroupValueIndices)
    if (isChecked) {
      const nSelected = settingArr.filter(Boolean).length;
      if (nSelected < maxNumberOfValidGroups) {
        settingArr[index] = true;
      }
      else {
        alert(`בחרת כבר ${maxNumberOfValidGroups} כניסות`);
      }
    }
    else {
      settingArr[index] = false;
    }  
    return settingArr;  
  }
  
  function handleSettingsCancel() {
    validImages.current = getvalidImages();
    setSelectedGroupValueIndices(validGroupValueIndices.current);
    setGameSettinsDisplay(()=>"game-settings-global-hide"); 
  }

  function handleSettingsDone() {
    showImageTitleNotification.current = false;
    validGroupValueIndices.current = selectedGroupValueIndices;
    validImages.current = getvalidImages();
    setActiveGroup();
    setGameSettinsDisplay(()=>"game-settings-global-hide")
  }

  return(
    <div className="app-page">
      <Banner settings={() => setGameSettinsDisplay("game-settings-global-show")}/>
      <div id="instructions" className="app-title-centered">
        { setTitle() }
      </div>
      <div className="feedbackImage" id="feedbackImage">
        <img src="resources/images/well-done-200.png" alt="כל הכבוד" width="150px" className={feedbackClass} />      
      </div>
      <div id="groupSplash" className="groupImage">
        {
          groupFiles && groupFiles.length > 0 ?
            <img src={groupFiles[activeIndex]} alt={ activeGroupName.current } 
              width={smallDevice ? "100px" : ConstantsUtil.fullSizeIamge} />
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
              <img src={ img } alt="" key={i} height={smallDevice ? "100px" : ConstantsUtil.fullSizeIamge}  
              onClick={(event:React.MouseEvent<HTMLElement>) => {
                showImageTitleNotification.current = true;
                setImageTitleNotification({
                  top: event.clientY,
                  left: event.clientX,
                  content: imageTitles ? imageTitles[i] : ""
                })
                verifyImage(imageGroupIds[i])}} 
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
      
      <div id="gameSettings" className={ gameSettinsDisplay }>
        <div>
          <div className="game-settings-title">{ props.gameDescriptor.settingsTitle }</div>
          <div className="game-settings-title">ניתן לבחור עד {maxNumberOfValidGroups} כניסות</div>
          
          { props.gameDescriptor.groupNames.map(
            (group, i) => 
              <div className="game-settings-entry" key={i}>
                <input type="checkbox"
                  checked={selectedGroupValueIndices[i]} 
                  onChange={(e:ChangeEvent<HTMLInputElement>) => {
                    const settingArr: boolean[] = handleSettingsSelectGroup(e, i);
                    setSelectedGroupValueIndices(settingArr);
                  }}></input>
                <span key={i}>{group}</span>
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