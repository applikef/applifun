import { useState } from "react";
import { KDPencil, 
  DEFAULT_PENCIL, 
  PENCIL_IMAGE } from "../../model/KDPencil";
import { DISPLAY_AREA_HEIGHT, DISPLAY_AREA_WIDTH } from "../../constants/displayConstants";
import "./displayArea.css";

export interface DisplayAreaProps {
}

export const DisplayArea = (props: DisplayAreaProps) => {
  const [pencil, setPencil] = useState<KDPencil>(DEFAULT_PENCIL);

  return(
    <div className="kd-display-area">
      <div>
        <div className="kd-display-area-drawing-area">
          <svg width={DISPLAY_AREA_WIDTH} height={DISPLAY_AREA_HEIGHT}
            viewBox={`0 0 ${DISPLAY_AREA_WIDTH} ${DISPLAY_AREA_HEIGHT}`}>
            <image id="pencil" href={PENCIL_IMAGE} x={pencil.x} y={pencil.y} />
          </svg>
        </div>
      </div>
      <div className="kd-display-area-attribute">
        <a href="https://www.freepik.com/free-vector/cute-koala-hanging-pencil-with-bag-cartoon-vector-icon-illustration-animal-education-isolated_39515607.htm#fromView=search&page=1&position=14&uuid=8be2567d-0f34-4a9b-87e1-4a4792bedcd6">Image by catalyststuff on Freepik</a>
      </div>
    </div>
  )
}
