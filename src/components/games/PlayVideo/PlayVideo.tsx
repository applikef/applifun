import React from "react";
import ReactPlayer from "react-player";
import { Banner } from "../../shared/Banner/Banner";

export const PlayVideo = () => {
  return(
    <div className="page">
      <Banner />
      <ReactPlayer
        url="./resources/videos/yogaTheChildThatImagined.mp4"
        controls={true}
        width="100%"
        height="100%"
      />
    </div>
  )
}