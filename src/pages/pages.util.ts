import { ProfileDescriptor } from "../model/profileDescriptor.type";
import { User } from "../model/users.types";

export function getGameDescriptor(gameId: string | null, user: User, profile: string | null): any {
  if (gameId === null) {
    return undefined;
  }

  let userId: string = user.id;

  let localProfile: string = "";
  const profileList: Array<ProfileDescriptor> = getProfileList(gameId);
  if (profile !== null && profile.length > 0) {
    localProfile = profile;
  }
  else if (profileList !== undefined && profileList.length) {
    localProfile = profileList[0].id;
  }

  if (gameId === "bathroomRoutine") {
    return require("./../assets/descriptors/componentDescriptors/sequenceDescriptors/bathroomRoutine.json");
  } 
  else if (gameId === "behaviorSelect") {
    return require("./../assets/descriptors/componentDescriptors/selectDescriptors/behaviorSelect.json");
  } 
  else if (gameId === "colorMatch") {
    return require("./../assets/descriptors/componentDescriptors/matchDescriptors/colorMatch.json");
  }
  else if (gameId === "colorSort") {
    return require("./../assets/descriptors/componentDescriptors/sortDescriptors/colorSort.json");
  }
  else if (gameId === "iCount") {
    return require("./../assets/descriptors/componentDescriptors/sequenceDescriptors/numbersSequence.json");
  }
  else if (gameId === "iWriteWords") {
    return require("./../assets/descriptors/componentDescriptors/sequenceDescriptors/iWriteDescriptor.json")
  }
  else if (gameId === "letterMatch") {
    if (localProfile === "cards") {
      return require("./../assets/descriptors/componentDescriptors/matchDescriptors/letterMatch-cards.json");
    }
    return require("./../assets/descriptors/componentDescriptors/matchDescriptors/letterMatch.json");
  }
  else if (gameId === "numberMatch") {
    return require("./../assets/descriptors/componentDescriptors/matchDescriptors/numberMatch.json")
  }
  else if (gameId === "numberSort") {
    return require("./../assets/descriptors/componentDescriptors/sortDescriptors/numberSort.json");
  }
  else if (gameId === "moodSelect") {
    return require("./../assets/descriptors/componentDescriptors/selectDescriptors/moodSelect.json");
  }
  else if (gameId === "moodSort") {
    return require("./../assets/descriptors/componentDescriptors/sortDescriptors/moodSort.json");
  }
  else if (gameId === "morningRoutine") {
    return require("./../assets/descriptors/componentDescriptors/sequenceDescriptors/morningRoutine.json");
  }
  else if (gameId === "shapeSort") {
    return require("./../assets/descriptors/componentDescriptors/sortDescriptors/shapeSort.json");
  }
  else if (gameId === "washHands") {
    return require("./../assets/descriptors/componentDescriptors/sequenceDescriptors/washHands.json");
  }
  else if (gameId === "wordMatch") {
    switch (userId) {
      case "carol":
        return require("./../assets/descriptors/componentDescriptors/private/carol/matchDescriptors_wordMatch.json");
      case "netta":
        return require("./../assets/descriptors/componentDescriptors/private/netta/wordMatch.json");
      default:
        return require("./../assets/descriptors/componentDescriptors/matchDescriptors/wordMatch.json");
    }
  }
  else {
    return undefined;
  }
}

export function getProfileList(gameId: string) : Array<ProfileDescriptor> {
  const profiles = require("./../assets/descriptors/componentDescriptors/profilesDescriptor.json");
  if (profiles[gameId] !== undefined) {
    return profiles[gameId];
  }
  return [];
}