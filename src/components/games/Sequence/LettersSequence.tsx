import React, { useContext, useEffect, useRef, useState } from "react";

import "./Sequence.css";

import { FACES, FaceFeedback } from "../../shared/FaceFeedback/FaceFeedback";
import { WellDone, hideWellDone, showWellDone } from "../../shared/WellDone/WellDone";

import { MediaUtil } from "../../../utils/MediaUtil";
import { ObjectsUtil } from "../../../utils/ObjectsUtil";
import { PlayListNames } from "../../../assets/playLists";
import { Banner } from "../../shared/Banner/Banner";
import { DeviceUtil } from "../../../utils/DeviceUtil";
import GamesContext, { GamesContextType } from "../../../context/GamesContext";
import { SequenceDescriptorType, WordDescriptorType } from "./Sequence.types";
import { ConstantsUtil } from "../../../utils/ConstantsUtil";

interface ViewEntry {
  value: string;
  show: boolean;
}

export interface SequenceProps {
  gameDescriptor: SequenceDescriptorType;
};

export const LettersSequence = (props: SequenceProps) => {
  const numberOfWords:number = props.gameDescriptor.words!.length;
  let words = useRef<WordDescriptorType[]>(props.gameDescriptor.words ?
    ObjectsUtil.shuffleArrayItems(props.gameDescriptor.words) 
  : []);
  const gamePageTitle:string = props.gameDescriptor.title ? props.gameDescriptor.title : "";

  const { 
    audioOn 
  } = useContext(GamesContext) as GamesContextType;

  const playerHooray:HTMLAudioElement = MediaUtil.pickPlayer(PlayListNames.SHORT_HOORAY);
  const playerOuch:HTMLAudioElement = MediaUtil.pickPlayer(PlayListNames.OUCH);

  let selectedSequenceSteps = useRef<string[]>([]);
  function addSequenceStep(id: string) {
    selectedSequenceSteps.current.push(id);
  };

  const [feedbackFace, setFeedbackFace] = useState<FACES>(FACES.NONE);
  const [pageTitle, setPageTitle] = useState(gamePageTitle);
  const [word, setWord] = useState<WordDescriptorType>(words.current[0]);
  const [orderedLetters, setOrderedLetters] = useState<ViewEntry[]>([]);
  const [shuffledLetters, setShuffledLetters] = useState<ViewEntry[]>([]);

  let currentIndex = useRef<number>(0);

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

  function showSuccess() {
    setPageTitle("כל הכבוד!");
    showWellDone(audioOn);
  }

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

      setFeedbackFace(() => FACES.HAPPY);
      MediaUtil.player(playerHooray, audioOn);
      if (letterOrderedIndex === orderedLetters.length-1) {
        showSuccess();
        getNextWord();
      }
    }
    else {
      setFeedbackFace(() => FACES.WORRY);
      MediaUtil.player(playerOuch, audioOn);
    }
  }

  function getNextWord() { 
    setTimeout(() =>{
      if (currentIndex.current < numberOfWords-1) {
        // reset view
        selectedSequenceSteps.current = [];
        setFeedbackFace(FACES.NONE);
        setPageTitle(gamePageTitle);
        hideWellDone();

        currentIndex.current++;
        setWord(words.current[currentIndex.current]);
    
      }
    }, ConstantsUtil.hoorayTimeout)
  }

  return (
    <div className="app-page">
      <Banner/>

      <div className="letters-sequence-global">
        <img src={MediaUtil.getCatalogImage(word.file)} alt={word.title}
          height={DeviceUtil.imageHeightLarge()}></img>        

        <div className="sequence-container">
          <div className="app-title">{ pageTitle }</div>
          <div id="bank-area" className="sequence-source-images" >
            { shuffledLetters.map((e:ViewEntry, i:number) =>
                  e.show && <span className="sequence-letter" 
                    id={getBankId(e.value)} key={i} 
                    onClick={() => verifyLetter(e)}>
                      {e.value}
                  </span>
            )}
          </div>
        </div>

        <div className="sequence-feedback">
          <div>
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
            <span><FaceFeedback face={feedbackFace} /></span>
          </div>
        </div>
      </div>

      <WellDone />
    </div>
  )
}