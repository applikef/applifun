import { Link } from "react-router-dom";

import { Card } from "../components/shared/Card/Card";
import { HomePageItemType, HomePageSectionType, homePageDescriptor } from  "../assets/homePageDescriptor";

import './pages.css';
import { DeviceUtil } from "../utils/DeviceUtil";

export const HomePage = () => {
  const isMobile = DeviceUtil.isMobileDevice();

  return (
    <div className="home-page-app">
      <div className="home-page-content-area">
        <div className="home-page-title">מְשַׂחֲקִים וְלוֹמְדִים</div>
          <div className='home-page-section-list' data-walkthrough="app-games-list">
            {homePageDescriptor.map((section: HomePageSectionType,i) =>
              (!isMobile ||
                (isMobile && (section.mobile ? section.mobile : true))) &&
                <div className="home-page-games-list" key={i}>
                  {section.title &&
                    <div className="app-sub-title">{section.title}</div>
                  } 
                      <div className="app-line-break"></div>
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
          <div className="app-padding-top-32">
            <Link to="/launch?gameId=changeRecords" className="app-link-sm">
              לרשימת כל עדכוני המשחקים
            </Link> 
          </div>
      </div>
    </div>
  );
}
