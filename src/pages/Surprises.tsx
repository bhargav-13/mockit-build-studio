import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { FloatingHearts } from '@/components/FloatingHearts';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Lock, Unlock, Gift, Heart, Star, Sparkles } from 'lucide-react';

interface Surprise {
  id: number;
  title: string;
  locked: boolean;
  content: string;
  icon: any;
  gradient: string;
}

const Surprises = () => {
  const [surprises, setSurprises] = useState<Surprise[]>([
    {
      id: 1,
      title: 'Sweet Memory',
      locked: false,
      content: 'Remember that time we laughed so hard we cried? Your laugh is my favorite sound in the world. Every moment with you is a treasure. 💕',
      icon: Heart,
      gradient: 'from-pink-400 to-rose-400',
    },
    {
      id: 2,
      title: 'Special Promise',
      locked: false,
      content: 'I promise to always be there for you, to make you smile, and to love you more with each passing day. You are my forever. 🌟',
      icon: Star,
      gradient: 'from-purple-400 to-pink-400',
    },
    {
      id: 3,
      title: 'Hidden Wish',
      locked: true,
      content: 'This surprise will unlock on your next special milestone... Stay tuned! 🎁',
      icon: Gift,
      gradient: 'from-rose-400 to-pink-300',
    },
    {
      id: 4,
      title: 'Love Note',
      locked: false,
      content: 'You make every day feel like magic. Thank you for being you - kind, beautiful, amazing, and absolutely perfect in every way. ✨',
      icon: Sparkles,
      gradient: 'from-pink-300 to-purple-400',
    },
    {
      id: 5,
      title: 'Future Surprise',
      locked: true,
      content: 'Something special is waiting for you soon... Keep this close to your heart! 💝',
      icon: Lock,
      gradient: 'from-purple-300 to-rose-400',
    },
    {
      id: 6,
      title: 'Little Secret',
      locked: false,
      content: 'Every time I see you, my heart skips a beat. Even after all this time, you still give me butterflies. You are my dream come true. 🦋',
      icon: Heart,
      gradient: 'from-rose-300 to-pink-400',
    },
  ]);

  const [selectedSurprise, setSelectedSurprise] = useState<number | null>(null);

  const handleUnlock = (id: number) => {
    const surprise = surprises.find(s => s.id === id);
    if (!surprise?.locked) {
      setSelectedSurprise(id);
    }
  };

  return (
    <div className="min-h-screen relative">
      <FloatingHearts />
      <Navigation />
      
      <main className="relative z-10 container mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="font-cursive text-6xl md:text-7xl text-primary mb-4">
            Unlock the Magic 🎁
          </h1>
          <p className="font-serif text-xl text-muted-foreground">
            Special surprises and secrets just for you
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {surprises.map((surprise, index) => {
            const Icon = surprise.icon;
            return (
              <div
                key={surprise.id}
                className="group animate-slide-up cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleUnlock(surprise.id)}
              >
                <div className={`relative bg-gradient-to-br ${surprise.gradient} rounded-3xl p-8 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-romantic)] transition-all duration-300 h-full ${
                  !surprise.locked ? 'hover:scale-105' : 'opacity-75'
                }`}>
                  {/* Lock indicator */}
                  {surprise.locked && (
                    <div className="absolute top-4 right-4">
                      <Lock className="h-6 w-6 text-white/80" />
                    </div>
                  )}

                  {/* Icon */}
                  <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                    <Icon className="h-10 w-10 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="font-cursive text-3xl text-white mb-4 text-center">
                    {surprise.title}
                  </h3>

                  {/* Preview */}
                  <p className="text-white/90 text-center font-serif">
                    {surprise.locked ? 'Click to try unlocking...' : 'Click to reveal! ✨'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Surprise Dialog */}
        <Dialog open={selectedSurprise !== null} onOpenChange={() => setSelectedSurprise(null)}>
          <DialogContent className="max-w-2xl bg-card border-2 border-primary/20">
            {selectedSurprise !== null && (
              <div className="space-y-6 text-center py-8">
                <div className="text-6xl mb-4 animate-float">
                  {surprises.find(s => s.id === selectedSurprise)?.locked ? '🔒' : '🎁'}
                </div>
                <h2 className="font-cursive text-4xl text-primary">
                  {surprises.find(s => s.id === selectedSurprise)?.title}
                </h2>
                <div className="bg-muted/30 rounded-2xl p-8">
                  <p className="font-serif text-xl text-foreground leading-relaxed">
                    {surprises.find(s => s.id === selectedSurprise)?.content}
                  </p>
                </div>
                {!surprises.find(s => s.id === selectedSurprise)?.locked && (
                  <div className="pt-4">
                    <Button
                      onClick={() => setSelectedSurprise(null)}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground font-serif rounded-full px-8 shadow-[var(--shadow-romantic)]"
                    >
                      Close 💕
                    </Button>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Surprises;
