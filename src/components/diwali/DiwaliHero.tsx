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
              <div className="absolute inset-0 h-44 w-44 animate-pulse opacity-20 rounded-full bg-gradient-to-r from-yellow-300 to-amber-400 shadow-2xl"></div>
              <img 
                src="/cateringLogo.png" 
                alt="Sri Nidhi Catering Logo" 
                className="relative z-10 h-44 w-44 object-contain" 
                style={{
                  filter: 'brightness(1.4) contrast(1.4) saturate(1.3) drop-shadow(0 6px 16px rgba(0, 0, 0, 0.4)) drop-shadow(0 2px 8px rgba(139, 90, 60, 0.3))',
                  imageRendering: 'crisp-edges'
                }}
              />
            </div>
          </div>
          
          <h1 className="mb-8 leading-tight">
            <span 
              className="block text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-4"
              style={{
                color: '#FFFFFF',
                textShadow: '3px 3px 0px rgba(0, 0, 0, 0.8), 6px 6px 12px rgba(0, 0, 0, 0.6)',
                fontFamily: "'Playfair Display', serif",
                fontWeight: '900',
                letterSpacing: '-0.02em',
                textRendering: 'optimizeLegibility',
                WebkitTextStroke: '1px rgba(255, 215, 0, 0.3)'
              }}
            >
              SRI NIDHI
            </span>
            <span 
              className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold"
              style={{
                color: '#FFD700',
                textShadow: '2px 2px 0px rgba(0, 0, 0, 0.7), 4px 4px 8px rgba(0, 0, 0, 0.5)',
                fontFamily: "'Lato', sans-serif",
                fontWeight: '700',
                letterSpacing: '0.08em',
                textRendering: 'optimizeLegibility',
                textTransform: 'uppercase'
              }}
            >
              CATERING
            </span>
          </h1>
          
          <div className="mb-10">
            <p 
              className="text-xl md:text-2xl lg:text-3xl mb-6 max-w-5xl mx-auto leading-tight font-bold"
              style={{ 
                color: '#FFFFFF',
                textShadow: '2px 2px 0px rgba(0, 0, 0, 0.8), 4px 4px 8px rgba(0, 0, 0, 0.6)',
                fontFamily: "'Inter', sans-serif",
                fontWeight: '700',
                textRendering: 'optimizeLegibility',
                letterSpacing: '0.02em'
              }}
            >
              Premium Diwali Sweets & Traditional Delicacies
            </p>
            <p 
              className="text-lg md:text-xl max-w-4xl mx-auto leading-relaxed font-medium"
              style={{ 
                color: '#FEF3C7',
                textShadow: '1px 1px 0px rgba(0, 0, 0, 0.7), 2px 2px 4px rgba(0, 0, 0, 0.5)',
                fontFamily: "'Inter', sans-serif",
                fontWeight: '500',
                textRendering: 'optimizeLegibility'
              }}
            >
              Handcrafted with authentic recipes • Premium ingredients • Made fresh daily
              <br className="hidden md:block" />
              Celebrating 25+ years of sweet traditions in Bangalore
            </p>
          </div>
        </div>

        {/* Professional Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-6xl mx-auto">
          <div className="group">
            <div className="relative p-8 rounded-3xl bg-gradient-to-br from-amber-500/20 to-orange-600/20 border-2 border-amber-400/30 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 to-white/5"></div>
              <div className="relative">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-black mb-4 text-center" style={{ color: '#FFFFFF', fontFamily: "'Inter', sans-serif", textShadow: '2px 2px 0px rgba(0, 0, 0, 0.7)', letterSpacing: '0.02em' }}>
                  PREMIUM QUALITY
                </h3>
                <p className="text-center font-semibold leading-relaxed" style={{ color: '#FEF3C7', textShadow: '1px 1px 0px rgba(0, 0, 0, 0.6)', fontFamily: "'Inter', sans-serif" }}>
                  Authentic traditional recipes perfected over 25 years
                </p>
              </div>
            </div>
          </div>
          
          <div className="group">
            <div className="relative p-8 rounded-3xl bg-gradient-to-br from-amber-500/20 to-orange-600/20 border-2 border-amber-400/30 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 to-white/5"></div>
              <div className="relative">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-black mb-4 text-center" style={{ color: '#FFFFFF', fontFamily: "'Inter', sans-serif", textShadow: '2px 2px 0px rgba(0, 0, 0, 0.7)', letterSpacing: '0.02em' }}>
                  FESTIVAL READY
                </h3>
                <p className="text-center font-semibold leading-relaxed" style={{ color: '#FEF3C7', textShadow: '1px 1px 0px rgba(0, 0, 0, 0.6)', fontFamily: "'Inter', sans-serif" }}>
                  Premium packaging perfect for gifting and celebrations
                </p>
              </div>
            </div>
          </div>
          
          <div className="group">
            <div className="relative p-8 rounded-3xl bg-gradient-to-br from-amber-500/20 to-orange-600/20 border-2 border-amber-400/30 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 to-white/5"></div>
              <div className="relative">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-black mb-4 text-center" style={{ color: '#FFFFFF', fontFamily: "'Inter', sans-serif", textShadow: '2px 2px 0px rgba(0, 0, 0, 0.7)', letterSpacing: '0.02em' }}>
                  FRESH DAILY
                </h3>
                <p className="text-center font-semibold leading-relaxed" style={{ color: '#FEF3C7', textShadow: '1px 1px 0px rgba(0, 0, 0, 0.6)', fontFamily: "'Inter', sans-serif" }}>
                  Made fresh every morning with finest quality ingredients
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Professional CTA */}
        <div className="space-y-8">
          <button
            onClick={scrollToSweets}
            className="group relative px-12 py-5 rounded-2xl text-xl font-black transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #FFD700 0%, #F59E0B 30%, #D97706 70%, #92400E 100%)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
              color: '#FFFFFF',
              fontFamily: "'Inter', sans-serif",
              fontWeight: '900',
              textShadow: '1px 1px 0px rgba(0, 0, 0, 0.7)',
              letterSpacing: '0.05em'
            }}
          >
            <span className="relative z-10 flex items-center space-x-4">
              <span>EXPLORE OUR COLLECTION</span>
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Sparkles className="h-5 w-5 group-hover:rotate-180 transition-transform duration-500" />
              </div>
            </span>
          </button>
        </div>

        {/* Professional Festive Message */}
        <div className="mt-20">
          <div className="relative p-8 rounded-3xl bg-gradient-to-br from-amber-500/25 to-orange-600/25 border-2 border-amber-400/40 shadow-2xl max-w-5xl mx-auto">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/15 to-white/5"></div>
            <div className="relative text-center">
              <div className="text-4xl mb-4">🪔</div>
              <p 
                className="text-xl md:text-2xl font-bold leading-relaxed"
                style={{ 
                  color: '#FFFFFF',
                  textShadow: '2px 2px 0px rgba(0, 0, 0, 0.7), 4px 4px 8px rgba(0, 0, 0, 0.5)',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: '700',
                  textRendering: 'optimizeLegibility',
                  letterSpacing: '0.02em'
                }}
              >
                Wishing you a Diwali filled with
                <br />
                <span style={{ color: '#FFD700' }}>Joy • Prosperity • Sweet Moments</span>
              </p>
              <div className="text-4xl mt-4">🌟</div>
            </div>
          </div>
        </div>
      </div>

      {/* Elegant Bottom Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-yellow-50 via-yellow-100/50 to-transparent"></div>
    </section>
  );
};

export default DiwaliHero;