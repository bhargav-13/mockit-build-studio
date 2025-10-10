import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { FloatingHearts } from '@/components/FloatingHearts';
import { Button } from '@/components/ui/button';
import { Play, Pause, SkipForward, SkipBack, Plus } from 'lucide-react';

interface Song {
  id: number;
  title: string;
  artist: string;
  note?: string;
}

const Playlist = () => {
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const songs: Song[] = [
    { id: 1, title: 'Perfect', artist: 'Ed Sheeran', note: 'Our song ❤️' },
    { id: 2, title: 'All of Me', artist: 'John Legend', note: 'You complete me' },
    { id: 3, title: 'A Thousand Years', artist: 'Christina Perri', note: 'Forever with you' },
    { id: 4, title: 'Thinking Out Loud', artist: 'Ed Sheeran', note: 'Dancing in the kitchen' },
    { id: 5, title: 'Beautiful in White', artist: 'Shane Filan', note: 'Dreams of the future' },
  ];

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentSong((prev) => (prev + 1) % songs.length);
  };

  const handlePrevious = () => {
    setCurrentSong((prev) => (prev - 1 + songs.length) % songs.length);
  };

  return (
    <div className="min-h-screen relative">
      <FloatingHearts />
      <Navigation />
      
      <main className="relative z-10 container mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="font-cursive text-6xl md:text-7xl text-primary mb-4">
            Our Songs Forever 🎵
          </h1>
          <p className="font-serif text-xl text-muted-foreground">
            The soundtrack of our love story
          </p>
        </div>

        {/* Music Player */}
        <div className="max-w-2xl mx-auto mb-12 animate-fade-in">
          <div className="bg-card rounded-3xl shadow-[var(--shadow-romantic)] p-8 border border-border/50">
            {/* Album Art Placeholder */}
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/30 to-secondary/30 mb-6 flex items-center justify-center">
              <div className={`text-8xl ${isPlaying ? 'animate-pulse' : ''}`}>🎵</div>
            </div>

            {/* Song Info */}
            <div className="text-center mb-6">
              <h3 className="font-serif text-2xl font-semibold text-foreground mb-2">
                {songs[currentSong].title}
              </h3>
              <p className="text-muted-foreground mb-2">{songs[currentSong].artist}</p>
              {songs[currentSong].note && (
                <p className="font-cursive text-lg text-primary">{songs[currentSong].note}</p>
              )}
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-primary rounded-full transition-all duration-1000 ${isPlaying ? 'w-1/3' : 'w-0'}`}
                />
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrevious}
                className="rounded-full w-14 h-14 hover:bg-muted"
              >
                <SkipBack className="h-6 w-6" />
              </Button>
              
              <Button
                onClick={handlePlayPause}
                className="rounded-full w-16 h-16 bg-primary hover:bg-primary/90 shadow-[var(--shadow-romantic)]"
              >
                {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                onClick={handleNext}
                className="rounded-full w-14 h-14 hover:bg-muted"
              >
                <SkipForward className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>

        {/* Playlist */}
        <div className="max-w-2xl mx-auto space-y-3">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-2xl font-semibold text-foreground">Playlist</h2>
            <Button variant="outline" className="rounded-full gap-2">
              <Plus className="h-4 w-4" />
              Add Song
            </Button>
          </div>

          {songs.map((song, index) => (
            <div
              key={song.id}
              onClick={() => setCurrentSong(index)}
              className={`bg-card rounded-2xl p-4 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-romantic)] transition-all cursor-pointer border border-border/50 animate-slide-up ${
                currentSong === index ? 'bg-primary/5 border-primary/50' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-serif ${
                  currentSong === index && isPlaying ? 'animate-pulse' : ''
                }`}>
                  {currentSong === index && isPlaying ? '▶' : index + 1}
                </div>
                <div className="flex-1">
                  <h4 className="font-serif font-semibold text-foreground">{song.title}</h4>
                  <p className="text-sm text-muted-foreground">{song.artist}</p>
                </div>
                {song.note && (
                  <p className="font-cursive text-sm text-primary hidden md:block">{song.note}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Playlist;
