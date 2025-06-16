# DigiBooster Indonesia

## 🚀 Platform Layanan Jasa Digital Terbaik

**Tagline: "Skill Up, Stand Up!"**

DigiBooster Indonesia adalah platform layanan jasa digital komprehensif yang membantu bisnis bertransformasi ke era digital dengan solusi profesional dan terukur. Kami hadir sebagai partner digital terpercaya untuk pertumbuhan bisnis Anda.

## 📋 Daftar Isi

- [Tentang Proyek](#tentang-proyek)
- [Fitur Utama](#fitur-utama)
- [Teknologi](#teknologi)
- [Struktur Proyek](#struktur-proyek)
- [Layanan](#layanan)
- [Instalasi](#instalasi)
- [Penggunaan](#penggunaan)
- [Sistem Pembayaran](#sistem-pembayaran)
- [Admin Dashboard](#admin-dashboard)
- [API dan Integrasi](#api-dan-integrasi)
- [Deployment](#deployment)
- [Kontribusi](#kontribusi)
- [Lisensi](#lisensi)

## 🎯 Tentang Proyek

DigiBooster Indonesia adalah platform full-stack yang dibangun dengan teknologi modern untuk menyediakan layanan digital komprehensif meliputi:

- **Jasa Digital**: Website, aplikasi mobile, desain grafis, digital marketing
- **Pelatihan Digital**: Bootcamp, workshop, dan kursus online
- **Konsultasi Bisnis**: Strategi digital dan transformasi bisnis
- **Motivasi & Edukasi**: Seminar dan program pengembangan diri

### Tujuan Utama
- Membantu UMKM dan bisnis bertransformasi digital
- Menyediakan platform pembelajaran digital yang accessible
- Menciptakan ekosistem digital yang supportif
- Memfasilitasi pertumbuhan ekonomi digital Indonesia

## ✨ Fitur Utama

### 🏠 Homepage & Landing
- **Hero Section** dinamis dengan animasi Framer Motion
- **Logo Marquee** partner terpercaya
- **Portfolio Showcase** dengan filter kategori
- **Services Grid** dengan detail lengkap
- **Testimonials** dari klien satisfaction
- **Call-to-Action** strategis untuk konversi

### 💼 Layanan Digital
- **Website Development**: Landing page, company profile, e-commerce
- **Mobile Apps**: iOS dan Android development
- **Digital Marketing**: SEO, SEM, social media management
- **Branding & Design**: Logo, brand identity, UI/UX design
- **Video & Animation**: Motion graphics, video promosi

### 🎓 Sistem Pelatihan
- **Course Management**: Katalog kursus dengan filter
- **Learning Path**: Jalur pembelajaran terstruktur
- **Progress Tracking**: Monitor kemajuan siswa
- **Certificate System**: Sertifikat digital otomatis

### 💳 Sistem Pembayaran
- **Multi Payment Gateway**: QRIS, Dana, Transfer Bank
- **Invoice Generation**: PDF otomatis dengan QR code unik
- **DP System**: Pembayaran down payment 40%
- **Payment Tracking**: Status pembayaran real-time
- **WhatsApp Integration**: Konfirmasi otomatis

### 🤖 AI Chatbot
- **24/7 Customer Support**: Respons otomatis intelligent
- **Service Information**: Detail layanan dan harga
- **Lead Generation**: Capture prospek otomatis
- **Conversation Flow**: Dialog natural dan engaging

### 📱 Portfolio & Blog
- **Dynamic Portfolio**: Showcase project dengan detail
- **Blog System**: Content management terintegrasi
- **SEO Optimized**: Meta tags dan structured data
- **Social Sharing**: Integrasi media sosial

### 👨‍💼 Admin Dashboard
- **Content Management**: Update konten real-time
- **User Management**: Kelola user dan permissions
- **Analytics**: Tracking performa website
- **Settings**: Konfigurasi website komprehensif

## 🛠 Teknologi

### Frontend Framework
```json
{
  "React": "^18.3.1",
  "TypeScript": "Latest",
  "Vite": "Build tool",
  "Tailwind CSS": "^3.x",
  "Framer Motion": "^12.6.3"
}
```

### UI Components
```json
{
  "Shadcn/UI": "Modern UI components",
  "Radix UI": "Accessible primitives",
  "Lucide React": "Icon system",
  "Sonner": "Toast notifications"
}
```

### State Management
```json
{
  "Zustand": "^5.0.3",
  "TanStack Query": "^5.56.2",
  "React Context": "Built-in state"
}
```

### Backend Integration
```json
{
  "Supabase": "Database & Auth",
  "Edge Functions": "Serverless API",
  "Real-time": "Live updates"
}
```

### Payment & Utilities
```json
{
  "jsPDF": "^3.0.1",
  "React Router": "^6.26.2",
  "Date-fns": "^3.6.0"
}
```

## 📁 Struktur Proyek

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Shadcn/UI components
│   ├── home/            # Homepage sections
│   ├── admin/           # Admin dashboard
│   ├── services/        # Service components
│   ├── portfolio/       # Portfolio display
│   ├── blog/            # Blog components
│   └── chatbot/         # AI chatbot
├── pages/               # Route pages
│   ├── Home.tsx         # Homepage
│   ├── JasaDigital.tsx  # Services page
│   ├── OrderForm.tsx    # Order & payment
│   ├── AdminDashboard.tsx
│   └── ...
├── data/                # Static data & configurations
│   ├── jasaDigitalData.tsx
│   ├── portfolioData.ts
│   ├── chatBotData.ts
│   └── ...
├── hooks/               # Custom React hooks
├── contexts/            # React contexts
├── stores/              # Zustand stores
├── types/               # TypeScript definitions
├── utils/               # Utility functions
└── integrations/        # Third-party integrations
```

## 🎯 Layanan

### 💻 Website & Aplikasi
- **Landing Page**: Rp 3.500.000
- **Company Profile**: Rp 7.000.000
- **E-commerce**: Rp 14.000.000
- **Web Aplikasi**: Rp 21.000.000
- **Mobile Apps**: Rp 35.000.000

### 📱 Digital Marketing
- **Social Media Management**: Rp 2.100.000
- **Content Marketing**: Rp 2.800.000
- **SEO Optimization**: Rp 4.200.000
- **Google Ads**: Rp 3.500.000
- **Facebook Ads**: Rp 2.800.000

### 🎨 Branding & Design
- **Logo Design**: Rp 1.400.000
- **Brand Identity**: Rp 2.800.000
- **UI/UX Design**: Rp 4.200.000
- **Print Design**: Rp 1.050.000

### 🎥 Video & Animation
- **Video Promosi**: Rp 4.200.000
- **Motion Graphics**: Rp 3.500.000
- **Video Editing**: Rp 2.100.000
- **Animation 2D**: Rp 7.000.000

## 🔧 Instalasi

### Prerequisites
```bash
Node.js >= 18.0.0
npm atau yarn
Git
```

### Clone Repository
```bash
git clone https://github.com/your-username/digibooster-indonesia.git
cd digibooster-indonesia
```

### Install Dependencies
```bash
npm install
# atau
yarn install
```

### Environment Setup
```bash
# Copy environment template
cp .env.example .env.local

# Configure environment variables
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Run Development Server
```bash
npm run dev
# atau
yarn dev
```

Aplikasi akan berjalan di `http://localhost:5173`

## 🚀 Penggunaan

### Customer Journey

1. **Discovery**: Landing di homepage, explore services
2. **Selection**: Pilih layanan dari katalog
3. **Consultation**: Chat dengan AI bot atau langsung kontak
4. **Ordering**: Isi form pemesanan dengan detail kebutuhan
5. **Payment**: Pilih metode pembayaran dan bayar DP
6. **Confirmation**: Terima invoice dan konfirmasi via WhatsApp
7. **Execution**: Tim mulai mengerjakan project
8. **Delivery**: Terima hasil dan lakukan pembayaran sisa

### Admin Workflow

1. **Dashboard**: Monitor orders dan analytics
2. **Content**: Update services, portfolio, blog
3. **Users**: Kelola customer dan team
4. **Settings**: Konfigurasi website dan payment

## 💰 Sistem Pembayaran

### Payment Methods
- **QRIS**: Universal QR payment
- **Dana**: Digital wallet transfer
- **Bank Transfer**: SeaBank account

### Pricing Structure
```javascript
const servicePrices = {
  'Website & Aplikasi': {
    'Landing Page': 3500000,      // +40% markup
    'Company Profile': 7000000,
    'E-commerce': 14000000,
    'Web Aplikasi': 21000000,
    'Mobile Apps': 35000000
  },
  'Digital Marketing': {
    'Social Media Management': 2100000,
    'Content Marketing': 2800000,
    'SEO Optimization': 4200000,
    'Google Ads': 3500000,
    'Facebook Ads': 2800000
  }
  // ... other categories
}
```

### Payment Flow
1. **DP 40%**: Down payment untuk memulai project
2. **Invoice Generation**: PDF otomatis dengan QR code
3. **WhatsApp Integration**: Konfirmasi pembayaran
4. **Progress Tracking**: Monitor status pembayaran
5. **Final Payment**: 60% setelah project selesai

## 🔐 Admin Dashboard

### Features
- **Content Management**: Update real-time
- **User Management**: Role-based access
  **Demo Account** : Demo User [ pengguna@gmail | pengguna123 ] & Demo Admin : [ admin.digibooster@gmail.com | digibooster123 ]
- **Analytics Dashboard**: Performance metrics
- **Settings Panel**: Website configuration
- **File Manager**: Asset management

### Access Levels
- **Super Admin**: Full access
- **Admin**: Content & user management
- **Editor**: Content only
- **Viewer**: Read-only access

## 🔌 API dan Integrasi

### Supabase Integration
```javascript
// Database tables
- users (authentication)
- orders (customer orders)
- services (service catalog)
- portfolio (project showcase)
- blog_posts (content management)
```

### WhatsApp API
```javascript
// Automatic message formatting
const whatsappUrl = `https://wa.me/6285768192419?text=${encodedMessage}`;
```

### PDF Generation
```javascript
// jsPDF untuk invoice
const generateInvoicePDF = () => {
  // Professional invoice layout
  // QR code integration
  // Digital signature
}
```

## 🌐 Deployment

### Lovable Platform
```bash
# Automatic deployment
1. Connect GitHub repository
2. Configure environment variables
3. Deploy dengan satu klik
```

### Custom Domain
```bash
# Setup custom domain
1. Project → Settings → Domains
2. Add your domain
3. Configure DNS settings
```

### Environment Variables
```bash
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_ENVIRONMENT=production
```

## 🤝 Kontribusi

### Development Guidelines
1. Fork repository
2. Create feature branch
3. Follow TypeScript conventions
4. Write descriptive commit messages
5. Create pull request

### Code Standards
- **TypeScript**: Strict mode enabled
- **ESLint**: Code quality checks
- **Prettier**: Code formatting
- **Component Structure**: Atomic design principles

### Testing
```bash
npm run test          # Unit tests
npm run test:e2e      # End-to-end tests
npm run lint          # Code linting
npm run type-check    # TypeScript validation
```

## 📞 Kontak & Support

### Tim DigiBooster
- **CEO**: Robin Syaifuddin
- **Email**: hello.digibooster@gmail.com
- **WhatsApp**: +62 857-6819-2419
- **Website**: https://digibooster.web.id

### Social Media
- **Instagram**: @digibooster.indonesia
- **LinkedIn**: DigiBooster Indonesia
- **YouTube**: DigiBooster Channel

## 📄 Lisensi

Proyek ini dilisensikan under MIT License - lihat file [LICENSE](LICENSE) untuk detail.

---

## 🎯 Roadmap

### Q1 2024
- [ ] Mobile app development
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Payment gateway expansion

### Q2 2024
- [ ] AI-powered project estimation
- [ ] Client portal development
- [ ] Advanced reporting system
- [ ] Integration marketplace

### Q3 2024
- [ ] White-label solutions
- [ ] Franchise management system
- [ ] Advanced SEO tools
- [ ] Marketing automation

---

**DigiBooster Indonesia** - Transforming businesses through digital innovation.

*"Skill Up, Stand Up!" - Bersama kami wujudkan visi digital Anda.*

## 📊 Project Stats

[![GitHub stars](https://img.shields.io/github/stars/your-username/digibooster-indonesia?style=social)](https://github.com/your-username/digibooster-indonesia/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/your-username/digibooster-indonesia?style=social)](https://github.com/your-username/digibooster-indonesia/network/members)
[![GitHub issues](https://img.shields.io/github/issues/your-username/digibooster-indonesia)](https://github.com/your-username/digibooster-indonesia/issues)
[![GitHub license](https://img.shields.io/github/license/your-username/digibooster-indonesia)](https://github.com/your-username/digibooster-indonesia/blob/main/LICENSE)

---

*Dokumentasi ini memberikan gambaran komprehensif tentang platform DigiBooster Indonesia - dari arsitektur teknis hingga business flow yang membantu developer, kontributor, dan stakeholder memahami project secara menyeluruh.*
