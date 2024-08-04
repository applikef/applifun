import React, { MouseEventHandler } from "react";
import "./TitledImage.css";

export interface TitledImageProps {
  id: string;
  src: string;
  alt: string | undefined;
  height: string;
  maxWidth?: string;
  className: string;
  onClick?: MouseEventHandler<HTMLImageElement>;
}

export const TitledImage = (props: TitledImageProps) => {

  return (
    <span  id={props.id}
      className={`titled-image-global ${props.className}`}
      onClick={props.onClick ?? props.onClick}>
      <img src={props.src} 
        alt={props.alt ? props.alt : ""} 
        height={props.height}
        style={{maxWidth: props.maxWidth ? props.maxWidth : ""}}>
      </img>
      <span className="titled-image-caption">{props.alt ? props.alt : ""}</span>
    </span>
  )
}