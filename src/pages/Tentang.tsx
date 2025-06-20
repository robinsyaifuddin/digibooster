import React from 'react';
import { motion } from 'framer-motion';
import { Play, Users, Award, Briefcase, Calendar, ChevronRight, Globe, Phone, Mail, MapPin, Clock, Star, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

// Components sederhana untuk animasi
const AnimatedCounter = ({
  value,
  label
}: {
  value: string;
  label: string;
}) => <motion.div initial={{
  opacity: 0,
  y: 20
}} whileInView={{
  opacity: 1,
  y: 0
}} viewport={{
  once: true
}} transition={{
  duration: 0.5
}} className="text-center">
    <div className="text-4xl font-bold text-sky-500 mb-2">{value}</div>
    <div className="text-gray-300">{label}</div>
  </motion.div>;
const TeamMember = ({
  name,
  role,
  image
}: {
  name: string;
  role: string;
  image: string;
}) => <motion.div initial={{
  opacity: 0,
  y: 20
}} whileInView={{
  opacity: 1,
  y: 0
}} viewport={{
  once: true
}} transition={{
  duration: 0.5
}} className="text-center">
    <div className="h-48 w-48 mx-auto overflow-hidden rounded-xl mb-4 bg-gray-800 relative group">
      <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-60 transition-opacity"></div>
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex justify-center space-x-3">
          <Button size="icon" variant="outline" className="w-8 h-8 rounded-full border-white bg-black/20 hover:bg-sky-500">
            <Globe className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
    <h3 className="font-bold text-white text-lg">{name}</h3>
    <p className="text-sky-400">{role}</p>
  </motion.div>;
const TimelineItem = ({
  year,
  title,
  description
}: {
  year: string;
  title: string;
  description: string;
}) => <motion.div initial={{
  opacity: 0,
  x: -20
}} whileInView={{
  opacity: 1,
  x: 0
}} viewport={{
  once: true
}} transition={{
  duration: 0.5
}} className="flex gap-6 relative">
    {/* Line */}
    <div className="absolute left-[19px] top-10 bottom-0 w-0.5 bg-gray-700 z-0"></div>
    
    {/* Circle */}
    <div className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center z-10 mt-1 flex-shrink-0">
      <Calendar className="h-5 w-5 text-white" />
    </div>
    
    <div className="pb-12">
      <div className="text-sky-400 font-bold mb-1">{year}</div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  </motion.div>;

// Values Card Component
const ValueCard = ({
  icon: Icon,
  title,
  description
}: {
  icon: any;
  title: string;
  description: string;
}) => <motion.div initial={{
  opacity: 0,
  y: 20
}} whileInView={{
  opacity: 1,
  y: 0
}} viewport={{
  once: true
}} className="bg-gray-900 p-6 rounded-xl hover:bg-sky-900/20 hover:border-sky-500/50 transition-colors border border-gray-800">
    <div className="w-12 h-12 bg-sky-500/20 rounded-lg flex items-center justify-center mb-4">
      <Icon className="h-6 w-6 text-sky-500" />
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </motion.div>;
const Tentang = () => {
  // Data for team members - Updated with new team information
  const team = [{
    name: "Robin Syaifuddin",
    role: "Chief Executive Officer",
    image: "/lovable-uploads/68a85b51-4989-4416-ba4d-7701a9d48530.png"
  }, {
    name: "Maya Lestari",
    role: "Chief Financial Officer",
    image: "/lovable-uploads/6cec3f7d-2579-4538-b949-ba5007dc1c83.png"
  }, {
    name: "Lucky Immanuel Sitanggang",
    role: "Chief Technology Officer",
    image: "/lovable-uploads/8bccbcf6-4d86-4cca-a788-2feec5d846d0.png"
  }, {
    name: "Ginda Fajar Riadi Marpaung",
    role: "Chief Data Officer",
    image: "/lovable-uploads/21cb9f56-1e4d-4f60-97eb-810f5747f284.png"
  }];
  return <div className="pt-16 bg-black min-h-screen">
      {/* Hero Section */}
      <div className="relative min-h-[70vh] w-full overflow-hidden">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81" alt="DigiBooster Team" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/70"></div>
        </div>
        
        {/* Content Container */}
        <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-center py-20">
          <div className="max-w-3xl">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.2
          }} className="mb-4">
              <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-white bg-sky-500/80 rounded-full">
                <span className="animate-pulse mr-2 h-2 w-2 rounded-full bg-white"></span>
                TENTANG KAMI
              </span>
            </motion.div>
            
            <motion.h1 initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.4
          }} className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
              DigiBooster Indonesia
            </motion.h1>
            
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.6
          }} className="flex items-center gap-4 mb-4">
              <span className="text-gray-400">Berdiri Sejak 2025</span>
              
              <span className="px-2 py-1 text-xs rounded-full bg-sky-500/20 border border-sky-500/30 text-sky-300">
                Trusted Company
              </span>
            </motion.div>
            
            <motion.p initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.8
          }} className="text-gray-300 mb-8 max-w-2xl">DigiBooster adalah perusahaan teknologi dan edukasi yang fokus pada percepatan digitalisasi Indonesia melalui layanan digital yang inovatif dan program pengembangan keterampilan digital bagi pemuda untuk meningkatkan keterampilan digital dan berkontribusi bagi bangsa.</motion.p>
            
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 1
          }} className="flex flex-wrap gap-4">
              
              
              <Link to="/kontak">
                <Button size="lg" variant="outline" className="rounded-full border-gray-600 text-white hover:bg-sky-500/20 hover:border-sky-500">
                  Kontak Kami
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{
          opacity: 0,
          x: -30
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }}>
            <h2 className="text-3xl font-bold text-white mb-6">Cerita Kami</h2>
            <p className="text-gray-300 mb-6">
              DigiBooster didirikan pada tahun 2025 dengan tujuan untuk membantu masyarakat dan bisnis di Indonesia 
              dalam mengoptimalkan peluang di era digital. Berawal dari sebuah ide sederhana di Lampung, kami percaya bahwa 
              akses terhadap pengetahuan dan keterampilan digital yang tepat dapat membuka peluang tak terbatas bagi pertumbuhan.
            </p>
            <p className="text-gray-300 mb-6">
              Meskipun masih berusia muda dengan pengalaman lebih dari 1 tahun, DigiBooster terus bertumbuh dan selalu 
              menempuh proses untuk menjadi lebih baik. Kini kami berkembang menjadi platform edukasi dan layanan digital 
              yang komprehensif dengan ratusan alumni dan klien dari berbagai industri di Indonesia.
            </p>
            <p className="text-gray-300">
              Misi kami adalah menjembatani kesenjangan digital di Indonesia melalui pendidikan dan layanan berkualitas tinggi, 
              siap untuk terbang tinggi hingga mencapai titik puncak di era digital. Kami berdedikasi untuk memenuhi kebutuhan 
              pasar yang terus berkembang dengan solusi inovatif.
            </p>
          </motion.div>
          
          <motion.div initial={{
          opacity: 0,
          x: 30
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="relative">
            <img alt="DigiBooster Office" className="rounded-2xl object-cover w-full h-[500px]" src="/lovable-uploads/002dbec1-5773-46af-8612-83877ff9e3d6.jpg" />
            <div className="absolute inset-0 border-2 border-sky-500/30 rounded-2xl transform translate-x-4 translate-y-4 -z-10"></div>
            <div className="absolute -bottom-4 -right-4 bg-sky-500 p-6 rounded-2xl shadow-xl">
              <div className="text-3xl font-bold text-white">1+</div>
              <div className="text-white text-sm">Tahun Pengalaman</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}

      {/* Values Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Nilai-Nilai Kami</h2>
          <p className="text-gray-300">
            Prinsip yang memandu kami dalam memberikan layanan dan pendidikan digital terbaik untuk membantu
            individu dan bisnis berkembang di era digital.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ValueCard icon={Award} title="Kualitas" description="Kami berkomitmen untuk memberikan kualitas terbaik dalam setiap aspek layanan dan pendidikan yang kami tawarkan." />
          <ValueCard icon={Users} title="Kolaborasi" description="Kami percaya bahwa kolaborasi yang baik akan menghasilkan solusi terbaik untuk setiap tantangan digital." />
          <ValueCard icon={Briefcase} title="Profesionalisme" description="Kami menjalankan bisnis dengan standar profesionalisme tertinggi dan etika yang kuat." />
        </div>
      </div>

      {/* Timeline Section */}

      {/* Team Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Tim Kami</h2>
          <p className="text-gray-300">
            Kenali para profesional berbakat yang bekerja keras di balik layar untuk memberikan layanan dan 
            pendidikan digital terbaik.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => <TeamMember key={index} name={member.name} role={member.role} image={member.image} />)}
        </div>
      </div>

      {/* Contact Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Kontak Kami</h2>
          <p className="text-gray-300">
            Siap untuk memulai perjalanan digital Anda? Tim ahli kami siap membantu mewujudkan 
            visi dan kebutuhan digital Anda dengan solusi terbaik.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gray-900 p-6 rounded-xl hover:bg-sky-900/20 hover:border-sky-500/50 transition-colors border border-gray-800"
          >
            <div className="w-12 h-12 bg-sky-500/20 rounded-lg flex items-center justify-center mb-4">
              <Phone className="h-6 w-6 text-sky-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Telepon</h3>
            <a href="tel:+6282279722417" className="text-gray-300 hover:text-sky-400 transition-colors">
              +62 822-7972-2417
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-gray-900 p-6 rounded-xl hover:bg-sky-900/20 hover:border-sky-500/50 transition-colors border border-gray-800"
          >
            <div className="w-12 h-12 bg-sky-500/20 rounded-lg flex items-center justify-center mb-4">
              <Mail className="h-6 w-6 text-sky-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Email</h3>
            <a href="mailto:hello.digibooster@gmail.com" className="text-gray-300 hover:text-sky-400 transition-colors break-all">
              hello.digibooster@gmail.com
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-gray-900 p-6 rounded-xl hover:bg-sky-900/20 hover:border-sky-500/50 transition-colors border border-gray-800"
          >
            <div className="w-12 h-12 bg-sky-500/20 rounded-lg flex items-center justify-center mb-4">
              <MapPin className="h-6 w-6 text-sky-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Lokasi</h3>
            <p className="text-gray-300">
              Way Kandis, Kec. Tanjung Senang,<br />
              Bandar Lampung, Lampung 35143
            </p>
          </motion.div>
        </div>

        {/* Working Hours */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl mx-auto mt-12"
        >
          <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center justify-center">
              <Clock className="w-6 h-6 text-sky-400 mr-3" />
              Jam Operasional
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-800/50">
                <span className="text-gray-400">Senin - Jumat</span>
                <span className="text-white font-medium">09:00 - 17:00</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-800/50">
                <span className="text-gray-400">Sabtu</span>
                <span className="text-white font-medium">09:00 - 15:00</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-400">Minggu</span>
                <span className="text-red-400 font-medium">Tutup</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-sky-900/50 to-black py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Siap Bergabung dengan Kami?
            </h2>
            <p className="text-gray-300 mb-8">
              Mari berkolaborasi untuk mengembangkan bisnis Anda atau tingkatkan keterampilan digital 
              Anda bersama DigiBooster.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/program/jasa-digital">
                <Button size="lg" className="bg-sky-500 hover:bg-sky-600 rounded-full text-white">
                  Jasa Digital
                </Button>
              </Link>
              <Link to="/program/kelas">
                <Button size="lg" variant="outline" className="rounded-full border-gray-600 text-white hover:bg-sky-500/20 hover:border-sky-500">
                  Program Kelas
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>;
};

export default Tentang;
