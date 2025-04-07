
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  content: string[];
  tags: string[];
  relatedImages?: string[];
}

export type BlogCategory = 'all' | 'teknologi' | 'pengembangan diri' | 'wirausaha' | 'prestasi' | 'informasi';
