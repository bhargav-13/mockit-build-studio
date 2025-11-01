'use client';

import { useState, useEffect } from 'react';
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

/* ------------------------------------------------------------------
   1. REAL WISHES (the ones you gave)
   ------------------------------------------------------------------ */
const REAL_WISHES: Wish[] = [
  {
    id: 1,
    name: 'Dhruv',
    message:
      'Dear jiju, I hope you have great day and I hope that all of you drems come true .I wish your strength , love, happiness and an amazing future with my sister \n\nJiJA JI , light camera action Enjoy the BIRTHDAY celebration',
    color: 'from-pink-300 to-rose-400',
  },
  {
    id: 2,
    name: 'Diya',
    message:
      'Happy Birthday Aadi!! I hope you have a great time celebrating 24 - one year closer to quarter century crisis',
    color: 'from-purple-300 to-pink-400',
  },
  {
    id: 3,
    name: 'Yash',
    message:
      'Happy birthday bhaii!! one year closer to our trip to turkey party soon soon',
    color: 'from-rose-300 to-pink-300',
  },
  {
    id: 4,
    name: 'Rajvee',
    message:
      "Heyy Happy Birthday Aadi,\nCheers to turning 24, It's crazy how we had no clue about eachother about 2 years ago and now we were planning gifts for stuti's birthday haha. Hoping that you get suitably spoiled today by her (and everyone else!). You are a great friend and a good listener. Sooo enjoy the celebration. Wishing you the best year yet—and don't forget to save me a slice of cake!",
    color: 'from-pink-400 to-purple-400',
  },
  {
    id: 5,
    name: 'Stuti',
    message:
      'Hiaa Babiiii!!\nHappy Birthday, my love! You make my world brighter, my heart fuller, and every moment magical. I’m endlessly grateful for you — your laughter, your love, and your presence. Here’s to more memories, dreams, and forever together. I love you endlessly, Babi.',
    color: 'from-purple-400 to-rose-300',
  },
  {
    id: 6,
    name: 'Leah',
    message:
      'Happy birthday aadi! i’m so glad we were able to become not just work friends (haha) but real friends! i’m thankful to have met you and i can’t wait to make more memories togetha. and teach you more korean and learn more hindi! happy 24th!! let’s party hardy',
    color: 'from-pink-300 to-purple-400',
  },
  {
    id: 7,
    name: 'Sungmin',
    message:
      'Happy Birthday Aadi! Looking forward to our India and Korea trips one day. Chalo',
    color: 'from-rose-300 to-pink-400',
  },
];

/* ------------------------------------------------------------------
   2. Hook that **always** returns the persisted list
   ------------------------------------------------------------------ */
const useWishPersistence = () => {
  const { data, updateData, isLoading } = useDataPersistence<Wish[]>(
    'aadi-wishes',
    [] // <-- start empty, we will seed on first load
  );

  // Seed the real wishes **only once** (when nothing is stored yet)
  useEffect(() => {
    if (!isLoading && data.length === 0) {
      updateData(REAL_WISHES);
    }
  }, [data, isLoading, updateData]);

  return { wishes: data, setWishes: updateData, isLoading };
};

/* ------------------------------------------------------------------
   3. Component
   ------------------------------------------------------------------ */
const WishWall = () => {
  const { wishes, setWishes, isLoading } = useWishPersistence();

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
    if (!newName.trim() || !newMessage.trim()) return;

    const newWish: Wish = {
      id: Math.max(...wishes.map((w) => w.id), 0) + 1,
      name: newName.trim(),
      message: newMessage.trim(),
      color: colors[Math.floor(Math.random() * colors.length)],
    };

    setWishes([...wishes, newWish]);
    setNewName('');
    setNewMessage('');
    setIsAddingWish(false);
  };

  return (
    <div className="min-h-screen relative">
      <FloatingHearts />
      <Navigation />

      <main className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="font-seasons text-6xl md:text-7xl text-primary mb-4">
            Messages for Aadi
          </h1>
          <p className="font-cmu text-xl text-muted-foreground">
            A wall of love, wishes, and beautiful thoughts
          </p>
        </div>

        {/* Add button */}
        <div className="max-w-6xl mx-auto mb-8 text-center">
          <Button
            onClick={() => setIsAddingWish(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-catchy rounded-full shadow-[var(--shadow-romantic)] gap-2"
          >
            <Plus className="h-5 w-5" />
            Add Your Wish
          </Button>
        </div>

        {/* Wish grid */}
        <div className="max-w-6xl mx-auto">
          {isLoading ? (
            <div className="col-span-3 text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
              <p className="font-cmu text-muted-foreground">Loading wishes...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishes.map((wish, idx) => (
                <div
                  key={wish.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div
                    className={`bg-gradient-to-br ${wish.color} rounded-2xl p-6 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-romantic)] transition-all hover:scale-105 h-full relative overflow-hidden`}
                  >
                    {/* Sparkles decoration */}
                    <div className="absolute top-0 right-0 text-6xl opacity-20 -mr-4 -mt-4">
                      <Sparkles className="h-16 w-16" />
                    </div>

                    <div className="relative z-10">
                      <p className="font-cmu text-white text-lg mb-4 leading-relaxed min-h-[100px] whitespace-pre-wrap">
                        "{wish.message}"
                      </p>
                      <p className="font-catchy text-white/90 text-xl">
                        — {wish.name}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add-wish dialog */}
        <Dialog open={isAddingWish} onOpenChange={setIsAddingWish}>
          <DialogContent className="max-w-2xl bg-card border-2 border-primary/20">
            <DialogHeader>
              <DialogTitle className="font-catchy text-3xl text-primary text-center">
                Share Your Wish
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <label className="font-catchy text-sm text-foreground mb-2 block">
                  Your Name
                </label>
                <Input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="How should we call you?"
                  className="font-cmu border-primary/20"
                />
              </div>

              <div>
                <label className="font-catchy text-sm text-foreground mb-2 block">
                  Your Message
                </label>
                <Textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Write your birthday wish for Aadi..."
                  rows={6}
                  className="font-cmu border-primary/20"
                />
              </div>

              <div className="flex gap-3 justify-end pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsAddingWish(false)}
                  className="font-catchy rounded-full"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddWish}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-catchy rounded-full shadow-[var(--shadow-romantic)]"
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