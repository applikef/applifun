import React from "react";
import { Match } from "../components/games/Match/Match";

export const DayQuiz = () => {
  const fileName = "20141008_letterMatchAlefToVav.json";
  const descriptor = require(`./../assets/descriptors/dayQuizDescriptors/${fileName}`);
  return (
    <div>
      <Match gameDescriptor={descriptor}/>
    </div>
  )
} 