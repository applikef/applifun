export enum PlayListNames {
  LONG_HOORAY = "LongHooray",
  SHORT_HOORAY = "ShortHooray",
  OUCH = "Ouch",
  DEFAULT = "default",
}

export const PlayLists: Map<string, string[]> = new Map([
  ["LongHooray", [
    "resources/audio/well-done.mp3",
    "resources/audio/well-done-1.mp3",
    "resources/audio/wonderful-all-done.mp3",
  ]],
  ["ShortHooray", [
    "resources/audio/yes.mp3",
    "resources/audio/great.mp3",
  ]],
  ["Ouch", [
    "resources/audio/ouch-2.mp3",
    "resources/audio/try-again.mp3",
  ]],
  ["default", [
    "resources/audio/great.mp3"
  ]]
])