import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HOME_PAGE_PATH } from "../utils/ConstantsUtil";

import "./pages.css";

interface StudentType {
  firstName: string;
  lastName: string;
  className: string;
}

export const Login = () => {
  const classNames = [
    "לילך",
    "זית"
  ]
  const navigate = useNavigate();

  const [student, setStudent] = useState<StudentType>({
    firstName: "",
    lastName: "",
    className: classNames[0]
  });

  const submitHandler = (() => {
      if (student.firstName === "נטע" && student.lastName === "שני" &&
        student.className === "לילך" 
      ) {
        navigate(HOME_PAGE_PATH);
      }
      else {
        alert(`משהו לא נכון: שם תלמיד ${student.firstName} שם משפחה: ${student.lastName} או כיתה: ${student.className}`);
      }
  })

return (
  <div className="app-page">
    <form onSubmit={submitHandler}>
      <div className="login-form">
        <div className="login-label">שם פרטי:</div>
        <div>
          <input type="text" name="firstName" value={student.firstName}
            className="login-input-entry"
            onChange={(e) => setStudent({
            ...student,
            firstName: e.target.value
          })}></input>
        </div>

        <div className="login-label">שם משפחה:</div>
        <div>
          <input type="text" name="lastName" value={student.lastName}
            className="login-input-entry"
            onChange={(e) => setStudent({
            ...student,
            lastName: e.target.value
          })}></input>
        </div>

        <div className="login-label">כיתה:</div>
        <div>
          <select className="login-label" onChange={(e) => setStudent({
            ...student,
            className: e.target.value
          })}>
            {
              classNames.map((className: string) => 
                  <option value={className} className="login-label">{ className }</option>
              )
            }
          </select>
        </div>
      </div>
      <div className="login-button">
        <input type="submit" value="התחל" className="app-button-primary-sm"></input>
      </div>
    </form>
  </div>
)} 