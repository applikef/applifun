import React from "react";

import { TileDescriptorType } from "../../../model/componentDescriptors.types";

export interface TilePropsType {
  gameDescriptor: TileDescriptorType;
}
export const Tile = (props: TilePropsType) => {
  return(
    <div>
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