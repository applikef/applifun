import { KidDevContextType } from "./../KidDevContext";
import { KidDevCodeBlock, KidDevCodeStatement } from "../kidDevModel";
import { DefaultMagnitude } from "./statementsUtil";

export enum StatementCode {
  JUMP
}

export class CodeInterpreter { 
  private context: KidDevContextType;

  constructor(context: KidDevContextType) {
    this.context = context;
  }

  private SVG_NS = 'http://www.w3.org/2000/svg';
  public svg: SVGElement = document.querySelector("svg")!;
  public pencil = document.getElementById("pencil")!;

  public execute() {
    if (this.context.displayLevel === 0) {
      return;
    }
    this.context.code.code.map((block: KidDevCodeBlock)=>block.statements.map((s,i)=>
      this.executeStatement(s,i)
    ))
  }
 
  private executeStatement(s: KidDevCodeStatement, i: number) {
    switch(s.name) {
      case StatementCode.JUMP: {
          this.jump(s.magnitude ? 
            s.magnitude 
          : (DefaultMagnitude.get(s.name) ? 
            DefaultMagnitude.get(s.name)
            : 100)!);
          break;
      }
    }
  }

  public jump(delta: number) {
    var newLine = document.createElementNS(this.SVG_NS,'line');
    newLine.setAttribute('id', 'line2');
    newLine.setAttribute('x1', this.context.penX.toString());
    newLine.setAttribute('y1', this.context.penY.toString());
    newLine.setAttribute('x2', (delta + this.context.penX).toString());
    newLine.setAttribute('y2',this.context.penY.toString());
    newLine.setAttribute("stroke", "red")
    this.svg.append(newLine);

    this.pencil.setAttribute('x', (delta + this.context.pencilX).toString());

    this.context.setPenX(delta + this.context.penX);
    this.context.setPencilX(delta + this.context.pencilX);
  } 
}