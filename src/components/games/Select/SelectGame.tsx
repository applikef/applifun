import React, { useContext, useRef, useState } from "react";
import { SelectGameDescriptorType, SelectGameGroupType, SelectGameImageType } from "./selectGame.types";
import { FACES, FaceFeedback } from "../../shared/FaceFeedback/FaceFeedback";

import "./SelectGame.css";
import { WellDone, showWellDone } from "../../shared/WellDone/WellDone";
import GamesContext, { GamesContextType } from "../../../context/GamesContext";
import { MediaUtil } from "../../../utils/MediaUtil";
import { ModalNotification } from "../../shared/Notification/ModalNotification";
import { PlayListNames } from "../../../assets/playLists";
import { Banner } from "../../global/Banner/Banner";
import { DeviceUtil } from "../../../utils/DeviceUtil";
import { ObjectsUtil } from "../../../utils/ObjectsUtil";

export interface SelectGameProps {
  gameDescriptor: SelectGameDescriptorType;
  errorMessage?: string;
};

export const SelectGame = (props: SelectGameProps) => {
  const imgSize:string = DeviceUtil.imageHeight();

  const activeGroup = props.gameDescriptor.groups[0];
  const title = ObjectsUtil.getTitle(props.gameDescriptor.titleTemplate, activeGroup.title);
  const numberOfEntities = props.gameDescriptor.entities.length;

  const { 
    audioOn
  } = useContext(GamesContext) as GamesContextType;

  const [cursorStyle, setCursorStyle] = useState("pointer");
  const [currentGroup, setCurrentGroup] = useState<SelectGameGroupType | undefined>(activeGroup);
  const [feedbackFace, setFeedbackFace] = useState<FACES>(FACES.NONE);
  const [selectedImages, setSelectedImages] = useState<Map<string,string[]>>(() => {
    let s = new Map();
    s.set(activeGroup.id, []);
    return s;
  });
  const [sourceEntities, setSourceEntities] = 
    useState<SelectGameImageType[]>(props.gameDescriptor.entities);

  const [entityIndex, setEntityIndex] = useState(0);
  const [colorSelectError, setColorSelectError] = useState(false);

  const showStartArrow = useRef<boolean>(true);

  const verifyImage = (e: SelectGameImageType) => {
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
      let newArr: SelectGameImageType[] = [ ...sourceEntities ];
      let sIndex: number = newArr.indexOf(e);
      if (sIndex > -1) {
        newArr.splice(sIndex,1);
        setSourceEntities(newArr);
      }
      
      setFeedbackFace(FACES.HAPPY);
      if (entityIndex === numberOfEntities-1) {
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

  const updateGroup = (group: SelectGameGroupType) => {
    setCursorStyle(() => group.cursor ? `url("${group.cursor}"), pointer` : 'pointer');
    showStartArrow.current = false;
    setCurrentGroup(group);
  }

  return (
    <div className="app-page">
      <Banner gameId={props.gameDescriptor.gameId} />
      
      <div  className="app-title-centered">{title}</div>

      <div>
        <table width="100%">
          <tbody>
            <tr>
              <td className="select-game-group-entities" id={`entities-${activeGroup.id}`} 
                key={activeGroup.id}
                width="100%"
                style={{cursor: cursorStyle}}>
                  {selectedImages.get(activeGroup.id)!.map((imageFile,i) => 
                    <span key={i}>
                      <img src={MediaUtil.getCatalogImage(imageFile)} height="64px" 
                        alt="" className="select-game-selected-img"/>
                    </span>
                  )}
              </td>
              <td>
                &nbsp;
              </td>
            </tr>
            <td width={"100%"} className="sort-game-face-feedback"><FaceFeedback 
                face={feedbackFace} /></td>
          </tbody>
        </table>
      </div>

      <div className="select-game-entities">
        {sourceEntities.map((e,i) =>
          <img id={"bank-" + e.id} key={i} src={MediaUtil.getCatalogImage(e.file)} 
            alt={e.title} 
            height={imgSize}
            style={{cursor: cursorStyle}}
            onClick={() => verifyImage(e)}
            className="select-game-source-img"></img>
        )}
      </div>

      <WellDone />
    </div>
  )
}