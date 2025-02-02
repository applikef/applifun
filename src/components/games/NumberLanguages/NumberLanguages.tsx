import React, { useContext, useRef, useState } from "react";
import "./NumberLanguages.css";
import { Banner } from "../../global/Banner/Banner";
import { PageHeader } from "../../shared/PageHeader/PageHeader";
import { FACES, FaceFeedback } from "../../shared/FaceFeedback/FaceFeedback";
import { ObjectsUtil } from "../../../utils/ObjectsUtil";
import { FEEDBACK_FACE_SIZE, FONT_SIZE } from "../../../utils/ConstantsUtil";
import { DeviceUtil } from "../../../utils/DeviceUtil";
import GamesContext, { GamesContextType } from "../../../context/GamesContext";

export interface NumberLanguagesProps {
  scope: number;
}

export const NumberLanguages = (props: NumberLanguagesProps) => {

  const UNITS = 0;
  const TENS = 1;

  const unitSize = 20;
  const tenSize = unitSize * 3;

  const spaceSize = 10;
  const largeSpaceSize = 32;
  const numbersBankTop = 60;
  const numbersBankTitleTop = 48;

  const bankWidth = 64 + unitSize + tenSize + 2 * largeSpaceSize
  const unitBankX = 64 + tenSize + largeSpaceSize + unitSize / 2;
  const tensBankX = 64 + tenSize / 2;

  const [number, setNumber] = useState<number>(newNumber());
  const numberDigits = 
    [number - Math.floor(number / 10) * 10, Math.floor(number / 10)];

  let unitsBank = useRef<Array<number>>([...Array(9)]);
  let tensBank = useRef<Array<number>>([...Array(9)]);
  let unitsTarget = useRef<Array<number>>([]);
  let tensTarget = useRef<Array<number>>([]);

  const unitId: string = "unit";
  const tenId: string = "ten";

  const unitIdBankPrefix = "unitSource_";
  const tenIdBankPrefix = "tenSource_";
  const unitIdTargetPrefix = "unitTarget_";
  const tenIdTargetPrefix = "tenTarget_";

  const [unitTargetCount, setUnitTargerCount] = useState<number>(unitsTarget.current.length);
  const [tenTargetCount, setTenTargerCount] = useState<number>(tensTarget.current.length);

  const [unitFeedbackFace, setUnitFeedbackFace] = 
    useState<FACES>(numberDigits[0] === 0 ? FACES.HAPPY : FACES.NONE);
  const [tenFeedbackFace, setTenFeedbackFace] = 
    useState<FACES>(numberDigits[1] === 0 ? FACES.HAPPY : FACES.NONE);

    const {
      isTablet,
    } = useContext(GamesContext) as GamesContextType;
  
    function newNumber(): number {
      let number = ObjectsUtil.generateRandomNumbers(1,99,1)[0];
      return number;
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
      document.getElementById(targetPrefix + targetArray.length)!.style.visibility = "visible";
      targetArray.push(1);
      if (feedbackIdPrefix === unitId) {
        setUnitTargerCount(unitTargetCount + 1);
      }
      else {
        setTenTargerCount(tenTargetCount + 1);
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
    targetArray.pop();
    if (feedbackIdPrefix === unitId) {
      setUnitTargerCount(unitTargetCount - 1);
    }
    else {
      setTenTargerCount(tenTargetCount - 1);
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

  function ValidateState(targetArray: Array<number>, digit: number, idPrefix: string) {
    if (targetArray.length > numberDigits[digit]) {
      if (idPrefix === unitId) {
        setUnitFeedbackFace(FACES.WORRY);
      }
      else {
        setTenFeedbackFace(FACES.WORRY);
      }
    }
    else if (targetArray.length === numberDigits[digit]) {
      if (idPrefix === unitId) {
        setUnitFeedbackFace(FACES.HAPPY);
      }
      else {
        setTenFeedbackFace(FACES.HAPPY);
      }
    }
    else {
      if (idPrefix === unitId) {
        setUnitFeedbackFace(FACES.NONE);
      }
      else {
        setTenFeedbackFace(FACES.NONE);
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
              
    if (numberDigits[1] === 0 || (numberDigits[0] === 0 && numberDigits[1] === 1)) {
      return unitNames[numberDigits[0]-1];
    }
    else if (numberDigits[1] === 1) {
      return firstTenName[numberDigits[0]-1]
    }
    else {
      if (numberDigits[0] === 0) {
        return tenName[numberDigits[1]-1]
      }
      else {
        let andIndex:number = 0;
        if (numberDigits[0] === 2 || numberDigits[0] === 8) {
          andIndex = 1;
        }
        return tenName[numberDigits[1]-1] + " " + and[andIndex] + unitNames[numberDigits[0]-1];
      }
    }
  }

  function updateNumber() {
    for (let serialNo=0; serialNo < 9; serialNo++) {
      document.getElementById(unitIdBankPrefix + serialNo)!.style.visibility = "visible";
      document.getElementById(unitIdTargetPrefix + serialNo)!.style.visibility = "hidden";
      document.getElementById(tenIdBankPrefix + serialNo)!.style.visibility = "visible";
      document.getElementById(tenIdTargetPrefix + serialNo)!.style.visibility = "hidden";
    }

    setUnitFeedbackFace(FACES.NONE);
    setTenFeedbackFace(FACES.NONE);

    unitsBank.current = [...Array(9)];
    tensBank.current = [...Array(9)];
    unitsTarget.current = [];
    tensTarget.current = [];
  
    setUnitTargerCount(0);
    setTenTargerCount(0);
  
    setNumber(newNumber());
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
      <h2 className="number-sub-title">{numberDigits[1]} עֲשָׂרוֹת, {numberDigits[0]}  יְחִידוֹת  -  { getNumberName(numberDigits) }</h2>
      <div style={{display: "flex", flexDirection: "row"}}>
        { number &&
          <div style={{display: "flex"}}>
            <svg width={9 * (unitSize+spaceSize)} height={11 * (unitSize+spaceSize) + largeSpaceSize}>
              <text x={bankWidth/2} y="20" fontSize={20} textAnchor="middle">בַּנְק מִסְפָּרִים</text>
              <text x={unitBankX} y={numbersBankTitleTop} textAnchor="middle"
                fontSize={20}>יְחִידוֹת</text>
              { [...Array(9)].map((val,i) => 
                <rect id={unitIdBankPrefix + i} key={i} 
                  className="number-languages-item-bank" width={unitSize} height={unitSize} 
                  x={unitBankX - (unitSize/2)} y={numbersBankTop + i * (unitSize+spaceSize)} 
                  onClick={ () => add(i, unitsBank.current, unitIdBankPrefix, unitsTarget.current, unitIdTargetPrefix, UNITS, unitId) } 
                  style={{visibility: "visible" }} />
              )}
            {
              props.scope > 10 &&
              <g>
                <text x={tensBankX} y={numbersBankTitleTop} fontSize={20}
                  textAnchor="middle">עֲשָׂרוֹת</text>
                <g>
                  { [...Array(9)].map((val,i) => 
                  <rect id={tenIdBankPrefix + i} key={i} 
                    className="number-languages-item-bank" width={tenSize} height={unitSize} 
                    x={tensBankX - (tenSize/2)} y={numbersBankTop + i * (unitSize+spaceSize)}
                    onClick={ () => add(i, tensBank.current, tenIdBankPrefix, tensTarget.current, tenIdTargetPrefix, TENS, tenId) }
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
                  props.scope > 10 &&
                    <td className="number-languages-unit-header">
                      <span className="number-languages-unit-title">
                        {tenTargetCount} עֲשָׂרוֹת
                      </span>
                      <FaceFeedback face={tenFeedbackFace} size={FEEDBACK_FACE_SIZE.M}></FaceFeedback>
                    </td>
                }
              </tr>
              <tr>
                <td style={{ border:"1px solid #FFFFFF" }}>
                  <svg height={(unitSize + spaceSize)*9} width={9 * (unitSize+spaceSize) + spaceSize}>
                    <g transform={"translate(" + spaceSize + " " + spaceSize + ")"}>
                      { [...Array(9)].map((val,i) => 
                        <rect id={unitIdTargetPrefix + i} key={i} 
                          className="number-languages-item" width={unitSize} height={unitSize} 
                          x={i * (unitSize+spaceSize)} y={0} 
                          onClick={ () => remove(i, unitsBank.current, unitIdBankPrefix, unitsTarget.current, unitIdTargetPrefix, UNITS, unitId) } 
                          style={{visibility: "hidden" }} />
                      )}
                    </g>
                  </svg>
                </td>
                <td style={{ border:"1px solid #FFFFFF" }}>
                  <svg height={(unitSize + spaceSize)*9} width={tenSize + 2*spaceSize}>
                    <g transform={"translate(" + spaceSize + " " + spaceSize + ")"}>
                      { [...Array(9)].map((val,i) => 
                        <rect id={tenIdTargetPrefix + i} key={i} className="number-languages-item" 
                          width={tenSize} height={unitSize} 
                          x={0} y={i * (unitSize+spaceSize)}
                          onClick={ () => remove(i, tensBank.current, tenIdBankPrefix, tensTarget.current, tenIdTargetPrefix, TENS, tenId) }
                          style={{visibility: "hidden" }} />
                      )}
                    </g>
                  </svg>
                </td>
              </tr>
            </tbody></table>
          }
        </div>
      </div>
    </div>
  )
}