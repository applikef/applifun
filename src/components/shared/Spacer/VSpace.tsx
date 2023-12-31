import React from "react";

interface SpacePropsType {
  size: number;
}

export const VSpace = (props: SpacePropsType) => {
  const sizeAsString: string = props.size + "px";
  const styleStr = { 
    paddingTop: sizeAsString 
  };
  return <div style={ styleStr } ></div>
}