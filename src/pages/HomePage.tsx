import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMediaQuery } from 'react-responsive'

import { Card } from "../components/shared/Card/Card";
//import { homePageDescriptor } from  "../assets/descriptors/homePageDescriptor";

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
import { Subject } from "../model/subjects.types";
import { HomePageItemType, HomePageSectionType } from "../model/componentDescriptors.types";
import { Education } from "../components/shared/Education/Education";
import { ObjectsUtil } from "../utils/ObjectsUtil";

interface ShowStateType {
    help: String;
    mailHelp: String;
    section: Array<boolean>;
    arrow: Array<number> | undefined,
    dismissPortrait: boolean;
}

export const HomePage = () => {
  const { t } = useTranslation();

  const {
    setIsTablet,
    setIsPortrait,
    subject,
    setSubject
  } = useContext(GamesContext) as GamesContextType;

  const { state } = useLocation();
  let homePageDescriptor: HomePageSectionType[] = 
    require("../assets/descriptors/defaultHomePageDescriptor.json");

  if (state !== null) {
    const { id } = state;
    console.log(`state=${state}`);
    console.log(id);
    console.log(state.id);
    homePageDescriptor = require(`./../assets/db/${state}.json`);
  }

  /* Local isTablet for the value to be used in this component before 
     context is updated
  */
  const subjects: Array<Subject> = require("./../assets/descriptors/subjects/subjectsDescriptor.json");
  const isTablet = useMediaQuery({ query: `(max-width: ${ConstantsUtil.smallScreenWidth}px)` });
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
  useLayoutEffect(() => {
    setIsTablet(isTablet);
    setIsPortrait(isPortrait);
  }, [setIsPortrait, isPortrait, isTablet, setIsTablet]);

  const [showState, setShowState] = useState<ShowStateType>({
    help: "banner-hide-help",
    mailHelp: "home-page-hide-mail-help",
    section: new Array<boolean>(homePageDescriptor.length),
    arrow: undefined,
    dismissPortrait: false
  })

  const navigate = useNavigate();

  const subjectList = new Array<Subject>();
  for (let i = 0; i < subjects.length; i++) {
    if (subjects[i].show === undefined || subjects[i].show === true) {
      subjectList.push(subjects[i]);
    }
  }
  function updateShowSection(index: number) {
    if (homePageDescriptor[index].items.length > 1) {
      let arr = new Array<boolean>(homePageDescriptor.length);
      arr[index] = true;
      setShowState({
        ...showState,
        section: arr
      })
    }
    else {
      navigate(homePageDescriptor[index].items[0].path);
    }
  }

  function showDownArrow(event: React.MouseEvent<HTMLElement>) {
    setShowState({
      ...showState,
      arrow: [event.clientX, event.clientY]
    })
  }

  function setHelpState() {
    setShowState({
      ...showState,
      help: showState.help === "banner-show-help" ? "banner-hide-help" : "banner-show-help"
    })
  }

  return (
    <div className="home-page-app">
      <div className="home-page-content-area">
        <ModalNotification text={ t("HomePageHoldInLandscape") } 
          show={(isTablet && isPortrait) && !showState.dismissPortrait}
          onDismiss={() => 
            setShowState({
              ...showState,
              dismissPortrait: true
            })
          }/>

        <div className={`home-page-title ${DeviceUtil.getFontSize(isTablet, FONT_SIZE.XXL)}`}>
          <img src={BASE_URL + "resources/icons/help.png"} 
            className={ `${isTablet ? "banner-icon-tablet" : "banner-icon"} app-clickable` }
            title={t("HomePageHelpTitle")}  
            onClick={() => {               
              setShowState({
                ...showState,
                help: showState.help === "banner-show-help" ? "banner-hide-help" : "banner-show-help"
              })
            }}
            alt={t("HelpStr")} />

          { t("HomePagePlayAndLearn") }
        { subjectList.length > 1 &&
          <span className={`home-page-user-area ${DeviceUtil.getFontSize(isTablet, FONT_SIZE.L)}`}>
            <span className="home-page-user-area-title">נושא</span>
              <select id="subjectList" defaultValue={subject.id} 
                className="home-page-user-area-selection" onChange={() => {
                const selectObject: HTMLSelectElement | null = 
                  document.getElementById("subjectList") as HTMLSelectElement;
                let subjectId: string = selectObject !== null ? selectObject.value : ""; 
                let subject = ObjectsUtil.getEntityById(subjects, subjectId);
                setSubject(subject !== undefined ? subject : {"id": ""});
              }}>
                <option value="">כללי</option>
                {subjectList.map((currentSubject) => 
                  <option value={currentSubject.id} key={currentSubject.id}>{currentSubject.name}</option>
                )}
              </select>
            </span>
          }
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
            {homePageDescriptor.map((section: HomePageSectionType, i: number) =>
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
            {homePageDescriptor.map((section: HomePageSectionType, i: number) =>
              <div key={i} 
                className={`home-page-games-list-items ${showState.section[i] ? "app-show-flex" : "app-hide"}`} >
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

        <div className="home-page-mail app-clickable padding-top-l"
          onClick={() => {
            setShowState({
              ...showState,
              mailHelp: showState.mailHelp === "home-page-show-mail-help" ? "home-page-hide-mail-help" : "home-page-show-mail-help"
            })
          }}>
          <Trans i18nKey="HomePageMailTitle">
            Comments? Insights? Proposals? We'd be glad to hear. 
            <span className='app-bold'>Write to us to goofarimhaifa@gmail.com</span>
          </Trans>            
        </div>

        <Link to="/launch?gameId=changeRecords" className="app-link-sm">
          {t("HomePageChangeRecord")}
        </Link> 
        <div className="app-link-sm">
          Many images of this site were downloaded from https://www.pexels.com/, https://pixabay.com/ or freepik.com
        </div> 
        
      </div>

      <div className={`banner-help-content ${showState.help}`}>
        <Help gameId={"generalHelp"} baseUrl={BASE_URL} onClose={setHelpState}/>
      </div>
      <div 
        className={`home-page-mail-help app-clickable ${showState.mailHelp}`}
        onClick={() => {               
          setShowState({
            ...showState,
            mailHelp: "home-page-hide-mail-help"
          })
        }}
      >
        {t("HomePageMailHelp")}
      </div>

      { isTablet && 
        <div className={showState.arrow ? "app-show-inline": "app-hide"}
          style={{position: "absolute", 
            left: showState.arrow ? 
              showState.arrow[0] : 
              0, top: showState.arrow ? showState.arrow[1] : 0}}>
          <AttentionArrow></AttentionArrow>
        </div>
      }
    </div>
  );
}
