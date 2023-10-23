import React, { ReactElement } from "react";

import "./Card.css";
import { Link } from "react-router-dom";

export interface CardProps {
  media?: string;
  title?: string;
  content: ReactElement;
  position?: {
    x: string,
    y: string
  }
  height?: number;
  linkMedia?: string;
};

export const Card = (props: CardProps) => {
  let styleStr = {};
  if (props.position) {
    styleStr = {
      position: "absolute",
      right: props.position.x,
      top: props.position.y,
    }
  }
  return (
    <div className="card-global" style={styleStr}>
      {
        props.media ?
          props.linkMedia ?
            <Link className="app-clickable" to={props.linkMedia}>
              <img src={props.media} height={props.height ? props.height : 100} 
                className="card-media" alt={props.title} />
            </Link>
          :
            <img src={props.media} height={props.height ? props.height : 100} 
            className="card-media" alt={props.title} />
        : <></>
      }
      { 
        props.title &&
          <div>{props.title!}</div>
      }
      <div>{props.content}</div>
    </div>
  )
}