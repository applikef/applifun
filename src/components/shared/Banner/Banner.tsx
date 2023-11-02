import { Link } from "react-router-dom";

import './Banner.css'
import { useState } from "react";

export interface BannerPropsType {
  settings?: Function;
}

export const Banner = (props: BannerPropsType) => {
  const [showBanner, setShowBanner] = useState<boolean>(true);

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
              <img src="resources/icons/speaker.png" className="banner-icon" 
                  title="השתק"  alt="השתק" />
            </div>
            <div>
              <img src="resources/icons/hide.png" className="banner-icon" 
                  title="החבא תפריט שליטה"  alt="החבא תפריט שליטה"
                  onClick={() => setShowBanner(false)} />
            </div>
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
    </>
  );
}