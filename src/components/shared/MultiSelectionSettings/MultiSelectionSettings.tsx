import React, { ChangeEvent, useRef, useState } from "react";
 interface MultiSelectionSettingsProps {
  className: string;
  title: string;
  maxNumberOfValidGroups?: number;
  options: string[];
  handleSettingsCancel: Function;
  handleSettingsDone: Function;
 }

export const MultiSelectionSettings = (props: MultiSelectionSettingsProps) => {

  const numberOfGroups:number = props.options.length;
  const maxNumberOfValidGroups = 
    !props.maxNumberOfValidGroups ||
    (props.maxNumberOfValidGroups && props.maxNumberOfValidGroups >= props.options.length) ?
      props.options.length
    : props.maxNumberOfValidGroups;

  const [selectedGroupIndices, setSelectedGroupIndices] = 
    useState<boolean[]>((new Array(numberOfGroups)).fill(false).map(
      (v,i) => (i < maxNumberOfValidGroups ? true : false)
    ));
    let validGroupIndices = 
      useRef<boolean[]>((new Array(numberOfGroups)).fill(false).map(
        (v,i) => i < maxNumberOfValidGroups ? true : false));

  function handleSettingsSelectGroup(e:ChangeEvent<HTMLInputElement>, index: number) : boolean[] {
    const isChecked = e.target.checked;
    let settingArr = new Array(...selectedGroupIndices)
    const nSelected = settingArr.filter(Boolean).length;
    if (isChecked) {
      if (nSelected < maxNumberOfValidGroups) {
        settingArr[index] = true;
      }
      else {
        alert(`בחרת כבר ${maxNumberOfValidGroups} כניסות`);
      }
    }
    else {
      settingArr[index] = false;
    }
    return settingArr;  
  }
  
  function handleSettingsDone() {
    if (selectedGroupIndices.indexOf(true) === -1) {
      alert(`אליך לבחור לפחות כניסה אחת`);
      return;
    }
    validGroupIndices.current = selectedGroupIndices;
    props.handleSettingsDone([...selectedGroupIndices]);
  }

  function handleClearAll() {
    const empty: boolean[] = (new Array(numberOfGroups)).fill(false);  
    setSelectedGroupIndices(empty);
  }

  function handleSettingsCancel() {
    setSelectedGroupIndices(validGroupIndices.current);
    props.handleSettingsCancel();
  }

  return(
      <div className={props.className}>
        <div className="game-settings-title">{ props.title }</div>
        {
          maxNumberOfValidGroups < props.options.length &&
            <div className="game-settings-title">ניתן לבחור עד {maxNumberOfValidGroups} כניסות</div>
        }

        { props.options.map(
          (group, i) => 
            <div className="game-settings-entry" key={i}>
              <input type="checkbox"
                checked={selectedGroupIndices[i]} 
                onChange={(e:ChangeEvent<HTMLInputElement>) => {
                  const settingArr: boolean[] = handleSettingsSelectGroup(e, i);
                  setSelectedGroupIndices(settingArr);
                }}></input>
              <span key={i}>{group}</span>
            </div>
        )}
        <br/>
        <button className="app-button-primary-sm" onClick={() => {
          handleSettingsDone(); 
        }}>שמור</button>
        <button className="app-button-ghost-sm" onClick={() => {
          handleClearAll(); 
        }}>נקה הכל</button>
        <button className="app-button-ghost-sm" onClick={() => {
          handleSettingsCancel();
        }}>בטל וסגור</button>
      </div>
  )
}