import React, { useEffect, useState } from 'react';

interface SweetsConfettiProps {
  isVisible: boolean;
  onAnimationEnd: () => void;
}

const SweetsConfetti: React.FC<SweetsConfettiProps> = ({ isVisible, onAnimationEnd }) => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    emoji: string;
    x: number;
    y: number;
    rotation: number;
    scale: number;
    delay: number;
  }>>([]);

  const sweetsEmojis = ['🧈', '🍯', '🥜', '🌰', '🍊', '🥥', '🧀', '🍰', '🎂', '🍮'];

  useEffect(() => {
    if (isVisible) {
      // Generate random confetti particles
      const newParticles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        emoji: sweetsEmojis[Math.floor(Math.random() * sweetsEmojis.length)],
        x: Math.random() * 100,
        y: -10,
        rotation: Math.random() * 360,
        scale: 0.8 + Math.random() * 0.4,
        delay: Math.random() * 1000,
      }));
      
      setParticles(newParticles);

      // Auto-hide after animation
      const timer = setTimeout(() => {
        onAnimationEnd();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onAnimationEnd]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute text-4xl animate-bounce"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            transform: `rotate(${particle.rotation}deg) scale(${particle.scale})`,
            animationDelay: `${particle.delay}ms`,
            animationDuration: '2s',
            animationTimingFunction: 'ease-out',
            animationFillMode: 'forwards',
            animationName: 'confetti-fall',
          }}
        >
          {particle.emoji}
        </div>
      ))}
      
      <style>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(-100vh) rotate(0deg) scale(1);
            opacity: 1;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg) scale(0.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default SweetsConfetti;