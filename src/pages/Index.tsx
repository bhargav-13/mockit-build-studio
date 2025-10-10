import { BirthdayPopup } from '@/components/BirthdayPopup';
import { FloatingHearts } from '@/components/FloatingHearts';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Camera, Music, Mail, Gamepad2, MessageSquare, Calendar, Gift, Heart } from 'lucide-react';
import coupleHero from '@/assets/couple-hero.jpg';

const features = [
  {
    icon: Camera,
    title: 'Gallery',
    description: 'Moments captured in frames',
    to: '/gallery',
    gradient: 'from-pink-300 to-rose-400',
  },
  {
    icon: Music,
    title: 'Our Playlist',
    description: 'Songs that define us',
    to: '/playlist',
    gradient: 'from-purple-300 to-pink-400',
  },
  {
    icon: Mail,
    title: 'Love Letters',
    description: 'From my heart to yours',
    to: '/letters',
    gradient: 'from-rose-300 to-pink-400',
  },
  {
    icon: Gamepad2,
    title: 'Mini Games',
    description: 'Playful hearts together',
    to: '/games',
    gradient: 'from-pink-400 to-purple-400',
  },
  {
    icon: MessageSquare,
    title: 'Wish Wall',
    description: 'Messages for Aadi',
    to: '/wish-wall',
    gradient: 'from-purple-400 to-pink-300',
  },
  {
    icon: Calendar,
    title: 'Our Journey',
    description: 'Timeline of our love',
    to: '/timeline',
    gradient: 'from-pink-300 to-purple-300',
  },
  {
    icon: Gift,
    title: 'Surprises',
    description: 'Unlock the magic',
    to: '/surprises',
    gradient: 'from-rose-400 to-pink-400',
  },
  {
    icon: Heart,
    title: 'About Us',
    description: 'Our beautiful story',
    to: '/about',
    gradient: 'from-pink-400 to-rose-300',
  },
];

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <BirthdayPopup />
      <FloatingHearts />
      <Navigation />
      
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[var(--gradient-romantic)] opacity-50" />
          <div className="container mx-auto px-4 py-20 relative">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-slide-up">
                <h1 className="font-cursive text-6xl md:text-8xl text-primary leading-tight">
                  The Portal of Love
                </h1>
                <p className="font-serif text-xl md:text-2xl text-foreground/80">
                  A celebration of us, our memories, and the beautiful journey we share together 💕
                </p>
                <div className="flex gap-4 pt-4">
                  <Button 
                    asChild
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-serif text-lg px-8 py-6 rounded-full shadow-[var(--shadow-romantic)]"
                  >
                    <Link to="/gallery">Explore Memories</Link>
                  </Button>
                  <Button 
                    asChild
                    variant="outline"
                    className="font-serif text-lg px-8 py-6 rounded-full border-2 border-primary hover:bg-primary/10"
                  >
                    <Link to="/about">Our Story</Link>
                  </Button>
                </div>
              </div>
              
              <div className="relative animate-fade-in">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-3xl" />
                <img 
                  src={coupleHero} 
                  alt="Aadi and Love" 
                  className="relative rounded-3xl shadow-[var(--shadow-romantic)] w-full h-auto animate-float"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="container mx-auto px-4 py-20">
          <h2 className="font-cursive text-5xl md:text-6xl text-center text-primary mb-12 animate-slide-up">
            Explore Our World ✨
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={feature.to}
                  to={feature.to}
                  className="group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="bg-card rounded-2xl p-6 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-romantic)] transition-all duration-300 hover:scale-105 h-full border border-border/50 animate-slide-up">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Quote Section */}
        <section className="bg-[var(--gradient-soft)] py-20">
          <div className="container mx-auto px-4 text-center">
            <blockquote className="font-cursive text-3xl md:text-5xl text-primary max-w-4xl mx-auto leading-relaxed animate-fade-in">
              "Every moment with you is a page in our beautiful love story, 
              and today we celebrate another wonderful chapter."
            </blockquote>
            <p className="font-serif text-xl text-foreground/60 mt-6">
              — With endless love 💕
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
