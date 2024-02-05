import React from "react";
import "./WellDone.css";
import { MediaUtil } from "../../../utils/MediaUtil";
import { PlayListNames } from "../../../assets/playLists";

export const showWellDone = (audioOn: boolean) => {
  MediaUtil.play(MediaUtil.pickAudio(PlayListNames.LONG_HOORAY), audioOn);
  document.getElementById("well-done")!.classList.add("well-done-show");
}

export const hideWellDone = () => {
  document.getElementById("well-done")!.classList.remove("well-done-show");
}

export const WellDone = () => {
  return (
    <div className="well-done-global" id="well-done">
      <img src="resources/images/well-done-200.png" className="well-done-img" alt="well done" />
    </div>
  )
}