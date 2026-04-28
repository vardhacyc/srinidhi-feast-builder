import { useState, useEffect, memo } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "CateringService",
      "name": "Sri Nidhi Catering",
      "image": "https://www.srinidhicatering.co.in/cateringLogo.png",
      "@id": "https://www.srinidhicatering.co.in/",
      "url": "https://www.srinidhicatering.co.in/",
      "telephone": "+91-87601 01010",
      "priceRange": "₹₹",
      "description": "Professional catering services for weddings, corporate events, and special occasions. Serving quality food with hygienic preparation and reliable service.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": " No. 4, Sarathi Nagar, Main Rd, Nandha Nagar, Singanallur",
        "addressLocality": "Coimbatore",
        "addressRegion": "Tamil Nadu",
        "postalCode": "641005",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "11.002077663922416",
        "longitude": "77.03944586971676"
      },
      "areaServed": {
        "@type": "Place",
        "name": "Coimbatore"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"
        ],
        "opens": "08:00",
        "closes": "21:00"
      },
      "sameAs": [
        "https://www.facebook.com/srinidhicaterin/",
        "https://www.instagram.com/srinidhicatering10?igsh=czhwdzdmandidmIy&utm_source=qr"
      ]
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Menu", href: "/menu-builder" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollToSection = (href: string) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }

    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-black/95 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <button
            onClick={() => scrollToSection("#home")}
            className="flex items-center gap-3"
          >
            <img
              src="/cateringLogo.png"
              alt="Sri Nidhi Catering"
              className="w-10 h-10 object-contain"
            />
            <div className="hidden sm:block">
              <span
                className="text-xl font-light tracking-wide text-white"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Sri Nidhi
              </span>
              <span
                className="text-xs ml-2 tracking-[0.2em] uppercase"
                style={{ color: "#C9A227" }}
              >
                Catering
              </span>
            </div>
          </button>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) =>
              link.href.startsWith("#") ? (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="text-sm font-light tracking-wide text-white/70 hover:text-[#C9A227] transition-colors duration-300"
                >
                  {link.name}
                </button>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-sm font-light tracking-wide text-white/70 hover:text-[#C9A227] transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ),
            )}

            <Link
              to="/menu-builder"
              className="text-sm font-medium tracking-wide px-4 py-2 rounded-full transition-all duration-300 hover:scale-105"
              style={{
                background: "rgba(201, 162, 39, 0.15)",
                color: "#C9A227",
                border: "1px solid rgba(201, 162, 39, 0.3)",
              }}
            >
              Build Menu
            </Link>
          </nav>

          <div className="hidden lg:flex items-center gap-6">
            <a
              href="tel:+918760101010"
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4" style={{ color: "#C9A227" }} />
              <span className="text-sm font-light">+91 87601 01010</span>
            </a>
            <Button
              onClick={() => scrollToSection("#contact")}
              className="font-medium px-6 py-5 tracking-wide transition-all duration-300 hover:scale-105 border-0"
              style={{
                background: "#C9A227",
                color: "#0A0A0A",
              }}
            >
              Book Now
            </Button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-white"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 right-0 bg-black/98 backdrop-blur-xl border-b border-white/10">
            <nav className="container mx-auto px-4 py-6">
              <div className="flex flex-col gap-4">
                {navLinks.map((link) =>
                  link.href.startsWith("#") ? (
                    <button
                      key={link.name}
                      onClick={() => scrollToSection(link.href)}
                      className="text-left py-3 text-white/70 hover:text-[#C9A227] transition-colors border-b border-white/5"
                    >
                      {link.name}
                    </button>
                  ) : (
                    <Link
                      key={link.name}
                      to={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-left py-3 text-white/70 hover:text-[#C9A227] transition-colors border-b border-white/5"
                    >
                      {link.name}
                    </Link>
                  ),
                )}

                <Link
                  to="/menu-builder"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-left py-3 font-medium transition-colors border-b border-white/5"
                  style={{ color: "#C9A227" }}
                >
                  Build Your Menu →
                </Link>

                <Button
                  onClick={() => scrollToSection("#contact")}
                  className="mt-4 py-6 font-medium tracking-wide border-0"
                  style={{
                    background: "#C9A227",
                    color: "#0A0A0A",
                  }}
                >
                  Book Now
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default memo(Header);
