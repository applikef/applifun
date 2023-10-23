export function getGameDescriptor(gameId: string | null): any {
  if (gameId === null) {
    return undefined;
  }

  return(
    gameId === "bathroomRoutine" ? require("./../assets/gameDescriptors/sequenceDescriptors/bathroomRoutine.json")
    : gameId === "behaviorTag" ? require("./../assets/gameDescriptors/tagDescriptors/behaviorTag.json")
    : gameId === "colorSort" ? require("./../assets/gameDescriptors/sortDescriptors/colorSort.json")
    : gameId === "iCount" ? require("./../assets/gameDescriptors/sequenceDescriptors/numbersSequence.json")
    : gameId === "iWriteWords" ? require("./../assets/gameDescriptors/iWriteDescriptors/iWriteDescriptor.json")
    : gameId === "moodSort" ? require("./../assets/gameDescriptors/sortDescriptors/moodSort.json")
    : gameId === "morningRoutine" ? require("./../assets/gameDescriptors/sequenceDescriptors/morningRoutine.json")
    : gameId === "numbersSort" ? require("./../assets/gameDescriptors/sortDescriptors/numbersSort.json")
    : gameId === "sizeSort" ? require("./../customGames/sizeSort.json")
    : gameId === "washHands" ? require("./../assets/gameDescriptors/sequenceDescriptors/washHands.json")
    : undefined
  )
}