import { ObjectsUtil } from "../../../utils/ObjectsUtil";

export type BoardType = Array<Array<number>>;
export type BoardPointType = [number,number];

export class PairsBoardObject {
  boardSize: number;
  goal: number;
  operator: string;

  operators: Array<string> = ["+"];
  available: Array<Array<boolean>>;
  solution: Array<[BoardPointType,BoardPointType]> = []
  board: BoardType = []
  numberOfPairs: number;

  constructor(boardSize: number, goal: number, operator: string) {
    // Make board size even to avoid an empty cell
    this.boardSize = ObjectsUtil.isEven(boardSize) ? boardSize : boardSize + 1;   
    this.goal = goal;
    this.operator = operator;

    const length = this.boardSize
    this.available = Array.from({ length }, () => Array.from({ length }, () => true));
    this.numberOfPairs = 0;

    this.populate();
  }

  empty(row: number, col: number): boolean {
     return this.available[row][col]
  }
  
  countAvailable(): number {
    let count = 0
    for (let row = 0; row < this.boardSize; row++) {
      for (let col = 0; col < this.boardSize; col++) {
        count += this.empty(row,col) === true ? 1 : 0; 
      }
    }
    return count
  }

  getFirstAvailable(): [number, number] {
    if (this.countAvailable() === 0) {
      return [-1,-1];
    }

    for (let row = 0; row < this.boardSize; row++) {
      for (let col = 0; col < this.boardSize; col++) {
        if (this.empty(row,col)) {
          return ([row,col]);
        } 
      }
    }

    return [-1,-1];
  }

  getPoint(): [number,number] {
    let row = ObjectsUtil.generateRandomNumber(0, this.boardSize-1);
    let col = ObjectsUtil.generateRandomNumber(0, this.boardSize-1);
    if (!this.empty(row,col)) {
      [row, col] = this.getFirstAvailable();
    }
    return [row,col];
  }

  populate(): BoardType | undefined {
    let maxPointCount = this.boardSize * this.boardSize / 2;
    for (let pointsCount = 1; pointsCount <=  maxPointCount; pointsCount++) {
      let [row, col]: [number,number] = this.getPoint();
      this.available[row][col] = false;

      let [newRow, newCol]: [number,number] = this.getPoint();
      this.available[newRow][newCol] = false;

      this.solution.push([[row, col],[newRow, newCol]]);
    }
    this.setBoard();
    return this.board;
  }

  setBoard() {
    this.numberOfPairs = this.solution.length
    let pairValues: Array<BoardPointType> = [];
    for (let i = 0; i < this.numberOfPairs; i++) {
      let v: number = ObjectsUtil.generateRandomNumber(0, this.goal);
      pairValues.push([v, this.goal - v]);
    }

    const length = this.boardSize;
    this.board = Array.from({ length }, () => Array.from({ length }, () => -1))
    for (let i = 0; i < this.numberOfPairs; i++) {
        let points: Array<BoardPointType> = this.solution[i];
        let p1: BoardPointType = points[0];
        let p2: BoardPointType = points[1];
        this.board[p1[0]][p1[1]] = pairValues[i][0]
        this.board[p2[0]][p2[1]] = pairValues[i][1]
    }
  }

  getBoard(): BoardType {
    return this.board;
  } 
}