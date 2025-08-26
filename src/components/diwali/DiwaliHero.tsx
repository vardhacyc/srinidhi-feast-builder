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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hanging Lanterns and Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Hanging Lanterns */}
        <div className="absolute top-0 left-10 hanging-lantern" style={{ animationDelay: '0s' }}>
          <svg width="48" height="72" viewBox="0 0 48 72" className="opacity-60">
            <line x1="24" y1="0" x2="24" y2="12" stroke="#B8860B" strokeWidth="2"/>
            <circle cx="24" cy="15" r="3" fill="#FFD700"/>
            <path d="M12 18 L36 18 L34 48 L14 48 Z" fill="#FF6347" stroke="#B8860B" strokeWidth="1"/>
            <rect x="20" y="24" width="8" height="16" fill="#FFD700" opacity="0.8"/>
            <path d="M12 48 L36 48 L32 54 L16 54 Z" fill="#B8860B"/>
            <circle cx="24" cy="57" r="3" fill="#FFD700"/>
          </svg>
        </div>
        
        <div className="absolute top-0 right-16 hanging-lantern-reverse" style={{ animationDelay: '1s' }}>
          <svg width="40" height="60" viewBox="0 0 40 60" className="opacity-50">
            <line x1="20" y1="0" x2="20" y2="10" stroke="#B8860B" strokeWidth="2"/>
            <circle cx="20" cy="12" r="2" fill="#FFD700"/>
            <path d="M10 15 L30 15 L28 40 L12 40 Z" fill="#FF4500" stroke="#B8860B" strokeWidth="1"/>
            <rect x="17" y="20" width="6" height="12" fill="#FFD700" opacity="0.8"/>
            <path d="M10 40 L30 40 L27 45 L13 45 Z" fill="#B8860B"/>
            <circle cx="20" cy="47" r="2" fill="#FFD700"/>
          </svg>
        </div>

        <div className="absolute top-0 left-1/3 hanging-lantern" style={{ animationDelay: '2s' }}>
          <svg width="36" height="54" viewBox="0 0 36 54" className="opacity-45">
            <line x1="18" y1="0" x2="18" y2="8" stroke="#B8860B" strokeWidth="1"/>
            <circle cx="18" cy="10" r="2" fill="#FFD700"/>
            <path d="M8 12 L28 12 L26 36 L10 36 Z" fill="#FF6347" stroke="#B8860B" strokeWidth="1"/>
            <rect x="15" y="18" width="6" height="10" fill="#FFD700" opacity="0.7"/>
            <path d="M8 36 L28 36 L25 40 L11 40 Z" fill="#B8860B"/>
            <circle cx="18" cy="42" r="2" fill="#FFD700"/>
          </svg>
        </div>

        <div className="absolute top-0 right-1/4 hanging-lantern-reverse" style={{ animationDelay: '1.5s' }}>
          <svg width="44" height="66" viewBox="0 0 44 66" className="opacity-55">
            <line x1="22" y1="0" x2="22" y2="10" stroke="#B8860B" strokeWidth="2"/>
            <circle cx="22" cy="13" r="2.5" fill="#FFD700"/>
            <path d="M11 16 L33 16 L31 44 L13 44 Z" fill="#FF4500" stroke="#B8860B" strokeWidth="1"/>
            <rect x="18" y="22" width="8" height="14" fill="#FFD700" opacity="0.8"/>
            <path d="M11 44 L33 44 L29 50 L15 50 Z" fill="#B8860B"/>
            <circle cx="22" cy="52" r="2.5" fill="#FFD700"/>
          </svg>
        </div>

        {/* Floating Particles */}
        <div className="absolute top-32 right-20 text-3xl diwali-particle opacity-30" style={{ animationDelay: '2s' }}>✨</div>
        <div className="absolute bottom-20 left-20 text-5xl diwali-particle opacity-35">🌟</div>
        <div className="absolute bottom-32 right-10 text-4xl diwali-particle opacity-40" style={{ animationDelay: '1s' }}>🎆</div>
        <div className="absolute top-1/2 left-1/4 text-2xl diwali-particle opacity-25" style={{ animationDelay: '3s' }}>💫</div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        {/* Main Hero Content */}
        <div className="mb-12">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="hanging-lantern animate-diwali-glow" style={{ animationDelay: '0.5s' }}>
              <svg width="120" height="180" viewBox="0 0 120 180" className="diwali-shimmer">
                <line x1="60" y1="0" x2="60" y2="20" stroke="#B8860B" strokeWidth="3"/>
                <circle cx="60" cy="25" r="6" fill="#FFD700"/>
                <path d="M30 30 L90 30 L85 120 L35 120 Z" fill="#FF6347" stroke="#B8860B" strokeWidth="2"/>
                <rect x="50" y="45" width="20" height="40" fill="#FFD700" opacity="0.9"/>
                <rect x="45" y="55" width="30" height="3" fill="#B8860B"/>
                <rect x="45" y="70" width="30" height="3" fill="#B8860B"/>
                <path d="M30 120 L90 120 L80 135 L40 135 Z" fill="#B8860B"/>
                <circle cx="60" cy="145" r="6" fill="#FFD700"/>
                <path d="M54 151 Q60 157 66 151" stroke="#B8860B" strokeWidth="2" fill="none"/>
              </svg>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
            <span className="diwali-text-gradient gradient-heading">Sri Nidhi</span>
            <br />
            <span className="diwali-text-gradient gradient-heading">Diwali Sweets</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed" style={{ color: 'hsl(var(--diwali-text))' }}>
            Celebrate the festival of lights with our handcrafted traditional sweets. 
            <br className="hidden md:block" />
            Made with love, tradition, and the finest ingredients.
          </p>
        </div>

        {/* Feature Highlights - Flowing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          <div className="diwali-glass-card rounded-2xl p-6 text-center transition-all duration-300 hover:scale-105 diwali-shadow">
            <Award className="h-8 w-8 mx-auto mb-4" style={{ color: 'hsl(var(--diwali-gold))' }} />
            <h3 className="text-lg font-bold mb-2" style={{ color: 'hsl(var(--diwali-dark))' }}>Premium Quality</h3>
            <p className="text-sm" style={{ color: 'hsl(var(--diwali-text))' }}>Authentic recipes passed down through generations</p>
          </div>
          
          <div className="diwali-glass-card rounded-2xl p-6 text-center transition-all duration-300 hover:scale-105 diwali-shadow">
            <Sparkles className="h-8 w-8 mx-auto mb-4" style={{ color: 'hsl(var(--diwali-gold))' }} />
            <h3 className="text-lg font-bold mb-2" style={{ color: 'hsl(var(--diwali-dark))' }}>Festive Gifting</h3>
            <p className="text-sm" style={{ color: 'hsl(var(--diwali-text))' }}>Beautiful packaging perfect for celebrations</p>
          </div>
          
          <div className="diwali-glass-card rounded-2xl p-6 text-center transition-all duration-300 hover:scale-105 diwali-shadow">
            <Heart className="h-8 w-8 mx-auto mb-4" style={{ color: 'hsl(var(--diwali-gold))' }} />
            <h3 className="text-lg font-bold mb-2" style={{ color: 'hsl(var(--diwali-dark))' }}>Made with Love</h3>
            <p className="text-sm" style={{ color: 'hsl(var(--diwali-text))' }}>Fresh daily with finest ingredients</p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="space-y-6">
          <button
            onClick={scrollToSweets}
            className="diwali-btn px-8 py-4 rounded-full text-lg font-bold diwali-shadow-lg transform hover:scale-110 transition-all duration-300 hover:-translate-y-1"
          >
            <span className="flex items-center space-x-2">
              <span>Explore Collection</span>
              <Sparkles className="h-5 w-5" />
            </span>
          </button>
        </div>

        {/* Festive Message */}
        <div className="mt-16 diwali-glass-card rounded-2xl p-8 diwali-shadow">
          <p className="text-lg font-semibold diwali-text-gradient">
            ✨ May this Diwali illuminate your life with joy, prosperity, and endless sweetness ✨
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