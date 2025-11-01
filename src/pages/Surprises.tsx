'use client';

import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { FloatingHearts } from '@/components/FloatingHearts';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Lock, Heart, Star, Sparkles, Copy, Check } from 'lucide-react';

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
      content: `1) Sitting beside you in that triangle shaped bench seating arrangement made by Nivedita Ma’am in 10th grade. (FYI, having Adwait sitting besides me did not help!!)\n2) Telling you I loved you through Raashi’s phone with her and Akshar being on my either sides while my hands trembling from fear sending that text to you\n3) Sanjay Calling you during 12th grade farewell and you texting me after telling me you liked me back, back then!!!\n4) 2019 India Trip. Our first time meeting in person after 2 years! That iconic picture that was taken outside CDI that Ishaan still sends me on my birthday. EVERY YEAR!!!\n5) 2023, the Indore trip because you did Ziddi of going on a trip. Me realizing you are not the shy Aadi I remember anymore!!!\n6) 2025, the calls, texts, virtual movie dates, finally confessing our feelings and getting together after 9 years!!!! (YJHD se kam nahi hai humari kahani!), telling the parents, the entirety of the Goa trip!!!! 2025 has been the most beautiful year of my life!!!`,
      icon: Heart,
      gradient: 'from-pink-400 to-rose-400',
    },
    {
      id: 2,
      title: 'Special Promise',
      locked: false,
      content: `10 Promises to My Forever, Aadi\n\n1. I promise to love you unconditionally, through every high and low, and cherish every moment we share together.\n2. I promise to always be your safe place, the one you can trust, lean on, and confide in without hesitation.\n3. I promise to celebrate your dreams as my own and support you in every step of your journey.\n4. I promise to laugh with you in joy, hold you in sorrow, and never take a single moment with you for granted.\n5. I promise to keep our love playful, fun, and full of surprises, just like it has always been.\n6. I promise to remember the little things that matter to you, the quirks and habits that make you, you.\n7. I promise to stand by you through distance, challenges, and changes, knowing that together we are stronger than anything.\n8. I promise to listen, understand, and communicate with love, patience, and respect — always.\n9. I promise to create countless memories with you — from quiet nights to adventurous trips, from everyday routines to extraordinary moments.\n10. I promise to love you forever, Bibbojaan, making every day a little brighter, every year a little sweeter, and our lifetime a story worth telling.`,
      icon: Star,
      gradient: 'from-purple-400 to-pink-400',
    },
    {
      id: 3,
      title: 'Hidden Wish',
      locked: true,
      content: `1. I wish for endless laughter with you, in every moment, every day, for the rest of our lives.\n2. I wish for quiet mornings where we can just exist together, sipping coffee and sharing smiles.\n3. I wish that every distance between us always feels shorter, no matter where life takes us.\n4. I wish for more inside jokes that only we understand, making the world ours.\n5. I wish for your hand in mine, forever, through every adventure and every storm.\n6. I wish that we always celebrate small wins together, cherishing the little joys of life.\n7. I wish for songs that remind us of each other, looping in our hearts endlessly.\n8. I wish that we never stop holding onto the magic that brought us together.\n9. I wish for cozy nights where we talk about everything and nothing, just us.\n10. I wish for surprise moments that make you smile, because your happiness is my favorite thing.\n11. I wish for a lifetime of trips, memories, and adventures we’ll tell stories about forever.\n12. I wish for patience, understanding, and growth in every part of our journey together.\n13. I wish for mornings where I wake up next to you and realize dreams do come true.\n14. I wish that we never forget the little promises that make our love unique.\n15. I wish for late-night calls that turn into early-morning laughter, no matter the miles between us.\n16. I wish for silent moments where just looking at each other says everything we feel.\n17. I wish for our love to keep growing, becoming stronger, deeper, and more magical every day.\n18. I wish for endless “firsts” with you — new experiences that always feel special and ours.\n19. I wish that we always support each other, even when the world tries to pull us apart.\n20. I wish for forever — just you and me, Bibbojaan and Babi, side by side, always.`,
      icon: Lock,
      gradient: 'from-rose-400 to-pink-300',
    },
    {
      id: 4,
      title: 'Love Note',
      locked: false,
      content: `1. I love you more every single day.\n2. You make my heart feel at home.\n3. Being with you is my favorite thing.\n4. I still get butterflies when I see you.\n5. You make ordinary days feel special.\n6. I love your smile, always.\n7. Just thinking of you makes me happy.\n8. You are my favorite person in the world.\n9. I love every little thing about you.\n10. You make my heart full.\n11. I feel safe whenever I’m with you.\n12. You are my happiest thought every day.\n13. I love our little moments together.\n14. You make life feel brighter and warmer.\n15. I love you for exactly who you are.\n16. My favorite place is anywhere with you.\n17. I still remember the first time I saw you.\n18. I love holding your hand and never letting go.\n19. You make me smile even on hard days.\n20. Forever with you feels like home.`,
      icon: Sparkles,
      gradient: 'from-pink-300 to-purple-400',
    },
    {
      id: 5,
      title: 'Future Surprise',
      locked: true,
      content: `1. Traveling the world together, hand in hand, discovering new places and memories.\n2. Dancing under the stars in a quiet garden, just the two of us.\n3. Spinning around and dancing even when there’s no music, lost in each other.\n4. Staying overnight in a national park, listening to the sounds of nature together.\n5. Watching sunrises and sunsets together, feeling like the world belongs to us.\n6. Having lazy mornings in bed, talking, laughing, and sipping coffee together.\n7. Sitting by a lake, skipping stones, and sharing stories only we understand.\n8. Camping under the stars, wrapped in blankets, feeling tiny in the vast universe together.\n9. Walking on the beach barefoot, letting the waves touch our feet while holding hands.\n10. Cooking meals together, making a mess, and laughing at our little disasters.\n11. Going on spontaneous road trips with no destination, just us and the open road.\n12. Dancing in the rain, laughing like kids, and forgetting everything else.\n13. Watching movies under a blanket fort, cuddled up and warm.\n14. Visiting quaint little towns, exploring hidden streets, and discovering small cafés together.\n15. Sitting around a bonfire, sharing secrets, dreams, and gentle touches.\n16. Stargazing on a quiet rooftop, pointing out constellations and making wishes together.\n17. Building our dream home, decorating it with love, laughter, and memories.\n18. Waking up early to watch snowfall together, holding each other close.\n19. Celebrating anniversaries in unique, magical ways, just the two of us.\n20. Growing old together, still dancing in the kitchen, laughing at the little things, and loving endlessly.`,
      icon: Lock,
      gradient: 'from-purple-300 to-rose-400',
    },
    {
      id: 6,
      title: 'Little Secret',
      locked: false,
      content: `1. Sometimes I pretend not to like your jokes… but secretly I laugh the most.\n2. I still remember the first time I got flustered around you — and it was adorable.\n3. You steal all the blankets, but I secretly like snuggling closer.\n4. I tell Chahat things about you, but she knows I’m just bragging.\n5. You sometimes sing off-key, but I love every note anyway.\n6. I get jealous when someone else makes you laugh, even though I shouldn’t.\n7. I secretly love it when you tease me — just a little.\n8. I still imagine our future together and smile like a fool.\n9. I pretend to be serious sometimes, but I’m thinking about you the whole time.\n10. You think I don’t notice your quirks, but I notice every little one.\n11. I sometimes re-read old chats just to smile about silly memories we made.\n12. I have a list of your cutest habits in my head — it’s impossible not to think of them.\n13. I secretly love how stubborn you can be — it makes you more adorable.\n14. I love when you try to act tough but get embarrassed over small things.\n15. I tell myself not to smile at your messages… and fail every single time.\n16. I sometimes imagine little adventures we’ll go on, even on boring days.\n17. I love how your random thoughts can make me laugh for hours.\n18. I sometimes imagine us growing old together and still teasing each other like we do now — and it makes me so happy.\n19. I get frustrated at you sometimes, but I love you even more after.\n20. My biggest secret? I can’t imagine life without you, Bibbojaan.`,
      icon: Heart,
      gradient: 'from-rose-300 to-pink-400',
    },
  ]);

  const [selectedSurprise, setSelectedSurprise] = useState<number | null>(null);
  const [code, setCode] = useState('');
  const [showCodeDialog, setShowCodeDialog] = useState(false);
  const [copied, setCopied] = useState(false);
  const [pendingUnlockId, setPendingUnlockId] = useState<number | null>(null);

  // Handle unlock attempt
  const handleUnlock = (id: number) => {
    const surprise = surprises.find(s => s.id === id);
    if (!surprise?.locked) {
      setSelectedSurprise(id);
      return;
    }
    setPendingUnlockId(id);
    setShowCodeDialog(true);
  };

  // Confirm code and unlock
  const confirmUnlock = () => {
    if (code.toLowerCase() === 'stuti24' && pendingUnlockId) {
      setSurprises(prev =>
        prev.map(s => s.id === pendingUnlockId ? { ...s, locked: false } : s)
      );
      setShowCodeDialog(false);
      setCode('');
      setTimeout(() => setSelectedSurprise(pendingUnlockId), 100);
    } else {
      alert('Wrong code! Try again.');
    }
  };

  // Double-click to unlock (dev mode)
  const handleDoubleClick = (id: number) => {
    setSurprises(prev =>
      prev.map(s => s.id === id ? { ...s, locked: false } : s)
    );
    setSelectedSurprise(id);
  };

  // Copy content
  const copyContent = () => {
    const content = surprises.find(s => s.id === selectedSurprise)?.content || '';
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen relative">
      <FloatingHearts />
      <Navigation />
      
      <main className="relative z-10 container mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="font-seasons text-6xl md:text-7xl text-primary mb-4">
            Unlock the Magic
          </h1>
          <p className="font-cmu text-xl text-muted-foreground">
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
                onDoubleClick={() => handleDoubleClick(surprise.id)}
              >
                <div className={`relative bg-gradient-to-br ${surprise.gradient} rounded-3xl p-8 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-romantic)] transition-all duration-300 h-full ${
                  !surprise.locked ? 'hover:scale-105' : 'opacity-75'
                }`}>
                  {surprise.locked && (
                    <div className="absolute top-4 right-4">
                      <Lock className="h-6 w-6 text-white/80" />
                    </div>
                  )}

                  <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                    <Icon className="h-10 w-10 text-white" />
                  </div>

                  <h3 className="font-catchy text-3xl text-white mb-4 text-center">
                    {surprise.title}
                  </h3>

                  <p className="text-white/90 text-center font-cmu">
                    {surprise.locked ? 'Click to try unlocking...' : 'Click to reveal! '}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Surprise Dialog – DARK & READABLE */}
        <Dialog open={selectedSurprise !== null} onOpenChange={() => setSelectedSurprise(null)}>
          <DialogContent className="max-w-2xl bg-gray-900 border border-pink-500/30 rounded-3xl">
            {selectedSurprise !== null && (
              <div className="space-y-6 text-center py-8">
                <div className="text-6xl mb-4 animate-float">
                  {surprises.find(s => s.id === selectedSurprise)?.locked ? 'Locked' : 'Gift'}
                </div>
                <h2 className="font-catchy text-4xl text-pink-300">
                  {surprises.find(s => s.id === selectedSurprise)?.title}
                </h2>
                <div className="bg-gray-800/80 rounded-2xl p-8 max-h-96 overflow-y-auto border border-pink-500/20">
                  <p className="font-cmu text-lg text-white leading-relaxed whitespace-pre-line">
                    {surprises.find(s => s.id === selectedSurprise)?.content}
                  </p>
                </div>

                {/* Copy Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyContent}
                  className="gap-2 mx-auto border-pink-400 text-pink-300 hover:bg-pink-900/30"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? 'Copied!' : 'Copy to Clipboard'}
                </Button>

                {!surprises.find(s => s.id === selectedSurprise)?.locked && (
                  <div className="pt-4">
                    <Button
                      onClick={() => setSelectedSurprise(null)}
                      className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-catchy rounded-full px-8 shadow-lg"
                    >
                      Close
                    </Button>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Code Input Dialog */}
        <Dialog open={showCodeDialog} onOpenChange={setShowCodeDialog}>
          <DialogContent className="sm:max-w-md bg-gray-900 border border-pink-500/30 rounded-3xl">
            <DialogHeader>
              <DialogTitle className="font-catchy text-2xl text-center text-pink-300">
                Enter Secret Code
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Input
                placeholder="Hint: stuti24"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="font-cmu text-center bg-gray-800 border-pink-500/50 text-white placeholder:text-gray-400"
                autoFocus
              />
              <div className="flex gap-3 justify-center">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowCodeDialog(false);
                    setCode('');
                    setPendingUnlockId(null);
                  }}
                  className="border-pink-400 text-pink-300 hover:bg-pink-900/30"
                >
                  Cancel
                </Button>
                <Button
                  onClick={confirmUnlock}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-catchy rounded-full"
                >
                  Unlock
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Surprises;