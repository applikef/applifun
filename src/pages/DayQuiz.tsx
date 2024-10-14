import React, { useContext, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Match } from "../components/games/Match/Match";
import { useMediaQuery } from "react-responsive";
import { ConstantsUtil } from "../utils/ConstantsUtil";
import GamesContext, { GamesContextType } from "../context/GamesContext";
import { ModalNotification } from "../components/shared/Notification/ModalNotification";
import { NumbersSequence } from "../components/games/Sequence/NumbersSequence";
import { SortGame } from "../components/games/Sort/SortGame";
import { SelectGame } from "../components/games/Select/SelectGame";
import { LettersSequence } from "../components/games/Sequence/LettersSequence";
import { ImagesSequence } from "../components/games/Sequence/ImagesSequence";
import { QuizUtil } from "../utils/QuizUtil";
import { QuizDescriptor } from "../model/quiz.type";

export const DayQuiz = () => {
  const quizDescriptor: QuizDescriptor = QuizUtil.getQuizDescriptor();
  const gameTypeId = quizDescriptor.gameTypeId;
  const descriptorFileName: string = quizDescriptor.gameDescriptorFile;
  const { t } = useTranslation();

  const {
    setIsTablet,
    setIsPortrait
  } = useContext(GamesContext) as GamesContextType;

  /* Local isTablet for the value to be used in this component before 
     context is updated
  */
  const isTablet = useMediaQuery({ query: `(max-width: ${ConstantsUtil.smallScreenWidth}px)` });
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
  useLayoutEffect(() => {
    setIsTablet(isTablet);
    setIsPortrait(isPortrait);
  }, [setIsPortrait, isPortrait, isTablet, setIsTablet]);

  const [dismissPortrait, setDismissPortrait] = useState<boolean>(false);

  return (
    <div>
      {isTablet && <br/>}

      <ModalNotification text={ t("HomePageHoldInLandscape") } 
        show={(isTablet && isPortrait) && !dismissPortrait}
        onDismiss={() => setDismissPortrait(true)}/>

      { 
        gameTypeId === "Match" ?  
          <Match gameDescriptor={require(`./../assets/descriptors/dayQuizDescriptors/${descriptorFileName}`)}/>
        : gameTypeId === "Select" ?
          <SelectGame gameDescriptor={require(`./../assets/descriptors/dayQuizDescriptors/${descriptorFileName}`)}/>
        : gameTypeId === "NumbersSequence" ?
          <NumbersSequence gameDescriptor={require(`./../assets/descriptors/dayQuizDescriptors/${descriptorFileName}`)}/>
        : gameTypeId === "LettersSequence" ?
          <LettersSequence gameDescriptor={require(`./../assets/descriptors/dayQuizDescriptors/${descriptorFileName}`)}/>
        : gameTypeId === "ImagesSequence" ?
          <ImagesSequence gameDescriptor={require(`./../assets/descriptors/dayQuizDescriptors/${descriptorFileName}`)}/>
        : gameTypeId === "Sort" ?
          <SortGame gameDescriptor={require(`./../assets/descriptors/dayQuizDescriptors/${descriptorFileName}`)}/>
        : <></>
      }
    </div>
  )
} 