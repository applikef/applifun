import React, { useRef, useState } from "react";
import "./NumberLanguages.css";
import { Banner } from "../../global/Banner/Banner";
import { PageHeader } from "../../shared/PageHeader/PageHeader";
import { FACES, FaceFeedback } from "../../shared/FaceFeedback/FaceFeedback";
import { ObjectsUtil } from "../../../utils/ObjectsUtil";
import { APPLI_SIZE } from "../../../utils/ConstantsUtil";

export interface NumberLanguagesProps {
  scope: number;
}

export const NumberLanguages = (props: NumberLanguagesProps) => {

  const UNITS = 0;
  const TENS = 1;

  const unitSise = 20;
  const tenSize = unitSise * 10;
  const spaceSize = 10;
  const largeSpaceSize = 15;

  const seed = Math.random();
  let number = useRef<number>(seed === 0 ? 1 : seed === 1 ? props.scope-1 : Math.floor(seed * props.scope));
  const numberDigits = 
    [number.current - Math.floor(number.current / 10) * 10, Math.floor(number.current / 10)];

//  const number = seed === 0 ? 1 : seed === 1 ? props.scope-1 : Math.floor(seed * props.scope);
//  const numberDigits = [number - Math.floor(number / 10) * 10, Math.floor(number / 10)];
    
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

  const [feedbackFace, setFeedbackFace] = useState<FACES>(FACES.NONE);
  const [unitFeedbackFace, setUnitFeedbackFace] = 
    useState<FACES>(numberDigits[0] === 0 ? FACES.HAPPY : FACES.NONE);
  const [tenFeedbackFace, setTenFeedbackFace] = 
    useState<FACES>(numberDigits[1] === 0 ? FACES.HAPPY : FACES.NONE);

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

  const titleTemplate = "הַקְלֵק עַל עֲשָׂרוֹת וְעַל יְחִידוֹת שֶׁמַּתְאִימוֹת לַמִּסְפָּר $number$";
  const title = ObjectsUtil.getTitle(titleTemplate, number.current.toString());

  return(
    <div className="app-page">
      <Banner gameId="numberLanguagesShow"/>
      
      <div  className="app-title-centered">
        <PageHeader title={title} 
          feedbackFace={ feedbackFace } />
      </div>

      <h1 className="number-title">{ number.current }</h1>
      <h2 className="number-sub-title">{numberDigits[1]} עֲשָׂרוֹת, {numberDigits[0]}  יְחִידוֹת  -  { getNumberName(numberDigits) }</h2>
      <div style={{display: "flex", flexDirection: "row"}}>
        <div style={{display: "flex"}}>
          <svg width={9 * (unitSise+spaceSize)} height={11 * (unitSise+spaceSize) + largeSpaceSize}>
            <text x="150" y="20" fontSize={20}>בַּנְק יְחִידוֹת</text>
            { [...Array(9)].map((val,i) => 
              <rect id={unitIdBankPrefix + i} key={i} 
                className="number-languages-item-bank" width={unitSise} height={unitSise} 
                x={i * (unitSise+spaceSize)} y={40} 
                onClick={ () => add(i, unitsBank.current, unitIdBankPrefix, unitsTarget.current, unitIdTargetPrefix, UNITS, unitId) } 
                style={{visibility: "visible" }} />
            )}
          </svg>
        </div>

        <div style={{display: "flex"}}>
          <table style={{ border:"1px solid #FFFFFF", height: "100px", marginRight: "60px" }}><tbody>
            <tr>
              <td className="unit-header">
                <FaceFeedback face={unitFeedbackFace} size={APPLI_SIZE.S}></FaceFeedback>
                <span style={{marginRight: "10px"}}>{unitTargetCount} יְחִידוֹת</span>                 
              </td>
              {
                props.scope > 10 &&
                  <td className="unit-header">
                    <FaceFeedback face={tenFeedbackFace} size={APPLI_SIZE.S}></FaceFeedback>
                    <span style={{marginRight: "10px"}}>{tenTargetCount} עֲשָׂרוֹת</span>
                  </td>
              }
            </tr>
            <tr>
              <td style={{ border:"1px solid #FFFFFF" }}>
                <svg height={(unitSise + spaceSize)*9} width={9 * (unitSise+spaceSize) + spaceSize}>
                  <g transform={"translate(" + spaceSize + " " + spaceSize + ")"}>
                    { [...Array(9)].map((val,i) => 
                      <rect id={unitIdTargetPrefix + i} key={i} 
                        className="number-languages-item" width={unitSise} height={unitSise} 
                        x={i * (unitSise+spaceSize)} y={0} 
                        onClick={ () => remove(i, unitsBank.current, unitIdBankPrefix, unitsTarget.current, unitIdTargetPrefix, UNITS, unitId) } 
                        style={{visibility: "hidden" }} />
                    )}
                  </g>
                </svg>
              </td>
              <td style={{ border:"1px solid #FFFFFF" }}>
                <svg height={(unitSise + spaceSize)*9} width={tenSize + 2*spaceSize}>
                  <g transform={"translate(" + spaceSize + " " + spaceSize + ")"}>
                    { [...Array(9)].map((val,i) => 
                      <rect id={tenIdTargetPrefix + i} key={i} className="number-languages-item" width={tenSize} height={unitSise} 
                        x={0} y={i * (unitSise+spaceSize)}
                        onClick={ () => remove(i, tensBank.current, tenIdBankPrefix, tensTarget.current, tenIdTargetPrefix, TENS, tenId) }
                        style={{visibility: "hidden" }} />
                    )}
                  </g>
                </svg>
              </td>
            </tr>
          </tbody></table>
        </div>
        <div style={{display: "flex"}}>
          {
            props.scope > 10 &&
            <svg  width={9 * (unitSise+spaceSize)} height={11 * (unitSise+spaceSize) + largeSpaceSize}>
              <text x="150" y="20" fontSize={20}>בַּנְק עֲשָׂרוֹת</text>
              <g>
                { [...Array(9)].map((val,i) => 
                <rect id={tenIdBankPrefix + i} key={i} 
                  className="number-languages-item-bank" width={tenSize} height={unitSise} 
                  x={0} y={40 + i * (unitSise+spaceSize)}
                  onClick={ () => add(i, tensBank.current, tenIdBankPrefix, tensTarget.current, tenIdTargetPrefix, TENS, tenId) }
                  style={{visibility: "visible" }} />
                )}
              </g>
            </svg>
          }
        </div>
      </div>
    </div>
  )
}