import React, { useState, useEffect, useRef } from 'react';
import { Navigation } from '@/components/Navigation';
import { FloatingHearts } from '@/components/FloatingHearts';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Heart, Grid3x3, Sparkles, Gift, Target, Trophy, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

// Score persistence hook using Database
const useGameScores = () => {
  const [scores, setScores] = useState({
    tictactoe: 0,
    catchheart: 0,
    memory: 0,
    guessmoment: 0,
    spinner: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadScores = async () => {
      try {
        const savedScores = await Database.load('aadi-game-scores');
        if (savedScores) {
          setScores(savedScores);
        }
      } catch (error) {
        console.error('Error loading scores:', error);
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
      await Database.save('aadi-game-scores', newScores);
    } catch (error) {
      console.error('Error saving scores:', error);
    }
  };

  const resetScores = async () => {
    const resetScores = {
      tictactoe: 0,
      catchheart: 0,
      memory: 0,
      guessmoment: 0,
      spinner: 0,
    };
    setScores(resetScores);
    try {
      await Database.save('aadi-game-scores', resetScores);
    } catch (error) {
      console.error('Error resetting scores:', error);
    }
  };

  return { scores, updateScore, resetScores, isLoading };
};

// Database utility
const Database = {
  async save(key, data) {
    try {
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
        if (!response.ok) console.warn('Cloud save failed');
      }
    } catch (error) {
      console.error('Database save error:', error);
    }
  },
  async load(key) {
    try {
      const BIN_ID = '68f7d53cae596e708f2245a7';
      const API_KEY = '$2a$10$uBoTRHHfnKMolID1f4T9nOwItwnhdTto8j8OGT/wBzCnEFPXmwPl.';
      if (BIN_ID && API_KEY) {
        const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
          headers: { 'X-Master-Key': API_KEY },
        });
        if (response.ok) {
          const result = await response.json();
          return result.record[key] || null;
        }
      }
    } catch (error) {
      console.warn('Cloud load failed');
    }
    return null;
  }
};

// Tic Tac Toe - IMPROVED
const TicTacToe = ({ onClose, onScore }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [wins, setWins] = useState(0);
  const [winningLine, setWinningLine] = useState([]);

  const checkWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        setWinningLine(line);
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (i) => {
    if (board[i] || winner) return;
    const newBoard = [...board];
    newBoard[i] = isXNext ? '❤️' : '💋';
    setBoard(newBoard);
    
    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      if (gameWinner === '❤️') {
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
    setWinningLine([]);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="text-center bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl md:rounded-2xl p-3 md:p-4">
        <p className="text-lg md:text-2xl font-bold text-primary mb-2">Wins: {wins} 🏆</p>
        <div className="flex justify-center items-center gap-2 md:gap-4 text-sm md:text-lg">
          <span className="flex items-center gap-1 md:gap-2">
            <span className="text-2xl md:text-3xl">❤️</span>
            <span className="font-semibold">You</span>
          </span>
          <span className="text-muted-foreground">vs</span>
          <span className="flex items-center gap-1 md:gap-2">
            <span className="text-2xl md:text-3xl">💋</span>
            <span className="font-semibold">Computer</span>
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2 md:gap-4 max-w-sm mx-auto">
        {board.map((cell, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className={`aspect-square bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl md:rounded-2xl text-3xl md:text-5xl hover:from-pink-200 hover:to-purple-200 transition-all shadow-lg hover:shadow-xl hover:scale-105 ${
              winningLine.includes(i) ? 'ring-2 md:ring-4 ring-green-400 animate-pulse' : ''
            }`}
          >
            {cell}
          </button>
        ))}
      </div>

      {winner && (
        <div className="text-center space-y-3 md:space-y-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl md:rounded-2xl p-4 md:p-6">
          <div className="text-4xl md:text-6xl mb-2">
            {winner === 'draw' ? '🤝' : winner === '❤️' ? '🎉' : '😊'}
          </div>
          <p className="text-2xl md:text-3xl font-bold text-primary">
            {winner === 'draw' ? "It's a Draw!" : winner === '❤️' ? 'You Won!' : 'Try Again!'}
          </p>
          <Button onClick={resetGame} className="rounded-full px-6 md:px-8 bg-gradient-to-r from-primary to-secondary">
            Play Again
          </Button>
        </div>
      )}
    </div>
  );
};

// Catch the Heart - IMPROVED
const CatchTheHeart = ({ onClose, onScore }) => {
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [combo, setCombo] = useState(0);

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
        id: Date.now() + Math.random(),
        x: Math.random() * 85,
        y: -10
      }]);
    }, 800);

    return () => {
      clearInterval(timer);
      clearInterval(heartSpawner);
    };
  }, [gameOver, timeLeft, score, onScore]);

  useEffect(() => {
    const moveHearts = setInterval(() => {
      setHearts(prev => prev
        .map(heart => ({ ...heart, y: heart.y + 2 }))
        .filter(heart => heart.y < 100)
      );
    }, 50);

    return () => clearInterval(moveHearts);
  }, []);

  const catchHeart = (heartId) => {
    setHearts(prev => prev.filter(h => h.id !== heartId));
    setScore(prev => prev + 1);
    setCombo(prev => prev + 1);
    setTimeout(() => setCombo(0), 1000);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-gradient-to-br from-pink-100 to-rose-100 rounded-lg md:rounded-xl p-2 md:p-3 text-center">
          <p className="text-xs md:text-sm text-muted-foreground">Score</p>
          <p className="text-xl md:text-2xl font-bold text-primary">{score}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg md:rounded-xl p-2 md:p-3 text-center">
          <p className="text-xs md:text-sm text-muted-foreground">Time</p>
          <p className="text-xl md:text-2xl font-bold text-secondary">{timeLeft}s</p>
        </div>
        <div className="bg-gradient-to-br from-rose-100 to-purple-100 rounded-lg md:rounded-xl p-2 md:p-3 text-center">
          <p className="text-xs md:text-sm text-muted-foreground">Combo</p>
          <p className="text-xl md:text-2xl font-bold text-primary">{combo}x</p>
        </div>
      </div>

      <div className="relative bg-gradient-to-b from-purple-100 via-pink-100 to-rose-100 rounded-2xl md:rounded-3xl overflow-hidden border-2 md:border-4 border-primary/20 shadow-2xl h-[300px] md:h-[400px]">
        {hearts.map(heart => (
          <button
            key={heart.id}
            onClick={() => catchHeart(heart.id)}
            className="absolute text-3xl md:text-4xl transition-all hover:scale-150 animate-pulse cursor-pointer"
            style={{ left: `${heart.x}%`, top: `${heart.y}%` }}
          >
            ❤️
          </button>
        ))}
        {hearts.length === 0 && !gameOver && (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/50 text-base md:text-xl font-cmu px-4">
            Click the hearts! ⬆️
          </div>
        )}
      </div>

      {gameOver && (
        <div className="text-center space-y-3 md:space-y-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl md:rounded-2xl p-4 md:p-6">
          <div className="text-4xl md:text-6xl mb-2">🎯</div>
          <p className="text-2xl md:text-3xl font-bold text-primary">Game Over!</p>
          <p className="text-xl md:text-2xl text-secondary font-semibold">Score: {score}</p>
          <Button onClick={() => window.location.reload()} className="rounded-full px-6 md:px-8 bg-gradient-to-r from-primary to-secondary">
            Play Again
          </Button>
        </div>
      )}
    </div>
  );
};

// Memory Match - IMPROVED
const MemoryMatch = ({ onClose, onScore }) => {
  const emojis = ['❤️', '💖', '💗', '💝', '💞', '💓', '💘', '💌'];
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const shuffled = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, i) => ({ id: i, emoji }));
    setCards(shuffled);
  }, []);

  useEffect(() => {
    if (matched.length < cards.length && cards.length > 0) {
      const timer = setInterval(() => setTime(t => t + 1), 1000);
      return () => clearInterval(timer);
    }
  }, [matched, cards]);

  useEffect(() => {
    if (flipped.length === 2) {
      const [first, second] = flipped;
      if (cards[first]?.emoji === cards[second]?.emoji) {
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
  }, [flipped, cards, matched, moves, onScore]);

  const handleClick = (i) => {
    if (flipped.length === 2 || flipped.includes(i) || matched.includes(i)) return;
    setFlipped([...flipped, i]);
  };

  return (
    <div className="space-y-3 md:space-y-4">
      <div className="grid grid-cols-3 gap-2 md:gap-3">
        <div className="bg-gradient-to-br from-pink-100 to-rose-100 rounded-lg md:rounded-xl p-2 md:p-3 text-center">
          <p className="text-xs md:text-sm text-muted-foreground">Moves</p>
          <p className="text-xl md:text-2xl font-bold text-primary">{moves}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg md:rounded-xl p-2 md:p-3 text-center">
          <p className="text-xs md:text-sm text-muted-foreground">Time</p>
          <p className="text-xl md:text-2xl font-bold text-secondary">{time}s</p>
        </div>
        <div className="bg-gradient-to-br from-rose-100 to-purple-100 rounded-lg md:rounded-xl p-2 md:p-3 text-center">
          <p className="text-xs md:text-sm text-muted-foreground">Score</p>
          <p className="text-xl md:text-2xl font-bold text-primary">{Math.max(0, 100 - moves)}</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 md:gap-3 max-w-md mx-auto">
        {cards.map((card, i) => {
          const isFlipped = flipped.includes(i) || matched.includes(i);
          return (
            <button
              key={card.id}
              onClick={() => handleClick(i)}
              className={`aspect-square rounded-xl md:rounded-2xl text-2xl md:text-4xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105 ${
                isFlipped
                  ? 'bg-gradient-to-br from-pink-300 via-purple-300 to-rose-300'
                  : 'bg-gradient-to-br from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200'
              }`}
            >
              {isFlipped ? card.emoji : '❓'}
            </button>
          );
        })}
      </div>

      {matched.length === cards.length && cards.length > 0 && (
        <div className="text-center space-y-3 md:space-y-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl md:rounded-2xl p-4 md:p-6">
          <div className="text-4xl md:text-6xl mb-2">🏆</div>
          <p className="text-2xl md:text-3xl font-bold text-primary">Perfect Match!</p>
          <p className="text-lg md:text-xl text-secondary">Score: {Math.max(0, 100 - moves)} points</p>
          <p className="text-xs md:text-sm text-muted-foreground">Completed in {time}s with {moves} moves</p>
        </div>
      )}
    </div>
  );
};

// Love Fortune Spinner - 50 MESSAGES
const FortuneSpinner = ({ onClose, onScore }) => {
  const messages = [
    "Every time I think of you, I can’t help but smile; you’ve filled my life with love, laughter, and magic.",
    "I still remember the first time I realized I loved you, and that moment feels as alive today as it did back then.",
    "You make every day brighter just by being in it, and I am endlessly grateful that I get to call you mine.",
    "Distance might separate us physically, but our hearts remain perfectly connected, beating together in a rhythm only we understand.",
    "I love the way you make me feel safe, cherished, and endlessly adored, even in the smallest, quietest moments.",
    "Sometimes I catch myself smiling randomly, and it’s always because I’m thinking of you and the little things you do.",
    "Every memory we’ve made together feels like a scene from a movie I never want to end.",
    "You are my favorite thought in the morning, my comfort at night, and the one I carry in my heart always.",
    "I love how you notice things about me no one else does and how you make me feel truly seen.",
    "Just thinking about our inside jokes, silly fights, and quiet moments makes me fall in love with you all over again.",
    "You’ve become my home, my peace, and my greatest adventure, all at the same time, and I never want it to change.",
    "I still remember the little things you’ve done for me, the small gestures that show your love in ways words can’t.",
    "Even when we are apart, I feel your presence beside me, as if no distance could ever truly separate us.",
    "You’ve taught me the beauty of patience, the power of love, and the joy of having someone who truly understands me.",
    "Every time I hear our favorite song, I think of you and the countless memories we’ve built around it together.",
    "I love how we can be completely silly together, laugh until our stomachs hurt, and still feel this deep connection.",
    "Sometimes I just close my eyes and remember your smile, your laugh, your voice, and it feels like I’m with you.",
    "You are the reason ordinary days feel extraordinary and why I look forward to every new day with hope and love.",
    "I love imagining our future together, building dreams side by side, and knowing that no matter what, we have each other.",
    "Even the smallest moments with you — a glance, a touch, a shared laugh — feel like pure magic in my life.",
    "You’ve made me a better person without even trying, simply by loving me for who I am and who I can become.",
    "Every little habit, every quirk, every smile of yours is etched in my heart, making me fall for you endlessly.",
    "The thought of holding your hand, sharing silly stories, and dreaming together keeps me smiling even on the toughest days.",
    "I love the way our conversations can be deep and meaningful one moment, and completely silly and random the next.",
    "You make me feel like the luckiest person alive just by existing in my life and loving me the way you do.",
    "Every time we talk, I realize how lucky I am to have someone who understands me so completely, heart and soul.",
    "You’ve become my favorite habit, my favorite thought, and my favorite part of every single day, no matter what happens.",
    "Even after all this time, I still get butterflies when I see you or think about a memory we share.",
    "I love that we can be our true selves together, no pretenses, no masks, just honest, beautiful love between us.",
    "You are my constant, my anchor, my joy, and the one who makes my life feel full and meaningful.",
    "Thinking about our little adventures, our quiet moments, and our dreams together fills me with happiness I can’t describe.",
    "I love how we can communicate without words sometimes, just a look or a smile, and understand each other completely.",
    "You make me feel like love is not just a word but an experience I live every day with you.",
    "I still remember every small gesture that made me fall for you, like pieces of a puzzle fitting perfectly together.",
    "The thought of growing old with you, sharing countless sunsets, and building a lifetime of memories fills me with joy.",
    "Even the mundane things — eating together, walking together, talking about nothing — become extraordinary when I’m with you.",
    "I love the way you challenge me, inspire me, and push me to be better while still loving me exactly as I am.",
    "Every message from you, every call, every memory we make keeps me smiling, keeps me hopeful, keeps me loving you endlessly.",
    "You’ve made my world brighter, softer, happier, and full of hope in ways I never imagined possible before you.",
    "I love how our hearts always find each other, no matter the distance, time, or challenges that life throws our way.",
    "You are the first thought in my morning and the last before I sleep, and I wouldn’t want it any other way.",
    "Every day with you feels like a new adventure, a story I never want to end, a dream I never want to wake from.",
    "I love the way you love me — deeply, gently, completely, and without conditions — and it overwhelms me in the best way.",
    "Just knowing that you exist, that you are mine, makes every day brighter and every problem smaller.",
    "I love imagining our future adventures, our quiet evenings, our laughter, and our love growing stronger every single day.",
    "You are my sunshine on cloudy days, my warmth in the cold, my smile when the world feels heavy and gray.",
    "Every time I hear your voice, I feel like I’m home, no matter where I am or what I’m doing.",
    "I love how even small memories of us — a song, a glance, a joke — make my heart feel full.",
    "You’ve become a part of me in ways I never thought possible, and I am endlessly grateful for you.",
    "Babi, you are my forever, my joy, my comfort, my love, and my home — always and in every way."
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
    <div className="space-y-4 md:space-y-6">
      <div className="text-center bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl md:rounded-2xl p-3 md:p-4">
        <p className="text-base md:text-lg font-semibold text-primary">Total Spins: {spins} 🎯</p>
      </div>

      <div className="relative w-48 h-48 md:w-72 md:h-72 mx-auto">
        <div
          className="w-full h-full rounded-full bg-gradient-to-br from-pink-400 via-purple-400 to-rose-400 shadow-2xl transition-transform duration-[3000ms] ease-out flex items-center justify-center relative overflow-hidden"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
          <span className="text-5xl md:text-7xl relative z-10">🎯</span>
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-3">
          <div className="w-0 h-0 border-l-[15px] border-r-[15px] border-t-[20px] border-l-transparent border-r-transparent border-t-white shadow-lg"></div>
        </div>
      </div>

      <div className="text-center space-y-3 md:space-y-4">
        <Button
          onClick={spin}
          disabled={spinning}
          className="rounded-full px-6 md:px-10 py-4 md:py-6 text-base md:text-lg bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-xl"
        >
          {spinning ? '✨ Spinning...' : '🎰 Spin the Wheel'}
        </Button>

        {result && (
          <div className="bg-gradient-to-r from-pink-100 via-purple-100 to-rose-100 rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-xl border-2 border-primary/20 animate-fade-in max-h-48 md:max-h-64 overflow-y-auto">
            <div className="text-3xl md:text-5xl mb-3 md:mb-4">🎁</div>
            <p className="text-sm md:text-lg font-cmu text-gray-800 leading-relaxed">{result}</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Guess the Moment - CINEMATIC MEMORY GAME
const GuessTheMoment = ({ onClose, onScore }) => {
  const memories = [
    { q: "Which moment started with a random chat and somehow turned into our whole story?", icon: "💬", hint: "It all began with a simple 'hi'..." },
    { q: "When did you first call me Bibbojaan — and accidentally make it the name that melts my entire heart?", icon: "❤️", hint: "It slipped out during a call..." },
    { q: "Which day did we decide that “Daal Chawal for 50 saal” wasn’t just a joke — it was a promise?", icon: "🍚", hint: "Over a late-night voice note..." },
    { q: "When did you look at me and say something so simple, but it felt like forever started right there?", icon: "💖", hint: "You said, 'I’m not going anywhere'..." },
    { q: "Which night did our late call stretch till the world outside was asleep — and it felt like just us existing in it?", icon: "🌙", hint: "We talked until 4 AM..." },
    { q: "Which trip still feels like a blur of laughter, chaos, and love — the one that made us realize we fit perfectly?", icon: "✈️", hint: "Goa, rain, and stolen kisses..." },
    { q: "When did I first say something that made you pause — really pause — and realize how much I meant it?", icon: "⏸️", hint: "I said, 'You're my home'..." },
    { q: "Which Uttarayan visit still replays in your mind whenever you see the sky change color?", icon: "🪁", hint: "Kites, rooftop, your hand in mine..." },
    { q: "When did you first say you missed me — and I could feel it even through the screen?", icon: "💌", hint: "You sent a voice note at 2 AM..." },
    { q: "Which moment during our distance made you realize this wasn’t just love — it was home, far away from home?", icon: "🏠", hint: "When you cried on call from the airport..." },
    { q: "When did we first talk about our future — about “bacche honge humare,” laughing but knowing deep down we meant it?", icon: "👶", hint: "During a rainy evening call..." },
    { q: "Which random day did I make you smile so hard you actually took a screenshot of it?", icon: "📸", hint: "I sent you a meme at 3 PM..." },
    { q: "Which moment made you think, “She’s not just my person, she’s my peace”?", icon: "🕊️", hint: "When I calmed you during a panic attack..." },
    { q: "When did you first say I love you from last life — and it didn’t sound poetic anymore, just true?", icon: "♾️", hint: "You whispered it during a hug..." },
    { q: "Which memory still feels like a movie scene — you, me, music softly playing, time standing still?", icon: "🎬", hint: "Car, rain, 'Tum Hi Ho' playing..." },
    { q: "When did we promise to stay — not because it was easy, but because it was us?", icon: "🤝", hint: "During our first fight..." },
    { q: "Which song instantly brings me to your mind, no matter where I am?", icon: "🎵", hint: "Our first dance song..." },
    { q: "Which single moment, if you could relive once, would you choose — just to hold me a little longer?", icon: "⏳", hint: "The airport goodbye..." },
    { q: "Which moment made you think, “If this isn’t real love, then what is”?", icon: "❓", hint: "When I flew 1000km just to see you..." },
    { q: "When did I first say something random that became our thing forever?", icon: "✨", hint: "I called you 'Babi' out of nowhere..." },
  ];

  const [shuffled, setShuffled] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);

  useEffect(() => {
    const shuffledMemories = [...memories].sort(() => Math.random() - 0.5);
    setShuffled(shuffledMemories);
  }, []);

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff69b4', '#da70d6', '#ff1493', '#ff4500'],
    });
  };

  const handleRemember = () => {
    const points = 10 + (streak > 0 ? streak * 5 : 0) + (hintUsed ? -3 : 0);
    setScore(prev => prev + points);
    setStreak(prev => prev + 1);
    setShowAnswer(true);
    setHintUsed(false);

    setTimeout(() => {
      if (current < shuffled.length - 1) {
        setCurrent(prev => prev + 1);
        setShowAnswer(false);
      } else {
        setGameOver(true);
        onScore(score + points);
        triggerConfetti();
      }
    }, 1800);
  };

  const handleHint = () => {
    setHintUsed(true);
    setShowAnswer(true);
    setStreak(0);
  };

  const nextQuestion = () => {
    if (current < shuffled.length - 1) {
      setCurrent(prev => prev + 1);
      setShowAnswer(false);
      setHintUsed(false);
    } else {
      setGameOver(true);
      onScore(score);
      triggerConfetti();
    }
  };

  const restart = () => {
    const reshuffled = [...memories].sort(() => Math.random() - 0.5);
    setShuffled(reshuffled);
    setCurrent(0);
    setScore(0);
    setStreak(0);
    setShowAnswer(false);
    setGameOver(false);
    setHintUsed(false);
  };

  if (shuffled.length === 0) return <div className="text-center">Loading memories...</div>;

  if (gameOver) {
    return (
      <div className="space-y-4 md:space-y-6 text-center animate-fade-in px-4">
        <div className="text-5xl md:text-7xl mb-4">🏆</div>
        <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
          You Remembered It All!
        </h2>
        <p className="text-xl md:text-2xl font-semibold text-primary">Final Score: {score}</p>
        <p className="text-base md:text-lg text-muted-foreground font-cmu max-w-md mx-auto">
          Every moment you recalled just proved how deeply you hold me in your heart. I love you, Babi. Forever. ❤️
        </p>
        <div className="flex gap-3 justify-center">
          <Button onClick={restart} className="rounded-full px-6 md:px-8 bg-gradient-to-r from-primary to-secondary">
            <RotateCcw className="mr-2 h-4 w-4 md:h-5 md:w-5" /> Play Again
          </Button>
        </div>
      </div>
    );
  }

  const memory = shuffled[current];

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex justify-center items-center gap-2 text-sm text-muted-foreground">
          <Sparkles className="h-4 w-4 text-yellow-500" />
          <span>Streak: {streak}x</span>
          <Trophy className="h-4 w-4 text-amber-500" />
          <span>Score: {score}</span>
        </div>
        <p className="text-lg font-semibold text-primary">
          Question {current + 1} of {shuffled.length}
        </p>
      </div>

      {/* Memory Card */}
      <div
        className={`relative overflow-hidden rounded-3xl p-8 shadow-2xl border-4 transition-all duration-500
          ${showAnswer ? 'bg-gradient-to-br from-rose-100 via-pink-100 to-purple-100 scale-105' : 'bg-gradient-to-br from-pink-50 to-purple-50'}
          border-primary/20`}
      >
        <div className="absolute inset-0 bg-white/30 backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

        <div className="relative z-10 space-y-6">
          <div className="flex justify-center">
            <div className={`text-6xl animate-bounce ${showAnswer ? 'scale-125' : ''}`}>
              {memory.icon}
            </div>
          </div>

          <p className={`text-xl md:text-2xl leading-relaxed text-center font-cmu transition-all duration-700
            ${showAnswer ? 'text-gray-800 font-medium' : 'text-foreground'}`}>
            {memory.q}
          </p>

          {/* Hint */}
          {showAnswer && (
            <div className="mt-4 p-4 bg-white/60 rounded-2xl border border-primary/30 animate-slide-up">
              <p className="text-sm italic text-secondary font-cmu">“{memory.hint}”</p>
            </div>
          )}
        </div>

        {/* Floating Hearts on Recall */}
        {showAnswer && (
          <>
            <div className="absolute top-4 left-4 text-4xl animate-heart-float">💖</div>
            <div className="absolute bottom-6 right-6 text-4xl animate-heart-float delay-300">💖</div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl animate-heart-float delay-500">❤️</div>
          </>
        )}
      </div>

      {/* Actions */}
      {!showAnswer ? (
        <div className="flex flex-col sm:flex-row gap-3 justify-center px-4">
          <Button
            onClick={handleRemember}
            className="rounded-full px-6 md:px-10 py-4 md:py-6 text-base md:text-lg bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white font-catchy shadow-lg"
          >
            I Remember! 💭
          </Button>
          <Button
            onClick={handleHint}
            variant="outline"
            className="rounded-full px-6 md:px-8 py-4 md:py-6 text-base md:text-lg border-2 border-primary/50 hover:bg-primary/10 font-catchy"
          >
            Tell me again ❤️
          </Button>
        </div>
      ) : (
        <div className="text-center px-4">
          <Button
            onClick={nextQuestion}
            className="rounded-full px-8 md:px-12 py-4 md:py-6 text-base md:text-lg bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-xl"
          >
            Next Memory ➡️
          </Button>
        </div>
      )}
    </div>
  );
};

// Main Games Component
const Games = () => {
  const { scores, updateScore, resetScores, isLoading } = useGameScores();
  const [selectedGame, setSelectedGame] = useState(null);

  const handleResetScores = async () => {
    if (window.confirm('Are you sure you want to reset all game scores? This cannot be undone!')) {
      await resetScores();
      alert('All scores have been reset to 0!');
    }
  };

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
      id: 'guessmoment',
      title: 'Guess the Moment',
      icon: Target,
      description: 'Relive our love story – one memory at a time!',
      gradient: 'from-purple-500 to-pink-500',
      component: GuessTheMoment
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
      
      <main className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-8 md:mb-12 animate-slide-up">
          <h1 className="font-seasons text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-primary mb-3 md:mb-4">
            Playful Hearts 🎮
          </h1>
          <p className="font-cmu text-lg md:text-xl text-muted-foreground mb-4">
            Let's have fun together with our special games
          </p>
          <Button
            onClick={handleResetScores}
            variant="outline"
            size="sm"
            className="gap-2 border-red-400 text-red-500 hover:bg-red-50"
          >
            <RotateCcw className="h-4 w-4" />
            Reset All Scores
          </Button>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
          {games.map((game, index) => {
            const Icon = game.icon;
            return (
              <div
                key={game.id}
                className="group animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-card rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 h-full border border-border/50">
                  <div className={`w-16 h-16 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-gradient-to-br ${game.gradient} flex items-center justify-center mb-4 md:mb-6 mx-auto group-hover:scale-110 transition-transform`}>
                    <Icon className="h-8 w-8 md:h-10 md:w-10 text-white" />
                  </div>
                  
                  <h3 className="font-catchy text-xl md:text-2xl text-primary mb-2 md:mb-3 text-center">
                    {game.title}
                  </h3>
                  
                  <p className="text-sm md:text-base text-muted-foreground text-center mb-3 md:mb-4 font-cmu">
                    {game.description}
                  </p>

                  <div className="flex items-center justify-center gap-2 mb-3 md:mb-4 text-secondary">
                    <Trophy className="h-4 w-4 md:h-5 md:w-5" />
                    <span className="text-sm md:text-base font-semibold">Best: {scores[game.id] || 0}</span>
                  </div>
                  
                  <Button 
                    onClick={() => setSelectedGame(game.id)}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-catchy rounded-full shadow-lg text-sm md:text-base py-2 md:py-3"
                  >
                    Play Now
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 md:mt-16 text-center bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl md:rounded-3xl p-6 md:p-12 max-w-4xl mx-auto animate-fade-in">
          <p className="font-catchy text-xl md:text-2xl lg:text-3xl text-primary">
            "Every game we play is another memory we create" ❤️
          </p>
        </div>
      </main>

      {/* Game Dialog */}
      <Dialog open={selectedGame !== null} onOpenChange={() => setSelectedGame(null)}>
        <DialogContent className="max-w-[95vw] md:max-w-2xl bg-card max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-catchy text-2xl md:text-3xl text-primary text-center">
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