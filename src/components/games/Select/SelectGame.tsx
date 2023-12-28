import React, { ChangeEvent, useContext, useRef, useState } from "react";
import { SelectGameDescriptorType, SelectGameGroupType, SelectGameImageType } from "./selectGame.types";
import { FACES } from "../../shared/FaceFeedback/FaceFeedback";

import "./SelectGame.css";
import { hideWellDone, showWellDone } from "../../shared/WellDone/WellDone";
import GamesContext, { GamesContextType } from "../../../context/GamesContext";
import { MediaUtil } from "../../../utils/MediaUtil";
import { PlayListNames } from "../../../assets/playLists";
import { Banner } from "../../global/Banner/Banner";
import { DeviceUtil } from "../../../utils/DeviceUtil";
import { ObjectsUtil } from "../../../utils/ObjectsUtil";
import { TitledImage } from "../../shared/TitledImage/TitledImage";
import { PageHeader } from "../../shared/PageHeader/PageHeader";

export interface SelectGameProps {
  gameDescriptor: SelectGameDescriptorType;
  errorMessage?: string;
};

export const SelectGame = (props: SelectGameProps) => {
  const imgSize:string = DeviceUtil.imageHeight();
  const groups = props.gameDescriptor.groups;
  const entities = props.gameDescriptor.entities;

  const { 
    audioOn
  } = useContext(GamesContext) as GamesContextType;

  const [activeGroup, setActiveGroup] = useState<SelectGameGroupType>(groups[0]);
  const [pendingGroup, setPendingGroup] = useState(activeGroup);
  const [feedbackFace, setFeedbackFace] = useState<FACES>(FACES.NONE);
  const [selectedImages, setSelectedImages] = useState<Map<string,string[]>>(() => {
    let s = new Map();
    s.set(activeGroup.id, []);
    return s;
  });
  const [sourceEntities, setSourceEntities] = 
    useState<SelectGameImageType[]>(entities);

  const [entityIndex, setEntityIndex] = useState(0);
  const [gameSettingsDisplay, setGameSettingsDisplay] = useState<string>("game-settings-global-hide");

  let gameComplete = useRef<boolean>(false);

  const title = ObjectsUtil.getTitle(props.gameDescriptor.titleTemplate, activeGroup.title);
  const numberOfGroupEntities: number = 
    entities.filter(e => e.groupIds ? e.groupIds.includes(activeGroup.id) : false).length;

  function initGame() {
    setSelectedImages(() => {
      let s = new Map();
      s.set(pendingGroup.id, []);
      return s;
    });
    setSourceEntities(entities);
    setFeedbackFace(FACES.NONE);
    setEntityIndex(0)
    hideWellDone();
    gameComplete.current = false;
  }

  let verifyImage = gameComplete.current ?
    () => {}
  : (e: SelectGameImageType) => {
    if (e.groupIds.includes(activeGroup.id)) {
      // Update entities in group
      let a: string[] | undefined = [...(selectedImages.get(activeGroup.id)!)];
      if (!a) {
        a = [];
      }
      if (!a.includes(e.file)) {
        a = [...a, e.file];
      }
      setSelectedImages(map => new Map(map.set(activeGroup.id, a!)));

      // Remove entity from source entities
      let newArr: SelectGameImageType[] = [ ...sourceEntities ];
      let sIndex: number = newArr.indexOf(e);
      if (sIndex > -1) {
        newArr.splice(sIndex,1);
        setSourceEntities(newArr);
      }
      
      setFeedbackFace(FACES.HAPPY);
      if (entityIndex === numberOfGroupEntities-1) {
        setFeedbackFace(FACES.NONE);
        gameComplete.current = true;
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

  function handleSettingsCancel() {
    if (pendingGroup.id !== activeGroup.id) {
      setPendingGroup(activeGroup);
    }
    setGameSettingsDisplay(()=>"game-settings-global-hide"); 
  }

  function handleSettingsDone() {
    setGameSettingsDisplay(()=>"game-settings-global-hide"); 
    initGame();
    setActiveGroup(pendingGroup);
  }

  return (
    <div className="app-page">
      <Banner gameId={props.gameDescriptor.gameId} 
         settings={() => {
          setPendingGroup(activeGroup);
          setGameSettingsDisplay("game-settings-global-show")
         }}
      />
      
      <div  className="app-title-centered">
        { /* <img src={activeGroup.cursor} height="32px" alt={activeGroup.title} /> */ }
        <PageHeader title={title} feedbackFace={ feedbackFace } />
      </div>

      <div>
        <table width="100%">
          <tbody>
            <tr>
              <td className="select-game-group-entities" id={`entities-${activeGroup.id}`} 
                key={activeGroup.id}
                width="100%">
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
          </tbody>
        </table>
      </div>

      <div className="select-game-entities">
        {sourceEntities.map((e,i) =>
          <TitledImage id={"bank-" + e.id} key={i} src={MediaUtil.getCatalogImage(e.file)} 
            alt={e.title} 
            height={imgSize}
            onClick={() => verifyImage(e)}
            className="select-game-source-img app-clickable"></TitledImage>
        )}
      </div>

      <div id="gameSettings" className={ gameSettingsDisplay }>
        <div>
          <div className="game-settings-title">בחרי את מצב הרוח למשחק</div>
          
          { props.gameDescriptor.groups.map(
            (group, i) => 
              <div className="game-settings-entry" key={i}>
                <input type="radio"
                  id={group.id}
                  checked={pendingGroup === group} 
                  onChange={(e:ChangeEvent<HTMLInputElement>) => {
                    setPendingGroup(ObjectsUtil.getEntityById(groups, e.target.id));
                  }}></input>
                <span key={i}>{group.title}</span>
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