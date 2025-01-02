import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import "./../../../assets/styles/global.css";
import { ModalNotification } from "../Notification/ModalNotification";

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

  const [notificationContent, setNotificationContent] = useState<string>("");
  const [showNotification, setShowNotification] = useState<boolean>(false);

  useEffect(()=>{
    setSelectedGroupIndices((new Array(numberOfGroups)).fill(false).map(
      (v,i) => (i < maxNumberOfValidGroups ? true : false)
  ))},[maxNumberOfValidGroups, numberOfGroups]);

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
        setNotificationContent(`בחרת כבר ${maxNumberOfValidGroups} כניסות`);
        setShowNotification(true);
      }
    }
    else {
      settingArr[index] = false;
    }
    return settingArr;  
  }
  
  function handleSettingsDone() {
    if (selectedGroupIndices.indexOf(true) === -1) {
      setNotificationContent(`אליך לבחור לפחות כניסה אחת`);
      setShowNotification(true);
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

        { showNotification && notificationContent.length > 0 &&
          <ModalNotification
            text={notificationContent} 
            show={showNotification}
            onDismiss={() => setShowNotification(false)} 
          />
        }

        { props.options.map(
          (group, i) => 
            <span className="game-settings-entry" key={i}>
              <input type="checkbox"
                checked={selectedGroupIndices[i]} 
                onChange={(e:ChangeEvent<HTMLInputElement>) => {
                  const settingArr: boolean[] = handleSettingsSelectGroup(e, i);
                  setSelectedGroupIndices(settingArr);
                }}></input>
              <span key={i}>{group}</span>
            </span>
        )}
        <div className="app-indent-top-20">
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
      </div>
  )
}