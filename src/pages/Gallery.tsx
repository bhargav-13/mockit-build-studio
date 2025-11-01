import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { FloatingHearts } from '@/components/FloatingHearts';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X } from 'lucide-react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Import all images from photos folders
  const importImages = () => {
    const images: any[] = [];
    let id = 0;

    // Import from p1 folder
    const p1Images = import.meta.glob('@/assets/photos/p1/*.(jpg|jpeg|png|gif|webp|JPG|PNG|GIF|WEBP|JPEG)', { eager: true, as: 'url' });
    Object.entries(p1Images).forEach(([path, url]) => {
      images.push({
        id: id++,
        src: url
      });
    });

    // Import from p2 folder
    const p2Images = import.meta.glob('@/assets/photos/p2/*.(jpg|jpeg|png|gif|webp|JPG|PNG|GIF|WEBP|JPEG)', { eager: true, as: 'url' });
    Object.entries(p2Images).forEach(([path, url]) => {
      images.push({
        id: id++,
        src: url
      });
    });

    // Import from p3 folder
    const p3Images = import.meta.glob('@/assets/photos/p3/*.(jpg|jpeg|png|gif|webp|JPG|PNG|GIF|WEBP|JPEG)', { eager: true, as: 'url' });
    Object.entries(p3Images).forEach(([path, url]) => {
      images.push({
        id: id++,
        src: url
      });
    });

    // Import from p4 folder
    const p4Images = import.meta.glob('@/assets/photos/p4/*.(jpg|jpeg|png|gif|webp|JPG|PNG|GIF|WEBP|JPEG)', { eager: true, as: 'url' });
    Object.entries(p4Images).forEach(([path, url]) => {
      images.push({
        id: id++,
        src: url
      });
    });

    // If no images found, add placeholder message
    if (images.length === 0) {
      return Array.from({ length: 8 }, (_, i) => ({
        id: i,
        src: `https://images.unsplash.com/photo-${1516589178581 + i * 1000}-3a259f4e78cf?w=800&auto=format&fit=crop`
      }));
    }

    return images;
  };

  const images = importImages();

  return (
    <div className="min-h-screen relative">
      <FloatingHearts />
      <Navigation />
      
      <main className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-8 md:mb-12 animate-slide-up">
          <h1 className="font-seasons text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-primary mb-3 md:mb-4">
            Moments in Frames 📸
          </h1>
          <p className="font-cmu text-lg md:text-xl text-muted-foreground">
            Every picture tells our beautiful story
          </p>
        </div>

        {/* Photo Count */}
        <div className="text-center mb-6">
          <p className="font-cmu text-sm text-muted-foreground">
            {images.length} {images.length === 1 ? 'photo' : 'photos'}
          </p>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
          {images.map((image, index) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-xl md:rounded-2xl shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-romantic)] transition-all duration-300 cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
              onClick={() => setSelectedImage(image.id)}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={image.src}
                  alt="Gallery image"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {images.length === 0 && (
          <div className="text-center py-16">
            <p className="font-catchy text-2xl text-primary mb-4">No photos yet</p>
            <p className="font-cmu text-muted-foreground">
              Add photos to src/assets/photos folders to see them here!
            </p>
          </div>
        )}

        {/* Lightbox Dialog */}
        <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-[95vw] md:max-w-4xl p-0 bg-transparent border-none">
            {selectedImage !== null && (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-10 md:-top-12 right-0 text-white hover:bg-white/20 z-10"
                >
                  <X className="h-5 w-5 md:h-6 md:w-6" />
                </Button>
                <img
                  src={images.find(img => img.id === selectedImage)?.src}
                  alt="Gallery image"
                  className="w-full h-auto rounded-xl md:rounded-2xl max-h-[85vh] md:max-h-[90vh] object-contain"
                />
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Gallery;