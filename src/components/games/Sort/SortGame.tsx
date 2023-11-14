import React, { useContext, useEffect, useRef, useState } from "react";
import { SortGameDescriptorType, SortGameGroupType, SortGameImageType } from "./sortGame.types";
import { FACES, FaceFeedback } from "../../shared/FaceFeedback/FaceFeedback";

import "./SortGame.css";
import { WellDone, showWellDone } from "../../shared/WellDone/WellDone";
import GamesContext, { GamesContextType } from "../../../context/GamesContext";
import { MediaUtil } from "../../../utils/MediaUtil";
import { ModalNotification } from "../../shared/Notification/ModalNotification";
import { PlayListNames } from "../../../assets/playLists";
import { Banner } from "../../shared/Banner/Banner";
import { DeviceUtil } from "../../../utils/DeviceUtil";
import { AttentionArrow } from "../../shared/AttentionArrow/AttentionArrow";

export interface SortGameProps {
  gameDescriptor: SortGameDescriptorType;
  errorMessage?: string;
};

export const SortGame = (props: SortGameProps) => {
  const imgSize:string = DeviceUtil.imageHeight();

  const title = props.gameDescriptor.titleTemplate;
  const groups = props.gameDescriptor.groups;
  const numberOfgroups = groups.length;
  const numberOfEntities = props.gameDescriptor.entities.length;
  const selectGroupMessage = props.gameDescriptor.selectGroupMessage ? 
    props.gameDescriptor.selectGroupMessage 
  : "צריך לבחור קבוצה";

  const { 
    audioOn
  } = useContext(GamesContext) as GamesContextType;

  const [cursorStyle, setCursorStyle] = useState("pointer");
  const [currentGroup, setCurrentGroup] = useState<SortGameGroupType | undefined>(undefined);
  const [feedbackFace, setFeedbackFace] = useState<FACES>(FACES.NONE);
  const [selectedImages, setSelectedImages] = useState<Map<string,string[]>>(() => {
    let s = new Map();
    for (let i=0; i < numberOfgroups; i++) {
      s.set(groups[i].id, []);
    }
    return s;
  });
  const [sourceEntities, setSourceEntities] = 
    useState<SortGameImageType[]>(props.gameDescriptor.entities);

  const [count, setCount] = useState(0);
  const [colorSelectError, setColorSelectError] = useState(false);

  const showStartArrow = useRef<boolean>(true);

  useEffect(() => {
    if (count === numberOfEntities) {
      showWellDone(audioOn);
    }
  }, [count, audioOn, numberOfEntities]);

  const verifyImage = (e: SortGameImageType) => {
    if (!currentGroup) {
      setColorSelectError(() => true);
      return;
    }

    if (e.groupId === currentGroup.id) {
      // Update entities in group
      let a: string[] | undefined = [...(selectedImages.get(currentGroup.id)!)];
      if (!a) {
        a = [];
      }
      if (!a.includes(e.file)) {
        a = [...a, e.file];
      }
      setSelectedImages(map => new Map(map.set(currentGroup.id, a!)));

      // Remove entity from source entities
      let newArr: SortGameImageType[] = [ ...sourceEntities ];
      let sIndex: number = newArr.indexOf(e);
      if (sIndex > -1) {
        newArr.splice(sIndex,1);
        setSourceEntities(newArr);
      }
      
      setFeedbackFace(FACES.HAPPY);
      MediaUtil.play(MediaUtil.pickAudio(PlayListNames.SHORT_HOORAY), audioOn);
      setCount(count+1);
    }
    else {
      setFeedbackFace(FACES.WORRY);
      MediaUtil.play(MediaUtil.pickAudio(PlayListNames.OUCH), audioOn);
    }
  }

  const closeModal = () => {
    setColorSelectError(() => false);
  }

  const updateGroup = (group: SortGameGroupType) => {
    setCursorStyle(() => group.cursor ? `url("${group.cursor}"), pointer` : 'pointer');
    showStartArrow.current = false;
    setCurrentGroup(group);
  }

  const groupColumnWidth = (100 / numberOfgroups) + "%";

  return (
    <div className="app-page">
      <Banner />
      <ModalNotification text={selectGroupMessage} show={colorSelectError ? true : false}
        onDismiss={() => closeModal()}/>
      
      <div  className="app-title-centered">{title}</div>
      <div className="sort-game-entities">
        {sourceEntities.map((e,i) =>
          <img id={"bank-" + e.id} key={i} src={MediaUtil.getCatalogImage(e.file)} 
            alt={e.title} 
            height={imgSize}
            style={{cursor: cursorStyle}}
            onClick={() => verifyImage(e)}
            className="sort-game-source-img"></img>
        )}
      </div>

      <div style={{height: "40px", cursor: cursorStyle}}>
        { showStartArrow.current && <AttentionArrow /> }
      </div>
      
      <div>
        <table width="100%">
          <tbody>
            <tr>
              {groups.map((group) => 
                <td className="sort-game-group-entities" id={`entities-${group.id}`} key={group.id}
                  width={ groupColumnWidth } onClick={() => updateGroup(group)}
                  style={{cursor: cursorStyle}}>
                    {selectedImages.get(group.id)!.map((imageFile,i) => 
                      <span key={i}>
                        <img src={MediaUtil.getCatalogImage(imageFile)} height="64px" 
                          alt=""/>
                      </span>
                    )}
                </td>
              )}
              <td>
                &nbsp;
              </td>
            </tr>
            <tr>
              {groups.map((group) =>
                <td key={group.id} className="sort-game-group-row">
                  <div className="sort-game-group-cell" style={{cursor: cursorStyle}}
                    onClick={() => updateGroup(group)}>
                    { group.image ?
                        <img src={MediaUtil.getCatalogImage(group.image)} height={imgSize} 
                          alt={group.title} /> 
                      : <></>
                    }
                  </div>
                  <div className={group.image ? "sort-game-group-label" : "sort-game-group-label-no-image"}  
                    style={{cursor: cursorStyle}}
                    onClick={() => updateGroup(group)}> 
                      { group.title }
                  </div>
                </td>
              )}
              <td width={"100%"} className="sort-game-face-feedback"><FaceFeedback 
                face={feedbackFace} /></td>
            </tr>
          </tbody>
        </table>
      </div>

      <WellDone />
    </div>
  )
}