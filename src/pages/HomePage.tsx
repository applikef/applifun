import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from 'react-responsive'

import { Card } from "../components/shared/Card/Card";
import { homePageDescriptor } from  "../assets/descriptors/homePageDescriptor";

import './pages.css';
import { useContext, useLayoutEffect, useState } from "react";
import { LineBreak } from "../components/shared/LineBreak";
import { Help } from "../components/global/help/Help";
import { AttentionArrow } from "../components/shared/AttentionArrow/AttentionArrow";
import { BASE_URL, ConstantsUtil, FONT_SIZE } from "../utils/ConstantsUtil";
import GamesContext, { GamesContextType} from "../context/GamesContext";
import { DeviceUtil } from "../utils/DeviceUtil";
import { ModalNotification } from "../components/shared/Notification/ModalNotification";
import { useTranslation } from "react-i18next";
import { Trans } from "react-i18next";
import { User } from "../model/users.types";
import { HomePageItemType, HomePageSectionType } from "../model/componentDescriptors.types";
import { Education } from "../components/shared/Education/Education";

export const HomePage = () => {
  const { t } = useTranslation();

  const {
    setIsTablet,
    setIsPortrait,
    user,
    setUser
  } = useContext(GamesContext) as GamesContextType;

  /* Local isTablet for the value to be used in this component before 
     context is updated
  */
  const users: Array<User> = require("./../assets/descriptors/users/usersDescriptor.json");
  const isTablet = useMediaQuery({ query: `(max-width: ${ConstantsUtil.smallScreenWidth}px)` });
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
  useLayoutEffect(() => {
    setIsTablet(isTablet);
    setIsPortrait(isPortrait);
  }, [setIsPortrait, isPortrait, isTablet, setIsTablet]);

  const [showHelp, setShowHelp] = useState<string>("banner-hide-help");
  const [showMailHelp, setShowMailHelp] = useState<string>("home-page-hide-mail-help");
  const [showSection, setShowSection] = useState<Array<boolean>>(new Array<boolean>(homePageDescriptor.length));
  const [showArrow, setShowArrow] = useState<Array<number>|undefined>(undefined);
  const [dismissPortrait, setDismissPortrait] = useState<boolean>(false);
  
  const navigate = useNavigate();

  const userList = new Array<User>();
  for (let i = 0; i < users.length; i++) {
    if (users[i].show === undefined || users[i].show === true) {
      userList.push(users[i]);
    }
  }
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

  function setHelpState() {
    setShowHelp(() => showHelp === "banner-show-help" ? "banner-hide-help" : "banner-show-help");
  }

  return (
    <div className="home-page-app">
      <div className="home-page-content-area">
        <div className="home-page-top-banner">
          <div className="home-page-mail app-clickable"
            onClick={() => {
              setShowMailHelp(() => showMailHelp === "home-page-show-mail-help" ? "home-page-hide-mail-help" : "home-page-show-mail-help");
            }}>
            <Trans i18nKey="HomePageMailTitle">
              Comments? Insights? Proposals? We'd be glad to hear. 
              <span className='app-bold'>Write to us to goofarimhaifa@gmail.com</span>
            </Trans>            
          </div>
          <img src={BASE_URL + "resources/icons/help.png"} 
            className="banner-icon app-clickable"
            title={t("HomePageHelpTitle")}  
            onClick={() => {               
              setShowHelp(() => showHelp === "banner-show-help" ? "banner-hide-help" : "banner-show-help")}
            }
            alt={t("HelpStr")} />
        </div>
        {isTablet && <br/>}

        <ModalNotification text={ t("HomePageHoldInLandscape") } 
          show={(isTablet && isPortrait) && !dismissPortrait}
          onDismiss={() => setDismissPortrait(true)}/>

        <div className={`home-page-title ${DeviceUtil.getFontSize(isTablet, FONT_SIZE.XXL)}`}>
          { t("HomePagePlayAndLearn") }
          <span className={`home-page-user-area ${DeviceUtil.getFontSize(isTablet, FONT_SIZE.L)}`}>
            <span className="home-page-user-area-title">נושא</span>
            <select id="userList" defaultValue={user.id} 
              className="home-page-user-area-selection" onChange={()=>{
              const selectObject: HTMLSelectElement | null = 
                document.getElementById("userList") as HTMLSelectElement;
              let i: number = -1; 
              if (selectObject !== null) {
                i = selectObject.selectedIndex - 1; // -1 to compensate for the first general entry
              }
              setUser(i > -1 ? users[i] : {"id": ""});
            }}>
              <option value="">כללי</option>
              {userList.map((currentUser) => 
                 <option value={currentUser.id} key={currentUser.id}>{currentUser.name}</option>
              )}
            </select>
          </span>
        </div>
        <div>
          <div className="home-page-sub-title app-indent-top-16 home-page-sub-title">
            {t("HomePageChooseGroup")}
            <div className="home-page-sub-sub-title">
            <Link to="/launch?gameId=gameList" className="app-link-sm">
              {t("HomePageGamesList")}
            </Link> 
            </div>
          </div>
          <div className='home-page-section-list' data-walkthrough="app-games-list">
            {homePageDescriptor.map((section: HomePageSectionType,i) =>
              (section.hide !== true && (!isTablet ||
                (isTablet && (section.mobile ? section.mobile : true)))) &&
                <div className="home-page-games-list" key={i}>
                  <div className="app-clickable" onClick={() => updateShowSection(i)}>
                    {section.title &&
                      <div className="app-sub-title">{t(section.title)}</div>
                    } 
                    <LineBreak />
                    {section.media &&
                      <img src={BASE_URL + section.media} 
                        height={DeviceUtil.imageHeightMedium(isTablet)} 
                        alt={t(section.title ? section.title : "")} onClick={(evt) => showDownArrow(evt)}/>
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
                <div className="app-sub-title home-page-games-list-title">
                  {t(section.title ? section.title : "")}
                  {section.education !== undefined &&
                    <Education id={section.education}/>
                  }
                </div>
                {section.items.map((game: HomePageItemType,i) => 
                  { return (game.hide === undefined || game.hide === false) && 
                    <Card key={game.id}
                        content={<Link to={game.path} className="app-link app-default-text">{t(game.label)}</Link>}
                        media={game.media ? BASE_URL + game.media : undefined}
                        linkMedia={game.path}
                        height={ DeviceUtil.getImageSize(isTablet, (game.height ? game.height : ConstantsUtil.defaultImageHeight))}
                    />
                  }
                )}
              </div>
            )}
          </div>
        </div> 
        <Link to="/launch?gameId=changeRecords" className="app-link-sm">
          {t("HomePageChangeRecord")}
        </Link> 
        <div className="app-link-sm">
          Many images of this site were downloaded from https://www.pexels.com/, https://pixabay.com/ or freepik.com
        </div> 
        
      </div>

      <div className={`banner-help-content ${showHelp}`}>
        <Help gameId={"generalHelp"} baseUrl={BASE_URL} onClose={setHelpState}/>
      </div>
      <div 
        className={`home-page-mail-help app-clickable ${showMailHelp}`}
        onClick={() => {               
          setShowMailHelp("home-page-hide-mail-help")}
        }
      >
        {t("HomePageMailHelp")}
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
