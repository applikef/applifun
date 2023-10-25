import { Link } from "react-router-dom";

import { Card } from "../components/shared/Card/Card";
import { HomePageDescriptorType, homePageDescriptor } from  "../assets/homePageDescriptor";

import './pages.css';

export const HomePage = () => {
  return (
    <div className="home-page-app">
      <div className="home-page-content-area">
        <div className="home-page-title">מְשַׂחֲקִים וְלוֹמְדִים</div>
          <div className='home-page-games-list' data-walkthrough="app-games-list">
            {homePageDescriptor.map((game: HomePageDescriptorType,i) => 
              <Card key={game.id}
                  content={<Link to={game.path} className="app-link">{game.label}</Link>}
                  media={game.media ? game.media : undefined}
                  linkMedia={game.path}
                  height={game.height ? game.height : undefined}
              />
            )}
          </div>
      </div>
    </div>
  );
}
