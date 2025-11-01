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
      title: '10th Grade: First Crush',
      date: '2017',
      description: 'I first liked you during SUPW class in 10th grade, and when I expressed it, you gently said you liked me only as a friend. Little did I know, this was just the beginning of our story.',
      icon: '💖',  // Heart emoji
    },
    {
      id: 2,
      title: '12th Grade: The Truth Revealed',
      date: '2019',
      description: 'By 12th grade, you told me you actually liked me back but couldn\'t pursue anything because of long-distance concerns. I remember calling Chahat, crying, and processing everything that had happened.',
      icon: '💭',  // Thought bubble emoji
    },
    {
      id: 3,
      title: 'First Trip to Indore',
      date: '2023',
      description: 'After years apart, our first trip to Indore happened, and it was an absolute blast! Laughter, adventure, and countless memories brought us closer than ever before. Even if it was just as friends.',
      icon: '✈️',  // Airplane emoji
    },
    {
      id: 4,
      title: 'Mumbai Trip: Friendship Deepens',
      date: 'January 2025',
      description: 'During our Mumbai trip, we became closer as friends than ever. Shared conversations, inside jokes, and small moments strengthened our bond in ways words can\'t describe.',
      icon: '🏙️',  // Cityscape emoji
    },
    {
      id: 5,
      title: 'Distance & Growth',
      date: 'Early 2025',
      description: 'After you returned to the USA, we faced personal challenges and small issues, but being there for each other helped us grow closer and understand one another on a deeper level.',
      icon: '🌍',  // Globe emoji
    },
    {
      id: 6,
      title: 'Officially Together',
      date: 'May 1st, 2025',
      description: 'After nine long years, we finally became a couple. The 10th-grade Stuti saw her first love come through, and it felt magical and surreal to finally be together.',
      icon: '💕',  // Two hearts emoji
    },
    {
      id: 7,
      title: 'Telling the Families',
      date: 'July 2025',
      description: 'By the end of July, we introduced each other to our families. Both families instantly loved us for who we are and supported our love wholeheartedly.',
      icon: '👨‍👩‍👧‍👦',  // Family emoji
    },
    {
      id: 8,
      title: 'Forever Together',
      date: 'The Future',
      description: 'From first love to long-distance growth, from laughter-filled trips to officially being together, our journey continues. The future holds endless love, countless memories, and forever with each other.',
      icon: '♾️',  // Infinity emoji
    },
  ];

  return (
    <div className="min-h-screen relative">
      <FloatingHearts />
      <Navigation />
      
      <main className="relative z-10 container mx-auto px-4 py-12">
        <div className="text-center mb-16 animate-slide-up">
          <h1 className="font-seasons text-6xl md:text-7xl text-primary mb-4">
            The Journey of Us: Memories & Moments
          </h1>
          <p className="font-cmu text-xl text-muted-foreground">
            Every step of the way, hand in hand, heart to heart
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
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
                <div className="absolute left-8 md:left-1/2 -ml-4 md:-ml-5 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl shadow-[var(--shadow-romantic)] z-10">
                  {milestone.icon}
                </div>

                <div className={`ml-20 md:ml-0 ${isEven ? 'md:mr-16' : 'md:ml-16'}`}>
                  <div className="bg-card rounded-3xl p-6 md:p-8 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-romantic)] transition-all duration-300 border border-border/50">
                    <div className="flex items-center gap-2 mb-3 text-primary">
                      <Calendar className="h-5 w-5" />
                      <span className="font-cmu text-sm">{milestone.date}</span>
                    </div>
                    <h3 className="font-catchy text-3xl md:text-4xl text-primary mb-3">
                      {milestone.title}
                    </h3>
                    <p className="font-cmu text-lg text-foreground/80 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="relative text-center mt-20 animate-fade-in">
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-12 border-2 border-primary/20">
              <Heart className="h-16 w-16 text-primary mx-auto mb-6 animate-float" />
              <p className="font-catchy text-4xl md:text-5xl text-primary mb-4">
                And this is only the beginning...
              </p>
              <p className="font-cmu text-xl text-foreground/80">
                Here's to countless more adventures, memories, and moments together
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Timeline;