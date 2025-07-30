
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
    <section id="services" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-8">
            Our{' '}
            <span className="relative inline-block">
              <ScribbleUnderline variant="rough" delay={1.0}>
                <span className="text-primary">Services</span>
              </ScribbleUnderline>
              {/* Hand-drawn yellow underline effect */}
              <div className="absolute -bottom-2 left-0 w-full h-4 bg-accent opacity-60 transform -rotate-1 rounded-lg"></div>
            </span>
          </h2>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto font-medium leading-relaxed">
            Comprehensive catering solutions tailored to your specific needs and occasions
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-bg-neutral rounded-3xl p-10 hover:shadow-2xl transition-all duration-300 group border-2 border-primary/20 hover:border-primary/40 hover:-translate-y-2"
            >
              <div className="bg-gradient-to-br from-primary to-accent rounded-full p-6 w-20 h-20 mb-8 group-hover:scale-110 transition-transform shadow-lg">
                <service.icon className="h-8 w-8 text-white" />
              </div>
              
              <h3 className="text-3xl font-black text-gray-900 mb-6">{service.title}</h3>
              <p className="text-gray-700 mb-8 text-lg font-medium leading-relaxed">{service.description}</p>
              
              <ul className="space-y-3">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-700 text-lg">
                    <div className="w-3 h-3 bg-green rounded-full mr-4 flex-shrink-0 shadow-sm"></div>
                    <span className="font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Call to action with vibrant styling */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-primary via-accent to-green rounded-3xl p-12 text-white shadow-2xl">
            <h3 className="text-4xl font-black mb-6">Ready to Plan Your Event?</h3>
            <p className="text-xl mb-8 opacity-90 font-medium max-w-2xl mx-auto leading-relaxed">
              Let us help you create an unforgettable culinary experience that your guests will remember forever
            </p>
            <button 
              onClick={() => {
                const element = document.querySelector('#contact');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-white text-primary px-10 py-4 rounded-xl font-black text-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-xl"
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
