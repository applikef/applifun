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
  alternativeSpelling?: string;
}

export interface ImageCatalogEntryType {
  id: string;
  url: string;
  imageType?: CATALOG_IMAGE_TYPE;
  isTransparent?: boolean;
  audioId?: string;
  title?: string;
  gameIds?: Array<string>;
  metadata?: MetaDataType;
}