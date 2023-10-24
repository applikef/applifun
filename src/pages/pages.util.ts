export function getGameDescriptor(gameId: string | null): any {
  if (gameId === null) {
    return undefined;
  }

  return(
    gameId === "colorMatch" ? require("./../assets/gameDescriptors/matchDescriptors/colorMatch.json")
    : gameId === "numberMatch" ? require("./../assets/gameDescriptors/matchDescriptors/numberMatch.json")
    : gameId === "yoga" ? require("./../assets/gameDescriptors/linkListDescriptors/yoga.json")
    : undefined
  )
}