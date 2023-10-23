import React, { useRef, useState } from "react";

import "./ColorMatch.css";
import { Banner } from "../../shared/Banner/Banner";

export const ColorMatch = () => {
  const playerHooray = new Audio("resources/audio/hooray-short-1.mp3");
  const playerOi = new Audio("resources/audio/ouch-2.mp3");

  const colorIds = [
    "yellow",
    "blue",
    "green",
    "red"
  ]
  const colorFiles = [
    "resources/games/colorMatch/yellow.png",
    "resources/games/colorMatch/blue.png",
    "resources/games/colorMatch/green.png",
    "resources/games/colorMatch/red.png",
  ]
  const colorNames = [
    "צָהוֹב",
    "כָּחוֹל",
    "יָרוֹק",
    "אָדוֹם",
  ]
  const images = [
    "resources/games/colorMatch/balloon-yellow.png",
    "resources/games/colorMatch/butterfly-blue.png",
    "resources/games/colorMatch/flower-red.png",
    "resources/games/colorMatch/grapes-green.png",
    "resources/games/colorMatch/strawberry-red.png",
    "resources/games/colorMatch/halcyon-blue.png",
    "resources/games/colorMatch/tree-green.png",
    "resources/games/colorMatch/flower-yellow.png",
    "resources/games/colorMatch/puff-red.png",
    "resources/games/colorMatch/lemon-yellow.png",
  ];
  const imageColorIds = [
    "yellow",
    "blue",
    "red",
    "green",
    "red",
    "blue",
    "green",
    "yellow",
    "red",
    "yellow"
  ]

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