import { PlayListNames, PlayLists } from "../assets/playLists";

export class MediaUtil {
  public static getDefaultHoorayPlayer() {
    return new Audio("resources/audio/hooray-short-1.mp3");
  }

  public static getDefaultOuchPlayer() {
    return new Audio("resources/audio/ouch-2.mp3");
  }

  public static play(url: string, audioOn: boolean) {
    if (audioOn) {
      const player = new Audio(url);
      player.play();
    }
  }

  public static player(player: HTMLAudioElement, audioOn: boolean) {
    if (audioOn) {
      player.play();
    }
  }

  public static pickAudio = (playList: string): string => {
    const list = PlayLists.get(playList);
    if (!list) {
      return PlayLists.get(PlayListNames.DEFAULT)![0];
    }
    const listLength = list.length;
    const itemIndex = Math.min(Math.floor(Math.random() * listLength), listLength-1);
    return list[itemIndex]; 
  }

  public static pickPlayer = (playList: string): HTMLAudioElement => {
    const url = this.pickAudio(playList);
    const player = new Audio(url);
    return player; 
  }

  public static getCatalogImages(imageIds: string[] | undefined): string[] {
    if (imageIds === undefined) {
      return [];
    }

    const imageFiles = require("./../assets/imageCatalog.json");
    let images: string[] = imageIds.map((id) => imageFiles[id]);
    return images;
  }

  public static getCatalogImage(imageId: string): string {
    const imageFiles = require("./../assets/imageCatalog.json");
    return imageFiles[imageId];
  }
}