
import { useState, useEffect } from 'react';
import DiwaliHeader from '../components/diwali/DiwaliHeader';
import DiwaliHero from '../components/diwali/DiwaliHero';
import DiwaliSweetsMenu from '../components/diwali/DiwaliSweetsMenu';
import DiwaliCart from '../components/diwali/DiwaliCart';
import DiwaliFooter from '../components/diwali/DiwaliFooter';
import FlowerShower from '../components/diwali/FlowerShower';
import WhatsAppFloat from '../components/ui/WhatsAppFloat';
import { CartProvider } from '../contexts/CartContext';

const DiwaliIndex = () => {
  const [showFlowers, setShowFlowers] = useState(true);

  useEffect(() => {
    // Hide flowers after 5 seconds
    const timer = setTimeout(() => {
      setShowFlowers(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <CartProvider>
      <div className="min-h-screen bg-gradient-to-br from-food-yellow-50 via-food-yellow-100 to-secondary">
        {showFlowers && <FlowerShower />}
        <DiwaliHeader />
        <DiwaliHero />
        <DiwaliSweetsMenu />
        <DiwaliCart />
        <DiwaliFooter />
        <WhatsAppFloat 
          phoneNumber="9994316559"
          message="🪔 Hi! I'm interested in your Diwali sweets collection. Can you help me with more information? ✨"
        />
      </div>
    </CartProvider>
  );
};

export default DiwaliIndex;
