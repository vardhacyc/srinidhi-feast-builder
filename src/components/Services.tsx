
import { Crown, Building, Users, Utensils } from 'lucide-react';
import ScribbleUnderline from '@/components/ui/ScribbleUnderline';

const Services = () => {
  const services = [
    {
      icon: Crown,
      title: "Wedding Catering",
      description: "Make your special day unforgettable with our exquisite wedding menus and impeccable service",
      features: ["Traditional South Indian Feast", "Custom Menu Planning", "Professional Service Staff", "Decoration Support"]
    },
    {
      icon: Building,
      title: "Corporate Catering",
      description: "Professional catering solutions for meetings, conferences, and corporate events",
      features: ["Business Lunch Packages", "Conference Catering", "Office Parties", "Product Launches"]
    },
    {
      icon: Users,
      title: "Institutional Catering",
      description: "Reliable and nutritious meal solutions for institutions and large groups",
      features: ["Educational Institutions", "Healthcare Facilities", "Hostels & Mess", "Bulk Catering"]
    },
    {
      icon: Utensils,
      title: "Event Catering",
      description: "Complete catering solutions for all types of celebrations and gatherings",
      features: ["Birthday Parties", "Anniversaries", "Religious Functions", "Social Gatherings"]
    }
  ];

  return (
    <section id="services" className="section-spacing gradient-subtle">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-10 text-balance">
            Our{' '}
            <span className="relative inline-block">
              <ScribbleUnderline variant="rough" delay={1.0}>
                <span className="text-gradient">Services</span>
              </ScribbleUnderline>
              {/* Enhanced underline effect */}
              <div className="absolute -bottom-3 left-0 w-full h-5 bg-gradient-to-r from-accent/40 via-primary/60 to-gold/40 transform -rotate-1 rounded-lg blur-sm"></div>
            </span>
          </h2>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto font-medium leading-relaxed text-balance">
            Comprehensive catering solutions tailored to your specific needs and occasions
          </p>
          <div className="divider-elegant max-w-md mx-auto"></div>
        </div>

        <div className="grid-cards mb-32">
          {services.map((service, index) => (
            <div 
              key={index}
              className="card-elevated bg-bg-neutral overflow-hidden group border-2 border-primary/20 hover:border-primary/40"
            >
              {/* Service Image */}
              <div className="relative h-72 overflow-hidden">
                <img 
                  src={index === 0 ? "/a2.jpg" : index === 1 ? "/a3_demo.jpg" : index === 2 ? "/a4_outdoor.jpg" : "/a3_demo.jpg"} 
                  alt={`${service.title} - Sri Nidhi Catering`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Enhanced icon overlay */}
                <div className="absolute top-6 right-6 bg-gradient-to-br from-primary to-accent rounded-xl p-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="h-8 w-8 text-white" />
                </div>
              </div>
              
              {/* Enhanced Card Content */}
              <div className="p-10">
                <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 text-balance">{service.title}</h3>
                <p className="text-gray-700 mb-8 text-lg font-medium leading-relaxed text-balance">{service.description}</p>
                
                <ul className="space-y-4">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-700 text-lg">
                      <div className="w-4 h-4 bg-gradient-to-br from-primary to-accent rounded-full mr-4 flex-shrink-0 shadow-sm"></div>
                      <span className="font-medium text-balance">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Outdoor Catering Showcase */}
        <div className="gradient-warm rounded-3xl p-16 border-2 border-primary/20 backdrop-blur-sm">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="card-elevated bg-white p-10 border-2 border-gold/30">
                <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-8 text-balance">
                  <span className="text-gradient">Outdoor</span> Catering Specialists
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed mb-8 text-balance">
                  Take your events beyond traditional venues with our comprehensive outdoor catering services. 
                  From beachside celebrations to garden parties, we bring the kitchen to you.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full mr-6 shadow-sm"></div>
                    <span className="text-gray-700 font-medium text-lg text-balance">Mobile Kitchen Setup</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-gradient-to-br from-accent to-primary rounded-full mr-6 shadow-sm"></div>
                    <span className="text-gray-700 font-medium text-lg text-balance">Weather-Resistant Service</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-gradient-to-br from-primary to-gold rounded-full mr-6 shadow-sm"></div>
                    <span className="text-gray-700 font-medium text-lg text-balance">Portable Equipment & Setup</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-gradient-to-br from-gold to-accent rounded-full mr-6 shadow-sm"></div>
                    <span className="text-gray-700 font-medium text-lg text-balance">Fresh Food Preparation On-Site</span>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    const element = document.querySelector('#contact');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="mt-10 btn-primary-modern text-lg hover:scale-105 transition-all duration-300"
                >
                  Plan Outdoor Event
                </button>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="relative group">
                <img 
                  src="/a4_outdoor.jpg" 
                  alt="Professional Outdoor Catering Setup - Sri Nidhi Catering" 
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl border-4 border-primary/30 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-8 left-8 right-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h5 className="text-2xl font-black mb-3 text-balance">Outdoor Event Excellence</h5>
                  <p className="text-lg text-balance">Professional setup for memorable outdoor celebrations</p>
                </div>
                
                {/* Enhanced animated badge */}
                <div className="absolute top-6 right-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-full font-black text-sm shadow-xl animate-pulse">
                  ✓ Weather Ready
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Call to action */}
        <div className="text-center mt-32">
          <div className="card-elevated bg-gradient-to-r from-primary via-accent to-gold p-16 text-white">
            <h3 className="text-4xl md:text-5xl font-black mb-8 text-balance">Ready to Plan Your Event?</h3>
            <p className="text-xl mb-10 opacity-90 font-medium max-w-2xl mx-auto leading-relaxed text-balance">
              Let us help you create an unforgettable culinary experience that your guests will remember forever
            </p>
            <button 
              onClick={() => {
                const element = document.querySelector('#contact');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-secondary-modern bg-white text-primary hover:bg-gray-50 text-lg hover:scale-105 shadow-xl"
            >
              Get Free Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
