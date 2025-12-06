
import { useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import ImageShowcase from '../components/ImageShowcase';
import CelebrityShowcase from '../components/CelebrityShowcase';
import About from '../components/About';
import Services from '../components/Services';
import Gallery from '../components/Gallery';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import LoadingScreen from '../components/LoadingScreen';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && (
        <LoadingScreen onLoadComplete={() => setIsLoading(false)} />
      )}

      <div
        className={`min-h-screen transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        style={{ background: '#0A0A0A' }}
      >
        <Header />
        <Hero />
        <ImageShowcase />
        <CelebrityShowcase />
        <About />
        <Services />
        <Gallery />
        <Testimonials />
        <Contact />
        <Footer />
      </div>
    </>
  );
};

export default Index;
