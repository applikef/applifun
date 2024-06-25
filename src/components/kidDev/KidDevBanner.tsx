import { Link } from "react-router-dom";

export interface KidDevBannerProps {
  settings?: Function;
}

export const KidDevBanner = (props: KidDevBannerProps) => {
  return (
    <>
        <div className="banner-icon-bar">
          <div className="banner-right-icon-bar">
            <Link to="/">
              <img src="resources/icons/home128.png" className="banner-icon" 
                title="עמוד הבית"  alt="עמוד הבית" />
            </Link>
            { 
              <img src="resources/icons/settings.png" className="banner-icon" 
                title="הגדרות משחק"  alt="הגדרות משחק" 
                onClick={() => props.settings ? props.settings() : undefined}/>
            }
          </div>
        </div>
      <hr className="banner-hr"/>      
    </>
  );
}