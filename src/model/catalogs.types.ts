export interface ImageCatalogType {
  images: Array<ImageCatalogEntryType>;
  emptyImageUrl: string
}

export interface ImageCatalogEntryType {
  id: string;
  url: string;
  title?: string;
  gameIds?: Array<string>;
}