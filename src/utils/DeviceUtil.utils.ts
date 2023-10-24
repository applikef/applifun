export class DeviceUtil {
  public static isSmallDevice() {
    const isSmall = window.innerWidth < 1000;
    return isSmall;
  }
}