export const PENCIL_IMAGE = "./resources/codePlay/pencil96.png";
export const PENCIL_IMAGE_MAX_DIMENSION = 96;   // 128;
export const DEFAULT_PENCIL_PEN_DELTA_X = 47;   // 62;
export const DEFAULT_PENCIL_PEN_DELTA_Y = 87;   // 116;

export interface KDPencil {
  x: number;
  y: number;
  penX: number;
  penY: number;
  stroke: string;
  angle: number;
  rotate: number;
}

export const DEFAULT_PENCIL: KDPencil = {
  x: 100,
  y: 100,
  penX: 100 + DEFAULT_PENCIL_PEN_DELTA_X,
  penY: 100 + DEFAULT_PENCIL_PEN_DELTA_Y,
  stroke: "#0000ff",
  angle: 0,
  rotate: 0
}