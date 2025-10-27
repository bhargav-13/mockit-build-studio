import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { FloatingHearts } from '@/components/FloatingHearts';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Plus, Sparkles } from 'lucide-react';
import { useDataPersistence } from '@/hooks/useDataPersistence';

interface Wish {
  id: number;
  name: string;
  message: string;
  color: string;
}

const defaultWishes: Wish[] = [
  { id: 1, name: 'Your Biggest Fan', message: 'Happy Birthday Aadi! May this year bring you endless joy! 🎉', color: 'from-pink-300 to-rose-400' },
  { id: 2, name: 'Forever Yours', message: 'To the most amazing person - you deserve all the happiness in the world! 💕', color: 'from-purple-300 to-pink-400' },
  { id: 3, name: 'With Love', message: 'Celebrating you today and always. You make life beautiful! ✨', color: 'from-rose-300 to-pink-300' },
];

const WishWall = () => {
  const { data: wishes, updateData: setWishes, isLoading } = useDataPersistence<Wish[]>('aadi-wishes', defaultWishes);

  const [isAddingWish, setIsAddingWish] = useState(false);
  const [newName, setNewName] = useState('');
  const [newMessage, setNewMessage] = useState('');

  const colors = [
    'from-pink-300 to-rose-400',
    'from-purple-300 to-pink-400',
    'from-rose-300 to-pink-300',
    'from-pink-400 to-purple-400',
    'from-purple-400 to-rose-300',
  ];

  const handleAddWish = () => {
    if (newName.trim() && newMessage.trim()) {
      const newWish: Wish = {
        id: Math.max(...wishes.map(w => w.id), 0) + 1,
        name: newName,
        message: newMessage,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
      setWishes([...wishes, newWish]);
      setNewName('');
      setNewMessage('');
      setIsAddingWish(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      <FloatingHearts />
      <Navigation />
      
      <main className="relative z-10 container mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="font-cursive text-6xl md:text-7xl text-primary mb-4">
            Messages for Aadi 💭
          </h1>
          <p className="font-serif text-xl text-muted-foreground">
            A wall of love, wishes, and beautiful thoughts
          </p>
        </div>

        <div className="max-w-6xl mx-auto mb-8 text-center">
          <Button
            onClick={() => setIsAddingWish(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-serif rounded-full shadow-[var(--shadow-romantic)] gap-2"
          >
            <Plus className="h-5 w-5" />
            Add Your Wish
          </Button>
        </div>

        {/* Wish Wall */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              <div className="col-span-3 text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="font-serif text-muted-foreground">Loading wishes...</p>
              </div>
            ) : (
              wishes.map((wish, index) => (
              <div
                key={wish.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`bg-gradient-to-br ${wish.color} rounded-2xl p-6 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-romantic)] transition-all hover:scale-105 h-full relative overflow-hidden`}>
                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 text-6xl opacity-20 -mr-4 -mt-4">
                    <Sparkles className="h-16 w-16" />
                  </div>
                  
                  <div className="relative z-10">
                    <p className="font-serif text-white text-lg mb-4 leading-relaxed min-h-[100px]">
                      "{wish.message}"
                    </p>
                    <p className="font-cursive text-white/90 text-xl">
                      — {wish.name}
                    </p>
                  </div>
                </div>
              </div>
              ))
            )}
          </div>
        </div>

        {/* Add Wish Dialog */}
        <Dialog open={isAddingWish} onOpenChange={setIsAddingWish}>
          <DialogContent className="max-w-2xl bg-card border-2 border-primary/20">
            <DialogHeader>
              <DialogTitle className="font-cursive text-3xl text-primary text-center">
                Share Your Wish 💕
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="font-serif text-sm text-foreground mb-2 block">Your Name</label>
                <Input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="How should we call you?"
                  className="font-serif border-primary/20"
                />
              </div>
              <div>
                <label className="font-serif text-sm text-foreground mb-2 block">Your Message</label>
                <Textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Write your birthday wish for Aadi..."
                  rows={6}
                  className="font-serif border-primary/20"
                />
              </div>
              <div className="flex gap-3 justify-end pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsAddingWish(false)}
                  className="font-serif rounded-full"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddWish}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-serif rounded-full shadow-[var(--shadow-romantic)]"
                >
                  Add to Wall
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default WishWall;
