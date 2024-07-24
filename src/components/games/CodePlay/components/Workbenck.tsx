import { CodeArea } from "./codeArea/CodeArea";
import { DisplayArea } from "./displayArea/DisplayArea";

import "./../../../../assets/styles/codePlay.css";

export interface WorkBenchProps {
}

export const Workbench = (props: WorkBenchProps) => 
{  
  return(
    <div className="app-page">
      <div className="kd-workbench">
        <CodeArea></CodeArea>
        <DisplayArea></DisplayArea>
      </div>
    </div>
  )
}
