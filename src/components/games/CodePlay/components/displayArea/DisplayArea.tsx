import { useContext, useState } from "react";
import KDContext, { KDContextType } from "../../model/KDContext";
import { DISPLAY_LEVEL } from "../../constants/displayLevelConstants";
import { KD_APP_STRINGS } from "../../constants/appStrings";
import { KDPencil, 
  DEFAULT_PENCIL_PEN_DELTA_X, DEFAULT_PENCIL_PEN_DELTA_Y, 
  DEFAULT_PENCIL, 
  PENCIL_IMAGE, PENCIL_IMAGE_MAX_DIMENSION } from "../../model/KDPencil";
import { DISPLAY_AREA_HEIGHT, DISPLAY_AREA_WIDTH } from "../../constants/displayConstants";
import "./displayArea.css";

export interface DisplayAreaProps {
}

export const DisplayArea = (props: DisplayAreaProps) => {
  const {
    displayLevel,
  } = useContext(KDContext) as KDContextType;

  const [pencil, setPencil] = useState<KDPencil>(DEFAULT_PENCIL);

  const defineNextPosition = () => {
    const newPosition = getRandomPosition();
    setPencil({
      x: newPosition[0] - DEFAULT_PENCIL_PEN_DELTA_X,
      y: newPosition[1] - DEFAULT_PENCIL_PEN_DELTA_Y,
      penX: newPosition[0],
      penY: newPosition[1],
      stroke: DEFAULT_PENCIL.stroke,
      angle: 0,
      rotate: 0
    })
  }

  const getRandomPosition = (): [number,number] => {
    const d: number = PENCIL_IMAGE_MAX_DIMENSION;

    let x: number = Math.floor(Math.random() * DISPLAY_AREA_WIDTH);
    x = Math.min(DISPLAY_AREA_WIDTH - d, Math.max(d, x));
    let y: number = Math.floor(Math.random() * DISPLAY_AREA_HEIGHT);
    y = Math.min(DISPLAY_AREA_HEIGHT - d, Math.max(d, y));

    let nextPosition: [number,number] = [x,y];
    if (nextPosition[0] === pencil.x && nextPosition[0] === pencil.y) {
      nextPosition = [x+10, y-5];
    }
    return nextPosition;
  }

  return(
    <div className="kd-display-area">
      <div>
        <div>
          { displayLevel === DISPLAY_LEVEL.PENCIL_ONLY &&
            <div>
              <div>{ KD_APP_STRINGS.MOUSE_CLICK }</div>
              <div>
                { KD_APP_STRINGS.NEXT_STEP }
              </div>
            </div>
          }
        </div>
        <div className="kd-display-area-drawing-area">
          <svg width={DISPLAY_AREA_WIDTH} height={DISPLAY_AREA_HEIGHT}
            viewBox={`0 0 ${DISPLAY_AREA_WIDTH} ${DISPLAY_AREA_HEIGHT}`}>
            <image id="pencil" href={PENCIL_IMAGE} x={pencil.x} y={pencil.y}
              onClick={() => displayLevel === DISPLAY_LEVEL.PENCIL_ONLY && 
                defineNextPosition()}></image>
          </svg>
        </div>
      </div>
      <div className="kd-display-area-attribute">
        <a href="https://www.freepik.com/free-vector/cute-koala-hanging-pencil-with-bag-cartoon-vector-icon-illustration-animal-education-isolated_39515607.htm#fromView=search&page=1&position=14&uuid=8be2567d-0f34-4a9b-87e1-4a4792bedcd6">Image by catalyststuff on Freepik</a>
      </div>
    </div>
  )
}
