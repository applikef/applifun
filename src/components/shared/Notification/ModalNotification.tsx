import React from "react";
import "./Notification.css";

export interface ModalNotificationProps {
  text: string;
  show: boolean;
  media?: string;
  onDismiss: Function;
};

export const ModalNotification = (props: ModalNotificationProps) => {
  return (
    <div className={`modal-notification-global ${props.show ? "modal-notification-show" : "modal-notification-hide"}`}>
      { props.media ? <img src={props.media} height="48px" alt={props.text} /> : <></>} 
      { props.text }
      <br/>
      <button onClick={() => { props.onDismiss()}}>הַמְשֵׁךְ</button>
    </div>
  )
}