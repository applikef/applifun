import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from 'react-responsive'

import { Card } from "../components/shared/Card/Card";
import { HomePageItemType, HomePageSectionType, homePageDescriptor } from  "../assets/homePageDescriptor";

import './pages.css';
import { useContext, useLayoutEffect, useState } from "react";
import { LineBreak } from "../components/shared/LineBreak";
import { Help } from "../components/global/help/Help";
import { AttentionArrow } from "../components/shared/AttentionArrow/AttentionArrow";
import { ConstantsUtil, FONT_SIZE } from "../utils/ConstantsUtil";
import GamesContext, { GamesContextType } from "../context/GamesContext";
import { DeviceUtil } from "../utils/DeviceUtil";

export const HomePage = () => {
  const baseUrl = "/applifun/";

  const {
    setIsTablet,
  } = useContext(GamesContext) as GamesContextType;

  /* Local isTablet for the value to be used in this component before 
     context is updated
  */
  const isTablet = useMediaQuery({ query: `(max-width: ${ConstantsUtil.smallScreenWidth}px)` });
  useLayoutEffect(() => {
    setIsTablet(isTablet);
  }, [isTablet, setIsTablet]);

  const [showHelp, setShowHelp] = useState<string>("banner-hide-help");
  const [showMailHelp, setShowMailHelp] = useState<string>("home-page-hide-mail-help");
  const [showSection, setShowSection] = useState<Array<boolean>>(new Array<boolean>(homePageDescriptor.length));
  const [showArrow, setShowArrow] = useState<Array<number>|undefined>(undefined);

  const navigate = useNavigate();
  
  function updateShowSection(index: number) {
    if (homePageDescriptor[index].items.length > 1) {
      let arr = new Array<boolean>(homePageDescriptor.length);
      arr[index] = true;
      setShowSection(arr);
    }
    else {
      navigate(homePageDescriptor[index].items[0].path);
    }
  }

  function showDownArrow(event: React.MouseEvent<HTMLElement>) {
    setShowArrow([event.clientX, event.clientY]);
  }

  return (
    <div className="home-page-app">
      <div className="home-page-content-area">
        <div className="home-page-top-banner">
          <div className="home-page-mail app-clickable"
            onClick={() => {               
              setShowMailHelp(() => showMailHelp === "home-page-show-mail-help" ? "home-page-hide-mail-help" : "home-page-show-mail-help")}
            }
          >
            הערות? חוויות? הצעות? נשמח לשמוע. 
            <span className="app-bold"> כתבו לנו ל-goofarimhaifa@gmail.com</span>
          </div>
          <img src={baseUrl + "resources/icons/help.png"} 
            className="banner-icon app-clickable"
            title="עזרה: קליק לפתיחה ולסגירה"  
            onClick={() => {               
              setShowHelp(() => showHelp === "banner-show-help" ? "banner-hide-help" : "banner-show-help")}
            }
            alt="עזרה" />
        </div>
        {isTablet && <br/>}
        <div className={`home-page-title ${DeviceUtil.getFontSize(isTablet, FONT_SIZE.XXL)}`}>
          מְשַׂחֲקִים וְלוֹמְדִים
        </div>
        { true ? 
          <div>
            <div className="home-page-sub-title app-indent-top-16">בְּחַר סוּג מִשְׂחָק לִרְאוֹת אֶת הַמִּשְׂחָקִים הַקַּיָּמִים</div>
            <div className='home-page-section-list' data-walkthrough="app-games-list">
              {homePageDescriptor.map((section: HomePageSectionType,i) =>
                (section.hide !== true && (!isTablet ||
                  (isTablet && (section.mobile ? section.mobile : true)))) &&
                  <div className="home-page-games-list" key={i}>
                    <div className="app-clickable" onClick={() => updateShowSection(i)}>
                      {section.title &&
                        <div className="app-sub-title">{section.title}</div>
                      } 
                      <LineBreak />
                      {section.media &&
                        <img src={baseUrl + section.media} 
                          height={DeviceUtil.imageHeightMedium(isTablet)} 
                          alt={section.title} onClick={(evt) => showDownArrow(evt)}/>
                      } 
                    </div>
                  </div>
              )}
            </div>
            <hr className="home-page-hr"/>
            <div>
              {homePageDescriptor.map((section: HomePageSectionType,i) =>
                <div key={i} 
                  className={`home-page-games-list-items ${showSection[i] ? "app-show-flex" : "app-hide"}`} >
                  <div className="app-sub-title home-page-games-list-title">{section.title}</div>
                  {section.items.map((game: HomePageItemType,i) => 
                    <Card key={game.id}
                        content={<Link to={game.path} className="app-link app-default-text">{game.label}</Link>}
                        media={game.media ? baseUrl + game.media : undefined}
                        linkMedia={game.path}
                        height={ DeviceUtil.getImageSize(isTablet, (game.height ? game.height : ConstantsUtil.defaultImageHeight))}
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
                <div className="app-sub-title home-page-games-list-title">
                  {section.title}
                </div>
                {section.items.map((game: HomePageItemType,i) => 
                  <Card key={game.id}
                      content={<Link to={game.path} 
                      className="app-link app-default-text">{game.label}</Link>}
                      media={game.media ? baseUrl + game.media : undefined}
                      linkMedia={game.path}
                      height={game.height ? game.height : undefined}
                  />
                )}
              </div>
            )}
          </div>
        }  
        <Link to="/launch?gameId=changeRecords" className="app-link-sm">
          לרשימת כל עדכוני המשחקים
        </Link> 
        <br/>
        <div className="app-link-sm">
          Many images of this site were downloaded from https://www.pexels.com/, https://pixabay.com/ or freepik.com
        </div> 
      </div>

      <div className={`banner-help-content ${showHelp}`}>
        <Help gameId={"generalHelp"} baseUrl={baseUrl}/>
      </div>
      <div 
        className={`home-page-mail-help app-clickable ${showMailHelp}`}
        onClick={() => {               
          setShowMailHelp("home-page-hide-mail-help")}
        }
      >
        העתק את כתובת המייל לאפליקצית המייל שלך ושלח אלינו מייל. תודה!
      </div>

      { isTablet && 
        <div className={showArrow ? "app-show-inline": "app-hide"}
          style={{position: "absolute", left: showArrow ? showArrow[0] : 0, top: showArrow ? showArrow[1] : 0}}>
          <AttentionArrow></AttentionArrow>
        </div>
      }
    </div>
  );
}
