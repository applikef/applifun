export class DeviceUtil {
  static imageSize: number = 150; 
  static tabletRatio: number = 0.5;

  public static imageHeightSmall(isTablet: boolean): string {
    const sizedIamge: number = DeviceUtil.imageSize * 0.5;
    return `${(isTablet ? (sizedIamge * DeviceUtil.tabletRatio) : sizedIamge).toString()}px`;
  }
  
  public static imageHeightMedium(isTablet: boolean): string {
    const sizedIamge: number = DeviceUtil.imageSize * 0.75;
    return `${(isTablet ? (sizedIamge * DeviceUtil.tabletRatio) : sizedIamge).toString()}px`;
  }
  
  public static imageHeight(isTablet: boolean): string {
    const sizedIamge: number = DeviceUtil.imageSize;
    return `${(isTablet ? (sizedIamge * DeviceUtil.tabletRatio) : sizedIamge).toString()}px`;
  }
  
  public static imageHeightLarge(isTablet: boolean): string {
    const sizedIamge: number = DeviceUtil.imageSize * 1.5;
    return `${(isTablet ? (sizedIamge * DeviceUtil.tabletRatio) : sizedIamge).toString()}px`;
  }

  public static getImageSizeAsStr(isTablet: boolean, size: number): string {
    return `${(isTablet ? (size * DeviceUtil.tabletRatio) : size).toString()}px`;
  }

  public static getImageSize(isTablet: boolean, size: number): number {
    return isTablet ? (size * DeviceUtil.tabletRatio) : size;
  }
}