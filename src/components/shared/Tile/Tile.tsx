import React from "react";

import { Banner } from "../Banner/Banner";
import { TileDescriptorType } from "../../componentDescriptors.types";

export interface TilePropsType {
  gameDescriptor: TileDescriptorType;
}
export const Tile = (props: TilePropsType) => {
  return(
    <div>
      <Banner />
      <div className="app-title">{ props.gameDescriptor.title }</div>
      <div>
        <a target="yoga" href={props.gameDescriptor.href} className="app-link">
          <img alt={props.gameDescriptor.hrefTitle} 
            src={props.gameDescriptor.media}
            height="200px"></img>
          <div>
            { props.gameDescriptor.hrefTitle }
          </div>
        </a>
      </div>
    </div>
  )
}