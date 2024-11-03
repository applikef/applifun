import React from "react";
import { HOME_PAGE_PATH } from "../utils/ConstantsUtil";
import { Link } from "react-router-dom";

export const DayQuizDone = () => {
  return (
    <div className="app-page quiz-done-page">
      <div className="app-title">
        כל הכבוד!
      </div>
      <div className="app-sub-title">
        השלמת את משחק היום!
      </div>
      <div style={{float: "left", paddingLeft: "16px", paddingTop: "4px", paddingBottom: "3rem"}}>
        <Link to={ HOME_PAGE_PATH }>
          למשחקים נוספים
        </Link>
      </div>
      <div>
        <img src="resources/images/well-done-200.png" alt="well done" />
      </div>
    </div>
  )
} 