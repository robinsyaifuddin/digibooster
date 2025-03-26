
import { useState } from 'react';
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
import { Save, RefreshCw, Upload, Download, Code, PenLine, Layout, Globe, Database, UserCog, Shield, BarChart, Settings2, FileEdit, History, Palette, ArrowUpRight } from "lucide-react";

const WebsiteSettings = () => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [activeTheme, setActiveTheme] = useState("light");
  const [fontFamily, setFontFamily] = useState("inter");
  const [editHistory] = useState([
    { id: 1, date: "2023-08-20 10:23", user: "Admin DigiBooster", action: "Update Header Section", status: "active" },
    { id: 2, date: "2023-08-19 15:45", user: "Admin DigiBooster", action: "Update Footer Contact Info", status: "available" },
    { id: 3, date: "2023-08-18 09:12", user: "Admin DigiBooster", action: "Change Homepage Hero Banner", status: "available" },
    { id: 4, date: "2023-08-17 14:30", user: "Admin DigiBooster", action: "Add New Service Category", status: "available" },
    { id: 5, date: "2023-08-16 11:05", user: "Admin DigiBooster", action: "Update Website Colors", status: "available" },
  ]);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Pengaturan berhasil disimpan",
        description: "Perubahan pada website telah disimpan dan dipublikasikan.",
      });
    }, 1500);
  };

  const handleRestore = (id: number) => {
    toast({
      title: "Versi berhasil dipulihkan",
      description: `Website telah dipulihkan ke versi dari ${editHistory.find(h => h.id === id)?.date}.`,
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Pengaturan Website</h1>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
          {saving ? "Menyimpan..." : "Simpan & Publikasikan"}
        </Button>
      </div>

      <Tabs defaultValue="general" className="mb-8">
        <TabsList className="mb-6 overflow-x-auto flex whitespace-nowrap pb-2 scrollbar-none">
          <TabsTrigger value="general" className="flex items-center">
            <Settings2 className="w-4 h-4 mr-2" />
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
                  <Input id="site-name" defaultValue="DigiBooster" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="site-description">Deskripsi Website</Label>
                  <Textarea 
                    id="site-description" 
                    defaultValue="Platform agensi dan pengembangan ekosistem digital Indonesia" 
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="site-tagline">Tagline</Label>
                  <Input id="site-tagline" defaultValue="Skill Up, Stand Up" />
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
                  <Input id="contact-email" defaultValue="hello.digibooster@gmail.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-phone">Nomor Telepon</Label>
                  <Input id="contact-phone" defaultValue="082279722417" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-address">Alamat</Label>
                  <Textarea 
                    id="contact-address" 
                    defaultValue="Way Kandis, Bandar Lampung" 
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="social-instagram">Instagram</Label>
                  <Input id="social-instagram" defaultValue="instagram.com/digibooster.id" />
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
                    <Switch id="maintenance-mode" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Pendaftaran Pengguna</h4>
                      <p className="text-sm text-gray-500">Izinkan pengguna baru mendaftar ke website</p>
                    </div>
                    <Switch id="user-registration" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Login Google</h4>
                      <p className="text-sm text-gray-500">Izinkan pengguna masuk menggunakan akun Google</p>
                    </div>
                    <Switch id="google-login" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Komentar Blog</h4>
                      <p className="text-sm text-gray-500">Izinkan pengguna memberikan komentar pada artikel blog</p>
                    </div>
                    <Switch id="blog-comments" defaultChecked />
                  </div>
                </div>
              </CardContent>
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
                    {["#161759", "#1a1b7a", "#4824eb", "#6251fc", "#9997ff"].map((color, index) => (
                      <div 
                        key={index}
                        className="w-full aspect-square rounded-md border border-gray-200 cursor-pointer"
                        style={{ backgroundColor: color }}
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
                      <Button variant="outline" size="sm">
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
                    <Button variant="outline" size="sm">
                      <Upload className="w-4 h-4 mr-1" />
                      Ganti Favicon
                    </Button>
                  </div>
                </div>
              </CardContent>
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
                      <Button variant="outline" size="sm">
                        <PenLine className="w-4 h-4 mr-1" />
                        Edit Halaman
                      </Button>
                      <Button variant="outline" size="sm">
                        <Layout className="w-4 h-4 mr-1" />
                        Sesuaikan Layout
                      </Button>
                      <Button variant="outline" size="sm">
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
                      <Button variant="outline" size="sm">
                        <PenLine className="w-4 h-4 mr-1" />
                        Edit Halaman
                      </Button>
                      <Button variant="outline" size="sm">
                        <Layout className="w-4 h-4 mr-1" />
                        Sesuaikan Layout
                      </Button>
                      <Button variant="outline" size="sm">
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
                      <Button variant="outline" size="sm">
                        <PenLine className="w-4 h-4 mr-1" />
                        Edit Halaman
                      </Button>
                      <Button variant="outline" size="sm">
                        <Layout className="w-4 h-4 mr-1" />
                        Sesuaikan Layout
                      </Button>
                      <Button variant="outline" size="sm">
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
                      <Button variant="outline" size="sm">
                        <PenLine className="w-4 h-4 mr-1" />
                        Edit Halaman
                      </Button>
                      <Button variant="outline" size="sm">
                        <Layout className="w-4 h-4 mr-1" />
                        Sesuaikan Layout
                      </Button>
                      <Button variant="outline" size="sm">
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
                      <Button variant="outline" size="sm">
                        <PenLine className="w-4 h-4 mr-1" />
                        Edit Halaman
                      </Button>
                      <Button variant="outline" size="sm">
                        <Layout className="w-4 h-4 mr-1" />
                        Sesuaikan Layout
                      </Button>
                      <Button variant="outline" size="sm">
                        <ArrowUpRight className="w-4 h-4 mr-1" />
                        Lihat Halaman
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
            <CardFooter>
              <Button>
                <PenLine className="w-4 h-4 mr-2" />
                Tambah Halaman Baru
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
                <Input id="meta-title" defaultValue="DigiBooster - Platform Agensi dan Pengembangan Ekosistem Digital Indonesia" />
                <p className="text-xs text-gray-500">Title yang muncul di hasil pencarian Google (50-60 karakter)</p>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="meta-description">Meta Description</Label>
                <Textarea 
                  id="meta-description" 
                  defaultValue="DigiBooster membantu masyarakat mengoptimalkan digitalisasi dengan berbagai layanan jasa digital, edukasi, dan konsultasi bisnis digital. Skill Up, Stand Up!" 
                  rows={3}
                />
                <p className="text-xs text-gray-500">Deskripsi yang muncul di hasil pencarian Google (120-160 karakter)</p>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="meta-keywords">Meta Keywords</Label>
                <Input id="meta-keywords" defaultValue="digital, agency, marketing, website, seo, edukasi digital, konsultasi digital" />
                <p className="text-xs text-gray-500">Kata kunci yang relevan dengan website Anda, pisahkan dengan koma</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Robots.txt</h4>
                    <p className="text-sm text-gray-500">Izinkan website diindeks oleh mesin pencari</p>
                  </div>
                  <Switch id="robots-indexing" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Sitemap XML</h4>
                    <p className="text-sm text-gray-500">Aktifkan dan perbarui sitemap otomatis</p>
                  </div>
                  <Switch id="sitemap" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Canonical URLs</h4>
                    <p className="text-sm text-gray-500">Atur URL kanonik untuk mencegah konten duplikat</p>
                  </div>
                  <Switch id="canonical-urls" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Schema Markup</h4>
                    <p className="text-sm text-gray-500">Tambahkan data terstruktur untuk tampilan kaya di SERP</p>
                  </div>
                  <Switch id="schema-markup" defaultChecked />
                </div>
              </div>
            </CardContent>
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
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Ekspor Riwayat
              </Button>
              <Button variant="outline">
                Lihat Semua Riwayat
              </Button>
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
                        <Button variant="outline" size="sm" className="hover:bg-gray-100">Analisis SEO website</Button>
                        <Button variant="outline" size="sm" className="hover:bg-gray-100">Periksa performa website</Button>
                        <Button variant="outline" size="sm" className="hover:bg-gray-100">Rekomendasi desain</Button>
                        <Button variant="outline" size="sm" className="hover:bg-gray-100">Optimasi copy website</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between bg-gray-50 p-3 border-b border-gray-200">
                    <h4 className="font-medium">Analisis Website Cepat</h4>
                    <Button variant="outline" size="sm">
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
                
                <Textarea
                  placeholder="Tanyakan sesuatu kepada AI Assistant, misalnya: 'Bagaimana cara meningkatkan SEO website saya?'"
                  className="h-20"
                />
                
                <div className="flex justify-end">
                  <Button>Kirim Pertanyaan</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WebsiteSettings;
