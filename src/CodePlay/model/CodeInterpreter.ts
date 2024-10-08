import { StatementCode } from "../constants/modelConstants";
import { KDCode, KDCodeStatement } from "./kidDevModel";
import { DefaultNumberValues, DefaultStringValue } from "../constants/modelConstants";
import { showError } from "../utils/errorsUtil";
import { KD_APP_ERROR_MESSAGES } from "../constants/appErrorMessages";
import { CodeValidator } from "./CodeValidator";
import { toRadians } from "../utils/generalUtils";
import { KDPencil, DEFAULT_PENCIL_PEN_DELTA_X, DEFAULT_PENCIL_PEN_DELTA_Y, DEFAULT_PENCIL, PENCIL_IMAGE } from "./KDPencil";

const SVG_NS = 'http://www.w3.org/2000/svg';

export class CodeInterpreter { 
  private pencil:KDPencil = DEFAULT_PENCIL;

  private setPencilPosition(penX: number, penY: number) {
    const newX: number = penX - DEFAULT_PENCIL_PEN_DELTA_X;
    const newY: number = penY - DEFAULT_PENCIL_PEN_DELTA_Y;

    this.pencil = {
      x: newX,
      y: newY,
      penX: penX,
      penY: penY,
      stroke: this.pencil.stroke,
      strokeWidth: this.pencil.strokeWidth,
      angle: this.pencil.angle,
      rotate: this.pencil.rotate
    };
  }

  private setPencilAngle(angle: number) {
    this.pencil.rotate = this.pencil.angle - angle;
    this.pencil.angle = angle;
  }

  public reset() {
    const svg: SVGElement = document.querySelector("svg")!;
    while (svg !== null && svg.lastChild) {
      svg.removeChild(svg.lastChild);
    }

    var newPencil = document.createElementNS(SVG_NS,'image');
    newPencil.setAttribute('id', 'pencil');
    newPencil.setAttribute('href', PENCIL_IMAGE);
    newPencil.setAttribute('x', DEFAULT_PENCIL.x.toString());
    newPencil.setAttribute('y', DEFAULT_PENCIL.y.toString());
    newPencil.setAttribute('transform', "rotate(0)");
    svg.append(newPencil);
    
    this.pencil = DEFAULT_PENCIL;
  }

  public execute(code: KDCode) {
    let stopExecution: boolean = false;
    for (let i=0; (!stopExecution && i < code.code.length); i++) {
      const blockStatements: Array<KDCodeStatement> = code.code[i].statements;
      for (let j=0; j < blockStatements.length; j++) {
        const statement: KDCodeStatement = blockStatements[j];
        if (CodeValidator.isValid(statement)) {
          this.executeStatement(statement,i);
        }
        else {
          showError(KD_APP_ERROR_MESSAGES.FIX_ERRORS);
          stopExecution = true;
          break;
        }  
      }
      if (stopExecution) {
        break;
      }
    }
  }
 
  private executeStatement(s: KDCodeStatement, i: number) {
    const numberValue: number | undefined = 
      s.numberValues ? s.numberValues[0] : undefined;

    if (s.name === StatementCode.JUMP) {
      this.execJump(numberValue ? 
        numberValue 
      : (DefaultNumberValues.get(s.name)![0] ? 
        DefaultNumberValues.get(s.name)![0]
        : 100)!);
    }
    else if (s.name === StatementCode.SET_PENCIL_POSITION) {
      this.execSetPencilPosition(s.numberValues ? 
        [s.numberValues[0], s.numberValues[1]] 
      : DefaultNumberValues.get(s.name)!);
    }
    else if (s.name === StatementCode.SET_STROKE) {
      this.execSetStroke(s.stringValue ? 
        s.stringValue 
      : DefaultStringValue.get(s.name)!);
    }
    else if (s.name === StatementCode.SET_STROKE_WIDTH) {
      this.execSetStrokeWidth(numberValue ? 
        numberValue 
      : DefaultNumberValues.get(s.name)![0]);
    }
    else if (s.name === StatementCode.TURN_DOWN || 
      s.name === StatementCode.TURN_UP ||
      s.name === StatementCode.TURN_RIGHT ||
      s.name === StatementCode.TURN_LEFT ||
      s.name === StatementCode.TURN) {
        this.execTurn(numberValue);
      }
  }

  public execJump(delta: number) {
    const svg: SVGElement = document.querySelector("svg")!;
    const pencil = document.getElementById("pencil")!;

    const newPenX: number = (this.pencil.penX+(delta*Math.cos(toRadians(this.pencil.angle))));
    const newPenY: number = (this.pencil.penY-(delta*Math.sin(toRadians(this.pencil.angle))));

    var newLine = document.createElementNS(SVG_NS,'line');
    newLine.setAttribute('id', 'line2');
    newLine.setAttribute('x1', this.pencil.penX.toString());
    newLine.setAttribute('y1', this.pencil.penY.toString());
    newLine.setAttribute('x2', newPenX.toString());
    newLine.setAttribute('y2', newPenY.toString());
    newLine.setAttribute("stroke", this.pencil.stroke)
    newLine.setAttribute("stroke-width", this.pencil.strokeWidth.toString())
    pencil.setAttribute('transform', `rotate(${-this.pencil.angle},${this.pencil.penX},${this.pencil.penY})`);
    svg.append(newLine);


    this.setPencilPosition(newPenX, newPenY);
    pencil.setAttribute('x', this.pencil.x.toString());
    pencil.setAttribute('y', this.pencil.y.toString());
    pencil.setAttribute('transform', `rotate(${-this.pencil.angle},${this.pencil.penX},${this.pencil.penY})`);
  } 

  public execSetPencilPosition(position: Array<number>) {
    const pencil = document.getElementById("pencil")!;

    const newPenX = position[0] ? 
      position[0] 
    : DefaultNumberValues.get(StatementCode.SET_PENCIL_POSITION)![0];
    const newPenY = position[1] ? 
      position[1] 
    : DefaultNumberValues.get(StatementCode.SET_PENCIL_POSITION)![1];

    this.pencil.penX = newPenX;
    this.pencil.penY = newPenY;
    this.pencil.x = 0;
    this.pencil.y = 0;

    this.setPencilPosition(newPenX, newPenY);
    pencil.setAttribute('x', this.pencil.x.toString());
    pencil.setAttribute('y', this.pencil.y.toString());
    pencil.setAttribute('transform', `rotate(${-this.pencil.angle},${this.pencil.penX},${this.pencil.penY})`);
  } 

  public execSetStroke(stroke: string) {
    this.pencil.stroke = stroke;
  } 

  public execSetStrokeWidth(width: number) {
    this.pencil.strokeWidth = width;
  } 

  public execTurn(angle: number | undefined) {
    if (angle === undefined) {
      angle = 0;
    }

    if (angle >= 0) {
      this.setPencilAngle(angle!);
      const pencil = document.getElementById("pencil")!;
      pencil.setAttribute('transform', `rotate(${-this.pencil.angle},${this.pencil.penX},${this.pencil.penY})`);
    }
  }
}