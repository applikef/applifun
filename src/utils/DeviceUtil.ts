const smallScreenWidth = 1300;

export class DeviceUtil {
  public static fullSizeIamge: string = "150px"; 
  public static smallSizeIamge: string = "100px";

  public static isSmallDevice() {
    const isSmall = window.innerWidth < smallScreenWidth;
    return isSmall;
  }
}