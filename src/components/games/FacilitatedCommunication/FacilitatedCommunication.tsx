import React, { ChangeEvent, useContext, useRef, useState } from "react";
import { FACES } from "../../shared/FaceFeedback/FaceFeedback";

import GamesContext, { GamesContextType } from "../../../context/GamesContext";

import "./FacilitatedCommunication.css";

import { PlayListNames } from "../../../assets/playLists";
import { MediaUtil } from "../../../utils/MediaUtil";
import { Banner } from "../../global/Banner/Banner";
import { ConstantsUtil } from "../../../utils/ConstantsUtil";
import { PageHeader } from "../../shared/PageHeader/PageHeader";
import { ObjectsUtil } from "../../../utils/ObjectsUtil";

export interface FacilitatedCommunicationProps {

}

export const FacilitatedCommunication = (props: FacilitatedCommunicationProps) => {
  const { 
    audioOn
  } = useContext(GamesContext) as GamesContextType;

  const [feedbackFace, setFeedbackFace] = useState<FACES>(FACES.NONE);
  
  const letters = [
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
    ["/", "'", "ק", "ר", "א", "ט", "ו", "ן", "ם", "פ"],
    ["ש", "ד", "ג", "כ", "ע", "י", "ח", "ל", "ך", "ף"],
    ["ז", "ס", "ב", "ה", "נ", "מ", "צ", "ת", "ץ", "."]
  ]
  
  function keyClickedHandler(item: string) {
    alert(item);
  }

  return(
    <div className="app-page">
      <Banner gameId="facilitatedCommunication"/>

      <PageHeader title="אני נוגעת באותיות" 
        //audio={}
        feedbackFace={ feedbackFace }
      />

      <table>
        <tbody className="fc-board-style">
          {
            letters.map((row,i) => {
              return <tr className="fc-row-style">
                {
                  row.reverse().map((item,j) => {
                    return <td className="fc-key-style" onClick={() => keyClickedHandler(item)}>
                      { item }
                    </td>
                  })
                }
              </tr>
            })
          }
        </tbody>
      </table>      
    </div>
  )
}