import React from "react";
import "./TalkToMe.css";
import { MediaUtil } from "../../../utils/MediaUtil";

interface TalkToMeProps {
  audioList: Array<string>;
  direction?: string;
}

export const TalkToMe = (props: TalkToMeProps) => {
  const direction = props.direction ? props.direction : MediaUtil.LTR;
  const icon = direction == MediaUtil.LTR ?
    "resources/icons/talk-to-me-ltr.png"
  :
    "resources/icons/talk-to-me-rtl.png";

  const players = props.audioList.map((url) => MediaUtil.getPlayer(url));

  function play() {
    players.map((player) => player.play());
  }
  
  return(
    <span>
      { (players.length > 0) &&
            <img src={icon} alt="Talk to me"
              className="talk-to-me-icon"
              title="הַקְלֵק כְּדֵי לִשְׁמֹעַ אֶת הַמִּלָּה"
              onClick={() => play()}/>
      }
    </span>
  )
}