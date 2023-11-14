import React, { useContext, useEffect, useRef, useState } from "react";

import "./Sequence.css";

import { FACES, FaceFeedback } from "../../shared/FaceFeedback/FaceFeedback";
import { TitledImage } from "../../shared/TitledImage/TitledImage";
import { WellDone, showWellDone } from "../../shared/WellDone/WellDone";

import { ImageDescriptorType, NumbersDescriptorType, SequenceDescriptorType, SequenceType } from "./Sequence.types";
import { WordDescriptorType } from "../IWrite/Word.types";

import { MediaUtil } from "../../../utils/MediaUtil";
import { ObjectsUtil } from "../../../utils/ObjectsUtil";
import { PlayListNames } from "../../../assets/playLists";
import { Banner } from "../../shared/Banner/Banner";
import { DeviceUtil } from "../../../utils/DeviceUtil";
import GamesContext, { GamesContextType } from "../../../context/GamesContext";

export interface SequenceProps {
  gameDescriptor: SequenceDescriptorType;
};

let imageDescriptors: ImageDescriptorType[] = [];
let wordDescriptor: WordDescriptorType = {
  id: "",
  title: "",
  name: "",
  file: "",
};
let numbersDescriptor: NumbersDescriptorType = {
  values: []
};

export const Sequence = (props: SequenceProps) => {
  const { 
    audioOn 
  } = useContext(GamesContext) as GamesContextType;

  const playerHooray:HTMLAudioElement = MediaUtil.pickPlayer(PlayListNames.SHORT_HOORAY);
  const playerOuch:HTMLAudioElement = MediaUtil.pickPlayer(PlayListNames.OUCH);

  let selectedSequenceSteps = useRef<string[]>([]);
  function addSequenceStep(id: string) {
    selectedSequenceSteps.current.push(id);
  };

  const sequenceType: SequenceType = props.gameDescriptor.type;
  const images = props.gameDescriptor.images;
  const numbers = props.gameDescriptor.numbers;
  const word = props.gameDescriptor.word;
  const topImage = props.gameDescriptor.topImage;

  const [, setShowPage] = useState(false);
  const [feedbackFace, setFeedbackFace] = useState<FACES>(FACES.NONE);
  const [pageTitle, setPageTitle] = useState(props.gameDescriptor.title ? props.gameDescriptor.title : "");

  let shuffledImages = useRef<ImageDescriptorType[]>([]);

  let orderedNumbers = useRef<number[]>([]);
  let shuffledNumbers = useRef<number[]>([]);

  let orderedLetters = useRef<string[]>([]);
  let shuffledLetters = useRef<string[]>([]);

  useEffect(() => {
    switch (sequenceType) {
      case SequenceType.IMAGES: {
        imageDescriptors = images ? images : [];
        shuffledImages.current = ObjectsUtil.shuffleArrayItems(imageDescriptors);
        break;
      }
      case SequenceType.WORD: {
        wordDescriptor = word ? word : {
          id: "",
          title: "",
          name: "",
          file: "",
        };
        orderedLetters.current = wordDescriptor.name.split("");
        shuffledLetters.current = ObjectsUtil.shuffleArrayItems(orderedLetters.current);
        break;
      }
      case SequenceType.NUMBERS: {
        numbersDescriptor = numbers? numbers : {
          values: []
        };

        if (numbersDescriptor.values) {
          orderedNumbers.current = ObjectsUtil.sortNumbers(numbersDescriptor.values)
          shuffledNumbers.current = ObjectsUtil.shuffleArrayItems(orderedNumbers.current);
        }
        else {
          const minValue = numbersDescriptor.range && numbersDescriptor.range[0] ? numbersDescriptor.range[0] : 1;
          const maxValue = numbersDescriptor.range && numbersDescriptor.range[1] ? numbersDescriptor.range[1] : 10;
          const rangeSize = maxValue - minValue + 1;
          orderedNumbers.current = Array.from({length: rangeSize}, (_, i) => i + minValue)
          shuffledNumbers.current = ObjectsUtil.shuffleArrayItems(orderedNumbers.current);
        }
        break;
      }
    }
    setShowPage(()=>true);
  }, [images, numbers, word, sequenceType]);

  function showSuccess() {
    setPageTitle("כל הכבוד!");
    showWellDone(audioOn);
  }

  function verifyImage(image: ImageDescriptorType) {
    if (imageDescriptors.indexOf(image)+1 === selectedSequenceSteps.current.length+1) {
      addSequenceStep(image.id);
      document.getElementById("feedback-"+image.id)!.style.display = "inline-block";
      document.getElementById("bank-"+image.id)!.style.display = "none";
      setFeedbackFace(() => FACES.HAPPY);
      MediaUtil.player(playerHooray, audioOn);
    
      if (imageDescriptors.indexOf(image)+1 === imageDescriptors.length) {
        showSuccess();
      }
    }
    else {
      setFeedbackFace(() => FACES.WORRY);
      MediaUtil.player(playerOuch, audioOn);
    }
  }

  function verifyLetter(letter: string) {
/*    if (letter.serialNumber === selectedSequenceSteps.current.length) {
      addSequenceStep(letter.value);
      document.getElementById("feedback-"+ letter.serialNumber)!.style.display = "inline-block";
      document.getElementById("bank-"+ letter.serialNumber)!.style.display = "none";
      setFeedbackFace(() => FACES.HAPPY);
      MediaUtil.player(playerHooray, audioOn);
      if (letter.serialNumber === orderedLetters.length-1) {
        showSuccess();
      }

    } */
    const nIndex = orderedLetters.current.indexOf(letter);
    if (nIndex === selectedSequenceSteps.current.length) {
      addSequenceStep(letter);
      document.getElementById("feedback-"+ letter)!.style.display = "inline-block";
      document.getElementById("bank-"+ letter)!.style.display = "none";
      setFeedbackFace(() => FACES.HAPPY);
      MediaUtil.player(playerHooray, audioOn);
      if (nIndex === orderedLetters.current.length-1) {
        showSuccess();
      }
    }
    else {
      setFeedbackFace(() => FACES.WORRY);
      MediaUtil.player(playerOuch, audioOn);
    }
  }

  function verifyNumber(n: number) {
    const nIndex = orderedNumbers.current.indexOf(n);
    if (nIndex === selectedSequenceSteps.current.length) {
      addSequenceStep(n.toString());
      document.getElementById("feedback-"+ n)!.style.display = "inline-block";
      document.getElementById("bank-"+ n)!.style.display = "none";
      setFeedbackFace(() => FACES.HAPPY);
      MediaUtil.player(playerHooray, audioOn);
      if (nIndex === orderedNumbers.current.length-1) {
        showSuccess();
      }
    }
    else {
      setFeedbackFace(() => FACES.WORRY);
      MediaUtil.player(playerOuch, audioOn);
    }
  }

  return (
    <div className="app-page">
      <Banner/>
      { topImage && word &&
        <img src={MediaUtil.getCatalogImage(topImage)} alt={word.title}
          height={DeviceUtil.imageHeightLarge()}></img>        
      }
      <div className="sequence-container">
        <div className="app-title">{ pageTitle }</div>
        <div className="sequence-source-images" >
          {sequenceType === SequenceType.IMAGES ? 
            shuffledImages.current.map((e:ImageDescriptorType,i:number) =>
              <TitledImage className="sequence-image" id={"bank-" + e.id} key={i} 
                src={MediaUtil.getCatalogImage(e.file)} alt={e.title} 
                height={DeviceUtil.imageHeight()} 
                maxWidth="200px"
                onClick={() => verifyImage(e)}></TitledImage>
            )
            : sequenceType === SequenceType.WORD ? 
              shuffledLetters.current.map((e:string, i:number) =>
                <span className="sequence-letter" id={"bank-" + e} key={i} 
                  onClick={() => verifyLetter(e)}>{e}</span>
              )
            : sequenceType === SequenceType.NUMBERS ?
              shuffledNumbers.current.map((e:number, i:number) =>
                <span className="sequence-letter" id={"bank-" + e} key={i} 
                  onClick={() => verifyNumber(e)}>{e}</span>
            )
            : <></>
          }
        </div>
      </div>

      <div className="sequence-feedback">
        {
          sequenceType === SequenceType.IMAGES && 
          <h3>
            פה למטה נראה את התמונות מסודרות
          </h3>
        }
        {
          sequenceType === SequenceType.NUMBERS && 
          <h3>
            פה למטה נראה את המספרים מסודרים
          </h3>
        }
        <div>
          {sequenceType === SequenceType.IMAGES ?
            imageDescriptors.map((e,i) =>
                <span key={i}>
                    <TitledImage className="sequence-feedback-image" 
                      id={"feedback-" + e.id} src={MediaUtil.getCatalogImage(e.file)} 
                      alt={e.title} 
                      height={DeviceUtil.imageHeight()} 
                      maxWidth="200px"/> 
                </span>
              )
            : sequenceType === SequenceType.WORD ? 
              orderedLetters.current.map((e:string) =>
                <span className="sequence-feedback-image sequence-letter" id={"feedback-" + e} 
                  key={e}>
                    {e}
                </span>
              )
            : sequenceType === SequenceType.NUMBERS ? 
              orderedNumbers.current.map((e:number) =>
                <span className="sequence-feedback-image sequence-letter" id={"feedback-" + e} 
                  key={e}>
                    {e}
                </span>
              )
            : <></>
          }
          <span><FaceFeedback face={feedbackFace} /></span>
        </div>
      </div>

      <WellDone />
    </div>
  )
}