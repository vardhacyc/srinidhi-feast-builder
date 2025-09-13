import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import DiwaliHeader from '../components/diwali/DiwaliHeader';
import DiwaliHero from '../components/diwali/DiwaliHero';
import DiwaliSweetsMenu from '../components/diwali/DiwaliSweetsMenu';
import DiwaliCart from '../components/diwali/DiwaliCart';
import DiwaliFooter from '../components/diwali/DiwaliFooter';
import FlowerShower from '../components/diwali/FlowerShower';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
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
      <Helmet>
        <title>Premium Diwali Sweets Online | Sri Nidhi Coimbatore</title>
        <meta name="description" content="Order premium handcrafted Diwali sweets online from Sri Nidhi, Coimbatore. Traditional recipes, finest ingredients, India-wide delivery." />
        <meta name="keywords" content="Diwali sweets, premium Indian sweets, order sweets online, Coimbatore sweets, Diwali gifting, traditional sweets, handcrafted sweets" />
        <link rel="canonical" href="https://kovai.food/diwali" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="Premium Diwali Sweets Online | Sri Nidhi Coimbatore" />
        <meta property="og:description" content="Order premium handcrafted Diwali sweets online from Sri Nidhi, Coimbatore. Traditional recipes, finest ingredients, India-wide delivery." />
        <meta property="og:url" content="https://kovai.food/diwali" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://kovai.food/kaju-katli.png" />
        <meta property="og:site_name" content="Sri Nidhi Catering" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Premium Diwali Sweets Online | Sri Nidhi Coimbatore" />
        <meta name="twitter:description" content="Order premium handcrafted Diwali sweets online from Sri Nidhi, Coimbatore. Traditional recipes, finest ingredients, India-wide delivery." />
        <meta name="twitter:image" content="https://kovai.food/kaju-katli.png" />
        
        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Sri Nidhi Catering",
            "description": "Premium Diwali sweets and catering services in Coimbatore",
            "url": "https://kovai.food/diwali",
            "telephone": "+918760101010",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Coimbatore",
              "addressRegion": "Tamil Nadu",
              "addressCountry": "IN"
            },
            "offers": {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Product",
                "name": "Premium Diwali Sweets Collection",
                "description": "Handcrafted traditional Indian sweets for Diwali celebrations"
              }
            }
          })}
        </script>
      </Helmet>
      
      <main className="min-h-screen diwali-gradient diwali-vignette">
        {showFlowers && <FlowerShower />}
        <DiwaliHeader />
        <DiwaliHero />
        <DiwaliSweetsMenu />
        <DiwaliCart />
        <DiwaliFooter />
        <FloatingWhatsApp 
          phoneNumber="918760101010"
          message="🪔 Hi! I'm interested in your premium Diwali sweets collection. Can you help me with more information? ✨"
        />
      </main>
    </CartProvider>
  );
};

export default DiwaliIndex;