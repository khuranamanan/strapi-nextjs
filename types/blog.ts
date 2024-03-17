import { BlocksContent } from "@strapi/blocks-react-renderer";

export type BlogListType = {
  data: BlogListItem[];
  meta: PaginationMeta;
};

type BlogListItem = {
  id: number;
  attributes: BlogAttributes;
};

type BlogAttributes = {
  title: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  cover: Cover;
  category: Category;
};

type Cover = {
  data: ImageDataType;
};

type Category = {
  data: {
    id: number;
    attributes: {
      name: string;
      slug: string;
    };
  };
};

type ImageDataType = {
  id: number;
  attributes: ImageAttributes;
};

type ImageAttributes = {
  formats: ImageFormats;
  url: string;
};

type ImageFormats = {
  thumbnail: ImageFormat;
  large: ImageFormat;
  small: ImageFormat;
  medium: ImageFormat;
};

type ImageFormat = {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: any;
  width: number;
  height: number;
  size: number;
  url: string;
};

type PaginationMeta = {
  pagination: PaginationInfo;
};

type PaginationInfo = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

export type BlogItemType = {
  title: string;
  data: BlogItem[];
  meta: PaginationMeta;
};

type BlogItem = {
  id: number;
  attributes: BlogItemAttributes;
};

type BlogItemAttributes = {
  title: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  authorsBio: AuthorBio;
  cover: Cover;
  category: Category;
  blocks: Block[];
};

type AuthorBio = {
  data: AuthorData;
};

type AuthorData = {
  id: number;
  attributes: AuthorAttributes;
};

type AuthorAttributes = {
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  avatar: ImageDataType;
  articles: Article[];
};

type Article = {
  id: number;
  attributes: {
    title: string;
    description: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
};

export type Block = {
  id: number;
  __component: BlockComponent;
  body?: string;
  content?: BlocksContent;
  files?: Files;
  title?: string;
  author?: string;
  file?: { data: File };
  url?: string;
  width?: string;
  height?: string;
};

type BlockComponent =
  | "shared.rich-text"
  | "shared.slider"
  | "shared.quote"
  | "shared.media"
  | "shared.video-embed";

export interface Files {
  data: File[];
}

export interface File {
  id: number;
  attributes: Attributes;
}

export interface Attributes {
  name: string;
  alternativeText: any;
  caption: any;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: any;
  provider: string;
  provider_metadata: any;
  createdAt: string;
  updatedAt: string;
}

export interface Formats {
  thumbnail: Thumbnail;
  small?: Small;
  medium?: Medium;
  large?: Large;
}

export interface Thumbnail {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: any;
  width: number;
  height: number;
  size: number;
  sizeInBytes?: number;
  url: string;
}

export interface Small {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: any;
  width: number;
  height: number;
  size: number;
  url: string;
  sizeInBytes?: number;
}

export interface Medium {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: any;
  width: number;
  height: number;
  size: number;
  url: string;
}

export interface Large {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: any;
  width: number;
  height: number;
  size: number;
  url: string;
}
