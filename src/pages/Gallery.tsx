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

  // Import all images from photos folders
  const importImages = () => {
    const images: any[] = [];
    let id = 0;

    // Import from p1 folder
    const p1Images = import.meta.glob('@/assets/photos/p1/*.(jpg|jpeg|png|gif|webp|JPG|PNG|GIF|WEBP|JPEG)', { eager: true, as: 'url' });
    Object.entries(p1Images).forEach(([path, url]) => {
      images.push({
        id: id++,
        src: url,
        caption: `Beautiful Memory ${id}`,
        category: 'Trips',
        folder: 'p1'
      });
    });

    // Import from p2 folder
    const p2Images = import.meta.glob('@/assets/photos/p2/*.(jpg|jpeg|png|gif|webp|JPG|PNG|GIF|WEBP|JPEG)', { eager: true, as: 'url' });
    Object.entries(p2Images).forEach(([path, url]) => {
      images.push({
        id: id++,
        src: url,
        caption: `Special Moment ${id}`,
        category: 'Selfies',
        folder: 'p2'
      });
    });

    // Import from p3 folder
    const p3Images = import.meta.glob('@/assets/photos/p3/*.(jpg|jpeg|png|gif|webp|JPG|PNG|GIF|WEBP|JPEG)', { eager: true, as: 'url' });
    Object.entries(p3Images).forEach(([path, url]) => {
      images.push({
        id: id++,
        src: url,
        caption: `Wonderful Time ${id}`,
        category: 'Festivals',
        folder: 'p3'
      });
    });

    // Import from p4 folder
    const p4Images = import.meta.glob('@/assets/photos/p4/*.(jpg|jpeg|png|gif|webp|JPG|PNG|GIF|WEBP|JPEG)', { eager: true, as: 'url' });
    Object.entries(p4Images).forEach(([path, url]) => {
      images.push({
        id: id++,
        src: url,
        caption: `Sweet Memory ${id}`,
        category: 'Special Moments',
        folder: 'p4'
      });
    });

    // If no images found, add placeholder message
    if (images.length === 0) {
      return Array.from({ length: 8 }, (_, i) => ({
        id: i,
        src: `https://images.unsplash.com/photo-${1516589178581 + i * 1000}-3a259f4e78cf?w=800&auto=format&fit=crop`,
        caption: `Add your photos to src/assets/photos folders`,
        category: categories[Math.floor(Math.random() * (categories.length - 1)) + 1],
        folder: 'placeholder'
      }));
    }

    return images;
  };

  const images = importImages();
  
  const filteredImages = filter === 'All' 
    ? images 
    : images.filter(img => img.category === filter);

  return (
    <div className="min-h-screen relative">
      <FloatingHearts />
      <Navigation />
      
      <main className="relative z-10 container mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="font-seasons text-6xl md:text-7xl text-primary mb-4">
            Moments in Frames 📸
          </h1>
          <p className="font-cmu text-xl text-muted-foreground">
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
              className={`font-catchy rounded-full ${
                filter === category 
                  ? 'bg-primary text-primary-foreground shadow-[var(--shadow-romantic)]' 
                  : 'hover:bg-muted'
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Photo Count */}
        <div className="text-center mb-6">
          <p className="font-cmu text-sm text-muted-foreground">
            {filteredImages.length} {filteredImages.length === 1 ? 'photo' : 'photos'} 
            {filter !== 'All' && ` in ${filter}`}
          </p>
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
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <p className="font-cmu text-white p-4 text-lg">{image.caption}</p>
              </div>
              <div className="absolute top-3 right-3 bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs px-3 py-1 rounded-full font-catchy">
                {image.category}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <div className="text-center py-16">
            <p className="font-catchy text-2xl text-primary mb-4">No photos in this category yet</p>
            <p className="font-cmu text-muted-foreground">
              Add photos to src/assets/photos folders to see them here!
            </p>
          </div>
        )}

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
                  src={images.find(img => img.id === selectedImage)?.src}
                  alt={images.find(img => img.id === selectedImage)?.caption}
                  className="w-full h-auto rounded-2xl max-h-[90vh] object-contain"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-2xl">
                  <p className="font-catchy text-white text-2xl">
                    {images.find(img => img.id === selectedImage)?.caption}
                  </p>
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