import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { FloatingHearts } from '@/components/FloatingHearts';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Plus, Mail } from 'lucide-react';
import { useDataPersistence } from '@/hooks/useDataPersistence';

interface Letter {
  id: number;
  title: string;
  content: string;
  date: string;
}

const defaultLetters: Letter[] = [
  {
    id: 1,
    title: 'To My Dearest Aadi',
    content: 'Every moment with you feels like a dream come true. You make my world brighter, my days happier, and my heart fuller. Thank you for being you. 💕',
    date: 'Always',
  },
  {
    id: 2,
    title: 'Our First Adventure',
    content: 'I still remember the first time we explored together. Your laugh, your smile, the way you made everything feel magical - those memories are treasures I hold close to my heart.',
    date: 'Forever Remembered',
  },
];

const Letters = () => {
  const { data: letters, updateData: setLetters, isLoading } = useDataPersistence<Letter[]>('aadi-letters', defaultLetters);
  
  const [selectedLetter, setSelectedLetter] = useState<number | null>(null);
  const [isAddingLetter, setIsAddingLetter] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  const handleAddLetter = () => {
    if (newTitle.trim() && newContent.trim()) {
      const newLetter: Letter = {
        id: Math.max(...letters.map(l => l.id), 0) + 1,
        title: newTitle,
        content: newContent,
        date: new Date().toLocaleDateString(),
      };
      setLetters([...letters, newLetter]);
      setNewTitle('');
      setNewContent('');
      setIsAddingLetter(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      <FloatingHearts />
      <Navigation />
      
      <main className="relative z-10 container mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-slide-up">
          {/* Main Title - The Seasons */}
          <h1 className="font-seasons text-6xl md:text-7xl text-primary mb-4">
            From My Heart to Yours 💌
          </h1>
          {/* Subtitle - CMU Serif */}
          <p className="font-cmu text-xl text-muted-foreground">
            Words of love, sealed with affection
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-8">
          <Button
            onClick={() => setIsAddingLetter(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-catchy rounded-full shadow-[var(--shadow-romantic)] gap-2"
          >
            <Plus className="h-5 w-5" />
            Write a New Letter
          </Button>
        </div>

        {/* Letters Grid */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {isLoading ? (
            <div className="col-span-2 text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="font-cmu text-muted-foreground">Loading letters...</p>
            </div>
          ) : (
            letters.map((letter, index) => (
            <div
              key={letter.id}
              onClick={() => setSelectedLetter(letter.id)}
              className="relative group cursor-pointer animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Envelope */}
              <div className="bg-card rounded-2xl shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-romantic)] transition-all duration-300 p-8 border-2 border-primary/20 group-hover:border-primary/40">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <Mail className="h-8 w-8" />
                  </div>
                  <div className="flex-1">
                    {/* Letter Title - Catchy Mager */}
                    <h3 className="font-catchy text-2xl text-primary mb-1">
                      {letter.title}
                    </h3>
                    {/* Date - CMU Serif */}
                    <p className="text-sm text-muted-foreground font-cmu">{letter.date}</p>
                  </div>
                </div>
                {/* Preview - CMU Serif */}
                <p className="font-cmu text-muted-foreground line-clamp-3">
                  {letter.content}
                </p>
                <div className="mt-4 text-primary font-catchy text-sm group-hover:underline">
                  Click to read more →
                </div>
              </div>
            </div>
            ))
          )}
        </div>

        {/* Read Letter Dialog */}
        <Dialog open={selectedLetter !== null} onOpenChange={() => setSelectedLetter(null)}>
          <DialogContent className="max-w-2xl bg-card border-2 border-primary/20">
            {selectedLetter !== null && (
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <div className="text-6xl mb-4 animate-float">💌</div>
                  {/* Letter Title - Catchy Mager */}
                  <DialogTitle className="font-catchy text-4xl text-primary">
                    {letters.find(l => l.id === selectedLetter)?.title}
                  </DialogTitle>
                  {/* Date - CMU Serif */}
                  <p className="text-sm text-muted-foreground font-cmu">
                    {letters.find(l => l.id === selectedLetter)?.date}
                  </p>
                </div>
                <div className="bg-muted/30 rounded-2xl p-6">
                  {/* Content - CMU Serif */}
                  <p className="font-cmu text-lg text-foreground leading-relaxed whitespace-pre-wrap">
                    {letters.find(l => l.id === selectedLetter)?.content}
                  </p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Add Letter Dialog */}
        <Dialog open={isAddingLetter} onOpenChange={setIsAddingLetter}>
          <DialogContent className="max-w-2xl bg-card border-2 border-primary/20">
            <DialogHeader>
              {/* Dialog Title - Catchy Mager */}
              <DialogTitle className="font-catchy text-3xl text-primary text-center">
                Write a New Letter 💕
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="font-catchy text-sm text-foreground mb-2 block">Letter Title</label>
                <Input
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Give your letter a beautiful title..."
                  className="font-cmu border-primary/20"
                />
              </div>
              <div>
                <label className="font-catchy text-sm text-foreground mb-2 block">Your Message</label>
                <Textarea
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Pour your heart out..."
                  rows={8}
                  className="font-cmu border-primary/20"
                />
              </div>
              <div className="flex gap-3 justify-end pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsAddingLetter(false)}
                  className="font-catchy rounded-full"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddLetter}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-catchy rounded-full shadow-[var(--shadow-romantic)]"
                >
                  Save Letter
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Letters;