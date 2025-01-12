import { ProfileDescriptor } from "../model/profileDescriptor.type";
import { User } from "../model/users.types";

export function getGameDescriptor(gameId: string | null, user: User, profile: string | null): any {
  if (gameId === null) {
    return undefined;
  }

  const userDescriptorName = user.descriptor ? require(`./../assets/descriptors/users/${user.descriptor}`) : undefined;
  const gameDescriptorName = userDescriptorName ? userDescriptorName["games"][gameId] : undefined;

  /*
  Kept in case local profile will be reused
  let localProfile: string = "";
  const profileList: Array<ProfileDescriptor> = getProfileList(gameId);
  if (profile !== null && profile.length > 0) {
    localProfile = profile;
  }
  else if (profileList !== undefined && profileList.length) {
    localProfile = profileList[0].id;
  }
  */

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
    if (gameDescriptorName) {
      return require(`./../assets/descriptors/componentDescriptors/private/${gameDescriptorName}`);
    }
    else {    // Default descriptor
      return require("./../assets/descriptors/componentDescriptors/sequenceDescriptors/iWriteDescriptor.json")
    }
  }
  else if (gameId === "letterMatch") {
    if (gameDescriptorName) {
      return require(`./../assets/descriptors/componentDescriptors/private/${gameDescriptorName}`);
    }
    else {    // Default descriptor
      return require("./../assets/descriptors/componentDescriptors/matchDescriptors/letterMatch.json");
    }
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
  else if (gameId === "myScheduleAnalog") {
    return require("./../assets/descriptors/componentDescriptors/clockDescriptors/myScheduleAnalog.json");
  }
  else if (gameId === "myScheduleDigital") {
    return require("./../assets/descriptors/componentDescriptors/clockDescriptors/myScheduleDigital.json");
  }
  else if (gameId === "selectClockAnalog") {
    return require("./../assets/descriptors/componentDescriptors/clockDescriptors/selectClockAnalog.json");
  }
  else if (gameId === "selectClockDigital") {
    return require("./../assets/descriptors/componentDescriptors/clockDescriptors/selectClockDigital.json");
  }
  else if (gameId === "shapeSort") {
    return require("./../assets/descriptors/componentDescriptors/sortDescriptors/shapeSort.json");
  }
  else if (gameId === "synonymsPairs") {
    return require("./../assets/descriptors/componentDescriptors/pairsDescriptors/synonymsPairs.json");
  }
  else if (gameId === "washHands") {
    return require("./../assets/descriptors/componentDescriptors/sequenceDescriptors/washHands.json");
  }
  else if (gameId === "whatIsTheTimeAnalog") {
    return require("./../assets/descriptors/componentDescriptors/clockDescriptors/whatIsTheTimeAnalog.json");
  }
  else if (gameId === "whatIsTheTimeDigial") {
    return require("./../assets/descriptors/componentDescriptors/clockDescriptors/whatIsTheTimeDigial.json");
  }
  else if (gameId === "wordMatch") {
    if (gameDescriptorName) {
      return require(`./../assets/descriptors/componentDescriptors/private/${gameDescriptorName}`);
    }
    else {    // Default descriptor
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