import React from "react";
import { BASE_URL } from "../../../utils/ConstantsUtil";
import "./../../../assets/styles/global.css";
import { Link } from "react-router-dom";

export interface EducationProps {
  id: string;
}

export const Education = (props: EducationProps) => {
  return (
    <div className="app-clickable">
      {
        <Link to={`/launch?gameId=${props.id}`} className="app-link-sm">
          <img src={BASE_URL + "resources/icons/advise128.png"} 
            alt="education icon" 
            height={64}>
          </img>
        </Link> 
      }
    </div>)
}