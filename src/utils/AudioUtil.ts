export class AudioUtil {
  public static getHorrayPlayer() {
    return new Audio("resources/audio/hooray-short-1.mp3");
  }

  public static getOuchPlayer() {
    return new Audio("resources/audio/ouch-2.mp3");
  }

  public static getImages(imageIds: string[] | undefined): string[] {
    if (imageIds === undefined) {
      return [];
    }

    const imageFiles = require("./../assets/imageRepository.json");
    let images: string[] = imageIds.map((id) => imageFiles[id]);
    return images;
  }
}