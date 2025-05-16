
export interface PortfolioItemType {
  id: number;
  title: string;
  client: string;
  category: string;
  image: string;
  images?: string[]; // Adding images array property
  description: string;
  services: string[];
  year?: string | number; // Adding year property
  tags?: string[]; // Adding tags property
}
