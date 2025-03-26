
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "../../hooks/use-toast";
import { Save, RefreshCw, Upload, Download, Code, PenLine, Layout, Globe, Database, Shield, 
  Palette, ArrowUpRight, History, Send, Clock, Check, AlertTriangle, Image, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

const WebsiteSettings = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // State untuk status operasi
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [publishProgress, setPublishProgress] = useState(0);
  const [isPublishDialogOpen, setIsPublishDialogOpen] = useState(false);
  
  // State untuk pengaturan website
  const [activeTheme, setActiveTheme] = useState("light");
  const [fontFamily, setFontFamily] = useState("inter");
  const [lastPublished, setLastPublished] = useState<string | null>(null);
  
  // State untuk form-form
  const [websiteName, setWebsiteName] = useState("DigiBooster");
  const [websiteDescription, setWebsiteDescription] = useState("Platform agensi dan pengembangan ekosistem digital Indonesia");
  const [websiteTagline, setWebsiteTagline] = useState("Skill Up, Stand Up");
  const [contactEmail, setContactEmail] = useState("hello.digibooster@gmail.com");
  const [contactPhone, setContactPhone] = useState("082279722417");
  const [contactAddress, setContactAddress] = useState("Way Kandis, Bandar Lampung");
  const [socialInstagram, setSocialInstagram] = useState("instagram.com/digibooster.id");
  
  // State untuk pengaturan
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [userRegistration, setUserRegistration] = useState(true);
  const [googleLogin, setGoogleLogin] = useState(true);
  const [blogComments, setBlogComments] = useState(true);
  
  // State untuk SEO
  const [metaTitle, setMetaTitle] = useState("DigiBooster - Platform Agensi dan Pengembangan Ekosistem Digital Indonesia");
  const [metaDescription, setMetaDescription] = useState("DigiBooster membantu masyarakat mengoptimalkan digitalisasi dengan berbagai layanan jasa digital, edukasi, dan konsultasi bisnis digital. Skill Up, Stand Up!");
  const [metaKeywords, setMetaKeywords] = useState("digital, agency, marketing, website, seo, edukasi digital, konsultasi digital");
  const [robotsIndexing, setRobotsIndexing] = useState(true);
  const [sitemapEnabled, setSitemapEnabled] = useState(true);
  const [canonicalUrls, setCanonicalUrls] = useState(true);
  const [schemaMarkup, setSchemaMarkup] = useState(true);
  
  // State untuk dialog
  const [logoUploadDialog, setLogoUploadDialog] = useState(false);
  const [faviconUploadDialog, setFaviconUploadDialog] = useState(false);
  const [aiDialogOpen, setAiDialogOpen] = useState(false);
  const [aiQuery, setAiQuery] = useState("");
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isAiThinking, setIsAiThinking] = useState(false);
  
  // State untuk preview halaman
  const [pagePreviewOpen, setPagePreviewOpen] = useState(false);
  const [previewPage, setPreviewPage] = useState<string | null>(null);
  
  // State untuk riwayat edit
  const [editHistory] = useState([
    { id: 1, date: "2023-08-20 10:23", user: "Admin DigiBooster", action: "Update Header Section", status: "active" },
    { id: 2, date: "2023-08-19 15:45", user: "Admin DigiBooster", action: "Update Footer Contact Info", status: "available" },
    { id: 3, date: "2023-08-18 09:12", user: "Admin DigiBooster", action: "Change Homepage Hero Banner", status: "available" },
    { id: 4, date: "2023-08-17 14:30", user: "Admin DigiBooster", action: "Add New Service Category", status: "available" },
    { id: 5, date: "2023-08-16 11:05", user: "Admin DigiBooster", action: "Update Website Colors", status: "available" },
  ]);
  
  // State untuk tema dan warna
  const [primaryColors] = useState(["#161759", "#1a1b7a", "#4824eb", "#6251fc", "#9997ff"]);
  const [selectedColor, setSelectedColor] = useState("#161759");

  useEffect(() => {
    // Simulasi perubahan tema jika diubah
    document.documentElement.classList.toggle('dark', activeTheme === 'dark');
    
    // Menerapkan warna utama yang dipilih ke CSS variables
    document.documentElement.style.setProperty('--primary-color', selectedColor);
    
    // Menerapkan font yang dipilih
    const fontClass = fontFamily === 'inter' ? 'font-inter' : 
                      fontFamily === 'poppins' ? 'font-poppins' : 
                      fontFamily === 'roboto' ? 'font-roboto' : 
                      fontFamily === 'montserrat' ? 'font-montserrat' : 'font-opensans';
    
    document.documentElement.className = document.documentElement.className
      .replace(/font-(inter|poppins|roboto|montserrat|opensans)/g, '')
      .concat(' ', fontClass);
      
  }, [activeTheme, selectedColor, fontFamily]);

  // Fungsi untuk menyimpan pengaturan
  const handleSave = () => {
    setSaving(true);
    
    // Mensimulasikan penyimpanan data ke backend
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Pengaturan berhasil disimpan",
        description: "Perubahan pada website telah disimpan dan siap dipublikasikan.",
      });
      
      // Menambahkan entri baru ke riwayat edit (dalam implementasi nyata akan menggunakan API)
      const now = new Date().toLocaleString('id-ID');
      
      // Update local storage untuk simulasi penyimpanan data
      localStorage.setItem('website-settings', JSON.stringify({
        websiteName,
        websiteDescription,
        websiteTagline,
        contactEmail,
        contactPhone,
        contactAddress,
        socialInstagram,
        maintenanceMode,
        userRegistration,
        googleLogin,
        blogComments,
        activeTheme,
        selectedColor,
        fontFamily,
        metaTitle,
        metaDescription,
        metaKeywords,
        robotsIndexing,
        sitemapEnabled,
        canonicalUrls,
        schemaMarkup
      }));
    }, 1500);
  };
  
  // Fungsi untuk menangani proses publikasi
  const handlePublish = () => {
    setIsPublishDialogOpen(true);
    setPublishProgress(0);
  };
  
  // Fungsi untuk memulai proses publikasi setelah dialog terbuka
  const startPublishProcess = () => {
    setPublishing(true);
    
    // Simulasi proses publikasi dengan pembaruan progres
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setPublishProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        completePublishProcess();
      }
    }, 300);
  };
  
  // Fungsi untuk menyelesaikan proses publikasi
  const completePublishProcess = () => {
    setTimeout(() => {
      setPublishing(false);
      setIsPublishDialogOpen(false);
      
      const now = new Date().toLocaleString('id-ID', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      
      setLastPublished(now);
      
      // Tampilkan notifikasi bahwa website telah dipublikasikan
      toast({
        title: "Website berhasil dipublikasikan",
        description: `Semua perubahan telah live dan dapat dilihat oleh publik pada ${now}`,
        duration: 5000,
      });
      
      // Simulasi pembaruan cache dan CDN
      setTimeout(() => {
        toast({
          title: "Pembaruan CDN selesai",
          description: "Perubahan telah didistribusikan ke semua server CDN",
          duration: 3000,
        });
      }, 2000);
    }, 1000);
  };

  // Fungsi untuk menangani publikasi lanjutan
  const handleAdvancedPublish = () => {
    navigate('/admin');
    // Arahkan ke tab services yang kini berisi fitur publikasi website
    setTimeout(() => {
      const servicesTabEvent = new CustomEvent('switchToTab', { detail: 'services' });
      window.dispatchEvent(servicesTabEvent);
    }, 100);
  };

  // Fungsi untuk menangani restore versi website
  const handleRestore = (id: number) => {
    // Tampilkan dialog konfirmasi (dalam implementasi nyata)
    toast({
      title: "Versi berhasil dipulihkan",
      description: `Website telah dipulihkan ke versi dari ${editHistory.find(h => h.id === id)?.date}.`,
    });
    
    // Setelah pemulihan, beri tahu pengguna untuk publikasikan perubahan
    setTimeout(() => {
      toast({
        title: "Publikasikan perubahan",
        description: "Perubahan telah dipulihkan, tetapi belum dipublikasikan. Klik 'Publikasikan Sekarang' untuk memperbarui website publik.",
      });
    }, 1500);
  };
  
  // Fungsi untuk menangani upload logo atau favicon
  const handleFileUpload = (type: 'logo' | 'favicon') => {
    if (type === 'logo') {
      setLogoUploadDialog(false);
    } else {
      setFaviconUploadDialog(false);
    }
    
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast({
        title: `${type === 'logo' ? 'Logo' : 'Favicon'} berhasil diperbarui`,
        description: `${type === 'logo' ? 'Logo' : 'Favicon'} baru telah disimpan dan siap dipublikasikan.`,
      });
    }, 1000);
  };
  
  // Fungsi untuk menangani AI Assistant
  const handleSubmitAiQuery = () => {
    if (!aiQuery.trim()) return;
    
    setIsAiThinking(true);
    setAiResponse(null);
    
    // Simulasi respons AI (dalam implementasi nyata akan memanggil API AI)
    setTimeout(() => {
      setIsAiThinking(false);
      
      if (aiQuery.toLowerCase().includes('seo')) {
        setAiResponse("Berdasarkan analisis SEO website Anda, saya menemukan beberapa peluang peningkatan:<br/><br/>1. Tambahkan meta deskripsi yang lebih spesifik pada halaman layanan<br/>2. Tingkatkan penggunaan heading tags (H1, H2, H3) untuk struktur konten yang lebih baik<br/>3. Optimasi 4 gambar yang belum memiliki alt text<br/>4. Perbarui beberapa tautan internal yang menuju ke halaman 404");
      } else if (aiQuery.toLowerCase().includes('performa')) {
        setAiResponse("Analisis performa website Anda menunjukkan beberapa area yang bisa ditingkatkan:<br/><br/>1. Kompresi gambar bisa ditingkatkan untuk mempercepat waktu muat<br/>2. Aktifkan caching browser untuk aset statis<br/>3. Minify file CSS dan JavaScript<br/>4. Gunakan lazy loading untuk gambar di bawah lipatan");
      } else if (aiQuery.toLowerCase().includes('desain')) {
        setAiResponse("Berdasarkan analisis desain website Anda, berikut beberapa rekomendasi:<br/><br/>1. Tingkatkan kontras warna teks untuk meningkatkan aksesibilitas<br/>2. Tambahkan lebih banyak ruang putih antara elemen di halaman beranda<br/>3. Gunakan ukuran font yang lebih konsisten di seluruh situs<br/>4. Pertimbangkan layout yang lebih konsisten untuk formulir kontak");
      } else {
        setAiResponse("Saya telah menganalisis website Anda dan menemukan bahwa secara umum website berfungsi dengan baik. Beberapa peningkatan kecil yang dapat dilakukan antara lain optimasi gambar, peningkatan struktur konten, dan pembaruan beberapa meta tag untuk SEO yang lebih baik.");
      }
      
      setAiQuery("");
    }, 2000);
  };
  
  // Fungsi untuk menangani preview halaman
  const handlePagePreview = (page: string) => {
    setPreviewPage(page);
    setPagePreviewOpen(true);
  };
  
  // Fungsi untuk menangani edit halaman
  const handleEditPage = (page: string) => {
    toast({
      title: "Membuka editor halaman",
      description: `Halaman ${page} dibuka dalam editor. Silakan lakukan perubahan yang diperlukan.`,
    });
    
    // Dalam implementasi nyata akan membuka editor halaman
  };
  
  // Fungsi untuk menangani custom layout halaman
  const handleCustomizeLayout = (page: string) => {
    toast({
      title: "Membuka editor layout",
      description: `Layout untuk halaman ${page} dibuka. Anda dapat menyesuaikan tata letak elemen.`,
    });
    
    // Dalam implementasi nyata akan membuka editor layout
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Pengaturan Website</h1>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button onClick={handleSave} disabled={saving} variant="outline">
            {saving ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            {saving ? "Menyimpan..." : "Simpan Draft"}
          </Button>
          <Button onClick={handlePublish} disabled={publishing} className="bg-green-600 hover:bg-green-700">
            {publishing ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Globe className="w-4 h-4 mr-2" />}
            {publishing ? "Mempublikasikan..." : "Publikasikan Sekarang"}
          </Button>
        </div>
      </div>
      
      {lastPublished && (
        <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-md flex justify-between items-center">
          <div className="flex items-center">
            <Globe className="w-4 h-4 text-green-600 mr-2" />
            <span className="text-sm text-green-800">
              Terakhir dipublikasikan: <strong>{lastPublished}</strong>
            </span>
          </div>
          <Button variant="link" size="sm" onClick={handleAdvancedPublish}>
            Publikasi Lanjutan
          </Button>
        </div>
      )}

      <Tabs defaultValue="general" className="mb-8">
        <TabsList className="mb-6 overflow-x-auto flex whitespace-nowrap pb-2 scrollbar-none">
          <TabsTrigger value="general" className="flex items-center">
            <Database className="w-4 h-4 mr-2" />
            Umum
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center">
            <Palette className="w-4 h-4 mr-2" />
            Tampilan
          </TabsTrigger>
          <TabsTrigger value="pages" className="flex items-center">
            <Layout className="w-4 h-4 mr-2" />
            Halaman
          </TabsTrigger>
          <TabsTrigger value="seo" className="flex items-center">
            <Globe className="w-4 h-4 mr-2" />
            SEO
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center">
            <History className="w-4 h-4 mr-2" />
            Riwayat Edit
          </TabsTrigger>
          <TabsTrigger value="ai" className="flex items-center">
            <Code className="w-4 h-4 mr-2" />
            AI Assistant
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Informasi Website</CardTitle>
                <CardDescription>
                  Atur informasi dasar untuk website Anda
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="site-name">Nama Website</Label>
                  <Input 
                    id="site-name" 
                    value={websiteName}
                    onChange={(e) => setWebsiteName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="site-description">Deskripsi Website</Label>
                  <Textarea 
                    id="site-description" 
                    value={websiteDescription}
                    onChange={(e) => setWebsiteDescription(e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="site-tagline">Tagline</Label>
                  <Input 
                    id="site-tagline" 
                    value={websiteTagline}
                    onChange={(e) => setWebsiteTagline(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Kontak & Media Sosial</CardTitle>
                <CardDescription>
                  Atur informasi kontak dan tautan media sosial
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Email</Label>
                  <Input 
                    id="contact-email" 
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-phone">Nomor Telepon</Label>
                  <Input 
                    id="contact-phone" 
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-address">Alamat</Label>
                  <Textarea 
                    id="contact-address" 
                    value={contactAddress}
                    onChange={(e) => setContactAddress(e.target.value)}
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="social-instagram">Instagram</Label>
                  <Input 
                    id="social-instagram" 
                    value={socialInstagram}
                    onChange={(e) => setSocialInstagram(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Pengaturan Lanjutan</CardTitle>
                <CardDescription>
                  Aktifkan atau nonaktifkan fitur-fitur website
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Mode Pemeliharaan</h4>
                      <p className="text-sm text-gray-500">Aktifkan mode pemeliharaan saat melakukan perbaikan besar</p>
                    </div>
                    <Switch 
                      id="maintenance-mode" 
                      checked={maintenanceMode}
                      onCheckedChange={setMaintenanceMode}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Pendaftaran Pengguna</h4>
                      <p className="text-sm text-gray-500">Izinkan pengguna baru mendaftar ke website</p>
                    </div>
                    <Switch 
                      id="user-registration" 
                      checked={userRegistration}
                      onCheckedChange={setUserRegistration}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Login Google</h4>
                      <p className="text-sm text-gray-500">Izinkan pengguna masuk menggunakan akun Google</p>
                    </div>
                    <Switch 
                      id="google-login" 
                      checked={googleLogin}
                      onCheckedChange={setGoogleLogin}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Komentar Blog</h4>
                      <p className="text-sm text-gray-500">Izinkan pengguna memberikan komentar pada artikel blog</p>
                    </div>
                    <Switch 
                      id="blog-comments" 
                      checked={blogComments}
                      onCheckedChange={setBlogComments}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="outline" onClick={handlePublish} disabled={publishing} className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100 hover:text-green-700">
                  {publishing ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Clock className="w-4 h-4 mr-2" />}
                  Publikasikan Perubahan
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Tema & Warna</CardTitle>
                <CardDescription>
                  Atur tema dan skema warna untuk website Anda
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>Tema Website</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div
                      className={`border-2 rounded-md p-3 cursor-pointer transition-all ${
                        activeTheme === "light" ? "border-diginavy" : "border-gray-200"
                      }`}
                      onClick={() => setActiveTheme("light")}
                    >
                      <div className="h-20 bg-white border border-gray-200 rounded mb-2 flex items-center justify-center text-center p-4">
                        <span className="text-gray-800 font-medium">Tema Terang</span>
                      </div>
                      <div className="flex justify-center">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className={activeTheme === "light" ? "bg-diginavy text-white hover:bg-diginavy-800" : ""}
                        >
                          {activeTheme === "light" ? "Aktif" : "Pilih"}
                        </Button>
                      </div>
                    </div>
                    <div
                      className={`border-2 rounded-md p-3 cursor-pointer transition-all ${
                        activeTheme === "dark" ? "border-diginavy" : "border-gray-200"
                      }`}
                      onClick={() => setActiveTheme("dark")}
                    >
                      <div className="h-20 bg-gray-900 border border-gray-700 rounded mb-2 flex items-center justify-center text-center p-4">
                        <span className="text-gray-100 font-medium">Tema Gelap</span>
                      </div>
                      <div className="flex justify-center">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className={activeTheme === "dark" ? "bg-diginavy text-white hover:bg-diginavy-800" : ""}
                        >
                          {activeTheme === "dark" ? "Aktif" : "Pilih"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label>Warna Utama</Label>
                  <div className="grid grid-cols-5 gap-2">
                    {primaryColors.map((color, index) => (
                      <div 
                        key={index}
                        className={`w-full aspect-square rounded-md border cursor-pointer ${selectedColor === color ? 'ring-2 ring-offset-2 ring-black' : 'border-gray-200'}`}
                        style={{ backgroundColor: color }}
                        onClick={() => setSelectedColor(color)}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="font-family">Font Utama</Label>
                  <Select value={fontFamily} onValueChange={setFontFamily}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih font" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inter">Inter</SelectItem>
                      <SelectItem value="poppins">Poppins</SelectItem>
                      <SelectItem value="roboto">Roboto</SelectItem>
                      <SelectItem value="montserrat">Montserrat</SelectItem>
                      <SelectItem value="opensans">Open Sans</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="outline" onClick={handlePublish} disabled={publishing} className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100 hover:text-green-700">
                  {publishing ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Clock className="w-4 h-4 mr-2" />}
                  Publikasikan Perubahan
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Logo & Favicon</CardTitle>
                <CardDescription>
                  Atur logo dan favicon website Anda
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>Logo Website</Label>
                  <div className="border-2 border-dashed border-gray-200 rounded-md p-6 text-center">
                    <img 
                      src="/lovable-uploads/eb7d859a-60c0-4007-afe4-522ffdd5afda.png" 
                      alt="Logo DigiBooster" 
                      className="h-12 mx-auto mb-4" 
                    />
                    <div className="flex justify-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => setLogoUploadDialog(true)}>
                        <Upload className="w-4 h-4 mr-1" />
                        Ganti Logo
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label>Favicon</Label>
                  <div className="border-2 border-dashed border-gray-200 rounded-md p-6 text-center">
                    <div className="w-12 h-12 bg-diginavy rounded flex items-center justify-center text-white font-bold mx-auto mb-4">
                      D
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setFaviconUploadDialog(true)}>
                      <Upload className="w-4 h-4 mr-1" />
                      Ganti Favicon
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="outline" onClick={handleSave} disabled={saving} className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100 hover:text-green-700 w-full">
                  {saving ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                  Simpan Perubahan
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* Pages Settings */}
        <TabsContent value="pages">
          <Card>
            <CardHeader>
              <CardTitle>Kelola Halaman Website</CardTitle>
              <CardDescription>
                Edit dan atur halaman-halaman di website Anda
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="home">
                  <AccordionTrigger className="hover:bg-gray-50 px-4 rounded-md">
                    <div className="flex items-center">
                      <span className="font-medium">Beranda</span>
                      <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Dipublikasikan</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-2">
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditPage('Beranda')}>
                        <PenLine className="w-4 h-4 mr-1" />
                        Edit Halaman
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleCustomizeLayout('Beranda')}>
                        <Layout className="w-4 h-4 mr-1" />
                        Sesuaikan Layout
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handlePagePreview('Beranda')}>
                        <ArrowUpRight className="w-4 h-4 mr-1" />
                        Lihat Halaman
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="about">
                  <AccordionTrigger className="hover:bg-gray-50 px-4 rounded-md">
                    <div className="flex items-center">
                      <span className="font-medium">Tentang</span>
                      <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Dipublikasikan</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-2">
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditPage('Tentang')}>
                        <PenLine className="w-4 h-4 mr-1" />
                        Edit Halaman
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleCustomizeLayout('Tentang')}>
                        <Layout className="w-4 h-4 mr-1" />
                        Sesuaikan Layout
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handlePagePreview('Tentang')}>
                        <ArrowUpRight className="w-4 h-4 mr-1" />
                        Lihat Halaman
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="services">
                  <AccordionTrigger className="hover:bg-gray-50 px-4 rounded-md">
                    <div className="flex items-center">
                      <span className="font-medium">Layanan</span>
                      <span className="ml-2 text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">Draft</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-2">
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditPage('Layanan')}>
                        <PenLine className="w-4 h-4 mr-1" />
                        Edit Halaman
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleCustomizeLayout('Layanan')}>
                        <Layout className="w-4 h-4 mr-1" />
                        Sesuaikan Layout
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handlePagePreview('Layanan')}>
                        <ArrowUpRight className="w-4 h-4 mr-1" />
                        Pratinjau
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="blog">
                  <AccordionTrigger className="hover:bg-gray-50 px-4 rounded-md">
                    <div className="flex items-center">
                      <span className="font-medium">Blog</span>
                      <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Dipublikasikan</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-2">
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditPage('Blog')}>
                        <PenLine className="w-4 h-4 mr-1" />
                        Edit Halaman
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleCustomizeLayout('Blog')}>
                        <Layout className="w-4 h-4 mr-1" />
                        Sesuaikan Layout
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handlePagePreview('Blog')}>
                        <ArrowUpRight className="w-4 h-4 mr-1" />
                        Lihat Halaman
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="portfolio">
                  <AccordionTrigger className="hover:bg-gray-50 px-4 rounded-md">
                    <div className="flex items-center">
                      <span className="font-medium">Portofolio</span>
                      <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Dipublikasikan</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-2">
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditPage('Portofolio')}>
                        <PenLine className="w-4 h-4 mr-1" />
                        Edit Halaman
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleCustomizeLayout('Portofolio')}>
                        <Layout className="w-4 h-4 mr-1" />
                        Sesuaikan Layout
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handlePagePreview('Portofolio')}>
                        <ArrowUpRight className="w-4 h-4 mr-1" />
                        Lihat Halaman
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button onClick={() => {
                toast({
                  title: "Halaman baru dibuat",
                  description: "Halaman baru telah dibuat. Silakan edit kontennya sekarang.",
                })
              }}>
                <PenLine className="w-4 h-4 mr-2" />
                Tambah Halaman Baru
              </Button>
              <Button variant="outline" onClick={handlePublish} disabled={publishing} className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100 hover:text-green-700">
                {publishing ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Clock className="w-4 h-4 mr-2" />}
                Publikasikan Perubahan
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* SEO Settings */}
        <TabsContent value="seo">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan SEO Website</CardTitle>
              <CardDescription>
                Optimalkan website untuk mesin pencari
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="meta-title">Meta Title</Label>
                <Input 
                  id="meta-title" 
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                />
                <p className="text-xs text-gray-500">Title yang muncul di hasil pencarian Google (50-60 karakter)</p>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="meta-description">Meta Description</Label>
                <Textarea 
                  id="meta-description" 
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  rows={3}
                />
                <p className="text-xs text-gray-500">Deskripsi yang muncul di hasil pencarian Google (120-160 karakter)</p>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="meta-keywords">Meta Keywords</Label>
                <Input 
                  id="meta-keywords" 
                  value={metaKeywords}
                  onChange={(e) => setMetaKeywords(e.target.value)}
                />
                <p className="text-xs text-gray-500">Kata kunci yang relevan dengan website Anda, pisahkan dengan koma</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Robots.txt</h4>
                    <p className="text-sm text-gray-500">Izinkan website diindeks oleh mesin pencari</p>
                  </div>
                  <Switch 
                    id="robots-indexing" 
                    checked={robotsIndexing}
                    onCheckedChange={setRobotsIndexing}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Sitemap XML</h4>
                    <p className="text-sm text-gray-500">Aktifkan dan perbarui sitemap otomatis</p>
                  </div>
                  <Switch 
                    id="sitemap" 
                    checked={sitemapEnabled}
                    onCheckedChange={setSitemapEnabled}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Canonical URLs</h4>
                    <p className="text-sm text-gray-500">Atur URL kanonik untuk mencegah konten duplikat</p>
                  </div>
                  <Switch 
                    id="canonical-urls" 
                    checked={canonicalUrls}
                    onCheckedChange={setCanonicalUrls}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Schema Markup</h4>
                    <p className="text-sm text-gray-500">Tambahkan data terstruktur untuk tampilan kaya di SERP</p>
                  </div>
                  <Switch 
                    id="schema-markup" 
                    checked={schemaMarkup}
                    onCheckedChange={setSchemaMarkup}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="outline" onClick={handlePublish} disabled={publishing} className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100 hover:text-green-700">
                {publishing ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Clock className="w-4 h-4 mr-2" />}
                Publikasikan Perubahan SEO
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Riwayat Edit Website</CardTitle>
              <CardDescription>
                Lihat dan pulihkan versi sebelumnya dari website Anda
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {editHistory.map((history) => (
                  <div 
                    key={history.id} 
                    className="border-b border-gray-200 last:border-0 pb-4 last:pb-0"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                      <div>
                        <h4 className="font-medium">{history.action}</h4>
                        <div className="flex items-center text-sm text-gray-500">
                          <span>{history.date}</span>
                          <span className="mx-2">•</span>
                          <span>{history.user}</span>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        disabled={history.status !== 'available'}
                        onClick={() => handleRestore(history.id)}
                      >
                        {history.status === 'active' ? 'Versi Aktif' : 'Pulihkan Versi Ini'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => {
                toast({
                  title: "Riwayat berhasil diekspor",
                  description: "File riwayat telah diunduh ke komputer Anda.",
                })
              }}>
                <Download className="w-4 h-4 mr-2" />
                Ekspor Riwayat
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => {
                  toast({
                    title: "Menampilkan semua riwayat",
                    description: "Semua riwayat perubahan website ditampilkan.",
                  })
                }}>
                  Lihat Semua Riwayat
                </Button>
                <Button variant="outline" onClick={handlePublish} disabled={publishing} className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100 hover:text-green-700">
                  {publishing ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Clock className="w-4 h-4 mr-2" />}
                  Publikasikan
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* AI Assistant Tab */}
        <TabsContent value="ai">
          <Card>
            <CardHeader>
              <CardTitle>AI Assistant Website</CardTitle>
              <CardDescription>
                Gunakan AI untuk menganalisis dan memperbaiki masalah website
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 bg-diginavy rounded-full flex items-center justify-center">
                      <Code className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">DigiBooster AI Assistant</h4>
                    <p className="text-gray-600 text-sm mb-3">
                      Saya dapat membantu menganalisis dan menyelesaikan masalah website Anda. Mulai dari SEO, performa, keamanan, hingga rekomendasi desain.
                    </p>
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="hover:bg-gray-100"
                          onClick={() => {
                            setAiQuery("Analisis SEO website");
                            handleSubmitAiQuery();
                          }}
                        >
                          Analisis SEO website
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="hover:bg-gray-100"
                          onClick={() => {
                            setAiQuery("Periksa performa website");
                            handleSubmitAiQuery();
                          }}
                        >
                          Periksa performa website
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="hover:bg-gray-100"
                          onClick={() => {
                            setAiQuery("Rekomendasi desain");
                            handleSubmitAiQuery();
                          }}
                        >
                          Rekomendasi desain
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="hover:bg-gray-100"
                          onClick={() => {
                            setAiQuery("Optimasi copy website");
                            handleSubmitAiQuery();
                          }}
                        >
                          Optimasi copy website
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between bg-gray-50 p-3 border-b border-gray-200">
                    <h4 className="font-medium">Analisis Website Cepat</h4>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        toast({
                          title: "Menganalisis website",
                          description: "Sedang menganalisis performa dan SEO website Anda...",
                        });
                        
                        setTimeout(() => {
                          toast({
                            title: "Analisis selesai",
                            description: "Website Anda telah dianalisis. Lihat hasil untuk mengetahui area yang bisa ditingkatkan.",
                          });
                        }, 2000);
                      }}
                    >
                      <RefreshCw className="w-4 h-4 mr-1" />
                      Analisis Ulang
                    </Button>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="border border-gray-200 rounded p-3 text-center">
                        <div className="text-green-500 font-bold text-xl mb-1">98%</div>
                        <h5 className="text-sm font-medium">Performa</h5>
                      </div>
                      <div className="border border-gray-200 rounded p-3 text-center">
                        <div className="text-yellow-500 font-bold text-xl mb-1">87%</div>
                        <h5 className="text-sm font-medium">SEO</h5>
                      </div>
                      <div className="border border-gray-200 rounded p-3 text-center">
                        <div className="text-green-500 font-bold text-xl mb-1">96%</div>
                        <h5 className="text-sm font-medium">Keamanan</h5>
                      </div>
                    </div>
                    
                    <div className="mt-4 space-y-3">
                      <h5 className="font-medium">Rekomendasi Perbaikan:</h5>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <span className="text-yellow-500 mr-2">⚠️</span>
                          <span>Tambahkan deskripsi meta pada 3 halaman yang belum memiliki deskripsi</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-yellow-500 mr-2">⚠️</span>
                          <span>Optimalkan 5 gambar yang memiliki ukuran terlalu besar</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          <span>Website responsif dan berfungsi dengan baik di perangkat mobile</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-end gap-2">
                  <Textarea
                    placeholder="Tanyakan sesuatu kepada AI Assistant, misalnya: 'Bagaimana cara meningkatkan SEO website saya?'"
                    className="h-20"
                    value={aiQuery}
                    onChange={(e) => setAiQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmitAiQuery();
                      }
                    }}
                  />
                  <Button size="icon" className="flex-shrink-0 h-10 w-10" onClick={handleSubmitAiQuery}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                
                {(isAiThinking || aiResponse) && (
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-diginavy rounded-full flex-shrink-0 flex items-center justify-center">
                        <Code className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">DigiBooster AI</div>
                        {isAiThinking ? (
                          <div className="text-sm mt-2 text-gray-600">
                            <div className="flex items-center">
                              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                              <span>Menganalisis website Anda...</span>
                            </div>
                          </div>
                        ) : (
                          <div className="text-sm mt-2 text-gray-600" dangerouslySetInnerHTML={{ __html: aiResponse || '' }} />
                        )}
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">AI akan menganalisis perubahan dan memberikan rekomendasi</span>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSaving(true);
                      setTimeout(() => {
                        setSaving(false);
                        toast({
                          title: "Perbaikan AI diterapkan",
                          description: "Rekomendasi AI telah diterapkan ke website. Publikasikan untuk melihat perubahan.",
                        });
                      }, 1500);
                    }} 
                    disabled={saving} 
                    className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100 hover:text-green-700"
                  >
                    {saving ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Shield className="w-4 h-4 mr-2" />}
                    Terapkan Perbaikan AI
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Dialog untuk publikasi */}
      <Dialog open={isPublishDialogOpen} onOpenChange={setIsPublishDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Publikasikan Website</DialogTitle>
            <DialogDescription>
              Proses publikasi akan mendorong semua perubahan ke website publik Anda.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            {!publishing ? (
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Globe className="w-4 h-4 text-blue-700" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Publikasi Standar</h4>
                    <p className="text-xs text-gray-500 mt-1">Publikasikan website Anda ke lingkungan produksi.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4 text-purple-700" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Perhatian</h4>
                    <p className="text-xs text-gray-500 mt-1">Pastikan Anda telah menyimpan semua perubahan sebelum publikasi.</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-center py-2">
                  <h4 className="text-sm font-medium mb-3">Publikasi dalam Proses</h4>
                  <Progress value={publishProgress} className="h-2" />
                  <p className="text-xs text-gray-500 mt-2">{publishProgress}% Selesai</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span>Menyimpan perubahan</span>
                    {publishProgress >= 20 ? <Check className="w-4 h-4 text-green-500" /> : null}
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span>Mengoptimasi file</span>
                    {publishProgress >= 40 ? <Check className="w-4 h-4 text-green-500" /> : null}
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span>Membangun website</span>
                    {publishProgress >= 60 ? <Check className="w-4 h-4 text-green-500" /> : null}
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span>Mengunggah ke server</span>
                    {publishProgress >= 80 ? <Check className="w-4 h-4 text-green-500" /> : null}
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span>Memperbarui cache CDN</span>
                    {publishProgress >= 100 ? <Check className="w-4 h-4 text-green-500" /> : null}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter className="flex sm:justify-between">
            {!publishing ? (
              <>
                <Button variant="outline" onClick={() => setIsPublishDialogOpen(false)}>
                  Batalkan
                </Button>
                <Button type="button" onClick={startPublishProcess} className="bg-green-600 hover:bg-green-700">
                  <Globe className="w-4 h-4 mr-2" />
                  Publikasikan Sekarang
                </Button>
              </>
            ) : (
              <Button variant="outline" disabled className="w-full">
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Mohon tunggu...
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Dialog untuk upload logo */}
      <Dialog open={logoUploadDialog} onOpenChange={setLogoUploadDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Ganti Logo Website</DialogTitle>
            <DialogDescription>
              Unggah logo baru untuk website Anda. Format yang didukung: PNG, JPG, dan SVG.
            </DialogDescription>
          </DialogHeader>
          
          <div className="border-2 border-dashed border-gray-200 rounded-md p-6 text-center">
            <div className="mb-4">
              <Image className="w-12 h-12 mx-auto text-gray-400" />
            </div>
            <p className="text-sm text-gray-500 mb-4">
              Seret dan letakkan file di sini, atau klik untuk memilih file
            </p>
            <Button size="sm">Pilih File Logo</Button>
          </div>
          
          <div className="flex items-center text-sm text-gray-500">
            <AlertTriangle className="w-4 h-4 mr-2 text-amber-500" />
            <span>Disarankan resolusi minimal 200x80 piksel</span>
          </div>
          
          <DialogFooter className="flex sm:justify-between">
            <Button variant="outline" onClick={() => setLogoUploadDialog(false)}>
              <X className="w-4 h-4 mr-2" />
              Batalkan
            </Button>
            <Button type="button" onClick={() => handleFileUpload('logo')}>
              <Upload className="w-4 h-4 mr-2" />
              Unggah Logo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Dialog untuk upload favicon */}
      <Dialog open={faviconUploadDialog} onOpenChange={setFaviconUploadDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Ganti Favicon Website</DialogTitle>
            <DialogDescription>
              Unggah favicon baru untuk website Anda. Format yang didukung: ICO, PNG.
            </DialogDescription>
          </DialogHeader>
          
          <div className="border-2 border-dashed border-gray-200 rounded-md p-6 text-center">
            <div className="mb-4">
              <Image className="w-12 h-12 mx-auto text-gray-400" />
            </div>
            <p className="text-sm text-gray-500 mb-4">
              Seret dan letakkan file di sini, atau klik untuk memilih file
            </p>
            <Button size="sm">Pilih File Favicon</Button>
          </div>
          
          <div className="flex items-center text-sm text-gray-500">
            <AlertTriangle className="w-4 h-4 mr-2 text-amber-500" />
            <span>Disarankan ukuran 32x32 piksel atau 64x64 piksel</span>
          </div>
          
          <DialogFooter className="flex sm:justify-between">
            <Button variant="outline" onClick={() => setFaviconUploadDialog(false)}>
              <X className="w-4 h-4 mr-2" />
              Batalkan
            </Button>
            <Button type="button" onClick={() => handleFileUpload('favicon')}>
              <Upload className="w-4 h-4 mr-2" />
              Unggah Favicon
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Dialog untuk preview halaman */}
      <Dialog open={pagePreviewOpen} onOpenChange={setPagePreviewOpen}>
        <DialogContent className="sm:max-w-xl lg:max-w-3xl h-[80vh]">
          <DialogHeader>
            <DialogTitle>Preview Halaman: {previewPage}</DialogTitle>
            <DialogDescription>
              Pratinjau tampilan halaman pada website Anda
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex-1 h-full overflow-auto border rounded-md">
            <div className="relative h-[calc(100%-60px)] min-h-[400px] bg-gray-50 p-4 flex items-center justify-center text-center">
              <div>
                <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto mb-4" />
                <h4 className="text-lg font-medium mb-2">Preview {previewPage}</h4>
                <p className="text-gray-500 max-w-sm mx-auto">
                  Pratinjau halaman biasanya menampilkan konten website Anda dalam iframe. 
                  Dalam versi demo ini hanya menampilkan placeholder halaman.
                </p>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setPagePreviewOpen(false)}>
              Tutup Preview
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <div className="fixed bottom-6 right-6 z-50">
        <Button onClick={handlePublish} disabled={publishing} size="lg" className="shadow-lg bg-green-600 hover:bg-green-700">
          {publishing ? <RefreshCw className="w-5 h-5 mr-2 animate-spin" /> : <Globe className="w-5 h-5 mr-2" />}
          {publishing ? "Mempublikasikan..." : "Publikasikan Sekarang"}
        </Button>
      </div>
    </div>
  );
};

export default WebsiteSettings;
