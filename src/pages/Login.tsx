import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HOME_PAGE_PATH } from "../utils/ConstantsUtil";
import GamesContext, { GamesContextType } from "../context/GamesContext";

import "./pages.css";
import { User } from "../model/users.types";
import { DBClass, DBManager } from "../assets/db/DBManager";

export const Login = () => {
  const dbClasses: DBClass[] = require("./../assets/db/class_names.json")
  const navigate = useNavigate();

    const { 
      setUser
    } = useContext(GamesContext) as GamesContextType;


  const [student, setStudent] = useState<User>({
    id: "",
    firstName: "",
    lastName: "",
    className: dbClasses[0].id
  });

  const submitHandler = (() => {
    let user: User | undefined = DBManager.getStudent(student.firstName, student.lastName,
      student.className);
    if (user !== undefined) {
      student.id = user.id;
      setUser({
        ...student
    });
      navigate(HOME_PAGE_PATH, {state: student.id});
    }
    else {
      setUser(undefined);
      alert(`משהו לא נכון: שם תלמיד ${student.firstName} שם משפחה: ${student.lastName} או כיתה: ${student.className}`);
      gotoHome();
    }
  })

  function gotoHome() {
    navigate(HOME_PAGE_PATH);
  }

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
              dbClasses.map((dbClass: DBClass) => 
                  <option key={dbClass.id} value={dbClass.name} 
                    className="login-label">{ dbClass.name }</option>
              )
            }
          </select>
        </div>
      </div>
      <div className="login-button">
        <input type="submit" value="התחל" className="app-button-primary-sm"></input>
      </div>
    </form>
    <div><div className="login-label app-link" onClick={() => gotoHome()}>התחל עם כל המשחקים</div></div>
  </div>
)} 