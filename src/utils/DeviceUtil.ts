const smallScreenWidth = 1300;

export class DeviceUtil {
  static fullSizeIamge: string = "150px"; 
  static smallSizeIamge: string = "100px";

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
  
  public static imageHeight(): string {
    return DeviceUtil.isSmallDevice() ? DeviceUtil.smallSizeIamge : DeviceUtil.fullSizeIamge;
  }
}