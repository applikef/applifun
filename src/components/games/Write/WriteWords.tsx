import React, { ChangeEvent, useContext, useEffect, useRef, useState } from "react";

import "./Write.css";

import { FACES } from "../../shared/FaceFeedback/FaceFeedback";
import { hideWellDone } from "../../shared/WellDone/WellDone";

import { MediaUtil } from "../../../utils/MediaUtil";
import { ObjectsUtil } from "../../../utils/ObjectsUtil";
import { PlayListNames } from "../../../assets/playLists";
import { Banner } from "../../global/Banner/Banner";
import { DeviceUtil } from "../../../utils/DeviceUtil";
import GamesContext, { GamesContextType } from "../../../context/GamesContext";
import { LetterSequenceDescriptorType, WordDescriptorType } from "../../../model/Sequence.types";
import { ConstantsUtil } from "../../../utils/ConstantsUtil";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../../shared/PageHeader/PageHeader";
import { Advise } from "../../shared/Advise/Advise";
import { TalkToMe } from "../../shared/TalkToMe/TalkToMe";
import { MultiSelectionSettings } from "../../shared/MultiSelectionSettings/MultiSelectionSettings";
import { GeneralUtil } from "../../../utils/GeneralUtil";
import { ScoreboardDescriptor } from "../../../model/global.types";

export interface WriteWordsProps {
  gameDescriptor: LetterSequenceDescriptorType;
};

export const WriteWords = (props: WriteWordsProps) => {
  const descriptor = useRef(props.gameDescriptor);
  
  const wordsCatalog = descriptor.current.words!;
  const wordsCatalogSize = wordsCatalog.length;
  const gamePageTitle:string = descriptor.current.title ? descriptor.current.title : "";
  const settingsTitle = descriptor.current.settingsTitle ?
    descriptor.current.settingsTitle
  : "";
  const navigate = useNavigate();

  const { 
    audioOn,
    isTablet 
  } = useContext(GamesContext) as GamesContextType;

  const helpFileName: string | undefined = descriptor.current.helpFile ? descriptor.current.helpFile : undefined;

  const playerHooray:HTMLAudioElement = MediaUtil.pickPlayer(PlayListNames.SHORT_HOORAY);

  let selectedSequenceSteps = useRef<string[]>([]);

  const [words, setWords] = useState<WordDescriptorType[]>(descriptor.current.words ?
    ObjectsUtil.shuffleArrayItems(descriptor.current.words) 
  : []);
  const numberOfWords = useRef<number>(descriptor.current.words!.length);
    
  const [feedbackFace, setFeedbackFace] = useState<FACES>(FACES.NONE);

  const [pageTitle, setPageTitle] = useState(gamePageTitle);
  const [word, setWord] = useState<WordDescriptorType>(words[0]);
  const [gameSettingsDisplay, setgameSettingsDisplay] = useState<string>("game-settings-global-hide");
  const [pendingSelectedWordIndices, setPendingSelectedWordIndices] = useState<boolean[]>([]);
  const [selectedWordIndices, setSelectedWordIndices] = useState<boolean[]>([])

  let initialScores =  {
    scores: 0, 
    totalScores: descriptor.current.words.length,
    image: "resources/icons/smiley.png",
    outlineImage: "resources/icons/smiley-outline.png"
  };
  let [scores, setScores] = useState<ScoreboardDescriptor>(initialScores);

  let currentIndex = useRef<number>(0);

  useEffect(() => {
    setSelectedWordIndices(() => Array(wordsCatalogSize).fill(true));
  }, [wordsCatalogSize]);

  useEffect(() => {
    numberOfWords.current = words.length;
    setWord(words[0]);
    document.getElementById("wordInpurArea")!.focus();
  }, [words]);

  function getNextWord() { 
    setTimeout(() =>{
      if (currentIndex.current < numberOfWords.current-1) {
        // reset view
        selectedSequenceSteps.current = [];
        setFeedbackFace(FACES.NONE);
        setPageTitle(gamePageTitle);
        hideWellDone();

        currentIndex.current++;
        setWord(words[currentIndex.current]);
    
      }
      else {  
        setTimeout(() => {
          navigate(GeneralUtil.targetNavigationOnGameOver(descriptor.current.isQuiz));
        }, ConstantsUtil.hoorayTimeout);        
      }
    }, ConstantsUtil.hoorayTimeout)
  }

  function handleSettingsCancel() {
    setgameSettingsDisplay(()=>"game-settings-global-hide"); 
  }

  function handleSettingsDone(groupValueIndices: boolean[]) {
    let newWords:WordDescriptorType[] = [];
    for (let i=0; i < wordsCatalogSize; i++) {
      if (groupValueIndices[i]) {
        newWords.push(wordsCatalog[i]);
      }
    }
    selectedSequenceSteps.current = [];
    currentIndex.current = 0;
    setFeedbackFace(FACES.NONE);
    hideWellDone();

    setWords(()=>ObjectsUtil.shuffleArrayItems(newWords));
    setSelectedWordIndices(()=>pendingSelectedWordIndices);
    setgameSettingsDisplay(()=>"game-settings-global-hide")

    scores.totalScores = selectedWordIndices.length;
    setScores({...scores});
  }

  function validateInput(inputElement: ChangeEvent<HTMLInputElement>) {
    let inputValue: string = inputElement.target.value.toString();
    if (inputValue === word.name) {
        setFeedbackFace(() => FACES.HAPPY);
        MediaUtil.player(playerHooray, audioOn);
        scores.scores++;
        setScores({...scores});

        setTimeout(() => {
          inputElement.target.value = "";
          getNextWord();
          document.getElementById('wordInpurArea')!.focus();
        }, ConstantsUtil.hoorayShortTimeout); 
    }
  }

  function clearInput() {    
    let inputElement: HTMLInputElement = document.getElementById('wordInpurArea')! as HTMLInputElement;
    inputElement.value = '';
    inputElement.focus();
  }

  return (
    <div className="app-page">
      <Banner gameId={descriptor.current.gameId} 
        isQuiz={descriptor.current.isQuiz}
        scoreboard={scores}
        helpFile={helpFileName} 
      />

      <PageHeader title={ pageTitle } audio={["order-letters"]} feedbackFace={ feedbackFace } />

      <div className="i-write-global">
        <div>
          <img src={MediaUtil.getCatalogImage(word.file)} alt={word.title}
            height={DeviceUtil.imageHeightLarge(isTablet)}></img>  
        </div>

        <div className="i-write-container">
          <div className="i-write-advise">  
            <Advise text={ word.name }
              default={ false } />
            { word.audio &&
                <span className="i-write-talk-to-me">
                  <TalkToMe audioList={[word.audio!]} isAudioCatalog={true}/>
                </span>
            }
          </div>
        </div>

        <div className="i-write-feedback">
          <div id="feedback-area">
            <input type="text" id="wordInpurArea" className="i-write-input i-write-input-text"
              autoComplete="off"
              onChange={(e:ChangeEvent<HTMLInputElement>)=> validateInput(e)}
            />
          </div>
          <button className="app-button-ghost-sm" onClick={() => clearInput()}>נַקֵּה הַדְפָּסָה</button>  
        </div>
      </div>

      <MultiSelectionSettings
          className={ gameSettingsDisplay }
          title={settingsTitle}
          options={wordsCatalog.map((word) => word.name)}
          handleSettingsDone={handleSettingsDone}
          handleSettingsCancel={handleSettingsCancel}
      />

    </div>
  )
}