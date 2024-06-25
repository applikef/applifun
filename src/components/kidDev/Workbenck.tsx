import { useContext } from "react";
import { CodeArea } from "./CodeArea";
import { DisplayArea } from "./DisplayArea";
import KidDevContext, { KidDevContextType } from "./KidDevContext";

import "./kidDev.css";

export interface WorkBenchProps {
}

export const Workbench = (props: WorkBenchProps) => 
{  
  const { 
    displayLevel,
  } = useContext(KidDevContext) as KidDevContextType;

  return(
    <div className="app-page">
      <div className="kid-dev-workbench">
        { displayLevel > 0 &&
          <CodeArea></CodeArea>
        }
        <DisplayArea></DisplayArea>
      </div>
    </div>
  )
}
