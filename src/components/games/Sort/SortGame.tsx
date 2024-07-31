import React, { useContext, useRef, useState } from "react";
import { SortGameDescriptorType, SortGameGroupType, SortGameImageType } from "./sortGame.types";
import { FACES } from "../../shared/FaceFeedback/FaceFeedback";

import "./SortGame.css";
import { showWellDone } from "../../shared/WellDone/WellDone";
import GamesContext, { GamesContextType } from "../../../context/GamesContext";
import { MediaUtil } from "../../../utils/MediaUtil";
import { ModalNotification } from "../../shared/Notification/ModalNotification";
import { PlayListNames } from "../../../assets/playLists";
import { Banner } from "../../global/Banner/Banner";
import { DeviceUtil } from "../../../utils/DeviceUtil";
import { PageHeader } from "../../shared/PageHeader/PageHeader";

export interface SortGameProps {
  gameDescriptor: SortGameDescriptorType;
  errorMessage?: string;
};

export const SortGame = (props: SortGameProps) => {
  const { 
    audioOn,
    isTablet 
  } = useContext(GamesContext) as GamesContextType;

  const imgSize:string = DeviceUtil.imageHeight(isTablet);
  const groupImgSize:string = DeviceUtil.imageHeightSmall(isTablet);

  const title = props.gameDescriptor.titleTemplate;
  const groups = props.gameDescriptor.groups;
  const numberOfgroups = groups.length;
  const numberOfEntities = props.gameDescriptor.entities.length;
  const selectGroupMessage = props.gameDescriptor.selectGroupMessage ? 
    props.gameDescriptor.selectGroupMessage 
  : "צריך לבחור קבוצה";

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

  const [entityIndex, setEntityIndex] = useState(0);
  const [colorSelectError, setColorSelectError] = useState(false);

  const showStartArrow = useRef<boolean>(true);

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
      if (entityIndex === numberOfEntities-1) {
        setFeedbackFace(FACES.NONE);
        showWellDone(audioOn);
      }
      else {
        MediaUtil.play(MediaUtil.pickAudio(PlayListNames.SHORT_HOORAY), audioOn);
        setEntityIndex(entityIndex+1);
      }
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
      <Banner gameId={props.gameDescriptor.gameId} />
      <ModalNotification text={selectGroupMessage} show={colorSelectError ? true : false}
        onDismiss={() => closeModal()}/>
      
      <PageHeader title={title} feedbackFace={feedbackFace}/>      

      <div>
        <table width="100%">
          <tbody>
          <tr>
              {groups.map((group) =>
                <td key={group.id} className="sort-game-group-row">
                  <div className="sort-game-group-cell" style={{cursor: cursorStyle}}
                    onClick={() => updateGroup(group)}>
                    { group.image ?
                        <img src={MediaUtil.getCatalogImage(group.image)} height={groupImgSize} 
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
            </tr>
            <tr>
              {groups.map((group) => 
                <td className="sort-game-group-entities" id={`entities-${group.id}`} key={group.id}
                  width={ groupColumnWidth } onClick={() => updateGroup(group)}
                  style={{cursor: cursorStyle}}>
                    {selectedImages.get(group.id)!.map((imageFile,i) => 
                      <span key={i}>
                        <img src={MediaUtil.getCatalogImage(imageFile)} 
                          height={DeviceUtil.getImageSizeAsStr(isTablet, 92)} 
                          alt=""/>
                      </span>
                    )}
                </td>
              )}
              <td>
                &nbsp;
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
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
    </div>
  )
}