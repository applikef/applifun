import React, { useContext, useEffect, useRef, useState } from "react";

import "./Sequence.css";

import { FACES } from "../../shared/FaceFeedback/FaceFeedback";
import { TitledImage } from "../../shared/TitledImage/TitledImage";
import { showWellDone } from "../../shared/WellDone/WellDone";

import { ImageDescriptorType, ImageSequenceDescriptorType } from "./Sequence.types";

import { MediaUtil } from "../../../utils/MediaUtil";
import { ObjectsUtil } from "../../../utils/ObjectsUtil";
import { PlayListNames } from "../../../assets/playLists";
import { Banner } from "../../global/Banner/Banner";
import { DeviceUtil } from "../../../utils/DeviceUtil";
import GamesContext, { GamesContextType } from "../../../context/GamesContext";
import { PageHeader } from "../../shared/PageHeader/PageHeader";

export interface ImagesSequenceProps {
  gameDescriptor: ImageSequenceDescriptorType;
};

let imageDescriptors: ImageDescriptorType[] = [];

export const ImagesSequence = (props: ImagesSequenceProps) => {
  const { 
    audioOn 
  } = useContext(GamesContext) as GamesContextType;

  const playerHooray:HTMLAudioElement = MediaUtil.pickPlayer(PlayListNames.SHORT_HOORAY);
  const playerOuch:HTMLAudioElement = MediaUtil.pickPlayer(PlayListNames.OUCH);

  let selectedSequenceSteps = useRef<string[]>([]);
  function addSequenceStep(id: string) {
    selectedSequenceSteps.current.push(id);
  };

  const images = props.gameDescriptor.images;
  
  const [, setShowPage] = useState(false);
  const [feedbackFace, setFeedbackFace] = useState<FACES>(FACES.NONE);
  const [pageTitle, setPageTitle] = 
    useState(props.gameDescriptor.title ? 
      props.gameDescriptor.title 
    : 
      "סַדֵּר אֶת הַתְּמוּנוֹת לְפִי סֵדֶר הַפְּעֻולּוֹת"
    );

  let shuffledImages = useRef<ImageDescriptorType[]>([]);

  useEffect(() => {
    imageDescriptors = images ? images : [];
    shuffledImages.current = ObjectsUtil.shuffleArrayItems(imageDescriptors);
    setShowPage(()=>true);
  }, [images]);

  function showSuccess() {
    setPageTitle("כל הכבוד!");
    setFeedbackFace(() => FACES.NONE);
    showWellDone(audioOn);
  }

  function verifyImage(image: ImageDescriptorType) {
    if (imageDescriptors.indexOf(image)+1 === selectedSequenceSteps.current.length+1) {
      addSequenceStep(image.id);
      document.getElementById("feedback-"+image.id)!.style.display = "inline-block";
      document.getElementById("bank-"+image.id)!.style.display = "none";
      setFeedbackFace(() => FACES.HAPPY);
      if (imageDescriptors.indexOf(image)+1 === imageDescriptors.length) {
        showSuccess();
      }
      else {
        MediaUtil.player(playerHooray, audioOn);
      }
    }
    else {
      setFeedbackFace(() => FACES.WORRY);
      MediaUtil.player(playerOuch, audioOn);
    }
  }

  return (
    <div className="app-page">
      <Banner gameId={props.gameDescriptor.gameId}/>
      <div className="sequence-container">

        <PageHeader title={ pageTitle } feedbackFace={ feedbackFace } />

        <div className="sequence-source-images" >
          {shuffledImages.current.map((e:ImageDescriptorType,i:number) =>
              <TitledImage className="sequence-image" id={"bank-" + e.id} key={i} 
                src={MediaUtil.getCatalogImage(e.file)} alt={e.title} 
                height={DeviceUtil.imageHeight()} 
                maxWidth="200px"
                onClick={() => verifyImage(e)}></TitledImage>
            )
          }
        </div>
      </div>

      <div className="sequence-feedback">
        {
          <h3>
            פֹּה לְמַטָּה נִרְאֶה אֶת הַתְּמוּנוֹת מְסֻדָּרוֹת
          </h3>
        }
        <div>
          {imageDescriptors.map((e,i) =>
                <span key={i}>
                    <TitledImage className="sequence-feedback-image" 
                      id={"feedback-" + e.id} src={MediaUtil.getCatalogImage(e.file)} 
                      alt={e.title} 
                      height={DeviceUtil.imageHeight()} 
                      maxWidth="200px"/> 
                </span>
              )
          }
        </div>
      </div>
    </div>
  )
}