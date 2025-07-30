
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Rajesh Kumar",
      event: "Wedding Reception",
      rating: 5,
      text: "Srinidhi Catering made our wedding reception absolutely perfect! The food was delicious and the service was impeccable. All our guests couldn't stop praising the authentic South Indian flavors.",
      location: "Coimbatore"
    },
    {
      name: "Priya Mahesh",
      event: "Corporate Event",
      rating: 5,
      text: "We've been using Srinidhi Catering for all our corporate events for the past 2 years. Their consistency in quality and timely service has never disappointed us. Highly recommended!",
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
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            What Our <span className="text-orange-600">Clients Say</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-600 to-red-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-gray-50 to-orange-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow relative"
            >
              <div className="absolute top-4 right-4 text-orange-200">
                <Quote className="h-12 w-12" />
              </div>
              
              <div className="flex items-center mb-4">
                {renderStars(testimonial.rating)}
              </div>
              
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-800 text-lg">{testimonial.name}</h4>
                  <p className="text-orange-600 font-medium">{testimonial.event}</p>
                  <p className="text-gray-600 text-sm">{testimonial.location}</p>
                </div>
                <div className="bg-white rounded-full p-4 shadow-md">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {testimonial.name.charAt(0)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 text-white max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">Ready to Create Your Own Success Story?</h3>
            <p className="text-xl mb-6 opacity-90">
              Join hundreds of satisfied customers who trust us for their special occasions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => {
                  const element = document.querySelector('#contact');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Book Your Event
              </button>
              <a 
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors"
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
