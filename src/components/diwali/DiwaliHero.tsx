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
        background: 'radial-gradient(ellipse at center, hsl(var(--diwali-cream)) 0%, hsl(var(--diwali-light)) 25%, hsl(var(--diwali-gold)) 70%, hsl(var(--diwali-bronze)) 100%)',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Luxury Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, hsla(var(--diwali-gold), 0.15) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, hsla(var(--diwali-gold), 0.1) 0%, transparent 50%),
              linear-gradient(45deg, hsla(var(--diwali-gold), 0.05) 25%, transparent 25%),
              linear-gradient(-45deg, hsla(var(--diwali-gold), 0.05) 25%, transparent 25%)
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
              <div className="absolute inset-0 h-44 w-44 animate-pulse opacity-20 rounded-full bg-gradient-to-r from-yellow-300 to-amber-400 shadow-2xl" style={{ background: 'radial-gradient(circle, hsl(var(--diwali-bright)) 0%, hsl(var(--diwali-gold)) 100%)' }}></div>
              <img 
                src="/cateringLogo.png" 
                alt="Sri Nidhi Catering Logo" 
                className="relative z-10 h-44 w-44 object-contain" 
                style={{
                  filter: 'brightness(1.2) contrast(1.1) drop-shadow(0 6px 16px hsla(var(--diwali-shadow), 0.4))',
                  imageRendering: 'crisp-edges'
                }}
              />
            </div>
          </div>
          
          <h1 className="mb-8 leading-tight">
            <span 
              className="block text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-4"
              style={{
                color: 'hsl(var(--diwali-dark))',
                textShadow: '3px 3px 0px hsla(var(--diwali-shadow), 0.8), 6px 6px 12px hsla(var(--diwali-shadow), 0.6)',
                fontFamily: "'Playfair Display', serif",
                fontWeight: '900',
                letterSpacing: '-0.02em',
                textRendering: 'optimizeLegibility',
                WebkitTextStroke: '1px hsla(var(--diwali-gold), 0.3)'
              }}
            >
              
            </span>
            <span 
              className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold"
              style={{
                color: 'hsl(var(--diwali-bronze))',
                textShadow: '2px 2px 0px hsla(var(--diwali-shadow), 0.7), 4px 4px 8px hsla(var(--diwali-shadow), 0.5)',
                fontFamily: "'Lato', sans-serif",
                fontWeight: '700',
                letterSpacing: '0.08em',
                textRendering: 'optimizeLegibility',
                textTransform: 'uppercase'
              }}
            >
              
            </span>
          </h1>
          
          <div className="mb-10">
            <p 
              className="text-xl md:text-2xl lg:text-3xl mb-6 max-w-5xl mx-auto leading-tight font-bold"
              style={{ 
                color: 'hsl(var(--diwali-dark))',
                textShadow: '2px 2px 0px hsla(var(--diwali-shadow), 0.8), 4px 4px 8px hsla(var(--diwali-shadow), 0.6)',
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
                color: 'hsl(var(--diwali-text))',
                textShadow: '1px 1px 0px hsla(var(--diwali-shadow), 0.7), 2px 2px 4px hsla(var(--diwali-shadow), 0.5)',
                fontFamily: "'Inter', sans-serif",
                fontWeight: '500',
                textRendering: 'optimizeLegibility'
              }}
            >
              Premium Diwali sweets handcrafted in Coimbatore
              <br className="hidden md:block" />
              Authentic recipes - Top-quality ingredients - Freshly prepared daily
            </p>
          </div>
        </div>

        {/* Professional CTA */}
        <div className="space-y-8">
          <button
            onClick={scrollToSweets}
            className="group diwali-btn relative px-12 py-5 rounded-2xl text-xl font-black transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-2xl"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: '900',
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

        {/* Premium Festive Message */}
        <div className="mt-16">
          <div className="relative px-8 py-6 rounded-2xl diwali-glass-card max-w-3xl mx-auto">
            <div className="relative text-center">
              <div className="flex justify-center items-center mb-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-md" style={{ background: 'linear-gradient(135deg, hsl(var(--diwali-gold)), hsl(var(--diwali-bronze)))' }}>
                  <Crown className="h-4 w-4" style={{ color: 'hsl(var(--diwali-cream))' }} />
                </div>
              </div>
              <p 
                className="text-lg md:text-xl font-semibold leading-snug"
                style={{ 
                  color: 'hsl(var(--diwali-dark))',
                  textShadow: '1px 1px 0px hsla(var(--diwali-shadow), 0.6)',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: '600',
                  textRendering: 'optimizeLegibility',
                  letterSpacing: '0.01em'
                }}
              >
                Celebrating traditions with
                <br />
                <span style={{ color: 'hsl(var(--diwali-bronze))', fontWeight: '700' }}>Premium Quality • Authentic Taste</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Elegant Bottom Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-yellow-50 via-yellow-100/50 to-transparent" style={{ background: 'linear-gradient(to top, hsl(var(--diwali-cream)), hsla(var(--diwali-cream), 0))' }}></div>
    </section>
  );
};

export default DiwaliHero;