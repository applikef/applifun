const smallScreenWidth = 1300;

export class DeviceUtil {
  public static isSmallDevice() {
    const isSmall = window.innerWidth < smallScreenWidth;
    return isSmall;
  }
}