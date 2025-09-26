import React from 'react';
import { Sparkles, Award, Heart, Crown } from 'lucide-react';

const DiwaliHero = () => {
  const scrollToSweets = () => {
    const element = document.getElementById('sweets');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #FDE68A 0%, #F59E0B 20%, #D97706 40%, #92400E 60%, #451A03 100%)',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Luxury Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(255, 215, 0, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
              linear-gradient(45deg, rgba(255, 215, 0, 0.05) 25%, transparent 25%),
              linear-gradient(-45deg, rgba(255, 215, 0, 0.05) 25%, transparent 25%)
            `,
            backgroundSize: '150px 150px, 100px 100px, 50px 50px, 50px 50px'
          }}
        />
      </div>

      {/* Floating Diya Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-4xl animate-pulse opacity-30" style={{ animationDelay: '0s' }}>🪔</div>
        <div className="absolute top-32 right-20 text-3xl animate-pulse opacity-25" style={{ animationDelay: '2s' }}>✨</div>
        <div className="absolute bottom-32 left-20 text-5xl animate-pulse opacity-20" style={{ animationDelay: '4s' }}>🌟</div>
        <div className="absolute bottom-20 right-10 text-4xl animate-pulse opacity-30" style={{ animationDelay: '1s' }}>🎆</div>
        <div className="absolute top-1/2 left-1/4 text-2xl animate-pulse opacity-15" style={{ animationDelay: '3s' }}>💫</div>
        <div className="absolute top-1/3 right-1/3 text-3xl animate-pulse opacity-25" style={{ animationDelay: '1.5s' }}>🕯️</div>
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full py-20">
        
        {/* Premium Brand Header */}
        <div className="mb-12">
          <div className="inline-flex items-center justify-center mb-8">
            <div className="relative">
              <img 
                src="/cateringLogo.png" 
                alt="Sri Nidhi Logo" 
                className="h-32 w-32 object-contain animate-pulse drop-shadow-2xl filter brightness-110 contrast-110" 
              />
              <div className="absolute inset-0 h-32 w-32 animate-ping opacity-20 rounded-full bg-yellow-300/30"></div>
            </div>
          </div>
          
          <h1 className="mb-6 leading-tight">
            <span 
              className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text mb-2"
              style={{
                backgroundImage: 'linear-gradient(135deg, #FFF 0%, #FFD700 50%, #FFF 100%)',
                filter: 'drop-shadow(2px 4px 8px rgba(0, 0, 0, 0.7)) drop-shadow(0 0 20px rgba(255, 215, 0, 0.6))',
                fontFamily: "'Playfair Display', serif"
              }}
            >
              Sri Nidhi
            </span>
            <span 
              className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-amber-100 opacity-90"
              style={{
                textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)',
                fontFamily: "'Lora', serif",
                fontStyle: 'italic',
                letterSpacing: '0.05em'
              }}
            >
              Premium Diwali Collection
            </span>
          </h1>
          
          <p 
            className="text-lg md:text-xl lg:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed text-amber-50 font-medium"
            style={{ 
              textShadow: '1px 1px 4px rgba(0, 0, 0, 0.6)',
              fontFamily: "'Lato', sans-serif"
            }}
          >
            Experience the artistry of traditional Indian sweets, crafted with 
            <span className="text-yellow-300 font-semibold"> premium ingredients </span>
            and centuries-old recipes.
            <br className="hidden md:block" />
            Where every bite tells a story of heritage and excellence.
          </p>
        </div>

        {/* Luxury Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
          <div className="luxury-feature-card group">
            <div className="relative p-8 rounded-2xl backdrop-blur-md bg-white/10 border border-yellow-400/30 shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-white/15">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-400/5 to-transparent"></div>
              <Award className="h-10 w-10 mx-auto mb-4 text-yellow-300 drop-shadow-lg" />
              <h3 className="text-xl font-bold mb-3 text-amber-50" style={{ fontFamily: "'Playfair Display', serif" }}>
                Premium Quality
              </h3>
              <p className="text-amber-100/80 leading-relaxed">
                Handcrafted with the finest ingredients, following authentic recipes passed down through generations
              </p>
            </div>
          </div>
          
          <div className="luxury-feature-card group">
            <div className="relative p-8 rounded-2xl backdrop-blur-md bg-white/10 border border-yellow-400/30 shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-white/15">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-400/5 to-transparent"></div>
              <Sparkles className="h-10 w-10 mx-auto mb-4 text-yellow-300 drop-shadow-lg" />
              <h3 className="text-xl font-bold mb-3 text-amber-50" style={{ fontFamily: "'Playfair Display', serif" }}>
                Luxury Gifting
              </h3>
              <p className="text-amber-100/80 leading-relaxed">
                Elegantly packaged treasures, perfect for celebrating festivals and creating memorable moments
              </p>
            </div>
          </div>
          
          <div className="luxury-feature-card group">
            <div className="relative p-8 rounded-2xl backdrop-blur-md bg-white/10 border border-yellow-400/30 shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-white/15">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-400/5 to-transparent"></div>
              <Heart className="h-10 w-10 mx-auto mb-4 text-yellow-300 drop-shadow-lg" />
              <h3 className="text-xl font-bold mb-3 text-amber-50" style={{ fontFamily: "'Playfair Display', serif" }}>
                Artisan Crafted
              </h3>
              <p className="text-amber-100/80 leading-relaxed">
                Each sweet is a masterpiece, created fresh daily with passion, precision, and traditional expertise
              </p>
            </div>
          </div>
        </div>

        {/* Premium CTA */}
        <div className="space-y-6">
          <button
            onClick={scrollToSweets}
            className="group relative px-10 py-4 rounded-full text-lg font-bold transition-all duration-500 transform hover:scale-110 hover:-translate-y-2"
            style={{
              background: 'linear-gradient(135deg, #FFD700 0%, #F59E0B 50%, #D97706 100%)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3), 0 0 30px rgba(255, 215, 0, 0.4)',
              color: '#451A03',
              fontFamily: "'Lato', sans-serif",
              fontWeight: '700'
            }}
          >
            <span className="relative z-10 flex items-center space-x-3">
              <span>Discover Our Collection</span>
              <Sparkles className="h-5 w-5 group-hover:animate-spin transition-transform duration-500" />
            </span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </button>
        </div>

        {/* Elegant Festive Message */}
        <div className="mt-16">
          <div className="relative p-6 rounded-2xl backdrop-blur-md bg-white/10 border border-yellow-400/20 shadow-xl max-w-4xl mx-auto">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400/5 via-transparent to-yellow-400/5"></div>
            <p 
              className="text-lg md:text-xl font-medium text-amber-50 relative z-10"
              style={{ 
                textShadow: '1px 1px 3px rgba(0, 0, 0, 0.6)',
                fontFamily: "'Lora', serif",
                fontStyle: 'italic'
              }}
            >
              🪔 May this Diwali illuminate your life with joy, prosperity, and endless sweetness 🪔
            </p>
          </div>
        </div>
      </div>

      {/* Elegant Bottom Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-yellow-50 via-yellow-100/50 to-transparent"></div>
    </section>
  );
};

export default DiwaliHero;