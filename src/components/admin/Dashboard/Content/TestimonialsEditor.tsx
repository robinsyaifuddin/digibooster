
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";
import { TestimonialItem } from "@/types/websiteTypes";

interface TestimonialsEditorProps {
  testimonials: TestimonialItem[];
  handleTestimonialChange: (id: string, field: string, value: string) => void;
}

const TestimonialsEditor = ({ testimonials, handleTestimonialChange }: TestimonialsEditorProps) => {
  const [editingTestimonial, setEditingTestimonial] = useState<string | null>(null);

  return (
    <Card className="bg-dark-200 border-dark-300 text-white">
      <CardHeader>
        <CardTitle className="text-lg text-white">Testimonial</CardTitle>
        <CardDescription className="text-gray-400">
          Edit testimonial yang ditampilkan di halaman beranda
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {testimonials.map(testimonial => (
            <Card key={testimonial.id} className="shadow-sm bg-dark-300 border-dark-400">
              <CardHeader className="py-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full mr-3 border border-dark-400"
                    />
                    <div>
                      <CardTitle className="text-base text-white">{testimonial.name}</CardTitle>
                      <CardDescription className="text-gray-400">{testimonial.role}</CardDescription>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => setEditingTestimonial(editingTestimonial === testimonial.id ? null : testimonial.id)}
                    className="text-neon-purple hover:bg-dark-400 hover:text-neon-purple"
                  >
                    {editingTestimonial === testimonial.id ? "Tutup" : "Edit"}
                  </Button>
                </div>
              </CardHeader>
              
              {editingTestimonial === testimonial.id && (
                <CardContent className="pb-3">
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor={`testimonial-name-${testimonial.id}`} className="text-gray-300">Nama</Label>
                      <Input 
                        id={`testimonial-name-${testimonial.id}`}
                        value={testimonial.name}
                        onChange={(e) => handleTestimonialChange(testimonial.id, 'name', e.target.value)}
                        className="mt-1 bg-dark-400 border-dark-500 text-white focus:border-neon-purple focus:ring-neon-purple/20" 
                      />
                    </div>
                    <div>
                      <Label htmlFor={`testimonial-role-${testimonial.id}`} className="text-gray-300">Peran/Jabatan</Label>
                      <Input 
                        id={`testimonial-role-${testimonial.id}`}
                        value={testimonial.role}
                        onChange={(e) => handleTestimonialChange(testimonial.id, 'role', e.target.value)}
                        className="mt-1 bg-dark-400 border-dark-500 text-white focus:border-neon-purple focus:ring-neon-purple/20" 
                      />
                    </div>
                    <div>
                      <Label htmlFor={`testimonial-content-${testimonial.id}`} className="text-gray-300">Testimoni</Label>
                      <Textarea 
                        id={`testimonial-content-${testimonial.id}`}
                        value={testimonial.content}
                        onChange={(e) => handleTestimonialChange(testimonial.id, 'content', e.target.value)}
                        className="mt-1 bg-dark-400 border-dark-500 text-white focus:border-neon-purple focus:ring-neon-purple/20" 
                      />
                    </div>
                    <div>
                      <Label htmlFor={`testimonial-image-${testimonial.id}`} className="text-gray-300">URL Gambar</Label>
                      <Input 
                        id={`testimonial-image-${testimonial.id}`}
                        value={testimonial.image}
                        onChange={(e) => handleTestimonialChange(testimonial.id, 'image', e.target.value)}
                        className="mt-1 bg-dark-400 border-dark-500 text-white focus:border-neon-purple focus:ring-neon-purple/20" 
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button size="sm" onClick={() => setEditingTestimonial(null)} className="bg-neon-purple hover:bg-neon-violet text-white">
                        <Save className="h-3 w-3 mr-2" />
                        Simpan
                      </Button>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialsEditor;
