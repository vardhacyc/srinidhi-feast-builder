import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Ramesh Kumar',
      event: 'Wedding Reception',
      image: '/a3_demo.jpg',
      rating: 5,
      comment: 'Sri Nidhi Catering made our wedding reception absolutely memorable. The food was authentic, service was impeccable.'
    },
    {
      name: 'Priya Venkatesh',
      event: 'Corporate Event',
      image: '/a2.jpg',
      rating: 5,
      comment: 'Professional service from start to finish. They handled our annual day with 500+ guests effortlessly.'
    },
    {
      name: 'Suresh Narayanan',
      event: 'House Warming',
      image: '/a4_outdoor.jpg',
      rating: 5,
      comment: 'The traditional breakfast spread was exactly what we wanted for our griha pravesham. Fresh and delicious!'
    },
    {
      name: 'Lakshmi Devi',
      event: 'Birthday Party',
      image: '/a1_award.jpg',
      rating: 5,
      comment: 'The live dosa counter was a hit! Everyone loved the variety and quality of food.'
    }
  ];

  return (
    <section id="testimonials" className="relative py-24 overflow-hidden bg-black">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#C9A227]"></div>
            <span className="text-sm tracking-[0.3em] uppercase" style={{ color: '#C9A227' }}>
              Testimonials
            </span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#C9A227]"></div>
          </div>

          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Client{' '}
            <span className="italic" style={{ color: '#C9A227' }}>Love</span>
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative p-8 rounded-2xl transition-all duration-300 hover:border-[#C9A227]/50 group"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.1)'
              }}
            >
              {/* Quote icon */}
              <Quote
                className="absolute top-8 right-8 w-10 h-10 opacity-10"
                style={{ color: '#C9A227' }}
              />

              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#C9A227]" style={{ color: '#C9A227' }} />
                ))}
              </div>

              {/* Comment */}
              <p className="text-white/70 leading-relaxed mb-8 text-lg font-light">
                "{testimonial.comment}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover border-2"
                  style={{ borderColor: 'rgba(201, 162, 39, 0.3)' }}
                />
                <div>
                  <h4 className="text-white font-medium">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm" style={{ color: '#C9A227' }}>
                    {testimonial.event}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
