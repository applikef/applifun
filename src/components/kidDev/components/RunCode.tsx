import { useContext } from "react";
import "./../kidDev.css";
import KidDevContext, { KidDevContextType } from "./../KidDevContext";
import { CodeInterpreter } from "./../utils/CodeInterpreter";

export interface ExecuteCodeProps {

}

export const ExecuteCode = (props: ExecuteCodeProps) => 
{  
  const context = useContext(KidDevContext) as KidDevContextType;
  const interpreter = new CodeInterpreter(context)

  return(
    <img src="resources/kidDev/play32.png" className="banner-icon" style={{marginBottom: "16px"}}
      title="בצע"  alt="בצע"
      onClick={() => interpreter.execute()}/>
  )
}

