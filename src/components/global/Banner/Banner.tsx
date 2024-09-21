import { Link } from "react-router-dom";

import './Banner.css'
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import GamesContext, { GamesContextType } from "../../../context/GamesContext";
import { Help } from "../help/Help";
import { getGameDescriptor, getProfileList } from "../../../pages/pages.util";
import { ProfileDescriptor } from "../../../model/profileDescriptor.type";

export interface BannerPropsType {
  gameId: string;
  settings?: Function;
  hideAudio?: boolean;
  helpFile?: string;
  profileHandler?: Function;
}

export const Banner = (props: BannerPropsType) => {
  const { turnAudioOn, turnAudioOff, audioOn } = useContext(GamesContext) as GamesContextType;

  const [showBanner, setShowBanner] = useState<boolean>(true);
  const [showHelp, setShowHelp] = useState<string>("banner-hide-help");

  function setHelpState() {              
    setShowHelp(() => showHelp === "banner-show-help" ? "banner-hide-help" : "banner-show-help")
  }  
  
  function loadProfile(e: ChangeEvent<HTMLSelectElement>) {
    let profileId: string = e.target.value;
    if (props.profileHandler !== undefined) {
      const descriptor = getGameDescriptor(props.gameId, profileId)
      props.profileHandler(descriptor);
    }
  }

  return (
    <>
      {showBanner &&
        <div className="banner-icon-bar">
          <div className="banner-right-icon-bar">
            <Link to="/">
              <img src="resources/icons/home128.png" className="banner-icon" 
                title="עמוד הבית"  alt="עמוד הבית" />
            </Link>
            { props.settings &&
              <img src="resources/icons/settings.png" className="banner-icon" 
                title="הגדרות משחק"  alt="הגדרות משחק" 
                onClick={() => props.settings ? props.settings() : undefined}/>
            }
            { getProfileList(props.gameId).length > 0 &&
              <span className="banner-profile-selection">
              <span className="banner-profile-selection-title">גרסאות:</span>
              <select className="banner-profile-selection-select" 
                onChange={(e) => loadProfile(e)}>
                { 
                  getProfileList(props.gameId).map((item) => 
                    <option key={item.id} value={item.id}>{ item.title }</option>)
                }
              </select>
              </span>
            }
          </div>
          <div className="banner-left-icon-bar">
            <div>
              <img src="resources/icons/hide.png" className="banner-icon" 
                  title="החבא תפריט שליטה"  alt="החבא תפריט שליטה"
                  onClick={() => setShowBanner(false)} />
            </div>
            { props.gameId.length > 0 &&
              <div onClick={() => setHelpState()}>
                <img src="resources/icons/help.png" className="banner-icon" 
                  title="עזרה: קליק לפתיחה ולסגירה"  alt="עזרה" />
              </div>
            }
            {
              !props.hideAudio && audioOn && <img src="resources/icons/speaker.png" className="banner-icon"
                onClick={() => turnAudioOff()} 
                  title="קול" alt="קול" />
            }
            {
              !props.hideAudio && !audioOn && <img src="resources/icons/speaker-off.png" className="banner-icon" 
                onClick={() => turnAudioOn()}
                  title="קול" alt="קול" />
            }
          </div>
        </div>
      }
      {showBanner && <hr className="banner-hr"/>}
      
      {!showBanner &&
        <div>
          <img src="resources/icons/show.png" className="banner-icon" 
              title="הראה תפריט שליטה"  alt="הראה תפריט שליטה"
              onClick={() => setShowBanner(true)} />
        </div>
      }
      <div className={`banner-help-content ${showHelp}`}>
        { props.helpFile ?
            <Help fileName={props.helpFile} onClose={setHelpState}/>
          :
            <Help gameId={props.gameId} onClose={setHelpState}/>
        }
      </div>
    </>
  );
}