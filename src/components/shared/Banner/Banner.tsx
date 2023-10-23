import { Link } from "react-router-dom";

import './Banner.css'
export const Banner = () => {
  return (
    <>
      <div className="banner-icon-bar">
        <div className="banner-right-icon-bar">
          <Link to="/">
            <img src="resources/icons/home128.png" className="banner-icon" 
              title="עמוד הבית"  alt="עמוד הבית" />
          </Link>
        </div>
        <div className="banner-left-icon-bar">
        </div>
      </div>
      <hr className="banner-hr"/>
    </>
  );
}