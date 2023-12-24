export function getGameDescriptor(gameId: string | null): any {
  if (gameId === null) {
    return undefined;
  }

  return(
    gameId === "bathroomRoutine" ? require("./../assets/componentDescriptors/sequenceDescriptors/bathroomRoutine.json")
    : gameId === "behaviorSelect" ? require("./../assets/componentDescriptors/selectDescriptors/behaviorSelect.json")
    : gameId === "colorMatch" ? require("./../assets/componentDescriptors/matchDescriptors/colorMatch.json")
    : gameId === "colorSort" ? require("./../assets/componentDescriptors/sortDescriptors/colorSort.json")
    : gameId === "iCount" ? require("./../assets/componentDescriptors/sequenceDescriptors/numbersSequence.json")
    : gameId === "iWriteWords" ? require("./../assets/componentDescriptors/sequenceDescriptors/iWriteDescriptor.json")
    : gameId === "letterMatch" ? require("./../assets/componentDescriptors/matchDescriptors/letterMatch.json")
    : gameId === "numberMatch" ? require("./../assets/componentDescriptors/matchDescriptors/numberMatch.json")
    : gameId === "numberSort" ? require("./../assets/componentDescriptors/sortDescriptors/numberSort.json")
    : gameId === "moodSelect" ? require("./../assets/componentDescriptors/selectDescriptors/moodSelect.json")
    : gameId === "moodSort" ? require("./../assets/componentDescriptors/sortDescriptors/moodSort.json")
    : gameId === "morningRoutine" ? require("./../assets/componentDescriptors/sequenceDescriptors/morningRoutine.json")
    : gameId === "washHands" ? require("./../assets/componentDescriptors/sequenceDescriptors/washHands.json")
    : undefined
  )
}