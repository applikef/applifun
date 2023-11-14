import React, { useState } from "react";

import "./IWrite.css";
import { Sequence } from "../Sequence/Sequence";
import { SequenceDescriptorType, SequenceType } from "../Sequence/Sequence.types";
import { WordDescriptorType } from "./Word.types";
import { MediaUtil } from "../../../utils/MediaUtil";

export interface IWriteProps {
  gameDescriptor: WordDescriptorType[];
}

export const IWrite = (props: IWriteProps) => {
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const sequenceTitle = "סַדֵּר אֶת הָאוֹתִיּוֹת מֵהָרִאשׁוֹנָה לָאַחֲרוֹנָה";

  let currentWord: WordDescriptorType = props.gameDescriptor[currentWordIndex];

  let sequenceDescriptor: SequenceDescriptorType = {
    type: SequenceType.WORD,
    title: sequenceTitle,
    word: currentWord,
    topImage: currentWord.file
  };

  return (
    <div className="i-write-global">
      <Sequence gameDescriptor={sequenceDescriptor} />
    </div>
  )
}