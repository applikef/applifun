import React, { useState } from "react";
import "./TalkToMe.css";
import { MediaUtil } from "../../../utils/MediaUtil";
import { DIRECTION } from "../../../utils/ConstantsUtil";
import { ModalNotification } from "../Notification/ModalNotification";

interface TalkToMeProps {
  audioList: Array<string>;
  isAudioCatalog?: boolean;
  direction?: string;
  audioHover?: string;
}

export const TalkToMe = (props: TalkToMeProps) => {
  const [showNoAudio, setShowNoAudio] = useState<boolean>(false);

  const audioList: string[] = props.audioList.map((audioItem) => {
    const url: string | undefined = props.isAudioCatalog ?
      MediaUtil.getCatalogAudio(audioItem)
    :
      MediaUtil.getTextToSpeechAudio(audioItem);
    return url ? url : "";
  });
  const direction = props.direction ? props.direction : DIRECTION.LTR;
  const audioHover = props.audioHover ? props.audioHover : "הַקְלֵק כְּדֵי לִשְׁמֹעַ";
  const icon = direction === DIRECTION.LTR ?
    "resources/icons/talk-to-me-ltr.png"
  :
    "resources/icons/talk-to-me-rtl.png";

  const players = audioList.map((url) => 
    (url && url.length > 0) ? MediaUtil.getPlayer(url) : undefined);

  function play() {
    players.map((player) => player ? player.play() : setShowNoAudio(true));
  }
  
  return(
    <span>
      { (players.length > 0) &&
            <img src={icon} alt="Talk to me"
              className="talk-to-me-icon"
              title={audioHover}
              onClick={() => play()}/>
      }
      <ModalNotification text={ "איני יודע מה לומר" } 
      show={showNoAudio}
      onDismiss={() => setShowNoAudio(false)}/>

    </span>
  )
}