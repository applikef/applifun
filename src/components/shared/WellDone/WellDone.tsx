import React from "react";
import "./WellDone.css";
import { MediaUtil } from "../../../utils/MediaUtil";
import { PlayListNames } from "../../../assets/playLists";

export const showWellDone = (audioOn: boolean) => {
  MediaUtil.play(MediaUtil.pickAudio(PlayListNames.LONG_HOORAY), audioOn);
  
//  const SHOW_TIME = 3000;

  document.getElementById("well-done")!.classList.add("well-done-show");
  // setTimeout(() => {
  //   const e = document.getElementById("well-done");
  //   if (e) {
  //     e.classList.remove("well-done-show");
  //   }
  // }, SHOW_TIME);
}

export const hideWellDone = () => {
  document.getElementById("well-done")!.classList.remove("well-done-show");
}

export const WellDone = () => {
  return (
    <div className="well-done-global" id="well-done">
      <img src="resources/images/well-done-200.png" alt="well done" />
    </div>
  )
}