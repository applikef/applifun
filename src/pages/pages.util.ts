export function getGameDescriptor(gameId: string | null): any {
  if (gameId === null) {
    return undefined;
  }

  return(
    gameId === "colorMatch" ? require("./../assets/componentDescriptors/matchDescriptors/colorMatch.json")
    : gameId === "numberMatch" ? require("./../assets/componentDescriptors/matchDescriptors/numberMatch.json")
    : gameId === "letterMatch" ? require("./../assets/componentDescriptors/matchDescriptors/letterMatch.json")
    : gameId === "bathroomRoutine" ? require("./../assets/componentDescriptors/sequenceDescriptors/bathroomRoutine.json")
    : gameId === "morningRoutine" ? require("./../assets/componentDescriptors/sequenceDescriptors/morningRoutine.json")
    : gameId === "washHands" ? require("./../assets/componentDescriptors/sequenceDescriptors/washHands.json")
    : undefined
  )
}