import React from 'react';
import { Phone, Send, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

// A simple flower SVG to be used as a decorative element
const FloralMotif = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 5.2c1.5-2.4 4.5-3.2 6.8-1.8 2.4 1.5 3.2 4.5 1.8 6.8L12 22l-8.6-11.8C1.9 7.8 2.8 4.8 5.2 3.3c2.3-1.4 5.3-0.6 6.8 1.9z" />
    <path d="M12 5.2C10.5 2.8 7.5 2 5.2 3.3 2.8 4.8 2 7.8 3.4 10.2" />
    <path d="M12 5.2c1.5 2.4 4.5 3.2 6.8 1.8" />
    <path d="M12 22l8.6-11.8c1.4-2.3.6-5.3-1.8-6.8-2.3-1.4-5.3-.6-6.8 1.9" />
    <path d="M3.4 10.2L12 22" />
  </svg>
);

export default function DiwaliContactPage() {
  const handleWhatsAppInquiry = () => {
    const message = `Hi! I'd like to inquire about the Sri Nidhi Premium Diwali Sweets.`;
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      {/* Page container with background */}
      <div className="diwali-contact-bg min-h-screen w-full flex items-center justify-center p-4 font-sans">
        {/* Background elements */}
        <div className="diwali-lights-top"></div>
        <div className="diwali-rangoli-left"></div>
        <div className="diwali-rangoli-right"></div>
        <div className="diwali-diyas-bottom"></div>
        
        {/* Sparkling particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <Sparkles
            key={i}
            className="absolute text-yellow-300/80 animate-twinkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 12 + 4}px`,
              height: `${Math.random() * 12 + 4}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 4 + 3}s`,
            }}
          />
        ))}

        {/* Glassmorphic Card */}
        <div
          className="glass-card relative w-full max-w-lg rounded-3xl p-8 md:p-12 shadow-2xl animate-fade-in-up"
        >
          {/* Decorative Motifs */}
          <FloralMotif className="absolute top-6 left-6 w-6 h-6 text-white/30" />
          <FloralMotif className="absolute top-6 right-6 w-6 h-6 text-white/30" />
          <FloralMotif className="absolute bottom-6 left-6 w-6 h-6 text-white/30" />
          <FloralMotif className="absolute bottom-6 right-6 w-6 h-6 text-white/30" />

          {/* Card Content */}
          <div className="text-center">
            <h1 className="contact-heading font-serif text-4xl md:text-5xl font-bold mb-8">
              Contact Us
            </h1>
          </div>

          <form className="space-y-6">
            <Input
              type="text"
              placeholder="Name"
              className="glass-input"
            />
            <Input
              type="email"
              placeholder="Email"
              className="glass-input"
            />
            <Textarea
              placeholder="Message"
              className="glass-input min-h-[100px]"
            />
            <Button
              type="submit"
              className="w-full send-button font-bold text-lg py-6 rounded-full"
            >
              Send
            </Button>
          </form>

          <div className="mt-8 text-center">
            <Button
              onClick={handleWhatsAppInquiry}
              variant="outline"
              className="call-button group"
            >
              <Phone className="w-5 h-5 mr-3 transition-transform group-hover:scale-110" />
              Call: +91 98765 43210
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
