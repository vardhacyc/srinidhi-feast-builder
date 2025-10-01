
import Header from '../components/Header';
import Hero from '../components/Hero';
import ImageShowcase from '../components/ImageShowcase';
import About from '../components/About';
import Services from '../components/Services';
import Menu from '../components/Menu';
import MenuCalculator from '../components/MenuCalculator';
import Gallery from '../components/Gallery';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 25%, #d97706 50%, #b45309 75%, #92400e 100%)'
    }}>
      <Header />
      <Hero />
      <ImageShowcase />
      <About />
      <Services />
      <Menu />
      <MenuCalculator />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
