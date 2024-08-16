import { DEFAULT_PENCIL_INIT_X, DEFAULT_PENCIL_INIT_Y } from "../constants/displayConstants";

export const PENCIL_IMAGE = "./resources/codePlay/pencil96.png";
export const PENCIL_IMAGE_MAX_DIMENSION = 96;   // 128;
export const DEFAULT_PENCIL_PEN_DELTA_X = 47;   // 62;
export const DEFAULT_PENCIL_PEN_DELTA_Y = 87;   // 116;
export const MAX_STROKE_WIDTH = 50;

export interface KDPencil {
  x: number;
  y: number;
  penX: number;
  penY: number;
  stroke: string;
  strokeWidth: number;
  angle: number;
  rotate: number;
}

export const DEFAULT_PENCIL: KDPencil = {
  x: DEFAULT_PENCIL_INIT_X,
  y: DEFAULT_PENCIL_INIT_Y,
  penX: DEFAULT_PENCIL_INIT_X + DEFAULT_PENCIL_PEN_DELTA_X,
  penY: DEFAULT_PENCIL_INIT_Y + DEFAULT_PENCIL_PEN_DELTA_Y,
  stroke: "#0000ff",
  strokeWidth: 1,
  angle: 0,
  rotate: 0
}