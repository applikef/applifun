import { Link } from "react-router-dom";

import { Card } from "../components/shared/Card/Card";
import { HomePageItemType, HomePageSectionType, homePageDescriptor } from  "../assets/homePageDescriptor";

import './pages.css';
import { DeviceUtil } from "../utils/DeviceUtil";
import { useState } from "react";
import { LineBreak } from "../components/shared/LineBreak";

export const HomePage = () => {
  const isMobile = DeviceUtil.isMobileDevice();
  const isSmallScreen = DeviceUtil.isSmallDevice();

  const [showSection, setShowSection] = useState<Array<boolean>>(new Array<boolean>(homePageDescriptor.length));

  function updateShowSection(index: number) {
    let arr = new Array<boolean>(homePageDescriptor.length);
    arr[index] = true;
    setShowSection(arr);
  }

  return (
    <div className="home-page-app">
      <div className="home-page-content-area">
        <div className="home-page-title">מְשַׂחֲקִים וְלוֹמְדִים</div>
        { isSmallScreen ? 
          <div>
            <div className="home-page-sub-title app-indent-top-16">בְּחַר סוּג מִשְׂחָק לִרְאוֹת אֶת הַמִּשְׂחָקִים הַקַּיָּמִים</div>
            <div className='home-page-section-list' data-walkthrough="app-games-list">
              {homePageDescriptor.map((section: HomePageSectionType,i) =>
                (!isMobile ||
                  (isMobile && (section.mobile ? section.mobile : true))) &&
                  <div className="home-page-games-list" key={i}>
                    <div className="app-clickable" onClick={() => updateShowSection(i)}>
                      {section.title &&
                        <div className="app-sub-title">{section.title}</div>
                      } 
                      <LineBreak />
                      {section.media &&
                        <img src={section.media} height={DeviceUtil.imageHeight()} 
                          alt={section.title} />
                      } 
                    </div>
                  </div>
              )}
            </div>
            <div>
              {homePageDescriptor.map((section: HomePageSectionType,i) =>
                <div key={i} 
                  className={`home-page-games-list-items ${showSection[i] ? "app-show-flex" : "app-hide"}`} >
                  <div className="app-sub-title home-page-games-list-title">{section.title}</div>
                  {section.items.map((game: HomePageItemType,i) => 
                    <Card key={game.id}
                        content={<Link to={game.path} className="app-link app-default-text">{game.label}</Link>}
                        media={game.media ? game.media : undefined}
                        linkMedia={game.path}
                        height={game.height ? game.height : undefined}
                    />
                  )}
                </div>
              )}
            </div>
          </div> 
        :
          <div className="home-page-games-list-large-device-list">
            {homePageDescriptor.map((section: HomePageSectionType,i) =>
              <div key={i} 
                className="home-page-games-list-items home-page-games-list-large-device app-show-flex">
                <div className="app-sub-title home-page-games-list-title">{section.title}</div>
                {section.items.map((game: HomePageItemType,i) => 
                  <Card key={game.id}
                      content={<Link to={game.path} className="app-link app-default-text">{game.label}</Link>}
                      media={game.media ? game.media : undefined}
                      linkMedia={game.path}
                      height={game.height ? game.height : undefined}
                  />
                )}
              </div>
            )}
          </div>
        }  
      </div>
      <div>
        <Link to="/launch?gameId=changeRecords" className="app-link-sm">
          לרשימת כל עדכוני המשחקים
        </Link> 
      </div>
    </div>
  );
}
