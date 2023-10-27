import React, { useRef, useState } from "react";

import "./../../../assets/styles/global.css";
import "./Match.css";

import { Banner } from "../../shared/Banner/Banner";
import { MatchDescriptorType } from "../../componentDescriptors.types";
import { DeviceUtil } from "../../../utils/DeviceUtil.utils";

export interface MatchPropsType {
  gameDescriptor: MatchDescriptorType;
}

export const Match = (props: MatchPropsType) => {
  const playerHooray = new Audio("resources/audio/hooray-short-1.mp3");
  const playerOi = new Audio("resources/audio/ouch-2.mp3");

  const titleTemplate = props.gameDescriptor.titleTemplate
  const titleVariableValues = props.gameDescriptor.titleVariableValues
  const groupFiles = props.gameDescriptor.groupFiles;
  const groupIds = props.gameDescriptor.groupIds;
  const groupNames = props.gameDescriptor.groupNames;
  const imageGroupIds = props.gameDescriptor.imageGroupIds;
  const images = props.gameDescriptor.images;

  const smallDevice = DeviceUtil.isSmallDevice();

  const [selectedIndex, setSelectedIndex] = 
    useState<number>(Math.floor(Math.random() * groupIds.length));
  const [feedbackClass, setFeedbackClass] = useState<string>("feedbackImageHide");
  const [gameSettinsDisplay, setGameSettinsDisplay] = useState<string>("game-settings-global-hide");

  let selectedGroupId = useRef(groupIds[selectedIndex])
  let selectedGroup = useRef(groupNames[selectedIndex]);
  let selectedGroupName = useRef(groupNames[selectedIndex]);

  function setTitle() {
    const titleAsArray = titleTemplate.split("$");
    if (titleAsArray.length < 3) {
      return "";
    }
    
    const titleVariableValue = titleVariableValues[selectedIndex];
    return titleAsArray[0] + titleVariableValue + titleAsArray[2];
  }

  function setGroup() {
    let lastIndex = selectedIndex;
    let newIndex = 0;
    do {
      newIndex = Math.floor(Math.random() * groupIds.length);
    } while (newIndex === lastIndex);

    selectedGroupId.current = groupIds[newIndex];
    selectedGroup.current = groupNames[newIndex];
    selectedGroupName.current = groupNames[newIndex];

    setSelectedIndex(() => newIndex);
  }

  function updateGroup() {
    setGroup();
    setFeedbackClass(() => "feedbackImageHide");
  }

  function verifyImage(imageGroupId: string) {
    if (imageGroupId === selectedGroupId.current) {
      setFeedbackClass(() => "feedbackImageShow");
      playerHooray.play();
    }
    else {
      setFeedbackClass(() => "feedbackImageHide");
      playerOi.play();
    }
  }

  /********
  function getGameSettings() {
    setGameSettinsDisplay("game-settings-global-show");
  }

  settings={() => getGameSettings()} **********/
  return(
    <div className="app-page">
      <Banner/>
      <div id="instructions" className="app-title-centered">
        { setTitle() }
      </div>
      <div className="feedbackImage" id="feedbackImage">
        <img src="resources/games/well-done-200.png" alt="כל הכבוד" width="150px" className={feedbackClass} />      
      </div>
      <div id="groupSplash" className="groupImage">
        {
          groupFiles ?
            <img src={groupFiles[selectedIndex]} alt={ selectedGroupName.current } 
              width={smallDevice ? "100px" : "150px"} />
          :
            <span className="groupNameTitle">
              { groupIds[selectedIndex] }
            </span> 
        }
        <div className="groupName">
          { selectedGroupName.current } 
        </div>
      </div>
      <div className="imagesArea">
        {
          images.map((img,i) =>
            <img src={ img } alt="" key={i} height={smallDevice ? "100px" : "150px"}  
              onClick={() => verifyImage(imageGroupIds[i])} 
              className="imageStyle" />
          )
        }

      </div>
      <div className="controlArea">
        <button className="app-button-primary" onClick={() => updateGroup()}>{props.gameDescriptor.buttonTitle}</button>
      </div>

      <div id="gameSettings" className={ gameSettinsDisplay }>
        <div>
          <div className="game-settings-title">סמן את הקבוצות שייראו במשחק</div>
          
          { props.gameDescriptor.groupNames.map(
            (group, i) => 
              <div className="game-settings-entry">
                <input type="checkbox"></input>
                <span key={i}>{group}</span>
              </div>
          )}
          <br/>
          <button className="app-button-primary-sm" onClick={() => { 
            setGameSettinsDisplay(()=>"game-settings-global-hide")
          }}>שמור</button>
        </div>
      </div>
    </div>
  )
}