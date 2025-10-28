import { Navigation } from '@/components/Navigation';
import { FloatingHearts } from '@/components/FloatingHearts';
import { Heart, Sparkles, Star, Coffee, Music, Smile } from 'lucide-react';

const loveReasons = [
  { icon: Heart, text: 'Your beautiful smile that lights up my world' },
  { icon: Sparkles, text: 'The way you make every moment magical' },
  { icon: Star, text: 'Your kindness and caring nature' },
  { icon: Coffee, text: 'Our morning coffee conversations' },
  { icon: Music, text: 'How you dance without a care in the world' },
  { icon: Smile, text: 'Your infectious laugh that makes me laugh too' },
];

const AboutUs = () => {
  return (
    <div className="min-h-screen relative">
      <FloatingHearts />
      <Navigation />
      
      <main className="relative z-10 container mx-auto px-4 py-12">
        <div className="text-center mb-16 animate-slide-up">
          {/* Main Title - The Seasons */}
          <h1 className="font-seasons text-6xl md:text-7xl text-primary mb-4">
            The Story of Us 💕
          </h1>
          {/* Subtitle - CMU Serif */}
          <p className="font-cmu text-xl text-muted-foreground">
            A beautiful journey of love, laughter, and endless memories
          </p>
        </div>

        {/* Our Story */}
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Chapter 1 */}
          <section className="animate-slide-up">
            <div className="bg-card rounded-3xl p-8 md:p-12 shadow-[var(--shadow-romantic)] border border-border/50">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-3xl">
                  ✨
                </div>
                {/* Section Title - Catchy Mager */}
                <h2 className="font-catchy text-4xl text-primary">How It All Began</h2>
              </div>
              {/* Content - CMU Serif */}
              <p className="font-cmu text-lg text-foreground/80 leading-relaxed mb-4">
                Some people come into our lives and leave footprints on our hearts. You didn't just leave 
                footprints - you painted my entire world in colors I never knew existed. From the moment 
                our paths crossed, I knew something special was beginning.
              </p>
              <p className="font-cmu text-lg text-foreground/80 leading-relaxed">
                What started as simple conversations turned into endless talks, shared dreams, and a 
                connection that grew stronger with each passing day. You became my best friend, my confidant, 
                and the person who makes every day worth celebrating.
              </p>
            </div>
          </section>

          {/* Chapter 2 */}
          <section className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-card rounded-3xl p-8 md:p-12 shadow-[var(--shadow-romantic)] border border-border/50">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-3xl">
                  💫
                </div>
                {/* Section Title - Catchy Mager */}
                <h2 className="font-catchy text-4xl text-primary">Adventures Together</h2>
              </div>
              {/* Content - CMU Serif */}
              <p className="font-cmu text-lg text-foreground/80 leading-relaxed mb-4">
                From spontaneous trips to planned adventures, every journey with you has been extraordinary. 
                Whether we're exploring new cities, trying new foods, or simply walking hand in hand, 
                you make every experience unforgettable.
              </p>
              <p className="font-cmu text-lg text-foreground/80 leading-relaxed">
                The memories we've created - from flying kites in Uttarayan to dancing on Goa beaches - 
                are treasures I'll cherish forever. With you, even the simplest moments become beautiful stories.
              </p>
            </div>
          </section>

          {/* Little Things I Love */}
          <section className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="text-center mb-8">
              {/* Section Title - Catchy Mager */}
              <h2 className="font-catchy text-5xl text-primary mb-3">
                Little Things I Love About You
              </h2>
              {/* Subtitle - CMU Serif */}
              <p className="font-cmu text-lg text-muted-foreground">
                It's the small things that make you extraordinary
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {loveReasons.map((reason, index) => {
                const Icon = reason.icon;
                return (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-6 border border-primary/20 hover:border-primary/40 transition-all hover:scale-105 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      {/* Text - CMU Serif */}
                      <p className="font-cmu text-lg text-foreground/80 pt-2">
                        {reason.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Quote Section */}
          <section className="animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <div className="bg-[var(--gradient-romantic)] rounded-3xl p-12 text-center">
              <div className="text-6xl mb-6 animate-float">💖</div>
              {/* Quote - Catchy Mager */}
              <blockquote className="font-catchy text-3xl md:text-4xl text-primary mb-6 leading-relaxed">
                "In a world full of temporary things, you are my forever constant"
              </blockquote>
              {/* Subtitle - CMU Serif */}
              <p className="font-cmu text-xl text-foreground/80">
                Here's to us, to our love, and to all the beautiful chapters yet to be written.
              </p>
            </div>
          </section>

          {/* Looking Forward */}
          <section className="animate-slide-up" style={{ animationDelay: '0.8s' }}>
            <div className="bg-card rounded-3xl p-8 md:p-12 shadow-[var(--shadow-romantic)] border border-border/50 text-center">
              {/* Section Title - Catchy Mager */}
              <h2 className="font-catchy text-4xl text-primary mb-6">
                Looking Forward to Forever
              </h2>
              {/* Content - CMU Serif */}
              <p className="font-cmu text-lg text-foreground/80 leading-relaxed max-w-2xl mx-auto">
                As we celebrate your 24th birthday today, I'm filled with excitement for all the 
                adventures, memories, and moments we'll share in the years to come. Every day with 
                you is a gift, and I can't wait to see what our story holds next.
              </p>
              <div className="mt-8 text-5xl">🎂 ✨ 💕 🎉</div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AboutUs;