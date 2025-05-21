
import { ReactNode } from 'react';

export interface ClassDetail {
  duration: string;
  schedule?: string;
  participants?: string;
  level: string;
  instructor?: string;
  price?: string;
  location?: string;
}

export interface Class {
  id?: string; // Make id optional to match existing data structure
  icon?: ReactNode;
  iconComponent?: string;
  title: string;
  description?: string;
  image?: string;
  details: ClassDetail;
  topics?: string[];
  featured?: boolean;
}
