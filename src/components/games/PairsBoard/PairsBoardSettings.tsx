import React, { ChangeEvent, useState } from "react";
import "./PairsBoard.css";
import { ModalNotification } from "./../../../components/shared/Notification/ModalNotification";
import { ObjectsUtil } from "../../../utils/ObjectsUtil";

 interface PairsBoardSettingsProps {
  className: string;
  goal: number;
  boardSize: number;
  handleSettingsCancel: Function;
  handleSettingsDone: Function;
 }

interface PairsBoardSettingsValues {
  goal: number;
  boardSize: number;
} 

export const PairsBoardSettings = (props: PairsBoardSettingsProps) => {
  const [notificationContent, setNotificationContent] = useState<string>("");
  const [showNotification, setShowNotification] = useState<boolean>(false);

  const [settingsValues, setSettingsValues] = useState<PairsBoardSettingsValues>({
    goal: props.goal,
    boardSize: props.boardSize
  });

  function handleSettingsDone() {
    if (!ObjectsUtil.isEven(settingsValues.boardSize)) {
      setNotificationContent(`גובה ורוחב הלוח צריך להיות מספר זוגי`);
      setShowNotification(true);
      return;
    }
    props.handleSettingsDone(settingsValues.boardSize, settingsValues.goal);
  }

  function handleClearAll() {
    setSettingsValues({
      goal: props.goal,
      boardSize: props.boardSize
    });
  }

  function handleSettingsCancel() {
    handleClearAll();
    props.handleSettingsCancel();
  }

  function handleUpdateBoardSize(e:ChangeEvent<HTMLInputElement>) {
    setSettingsValues({
      ...settingsValues,
      boardSize: Number(e.target.value),
    });
  }

  function handleUpdateGoal(e:ChangeEvent<HTMLInputElement>) {
    setSettingsValues({
      ...settingsValues,
      goal:  Number(e.target.value)
    });
  }

  return(
      <div className={props.className}>
        { showNotification && notificationContent.length > 0 &&
          <ModalNotification
            text={notificationContent} 
            show={showNotification}
            onDismiss={() => setShowNotification(false)} 
          />
        }

        <div className="pairs-board-settings-form">
          <div>
            <label htmlFor="goal">סכום לתוצאת החיבור</label>
          </div>
          <div>
            <input id="goal" type="number" min={5} value={settingsValues.goal.toString()}
              onChange={(e:ChangeEvent<HTMLInputElement>) => {
                handleUpdateGoal(e);
              }}></input>          
          </div>
          <div>
            <label htmlFor="size">רוחב וגובה הלוח, מספר זוגי</label>
          </div>
          <div>
            <input id="size" type="number" min={2} value={settingsValues.boardSize.toString()}
              step="2"
              onChange={(e:ChangeEvent<HTMLInputElement>) => {
                handleUpdateBoardSize(e);
              }}></input>          
          </div>
        </div>

        <div>
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