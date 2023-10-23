import React, { useRef, useState } from "react";

import "./Match.css";
import { Banner } from "../../shared/Banner/Banner";
import { MatchDescriptorType } from "./Match.types";

export interface MatchPropsType {
  gameDescriptor: MatchDescriptorType;
}

export const Match = (props: MatchPropsType) => {
  const playerHooray = new Audio("resources/audio/hooray-short-1.mp3");
  const playerOi = new Audio("resources/audio/ouch-2.mp3");

  const colorFiles = props.gameDescriptor.colorFiles;
  const colorIds = props.gameDescriptor.colorIds;
  const colorNames = props.gameDescriptor.colorNames;
  const imageColorIds = props.gameDescriptor.imageColorIds;
  const images = props.gameDescriptor.images;

  const [selectedIndex, setSelectedIndex] = 
    useState<number>(Math.floor(Math.random() * colorFiles.length));
  const [feedbackClass, setFeedbackClass] = useState<string>("feedbackImageHide");

  let selectedColorId = useRef(colorIds[selectedIndex])
  let selectedColor = useRef(colorNames[selectedIndex]);
  let selectedColorName = useRef(colorNames[selectedIndex]);

  function setColor() {
    let lastIndex = selectedIndex;
    let newIndex = 0;
    do {
      newIndex = Math.floor(Math.random() * colorFiles.length);
    } while (newIndex === lastIndex);

    selectedColorId.current = colorIds[newIndex];
    selectedColor.current = colorNames[newIndex];
    selectedColorName.current = colorNames[newIndex];

    setSelectedIndex(() => newIndex);
  }

  function updateColor() {
    setColor();
    setFeedbackClass(() => "feedbackImageHide");
  }

  function verifyImage(imageColorId: string) {
    if (imageColorId === selectedColorId.current) {
      setFeedbackClass(() => "feedbackImageShow");
      playerHooray.play();
    }
    else {
      setFeedbackClass(() => "feedbackImageHide");
      playerOi.play();
    }
  }

  return(
    <div>
      <Banner />
      <div id="instructions" className="instructions">
        { ` בְּחַר תְּמוּנוֹת עִם דְּבָרִים שֶׁהַצֶּבַע שֶׁלָּהֶם ${selectedColorName.current}` }
      </div>
      <div className="feedbackImage" id="feedbackImage">
        <img src="resources/games/well-done-200.png" alt="כל הכבוד" width="150px" className={feedbackClass} />      
      </div>
      <div id="colorSplash" className="colorImage">
        <img src={colorFiles[selectedIndex]} alt={ selectedColorName.current } width="150px" />
        <div className="colorName">
          { selectedColorName.current } 
        </div>
      </div>
      <div className="imagesArea">
        {
          images.map((img,i) =>
            <img src={ img } alt="" key={i} width="100px"  onClick={() => verifyImage(imageColorIds[i])} />
          )
        }

      </div>
      <div className="controlArea">
        <button className="button" onClick={() => updateColor()}>צֶבַע חָדָשׁ</button>
      </div>
    </div>
  )
}