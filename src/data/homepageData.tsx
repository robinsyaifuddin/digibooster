
// Sample data for the homepage

export interface NewsItemProps {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
  link: string;
}

export interface PartnerProps {
  id: string;
  name: string;
  logo: string;
  description?: string;
}

export interface TestimonialProps {
  id: string;
  name: string;
  role: string;
  content: string;
  image: string;
  rating: number;
}

// Latest news data
export const latestNews: NewsItemProps[] = [
  {
    id: '1',
    title: 'DigiBooster Luncurkan Layanan Web Development Terbaru',
    excerpt: 'DigiBooster memperkenalkan layanan web development terbaru dengan teknologi React dan NextJS untuk performa website yang lebih baik.',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    date: '15 Mei 2023',
    category: 'Web Development',
    link: '/berita/web-development-terbaru'
  },
  {
    id: '2',
    title: 'Pentingnya Digital Marketing di Era Post-Pandemic',
    excerpt: 'Pelajari bagaimana strategi digital marketing yang tepat dapat membantu bisnis Anda bertahan dan berkembang di era pasca pandemi.',
    image: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    date: '8 Mei 2023',
    category: 'Digital Marketing',
    link: '/berita/digital-marketing-post-pandemic'
  },
  {
    id: '3',
    title: 'Tips Memilih Jasa Desain Grafis Profesional',
    excerpt: 'Ketahui beberapa tips penting dalam memilih jasa desain grafis profesional untuk kebutuhan branding bisnis Anda.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    date: '29 April 2023',
    category: 'Desain Grafis',
    link: '/berita/tips-jasa-desain-grafis'
  },
  {
    id: '4',
    title: 'DigiBooster Berhasil Implementasikan Solusi E-commerce untuk UMKM',
    excerpt: 'DigiBooster berhasil membantu puluhan UMKM di Indonesia untuk bertransformasi digital dengan solusi e-commerce terjangkau.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    date: '20 April 2023',
    category: 'E-commerce',
    link: '/berita/solusi-ecommerce-umkm'
  },
  {
    id: '5',
    title: 'Workshop Digital Marketing DigiBooster Digelar di Jakarta',
    excerpt: 'DigiBooster akan menggelar workshop digital marketing gratis untuk para pelaku UMKM di Jakarta pada bulan Juni mendatang.',
    image: 'https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    date: '15 April 2023',
    category: 'Event',
    link: '/berita/workshop-digital-marketing'
  },
];

// Partner data
export const partners: PartnerProps[] = [
  {
    id: '1',
    name: 'Google',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png',
    description: 'Google Partner'
  },
  {
    id: '2',
    name: 'Microsoft',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png',
    description: 'Microsoft Partner'
  },
  {
    id: '3',
    name: 'Amazon Web Services',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/2560px-Amazon_Web_Services_Logo.svg.png',
    description: 'AWS Partner'
  },
  {
    id: '4',
    name: 'Facebook',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png',
    description: 'Meta Business Partner'
  },
  {
    id: '5',
    name: 'Shopify',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Shopify_logo_2018.svg/2560px-Shopify_logo_2018.svg.png',
    description: 'Shopify Partner'
  },
  {
    id: '6',
    name: 'HubSpot',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/HubSpot_Logo.svg/2560px-HubSpot_Logo.svg.png',
    description: 'HubSpot Partner'
  },
];

// Featured testimonials
export const testimonials: TestimonialProps[] = [
  {
    id: '1',
    name: 'Lania',
    role: 'Owner zenboard.id',
    content: 'Voodoo recomended banget, menurut saya itu jasa paling clex sih. Dijamin pek rapi hasilnya memuaskan!!!!',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
    rating: 5
  },
  {
    id: '2',
    name: 'Alvin Rahman',
    role: 'Owner sixtwogkarta.com',
    content: 'Pelayananya cepat, hasil bagusss, udah bikin 5 bulanan yang lalu terus minta tolong ada yg di edit masih bisa dibanggiin!!!',
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
    rating: 5
  },
  {
    id: '3',
    name: 'John Smith',
    role: 'Marketing rentalspace.web.id',
    content: 'Voodoo sangat membantu dlm membuat website, kerja dengan cepat, dan hasil website memuaskan banget!',
    image: 'https://randomuser.me/api/portraits/men/3.jpg',
    rating: 5
  },
  {
    id: '4',
    name: 'Sarah Johnson',
    role: 'CEO IndieMart',
    content: 'DigiBooster telah membantu kami meningkatkan penjualan online sebesar 200% dalam waktu hanya 3 bulan. Layanan mereka luar biasa!',
    image: 'https://randomuser.me/api/portraits/women/4.jpg',
    rating: 5
  },
  {
    id: '5',
    name: 'Michael Wong',
    role: 'Marketing Director FastGrow',
    content: 'Saya sangat terkesan dengan profesionalisme tim DigiBooster. Mereka tidak hanya membangun website yang bagus tetapi juga memberikan strategi digital yang komprehensif.',
    image: 'https://randomuser.me/api/portraits/men/5.jpg',
    rating: 4
  },
  {
    id: '6',
    name: 'Amanda Putri',
    role: 'Founder BeautyCo',
    content: 'Berkat bantuan DigiBooster, toko online saya kini mendapat pesanan dari seluruh Indonesia. Terima kasih untuk layanan luar biasa ini!',
    image: 'https://randomuser.me/api/portraits/women/6.jpg',
    rating: 5
  },
];
