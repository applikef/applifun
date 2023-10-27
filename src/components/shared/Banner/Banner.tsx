import { Link } from "react-router-dom";

import './Banner.css'

export interface BannerPropsType {
  settings?: Function;
}

export const Banner = (props: BannerPropsType) => {
  return (
    <>
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
        </div>
      </div>
      <hr className="banner-hr"/>
    </>
  );
}