const smallScreenWidth = 1300;

export class DeviceUtil {
  public static fullSizeIamge: string = "150px"; 
  public static smallSizeIamge: string = "100px";

  public static isSmallDevice() {
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
}