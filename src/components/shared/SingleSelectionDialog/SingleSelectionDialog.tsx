import React, { ChangeEvent, useState } from "react";
import "./../../../assets/styles/global.css";

 interface SingleSelectionDialogProps {
  className: string;
  title: string;
  options: string[];
  defaultOptionIndex?: number;
  handleDialogCancel: Function;
  handleDialogDone: Function;
 }

export const SingleSelectionDialog = (props: SingleSelectionDialogProps) => {
  const defaultOptionIndex = props.defaultOptionIndex ? props.defaultOptionIndex : 0;
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(defaultOptionIndex);

  function handleDialogDone() {
    props.handleDialogDone(selectedOptionIndex);
  }

  function handleDialogCancel() {
    props.handleDialogCancel();
  }

  return(
      <div className={props.className}>
        <div className="game-settings-title">{ props.title }</div>
        { props.options.map(
          (group, i) => 
            <span className="game-settings-entry" key={i}>
              <input type="radio"
                checked={i === selectedOptionIndex} 
                onChange={(e:ChangeEvent<HTMLInputElement>) => {
                  setSelectedOptionIndex(i);
                }}></input>
              <span key={i}>{group}</span>
            </span>
        )}
        <div className="app-indent-top-20">
          <button className="app-button-primary-sm" onClick={() => {
            handleDialogDone(); 
          }}>שמור</button>
          <button className="app-button-ghost-sm" onClick={() => {
            handleDialogCancel();
          }}>בטל וסגור</button>
        </div>
      </div>
  )
}