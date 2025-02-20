import { ImageCatalogEntryType } from "../model/catalogs.types";
import { User } from "../model/users.types";
import { MediaUtil } from "../utils/MediaUtil";
import { hebrewLetters } from "./LanguageUtil";

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
  else if (gameId === "imageQuestSort") {
    if (gameDescriptorName) {
      return require(`./../assets/descriptors/componentDescriptors/private/${gameDescriptorName}`);
    }
    else {    // Default descriptor
      return require(`./../assets/descriptors/componentDescriptors/imageQuest/imageQuestSort.json`);
    }
  }
  else if (gameId === "imageQuestQuestions") {
    if (gameDescriptorName) {
      return require(`./../assets/descriptors/componentDescriptors/private/${gameDescriptorName}`);
    }
    else {    // Default descriptor
      return require(`./../assets/descriptors/componentDescriptors/imageQuest/imageQuestQuestions.json`);
    }
  }
  else if (gameId === "iWriteWords") {
    if (gameDescriptorName) {
      return require(`./../assets/descriptors/componentDescriptors/private/${gameDescriptorName}`);
    }
    else {    // Default descriptor
      return generateIWriteWordsDescriptor();
    }
  }
  else if (gameId === "letterMatch") {
    if (gameDescriptorName) {
      return require(`./../assets/descriptors/componentDescriptors/private/${gameDescriptorName}`);
    }
    else {    // Default descriptor
      return generateLetterMatchDescriptor();
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
      return generateWordMatchDescriptor();
    }
  }
  else {
    return undefined;
  }
}

export function showGameSettings(descriptor: any): boolean {
  if (descriptor.showSettings === undefined) {
    return true;
  }
  return descriptor.showSettings;
}

export function generateIWriteWordsDescriptor() {
  const images: Array<ImageCatalogEntryType> = MediaUtil.getRandomCatalogImages(10, "iWriteWords", true);
  let words = [];
  for (let i=0; i < images.length; i++) {
    const image = images[i];
    words.push({
      "id": image.id,
      "title": image.title,
      "name": image.metadata === undefined ? image.title : image.metadata.alternativeSpelling,
      "file": image.id,
      "audio": image.audioId !== undefined && image.audioId ? image.id : undefined
    });
  }
  const descriptor = {
    "gameId": "iWriteWords",
    "title": "הַקְלֵק עַל הָאוֹתִיּוֹת מֵהָרִאשׁוֹנָה לָאַחֲרוֹנָה",
    "settingsTitle": "בחר את המילים שתופענה במשחק",
    "words": words
  }

  return descriptor;
}

export function generateLetterMatchDescriptor() {
  const images: Array<ImageCatalogEntryType> = MediaUtil.getRandomCatalogImages(10, "letterMatch", true);
  let itemsList = [];
  let groupIds: Array<string> = [];
  for (let i=0; i < images.length; i++) {
    const image = images[i];
    if (image.metadata !== undefined && image.metadata.firstLetter !== undefined) {
      itemsList.push(
        {
          "id": image.id,
          "title": image.title,
          "image": image.id,
          "groupId": image.metadata!.firstLetter
        }  
      );
      if (!groupIds.includes(image.metadata!.firstLetter)) {
        groupIds.push(image.metadata!.firstLetter)
      }
    }
  }

  let groups = [];
  let titleVariableValues = [];
  for (let i=0; i < hebrewLetters.length; i++) {
    const letter = hebrewLetters[i];
    if (groupIds.includes(letter.id)) {
      groups.push({
        id: letter.id,
        title: letter.title,
        name: letter.name
      })

      titleVariableValues.push(letter.name);
    }
  }

  let descriptor = {
    "gameId": "letterMatch",
    "showSettings": true,
    "titleTemplate": "בְּחַר תְּמוּנָה עִם דָּבָר שֶׁמַּתְחִיל בָּאוֹת $value$",
    "titleVariableValues": titleVariableValues,
    "showAdvise": true,
    "adviseText": "הסתכל מה האות הראשונה בכל אחת מהמילים",
    "settingsTitle": "סמן את האותיות שיופיעו במשחק",
    "items": itemsList,
    "groups": groups
    }

  return descriptor;
}

export function generateWordMatchDescriptor() {
  const images: Array<ImageCatalogEntryType> = MediaUtil.getRandomCatalogImages(10, "wordMatch", true);
  let titleList = [];
  let groupList = [];
  let itemsList = [];
  for (let i=0; i < images.length; i++) {
    const image = images[i];
    titleList.push(image.title);
    groupList.push({
      "id": image.id,
      "title": image.title,
      "name": image.title
    });
    itemsList.push({
      "id": image.id,
      "title": image.title,
      "image": image.id,
      "groupId": image.id
    });
  }

  let descriptor = {
    "gameId": "wordMatch",
    "showSettings": true,
    "titleTemplate": "בְּחַר תְּמוּנָה שֶׁל $value$",
    "titleVariableValues": titleList,
    "showAdvise": true,
    "adviseText": "קרא כל אחת מהמילים",
    "groups": groupList,
    "items": itemsList  
  }

  return descriptor;
}