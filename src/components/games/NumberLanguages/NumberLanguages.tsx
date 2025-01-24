import React, { useContext, useRef, useState } from "react";
import "./NumberLanguages.css";
import { Banner } from "../../global/Banner/Banner";
import { PageHeader } from "../../shared/PageHeader/PageHeader";
import { FACES, FaceFeedback } from "../../shared/FaceFeedback/FaceFeedback";
import { ObjectsUtil } from "../../../utils/ObjectsUtil";
import { FEEDBACK_FACE_SIZE, FONT_SIZE } from "../../../utils/ConstantsUtil";
import { DeviceUtil } from "../../../utils/DeviceUtil";
import GamesContext, { GamesContextType } from "../../../context/GamesContext";

export const enum NUMBERS_SCOPE {
  UNITS = 0,
  TENS = 1,
  HUNDREDS = 2
}

export interface NumberLanguagesProps {
  scope: NUMBERS_SCOPE;
}

export const NumberLanguages = (props: NumberLanguagesProps) => {
  const [scope, setScope] = useState<NUMBERS_SCOPE>(props.scope ? props.scope : NUMBERS_SCOPE.UNITS);

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

  const [number, setNumber] = useState<number>(newNumber());
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

  const {
    isTablet,
  } = useContext(GamesContext) as GamesContextType;

  function newNumber(): number {
    let number = ObjectsUtil.generateRandomNumbers(1,(10**(scope+1))-1,1)[0];
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

  function ValidateState(targetArray: Array<number>, digit: number, idPrefix: string) {
    const targetSize = getNumberOfTargetElements(targetArray);
    if (targetSize === numberDigits[digit]) {
      if (idPrefix === unitId) {
        setUnitFeedbackFace(FACES.HAPPY);
      }
      if (idPrefix === tenId) {
        setTenFeedbackFace(FACES.HAPPY);
      }
      else {
        setHundredFeedbackFace(FACES.HAPPY);
      }
    }
    else if (targetSize > numberDigits[digit]) {
      if (idPrefix === unitId) {
        setUnitFeedbackFace(FACES.WORRY);
      }
      else if (idPrefix === tenId) {
        setTenFeedbackFace(FACES.WORRY);
      }
      else {
        setHundredFeedbackFace(FACES.WORRY);
      }
    }
    else {
      if (idPrefix === unitId) {
        setUnitFeedbackFace(FACES.NONE);
      }
      if (idPrefix === tenId) {
        setTenFeedbackFace(FACES.NONE);
      }
      else {
        setHundredFeedbackFace(FACES.NONE);
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
      numberAsString += hundredName[numberDigits[2]-1];
    }

    if (numberDigits[0] === 0 && numberDigits[1] === 1) {
      numberAsString += tenName[numberDigits[1]-1];
    }
    else if (numberDigits[1] === 1) {
      numberAsString += firstTenName[numberDigits[0]-1]
    }
    else {
      if (numberDigits[0] === 0) {
        numberAsString += tenName[numberDigits[1]-1]
      }
      else {
        let andIndex:number = 0;
        if (numberDigits[0] === 2 || numberDigits[0] === 8) {
          andIndex = 1;
        }
        numberAsString += tenName[numberDigits[1]-1] + " " + and[andIndex] + unitNames[numberDigits[0]-1];
      }
    }
    return numberAsString;
  }

  function updateNumber() {
    for (let serialNo=0; serialNo < 9; serialNo++) {
      document.getElementById(unitIdBankPrefix + serialNo)!.style.visibility = "visible";
      document.getElementById(unitIdTargetPrefix + serialNo)!.style.visibility = "hidden";
      if (scope > NUMBERS_SCOPE.UNITS) {
        document.getElementById(tenIdBankPrefix + serialNo)!.style.visibility = "visible";
        document.getElementById(tenIdTargetPrefix + serialNo)!.style.visibility = "hidden";
      }
      if (scope > NUMBERS_SCOPE.TENS) {
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
  
    let updatedNumber = newNumber();
    while (updatedNumber === number) {
      updatedNumber = newNumber();
    }

    let numberAsString: string = updatedNumber.toString();
    let numberLength: number = numberAsString.length;
    setNumber(updatedNumber);

    const numberDigits = [      // [unites, tens, hundreds]
      Number(numberAsString.substring(numberLength-1)), 
      scope > NUMBERS_SCOPE.UNITS ? Number(numberAsString.substring(numberLength-2, numberLength-1)) : 0,
      scope > NUMBERS_SCOPE.TENS ? Number(numberAsString.substring(numberLength-3, numberLength-2)) : 0
    ];
  
    setUnitFeedbackFace(numberDigits[0] === 0 ? FACES.HAPPY : FACES.NONE);
    setTenFeedbackFace(numberDigits[1] === 0 ? FACES.HAPPY : FACES.NONE);
    setHundredFeedbackFace(numberDigits[2] === 0 ? FACES.HAPPY : FACES.NONE);
  }

  const titleTemplate = "הַקְלֵק עַל עֲשָׂרוֹת וְעַל יְחִידוֹת שֶׁמַּתְאִימוֹת לַמִּסְפָּר $number$";
  const title = ObjectsUtil.getTitle(titleTemplate, number.toString());

  return(
    <div className="app-page">
      <Banner gameId="numberLanguagesShow"/>
      
      <div className={`app-title-centered ${DeviceUtil.getFontSize(isTablet, FONT_SIZE.XL)}`}>
        <button className="app-button-widget number-languages-newNumber-button"
          onClick={() => updateNumber()}>
            מִסְפָּר חָדָשׁ
        </button>

        <PageHeader title={title} feedbackFace={ FACES.NONE } />
      </div>

      <h1 className="number-title">{ number }</h1>
      <div className="number-sub-title">
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
    </div>
  )
}