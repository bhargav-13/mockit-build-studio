import { useState, useEffect } from 'react';
import { X, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const BirthdayPopup = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [confetti, setConfetti] = useState<Array<{ id: number; color: string; delay: number }>>([]);

  useEffect(() => {
    // Generate confetti pieces with cosmic colors
    const pieces = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      color: ['hsl(258, 92%, 76%)', 'hsl(330, 81%, 60%)', 'hsl(277, 87%, 76%)', 'hsl(330, 85%, 70%)'][i % 4],
      delay: Math.random() * 2,
    }));
    setConfetti(pieces);
  }, []);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-fade-in" />
      
      {/* Confetti */}
      <div className="fixed inset-0 z-[51] pointer-events-none overflow-hidden">
        {confetti.map((piece) => (
          <div
            key={piece.id}
            className="absolute w-3 h-3 animate-confetti"
            style={{
              left: `${Math.random() * 100}%`,
              backgroundColor: piece.color,
              animationDelay: `${piece.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Popup */}
      <div className="fixed inset-0 z-[52] flex items-center justify-center p-4">
        <div className="relative bg-card rounded-3xl shadow-[var(--shadow-cosmic)] p-8 md:p-12 max-w-2xl w-full animate-popup-enter border-2 border-primary/40">
          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 hover:bg-primary/10"
          >
            <X className="h-5 w-5" />
          </Button>

          {/* Content */}
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <h1 className="font-seasons text-5xl md:text-7xl bg-gradient-to-r from-[hsl(var(--vibrant-purple))] to-[hsl(var(--hot-pink))] bg-clip-text text-transparent animate-title-glow">
                Happiest 24th,
              </h1>
              <h2 className="font-seasons text-6xl md:text-8xl bg-gradient-to-r from-[hsl(var(--vibrant-purple))] to-[hsl(var(--hot-pink))] bg-clip-text text-transparent animate-title-glow">
                Babi! 💕
              </h2>
            </div>
            
            <p className="font-cmu text-lg md:text-xl text-foreground">
              Welcome to your special day, filled with love, memories, and endless surprises
            </p>

            <div className="flex gap-4 justify-center pt-4">
              <Button
                onClick={() => setIsOpen(false)}
                className="bg-gradient-to-r from-[hsl(var(--vibrant-purple))] to-[hsl(var(--hot-pink))] hover:opacity-90 text-white font-catchy text-lg px-8 py-6 rounded-full shadow-[var(--shadow-cosmic)]"
              >
                Let's Celebrate! 🎉
              </Button>
            </div>
          </div>

          {/* Floating hearts decoration */}
          <div className="absolute -top-6 -left-6 text-4xl animate-float">💕</div>
          <div className="absolute -top-4 -right-8 text-3xl animate-float-delayed">🎂</div>
          <div className="absolute -bottom-6 -left-4 text-3xl animate-float-delayed">✨</div>
          <div className="absolute -bottom-4 -right-6 text-4xl animate-float">🎈</div>
        </div>
      </div>

      {/* Floating Music Control */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsMuted(!isMuted)}
        className="fixed bottom-6 right-6 z-[53] rounded-full w-14 h-14 bg-card hover:bg-primary/20 border-2 border-primary/50 shadow-[var(--shadow-soft)]"
      >
        {isMuted ? <VolumeX className="h-6 w-6 text-foreground" /> : <Volume2 className="h-6 w-6 text-foreground" />}
      </Button>
    </>
  );
};
