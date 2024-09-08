export const DEFAULT_PENCIL_INIT_X = 250;
export const DEFAULT_PENCIL_INIT_Y = 150;
export const DISPLAY_AREA_WIDTH = 800; 
export const DISPLAY_AREA_HEIGHT = 600; 
export const DISPLAY_AREA_WIDTH_TABLET = 500; 
export const DISPLAY_AREA_HEIGHT_TABLET = 300; 

export const enum StrokeColors {
  RED = "RED", 
  GREEN = "GREEN",
  BLUE = "BLUE",
  MAGENTA = "MAGENTA",
  CYAN = "CYAN",
  ORANGE = "ORANGE",
  BLACK = "BLACK"
}

export const StrokeColorsArr: Array<string> = [
  StrokeColors.RED,
  StrokeColors.GREEN,
  StrokeColors.BLUE,
  StrokeColors.MAGENTA,
  StrokeColors.CYAN,
  StrokeColors.BLACK
]

export const StrokeColorsHex = new Map<string, string>([
  [StrokeColors.RED, "#ff0000"],
  [StrokeColors.GREEN, "#00aa00"],
  [StrokeColors.BLUE, "#0000ff"],
  [StrokeColors.MAGENTA, "#ff00ff"],
  [StrokeColors.CYAN, "#00eeee"],
  [StrokeColors.ORANGE, "#ff7400"],
  [StrokeColors.BLACK, "#000000"]
]);