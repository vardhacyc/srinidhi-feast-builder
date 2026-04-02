import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Menu", href: "#menu" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ];

  const services = [
    "Wedding Catering",
    "Corporate Events",
    "Birthday Parties",
    "House Warming",
    "Destination Weddings",
    "Live Counters",
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-black border-t border-white/10">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/cateringLogo.png"
                alt="Sri Nidhi Catering"
                width="40"
                height="40"
                loading="lazy"
                className="w-10 h-10 object-contain"
              />
              <div>
                <span
                  className="block text-xl font-light text-white"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Sri Nidhi
                </span>
                <span
                  className="text-xs tracking-[0.2em] uppercase"
                  style={{ color: "#C9A227" }}
                >
                  Catering
                </span>
              </div>
            </div>
            <p className="text-white/50 mb-6 leading-relaxed text-sm">
              Elevating your events with exceptional gourmet cuisine and
              impeccable service since 2008.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/share/1HhCqdiL7f/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:bg-[#C9A227]/20"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                <Facebook className="w-4 h-4 text-white/70" />
              </a>
              <a
                href="https://www.instagram.com/srinidhicatering10?igsh=czhwdzdmandidmIy&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:bg-[#C9A227]/20"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                <Instagram className="w-4 h-4 text-white/70" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-medium mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-white/50 hover:text-[#C9A227] transition-colors text-left text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-medium mb-6">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index} className="text-white/50 text-sm">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-medium mb-6">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone
                  className="w-4 h-4 mt-0.5"
                  style={{ color: "#C9A227" }}
                />
                <div>
                  <a
                    href="tel:+918760101010"
                    className="block text-white/70 text-sm hover:text-[#C9A227] transition-colors"
                  >
                    +91 87601 01010
                  </a>
                  <a
                    href="tel:+919994316559"
                    className="block text-white/50 text-sm hover:text-[#C9A227] transition-colors"
                  >
                    +91 9994316559
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-0.5" style={{ color: "#C9A227" }} />
                <a
                  href="mailto:srinidhicatering10@gmail.com"
                  className="text-white/50 text-sm hover:text-[#C9A227] transition-colors"
                >
                  srinidhicatering10@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin
                  className="w-4 h-4 mt-0.5"
                  style={{ color: "#C9A227" }}
                />
                <p className="text-white/50 text-sm">
                  4, Sarathi Nagar, Main Rd,
                  <br />
                   Nandha Nagar, Singanallur, 
                   <br />
                  Coimbatore, Tamil Nadu - 641005. 
                    <br />
                    
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm">
              © {currentYear} Sri Nidhi Catering. All rights reserved.
            </p>
            <p className="text-white/40 text-sm">
              Website by{" "}
              <a
                href="https://www.berk-carp.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C9A227] hover:text-white transition-colors"
              >
                berk-carp.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
