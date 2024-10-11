import React, { useContext, useLayoutEffect, useState } from "react";
import { Match } from "../components/games/Match/Match";
import { useMediaQuery } from "react-responsive";
import { ConstantsUtil } from "../utils/ConstantsUtil";
import GamesContext, { GamesContextType } from "../context/GamesContext";
import { ModalNotification } from "../components/shared/Notification/ModalNotification";
import { useTranslation } from "react-i18next";

export const DayQuiz = () => {
  const fileName = "20141008_letterMatchAlefToVav.json";
  const descriptor = require(`./../assets/descriptors/dayQuizDescriptors/${fileName}`);

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
        
      <Match gameDescriptor={descriptor}/>
    </div>
  )
} 