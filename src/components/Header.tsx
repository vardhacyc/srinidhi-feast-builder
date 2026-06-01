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

    return () => {
      window.removeEventListener("scroll", handleScroll);
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
          element.scrollIntoView({
            behavior: "smooth",
          });
        }
      }, 100);
    } else {
      const element = document.querySelector(href);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
        });
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
          {/* Logo */}
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

          {/* Desktop Menu */}
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

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-6">
            <a
              href="tel:+918760101010"
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            >
              <Phone
                className="w-4 h-4"
                style={{ color: "#C9A227" }}
              />
              <span className="text-sm font-light">
                +91 87601 01010
              </span>
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

          {/* Mobile Toggle */}
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

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 right-0 bg-black border-b border-white/10 shadow-2xl">
            <nav
              className="container mx-auto px-5 py-6"
              style={{ background: "#000" }}
            >
              <div className="max-w-xs mx-auto">
                {/* Navigation Links */}
                <div className="flex flex-col gap-1">
                  {navLinks.map((link) =>
                    link.href.startsWith("#") ? (
                      <button
                        key={link.name}
                        onClick={() => scrollToSection(link.href)}
                        className="w-full text-left px-4 py-3 text-sm text-white/80 hover:text-[#C9A227] transition-colors duration-300 rounded-lg"
                      >
                        {link.name}
                      </button>
                    ) : (
                      <Link
                        key={link.name}
                        to={link.href}
                        onClick={() =>
                          setIsMobileMenuOpen(false)
                        }
                        className="w-full text-left px-4 py-3 text-sm text-white/80 hover:text-[#C9A227] transition-colors duration-300 rounded-lg block"
                      >
                        {link.name}
                      </Link>
                    ),
                  )}
                </div>

                {/* Divider */}
                <div className="border-t border-white/10 my-5"></div>

                {/* CTA Buttons */}
                <div className="flex flex-col gap-3">
                  <Link
                    to="/menu-builder"
                    onClick={() =>
                      setIsMobileMenuOpen(false)
                    }
                    className="w-full text-center py-3 px-4 font-medium text-sm transition-all duration-300"
                    style={{
                      background: "#C9A227",
                      color: "#0A0A0A",
                      borderRadius: "10px",
                    }}
                  >
                    Build Your Menu
                  </Link>

                  <Button
                    onClick={() => {
                      scrollToSection("#contact");
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full py-3 px-4 font-medium text-sm border-0"
                    style={{
                      background:
                        "rgba(201, 162, 39, 0.12)",
                      color: "#C9A227",
                      border:
                        "1px solid rgba(201, 162, 39, 0.3)",
                      borderRadius: "10px",
                    }}
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default memo(Header);