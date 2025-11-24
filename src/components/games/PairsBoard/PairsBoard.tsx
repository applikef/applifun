import { useContext, useRef, useState } from "react";
import { PairsBoardDescriptorType } from "../../../model/componentDescriptors.types";
import GamesContext, { GamesContextType } from "../../../context/GamesContext";
import { MediaUtil } from "../../../utils/MediaUtil";
import { PlayListNames } from "../../../assets/playLists";
import { useNavigate } from "react-router-dom";
import { Banner } from "../../global/Banner/Banner";
import { DeviceUtil } from "../../../utils/DeviceUtil";
import { ConstantsUtil, FONT_SIZE } from "../../../utils/ConstantsUtil";
import { PageHeader } from "../../shared/PageHeader/PageHeader";
import { FACES } from "../../shared/FaceFeedback/FaceFeedback";
import { PairsBoardObject } from "../PairsBoard/PairsBoardObject";

import "./PairsBoard.css";
import { ObjectsUtil } from "../../../utils/ObjectsUtil";
import { showWellDone } from "../../shared/WellDone/WellDone";
import { GeneralUtil } from "../../../utils/GeneralUtil";
import { PairsBoardSettings } from "./PairsBoardSettings";

export interface PairsBoardSelectionType {
  count: number;
  firstSelectionId: string | undefined;
  firstSelectionValue: number | undefined
}

export interface PairsBoardPropsType {
  gameDescriptor: PairsBoardDescriptorType;
}

export const PairsBoard = (props: PairsBoardPropsType) => {
  const { 
    audioOn,
    isTablet 
  } = useContext(GamesContext) as GamesContextType;

  const playerHooray:HTMLAudioElement = MediaUtil.pickPlayer(PlayListNames.SHORT_HOORAY);
  const playerOuch:HTMLAudioElement = MediaUtil.pickPlayer(PlayListNames.OUCH);

  const navigate = useNavigate();

  /***
   * Retrieve game descriptor values to local variables
   */
  const descriptor: PairsBoardDescriptorType = props.gameDescriptor;
  const helpFileName = descriptor.helpFile;

  const [gameSettingsDisplay, setGameSettingsDisplay] = useState<string>("game-settings-global-hide");
  const [feedbackFace, setFeedbackFace] = useState<FACES>(FACES.NONE);
  let boardObject = useRef<PairsBoardObject>(new PairsBoardObject(descriptor.boardSize, descriptor.goal, "+"));
  const [board, setBoard] = 
    useState<Array<Array<number>>>(boardObject.current.getBoard())
  const [selection, setSelection] = useState<PairsBoardSelectionType>({
    count: -1,
    firstSelectionId: undefined,
    firstSelectionValue: undefined
  })

  const colors: Array<string> = 
    ObjectsUtil.getColors(Math.ceil(boardObject.current.boardSize * boardObject.current.boardSize / 2));

  function selectionHandler(value: number, cellId: string) {
    let count: number = selection.count;
    if (selection.firstSelectionId === undefined ) {    // first click
      setFeedbackFace(() => FACES.NONE);
      setSelection({
        ...selection,
        firstSelectionId: cellId,
        firstSelectionValue: value
      });
      document.getElementById(cellId)!.style.backgroundColor = "yellow";
    }
    else {
      if (selection.firstSelectionValue! + value === boardObject.current.goal) {
        count++;
        document.getElementById(selection.firstSelectionId!)!.style.backgroundColor = 
          colors[count];
        document.getElementById(cellId)!.style.backgroundColor = 
          colors[count];
        MediaUtil.player(playerHooray, audioOn);
        setFeedbackFace(() => FACES.HAPPY);
        setSelection({
          count: count,
          firstSelectionId: undefined,
          firstSelectionValue: undefined
        });

        if (count + 1 === boardObject.current.numberOfPairs) {  // Game over successfully. count starts at 0
          showWellDone(audioOn);
          setFeedbackFace(() => FACES.NONE);
          setTimeout(() => {
            navigate(GeneralUtil.targetNavigationOnGameOver());
          }, ConstantsUtil.gameOverPauseTimeout);
        }
      }
      else {
        setFeedbackFace(() => FACES.WORRY);
        MediaUtil.player(playerOuch, audioOn);
        setTimeout(() => {
          setFeedbackFace(() => FACES.NONE);
        }, ConstantsUtil.hoorayTimeout)
      }
    }
  }

  function getTitle() {
    const titleAsArray = descriptor.titleTemplate.split("$");
    if (titleAsArray.length < 2) {
      return "";
    } 
    else {   
      return titleAsArray[0] + boardObject.current.goal;
    }
  }

  function handleSettingsDone(boardSize: number, goal: number) {
    const newBoard = new PairsBoardObject(boardSize, goal, "+");
    boardObject.current = newBoard;
    setBoard(newBoard.getBoard());
    setSelection({
      count: -1,
      firstSelectionId: undefined,
      firstSelectionValue: undefined
    })
    setGameSettingsDisplay("game-settings-global-hide");
  }

  function handleSettingsCancel() {
    setGameSettingsDisplay("game-settings-global-hide");
  }

  return(
    <div className="app-page">
      <Banner gameId={props.gameDescriptor.gameId} 
        helpFile={helpFileName} 
        settings={() => {
          setGameSettingsDisplay("game-settings-global-show")
        }}
      />
      
      <div  className={`app-title-centered ${DeviceUtil.getFontSize(isTablet, FONT_SIZE.XL)}`}>
        <PageHeader title={getTitle()} feedbackFace={ feedbackFace } />
      </div>

      { board !== undefined ?
        <table className="board-style"><tbody>          
          {
            board.map((row, i: number) => 
              <tr key={i}>
                {row.map((col: number, j: number) => 
                  <td className="app-clickable board-cell-style" 
                    key={`board-cell-${i}-${j}-${boardObject.current.boardSize}-${boardObject.current.goal}`} 
                    id={`board-cell-${i}-${j}`}
                    onClick={(e)=>selectionHandler(col, `board-cell-${i}-${j}`)}>
                    { col === -1 ? " " : col }
                  </td>
                )}
              </tr>
            )
          }
        </tbody></table>
      :
        <div>
          Empty board
        </div>
      }

      <PairsBoardSettings
        className={ gameSettingsDisplay }
        goal={boardObject.current.goal}
        boardSize={ boardObject.current.boardSize }
        handleSettingsDone={handleSettingsDone}
        handleSettingsCancel={handleSettingsCancel}
      />
    </div>
  )
}
