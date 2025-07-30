
import { Star, Quote } from 'lucide-react';
import ScribbleUnderline from '@/components/ui/ScribbleUnderline';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Rajesh Kumar",
      event: "Wedding Reception",
      rating: 5,
      text: "Yolo Caterers made our wedding reception absolutely perfect! The food was delicious and the service was impeccable. All our guests couldn't stop praising the authentic South Indian flavors.",
      location: "Coimbatore"
    },
    {
      name: "Priya Mahesh",
      event: "Corporate Event",
      rating: 5,
      text: "We've been using Yolo Caterers for all our corporate events for the past 2 years. Their consistency in quality and timely service has never disappointed us. Highly recommended!",
      location: "Coimbatore"
    },
    {
      name: "Venkat Subramanian",
      event: "House Warming",
      rating: 5,
      text: "The traditional feast they prepared for our house warming was exceptional. Every dish was prepared with care and tasted just like home-cooked food. The pricing was very reasonable too.",
      location: "Coimbatore"
    },
    {
      name: "Lakshmi Narayan",
      event: "Anniversary Celebration",
      rating: 5,
      text: "From menu planning to execution, everything was handled professionally. The team was courteous and the food quality was outstanding. Will definitely book them again for future events.",
      location: "Coimbatore"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 ${
          index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-24 bg-bg-neutral">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-8">
            What Our{' '}
            <span className="relative inline-block">
              <ScribbleUnderline variant="smooth" delay={1.8} color="#B8860B">
                <span className="text-primary">Clients Say</span>
              </ScribbleUnderline>
              {/* Hand-drawn yellow underline effect */}
              <div className="absolute -bottom-2 left-0 w-full h-4 bg-accent opacity-60 transform -rotate-1 rounded-lg"></div>
            </span>
          </h2>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto font-medium leading-relaxed">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white rounded-3xl p-10 shadow-2xl hover:shadow-3xl transition-all duration-300 relative border-2 border-primary/20 hover:border-primary/40 hover:-translate-y-2"
            >
              <div className="absolute top-6 right-6 text-accent/30">
                <Quote className="h-16 w-16" />
              </div>
              
              <div className="flex items-center mb-6">
                {renderStars(testimonial.rating)}
              </div>
              
              <p className="text-gray-700 text-xl mb-8 leading-relaxed font-medium">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-black text-gray-900 text-xl mb-1">{testimonial.name}</h4>
                  <p className="text-primary font-black text-lg">{testimonial.event}</p>
                  <p className="text-gray-600 text-lg font-medium">{testimonial.location}</p>
                </div>
                <div className="bg-gradient-to-br from-primary to-accent rounded-full p-2 shadow-xl">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-primary font-black text-2xl shadow-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action with vibrant styling */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-primary via-accent to-green rounded-3xl p-12 text-white max-w-4xl mx-auto shadow-2xl">
            <h3 className="text-4xl font-black mb-6">Ready to Create Your Own Success Story?</h3>
            <p className="text-xl mb-8 opacity-90 font-medium leading-relaxed">
              Join hundreds of satisfied customers who trust us for their special occasions
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={() => {
                  const element = document.querySelector('#contact');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white text-primary px-10 py-4 rounded-xl font-black text-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-xl"
              >
                Book Your Event
              </button>
              <a 
                href="https://wa.me/919994316559"
                target="_blank"
                rel="noopener noreferrer"
                className="border-4 border-white text-white px-10 py-4 rounded-xl font-black text-lg hover:bg-white hover:text-primary transition-all duration-300 hover:scale-105"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
