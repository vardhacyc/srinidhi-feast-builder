import { ArrowRight, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-black"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="/a3_demo.jpg"
          alt="Premium Catering"
          width="1920"
          height="1080"
          className="w-full h-full object-cover opacity-40"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black"></div>
      </div>

      {/* Subtle dot pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "radial-gradient(circle, #C9A227 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        ></div>
      </div>

      {/* Main Content - Centered with better proportions */}
      <div className="relative z-10 container mx-auto px-4 min-h-screen flex flex-col items-center justify-center text-center py-20">
        {/* Badge - smaller, above logo */}
        <div className="mb-4">
          <span
            className="text-xs md:text-sm tracking-[0.25em] uppercase font-medium"
            style={{ color: "#C9A227" }}
          >
            South India's Premium Event Caterer
          </span>
        </div>

        {/* LOGO - properly sized with glow */}
        <div className="relative mb-6">
          {/* Glow effect */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-48 h-48 md:w-56 md:h-56 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(201, 162, 39, 0.2) 0%, transparent 70%)",
              }}
            ></div>
          </div>

          {/* Logo Image */}
          <img
            src="/cateringLogo.png"
            alt="Sri Nidhi Catering Logo"
            width="192"
            height="192"
            className="relative z-10 w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 object-contain mx-auto"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            style={{
              filter: "drop-shadow(0 0 25px rgba(201, 162, 39, 0.4))",
            }}
          />
        </div>

        {/* Main Headline - tighter spacing */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-3 leading-tight">
          <span className="block">Premium Gourmet</span>
          <span
            className="block font-serif italic"
            style={{
              color: "#C9A227",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Catering Excellence
          </span>
        </h1>

        {/* Subheadline - concise */}
        <p className="text-base md:text-lg text-white/60 max-w-xl mx-auto mb-8 font-light leading-relaxed">
          Crafting unforgettable culinary experiences for over 15 years. From
          intimate gatherings to grand celebrations.
        </p>

        {/* CTAs - proportional */}
        <div className="flex flex-col sm:flex-row gap-3 mb-10">
          <Button
            onClick={() => scrollToSection("#contact")}
            size="lg"
            className="group px-8 py-6 text-sm md:text-base font-medium tracking-wide transition-all duration-500 hover:scale-105 border-0"
            style={{
              background: "#C9A227",
              color: "#0A0A0A",
            }}
          >
            <span>Book Your Event</span>
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Link to="/menu-builder">
            <Button
              variant="outline"
              size="lg"
              className="group px-8 py-6 text-sm md:text-base font-medium tracking-wide transition-all duration-500 hover:bg-white/10"
              style={{
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.3)",
                color: "white",
              }}
            >
              <Utensils className="mr-2 w-4 h-4" />
              <span>Build Your Menu</span>
            </Button>
          </Link>
        </div>

        {/* Stats Row - compact */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-16">
          {[
            { value: "100+", label: "Weddings" },
            { value: "15+", label: "Years" },
            { value: "4.9★", label: "Rating" },
            { value: "50+", label: "Team" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div
                className="text-2xl md:text-3xl font-light mb-0.5"
                style={{ color: "#C9A227" }}
              >
                {stat.value}
              </div>
              <div className="text-[10px] md:text-xs tracking-[0.15em] uppercase text-white/50">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
          <div className="w-px h-10 bg-gradient-to-b from-[#C9A227]/40 to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
