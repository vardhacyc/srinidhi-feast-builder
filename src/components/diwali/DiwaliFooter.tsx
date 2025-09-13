
import React from 'react';
import { Phone, MessageCircle, MapPin, Clock, Mail } from 'lucide-react';
import { DELIVERY_CONFIG } from '../../config/deliveryConfig';

const DiwaliFooter = () => {
  return (
    <footer className="bg-gradient-to-r from-orange-800 via-red-800 to-pink-800 text-white py-12">
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
                <h3 className="text-xl font-bold">Sri Nidhi Diwali Sweets</h3>
                <div className="text-lg">🪔 Premium Quality 🪔</div>
              </div>
            </div>
            <p className="text-orange-200 mb-4">
              Celebrating traditions with premium quality sweets, 
              handcrafted with love for your festive moments.
            </p>
            <div className="text-2xl">✨ Happy Diwali! ✨</div>
          </div>

          {/* Contact info */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-bold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <a 
                href="tel:8760101010"
                className="flex items-center justify-center md:justify-start gap-2 text-orange-200 hover:text-white"
              >
                <Phone className="h-4 w-4" />
                8760101010
              </a>
              <a 
                href="mailto:yolocaterers@gmail.com"
                className="flex items-center justify-center md:justify-start gap-2 text-orange-200 hover:text-white"
              >
                <Mail className="h-4 w-4" />
                yolocaterers@gmail.com
              </a>
              <a 
                href="https://wa.me/918760101010"
                className="flex items-center justify-center md:justify-start gap-2 text-orange-200 hover:text-white"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp: 8760101010
              </a>
              <div className="flex items-center justify-center md:justify-start gap-2 text-orange-200">
                <MapPin className="h-4 w-4" />
                Coimbatore, Tamil Nadu
              </div>
            </div>
          </div>

          {/* Business hours */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-bold mb-4">Diwali Hours</h4>
            <div className="space-y-2 text-orange-200">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Clock className="h-4 w-4" />
                Extended Hours
              </div>
              <p>Mon - Sun: 8:00 AM - 11:00 PM</p>
            </div>
          </div>

          {/* Special offers */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-bold mb-4">Diwali Special</h4>
            <div className="bg-white/10 rounded-lg p-4 mb-4">
              <p className="text-yellow-300 font-bold">🎁 PREMIUM QUALITY</p>
              <p className="text-orange-200 text-sm">Handcrafted with traditional recipes</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-yellow-300 font-bold">🍯 BULK ORDERS</p>
              <p className="text-orange-200 text-sm">Special rates for corporate & bulk orders</p>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-orange-600 mt-8 pt-6 text-center">
          {/* Delivery and GST Information */}
          <div className="bg-white/10 rounded-lg p-6 mb-6 max-w-2xl mx-auto">
            <div className="space-y-3">
              <p className="text-yellow-300 font-bold text-lg">
                🚚 {DELIVERY_CONFIG.messages.freeDelivery(DELIVERY_CONFIG.freeDeliveryAmount, DELIVERY_CONFIG.deliveryArea)}
              </p>
              <div className="border-t border-orange-400/30 pt-3 space-y-2">
                <p className="text-orange-200 text-sm">
                  📦 All items are subject to availability
                </p>
                <p className="text-orange-200 text-sm">
                  💰 GST extra: {DELIVERY_CONFIG.gstRates.sweets}% on Sweets & {DELIVERY_CONFIG.gstRates.savouries}% on Savouries
                </p>
              </div>
            </div>
          </div>
          
          <p className="text-orange-200 mb-2">
            © 2024 Sri Nidhi Diwali Sweets. Continuing the legacy of premium catering services.
          </p>
          <p className="text-yellow-300 font-semibold">
            🪔 Wishing you a very Happy and Prosperous Diwali! 🪔
          </p>
        </div>
      </div>
    </footer>
  );
};

export default DiwaliFooter;
