type Base = {
  _createdAt: Date;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: Date;
}

export interface Post extends Base {
  author: Author;
  body: Block[];
  categories: Category[];
  mainImage: Image;
  slug: Slug;
  title: string;
  description: string;
  publishedAt: Date; // Changed this line
  customUrl: string; // 新しいプロパティ
}

interface Author extends Base {
  description: string;
  image: Image;
  name: string;
  slug: Slug;
}

interface Image {
  _type: "image";
  asset: Reference;
}

interface Reference {
  _type: "slug";
  current: string;
}

interface Slug {
  _type: "slug";
  current: string;
}

interface Block {
  _key: string;
  _type: "block";
  children: Span[];
  markDefs: any[];
  style: "normal" | "h1" | "h2" | "h3" | "h4" | "bloackquote" | "html" | "twitter";
}

interface Span {
  _key: string;
  _type: "span";
  marks: string[];
  text: string;
}

export interface Category extends Base {
  description: string;
  title: string;
}
