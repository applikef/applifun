import { Link } from "react-router-dom";

import { Card } from "../components/shared/Card/Card";
import { HomePageDescriptorType, homePageDescriptor } from  "../assets/homePageDescriptor";

import './pages.css';
import { DeviceUtil } from "../utils/DeviceUtil.utils";

export const HomePage = () => {
  return (
    <div className="app">
      <div className="app-landing">
        <div className="landing-title">מָה אֲנִי עוֹשֶׂה?</div>
        { DeviceUtil.isSmallDevice() ?
            <div className="app-title"><br/><br/><br/>
              צָרִיךְ מָסָךְ גָּדוֹל יוֹתֵר כְּדֵי לְהִשְׁתַּמֵּשׁ בַּתָּכְנָה שֶׁלָּנוּ
            </div>
          :
            <div className='app-games-list' data-walkthrough="app-games-list">
              {homePageDescriptor.map((game: HomePageDescriptorType,i) => 
                <Card key={game.id}
                    content={<Link to={game.path} className="app-link">{game.label}</Link>}
                    media={game.media ? game.media : undefined}
                    linkMedia={game.path}
                    position={game.position ? {x: game.position.x, y: game.position.y} : undefined}
                    height={game.height ? game.height : undefined}
                />
              )}
            </div>
        }
      </div>
    </div>
  );
}
