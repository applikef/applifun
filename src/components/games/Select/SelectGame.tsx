import React, { useContext, useRef, useState } from "react";
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
import { MultiSelectionSettings } from "../../shared/MultiSelectionSettings/MultiSelectionSettings";
import { ConstantsUtil } from "../../../utils/ConstantsUtil";
import { useNavigate } from "react-router-dom";

export interface SelectGameProps {
  gameDescriptor: SelectGameDescriptorType;
  errorMessage?: string;
};

export const SelectGame = (props: SelectGameProps) => {
  const navigate = useNavigate();

  const imgSize:string = DeviceUtil.imageHeight();
  const groups = props.gameDescriptor.groups;
  const numberOfGroups = groups.length;
  const groupNames = groups.map((g) => g.title);
  const entities = props.gameDescriptor.entities;

  const { 
    audioOn
  } = useContext(GamesContext) as GamesContextType;

  let activeGroup = useRef<SelectGameGroupType>(groups[0]);

  const [feedbackFace, setFeedbackFace] = useState<FACES>(FACES.NONE);
  const [selectedImages, setSelectedImages] = useState<Map<string,string[]>>(() => {
    let s = new Map();
    s.set(activeGroup.current.id, []);
    return s;
  });
  const [sourceEntities, setSourceEntities] = useState<SelectGameImageType[]>(() => {
    let entityList: SelectGameImageType[] = [];
    entities.map((e) => e.groupIds === undefined ? 
      entityList.push(e) 
    : 
      e.groupIds.includes(activeGroup.current.id) ? 
        entityList.push(e) : undefined
    )
    return entityList;
  });

  const [entityIndex, setEntityIndex] = useState(0);
  const [gameSettingsDisplay, setGameSettingsDisplay] = useState<string>("game-settings-global-hide");

  let validGroupIndices = useRef<boolean[]>(Array(numberOfGroups).fill(true));
  let activeGroupIndex = useRef<number>(0);
  let gameComplete = useRef<boolean>(false);

  const title = ObjectsUtil.getTitle(props.gameDescriptor.titleTemplate, activeGroup.current.title);
  const numberOfGroupEntities: number = 
    entities.filter(e => e.validGroupIds ? e.validGroupIds.includes(activeGroup.current.id) : false).length;

  function initGame() {
    setSelectedImages(() => {
      let s = new Map();
      s.set(activeGroup.current.id, []);
      return s;
    });
    setSourceEntities(() => {
      let entityList: SelectGameImageType[] = [];
      entities.map((e) => e.groupIds === undefined ? 
        entityList.push(e) 
      : 
        e.groupIds.includes(activeGroup.current.id) ? 
          entityList.push(e) : undefined
      )
      return entityList;
    });
    setFeedbackFace(FACES.NONE);
    setEntityIndex(0)
    hideWellDone();
    gameComplete.current = false;
  }

  let verifyImage = gameComplete.current ?
    () => {}
  : (e: SelectGameImageType) => {
    if (e.validGroupIds.includes(activeGroup.current.id)) {
      // Update entities in group
      let a: string[] | undefined = [...(selectedImages.get(activeGroup.current.id)!)];
      if (!a) {
        a = [];
      }
      if (!a.includes(e.file)) {
        a = [...a, e.file];
      }
      setSelectedImages(map => new Map(map.set(activeGroup.current.id, a!)));

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

        setTimeout(() => {
          const nextIndex = 
            ObjectsUtil.getNextIndexInBooleanArray(validGroupIndices.current, activeGroupIndex.current);
          if (nextIndex === undefined) {
            navigate("/home");
          }
          else {
            activeGroupIndex.current = nextIndex;
            activeGroup.current = groups[activeGroupIndex.current]
            initGame();
          }
        }, ConstantsUtil.hoorayTimeout);
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
    setGameSettingsDisplay(()=>"game-settings-global-hide"); 
  }

  function handleSettingsDone(groupIndices: boolean[]) {
    setGameSettingsDisplay(()=>"game-settings-global-hide"); 
    validGroupIndices.current = groupIndices;
    activeGroupIndex.current = groupIndices.indexOf(true);
    if (activeGroupIndex.current === -1) {
      navigate("/home");
    }
    activeGroup.current = groups[activeGroupIndex.current];
    initGame();
  }

  return (
    <div className="app-page">
      <Banner gameId={props.gameDescriptor.gameId} 
         settings={() => {
          setGameSettingsDisplay("game-settings-global-show")
         }}
      />
      
      <div  className="app-title-centered">
        <PageHeader title={title} feedbackFace={ feedbackFace } />
      </div>

      <div>
        <table width="100%">
          <tbody>
            <tr>
              <td className="select-game-group-entities" id={`entities-${activeGroup.current.id}`} 
                key={activeGroup.current.id}
                width="100%">
                  {selectedImages.get(activeGroup.current.id)!.map((imageFile,i) => 
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

      <MultiSelectionSettings
          className={ gameSettingsDisplay }
          title={props.gameDescriptor.settingsTitle}
          options={groupNames}
          handleSettingsDone={handleSettingsDone}
          handleSettingsCancel={handleSettingsCancel}
      />
    </div>
  )
}