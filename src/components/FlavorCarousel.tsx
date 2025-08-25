import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const slides = [
  {
    src: '/a2.jpg',
    title: 'Signature Service',
    caption: 'Our team in action delivering premium hospitality',
    alt: 'Sri Nidhi Catering service team in action',
  },
  {
    src: '/a3_demo.jpg',
    title: 'Live Demonstration',
    caption: 'Traditional techniques with a modern touch',
    alt: 'Chef demonstrating traditional cooking techniques',
  },
  {
    src: '/a4_outdoor.jpg',
    title: 'Outdoor Excellence',
    caption: 'Beautiful outdoor setup, weather-ready',
    alt: 'Outdoor catering setup by Sri Nidhi Catering',
  },
  {
    src: '/a1_award.jpg',
    title: 'Awards & Recognition',
    caption: 'Proud moments of excellence and trust',
    alt: 'Sri Nidhi Catering award recognition',
  },
];

const FlavorCarousel: React.FC = () => {
  return (
    <section aria-labelledby="flavor-carousel-heading" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 id="flavor-carousel-heading" className="text-4xl md:text-5xl font-black text-gray-900">
            Authenticity & Flavors
          </h2>
          <p className="text-lg text-gray-700 mt-3">
            A quick look at our signature dishes and moments
          </p>
        </div>

        <div className="relative">
          <Carousel className="w-full" opts={{ align: 'start', loop: true, skipSnaps: false }}>
            <CarouselContent>
              {slides.map((s, i) => (
                <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
                  <div className="group relative overflow-hidden rounded-2xl shadow-xl border-2 border-primary/20 hover:border-primary/40 transition-all duration-300">
                    <img
                      src={s.src}
                      alt={s.alt}
                      loading="lazy"
                      decoding="async"
                      width={1280}
                      height={800}
                      className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="text-xl font-black mb-1 text-shadow-strong">{s.title}</h3>
                      <p className="text-sm opacity-90 text-shadow-medium">{s.caption}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-white/80 backdrop-blur-md border-0 shadow-lg hover:bg-white" />
            <CarouselNext className="bg-white/80 backdrop-blur-md border-0 shadow-lg hover:bg-white" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default FlavorCarousel;
