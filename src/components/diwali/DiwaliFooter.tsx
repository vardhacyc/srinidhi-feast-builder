
import React from 'react';
import { Phone, MessageCircle, MapPin, Clock } from 'lucide-react';

const DiwaliFooter = () => {
  return (
    <footer className="bg-gradient-to-r from-orange-800 via-red-800 to-pink-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <div className="text-3xl">🪔</div>
              <h3 className="text-xl font-bold diwali-text-border-white">Sri Nidhi Diwali Sweets</h3>
            </div>
            <p className="text-orange-200 mb-4 diwali-text-border-light">
              Celebrating traditions with premium quality sweets, 
              handcrafted with love for your festive moments.
            </p>
            <div className="text-2xl diwali-text-border-white">✨ Happy Diwali! ✨</div>
          </div>

          {/* Contact info */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-bold mb-4 diwali-text-border-white">Contact Us</h4>
            <div className="space-y-3">
              <a 
                href="tel:9994316559"
                className="flex items-center justify-center md:justify-start gap-2 text-orange-200 hover:text-white"
              >
                <Phone className="h-4 w-4" />
                9994316559
              </a>
              <a 
                href="https://wa.me/919994316559"
                className="flex items-center justify-center md:justify-start gap-2 text-orange-200 hover:text-white"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp Orders
              </a>
              <div className="flex items-center justify-center md:justify-start gap-2 text-orange-200">
                <MapPin className="h-4 w-4" />
                Coimbatore, Tamil Nadu
              </div>
            </div>
          </div>

          {/* Business hours */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-bold mb-4 diwali-text-border-white">Diwali Hours</h4>
            <div className="space-y-2 text-orange-200">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Clock className="h-4 w-4" />
                Extended Hours
              </div>
              <p>Mon - Sun: 8:00 AM - 11:00 PM</p>
              <p className="text-yellow-300 font-semibold">
                🎇 Special Diwali Orders: 24/7 WhatsApp Support
              </p>
            </div>
          </div>

          {/* Special offers */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-bold mb-4 diwali-text-border-white">Diwali Special</h4>
            <div className="bg-white/10 rounded-lg p-4 mb-4">
              <p className="text-yellow-300 font-bold">🎁 FREE DELIVERY</p>
              <p className="text-orange-200 text-sm">On orders above ₹1000</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-yellow-300 font-bold">🍯 BULK ORDERS</p>
              <p className="text-orange-200 text-sm">Special rates for corporate & bulk orders</p>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-orange-600 mt-8 pt-6 text-center">
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
