import React from 'react';
import { Star, Camera, Award, Users, Sparkles, Trophy } from 'lucide-react';

const ImageShowcase = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-float-delayed"></div>
      
      <div className="container mx-auto px-4 relative">
        
        {/* Section Header */}
        <div className="text-center mb-20 animate-slideInUp">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-primary via-accent to-green p-4 rounded-full shadow-2xl pulse-gold">
              <Sparkles className="h-10 w-10 text-white" />
            </div>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-8">
            See Our{' '}
            <span className="relative inline-block">
              <span className="text-primary">Excellence</span>
              <div className="absolute -bottom-2 left-0 w-full h-4 bg-accent opacity-60 transform rotate-1 rounded-lg"></div>
            </span>
          </h2>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto font-medium leading-relaxed">
            From award ceremonies to professional demonstrations - witness our culinary mastery in action
          </p>
        </div>

        {/* Main Showcase Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          
          {/* Featured Image 1 - Demo */}
          <div className="group relative showcase-card">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl border-4 border-gold/20 group-hover:border-gold/50 transition-all duration-500">
              <img 
                src="/a3_demo.jpg" 
                alt="Professional Catering Demonstration - Sri Nidhi Catering" 
                className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              
              {/* Shimmer effect overlay */}
              <div className="absolute inset-0 showcase-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Overlay Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <div className="flex items-center mb-4">
                  <div className="bg-accent/90 backdrop-blur-sm rounded-full p-2 mr-3 shadow-lg">
                    <Camera className="h-5 w-5 text-white" />
                  </div>
                  <span className="bg-accent/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    Live Demo
                  </span>
                </div>
                <h3 className="text-3xl font-black mb-3 text-shadow-strong">Professional Demonstration</h3>
                <p className="text-lg opacity-90 leading-relaxed text-shadow-medium">
                  Watch our expert chefs showcase traditional cooking techniques and premium service standards
                </p>
              </div>
              
              {/* Decorative corners */}
              <div className="absolute top-4 left-4 w-16 h-16 border-t-4 border-l-4 border-accent rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110"></div>
              <div className="absolute top-4 right-4 w-16 h-16 border-t-4 border-r-4 border-accent rounded-tr-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110"></div>
            </div>
          </div>

          {/* Featured Image 2 - Team */}
          <div className="group relative showcase-card">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl border-4 border-primary/20 group-hover:border-primary/50 transition-all duration-500">
              <img 
                src="/a2.jpg" 
                alt="Professional Service Team - Sri Nidhi Catering" 
                className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              
              {/* Shimmer effect overlay */}
              <div className="absolute inset-0 showcase-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Overlay Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <div className="flex items-center mb-4">
                  <div className="bg-primary/90 backdrop-blur-sm rounded-full p-2 mr-3 shadow-lg">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <span className="bg-primary/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    Our Team
                  </span>
                </div>
                <h3 className="text-3xl font-black mb-3 text-shadow-strong">Expert Service Team</h3>
                <p className="text-lg opacity-90 leading-relaxed text-shadow-medium">
                  Meet our professional staff dedicated to making your events memorable and seamless
                </p>
              </div>
              
              {/* Decorative corners */}
              <div className="absolute bottom-4 left-4 w-16 h-16 border-b-4 border-l-4 border-primary rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110"></div>
              <div className="absolute bottom-4 right-4 w-16 h-16 border-b-4 border-r-4 border-primary rounded-br-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110"></div>
            </div>
          </div>
        </div>

        {/* Stats & Highlights */}
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          <div className="text-center bg-white rounded-2xl p-8 shadow-xl border-2 border-gold/20 hover:border-gold/40 transition-all duration-300 hover:-translate-y-2 showcase-card group">
            <div className="bg-gradient-to-br from-primary to-accent rounded-full p-6 w-20 h-20 mx-auto mb-6 shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
              <Award className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-4xl font-black text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300">15+</h3>
            <p className="text-gray-700 font-semibold">Years Experience</p>
          </div>

          <div className="text-center bg-white rounded-2xl p-8 shadow-xl border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:-translate-y-2 showcase-card group">
            <div className="bg-gradient-to-br from-accent to-green rounded-full p-6 w-20 h-20 mx-auto mb-6 shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-4xl font-black text-gray-900 mb-2 group-hover:text-accent transition-colors duration-300">50K+</h3>
            <p className="text-gray-700 font-semibold">Happy Customers</p>
          </div>

          <div className="text-center bg-white rounded-2xl p-8 shadow-xl border-2 border-green/20 hover:border-green/40 transition-all duration-300 hover:-translate-y-2 showcase-card group">
            <div className="bg-gradient-to-br from-green to-primary rounded-full p-6 w-20 h-20 mx-auto mb-6 shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
              <Star className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-4xl font-black text-gray-900 mb-2 group-hover:text-green transition-colors duration-300">500+</h3>
            <p className="text-gray-700 font-semibold">Events Completed</p>
          </div>

          <div className="text-center bg-white rounded-2xl p-8 shadow-xl border-2 border-accent/20 hover:border-accent/40 transition-all duration-300 hover:-translate-y-2 showcase-card group">
            <div className="bg-gradient-to-br from-gold to-accent rounded-full p-6 w-20 h-20 mx-auto mb-6 shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
              <Trophy className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-4xl font-black text-gray-900 mb-2 group-hover:text-gold transition-colors duration-300">100%</h3>
            <p className="text-gray-700 font-semibold">Quality Assured</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="inline-flex items-center bg-gradient-to-r from-primary via-accent to-green text-white px-12 py-6 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 cursor-pointer border-0 group">
            <span className="text-xl font-black mr-4 text-shadow-medium">View Our Complete Gallery</span>
            <div className="bg-white/20 rounded-full p-2 group-hover:bg-white/30 transition-colors duration-300">
              <Camera className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageShowcase;
