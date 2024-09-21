import { ProfileDescriptor } from "../model/profileDescriptor.type";

export function getGameDescriptor(gameId: string | null, profile: string | null): any {
  if (gameId === null) {
    return undefined;
  }

  if (gameId === "bathroomRoutine") {
    return require("./../assets/componentDescriptors/sequenceDescriptors/bathroomRoutine.json");
  } 
  else if (gameId === "behaviorSelect") {
    return require("./../assets/componentDescriptors/selectDescriptors/behaviorSelect.json");
  } 
  else if (gameId === "colorMatch") {
    return require("./../assets/componentDescriptors/matchDescriptors/colorMatch.json");
  }
  else if (gameId === "colorSort") {
    return require("./../assets/componentDescriptors/sortDescriptors/colorSort.json");
  }
  else if (gameId === "iCount") {
    return require("./../assets/componentDescriptors/sequenceDescriptors/numbersSequence.json");
  }
  else if (gameId === "iWriteWords") {
    return require("./../assets/componentDescriptors/sequenceDescriptors/iWriteDescriptor.json")
  }
  else if (gameId === "letterMatch") {
    if (profile === "cards") {
      return require("./../assets/componentDescriptors/matchDescriptors/letterMatch-cards.json");
    }
    return require("./../assets/componentDescriptors/matchDescriptors/letterMatch.json");
  }
  else if (gameId === "numberMatch") {
    return require("./../assets/componentDescriptors/matchDescriptors/numberMatch.json")
  }
  else if (gameId === "numberSort") {
    return require("./../assets/componentDescriptors/sortDescriptors/numberSort.json");
  }
  else if (gameId === "moodSelect") {
    return require("./../assets/componentDescriptors/selectDescriptors/moodSelect.json");
  }
  else if (gameId === "moodSort") {
    return require("./../assets/componentDescriptors/sortDescriptors/moodSort.json");
  }
  else if (gameId === "morningRoutine") {
    return require("./../assets/componentDescriptors/sequenceDescriptors/morningRoutine.json");
  }
  else if (gameId === "shapeSort") {
    return require("./../assets/componentDescriptors/sortDescriptors/shapeSort.json");
  }
  else if (gameId === "washHands") {
    return require("./../assets/componentDescriptors/sequenceDescriptors/washHands.json");
  }
  else if (gameId === "wordMatch") {
    return require("./../assets/componentDescriptors/matchDescriptors/wordMatch.json");
  }
  else {
    return undefined;
  }
}

export function getProfileList(gameId: string) : Array<ProfileDescriptor> {
  const profiles = require("./../assets/componentDescriptors/profilesDescriptor.json");
  if (profiles[gameId] !== undefined) {
    return profiles[gameId];
  }
  return [];
}