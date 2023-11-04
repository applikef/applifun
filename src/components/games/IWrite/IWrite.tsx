import React, { useState } from "react";

import "./IWrite.css";
import { Sequence } from "../Sequence/Sequence";
import { SequenceDescriptorType, SequenceType } from "../Sequence/Sequence.types";
import { WordDescriptorType } from "./Word.types";

export interface IWriteProps {
  gameDescriptor: WordDescriptorType[];
}

export const IWrite = (props: IWriteProps) => {
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const sequenceTitle = "סדר את האותיות מהראשונה לאחרונה";

  let currentWord: WordDescriptorType = props.gameDescriptor[currentWordIndex];

  let sequenceDescriptor: SequenceDescriptorType = {
    type: SequenceType.WORD,
    title: sequenceTitle,
    word: currentWord
  };

  return (
    <div className="i-write-global">
      <img src={currentWord.file} alt={currentWord.title}></img>
      <Sequence gameDescriptor={sequenceDescriptor} />
    </div>
  )
}