import { User, SchoolClass } from "../../model/users.types";

export interface DBStudent {
  id: string;
  first_name: string;
  last_name: string;
  class_name: string;
}

export interface DBClass {
  id: string;
  name: string;  
}

export class DBManager {
  public static getClass(className: string) : SchoolClass | undefined {
    const classes: DBClass[] = require("./class_names.json");
    let classElement: SchoolClass | undefined = undefined;
    classes.forEach((element: DBClass) => {
      if (element.name === className) {
        classElement = {
          "id": element.id,
          "name": element.name
        }
      }
    })
    return classElement;
  }

  public static getStudent(firstName: string, lastName: string, 
    className: string): User | undefined {    
    const users: DBStudent[] = require("./students.json");
    const classElement: DBClass | undefined = DBManager.getClass(className);
    if (classElement === undefined) {
      return;
    }

    let student: User | undefined;
    users.forEach((element: DBStudent) => {
      if (element.first_name === firstName &&
        (element.last_name === lastName || element.last_name === "") &&
        element.class_name === classElement.id) {
          student = {
            id: element.id,
            firstName: firstName,
            lastName: lastName,
            className: classElement.name
          }
        }
    });
    return (student);
  }
}