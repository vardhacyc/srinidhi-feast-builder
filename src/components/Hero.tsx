
import { ChefHat, Users, Clock, Award, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ScribbleUnderline from '@/components/ui/ScribbleUnderline';

const Hero = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Background with Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-yellow-50 to-gray-100"></div>
      
      {/* Curved Background Elements */}
      <div className="absolute inset-0">
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="curveGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E1A200" stopOpacity="0.1"/>
              <stop offset="100%" stopColor="#464646" stopOpacity="0.05"/>
            </linearGradient>
            <linearGradient id="curveGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#B8860B" stopOpacity="0.08"/>
              <stop offset="100%" stopColor="#E1A200" stopOpacity="0.03"/>
            </linearGradient>
          </defs>
          
          {/* Organic curved shapes */}
          <path d="M0,400 Q300,200 600,350 T1200,300 L1200,0 L0,0 Z" fill="url(#curveGradient1)"/>
          <path d="M0,600 Q400,450 800,550 T1200,500 L1200,800 L0,800 Z" fill="url(#curveGradient2)"/>
          
          {/* Floating circles */}
          <circle cx="150" cy="150" r="80" fill="#E1A200" fillOpacity="0.04"/>
          <circle cx="1050" cy="200" r="120" fill="#464646" fillOpacity="0.03"/>
          <circle cx="900" cy="600" r="60" fill="#E1A200" fillOpacity="0.05"/>
          <circle cx="200" cy="650" r="100" fill="#B8860B" fillOpacity="0.04"/>
        </svg>
      </div>

      {/* Animated background particles */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            <Sparkles className="w-4 h-4 text-yellow-400" />
          </div>
        ))}
      </div>

      <div className="container mx-auto px-6 text-center relative z-10 pt-32">
        <div className="max-w-6xl mx-auto">
          
          {/* Premium Badge */}
          <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm text-header-bar px-8 py-4 rounded-full text-sm font-bold mb-12 shadow-2xl border border-yellow-200 hover:scale-105 transition-transform duration-300">
            <Award className="w-4 h-4" />
            Building on Kovai Catering Legacy Since 2008
          </div>
          
          {/* Main Hero Title */}
          <div className="mb-16">
            <h1 className="text-7xl md:text-9xl font-black mb-8 leading-none tracking-tight">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-header-bar to-gray-600 drop-shadow-sm">
                Yolo
              </span>
              <span className="relative block">
                <ScribbleUnderline variant="wavy" className="text-primary opacity-60">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-gold">
                    Caterers
                  </span>
                </ScribbleUnderline>
                {/* Premium underline effect */}
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-80 h-6 bg-gradient-to-r from-primary/30 via-accent/40 to-gold/30 rounded-full blur-sm"></div>
              </span>
            </h1>
            
            <p className="text-2xl md:text-3xl text-gray-700 mb-12 max-w-5xl mx-auto font-medium leading-relaxed">
              Creating extraordinary culinary experiences with 
              <span className="text-header-bar font-bold"> premium service</span> and 
              <span className="text-primary font-bold"> authentic flavors</span>.
              <br className="hidden md:block" />
              A unit of <span className="text-gold font-bold">Sri Nidhi Catering</span>, continuing the legacy of excellence.
            </p>
          </div>

          {/* Premium CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center mb-20">
            <Button 
              onClick={() => scrollToSection('#contact')}
              size="lg"
              className="group bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-gold text-white px-12 py-8 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300 border-0"
            >
              <span>Book Your Event</span>
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              onClick={() => scrollToSection('#menu')}
              variant="outline" 
              size="lg"
              className="group border-3 border-header-bar/20 bg-white/80 backdrop-blur-sm text-header-bar hover:bg-header-bar hover:text-white px-12 py-8 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
            >
              <span>Explore Menu</span>
              <ChefHat className="ml-3 w-5 h-5 group-hover:rotate-12 transition-transform" />
            </Button>
          </div>

          {/* Premium Statistics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="group text-center">
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-yellow-100 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl"></div>
                <div className="relative">
                  <div className="bg-gradient-to-br from-primary to-accent rounded-2xl p-4 w-16 h-16 mx-auto mb-6 shadow-lg flex items-center justify-center group-hover:rotate-6 transition-transform duration-300">
                    <ChefHat className="h-8 w-8 text-white" />
                  </div>
                  <ScribbleUnderline variant="zigzag" delay={1.5}>
                    <h3 className="text-3xl font-black text-gray-800 mb-2">500+</h3>
                  </ScribbleUnderline>
                  <p className="text-gray-600 font-medium">Events Catered</p>
                </div>
              </div>
            </div>
            
            <div className="group text-center">
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-header-bar/5 to-gray-600/5 rounded-3xl"></div>
                <div className="relative">
                  <div className="bg-gradient-to-br from-header-bar to-gray-600 rounded-2xl p-4 w-16 h-16 mx-auto mb-6 shadow-lg flex items-center justify-center group-hover:rotate-6 transition-transform duration-300">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-black text-gray-800 mb-2">50,000+</h3>
                  <p className="text-gray-600 font-medium">Happy Guests</p>
                </div>
              </div>
            </div>
            
            <div className="group text-center">
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-yellow-100 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-yellow-500/5 rounded-3xl"></div>
                <div className="relative">
                  <div className="bg-gradient-to-br from-gold to-yellow-500 rounded-2xl p-4 w-16 h-16 mx-auto mb-6 shadow-lg flex items-center justify-center group-hover:rotate-6 transition-transform duration-300">
                    <Clock className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-black text-gray-800 mb-2">15+</h3>
                  <p className="text-gray-600 font-medium">Years Experience</p>
                </div>
              </div>
            </div>
            
            <div className="group text-center">
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-green-100 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 rounded-3xl"></div>
                <div className="relative">
                  <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-4 w-16 h-16 mx-auto mb-6 shadow-lg flex items-center justify-center group-hover:rotate-6 transition-transform duration-300">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-black text-gray-800 mb-2">100%</h3>
                  <p className="text-gray-600 font-medium">Quality Assured</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 border-2 border-header-bar/30 rounded-full flex justify-center bg-white/50 backdrop-blur-sm shadow-lg">
          <div className="w-1.5 h-4 bg-gradient-to-b from-primary to-accent rounded-full mt-2"></div>
        </div>
      </div>

      {/* Curved Divider at Bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg className="relative block w-full h-20" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,60 C150,90 350,30 600,60 C850,90 1050,30 1200,60 L1200,120 L0,120 Z" 
                fill="white" fillOpacity="0.8"></path>
          <path d="M0,80 C200,50 400,110 600,80 C800,50 1000,110 1200,80 L1200,120 L0,120 Z" 
                fill="white"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
