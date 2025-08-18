
import React from 'react';

const FlowerShower = () => {
  const flowers = ['🌸', '🌺', '🌻', '🌹', '🏵️', '🌼', '💐', '🌷'];
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {Array.from({ length: 50 }).map((_, index) => (
        <div
          key={index}
          className="absolute animate-bounce"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-${Math.random() * 20 + 10}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${Math.random() * 3 + 2}s`,
            fontSize: `${Math.random() * 20 + 15}px`,
          }}
        >
          <div
            className="animate-pulse"
            style={{
              animationDelay: `${Math.random() * 2}s`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          >
            {flowers[Math.floor(Math.random() * flowers.length)]}
          </div>
        </div>
      ))}
      
      {/* Welcome message overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
        <div className="text-center text-white p-8 rounded-xl bg-gradient-to-r from-orange-600 to-pink-600 shadow-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-pulse">
            🪔 Happy Diwali! 🪔
          </h1>
          <p className="text-xl md:text-2xl font-medium">
            Welcome to Sri Nidhi's Premium Diwali Sweets
          </p>
        </div>
      </div>
    </div>
  );
};

export default FlowerShower;
