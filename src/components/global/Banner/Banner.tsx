import { Link } from "react-router-dom";

import './Banner.css'
import { ChangeEvent, useContext, useState } from "react";
import GamesContext, { GamesContextType } from "../../../context/GamesContext";
import { Help } from "../help/Help";
import { getGameDescriptor, getProfileList } from "../../../pages/pages.util";
import { HOME_PAGE_PATH } from "../../../utils/ConstantsUtil";

export interface BannerPropsType {
  gameId: string;
  settings?: Function;
  hideAudio?: boolean;
  showLeftIconBar?: boolean;
  helpFile?: string;
  profileHandler?: Function;
  isQuiz?: boolean;
}

export const Banner = (props: BannerPropsType) => {
  let activeIsQuiz = false;
  if (props.isQuiz !== undefined) {
    activeIsQuiz = props.isQuiz;
  }

  const { 
    turnAudioOn, 
    turnAudioOff, 
    audioOn, 
    user 
  } = useContext(GamesContext) as GamesContextType;

  const showLeftIconBar = props.showLeftIconBar !== undefined ? props.showLeftIconBar : true;

  const [showBannerBar, setShowBannerBar] = useState<boolean>(true);
  const [showHelp, setShowHelp] = useState<string>("banner-hide-help");

  function setHelpState() {              
    setShowHelp(() => showHelp === "banner-show-help" ? "banner-hide-help" : "banner-show-help")
  }  
  
  function loadProfile(e: ChangeEvent<HTMLSelectElement>) {
    let profileId: string = e.target.value;
    if (props.profileHandler !== undefined) {
      const descriptor = getGameDescriptor(props.gameId, user, profileId)
      props.profileHandler(descriptor);
    }
  }

  return (
    <>
      { !activeIsQuiz &&
        <div>
        { showBannerBar &&
          <div className="banner-icon-bar">
            <div className="banner-right-icon-bar">
              <Link to={HOME_PAGE_PATH}>
                <img src="resources/icons/home128.png" 
                  className="banner-icon" 
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
            { showLeftIconBar &&
              <div className="banner-left-icon-bar">
                <div>
                  <img src="resources/icons/hide.png" className="banner-icon" 
                      title="החבא תפריט שליטה"  alt="החבא תפריט שליטה"
                      onClick={() => setShowBannerBar(false)} />
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
            }
          </div>
        }
        {showBannerBar && <hr className="banner-hr"/>}
        
        {!showBannerBar &&
          <div>
            <img src="resources/icons/show.png" className="banner-icon" 
                title="הראה תפריט שליטה"  alt="הראה תפריט שליטה"
                onClick={() => setShowBannerBar(true)} />
          </div>
        }
        <div className={`banner-help-content ${showHelp}`}>
          { props.helpFile ?
              <Help fileName={props.helpFile} onClose={setHelpState}/>
            :
              <Help gameId={props.gameId} onClose={setHelpState}/>
          }
        </div>
      </div>
    }
    { activeIsQuiz &&
      <div className="banner-icon-bar">
        <div className="banner-right-icon-bar">
          <span className="app-sub-title banner-title">משחק היום</span>
        </div>
        <div  className="banner-left-icon-bar">
          <div className="banner-label">
            <Link to={ HOME_PAGE_PATH }  className="app-link">
              דלג
            </Link>
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
        <div className={`banner-help-content ${showHelp}`}>
          { props.helpFile ?
              <Help fileName={props.helpFile} onClose={setHelpState}/>
            :
              <Help gameId={props.gameId} onClose={setHelpState}/>
          }
        </div>
      </div>
    }
  </>
);
}