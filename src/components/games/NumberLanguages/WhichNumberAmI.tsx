import React, { useContext, useState } from "react";
import "./NumberLanguages.css";
import { Banner } from "../../global/Banner/Banner";
import { PageHeader } from "../../shared/PageHeader/PageHeader";
import { FACES, FaceFeedback } from "../../shared/FaceFeedback/FaceFeedback";
import { ObjectsUtil } from "../../../utils/ObjectsUtil";
import { FEEDBACK_FACE_SIZE, FONT_SIZE } from "../../../utils/ConstantsUtil";
import { DeviceUtil } from "../../../utils/DeviceUtil";
import GamesContext, { GamesContextType } from "../../../context/GamesContext";
import { SingleSelectionDialog } from "../../shared/SingleSelectionDialog/SingleSelectionDialog";
import { MediaUtil } from "../../../utils/MediaUtil";
import { PlayListNames } from "../../../assets/playLists";

export const enum NUMBERS_SCOPE {
  UNITS = 0,
  TENS = 1,
  HUNDREDS = 2
}

export interface WhichNumberAmIProps {
  scope: NUMBERS_SCOPE;
}

export const WhichNumberAmI = (props: WhichNumberAmIProps) => {
  const { 
    audioOn, 
    isTablet
  } = useContext(GamesContext) as GamesContextType;
  
  const playerHooray:HTMLAudioElement = MediaUtil.pickPlayer(PlayListNames.SHORT_HOORAY);

  const barSize: Array<number> = [
    20, 60, 180
  ];

  const spaceSize = 10;

  const [scope, setScope] = useState<NUMBERS_SCOPE>(props.scope ? props.scope : NUMBERS_SCOPE.UNITS);
  const [number, setNumber] = useState<number>(newNumber(scope));
  const numberAsString = number.toString();
  const numberLength = numberAsString.length;
  
  let numberDigits = [      // [unites, tens, hundreds]
    Number(numberAsString.substring(numberLength-1)), 
    scope > NUMBERS_SCOPE.UNITS ? Number(numberAsString.substring(numberLength-2, numberLength-1)) : 0,
    scope > NUMBERS_SCOPE.TENS ? Number(numberAsString.substring(numberLength-3, numberLength-2)) : 0
  ];

  const unitIdTargetPrefix = "unitTarget_";
  const tenIdTargetPrefix = "tenTarget_";
  const hundredIdTargetPrefix = "hundredTarget_";

  const [numberFeedbackFace, setNumberFeedbackFace] = useState<FACES>(FACES.NONE);
  const [gameSettingsDisplay, setGameSettingsDisplay] = useState<string>("game-settings-global-hide");
    
  function newNumber(currentScope: number): number {
    let number = ObjectsUtil.generateRandomNumbers(1,(10**(currentScope+1))-1,1)[0];
    return number;
  }
  
  function validateNumber(value: number) {
    if (value === number) {
      MediaUtil.player(playerHooray, audioOn);
      setNumberFeedbackFace(FACES.HAPPY);
    }
    else {
      setNumberFeedbackFace(FACES.WORRY);
    }
  }

  function updateNumber(currentScope: number) {
    setNumberFeedbackFace(FACES.NONE);

    for (let serialNo=0; serialNo < 9; serialNo++) {
      let e = document.getElementById(unitIdTargetPrefix + serialNo);
      if (e !== null) {
        e.style.visibility = (serialNo < numberDigits[0]) ? "visible" : "hidden"
      }

      if (currentScope > NUMBERS_SCOPE.UNITS) {
        e = document.getElementById(tenIdTargetPrefix + serialNo);
        if (e !== null) {
          e.style.visibility = (serialNo < numberDigits[1]) ? "visible" : "hidden"
        }
      }

      if (currentScope > NUMBERS_SCOPE.TENS) {
        e = document.getElementById(hundredIdTargetPrefix + serialNo);
        if (e !== null) {
          e.style.visibility = (serialNo < numberDigits[2]) ? "visible" : "hidden"
        }
      }
    }

    let updatedNumber = newNumber(currentScope);
    while (updatedNumber === number) {
      updatedNumber = newNumber(currentScope);
    }

    let inputField: HTMLInputElement = document.getElementById("whichNumberInputBox")! as HTMLInputElement;
    inputField.value = "";
    inputField.focus();

    setNumber(updatedNumber);
  }

  const titleTemplate = "הַקְלֵד אֶת הַמִּסְפָּר שֶׁמַּתְאִים לַמִּסְפָּר עִם  $value$";

  let value = "";
  if (scope > NUMBERS_SCOPE.TENS) {
    value += `${numberDigits[2]} מֵאוֹת, `;
  }

  if (scope > NUMBERS_SCOPE.UNITS) {
    value += `${numberDigits[1]} עֲשָׂרוֹת וְ-`;
  }

  value += `${numberDigits[0]}  יְחִידוֹת`;

  const title = ObjectsUtil.getTitle(titleTemplate, value);

  function handleSettingsCancel() {
    setGameSettingsDisplay(()=>"game-settings-global-hide"); 
  }

  function handleSettingsDone(scopeOptionIndex: number) {
    setGameSettingsDisplay(()=>"game-settings-global-hide");
    setScope(() => scopeOptionIndex);
    updateNumber(scopeOptionIndex);
  }

  return(
    <div className="app-page">
      <Banner gameId="numberLanguagesShow"
        settings={() => setGameSettingsDisplay("game-settings-global-show")} 
      />
      
      <div className={`app-title-centered ${DeviceUtil.getFontSize(isTablet, FONT_SIZE.XL)}`}>
        <button className="app-button-widget number-languages-newNumber-button"
          onClick={() => updateNumber(scope)}>
            מִסְפָּר חָדָשׁ
        </button>

        <PageHeader title={title} feedbackFace={ FACES.NONE } />
      </div>

      <input className="which-number-number-input"id="whichNumberInputBox"
        onInput={(e: React.ChangeEvent<HTMLInputElement>) => e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1')}
        onChange={(e) => validateNumber(Number(e.target.value))}/>
      <FaceFeedback face={numberFeedbackFace} 
        size={FEEDBACK_FACE_SIZE.L}></FaceFeedback>
      <div style={{display: "flex", flexDirection: "row"}}>
        <div style={{display: "flex"}}>
          {number &&
            <table className="number-languages-table"><tbody>
              <tr>
                <td className="number-languages-unit-header">
                  <span className="number-languages-unit-title">
                    {numberDigits[0]} יְחִידוֹת
                  </span>                 
                </td>
                {
                  scope > NUMBERS_SCOPE.UNITS &&
                    <td className="number-languages-unit-header">
                      <span className="number-languages-unit-title">
                        {numberDigits[1]} עֲשָׂרוֹת
                      </span>
                    </td>
                }
                {
                  scope > NUMBERS_SCOPE.TENS &&
                    <td className="number-languages-unit-header">
                      <span className="number-languages-unit-title">
                        {numberDigits[2]} מֵאוֹת
                      </span>
                    </td>
                }
              </tr>
              <tr>
                <td style={{ border:"1px solid #FFFFFF" }}>
                  <svg height={(barSize[0] + spaceSize)*9} width={9 * (barSize[0]+spaceSize) + spaceSize}>
                    <g transform={"translate(" + spaceSize + " " + spaceSize + ")"}>
                      { [...Array(9)].map((val,i) => 
                        <rect id={unitIdTargetPrefix + i} key={i} 
                          className="which-number-item" width={barSize[0]} height={barSize[0]} 
                          x={i * (barSize[0]+spaceSize)} y={0} 
                          style={i < numberDigits[0] ? {visibility: "visible" }: {visibility: "hidden" }} />
                      )}
                    </g>
                  </svg>
                </td>
                <td style={{ border:"1px solid #FFFFFF" }}>
                { scope > NUMBERS_SCOPE.UNITS &&
                  <svg height={(barSize[0] + spaceSize)*9} width={barSize[1] + 2*spaceSize}>
                    <g transform={"translate(" + spaceSize + " " + spaceSize + ")"}>
                      { [...Array(9)].map((val,i) => 
                        <rect id={tenIdTargetPrefix + i} key={i} className="which-number-item" 
                          width={barSize[1]} height={barSize[0]} 
                          x={0} y={i * (barSize[0]+spaceSize)}
                          style={scope > NUMBERS_SCOPE.UNITS && i < numberDigits[1] ? 
                            {visibility: "visible" }: {visibility: "hidden" }} />
                      )}
                    </g>
                  </svg>
                }
                </td>
                <td style={{ border:"1px solid #FFFFFF" }}>
                { scope > NUMBERS_SCOPE.TENS &&
                  <svg height={(barSize[0] + spaceSize)*9} width={barSize[2] + 2*spaceSize}>
                    <g transform={"translate(" + spaceSize + " " + spaceSize + ")"}>
                      { [...Array(9)].map((val,i) => 
                        <rect id={hundredIdTargetPrefix + i} key={i} className="which-number-item" 
                          width={barSize[2]} height={barSize[0]} 
                          x={0} y={i * (barSize[0]+spaceSize)}
                          style={scope > NUMBERS_SCOPE.TENS && i < numberDigits[2] ? 
                            {visibility: "visible" }: {visibility: "hidden" }} />
                      )}
                    </g>
                  </svg>
                }
                </td>
              </tr>
            </tbody></table>
          }
        </div>
      </div>

      <SingleSelectionDialog
        className={ gameSettingsDisplay }
        title={"סמן את תחום המספרים הרצוי"}
        options={[
          "יחידות",
          "עשרות",
          "מאות"
        ]}
        defaultOptionIndex={1}
        handleDialogDone={handleSettingsDone}
        handleDialogCancel={handleSettingsCancel}
      />      

    </div>
  )
}