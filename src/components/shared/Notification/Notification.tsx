import React from "react";

import "./Notification.css";

export enum NotificationType {
  INFO = "info",
  WARNING = "warning",
  ERROR = "error",
  PLAIN = "plain"
}

export interface NotificationPropsType {
  type?: NotificationType;
  title?: string;
  content: string[];
  style?: any;
}
export const Notification = (props: NotificationPropsType) => {
  const notificationType = props.type ?
    props.type
  :
    NotificationType.INFO;

  let typeStyle = "notification-global-" + notificationType;
  let style = `notification-global ${typeStyle}`;
  return (
    <div className={style} style={props.style}>
      { props.title &&
        <div>{ props.title}</div>
      }

      { props.content.map((row,i) => <div key={i}>{row}</div>) }
    </div>
  )
}