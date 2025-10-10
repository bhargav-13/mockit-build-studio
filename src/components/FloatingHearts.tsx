import { useEffect, useState } from 'react';

export const FloatingHearts = () => {
  const [hearts, setHearts] = useState<Array<{ id: number; delay: number; left: string }>>([]);

  useEffect(() => {
    const heartElements = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      delay: Math.random() * 6,
      left: `${Math.random() * 100}%`,
    }));
    setHearts(heartElements);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-2xl opacity-60 animate-heart-float"
          style={{
            left: heart.left,
            animationDelay: `${heart.delay}s`,
          }}
        >
          💕
        </div>
      ))}
    </div>
  );
};
