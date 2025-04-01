
import { PortfolioItemType } from '@/types/portfolioTypes';

const portfolioData: PortfolioItemType[] = [
  {
    id: "1", // Changed from number to string
    title: "E-commerce Website Redesign",
    description: "A complete redesign of an e-commerce platform focused on improving user experience and conversion rates.",
    category: "Web Design",
    client: "Fashion Retailer",
    services: ["UI/UX Design", "Front-end Development", "SEO Optimization"],
    image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=2070&auto=format&fit=crop",
    slug: "ecommerce-redesign"
  },
  {
    id: "2", // Changed from number to string
    title: "Mobile Banking App",
    description: "A secure and user-friendly mobile banking application with advanced features like biometric authentication and real-time notifications.",
    category: "Mobile App",
    client: "Regional Bank",
    services: ["Mobile App Development", "UX Research", "Security Implementation"],
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1968&auto=format&fit=crop",
    slug: "mobile-banking-app"
  },
  {
    id: "3", // Changed from number to string
    title: "Corporate Branding",
    description: "A complete brand identity overhaul including logo design, typography, color palette, and brand guidelines.",
    category: "Branding",
    client: "Tech Startup",
    services: ["Logo Design", "Brand Strategy", "Brand Guidelines"],
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop",
    slug: "corporate-branding"
  },
  {
    id: "4", // Changed from number to string
    title: "Social Media Campaign",
    description: "A comprehensive social media campaign across multiple platforms to increase brand awareness and engagement.",
    category: "Digital Marketing",
    client: "Food Delivery Service",
    services: ["Content Strategy", "Social Media Management", "Analytics & Reporting"],
    image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=2074&auto=format&fit=crop",
    slug: "social-media-campaign"
  },
  {
    id: "5", // Changed from number to string
    title: "Educational Platform",
    description: "An interactive e-learning platform designed to make online education engaging and accessible for students of all ages.",
    category: "Web Development",
    client: "Education Foundation",
    services: ["Full-stack Development", "Content Management", "User Testing"],
    image: "https://images.unsplash.com/photo-1610484826967-09c5720778c7?q=80&w=2070&auto=format&fit=crop",
    slug: "educational-platform"
  },
  {
    id: "6", // Changed from number to string
    title: "IoT Dashboard Interface",
    description: "A real-time dashboard for monitoring and controlling IoT devices with data visualization and analytics capabilities.",
    category: "UI/UX Design",
    client: "Smart Home Solutions",
    services: ["UI Design", "Front-end Development", "Data Visualization"],
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=2070&auto=format&fit=crop",
    slug: "iot-dashboard"
  }
];

export default portfolioData;
