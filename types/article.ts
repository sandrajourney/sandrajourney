export type ArticleFrontmatter = {
  title: string;
  description: string;
  slug: string;
  cover: string;
  author: string;
  category: string;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  featured?: boolean;
  readingTime?: string;
  draft?: boolean;
};

export type TocItem = {
  id: string;
  title: string;
  level: number;
};

export type Article = ArticleFrontmatter & {
  body: string;
  readingTime: string;
  wordCount: number;
  toc: TocItem[];
};
