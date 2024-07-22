const smallScreenWidth = 1000;

export class DeviceUtil {
  static fullSizeIamge: number = 150; 
  static smallSizeIamge: number = 100;

  static isSmallDevice() {
    const isSmall = window.innerWidth < smallScreenWidth;
    return isSmall;
  }

  public static isMobileDevice() {
    const mobile = 
      (navigator.userAgent.match(/Android/i)
         || navigator.userAgent.match(/webOS/i)
         || navigator.userAgent.match(/iPhone/i)
         || navigator.userAgent.match(/iPad/i)
         || navigator.userAgent.match(/iPod/i)
         || navigator.userAgent.match(/BlackBerry/i)
         || navigator.userAgent.match(/Windows Phone/i)
      );
    return mobile;
  }
  
  public static imageHeightSmall(): string {
    const smallSizeIamge: string = `${DeviceUtil.smallSizeIamge * 0.5}px`;
    const fullSizeIamge: string = `${DeviceUtil.fullSizeIamge * 0.5}px`;
    return DeviceUtil.isSmallDevice() ? smallSizeIamge : fullSizeIamge;
  }
  
  public static imageHeightMedium(): string {
    const smallSizeIamge: string = `${DeviceUtil.smallSizeIamge * 0.75}px`;
    const fullSizeIamge: string = `${DeviceUtil.fullSizeIamge * 0.75}px`;
    return DeviceUtil.isSmallDevice() ? smallSizeIamge : fullSizeIamge;
  }
  
  public static imageHeight(): string {
    const smallSizeIamge: string = `${DeviceUtil.smallSizeIamge}px`;
    const fullSizeIamge: string = `${DeviceUtil.fullSizeIamge}px`;
    return DeviceUtil.isSmallDevice() ? smallSizeIamge : fullSizeIamge;
  }
  
  public static imageHeightLarge(): string {
    const smallSizeIamge: string = `${DeviceUtil.smallSizeIamge * 1.5}px`;
    const fullSizeIamge: string = `${DeviceUtil.fullSizeIamge * 1.5}px`;
    return DeviceUtil.isSmallDevice() ? smallSizeIamge : fullSizeIamge;
  }
}