import React, { useEffect, useState } from "react";
import { ScoreboardDescriptor } from "../../../model/global.types";
import "./../../../assets/styles/global.css";

interface ScoreboardProps {
  scores: ScoreboardDescriptor;
}

export const Scoreboard = (props: ScoreboardProps) => {
  const outlineImage = props.scores.outlineImage === undefined ? 
    "resources/icons/heart-outline.png" : props.scores.outlineImage;
  const image =  props.scores.image === undefined ? 
    "resources/icons/heart.png" : props.scores.image;

  const scoresArr = new Array(props.scores.totalScores);
  for (let i=0; i < scoresArr.length; i++) {
    scoresArr[i] = (i < props.scores.scores ? true : false);
  }

  const [boardEntries, setBoardEntries] = useState<Array<boolean>>(scoresArr);

  useEffect(() => {
    const scoresArr = new Array(props.scores.totalScores);
    for (let i=0; i < scoresArr.length; i++) {
      scoresArr[i] = (i < props.scores.scores ? true : false);
    }
    setBoardEntries(scoresArr);
  }, [props.scores.scores, props.scores.totalScores])

  return (
    <div className="app-indent-top-08"> {
      boardEntries.map((entry, i) =>  
        <span key={i}>
          { entry === true ? 
            <img src={image} className="banner-icon" 
                title="יש!"  alt="יש!" />
          : 
            <img src={outlineImage} className="banner-icon" 
              title="עדיין לא"  alt="עדיין לא" />  
          }
        </span>
      )
    }
    </div>
  )
}
