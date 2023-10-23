import React, { useRef, useState } from "react";

import "./Match.css";
import { Banner } from "../../shared/Banner/Banner";
import { MatchDescriptorType } from "./Match.types";

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

  const [selectedIndex, setSelectedIndex] = 
    useState<number>(Math.floor(Math.random() * groupIds.length));
  const [feedbackClass, setFeedbackClass] = useState<string>("feedbackImageHide");

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

  return(
    <div>
      <Banner />
      <div id="instructions" className="instructions">
        { setTitle() }
      </div>
      <div className="feedbackImage" id="feedbackImage">
        <img src="resources/games/well-done-200.png" alt="כל הכבוד" width="150px" className={feedbackClass} />      
      </div>
      <div id="groupSplash" className="groupImage">
        {
          groupFiles ?
            <img src={groupFiles[selectedIndex]} alt={ selectedGroupName.current } width="150px" />
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
            <img src={ img } alt="" key={i} height="150px"  
              onClick={() => verifyImage(imageGroupIds[i])} 
              className="imageStyle" />
          )
        }

      </div>
      <div className="controlArea">
        <button className="button" onClick={() => updateGroup()}>{props.gameDescriptor.buttonTitle}</button>
      </div>
    </div>
  )
}