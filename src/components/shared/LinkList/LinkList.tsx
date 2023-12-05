import React from "react";

import { Banner } from "../Banner/Banner";
import { LinkListDescriptorType } from "../../componentDescriptors.types";

export interface LinkListPropsType {
  gameDescriptor: LinkListDescriptorType;
}
export const LinkList = (props: LinkListPropsType) => {
  return(
    <div>
      <Banner gameId="" />
      <h1>{ props.gameDescriptor.title }</h1>
      <div>
        <a target="yoga" href={props.gameDescriptor.href}>{ props.gameDescriptor.hrefTitle }</a>
      </div>
    </div>
  )
}