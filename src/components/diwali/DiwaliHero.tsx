import React from 'react';
import { Sparkles, Award, Heart } from 'lucide-react';

const DiwaliHero = () => {
  const scrollToSweets = () => {
    const element = document.getElementById('sweets');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-16 md:py-20">
      {/* Floating Background Elements with Amber Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 text-4xl diwali-particle opacity-40">🪔</div>
        <div className="absolute top-32 right-20 text-3xl diwali-particle opacity-30" style={{ animationDelay: '2s' }}>✨</div>
        <div className="absolute bottom-20 left-20 text-5xl diwali-particle opacity-35">🌟</div>
        <div className="absolute bottom-32 right-10 text-4xl diwali-particle opacity-40" style={{ animationDelay: '1s' }}>🎆</div>
        <div className="absolute top-1/2 left-1/4 text-2xl diwali-particle opacity-25" style={{ animationDelay: '3s' }}>💫</div>
        <div className="absolute top-1/3 right-1/3 text-3xl diwali-particle opacity-30" style={{ animationDelay: '1.5s' }}>�</div>
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Main Hero Content */}
        <div className="mb-8 md:mb-12">
          <div className="inline-flex items-center justify-center mb-4 md:mb-6">
            <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl animate-diwali-glow diwali-shimmer">🪔</div>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 leading-tight">
            <span className="block text-white font-black" style={{ textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8), 0 0 20px rgba(139, 69, 19, 0.6)' }}>Sri Nidhi</span>
            <span className="block text-white font-black" style={{ textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8), 0 0 20px rgba(139, 69, 19, 0.6)' }}>Diwali Sweets</span>
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed text-amber-900 font-bold" style={{ textShadow: '1px 1px 4px rgba(255, 255, 255, 0.8)' }}>
            Celebrate the festival of lights with our handcrafted traditional sweets. 
            <br className="hidden md:block" />
            Made with love, tradition, and the finest ingredients.
          </p>
        </div>

        {/* Feature Highlights - Flowing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12 max-w-4xl mx-auto">
          <div className="bg-amber-50/90 backdrop-blur-sm rounded-2xl p-6 text-center transition-all duration-300 hover:scale-105 shadow-xl border-2 border-amber-200">
            <Award className="h-8 w-8 mx-auto mb-4 text-amber-700" />
            <h3 className="text-lg font-bold mb-2 text-amber-900" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)' }}>Premium Quality</h3>
            <p className="text-sm text-amber-800 font-medium">Authentic recipes passed down through generations</p>
          </div>
          
          <div className="bg-amber-50/90 backdrop-blur-sm rounded-2xl p-6 text-center transition-all duration-300 hover:scale-105 shadow-xl border-2 border-amber-200">
            <Sparkles className="h-8 w-8 mx-auto mb-4 text-amber-700" />
            <h3 className="text-lg font-bold mb-2 text-amber-900" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)' }}>Festive Gifting</h3>
            <p className="text-sm text-amber-800 font-medium">Beautiful packaging perfect for celebrations</p>
          </div>
          
          <div className="bg-amber-50/90 backdrop-blur-sm rounded-2xl p-6 text-center transition-all duration-300 hover:scale-105 shadow-xl border-2 border-amber-200">
            <Heart className="h-8 w-8 mx-auto mb-4 text-amber-700" />
            <h3 className="text-lg font-bold mb-2 text-amber-900" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)' }}>Made with Love</h3>
            <p className="text-sm text-amber-800 font-medium">Fresh daily with finest ingredients</p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="space-y-4 md:space-y-6">
          <button
            onClick={scrollToSweets}
            className="diwali-btn px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-bold diwali-shadow-lg transform hover:scale-110 transition-all duration-300 hover:-translate-y-1"
          >
            <span className="flex items-center space-x-2">
              <span>Explore Collection</span>
              <Sparkles className="h-4 w-4 md:h-5 md:w-5" />
            </span>
          </button>
        </div>

        {/* Festive Message */}
        <div className="mt-8 md:mt-12 lg:mt-16 bg-gradient-to-r from-amber-100/90 to-amber-200/90 backdrop-blur-sm rounded-2xl p-4 md:p-6 lg:p-8 shadow-xl border-2 border-amber-300">
          <p className="text-base md:text-lg font-bold text-amber-900" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)' }}>
            🪔 May this Diwali illuminate your life with joy, prosperity, and endless sweetness 🪔
          </p>
        </div>
      </div>

      {/* Bottom Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" className="w-full h-20" style={{ color: 'hsl(var(--diwali-cream))' }}>
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="currentColor"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="currentColor"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="currentColor"></path>
        </svg>
      </div>
    </section>
  );
};

export default DiwaliHero;