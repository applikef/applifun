export function getGameDescriptor(gameId: string | null): any {
  if (gameId === null) {
    return undefined;
  }

  return(
    gameId === "colorMatch" ? require("./../assets/componentDescriptors/matchDescriptors/colorMatch.json")
    : gameId === "numberMatch" ? require("./../assets/componentDescriptors/matchDescriptors/numberMatch.json")
    : gameId === "yoga" ? require("./../assets/componentDescriptors/tileDescriptors/yoga.json")
    : undefined
  )
}