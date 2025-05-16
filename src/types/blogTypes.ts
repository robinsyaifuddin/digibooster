
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
  sources?: Source[];
  comments?: Comment[];
}

export interface Source {
  id: number;
  text: string;
  url: string;
}

export interface Comment {
  id: number;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  date: string;
  likes: number;
  replies?: Reply[];
}

export interface Reply {
  id: number;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  date: string;
  likes: number;
}

export type BlogCategory = 'all' | 'technology' | 'design' | 'business' | 'marketing' | 'teknologi' | 'pengembangan diri' | 'wirausaha' | 'prestasi' | 'informasi';
