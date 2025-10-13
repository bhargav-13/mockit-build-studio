import { useEffect } from 'react';

export const SparkleCursor = () => {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // 10% probability
      if (Math.random() > 0.1) return;

      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      sparkle.textContent = '✨';
      sparkle.style.left = `${e.clientX}px`;
      sparkle.style.top = `${e.clientY}px`;
      
      document.body.appendChild(sparkle);

      // Remove after animation
      setTimeout(() => {
        sparkle.remove();
      }, 1000);
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return null;
};
