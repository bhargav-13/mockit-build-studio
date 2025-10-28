import React, { useState, useEffect, useRef } from 'react';
import { Navigation } from '@/components/Navigation';
import { FloatingHearts } from '@/components/FloatingHearts';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Heart, Grid3x3, Sparkles, Gift, Target, Puzzle, Trophy, X, RotateCcw } from 'lucide-react';

// Score persistence hook using Database
const useGameScores = () => {
  const [scores, setScores] = useState({
    tictactoe: 0,
    catchheart: 0,
    memory: 0,
    guessmoment: 0,
    spinner: 0,
    puzzle: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  // Load scores on mount
  useEffect(() => {
    const loadScores = async () => {
      try {
        // Try to load from Database first
        const savedScores = await Database.load('aadi-game-scores');
        if (savedScores) {
          setScores(savedScores);
        } else {
          // Fallback to localStorage if Database is empty
          const localScores = localStorage.getItem('aadi-game-scores');
          if (localScores) {
            const parsed = JSON.parse(localScores);
            setScores(parsed);
            // Save to Database for future
            await Database.save('aadi-game-scores', parsed);
          }
        }
      } catch (error) {
        console.error('Error loading scores:', error);
        // Fallback to localStorage
        const localScores = localStorage.getItem('aadi-game-scores');
        if (localScores) {
          setScores(JSON.parse(localScores));
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadScores();
  }, []);

  const updateScore = async (game, newScore) => {
    const newScores = {
      ...scores,
      [game]: Math.max(scores[game] || 0, newScore)
    };
    setScores(newScores);
    
    try {
      // Save to Database
      await Database.save('aadi-game-scores', newScores);
      // Also keep localStorage as backup
      localStorage.setItem('aadi-game-scores', JSON.stringify(newScores));
    } catch (error) {
      console.error('Error saving scores:', error);
      // Fallback to localStorage only
      localStorage.setItem('aadi-game-scores', JSON.stringify(newScores));
    }
  };

  return { scores, updateScore, isLoading };
};

// Import Database utility (add at the top of the file)
const Database = {
  async save(key, data) {
    try {
      // Save to localStorage as primary storage
      localStorage.setItem(key, JSON.stringify(data));
      
      // Also try to save to JSONBin if configured
      const BIN_ID = '68f7d53cae596e708f2245a7';
      const API_KEY = '$2a$10$uBoTRHHfnKMolID1f4T9nOwItwnhdTto8j8OGT/wBzCnEFPXmwPl.';
      
      if (BIN_ID && API_KEY) {
        const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': API_KEY,
          },
          body: JSON.stringify({ [key]: data }),
        });
        
        if (!response.ok) {
          console.warn('Cloud save failed, using localStorage only');
        }
      }
    } catch (error) {
      console.error('Database save error:', error);
      // localStorage already saved above, so we're good
    }
  },

  async load(key) {
    try {
      // Try cloud storage first
      const BIN_ID = '68f7d53cae596e708f2245a7';
      const API_KEY = '$2a$10$uBoTRHHfnKMolID1f4T9nOwItwnhdTto8j8OGT/wBzCnEFPXmwPl.';
      
      if (BIN_ID && API_KEY) {
        const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
          headers: {
            'X-Master-Key': API_KEY,
          },
        });

        if (response.ok) {
          const result = await response.json();
          return result.record[key] || null;
        }
      }
    } catch (error) {
      console.warn('Cloud load failed, using localStorage');
    }
    
    // Fallback to localStorage
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
};

// Tic Tac Toe Game
const TicTacToe = ({ onClose, onScore }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [wins, setWins] = useState(0);

  const checkWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (i) => {
    if (board[i] || winner) return;
    const newBoard = [...board];
    newBoard[i] = isXNext ? '💕' : '💋';
    setBoard(newBoard);
    
    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      if (gameWinner === '💕') {
        const newWins = wins + 1;
        setWins(newWins);
        onScore(newWins);
      }
    } else if (!newBoard.includes(null)) {
      setWinner('draw');
    }
    
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-lg font-semibold text-primary mb-2">Your Wins: {wins}</p>
        <p className="text-muted-foreground">You: 💕 | Computer: 💋</p>
      </div>
      
      <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
        {board.map((cell, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className="aspect-square bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl text-4xl hover:from-pink-200 hover:to-purple-200 transition-all shadow-lg"
          >
            {cell}
          </button>
        ))}
      </div>

      {winner && (
        <div className="text-center space-y-4">
          <p className="text-2xl font-bold text-primary">
            {winner === 'draw' ? "It's a Draw!" : winner === '💕' ? 'You Won! 🎉' : 'Computer Won!'}
          </p>
          <Button onClick={resetGame} className="rounded-full">
            Play Again
          </Button>
        </div>
      )}
    </div>
  );
};

// Catch the Heart Game
const CatchTheHeart = ({ onClose, onScore }) => {
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (gameOver || timeLeft <= 0) {
      onScore(score);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const heartSpawner = setInterval(() => {
      setHearts(prev => [...prev, {
        id: Date.now(),
        x: Math.random() * 350,
        y: -20
      }]);
    }, 1000);

    return () => {
      clearInterval(timer);
      clearInterval(heartSpawner);
    };
  }, [gameOver, timeLeft]);

  useEffect(() => {
    const moveHearts = setInterval(() => {
      setHearts(prev => prev
        .map(heart => ({ ...heart, y: heart.y + 5 }))
        .filter(heart => heart.y < 400)
      );
    }, 50);

    return () => clearInterval(moveHearts);
  }, []);

  const catchHeart = (heartId) => {
    setHearts(prev => prev.filter(h => h.id !== heartId));
    setScore(prev => prev + 1);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-lg font-semibold">
        <span className="text-primary">Score: {score}</span>
        <span className="text-secondary">Time: {timeLeft}s</span>
      </div>

      <div className="relative bg-gradient-to-b from-purple-100 to-pink-100 rounded-2xl h-96 overflow-hidden">
        {hearts.map(heart => (
          <button
            key={heart.id}
            onClick={() => catchHeart(heart.id)}
            className="absolute text-4xl transition-all hover:scale-125"
            style={{ left: `${heart.x}px`, top: `${heart.y}px` }}
          >
            💕
          </button>
        ))}
      </div>

      {gameOver && (
        <div className="text-center space-y-4">
          <p className="text-2xl font-bold text-primary">Game Over!</p>
          <p className="text-xl">Final Score: {score}</p>
          <Button onClick={() => window.location.reload()} className="rounded-full">
            Play Again
          </Button>
        </div>
      )}
    </div>
  );
};

// Memory Match Game
const MemoryMatch = ({ onClose, onScore }) => {
  const emojis = ['💕', '💖', '💗', '💝', '💞', '💓', '💘', '💌'];
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    const shuffled = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, i) => ({ id: i, emoji }));
    setCards(shuffled);
  }, []);

  useEffect(() => {
    if (flipped.length === 2) {
      const [first, second] = flipped;
      if (cards[first].emoji === cards[second].emoji) {
        setMatched([...matched, first, second]);
        setFlipped([]);
        if (matched.length + 2 === cards.length) {
          onScore(Math.max(0, 100 - moves));
        }
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
      setMoves(moves + 1);
    }
  }, [flipped]);

  const handleClick = (i) => {
    if (flipped.length === 2 || flipped.includes(i) || matched.includes(i)) return;
    setFlipped([...flipped, i]);
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <p className="text-lg font-semibold text-primary">Moves: {moves}</p>
        <p className="text-sm text-muted-foreground">Score = 100 - Moves</p>
      </div>

      <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
        {cards.map((card, i) => (
          <button
            key={card.id}
            onClick={() => handleClick(i)}
            className={`aspect-square rounded-xl text-3xl transition-all shadow-lg ${
              flipped.includes(i) || matched.includes(i)
                ? 'bg-gradient-to-br from-pink-300 to-purple-300'
                : 'bg-gradient-to-br from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200'
            }`}
          >
            {flipped.includes(i) || matched.includes(i) ? card.emoji : '❓'}
          </button>
        ))}
      </div>

      {matched.length === cards.length && cards.length > 0 && (
        <div className="text-center space-y-4">
          <p className="text-2xl font-bold text-primary">You Won! 🎉</p>
          <p className="text-xl">Score: {Math.max(0, 100 - moves)}</p>
        </div>
      )}
    </div>
  );
};

// Love Fortune Spinner
const FortuneSpinner = ({ onClose, onScore }) => {
  const messages = [
    "You're amazing! 💕",
    "Love you forever! 💖",
    "You make me smile! 😊",
    "Best day ever! 🎉",
    "Together forever! 💑",
    "My heart is yours! 💝",
    "Sweet dreams! 🌙",
    "You're my star! ⭐"
  ];

  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState(null);
  const [spins, setSpins] = useState(0);

  const spin = () => {
    setSpinning(true);
    setResult(null);
    const newRotation = rotation + 360 * 5 + Math.random() * 360;
    setRotation(newRotation);
    
    setTimeout(() => {
      setSpinning(false);
      const index = Math.floor(Math.random() * messages.length);
      setResult(messages[index]);
      const newSpins = spins + 1;
      setSpins(newSpins);
      onScore(newSpins);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-lg font-semibold text-primary">Total Spins: {spins}</p>
      </div>

      <div className="relative w-64 h-64 mx-auto">
        <div
          className="w-full h-full rounded-full bg-gradient-to-br from-pink-400 via-purple-400 to-rose-400 shadow-2xl transition-transform duration-3000 ease-out"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl">🎯</span>
          </div>
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2">
          <div className="w-0 h-0 border-l-8 border-r-8 border-t-12 border-l-transparent border-r-transparent border-t-white"></div>
        </div>
      </div>

      <div className="text-center space-y-4">
        <Button
          onClick={spin}
          disabled={spinning}
          className="rounded-full px-8"
        >
          {spinning ? 'Spinning...' : 'Spin the Wheel'}
        </Button>

        {result && (
          <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-6">
            <p className="text-2xl font-bold text-primary">{result}</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Main Games Component
const Games = () => {
  const { scores, updateScore, isLoading } = useGameScores();
  const [selectedGame, setSelectedGame] = useState(null);

  const games = [
    {
      id: 'tictactoe',
      title: 'Love Tic Tac Toe',
      icon: Grid3x3,
      description: 'Hearts vs Kisses - Beat the computer!',
      gradient: 'from-pink-400 to-rose-400',
      component: TicTacToe
    },
    {
      id: 'catchheart',
      title: 'Catch the Heart',
      icon: Heart,
      description: 'Catch as many hearts as you can!',
      gradient: 'from-purple-400 to-pink-400',
      component: CatchTheHeart
    },
    {
      id: 'memory',
      title: 'Memory Match',
      icon: Sparkles,
      description: 'Match the love emojis!',
      gradient: 'from-rose-300 to-pink-400',
      component: MemoryMatch
    },
    {
      id: 'spinner',
      title: 'Love Fortune Spinner',
      icon: Gift,
      description: 'Spin to reveal sweet messages!',
      gradient: 'from-purple-300 to-rose-400',
      component: FortuneSpinner
    }
  ];

  const currentGame = games.find(g => g.id === selectedGame);

  if (isLoading) {
    return (
      <div className="min-h-screen relative flex items-center justify-center">
        <FloatingHearts />
        <Navigation />
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary mx-auto mb-4"></div>
          <p className="font-cmu text-xl text-muted-foreground">Loading your games...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <FloatingHearts />
      <Navigation />
      
      <main className="relative z-10 container mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="font-seasons text-6xl md:text-7xl text-primary mb-4">
            Playful Hearts 🎮
          </h1>
          <p className="font-cmu text-xl text-muted-foreground">
            Let's have fun together with our special games
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-12">
          {games.map((game, index) => {
            const Icon = game.icon;
            return (
              <div
                key={game.id}
                className="group animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-card rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 h-full border border-border/50">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${game.gradient} flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform`}>
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                  
                  <h3 className="font-catchy text-2xl text-primary mb-3 text-center">
                    {game.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-center mb-4 font-cmu">
                    {game.description}
                  </p>

                  <div className="flex items-center justify-center gap-2 mb-4 text-secondary">
                    <Trophy className="h-5 w-5" />
                    <span className="font-semibold">Best: {scores[game.id] || 0}</span>
                  </div>
                  
                  <Button 
                    onClick={() => setSelectedGame(game.id)}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-catchy rounded-full shadow-lg"
                  >
                    Play Now
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center bg-gradient-to-r from-pink-100 to-purple-100 rounded-3xl p-12 max-w-4xl mx-auto animate-fade-in">
          <p className="font-catchy text-3xl text-primary mb-4">
            "Every game we play is another memory we create" 💕
          </p>
          <p className="font-cmu text-muted-foreground mb-2">
            Your high scores are saved permanently across all devices!
          </p>
          <p className="font-cmu text-sm text-muted-foreground/60">
            ✨ Scores sync automatically via cloud storage
          </p>
        </div>
      </main>

      {/* Game Dialog */}
      <Dialog open={selectedGame !== null} onOpenChange={() => setSelectedGame(null)}>
        <DialogContent className="max-w-2xl bg-card">
          <DialogHeader>
            <DialogTitle className="font-catchy text-3xl text-primary text-center">
              {currentGame?.title}
            </DialogTitle>
          </DialogHeader>
          
          <div className="mt-4">
            {currentGame && (
              <currentGame.component
                onClose={() => setSelectedGame(null)}
                onScore={(score) => updateScore(currentGame.id, score)}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Games;