
import React from 'react';
import { Sparkles, Gift, Heart } from 'lucide-react';

const DiwaliHero = () => {
  const scrollToSweets = () => {
    const element = document.getElementById('sweets');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-20 pb-16 px-4 bg-gradient-to-br from-food-yellow-200 via-food-yellow-300 to-secondary animate-gradient relative overflow-hidden">
      {/* Enhanced decorative elements with diwali sparkles */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 text-6xl animate-sparkle">🪔</div>
        <div className="absolute top-20 right-10 text-4xl animate-sparkle-burst">🌺</div>
        <div className="absolute bottom-20 left-20 text-5xl animate-diwali-glow">✨</div>
        <div className="absolute bottom-10 right-20 text-4xl animate-sparkle">🎇</div>
        <div className="absolute top-32 left-1/4 text-3xl animate-sparkle-burst">🎆</div>
        <div className="absolute bottom-32 right-1/4 text-3xl animate-diwali-glow">🌟</div>
        <div className="absolute top-1/2 left-16 text-2xl animate-sparkle">💫</div>
        <div className="absolute top-1/3 right-24 text-4xl animate-sparkle-burst">🎊</div>
      </div>

      <div className="container mx-auto text-center relative z-10">
        <div className="mb-8">
          <div className="text-6xl md:text-8xl mb-4 animate-diwali-glow">🪔</div>
          <h1 className="text-4xl md:text-6xl font-bold text-orange-800 mb-4">
            Diwali Sweet Paradise
          </h1>
          <p className="text-xl md:text-2xl text-orange-700 mb-8 max-w-3xl mx-auto">
            Celebrate the festival of lights with our premium collection of 
            authentic Indian sweets, crafted with love and tradition
          </p>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-orange-200">
            <Sparkles className="h-8 w-8 text-orange-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-orange-800 mb-2">Premium Quality</h3>
            <p className="text-orange-700">Fresh, authentic sweets made with finest ingredients</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-orange-200">
            <Gift className="h-8 w-8 text-orange-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-orange-800 mb-2">Perfect Gifting</h3>
            <p className="text-orange-700">Beautiful packaging for your festive celebrations</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-orange-200">
            <Heart className="h-8 w-8 text-orange-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-orange-800 mb-2">Made with Love</h3>
            <p className="text-orange-700">Traditional recipes passed down generations</p>
          </div>
        </div>

        <button
          onClick={scrollToSweets}
          className="bg-gradient-to-r from-food-yellow-500 to-secondary text-foreground px-8 py-4 rounded-full text-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 animate-pulse-glow btn-enhanced"
        >
          🍯 Explore Our Sweets Collection ✨
        </button>

        {/* Festive message */}
        <div className="mt-12 bg-gradient-to-r from-yellow-400 to-orange-400 text-orange-900 rounded-xl p-6 shadow-lg">
          <p className="text-lg font-semibold">
            ✨ May this Diwali bring you joy, prosperity, and sweetness! ✨
          </p>
        </div>
      </div>
    </section>
  );
};

export default DiwaliHero;
