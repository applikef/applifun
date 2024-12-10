import { PlayListNames, PlayLists } from "../assets/playLists";

export class MediaUtil {
  private static imageCatalog = require("./../assets/catalogs/imageCatalog.json");
  private static audioCatalog = require("./../assets/catalogs/audioCatalog.json");

  public static getDefaultHoorayPlayer() {
    return new Audio("resources/audio/hooray-short-1.mp3");
  }

  public static getDefaultOuchPlayer() {
    return new Audio("resources/audio/ouch-2.mp3");
  }

  public static getPlayer(url: string) {
    return new Audio(url);
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

    let images: string[] = imageIds.map((id) => MediaUtil.imageCatalog[id]);
    return images;
  }

  public static getCatalogImage(imageId: string): string {
    return MediaUtil.imageCatalog[imageId];
  }

  public static getCatalogAudios(audioIds: string[] | undefined): string[] {
    if (audioIds === undefined) {
      return [];
    }

    let audios: string[] = audioIds.map((id) => MediaUtil.audioCatalog["resources"][id]);
    return audios;
  }

  public static getCatalogAudio(audioId: string | undefined): string | undefined {
    if (audioId === undefined) {
      return undefined;
    }

    return MediaUtil.audioCatalog["resources"][audioId];
  }

  public static getTextToSpeechAudios(audioIds: string[] | undefined): string[] {
    if (audioIds === undefined) {
      return [];
    }

    const audioFiles = require("./../assets/catalogs/audioCatalog.json");
    let audios: string[] = audioIds.map((id) => audioFiles["text-to-speech"][id]);
    return audios;
  }

  public static getTextToSpeechAudio(audioId: string | undefined): string | undefined {
    if (audioId === undefined) {
      return undefined;
    }

    return MediaUtil.audioCatalog["text-to-speech"][audioId];
  }
}