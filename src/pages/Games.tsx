import { Navigation } from '@/components/Navigation';
import { FloatingHearts } from '@/components/FloatingHearts';
import { Button } from '@/components/ui/button';
import { Heart, Grid3x3, Sparkles, Gift, Target, Puzzle } from 'lucide-react';

const games = [
  {
    title: 'Love Tic Tac Toe',
    icon: Grid3x3,
    description: 'Play our special version with hearts and kisses',
    gradient: 'from-pink-400 to-rose-400',
  },
  {
    title: 'Catch the Heart',
    icon: Heart,
    description: 'Catch falling hearts in this sweet game',
    gradient: 'from-purple-400 to-pink-400',
  },
  {
    title: 'Memory Match',
    icon: Sparkles,
    description: 'Match our special moments and photos',
    gradient: 'from-rose-300 to-pink-400',
  },
  {
    title: 'Guess the Moment',
    icon: Target,
    description: 'Can you remember when and where?',
    gradient: 'from-pink-300 to-purple-400',
  },
  {
    title: 'Love Fortune Spinner',
    icon: Gift,
    description: 'Spin to reveal sweet messages',
    gradient: 'from-purple-300 to-rose-400',
  },
  {
    title: 'Puzzle Us Together',
    icon: Puzzle,
    description: 'Complete our photo puzzles',
    gradient: 'from-pink-400 to-purple-300',
  },
];

const Games = () => {
  return (
    <div className="min-h-screen relative">
      <FloatingHearts />
      <Navigation />
      
      <main className="relative z-10 container mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="font-cursive text-6xl md:text-7xl text-primary mb-4">
            Playful Hearts 🎮
          </h1>
          <p className="font-serif text-xl text-muted-foreground">
            Let's have fun together with our special games
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game, index) => {
            const Icon = game.icon;
            return (
              <div
                key={game.title}
                className="group animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-card rounded-3xl p-8 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-romantic)] transition-all duration-300 hover:scale-105 h-full border border-border/50">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${game.gradient} flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform`}>
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="font-cursive text-2xl text-primary mb-3 text-center">
                    {game.title}
                  </h3>
                  <p className="text-muted-foreground text-center mb-6 font-serif">
                    {game.description}
                  </p>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-serif rounded-full shadow-[var(--shadow-romantic)]">
                    Play Now
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center bg-[var(--gradient-soft)] rounded-3xl p-12 max-w-4xl mx-auto animate-fade-in">
          <p className="font-cursive text-3xl text-primary mb-4">
            "Every game we play is another memory we create" 💕
          </p>
          <p className="font-serif text-muted-foreground">
            More games coming soon! Each one designed with love just for us.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Games;
