import React, { useContext, useRef, useState } from "react";

import "./MultipleChoice.css";

import { FACES } from "../../shared/FaceFeedback/FaceFeedback";
import { showWellDone } from "../../shared/WellDone/WellDone";

import { MediaUtil } from "../../../utils/MediaUtil";
import { ObjectsUtil } from "../../../utils/ObjectsUtil";
import { PlayListNames } from "../../../assets/playLists";
import { Banner } from "../../global/Banner/Banner";
import { DeviceUtil } from "../../../utils/DeviceUtil";
import GamesContext, { GamesContextType } from "../../../context/GamesContext";
import { ConstantsUtil } from "../../../utils/ConstantsUtil";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../../shared/PageHeader/PageHeader";
import { GeneralUtil } from "../../../utils/GeneralUtil";
import { MultipleChoiceDescriptorType, MultipleChoiceQuestionType, MultipleChoiceSectionType } from "../../../model/componentDescriptors.types";

export interface MultipleChoiceProps {
  gameDescriptor: MultipleChoiceDescriptorType;
};

export const MultipleChoice = (props: MultipleChoiceProps) => {
  const descriptor = useRef(props.gameDescriptor);
  
  const navigate = useNavigate();

  const { 
    audioOn,
    isTablet 
  } = useContext(GamesContext) as GamesContextType;

  const helpFileName: string | undefined = descriptor.current.helpFile ? descriptor.current.helpFile : undefined;

  const playerHooray:HTMLAudioElement = MediaUtil.pickPlayer(PlayListNames.SHORT_HOORAY);
  const playerOuch:HTMLAudioElement = MediaUtil.pickPlayer(PlayListNames.OUCH);

  const [feedbackFace, setFeedbackFace] = useState<FACES>(FACES.NONE);

  let currentSectionIndex = useRef(0);
  const [currentSection, setCurrentSection] = 
    useState<MultipleChoiceSectionType>(descriptor.current.sections[0]);
  let currentQuestionIndex = useRef(0);
  const [currentQuestion, setCurrentQuestion] 
    = useState<MultipleChoiceQuestionType>(descriptor.current.sections[0].questions[0]);

    function verifyResponse(selectedAnswerIndex: number) {
      if (selectedAnswerIndex === currentQuestion.correctAnswerIndex) {
        setFeedbackFace(() => FACES.HAPPY);
        MediaUtil.player(playerHooray, audioOn);
        if (currentQuestionIndex.current < currentSection.questions.length-1) {
          const newQuestionIndex = currentQuestionIndex.current+1;
          currentQuestionIndex.current = newQuestionIndex;
          setCurrentQuestion(currentSection.questions[newQuestionIndex])
          setTimeout(() => {
            setFeedbackFace(() => FACES.NONE);
          }, ConstantsUtil.hoorayShortTimeout)
        }
        else if (currentSectionIndex.current < descriptor.current.sections.length-1) {
          let newSectionIndex = currentSectionIndex.current + 1;
          currentSectionIndex.current = newSectionIndex;
          setCurrentSection(descriptor.current.sections[newSectionIndex]);
          currentQuestionIndex.current = 0;
          setCurrentQuestion(() => descriptor.current.sections[newSectionIndex].questions[0]);
          setTimeout(() => {
            setFeedbackFace(() => FACES.NONE);
          }, ConstantsUtil.hoorayShortTimeout)
        }
        else {
          setFeedbackFace(() => FACES.NONE);
          showWellDone(audioOn);
          setTimeout(() => {
            navigate(GeneralUtil.targetNavigationOnGameOver(descriptor.current.isQuiz));
          }, ConstantsUtil.hoorayTimeout); 
        }
      }
      else {
        setFeedbackFace(() => FACES.WORRY);
        MediaUtil.player(playerOuch, audioOn);
      }
    }

  return (
    <div className="app-page">
      <Banner gameId={descriptor.current.gameId} 
        isQuiz={descriptor.current.isQuiz}
        helpFile={helpFileName} 
      />

      <div>
        <PageHeader title={ currentQuestion.questionText ? currentQuestion.questionText : "" } 
          feedbackFace={ feedbackFace } />
        <div className="multiple-choice-sub-title">
          הַקְלֵק עַל הַתְּשׁוּבָה הַנְּכוֹנָה
        </div>
        <div className="app-center">
          <div className="multiple-choice-sub-image">
            <img src={MediaUtil.getCatalogImage(currentSection.image)} alt={currentSection.title}
              height={DeviceUtil.imageHeightLarge(isTablet)}></img>  
          </div>

          <div>
            { currentQuestion.answers.map((answer: string, i: number) => 
              <button key={i} className="app-button-widget"
                onClick={() => verifyResponse(i)}
              > 
                {answer}
              </button>
            )}
          </div>
        </div>
      </div>
  </div>
  )
}