import React, { useContext, useEffect, useRef, useState } from "react";

import "./Sequence.css";

import { FACES } from "../../shared/FaceFeedback/FaceFeedback";
import { hideWellDone, showWellDone } from "../../shared/WellDone/WellDone";

import { MediaUtil } from "../../../utils/MediaUtil";
import { ObjectsUtil } from "../../../utils/ObjectsUtil";
import { PlayListNames } from "../../../assets/playLists";
import { Banner } from "../../global/Banner/Banner";
import { DeviceUtil } from "../../../utils/DeviceUtil";
import GamesContext, { GamesContextType } from "../../../context/GamesContext";
import { LetterSequenceDescriptorType, WordDescriptorType } from "./Sequence.types";
import { ConstantsUtil } from "../../../utils/ConstantsUtil";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../../shared/PageHeader/PageHeader";
import { Advise } from "../../shared/Advise/Advise";
import { TalkToMe } from "../../shared/TalkToMe/TalkToMe";
import { MultiSelectionSettings } from "../../shared/MultiSelectionSettings/MultiSelectionSettings";

interface ViewEntry {
  value: string;
  show: boolean;
}

export interface LettersSequenceProps {
  gameDescriptor: LetterSequenceDescriptorType;
};

export const LettersSequence = (props: LettersSequenceProps) => {
  const wordsCatalog = props.gameDescriptor.words!;
  const wordsCatalogSize = wordsCatalog.length;
  const gamePageTitle:string = props.gameDescriptor.title ? props.gameDescriptor.title : "";
  const settingsTitle = props.gameDescriptor.settingsTitle ?
    props.gameDescriptor.settingsTitle
  : "";
  const navigate = useNavigate();

  const { 
    audioOn 
  } = useContext(GamesContext) as GamesContextType;

  const playerHooray:HTMLAudioElement = MediaUtil.pickPlayer(PlayListNames.SHORT_HOORAY);
  const playerOuch:HTMLAudioElement = MediaUtil.pickPlayer(PlayListNames.OUCH);

  let selectedSequenceSteps = useRef<string[]>([]);
  function addSequenceStep(id: string) {
    selectedSequenceSteps.current.push(id);
  };

  const [words, setWords] = useState<WordDescriptorType[]>(props.gameDescriptor.words ?
    ObjectsUtil.shuffleArrayItems(props.gameDescriptor.words) 
  : []);
  const numberOfWords = useRef<number>(props.gameDescriptor.words!.length);
    
  const [feedbackFace, setFeedbackFace] = useState<FACES>(FACES.NONE);
  const [pageTitle, setPageTitle] = useState(gamePageTitle);
  const [word, setWord] = useState<WordDescriptorType>(words[0]);
  const [orderedLetters, setOrderedLetters] = useState<ViewEntry[]>([]);
  const [shuffledLetters, setShuffledLetters] = useState<ViewEntry[]>([]);
  const [gameSettingsDisplay, setgameSettingsDisplay] = useState<string>("game-settings-global-hide");
  const [pendingSelectedWordIndices, setPendingSelectedWordIndices] = useState<boolean[]>([]);
  const [selectedWordIndices, setSelectedWordIndices] = useState<boolean[]>([])

  let currentIndex = useRef<number>(0);

  useEffect(() => {
    setSelectedWordIndices(() => Array(wordsCatalogSize).fill(true));
  }, [wordsCatalogSize]);

  useEffect(() => {
    numberOfWords.current = words.length;
    setWord(words[0]);
  }, [words]);

  useEffect(() => {
    setOrderedLetters(word.name.split("").map((letter:string) => {
        return({
          value: letter,
          show: false
        });
    }));
    setShuffledLetters(() => 
      ObjectsUtil.shuffleArrayItems(word.name.split("")).map((letter:string) => {
        return({
          value: letter,
          show: true
        });
    }));
  }, [word]);

  function getFeedbackId(letter: string): string {
    return `feedback-${word.id}-${letter}`;
  }

  function getBankId(letter: string): string {
    return `bank-${word.id}-${letter}`;
  }

  function getLetterIndex(lettersArr: ViewEntry[], letter: string) {
    for (let i=0; i < lettersArr.length; i++) {
      const letterItem: ViewEntry = lettersArr[i];
      if (letterItem.value === letter) {
        return i;
      }
    }
    return -1;
  }

  function verifyLetter(letter: ViewEntry) {
    const letterValue: string = letter.value;
    const letterOrderedIndex = getLetterIndex(orderedLetters, letterValue);
    const letterShuffledIndex = getLetterIndex(shuffledLetters, letterValue);
    if (letterOrderedIndex === selectedSequenceSteps.current.length) {
      addSequenceStep(letterValue);
      orderedLetters[letterOrderedIndex].show = true;
      setOrderedLetters([...orderedLetters]);
      shuffledLetters[letterShuffledIndex].show = false;
      setShuffledLetters([...shuffledLetters])

      if (letterOrderedIndex === orderedLetters.length-1) {
        setFeedbackFace(() => FACES.NONE);
        showWellDone(audioOn);
        setTimeout(() => {
          getNextWord();
        }, ConstantsUtil.hoorayTimeout); 
      }
      else {
        setFeedbackFace(() => FACES.HAPPY);
        MediaUtil.player(playerHooray, audioOn);
      }
    }
    else {
      setFeedbackFace(() => FACES.WORRY);
      MediaUtil.player(playerOuch, audioOn);
    }
  }

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
          navigate("/home");
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
  }

  return (
    <div className="app-page">
      <Banner gameId={props.gameDescriptor.gameId} settings={() => {
        setPendingSelectedWordIndices(() => selectedWordIndices);
        setgameSettingsDisplay("game-settings-global-show")
      }}/>

      <PageHeader title={ pageTitle } audio={["order-letters"]} feedbackFace={ feedbackFace } />

      <div className="letters-sequence-global">
        <div>
          <img src={MediaUtil.getCatalogImage(word.file)} alt={word.title}
            height={DeviceUtil.imageHeightLarge()}></img>  
        </div>

        <div className="sequence-container">
          <div className="sequence-letters-advise">  
            <Advise text={ word.title } 
              default={ false } />
            { word.audio &&
                <TalkToMe audioList={[word.audio!]} isAudioCatalog={true}/>
            }
          </div>

          <div id="bank-area" className="sequence-source-images" >
            { shuffledLetters.map((e:ViewEntry, i:number) =>
                  e.show && <span 
                    className={`sequence-letter ${i===shuffledLetters.length-1 ? "sequence-letter-last-letter" : ""}`} 
                    id={getBankId(e.value)} key={i} 
                    onClick={() => verifyLetter(e)}>
                      {e.value}
                  </span>
            )}
          </div>
        </div>

        <div className="sequence-feedback">

          <h3>
            <TalkToMe audioList={["correct-word"!]} 
              direction={MediaUtil.RTL}/>

            פֹּה לְמַטָּה נִרְאֶה אֶת הַמִּילָּה כְּתוּבָה נָכוֹן
          </h3>

          <div id="feedback-area">
            { orderedLetters.map((e:ViewEntry) =>
                  e.show && <span className="sequence-feedback-letter sequence-letter" 
                    id={getFeedbackId(e.value)} 
                    key={e.value}>
                      {e.value}
                  </span>
                )
            }
          </div>  
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