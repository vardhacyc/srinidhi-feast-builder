import React from 'react';
import { Phone, MessageCircle, MapPin, Clock, Mail } from 'lucide-react';
import { DELIVERY_CONFIG } from '../../config/deliveryConfig';

const DiwaliFooter = () => {
  return (
    <footer style={{ background: 'linear-gradient(to right, hsl(var(--diwali-dark)), hsl(var(--diwali-charcoal)))', color: 'hsl(var(--diwali-cream))' }} className="py-12">
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
                <h3 className="text-xl font-bold" style={{ color: 'hsl(var(--diwali-gold))' }}>Sri Nidhi Diwali Sweets</h3>
                <div className="text-lg" style={{ color: 'hsl(var(--diwali-light))' }}>🪔 Premium Quality 🪔</div>
              </div>
            </div>
            <p className="mb-4" style={{ color: 'hsl(var(--diwali-soft))' }}>
              Celebrating traditions with premium quality sweets, 
              handcrafted with love for your festive moments.
            </p>
            <div className="text-2xl" style={{ color: 'hsl(var(--diwali-bright))' }}>✨ Happy Diwali! ✨</div>
          </div>

          {/* Contact info */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-bold mb-4" style={{ color: 'hsl(var(--diwali-gold))' }}>Contact Us</h4>
            <div className="space-y-3">
              <a 
                href="tel:8760101010"
                className="flex items-center justify-center md:justify-start gap-2 hover:text-white"
                style={{ color: 'hsl(var(--diwali-soft))' }}
              >
                <Phone className="h-4 w-4" />
                8760101010
              </a>
              <a 
                href="mailto:srinidhicatering10@gmail.com"
                className="flex items-center justify-center md:justify-start gap-2 hover:text-white"
                style={{ color: 'hsl(var(--diwali-soft))' }}
              >
                <Mail className="h-4 w-4" />
                srinidhicatering10@gmail.com
              </a>
              <a 
                href="https://wa.me/918760101010"
                className="flex items-center justify-center md:justify-start gap-2 hover:text-white"
                style={{ color: 'hsl(var(--diwali-soft))' }}
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp: 8760101010
              </a>
              <div className="flex items-center justify-center md:justify-start gap-2" style={{ color: 'hsl(var(--diwali-soft))' }}>
                <MapPin className="h-4 w-4" />
                Coimbatore, Tamil Nadu
              </div>
            </div>
          </div>

          {/* Business hours */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-bold mb-4" style={{ color: 'hsl(var(--diwali-gold))' }}>Diwali Hours</h4>
            <div className="space-y-2" style={{ color: 'hsl(var(--diwali-soft))' }}>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Clock className="h-4 w-4" />
                Extended Hours
              </div>
              <p>Mon - Sun: 8:00 AM - 11:00 PM</p>
            </div>
          </div>

          {/* Special offers */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-bold mb-4" style={{ color: 'hsl(var(--diwali-gold))' }}>Diwali Special</h4>
            <div className="rounded-lg p-4 mb-4" style={{ background: 'hsla(var(--diwali-shadow), 0.5)' }}>
              <p className="font-bold" style={{ color: 'hsl(var(--diwali-bright))' }}>🎁 PREMIUM QUALITY</p>
              <p className="text-sm" style={{ color: 'hsl(var(--diwali-soft))' }}>Handcrafted with traditional recipes</p>
            </div>
            <div className="rounded-lg p-4" style={{ background: 'hsla(var(--diwali-shadow), 0.5)' }}>
              <p className="font-bold" style={{ color: 'hsl(var(--diwali-bright))' }}>🍯 BULK ORDERS</p>
              <p className="text-sm" style={{ color: 'hsl(var(--diwali-soft))' }}>Special rates for corporate & bulk orders</p>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-8 pt-6 text-center" style={{ borderTop: '1px solid hsl(var(--diwali-shadow))' }}>
          {/* Delivery and GST Information */}
          <div className="rounded-lg p-6 mb-6 max-w-2xl mx-auto" style={{ background: 'hsla(var(--diwali-shadow), 0.5)' }}>
            <div className="space-y-3">
              <p className="font-bold text-lg" style={{ color: 'hsl(var(--diwali-bright))' }}>
                🚚 {DELIVERY_CONFIG.messages.freeDelivery(DELIVERY_CONFIG.freeDeliveryAmount, DELIVERY_CONFIG.deliveryArea)}
              </p>
              <div className="pt-3 space-y-2" style={{ borderTop: '1px solid hsla(var(--diwali-muted), 0.5)' }}>
                <p className="text-sm" style={{ color: 'hsl(var(--diwali-soft))' }}>
                  📦 1/4 KG - 1/2 KG - 1 KG - Gift Box Available (Chargeable) | All items are subject to availability.
                </p>
                <p className="text-sm" style={{ color: 'hsl(var(--diwali-soft))' }}>
                  ₹ GST extra: {DELIVERY_CONFIG.gstRates.sweets}% on Sweets & {DELIVERY_CONFIG.gstRates.savouries}% on Savouries.
                </p>
              </div>
            </div>
          </div>
          
          <p className="mb-2" style={{ color: 'hsl(var(--diwali-soft))' }}>
            © 2025 Sri Nidhi Diwali Sweets. Continuing the legacy of premium catering services.
          </p>
          <p className="font-semibold" style={{ color: 'hsl(var(--diwali-bright))' }}>
            🪔 Wishing you a very Happy and Prosperous Diwali! 🪔
          </p>
        </div>
      </div>
    </footer>
  );
};

export default DiwaliFooter;
