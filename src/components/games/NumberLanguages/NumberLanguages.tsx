import React, { useContext, useRef, useState } from "react";
import "./NumberLanguages.css";
import { Banner } from "../../global/Banner/Banner";
import { PageHeader } from "../../shared/PageHeader/PageHeader";
import { FACES, FaceFeedback } from "../../shared/FaceFeedback/FaceFeedback";
import { ObjectsUtil } from "../../../utils/ObjectsUtil";
import { ConstantsUtil, FEEDBACK_FACE_SIZE, FONT_SIZE } from "../../../utils/ConstantsUtil";
import { DeviceUtil } from "../../../utils/DeviceUtil";
import GamesContext, { GamesContextType } from "../../../context/GamesContext";
import { SingleSelectionDialog } from "../../shared/SingleSelectionDialog/SingleSelectionDialog";
import { MediaUtil } from "../../../utils/MediaUtil";
import { PlayListNames } from "../../../assets/playLists";
import { useNavigate } from "react-router-dom";
import { ScoreboardDescriptor } from "../../../model/global.types";
import { showWellDone } from "../../shared/WellDone/WellDone";
import { GeneralUtil } from "../../../utils/GeneralUtil";

export const enum NUMBERS_SCOPE {
  UNITS = 0,
  TENS = 1,
  HUNDREDS = 2
}

export interface NumberLanguagesProps {
  scope: NUMBERS_SCOPE;
}

export const NumberLanguages = (props: NumberLanguagesProps) => {
  const numberOfRounds = 10;

  const navigate = useNavigate();
  
  let initialScores =  {
    scores: 0, 
    totalScores: numberOfRounds,
    image: "resources/icons/smiley.png",
    outlineImage: "resources/icons/smiley-outline.png"
  };
  let [scores, setScores] = useState<ScoreboardDescriptor>(initialScores);

  const [scope, setScope] = useState<NUMBERS_SCOPE>(props.scope ? props.scope : NUMBERS_SCOPE.UNITS);
  const [currentRound, setCurrentRound] = useState<number>(1);

  const barSize: Array<number> = [
    20, 60, 180
  ];

  const spaceSize = 10;
  const largeSpaceSize = 32;
  const numbersBankTop = 60;
  const numbersBankTitleTop = 48;

  let bankWidth = (scope+1) * largeSpaceSize;
  for (let i=0; i <= scope; i++) {
    bankWidth += barSize[i];
  }
  bankWidth = Math.max(bankWidth, 120);

  let bankX = [
    barSize[1] / 2
  ];
  if (scope === NUMBERS_SCOPE.TENS) {
    bankX = [
      barSize[1] + barSize[0] / 2 + largeSpaceSize,
      barSize[1] / 2
    ]
  }
  else if (scope === NUMBERS_SCOPE.HUNDREDS) {
    bankX = [
      barSize[2] + barSize[1] + barSize[0] / 2 + 2 * largeSpaceSize,
      barSize[2] + barSize[0] / 2 + largeSpaceSize,
      barSize[2] / 2
    ]
  }

  const [number, setNumber] = useState<number>(newNumber(scope));
  const numberAsString = number.toString();
  const numberLength = numberAsString.length;
  let numberDigits = [      // [unites, tens, hundreds]
    Number(numberAsString.substring(numberLength-1)), 
    scope > NUMBERS_SCOPE.UNITS ? Number(numberAsString.substring(numberLength-2, numberLength-1)) : 0,
    scope > NUMBERS_SCOPE.TENS ? Number(numberAsString.substring(numberLength-3, numberLength-2)) : 0
  ];

  let unitsBank = useRef<Array<number>>([...Array(9)]);
  let tensBank = useRef<Array<number>>([...Array(9)]);
  let hundredsBank = useRef<Array<number>>([...Array(9)]);
  let unitsTarget = useRef<Array<number>>([...Array(9)]);
  let tensTarget = useRef<Array<number>>([...Array(9)]);
  let hundredsTarget = useRef<Array<number>>([...Array(9)]);

  const unitId: string = "unit";
  const tenId: string = "ten";
  const hundredId: string = "hundred";

  const unitIdBankPrefix = "unitSource_";
  const tenIdBankPrefix = "tenSource_";
  const hundredIdBankPrefix = "hundredSource_";
  const unitIdTargetPrefix = "unitTarget_";
  const tenIdTargetPrefix = "tenTarget_";
  const hundredIdTargetPrefix = "hundredTarget_";

  const [unitTargetCount, setUnitTargerCount] = useState<number>(0);
  const [tenTargetCount, setTenTargerCount] = useState<number>(0);
  const [hundredTargetCount, setHundredTargerCount] = useState<number>(0);

  const [unitFeedbackFace, setUnitFeedbackFace] = 
    useState<FACES>(numberDigits[0] === 0 ? FACES.HAPPY : FACES.NONE);
  const [tenFeedbackFace, setTenFeedbackFace] = 
    useState<FACES>(numberDigits[1] === 0 ? FACES.HAPPY : FACES.NONE);
  const [hundredFeedbackFace, setHundredFeedbackFace] = 
    useState<FACES>(numberDigits[1] === 0 ? FACES.HAPPY : FACES.NONE);

  // Indicates correct user response per digit: [unites, tens, hundreds]
  let progress = useRef<Array<boolean>>([
      numberDigits[0] === 0 ? true : false,
      numberDigits[1] === 0 ? true : false,
      numberDigits[2] === 0 ? true : false
    // false, 
    // scope > NUMBERS_SCOPE.UNITS ? false : true,
    // scope > NUMBERS_SCOPE.TENS ? false : true
  ]);

  const [gameSettingsDisplay, setGameSettingsDisplay] = useState<string>("game-settings-global-hide");
    
  const { 
    audioOn, 
    isTablet
  } = useContext(GamesContext) as GamesContextType;
  
  const playerHooray:HTMLAudioElement = MediaUtil.pickPlayer(PlayListNames.SHORT_HOORAY);
  const playerOuch:HTMLAudioElement = MediaUtil.pickPlayer(PlayListNames.OUCH);

  function newNumber(currentScope: number): number {
    let number = ObjectsUtil.generateRandomNumbers(1,(10**(currentScope+1))-1,1)[0];
    return number;
  }
  
  function getEmptySlotIndex(targetArray: Array<number>): number {
    for (let i=0; i < targetArray.length; i++) {
      if (targetArray[i] !== -1) {
        return i;
      }
    }
    return -1;
  }

  function add(
    serialNo: number, 
    sourceArray: Array<number>, 
    sourcePrefix: string, 
    targetArray: Array<number>, 
    targetPrefix: string, 
    digit: number, 
    feedbackIdPrefix: string) {
    document.getElementById(sourcePrefix + serialNo)!.style.visibility = "hidden";
    sourceArray[serialNo] = -1;
    const targetIndex = getEmptySlotIndex(targetArray);
    document.getElementById(targetPrefix + targetIndex)!.style.visibility = "visible";
    targetArray[targetIndex] = -1;

    if (feedbackIdPrefix === unitId) {
      setUnitTargerCount(() => unitTargetCount + 1);
    }
    else if (feedbackIdPrefix === tenId) {
      setTenTargerCount(() => tenTargetCount + 1);
    }
    else {
      setHundredTargerCount(() => hundredTargetCount + 1);
    }

    ValidateState(targetArray, digit, feedbackIdPrefix)
  }

  function remove(
    serialNo: number, 
    sourceArray: Array<number>, 
    sourcePrefix: string, 
    targetArray: Array<number>, 
    targetPrefix: string, 
    digit: number, 
    feedbackIdPrefix: string) {
    targetArray[serialNo] = serialNo;
    if (feedbackIdPrefix === unitId) {
      setUnitTargerCount(() => unitTargetCount - 1);
    }
    else if (feedbackIdPrefix === tenId) {
      setTenTargerCount(() => tenTargetCount - 1);
    }
    else {
      setHundredTargerCount(() => hundredTargetCount - 1);
    }

    document.getElementById(targetPrefix + serialNo)!.style.visibility = "hidden";
    for (let i=0; i < sourceArray.length; i++) {
      if (sourceArray[i] === -1) {
        sourceArray[i] = i;
        document.getElementById(sourcePrefix + i)!.style.visibility = "visible";
        break;
      }
    }
    ValidateState(targetArray, digit, feedbackIdPrefix)
  }

  function getNumberOfTargetElements(targetArray: Array<number>): number {
    let sum = 0;
    for (let i=0; i < targetArray.length; i++) {
      if (targetArray[i] === -1) {
        sum++;
      }
    }
    return sum;
  }

  function setFeedbackFace(idPrefix: string, face: FACES) {
    if (idPrefix === unitId) {
      setUnitFeedbackFace(face);
    }
    else if (idPrefix === tenId) {
      setTenFeedbackFace(face);
    }
    else {
      setHundredFeedbackFace(face);
    }
  }

  function ValidateState(targetArray: Array<number>, digit: number, idPrefix: string) {
    const targetSize = getNumberOfTargetElements(targetArray);
    const progressIndex = (idPrefix === unitId ? 0 : (idPrefix === tenId ? 1 : 2));
    if (targetSize === numberDigits[digit]) {
      MediaUtil.player(playerHooray, audioOn);
      progress.current[progressIndex] = true;
      setFeedbackFace(idPrefix, FACES.HAPPY);
    }
    else if (targetSize > numberDigits[digit]) {
      MediaUtil.player(playerOuch, audioOn);
      progress.current[progressIndex] = false;
      setFeedbackFace(idPrefix, FACES.WORRY);
    }
    else {
      setFeedbackFace(idPrefix, FACES.NONE);
    }

    if (progress.current.indexOf(false) === -1) {   // All true
      scores.scores++;
      setScores({...scores});

      progress.current = [
        false, 
        scope > NUMBERS_SCOPE.UNITS ? false : true,
        scope > NUMBERS_SCOPE.TENS ? false : true
      ];
    
      if (currentRound < numberOfRounds) {
        MediaUtil.player(playerHooray, audioOn);
        setFeedbackFace(idPrefix, FACES.HAPPY);
        setTimeout(()=> {
          setCurrentRound(currentRound+1);
          updateNumber(scope);
        }, ConstantsUtil.hoorayTimeout);        
      }
      else {
        setFeedbackFace(idPrefix, FACES.NONE);
        showWellDone(audioOn);
        setTimeout(()=> {
          navigate(GeneralUtil.targetNavigationOnGameOver());
        }, ConstantsUtil.shortPauseTimeout);
      }
    }
  }

  function getNumberName(numberDigits: Array<number>): string {
    const unitNames: Array<string> = 
      ["אַחַת", "שְׁתַּיִם", "שָׁלוֹשׁ", "אַרְבַּע", "חָמֵשׁ", "שֵׁשׁ", "שֶׁבַע", "שְׁמֹנֶה", "תֵּשַׁע"];
    const firstTenName: Array<string> =
      ["אַחַת עֶשְׂרֵה", "שְׁתֵּים עֶשְׂרֵה", "שְׁלוֹשׁ עֶשְׂרֵה", "אַרְבַּע עֶשְׂרֵה", "חֲמֵשׁ עֶשְׂרֵה", "שֵׁשׁ עֶשְׂרֵה", "שְׁבַע עֶשְׂרֵה", "שְׁמוֹנֶה עֶשְׂרֵה", "תְּשַׁע עֶשְׂרֵה"];
    const tenName: Array<string> =
      ["עֶשֶׂר", "עֶשְׂרִים", "שְׁלוֹשִׁים", "אַרְבָּעִים", "חֲמִשִּׁים", "שִׁשִּׁים", "שִׁבְעִים", "שְׁמוֹנִים", "תִּשְׁעִים"];
    const and: Array<string> = ["וְ", "וּ"];
    const hundredName: Array<string> = ["מֵאָה", "מָאתַיִים", "שְׁלוֹשׁ מֵאוֹת", "אַרְבַּע מֵאוֹת", "חָמֵשׁ מֵאוֹת", "שֵׁשׁ מֵאוֹת", "שְׁבַע מֵאוֹת", "שְׁמוֹנֶה מֵאוֹת", "תְּשַׁע מֵאוֹת"];

    if (numberDigits[2] === 0 && numberDigits[1] === 0 && numberDigits[0] > 0) {
      return unitNames[numberDigits[0]-1];
    }    

    let numberAsString: string = "";

    if (numberDigits[2] > 0) {
      numberAsString += `${hundredName[numberDigits[2]-1]} `;
    }

    const tenNameAsString = tenName[numberDigits[1]-1] === undefined ?
      "" :
      tenName[numberDigits[1]-1];

    if (numberDigits[0] === 0 && numberDigits[1] === 1) {
      numberAsString += tenNameAsString;
    }
    else if (numberDigits[1] === 1) {
      numberAsString += firstTenName[numberDigits[0]-1]
    }
    else {
      if (numberDigits[0] === 0) {
        numberAsString += " " + tenNameAsString;
      }
      else {
        let andIndex:number = 0;
        if (numberDigits[0] === 2 || numberDigits[0] === 8) {
          andIndex = 1;
        }
        numberAsString += " " + tenNameAsString + " " + and[andIndex] + unitNames[numberDigits[0]-1];
      }
    }
    return numberAsString;
  }

  function updateNumber(currentScope: number) {
    for (let serialNo=0; serialNo < 9; serialNo++) {
      document.getElementById(unitIdBankPrefix + serialNo)!.style.visibility = "visible";
      document.getElementById(unitIdTargetPrefix + serialNo)!.style.visibility = "hidden";
      if (currentScope > NUMBERS_SCOPE.UNITS &&
        document.getElementById(tenIdBankPrefix + serialNo) !== null &&
        document.getElementById(tenIdTargetPrefix + serialNo) !== null
      ) {
        document.getElementById(tenIdBankPrefix + serialNo)!.style.visibility = "visible";
        document.getElementById(tenIdTargetPrefix + serialNo)!.style.visibility = "hidden";
      }
      if (currentScope > NUMBERS_SCOPE.TENS && 
        document.getElementById(hundredIdBankPrefix + serialNo) !== null &&
        document.getElementById(hundredIdTargetPrefix + serialNo) !== null
      ) {
        document.getElementById(hundredIdBankPrefix + serialNo)!.style.visibility = "visible";
        document.getElementById(hundredIdTargetPrefix + serialNo)!.style.visibility = "hidden";
      }
    }

    unitsBank.current = [...Array(9)];
    tensBank.current = [...Array(9)];
    hundredsBank.current = [...Array(9)];
    unitsTarget.current = [...Array(9)];
    tensTarget.current = [...Array(9)];
    hundredsTarget.current = [...Array(9)];
  
    setUnitTargerCount(0);
    setTenTargerCount(0);
    setHundredTargerCount(0);
  
    let updatedNumber = newNumber(currentScope);
    while (updatedNumber === number) {
      updatedNumber = newNumber(currentScope);
    }

    let numberAsString: string = updatedNumber.toString();
    let numberLength: number = numberAsString.length;
    setNumber(updatedNumber);

    const numberDigits = [      // [unites, tens, hundreds]
      Number(numberAsString.substring(numberLength-1)), 
      currentScope > NUMBERS_SCOPE.UNITS ? Number(numberAsString.substring(numberLength-2, numberLength-1)) : 0,
      currentScope > NUMBERS_SCOPE.TENS ? Number(numberAsString.substring(numberLength-3, numberLength-2)) : 0
    ];
      
    progress.current = [
      numberDigits[0] === 0 ? true : false,
      numberDigits[1] === 0 ? true : false,
      numberDigits[2] === 0 ? true : false
    ]
  
    setUnitFeedbackFace(numberDigits[0] === 0 ? FACES.HAPPY : FACES.NONE);
    setTenFeedbackFace(numberDigits[1] === 0 ? FACES.HAPPY : FACES.NONE);
    setHundredFeedbackFace(numberDigits[2] === 0 ? FACES.HAPPY : FACES.NONE);
}

  const titleTemplate = "הַקְלֵק עַל עֲשָׂרוֹת וְעַל יְחִידוֹת שֶׁמַּתְאִימוֹת לַמִּסְפָּר $number$";
  const title = ObjectsUtil.getTitle(titleTemplate, number.toString());

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
        scoreboard={scores}
        settings={() => setGameSettingsDisplay("game-settings-global-show")} 
      />
      
      <div className={`app-title-centered ${DeviceUtil.getFontSize(isTablet, FONT_SIZE.XL)}`}>
        <PageHeader title={title} feedbackFace={ FACES.NONE } />
      </div>

      <h1 className="number-title">{ number }</h1>
      <div className="number-sub-title">
        { scope > NUMBERS_SCOPE.TENS &&
          <span> 
            {`${numberDigits[2]} מֵאוֹת, `}
          </span>
        }
        { scope > NUMBERS_SCOPE.UNITS &&
          <span> 
            {numberDigits[1]} עֲשָׂרוֹת וְ-  
          </span>
        }
        <span>
          {numberDigits[0]}  יְחִידוֹת  -  { getNumberName(numberDigits) }
        </span>
      </div>
      <div style={{display: "flex", flexDirection: "row"}}>
        { number &&
          <div style={{display: "flex"}}>
            <svg width={bankWidth} height={11 * (barSize[0]+spaceSize) + largeSpaceSize}>
              <text x={bankWidth / 2} y="20" fontSize={20} textAnchor="middle">בַּנְק מִסְפָּרִים</text>
              <text x={bankX[0]} y={numbersBankTitleTop} textAnchor="middle"
                fontSize={20}>יְחִידוֹת</text>
              { [...Array(9)].map((val,i) => 
                <rect id={unitIdBankPrefix + i} key={i} 
                  className="number-languages-item-bank" width={barSize[0]} height={barSize[0]} 
                  x={bankX[0] - (barSize[0]/2)} y={numbersBankTop + i * (barSize[0]+spaceSize)} 
                  onClick={ () => add(i, unitsBank.current, unitIdBankPrefix, unitsTarget.current, 
                    unitIdTargetPrefix, NUMBERS_SCOPE.UNITS, unitId) } 
                  style={{visibility: "visible" }} />
              )}
            {
              scope > NUMBERS_SCOPE.UNITS &&
              <g>
                <text x={bankX[1]} y={numbersBankTitleTop} fontSize={20}
                  textAnchor="middle">עֲשָׂרוֹת</text>
                <g>
                  { [...Array(9)].map((val,i) => 
                  <rect id={tenIdBankPrefix + i} key={i} 
                    className="number-languages-item-bank" width={barSize[1]} height={barSize[0]} 
                    x={bankX[1] - (barSize[1]/2)} y={numbersBankTop + i * (barSize[0]+spaceSize)}
                    onClick={ () => add(i, tensBank.current, tenIdBankPrefix, tensTarget.current, 
                      tenIdTargetPrefix, NUMBERS_SCOPE.TENS, tenId) }
                    style={{visibility: "visible" }} />
                  )}
                </g>
              </g>
            }
            {
              scope > NUMBERS_SCOPE.TENS &&
              <g>
                <text x={bankX[2]} y={numbersBankTitleTop} fontSize={20}
                  textAnchor="middle">מֵאוֹת</text>
                <g>
                  { [...Array(9)].map((val,i) => 
                  <rect id={hundredIdBankPrefix + i} key={i} 
                    className="number-languages-item-bank" width={barSize[2]} height={barSize[0]} 
                    x={bankX[2] - (barSize[2]/2)} y={numbersBankTop + i * (barSize[0]+spaceSize)}
                    onClick={ () => add(i, hundredsBank.current, hundredIdBankPrefix, hundredsTarget.current, 
                      hundredIdTargetPrefix, NUMBERS_SCOPE.HUNDREDS, hundredId) }
                    style={{visibility: "visible" }} />
                  )}
                </g>
              </g>
            }
            </svg>
          </div>
        }

        <div style={{display: "flex"}}>
          {number &&
            <table className="number-languages-table"><tbody>
              <tr>
                <td className="number-languages-unit-header">
                  <span className="number-languages-unit-title">
                    {unitTargetCount} יְחִידוֹת
                  </span>                 
                  <FaceFeedback face={unitFeedbackFace} size={FEEDBACK_FACE_SIZE.M}></FaceFeedback>
                </td>
                {
                  scope > NUMBERS_SCOPE.UNITS &&
                    <td className="number-languages-unit-header">
                      <span className="number-languages-unit-title">
                        {tenTargetCount} עֲשָׂרוֹת
                      </span>
                      <FaceFeedback face={tenFeedbackFace} size={FEEDBACK_FACE_SIZE.M}></FaceFeedback>
                    </td>
                }
                {
                  scope > NUMBERS_SCOPE.TENS &&
                    <td className="number-languages-unit-header">
                      <span className="number-languages-unit-title">
                        {hundredTargetCount} מֵאוֹת
                      </span>
                      <FaceFeedback face={hundredFeedbackFace} size={FEEDBACK_FACE_SIZE.M}></FaceFeedback>
                    </td>
                }
              </tr>
              <tr>
                <td style={{ border:"1px solid #FFFFFF" }}>
                  <svg height={(barSize[0] + spaceSize)*9} width={9 * (barSize[0]+spaceSize) + spaceSize}>
                    <g transform={"translate(" + spaceSize + " " + spaceSize + ")"}>
                      { [...Array(9)].map((val,i) => 
                        <rect id={unitIdTargetPrefix + i} key={i} 
                          className="number-languages-item" width={barSize[0]} height={barSize[0]} 
                          x={i * (barSize[0]+spaceSize)} y={0} 
                          onClick={ () => remove(i, unitsBank.current, unitIdBankPrefix, unitsTarget.current, 
                            unitIdTargetPrefix, NUMBERS_SCOPE.UNITS, unitId) } 
                          style={{visibility: "hidden" }} />
                      )}
                    </g>
                  </svg>
                </td>
                <td style={{ border:"1px solid #FFFFFF" }}>
                { scope > NUMBERS_SCOPE.UNITS &&
                  <svg height={(barSize[0] + spaceSize)*9} width={barSize[1] + 2*spaceSize}>
                    <g transform={"translate(" + spaceSize + " " + spaceSize + ")"}>
                      { [...Array(9)].map((val,i) => 
                        <rect id={tenIdTargetPrefix + i} key={i} className="number-languages-item" 
                          width={barSize[1]} height={barSize[0]} 
                          x={0} y={i * (barSize[0]+spaceSize)}
                          onClick={ () => remove(i, tensBank.current, tenIdBankPrefix, tensTarget.current, 
                            tenIdTargetPrefix, NUMBERS_SCOPE.TENS, tenId) }
                          style={{visibility: "hidden" }} />
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
                        <rect id={hundredIdTargetPrefix + i} key={i} className="number-languages-item" 
                          width={barSize[2]} height={barSize[0]} 
                          x={0} y={i * (barSize[0]+spaceSize)}
                          onClick={ () => remove(i, hundredsBank.current, hundredIdBankPrefix, hundredsTarget.current, 
                            hundredIdTargetPrefix, NUMBERS_SCOPE.HUNDREDS, hundredId) }
                          style={{visibility: "hidden" }} />
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