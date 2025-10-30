import React from 'react';
import { Phone, MessageCircle, MapPin, Clock, Mail } from 'lucide-react';
import { DELIVERY_CONFIG } from '../../config/deliveryConfig';

const XmasFooter = () => {
  return (
    <footer style={{ background: 'linear-gradient(to right, hsl(var(--xmas-dark)), hsl(var(--xmas-dark-green)))', color: 'hsl(var(--xmas-cream))' }} className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              {/* High-clarity logo matching main page - forced cache refresh */}
              <img 
                src="/cateringLogo.png?v=2024" 
                alt="Sri Nidhi Catering Logo" 
                className="h-16 w-16 object-contain logo-hover cursor-pointer"
              />
              <div>
                <h3 className="text-xl font-bold" style={{ color: 'hsl(var(--xmas-gold))' }}>Sri Nidhi Christmas Treats</h3>
                <div className="text-lg" style={{ color: 'hsl(var(--xmas-white))' }}>🎄 Premium Quality 🎄</div>
              </div>
            </div>
            <p className="mb-4" style={{ color: 'hsl(var(--xmas-cream))' }}>
              Celebrating traditions with premium quality treats, 
              handcrafted with love for your festive moments.
            </p>
            <div className="text-2xl" style={{ color: 'hsl(var(--xmas-gold))' }}>✨ Merry Christmas! ✨</div>
          </div>

          {/* Contact info */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-bold mb-4" style={{ color: 'hsl(var(--xmas-gold))' }}>Contact Us</h4>
            <div className="space-y-3">
              <a 
                href="tel:8760101010"
                className="flex items-center justify-center md:justify-start gap-2 hover:text-white"
                style={{ color: 'hsl(var(--xmas-cream))' }}
              >
                <Phone className="h-4 w-4" />
                8760101010
              </a>
              <a 
                href="mailto:srinidhicatering10@gmail.com"
                className="flex items-center justify-center md:justify-start gap-2 hover:text-white"
                style={{ color: 'hsl(var(--xmas-cream))' }}
              >
                <Mail className="h-4 w-4" />
                srinidhicatering10@gmail.com
              </a>
              <a 
                href="https://wa.me/918760101010"
                className="flex items-center justify-center md:justify-start gap-2 hover:text-white"
                style={{ color: 'hsl(var(--xmas-cream))' }}
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp: 8760101010
              </a>
              <div className="flex items-center justify-center md:justify-start gap-2" style={{ color: 'hsl(var(--xmas-cream))' }}>
                <MapPin className="h-4 w-4" />
                Coimbatore, Tamil Nadu
              </div>
            </div>
          </div>

          {/* Business hours */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-bold mb-4" style={{ color: 'hsl(var(--xmas-gold))' }}>Holiday Hours</h4>
            <div className="space-y-2" style={{ color: 'hsl(var(--xmas-cream))' }}>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Clock className="h-4 w-4" />
                Extended Hours
              </div>
              <p>Mon - Sun: 8:00 AM - 11:00 PM</p>
            </div>
          </div>

          {/* Special offers */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-bold mb-4" style={{ color: 'hsl(var(--xmas-gold))' }}>Christmas Special</h4>
            <div className="rounded-lg p-4 mb-4" style={{ background: 'hsla(var(--xmas-shadow), 0.5)' }}>
              <p className="font-bold" style={{ color: 'hsl(var(--xmas-gold))' }}>🎁 PREMIUM QUALITY</p>
              <p className="text-sm" style={{ color: 'hsl(var(--xmas-cream))' }}>Handcrafted with traditional recipes</p>
            </div>
            <div className="rounded-lg p-4" style={{ background: 'hsla(var(--xmas-shadow), 0.5)' }}>
              <p className="font-bold" style={{ color: 'hsl(var(--xmas-gold))' }}>📦 BULK ORDERS</p>
              <p className="text-sm" style={{ color: 'hsl(var(--xmas-cream))' }}>Special rates for corporate & bulk orders</p>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-8 pt-6 text-center" style={{ borderTop: '1px solid hsl(var(--xmas-shadow))' }}>
          {/* Delivery and GST Information */}
          <div className="rounded-lg p-6 mb-6 max-w-2xl mx-auto" style={{ background: 'hsla(var(--xmas-shadow), 0.5)' }}>
            <div className="space-y-3">
              <p className="font-bold text-lg" style={{ color: 'hsl(var(--xmas-gold))' }}>
                🚚 {DELIVERY_CONFIG.messages.freeDelivery(DELIVERY_CONFIG.freeDeliveryAmount, DELIVERY_CONFIG.deliveryArea)}
              </p>
              <div className="pt-3 space-y-2" style={{ borderTop: '1px solid hsla(var(--xmas-muted), 0.5)' }}>
                <p className="text-sm" style={{ color: 'hsl(var(--xmas-cream))' }}>
                  📦 All items are subject to availability
                </p>
                <p className="text-sm" style={{ color: 'hsl(var(--xmas-cream))' }}>
                  💰 GST extra: {DELIVERY_CONFIG.gstRates.sweets}% on Sweets & {DELIVERY_CONFIG.gstRates.savouries}% on Savouries
                </p>
              </div>
            </div>
          </div>
          
          <p className="mb-2" style={{ color: 'hsl(var(--xmas-cream))' }}>
            © 2024 Sri Nidhi Christmas Treats. Continuing the legacy of premium catering services.
          </p>
          <p className="font-semibold" style={{ color: 'hsl(var(--xmas-gold))' }}>
            🎄 Wishing you a very Merry Christmas and Happy New Year! 🎄
          </p>
        </div>
      </div>
    </footer>
  );
};

export default XmasFooter;
