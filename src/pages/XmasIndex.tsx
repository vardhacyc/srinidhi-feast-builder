import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import XmasHeader from '../components/xmas/XmasHeader';
import XmasHero from '../components/xmas/XmasHero';
import XmasSweetsMenu from '../components/xmas/XmasSweetsMenu';
import XmasCart from '../components/xmas/XmasCart';
import XmasFooter from '../components/xmas/XmasFooter';
import SnowflakeShower from '../components/xmas/SnowflakeShower';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import { CartProvider } from '../contexts/CartContext';

const XmasIndex = () => {
  const [showSnowflakes, setShowSnowflakes] = useState(true);

  useEffect(() => {
    // Hide snowflakes after 5 seconds
    const timer = setTimeout(() => {
      setShowSnowflakes(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <CartProvider>
      <Helmet>
        <title>Premium Christmas & New Year Treats Online | Sri Nidhi Coimbatore</title>
        <meta name="description" content="Order premium handcrafted Christmas and New Year treats online from Sri Nidhi, Coimbatore. Traditional recipes, finest ingredients, India-wide delivery." />
        <meta name="keywords" content="Christmas treats, Christmas sweets, premium cakes, order cakes online, Coimbatore bakery, Christmas gifting, festive treats, handcrafted sweets, holiday desserts" />
        <link rel="canonical" href="https://kovai.food/xmas" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="Premium Christmas & New Year Treats Online | Sri Nidhi Coimbatore" />
        <meta property="og:description" content="Order premium handcrafted Christmas and New Year treats online from Sri Nidhi, Coimbatore. Traditional recipes, finest ingredients, India-wide delivery." />
        <meta property="og:url" content="https://kovai.food/xmas" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://kovai.food/christmas-cake.png" />
        <meta property="og:site_name" content="Sri Nidhi Catering" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Premium Christmas & New Year Treats Online | Sri Nidhi Coimbatore" />
        <meta name="twitter:description" content="Order premium handcrafted Christmas and New Year treats online from Sri Nidhi, Coimbatore. Traditional recipes, finest ingredients, India-wide delivery." />
        <meta name="twitter:image" content="https://kovai.food/christmas-cake.png" />
        
        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Sri Nidhi Catering",
            "description": "Premium Christmas and New Year treats and catering services in Coimbatore",
            "url": "https://kovai.food/xmas",
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
                "name": "Premium Christmas & New Year Treats Collection",
                "description": "Handcrafted festive treats for Christmas and New Year celebrations"
              }
            }
          })}
        </script>
      </Helmet>
      
      <main className="min-h-screen xmas-gradient xmas-vignette">
        {showSnowflakes && <SnowflakeShower />}
        <XmasHeader />
        <XmasHero />
        <XmasSweetsMenu />
        <XmasCart />
        <XmasFooter />
        <FloatingWhatsApp 
          phoneNumber="918760101010"
          message="🎄 Hi! I'm interested in your premium Christmas & New Year treats collection. Can you help me with more information? ✨"
        />
      </main>
    </CartProvider>
  );
};

export default XmasIndex;
