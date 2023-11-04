export enum PlayListNames {
  LONG_HOORAY = "LongHooray",
  SHORT_HOORAY = "ShortHooray",
  OUCH = "Ouch",
  DEFAULT = "default",
}

export const PlayLists: Map<string, string[]> = new Map([
  ["LongHooray", [
    "resources/audio/well-done.mp3"
  ]],
  ["ShortHooray", [
    "resources/audio/hooray-short-1.mp3",
    "resources/audio/hooray-short-2.mp3",
  ]],
  ["Ouch", [
    "resources/audio/ouch-1.mp3",
    "resources/audio/ouch-2.mp3",
    "resources/audio/ouch-3.mp3",
  ]],
  ["default", [
    "resources/audio/hooray-short-1.mp3"
  ]]
])