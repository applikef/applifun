import React, { useState } from "react";
import "./NumberLanguages.css";
import { Banner } from "../../global/Banner/Banner";
import { PageHeader } from "../../shared/PageHeader/PageHeader";
import { FACES } from "../../shared/FaceFeedback/FaceFeedback";
import { ObjectsUtil } from "../../../utils/ObjectsUtil";

export interface NumberLanguagesProps {
  scope: number;
}

export const NumberLanguages = (props: NumberLanguagesProps) => {

  const UNITS = 0;
  const TENS = 1;

  const seed = Math.random();
  const number = seed === 0 ? 1 : seed === 1 ? props.scope-1 : Math.floor(seed * props.scope);
  const numberDigits = [number - Math.floor(number / 10) * 10, Math.floor(number / 10)];
    
  const unitSise = 20;
  const tenSize = unitSise * 10;
  const spaceSize = 10;
  const largeSpaceSize = 15;

  let unitsBank = [...Array(9)];
  let tensBank = [...Array(9)];
  let unitsTarget: Array<number> = [];
  let tensTarget: Array<number> = [];

  const unitIdBankPrefix = "unitSource_";
  const tenIdBankPrefix = "tenSource_";
  const unitIdTargetPrefix = "unitTarget_";
  const tenIdTargetPrefix = "tenTarget_";

  const [feedbackFace, setFeedbackFace] = useState<FACES>(FACES.NONE);

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
    const idWorry = idPrefix + "worry-face";
    const idHappy = idPrefix + "happy-face";
    if (targetArray.length > numberDigits[digit]) {
      document.getElementById(idWorry)!.style.display = "inline";
      document.getElementById(idHappy)!.style.display = "none";
    }
    else if (targetArray.length === numberDigits[digit]) {
      document.getElementById(idWorry)!.style.display = "none";
      document.getElementById(idHappy)!.style.display = "inline";
    }
    else {
      document.getElementById(idWorry)!.style.display = "none";
      document.getElementById(idHappy)!.style.display = "none";
    }
  }

  const titleTemplate = "הַקְלֵק עַל עֲשָׂרוֹת וְעַל יְחִידוֹת שֶׁמַּתְאִימוֹת לַמִּסְפָּר $number$";
  const title = ObjectsUtil.getTitle(titleTemplate, number.toString());

  return(
    <div className="app-page">
      <Banner gameId="numberLanguagesShow"/>
      
      <div  className="app-title-centered">
        <PageHeader title={title} 
          feedbackFace={ feedbackFace } />
      </div>

      <h1 className="number-header">{ number }</h1>
      <div style={{display: "flex", flexDirection: "row"}}>
        <div style={{display: "flex"}}>
          <svg width={9 * (unitSise+spaceSize)} height={11 * (unitSise+spaceSize) + largeSpaceSize}>
            { [...Array(9)].map((val,i) => 
              <rect id={unitIdBankPrefix + i} key={i} className="number-languages-item" width={unitSise} height={unitSise} 
                x={i * (unitSise+spaceSize)} y={0} 
                onClick={ () => add(i, unitsBank, unitIdBankPrefix, unitsTarget, unitIdTargetPrefix, UNITS, "units-") } 
                style={{visibility: "visible" }} />
            )}
            {
              props.scope > 10 &&
              <g transform={"translate(0 " + (unitSise+largeSpaceSize) + ")"}>
                { [...Array(9)].map((val,i) => 
                <rect id={tenIdBankPrefix + i} key={i} className="number-languages-item" width={tenSize} height={unitSise} 
                  x={0} y={i * (unitSise+spaceSize)}
                  onClick={ () => add(i, tensBank, tenIdBankPrefix, tensTarget, tenIdTargetPrefix, TENS, "tens-") }
                  style={{visibility: "visible" }} />
                )}
              </g>
            }
          </svg>
        </div>
      <div style={{display: "flex"}}>
        <table style={{ border:"1px solid #FFFFFF", height: "100px", marginRight: "60px" }}><tbody>
          <tr>
            <td className="unit-header">יחידות</td>
            {
              props.scope > 10 &&
                <td className="unit-header">עשרות</td>
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
                      onClick={ () => remove(i, unitsBank, unitIdBankPrefix, unitsTarget, unitIdTargetPrefix, UNITS, "units-") } 
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
                      onClick={ () => remove(i, tensBank, tenIdBankPrefix, tensTarget, tenIdTargetPrefix, TENS, "tens-") }
                      style={{visibility: "hidden" }} />
                  )}
                </g>
              </svg>
            </td>
          </tr>
          <tr>
            <td>
              <img src="./resources/images/worry-face.png" alt="worry-face" width="100px"
                id="units-worry-face" style={{ display: "none", marginRight: "20px" }}></img>
              <img src="./resources/images/happy-face.png" alt="happy-face" width="100px"
                id="units-happy-face" style={{ display: "none", marginRight: "20px" }}></img>
            </td>
            <td>
              <img src="./resources/images/worry-face.png" alt="worry-face" width="100px"
                id="tens-worry-face" style={{ display: "none", marginRight: "20px" }}></img>
              <img src="./resources/images/happy-face.png" alt="happy-face" width="100px"
                id="tens-happy-face" style={{ display: "none", marginRight: "20px" }}></img>
            </td>
          </tr>
        </tbody></table>
        </div>
      </div>
    </div>
  )
}