import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { FloatingHearts } from "@/components/FloatingHearts";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Plus, Mail } from "lucide-react";
import { useDataPersistence } from "@/hooks/useDataPersistence";

interface Letter {
  id: number;
  title: string;
  content: string;
  date: string;
}

const defaultLetters: Letter[] = [
  {
    id: 1,
    title: "To My Dearest Saslu",
    content: `Dearest Saslu,

Happy Birthday, my love.

Another year of you — of your laughter, your warmth, your stubborn kindness, your ridiculous jokes that only you find funny — and somehow, I still can't believe I get to call you mine.

I've wished for a lot of things in life, but you are the only wish that didn't just come true — you stayed. You became home. Every time I think about you, it feels like the world exhales softly, like everything falls into rhythm again. I don't know what I did right in some past life to deserve you, but I hope I keep doing it right in this one.

Today isn't just your birthday — it's a celebration of the person who quietly changes the world around him just by being in it. You've made me braver, softer, and somehow more me. And for that, I'll always be grateful.

There's something I haven't said before — maybe because I never found the right words for it. But here it is:

 I don't just love you for who you are. I love you in spite of everything that isn't perfect, everything that makes you real. I love the small pauses when you think too long, the tired silences, the unspoken words, the way you always come back. It's in those imperfect moments that I find the truest version of us — raw, flawed, and endlessly beautiful.

You are my favorite story, Aadi. The one I'll never stop writing, never stop reading, never stop believing in.

So, here's to you — to your heart, your light, your being. May this year be gentle with you, full of the same love you've given me in ways you don't even realize.

With everything I am,

Yours, always — Bibbojaan`,
    date: "Always",
  },
  {
    id: 2,
    title: "The Spaces Between",
    content: `Dearest Babi,

Happy Birthday, my love.

 But before I say anything else — just pause. Take a breath. Look around. You're here. You've grown. You've built something beautiful out of yourself, piece by piece, day by day — and I've been lucky enough to watch it happen up close.

Today, I don't want to write about how much I love you (you already know that, don't you?). I want to write about the spaces between — the in-betweens of us.

The in-between when we're not talking but our hearts still do.

The quiet in-between of late-night scrolling and sleepy "goodnights."

The calm in-between moments after a fight when we find our way back to laughter again.

That's where I think love really lives — not in the fireworks, not in the grand gestures, but in the pauses where we still choose each other anyway.

You've become my favorite kind of calm, Aadi. Not the loud, dramatic kind — but the stillness that feels safe, the silence that feels like a heartbeat. You don't just make life brighter; you make it softer, slower, more real.

Sometimes, I wonder what our love will look like years from now — maybe less restless, maybe quieter, maybe stronger. But I know this much: the spaces between will always be filled with you.

So, on your birthday, I want you to remember this — you don't have to be extraordinary for me to love you. You already are, in all the small ways you probably don't even notice.

Happy Birthday, my heart.

 For every in-between and every forever,

— Yours, always, Bibbojaan`,
    date: "Forever",
  },
  {
    id: 3,
    title: "You Were Always Worth the Wait",
    content: `Dearest Babi,

Do you realize what today is?

Your birthday — but also the first one where I can finally say this while looking at you, not through a screen, not through a call, not through words traveling miles. You're here. We're here.

Sometimes, when I watch you move around our home — making coffee, humming some random tune, wearing that same old T-shirt you've refused to throw away — I still feel that ache in my chest, the one that used to come from missing you. But now it's softer. It's gratitude. It's disbelief that after all the distance, all the countdowns, all the nights of wishing time would move faster — I get to wake up next to you.

I still remember those nights when we'd fall asleep on calls, the sound of your breathing slowly fading into static. Back then, even silence felt like company because it was you. And now, that silence has turned into comfort — the kind that fills the room when you're beside me, half-asleep, hand loosely holding mine.

We did it, Aadi. We turned distance into devotion, waiting into something worth waiting for.

And I think that's my favorite thing about us — we didn't give up when it got hard. We built something stronger instead.

So here we are.

Your birthday, our home, the quiet after years of noise.

And I still love you like the first day — maybe even more, because now I've seen how love can survive everything it wasn't supposed to.

OMG!!! Sorry I guess I was dreaming all this!!! Hehe!!! I know for a fact that the day where we actually get to do this on your birthday is just 2 years awayyy and I can't be more excited about that!!!

Happy Birthday, my forever.

You were always worth the wait.

— Yours, finally home (Still dreaming), Bibbojaan`,
    date: "Soon",
  },
];

const Letters = () => {
  const {
    data: letters,
    updateData: setLetters,
    isLoading,
  } = useDataPersistence<Letter[]>("aadi-letters", defaultLetters);

  const [selectedLetter, setSelectedLetter] = useState<number | null>(null);
  const [isAddingLetter, setIsAddingLetter] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const handleAddLetter = () => {
    if (newTitle.trim() && newContent.trim()) {
      const newLetter: Letter = {
        id: Math.max(...letters.map((l) => l.id), 0) + 1,
        title: newTitle,
        content: newContent,
        date: new Date().toLocaleDateString(),
      };
      setLetters([...letters, newLetter]);
      setNewTitle("");
      setNewContent("");
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
              <p className="font-cmu text-muted-foreground">
                Loading letters...
              </p>
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
                      <p className="text-sm text-muted-foreground font-cmu">
                        {letter.date}
                      </p>
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
        <Dialog
          open={selectedLetter !== null}
          onOpenChange={() => setSelectedLetter(null)}
        >
          <DialogContent className="max-w-2xl max-h-[90vh] bg-card border-2 border-primary/20 overflow-hidden flex flex-col">
            {selectedLetter !== null && (
              <div className="space-y-6 overflow-y-auto pr-2 -mr-2">
                <div className="text-center space-y-2">
                  <div className="text-6xl mb-4 animate-float">💌</div>
                  {/* Letter Title - Catchy Mager */}
                  <DialogTitle className="font-catchy text-4xl text-primary">
                    {letters.find((l) => l.id === selectedLetter)?.title}
                  </DialogTitle>
                  {/* Date - CMU Serif */}
                  <p className="text-sm text-muted-foreground font-cmu">
                    {letters.find((l) => l.id === selectedLetter)?.date}
                  </p>
                </div>
                <div className="bg-muted/30 rounded-2xl p-6">
                  {/* Content - CMU Serif */}
                  <p className="font-cmu text-lg text-foreground leading-relaxed whitespace-pre-wrap">
                    {letters.find((l) => l.id === selectedLetter)?.content}
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
                <label className="font-catchy text-sm text-foreground mb-2 block">
                  Letter Title
                </label>
                <Input
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Give your letter a beautiful title..."
                  className="font-cmu border-primary/20"
                />
              </div>
              <div>
                <label className="font-catchy text-sm text-foreground mb-2 block">
                  Your Message
                </label>
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
