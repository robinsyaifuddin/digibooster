
import { ReactNode } from 'react';

export interface ClassDetails {
  duration: string;
  participants: string;
  level: string;
  schedule: string;
}

export interface Class {
  icon: ReactNode;
  title: string;
  description: string;
  details: ClassDetails;
  topics: string[];
}
