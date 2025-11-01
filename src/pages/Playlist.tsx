import { useState, useRef, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { FloatingHearts } from '@/components/FloatingHearts';
import { Button } from '@/components/ui/button';
import { Play, Pause, SkipForward, SkipBack } from 'lucide-react';

// Import all songs from the playlist folder
const songFiles = import.meta.glob('@/assets/playlist/*.mp3', { eager: true, as: 'url' });

interface Song {
  id: number;
  title: string;
  artist: string;
  src: string;
  note?: string;
}

const Playlist = () => {
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Format the song data from the imported files
  const songs: Song[] = Object.entries(songFiles).map(([path, src], index) => {
    // Extract song name from path and clean it up
    const fileName = path.split('/').pop() || '';
    const songName = fileName
      .replace(/\.mp3$/, '')
      .replace(/_/g, ' ')
      .replace(/\(\d+\)/g, '') // Remove any (1), (2) etc. from duplicate filenames
      .trim();
      
    return {
      id: index + 1,
      title: songName,
      artist: 'Our Playlist',
      src: src as string,
      note: ''
    };
  });

  // Handle play/pause
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error('Error playing audio:', error);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong]);

  // Handle song change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error('Error playing audio:', error);
          setIsPlaying(false);
        });
      }
    }
  }, [currentSong]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;
    
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const seekTime = pos * duration;
    
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.error('Error playing audio:', error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleNext = () => {
    setCurrentSong((prev) => (prev + 1) % songs.length);
    // Reset time when changing songs
    setCurrentTime(0);
  };

  const handlePrevious = () => {
    setCurrentSong((prev) => (prev - 1 + songs.length) % songs.length);
    // Reset time when changing songs
    setCurrentTime(0);
  };

  const handleEnded = () => {
    handleNext();
  };

  return (
    <div className="min-h-screen relative">
      <FloatingHearts />
      <Navigation />
      
      <main className="relative z-10 container mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-slide-up">
          {/* Main Title - The Seasons */}
          <h1 className="font-seasons text-6xl md:text-7xl text-primary mb-4">
            Our Songs Forever 🎵
          </h1>
          {/* Subtitle - CMU Serif */}
          <p className="font-cmu text-xl text-muted-foreground">
          Forever written in our melody instead of our songs forever
Our song, always. Instead of the soundtrack of our melody.
The songs sent to you right now are original so the name of the artist should be “bibbo”

          </p>
        </div>

        {/* Hidden Audio Element */}
        <audio
          ref={audioRef}
          src={songs[currentSong]?.src}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleTimeUpdate}
          onEnded={handleEnded}
          preload="metadata"
        />

        {/* Music Player */}
        <div className="max-w-2xl mx-auto mb-12 animate-fade-in">
          <div className="bg-card rounded-3xl shadow-[var(--shadow-romantic)] p-8 border border-border/50">
            {/* Album Art Placeholder */}
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/30 to-secondary/30 mb-6 flex items-center justify-center">
              <div className={`text-8xl ${isPlaying ? 'animate-pulse' : ''}`}>🎵</div>
            </div>

            {/* Song Info */}
            <div className="text-center mb-6">
              {/* Song Title - Catchy Mager */}
              <h3 className="font-catchy text-2xl font-semibold text-foreground mb-2">
                {songs[currentSong]?.title || 'No song selected'}
              </h3>
              {/* Artist - CMU Serif */}
              <p className="font-cmu text-muted-foreground mb-2">{songs[currentSong]?.artist || ''}</p>
              {songs[currentSong]?.note && (
                <p className="font-catchy text-lg text-primary italic">{songs[currentSong].note}</p>
              )}
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="h-2 bg-muted rounded-full overflow-hidden cursor-pointer" onClick={handleSeek}>
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ 
                    width: duration ? `${(currentTime / duration) * 100}%` : '0%',
                    transitionProperty: 'width',
                    transitionDuration: '0.3s',
                    transitionTimingFunction: 'linear'
                  }}
                />
              </div>
              {/* Time Display - CMU Serif */}
              <div className="flex justify-between text-xs font-cmu text-muted-foreground mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
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
            {/* Section Title - Catchy Mager */}
            <h2 className="font-catchy text-2xl font-semibold text-foreground">Our Playlist</h2>
          </div>

          {songs.map((song, index) => (
            <div
              key={song.id}
              onClick={() => {
                if (currentSong === index) {
                  handlePlayPause();
                } else {
                  setCurrentSong(index);
                  if (!isPlaying) setIsPlaying(true);
                }
              }}
              className={`group bg-card rounded-2xl p-4 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-romantic)] transition-all cursor-pointer border border-border/50 animate-slide-up ${
                currentSong === index ? 'bg-primary/5 border-primary/50' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-4">
                <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-catchy transition-all ${
                  currentSong === index ? 'scale-110' : 'group-hover:scale-105'
                }`}>
                  {currentSong === index ? (
                    isPlaying ? (
                      <div className="flex space-x-1">
                        <span className="h-1 w-1 bg-white rounded-full animate-pulse"></span>
                        <span className="h-1 w-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
                        <span className="h-1 w-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
                      </div>
                    ) : (
                      <Play className="h-5 w-5 ml-0.5" fill="white" />
                    )
                  ) : (
                    <span className="text-white">{index + 1}</span>
                  )}
                </div>
                <div className="flex-1">
                  {/* Song Title - Catchy Mager */}
                  <h4 className="font-catchy font-semibold text-foreground">{song.title}</h4>
                  {/* Artist - CMU Serif */}
                  <p className="text-sm font-cmu text-muted-foreground">{song.artist}</p>
                </div>
                {song.note && (
                  <p className="font-catchy text-sm text-primary italic hidden md:block">{song.note}</p>
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