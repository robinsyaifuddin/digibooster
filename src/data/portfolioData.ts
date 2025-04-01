
import { PortfolioItemType } from '@/types/portfolioTypes';

export const portfolioItems: PortfolioItemType[] = [
  {
    id: 1,
    title: "E-Commerce Platform Redesign",
    client: "TechStore Indonesia",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2089&q=80",
    description: "Complete redesign of an e-commerce platform with focus on user experience and conversion optimization.",
    services: ["UI/UX Design", "Frontend Development", "Backend Development", "SEO Optimization"]
  },
  {
    id: 2,
    title: "Corporate Branding & Website",
    client: "InvestBiz Group",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1542744094-24638eff58bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    description: "Full branding package and responsive website design for a financial consulting firm.",
    services: ["Brand Strategy", "Logo Design", "Website Design", "Marketing Materials"]
  },
  {
    id: 3,
    title: "Restaurant Online Ordering System",
    client: "Spice Garden Restaurant",
    category: "App Development",
    image: "https://images.unsplash.com/photo-1555421689-491a97ff2040?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Custom online ordering system with integrated payment processing and order management dashboard.",
    services: ["Mobile App Development", "Payment Integration", "Backend Development", "UI/UX Design"]
  },
  {
    id: 4,
    title: "Digital Marketing Campaign",
    client: "EcoLife Products",
    category: "Digital Marketing",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2426&q=80",
    description: "Comprehensive digital marketing campaign across multiple channels to promote sustainable products.",
    services: ["Social Media Marketing", "Content Strategy", "SEO", "PPC Advertising"]
  },
  {
    id: 5,
    title: "Educational Platform",
    client: "LearnSmart Academy",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
    description: "Online learning platform with course management, student tracking, and interactive learning features.",
    services: ["E-Learning Development", "Frontend Development", "Backend Development", "UI/UX Design"]
  },
  {
    id: 6,
    title: "Real Estate Virtual Tours",
    client: "PrimeProperties",
    category: "3D & Visualization",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80",
    description: "360° virtual property tours with interactive features for a premium real estate agency.",
    services: ["3D Modeling", "VR Development", "Interactive Design", "Web Integration"]
  }
];

export const portfolioFilters = [
  "All",
  "Web Development",
  "Branding",
  "App Development",
  "Digital Marketing",
  "3D & Visualization"
];

export default {
  portfolioItems,
  portfolioFilters
};
