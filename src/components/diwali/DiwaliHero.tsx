import React from 'react';
import { ArrowRight, Star, Clock, Gift, Sparkles, Crown } from 'lucide-react';
import { Button } from '../ui/button';

const DiwaliHero = () => {
  const scrollToSweets = () => {
    const element = document.getElementById('sweets');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-royal-bg relative min-h-screen overflow-hidden">
      {/* Royal Luxury Background with Golden Particles */}
      <div className="absolute inset-0">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/60"></div>
        
        {/* Golden Particle Effects */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full golden-sparkle opacity-60"></div>
        <div className="absolute top-32 right-24 w-3 h-3 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full golden-sparkle opacity-70" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-16 w-5 h-5 bg-gradient-to-r from-amber-400 to-yellow-600 rounded-full golden-sparkle opacity-50" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-32 right-20 w-2 h-2 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full golden-sparkle opacity-80" style={{ animationDelay: '0.5s' }}></div>
        
        {/* Luxury Pattern Overlay */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                radial-gradient(circle at 25% 25%, hsl(var(--saffron-gold)) 0%, transparent 50%),
                radial-gradient(circle at 75% 75%, hsl(var(--amber)) 0%, transparent 50%),
                linear-gradient(45deg, hsl(var(--honey)) 25%, transparent 25%),
                linear-gradient(-45deg, hsl(var(--goldenrod)) 25%, transparent 25%)
              `,
              backgroundSize: '200px 200px, 150px 150px, 75px 75px, 75px 75px'
            }}
          />
        </div>
      </div>

      {/* Royal Festive Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-16 left-12 text-5xl opacity-40 golden-sparkle">🪔</div>
        <div className="absolute top-24 right-16 text-4xl opacity-35 golden-sparkle" style={{ animationDelay: '2s' }}>✨</div>
        <div className="absolute bottom-28 left-20 text-6xl opacity-30 golden-sparkle" style={{ animationDelay: '4s' }}>🌟</div>
        <div className="absolute bottom-20 right-14 text-5xl opacity-45 golden-sparkle" style={{ animationDelay: '1s' }}>🎆</div>
        <div className="absolute top-1/2 left-1/4 text-3xl opacity-25 golden-sparkle" style={{ animationDelay: '3s' }}>💫</div>
        <div className="absolute top-1/3 right-1/3 text-4xl opacity-35 golden-sparkle" style={{ animationDelay: '1.5s' }}>🕯️</div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content - Royal Typography */}
            <div className="space-y-12">
              {/* Royal Badge */}
              <div className="inline-flex items-center gap-3 glass-golden px-6 py-3 rounded-full border border-yellow-400/30">
                <Crown className="w-5 h-5 text-yellow-400" />
                <span className="text-sm font-semibold royal-serif">Premium Diwali Collection 2025</span>
              </div>
              
              {/* Main Heading - Luxury Serif */}
              <div className="space-y-6">
                <h1 className="luxury-heading text-6xl lg:text-8xl font-black leading-none">
                  Sri Nidhi
                  <br />
                  <span className="text-5xl lg:text-7xl">Royal Sweets</span>
                </h1>
                
                <p className="text-xl lg:text-2xl royal-serif leading-relaxed max-w-2xl opacity-90">
                  Handcrafted with heritage recipes, adorned with the finest ingredients. 
                  Experience the royal taste of authentic Diwali celebrations.
                </p>
              </div>

              {/* Royal Features */}
              <div className="flex flex-wrap gap-8 text-yellow-200">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full royal-glow"></div>
                  <span className="text-sm font-medium">25+ Years Heritage</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full royal-glow"></div>
                  <span className="text-sm font-medium">Royal Packaging</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full royal-glow"></div>
                  <span className="text-sm font-medium">Fresh Daily</span>
                </div>
              </div>

              {/* Royal CTA */}
              <div className="flex flex-col sm:flex-row gap-6">
                <Button 
                  onClick={scrollToSweets}
                  className="cta-golden text-lg px-10 py-4 rounded-2xl font-bold"
                >
                  <span className="flex items-center gap-3">
                    Explore Royal Collection
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </Button>
              </div>
            </div>

            {/* Right Visual - Royal Logo Showcase */}
            <div className="relative">
              <div className="relative w-full max-w-lg mx-auto">
                {/* Royal Frame */}
                <div className="card-premium-glow relative z-10 p-12 rounded-3xl">
                  <div className="royal-glow">
                    <img 
                      src="/cateringLogo.png" 
                      alt="Sri Nidhi Catering Royal Logo" 
                      className="w-full h-auto object-contain filter drop-shadow-2xl" 
                    />
                  </div>
                </div>
                
                {/* Royal Stats - Floating */}
                <div className="absolute -top-6 -right-6 glass-golden px-6 py-4 rounded-2xl shadow-2xl border border-yellow-400/20">
                  <div className="text-center">
                    <div className="text-3xl font-bold luxury-heading">25+</div>
                    <div className="text-xs royal-serif opacity-80">Years Legacy</div>
                  </div>
                </div>
                
                <div className="absolute -bottom-6 -left-6 glass-golden px-6 py-4 rounded-2xl shadow-2xl border border-yellow-400/20">
                  <div className="text-center">
                    <div className="text-3xl font-bold luxury-heading">50+</div>
                    <div className="text-xs royal-serif opacity-80">Royal Varieties</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Royal Features Bottom */}
          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-golden p-8 rounded-3xl border border-yellow-400/20 text-center hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 hero-golden-bg rounded-2xl flex items-center justify-center mx-auto mb-6 royal-glow">
                <Star className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-bold luxury-heading mb-3">Heritage Recipes</h3>
              <p className="royal-serif text-sm opacity-80">Traditional methods perfected over generations</p>
            </div>
            
            <div className="glass-golden p-8 rounded-3xl border border-yellow-400/20 text-center hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 hero-golden-bg rounded-2xl flex items-center justify-center mx-auto mb-6 royal-glow">
                <Clock className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-bold luxury-heading mb-3">Made Fresh Daily</h3>
              <p className="royal-serif text-sm opacity-80">Crafted every morning with premium ingredients</p>
            </div>
            
            <div className="glass-golden p-8 rounded-3xl border border-yellow-400/20 text-center hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 hero-golden-bg rounded-2xl flex items-center justify-center mx-auto mb-6 royal-glow">
                <Gift className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-bold luxury-heading mb-3">Royal Packaging</h3>
              <p className="royal-serif text-sm opacity-80">Luxurious gift boxes perfect for celebrations</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiwaliHero;