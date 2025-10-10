import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { FloatingHearts } from '@/components/FloatingHearts';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X } from 'lucide-react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', 'Trips', 'Selfies', 'Festivals', 'Special Moments'];

  // Placeholder images - to be replaced with actual photos
  const images = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    src: `https://images.unsplash.com/photo-${1516589178581 + i * 1000}-3a259f4e78cf?w=800&auto=format&fit=crop`,
    caption: `Beautiful Memory ${i + 1}`,
    category: categories[Math.floor(Math.random() * (categories.length - 1)) + 1],
  }));

  const filteredImages = filter === 'All' 
    ? images 
    : images.filter(img => img.category === filter);

  return (
    <div className="min-h-screen relative">
      <FloatingHearts />
      <Navigation />
      
      <main className="relative z-10 container mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="font-cursive text-6xl md:text-7xl text-primary mb-4">
            Moments in Frames 📸
          </h1>
          <p className="font-serif text-xl text-muted-foreground">
            Every picture tells our beautiful story
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setFilter(category)}
              variant={filter === category ? 'default' : 'outline'}
              className={`font-serif rounded-full ${
                filter === category 
                  ? 'bg-primary text-primary-foreground shadow-[var(--shadow-romantic)]' 
                  : 'hover:bg-muted'
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-2xl shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-romantic)] transition-all duration-300 cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
              onClick={() => setSelectedImage(image.id)}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={image.src}
                  alt={image.caption}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <p className="font-serif text-white p-4 text-lg">{image.caption}</p>
              </div>
              <div className="absolute top-3 right-3 bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs px-3 py-1 rounded-full font-serif">
                {image.category}
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Dialog */}
        <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
            {selectedImage !== null && (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-12 right-0 text-white hover:bg-white/20 z-10"
                >
                  <X className="h-6 w-6" />
                </Button>
                <img
                  src={images[selectedImage].src}
                  alt={images[selectedImage].caption}
                  className="w-full h-auto rounded-2xl"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-2xl">
                  <p className="font-cursive text-white text-2xl">{images[selectedImage].caption}</p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Gallery;
