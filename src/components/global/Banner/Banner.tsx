import { Link } from "react-router-dom";

import './Banner.css'
import { useContext, useState } from "react";
import GamesContext, { GamesContextType } from "../../../context/GamesContext";
import { Help } from "../help/Help";

export interface BannerPropsType {
  gameId: string;
  settings?: Function;
}

export const Banner = (props: BannerPropsType) => {
  const { turnAudioOn, turnAudioOff, audioOn } = useContext(GamesContext) as GamesContextType;

  const [showBanner, setShowBanner] = useState<boolean>(true);
  const [showHelp, setShowHelp] = useState<string>("banner-hide-help");
  
  return (
    <>
      {showBanner &&
        <div className="banner-icon-bar">
          <div className="banner-right-icon-bar">
            <Link to="/home">
              <img src="resources/icons/home128.png" className="banner-icon" 
                title="עמוד הבית"  alt="עמוד הבית" />
            </Link>
            { props.settings &&
              <img src="resources/icons/settings.png" className="banner-icon" 
                title="הגדרות משחק"  alt="הגדרות משחק" 
                onClick={() => props.settings ? props.settings() : undefined}/>
            }
          </div>
          <div className="banner-left-icon-bar">
            <div>
              <img src="resources/icons/hide.png" className="banner-icon" 
                  title="החבא תפריט שליטה"  alt="החבא תפריט שליטה"
                  onClick={() => setShowBanner(false)} />
            </div>
            { props.gameId.length > 0 &&
              <div onClick={() => {               
                setShowHelp(() => showHelp === "banner-show-help" ? "banner-hide-help" : "banner-show-help")}
              }>
                <img src="resources/icons/help.png" className="banner-icon" 
                  title="עזרה: קליק לפתיחה ולסגירה"  alt="עזרה" />
              </div>
            }
            {
            audioOn && <img src="resources/icons/speaker.png" className="banner-icon"
              onClick={() => turnAudioOff()} 
                title="קול" alt="קול" />
            }
            {
              !audioOn && <img src="resources/icons/speaker-off.png" className="banner-icon" 
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
        <Help gameId={props.gameId} />
      </div>
    </>
  );
}