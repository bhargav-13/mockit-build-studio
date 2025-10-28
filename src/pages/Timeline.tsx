import { Navigation } from '@/components/Navigation';
import { FloatingHearts } from '@/components/FloatingHearts';
import { Calendar, Heart } from 'lucide-react';

interface Milestone {
  id: number;
  title: string;
  date: string;
  description: string;
  icon: string;
}

const Timeline = () => {
  const milestones: Milestone[] = [
    {
      id: 1,
      title: 'The Beginning',
      date: 'Where It All Started',
      description: 'The moment our paths crossed and everything changed. From strangers to the most important person in my life.',
      icon: '✨',
    },
    {
      id: 2,
      title: 'First Trip Together',
      date: 'Adventure Awaits',
      description: 'Our first adventure together - exploring new places, creating memories, and realizing how perfect we are as travel partners.',
      icon: '✈️',
    },
    {
      id: 3,
      title: 'Uttarayan Visit',
      date: 'Kites & Dreams',
      description: 'Flying kites and watching dreams soar. A day filled with laughter, colors, and the joy of being together.',
      icon: '🪁',
    },
    {
      id: 4,
      title: 'Goa Madness',
      date: 'Beach & Beyond',
      description: 'Sun, sand, and endless fun! Our Goa trip was pure magic - from beach walks to crazy adventures we\'ll never forget.',
      icon: '🏖️',
    },
    {
      id: 5,
      title: 'Special Celebrations',
      date: 'Every Moment Counts',
      description: 'From birthdays to festivals, every celebration with you is extraordinary. You make ordinary days feel special.',
      icon: '🎉',
    },
    {
      id: 6,
      title: 'Today - Your 24th!',
      date: 'The Present',
      description: 'Celebrating you, celebrating us, celebrating this beautiful journey we\'re on together.',
      icon: '🎂',
    },
  ];

  return (
    <div className="min-h-screen relative">
      <FloatingHearts />
      <Navigation />
      
      <main className="relative z-10 container mx-auto px-4 py-12">
        <div className="text-center mb-16 animate-slide-up">
          {/* Main Title - The Seasons */}
          <h1 className="font-seasons text-6xl md:text-7xl text-primary mb-4">
            Our Journey So Far 📅
          </h1>
          {/* Subtitle - CMU Serif */}
          <p className="font-cmu text-xl text-muted-foreground">
            Every step of the way, hand in hand, heart to heart
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto relative">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary opacity-30" />

          {milestones.map((milestone, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={milestone.id}
                className={`relative mb-16 animate-slide-up ${
                  isEven ? 'md:pr-1/2' : 'md:pl-1/2 md:text-right'
                }`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 -ml-4 md:-ml-5 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl shadow-[var(--shadow-romantic)] z-10">
                  {milestone.icon}
                </div>

                {/* Content card */}
                <div className={`ml-20 md:ml-0 ${isEven ? 'md:mr-16' : 'md:ml-16'}`}>
                  <div className="bg-card rounded-3xl p-6 md:p-8 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-romantic)] transition-all duration-300 border border-border/50">
                    <div className="flex items-center gap-2 mb-3 text-primary">
                      <Calendar className="h-5 w-5" />
                      {/* Date - CMU Serif */}
                      <span className="font-cmu text-sm">{milestone.date}</span>
                    </div>
                    {/* Milestone Title - Catchy Mager */}
                    <h3 className="font-catchy text-3xl md:text-4xl text-primary mb-3">
                      {milestone.title}
                    </h3>
                    {/* Description - CMU Serif */}
                    <p className="font-cmu text-lg text-foreground/80 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Final message */}
          <div className="relative text-center mt-20 animate-fade-in">
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-12 border-2 border-primary/20">
              <Heart className="h-16 w-16 text-primary mx-auto mb-6 animate-float" />
              {/* Quote - Catchy Mager */}
              <p className="font-catchy text-4xl md:text-5xl text-primary mb-4">
                And this is only the beginning...
              </p>
              {/* Subtitle - CMU Serif */}
              <p className="font-cmu text-xl text-foreground/80">
                Here's to countless more adventures, memories, and moments together 💕
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Timeline;