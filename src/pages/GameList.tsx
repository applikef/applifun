import React from "react";

import { Banner } from "../components/global/Banner/Banner";
import { useTranslation } from "react-i18next";

import "./pages.css";
import { homePageDescriptor } from "../assets/descriptors/homePageDescriptor";
import { HomePageItemType, HomePageSectionType } from "../model/componentDescriptors.types";

export const GameList = () => {
  const { t } = useTranslation();
  
  return (
    <div className="app-page">
      <Banner gameId="" showLeftIconBar={false} />
      <div className="app-indent-top-32 game-list-page">
        <div className="app-title">רשימת המשחקים</div>

        {homePageDescriptor.map((section: HomePageSectionType, i:number) => {
          return(
            <div key={`section ${i}`}>
              {
                section.hide !== true && section.title &&
                <div className="game-list-section-title">
                  {t(section.title)}
                </div>
              }
              { section.hide !== true &&
                section.items.map((item: HomePageItemType, j: number) => {
                  return(
                    <div key={`section ${i} item ${j}`}> {
                      item.hide !== true && 
                      <div className="game-list-section-item">
                        <span className="app-light-bold">{t(item.label)}</span>
                        {item.description !== undefined && <span>: {t(item.description)}</span>}
                      </div> }
                    </div> 
                  )
                })
              }
            </div>                 
          )
        })}
      </div>
    </div>
  )
}