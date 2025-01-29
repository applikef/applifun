export enum CATALOG_IMAGE_TYPE {
  PICTURE,
  CLIPART
}

export interface ImageCatalogType {
  images: Array<ImageCatalogEntryType>;
  emptyImageUrl: string
}

export interface MetaDataType {
  firstLetter?: string;
}

export interface ImageCatalogEntryType {
  id: string;
  url: string;
  imageType?: CATALOG_IMAGE_TYPE;
  isTransparent?: boolean;
  title?: string;
  gameIds?: Array<string>;
  metadata?: MetaDataType;
}