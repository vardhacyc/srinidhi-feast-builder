import { memo } from "react";
import {
  Utensils,
  Users,
  Building,
  Cake,
  PartyPopper,
  Coffee,
  ArrowRight,
} from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Utensils,
      title: "Wedding Catering",
      description: "Premium South Indian wedding feasts",
      image: "/a3_demo.jpg",
    },
    {
      icon: Building,
      title: "Corporate Events",
      description: "Professional catering solutions",
      image: "/a2.jpg",
    },
    {
      icon: Cake,
      title: "Birthday Parties",
      description: "Celebrations made delicious",
      image: "/a4_outdoor.jpg",
    },
    {
      icon: PartyPopper,
      title: "House Warming",
      description: "Traditional auspicious meals",
      image: "/a1_award.jpg",
    },
    {
      icon: Users,
      title: "Destination Weddings",
      description: "Nilgiri & hill station specialists",
      image: "/celebrity-wedding.png",
    },
    {
      icon: Coffee,
      title: "Live Counters",
      description: "Interactive cooking stations",
      image: "/a3_demo.jpg",
    },
  ];

  return (
    <section
      id="services"
      className="relative py-24 overflow-hidden bg-[#0A0A0A]"
    >
      {/* Section Header */}
      <div className="container mx-auto px-4 lg:px-8 mb-16">
        <div className="text-center">
          {/* Decorative element */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#C9A227]"></div>
            <span
              className="text-sm tracking-[0.3em] uppercase"
              style={{ color: "#C9A227" }}
            >
              Our Services
            </span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#C9A227]"></div>
          </div>

          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Our Signature{" "}
            <span className="italic" style={{ color: "#C9A227" }}>
              Services
            </span>
          </h2>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative h-80 rounded-xl overflow-hidden cursor-pointer"
            >
              {/* Background Image */}
              <img
                src={service.image}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div
                className="absolute inset-0 transition-all duration-500"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.2) 100%)",
                }}
              ></div>

              {/* Hover overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "linear-gradient(to top, rgba(201, 162, 39, 0.3) 0%, transparent 50%)",
                }}
              ></div>

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110"
                  style={{
                    background: "rgba(201, 162, 39, 0.2)",
                    border: "1px solid rgba(201, 162, 39, 0.5)",
                  }}
                >
                  <service.icon
                    className="w-5 h-5"
                    style={{ color: "#C9A227" }}
                  />
                </div>

                {/* Title */}
                <h3
                  className="text-xl font-light text-white mb-2 group-hover:text-[#C9A227] transition-colors duration-300"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-white/60 text-sm mb-4">
                  {service.description}
                </p>

                {/* Arrow */}
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                  <span
                    className="text-xs tracking-wide uppercase"
                    style={{ color: "#C9A227" }}
                  >
                    Learn More
                  </span>
                  <ArrowRight
                    className="w-4 h-4"
                    style={{ color: "#C9A227" }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(Services);
