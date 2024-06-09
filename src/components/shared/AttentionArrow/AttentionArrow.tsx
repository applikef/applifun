import React from "react";

import "./AttentionArrow.css";

export const AttentionArrow = () => {
  const baseUrl = "/applifun/";

  return (
    <div className="attention-arrow-area">
      <img src={`${baseUrl}resources/icons/top-down-arrow.png`} alt="תסתכל למטה"
        title="תסתכל למטה"
        className="attention-arrow attention-arrow-float" style={{zoom: "50%"}} />
    </div>
  )
}