import React from "react";
import "./TalkToMe.css";
import { MediaUtil } from "../../../utils/MediaUtil";

interface TalkToMeProps {
  audioList: Array<string>;
  isAudioCatalog?: boolean;
  direction?: string;
  audioHover?: string;
}

export const TalkToMe = (props: TalkToMeProps) => {
  const audioList: string[] = props.audioList.map((audioItem) => {
    const url: string | undefined = props.isAudioCatalog ?
      MediaUtil.getCatalogAudio(audioItem)
    :
      MediaUtil.getTextToSpeechAudio(audioItem);
    return url ? url : "";
  });
  const direction = props.direction ? props.direction : MediaUtil.LTR;
  const audioHover = props.audioHover ? props.audioHover : "הַקְלֵק כְּדֵי לִשְׁמֹעַ";
  const icon = direction === MediaUtil.LTR ?
    "resources/icons/talk-to-me-ltr.png"
  :
    "resources/icons/talk-to-me-rtl.png";

  const players = audioList.map((url) => MediaUtil.getPlayer(url));

  function play() {
    players.map((player) => player.play());
  }
  
  return(
    <span>
      { (players.length > 0) &&
            <img src={icon} alt="Talk to me"
              className="talk-to-me-icon"
              title={audioHover}
              onClick={() => play()}/>
      }
    </span>
  )
}