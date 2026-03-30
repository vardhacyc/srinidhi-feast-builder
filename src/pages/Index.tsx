import { useState, useEffect, lazy, Suspense, memo } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import LoadingScreen from "../components/LoadingScreen";

// Lazy load below-the-fold components for faster mobile initial load
// These are loaded only when needed, reducing initial bundle size
const ImageShowcase = lazy(() => import("../components/ImageShowcase"));
const CelebrityShowcase = lazy(() => import("../components/CelebrityShowcase"));
const About = lazy(() => import("../components/About"));
const Services = lazy(() => import("../components/Services"));
const Gallery = lazy(() => import("../components/Gallery"));
const Testimonials = lazy(() => import("../components/Testimonials"));
const Contact = lazy(() => import("../components/Contact"));
const Footer = lazy(() => import("../components/Footer"));

// Memoized loading fallback for below-the-fold content
// Mobile-only: Show minimal skeleton to reduce layout shift
const MobileSectionLoader = () => (
  <div className="animate-pulse py-16 bg-black">
    <div className="container mx-auto px-4">
      <div className="h-8 bg-white/10 rounded w-1/3 mx-auto mb-8"></div>
      <div className="grid grid-cols-2 gap-4">
        <div className="aspect-square bg-white/5 rounded-lg"></div>
        <div className="aspect-square bg-white/5 rounded-lg"></div>
      </div>
    </div>
  </div>
);

// Desktop section loader (more elaborate)
const DesktopSectionLoader = () => (
  <div className="animate-pulse py-24 bg-black">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="h-12 bg-white/10 rounded w-1/3 mx-auto mb-12"></div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-80 bg-white/5 rounded-xl"></div>
        ))}
      </div>
    </div>
  </div>
);

// Detect if mobile for conditional loading
const isMobile = () => typeof window !== "undefined" && window.innerWidth < 768;

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [shouldLoadDeferred, setShouldLoadDeferred] = useState(false);

  // Mobile performance: Load below-the-fold content after first interaction or idle
  // This reduces initial bundle and improves LCP
  useEffect(() => {
    // Check if mobile
    if (isMobile()) {
      // For mobile: wait for initial interaction or timeout
      const handleInteraction = () => {
        setShouldLoadDeferred(true);
        cleanup();
      };

      const cleanup = () => {
        window.removeEventListener("scroll", handleInteraction);
        window.removeEventListener("touchstart", handleInteraction);
        window.removeEventListener("click", handleInteraction);
      };

      // Set up listeners
      window.addEventListener("scroll", handleInteraction, {
        once: true,
        passive: true,
      });
      window.addEventListener("touchstart", handleInteraction, { once: true });
      window.addEventListener("click", handleInteraction, { once: true });

      // Also load after a timeout (idle time)
      const timeoutId = setTimeout(() => {
        setShouldLoadDeferred(true);
        cleanup();
      }, 2000); // 2 seconds - reasonable time for LCP to complete

      return () => {
        cleanup();
        clearTimeout(timeoutId);
      };
    } else {
      // Desktop: load everything immediately
      setShouldLoadDeferred(true);
    }
  }, []);

  return (
    <>
      {isLoading && (
        <LoadingScreen onLoadComplete={() => setIsLoading(false)} />
      )}

      <div
        className={`min-h-screen transition-opacity duration-500 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        style={{ background: "#0A0A0A" }}
      >
        <Header />
        <Hero />

        {/* Below-the-fold content: lazy loaded with mobile optimization */}
        {shouldLoadDeferred ? (
          <Suspense
            fallback={
              isMobile() ? <MobileSectionLoader /> : <DesktopSectionLoader />
            }
          >
            <ImageShowcase />
            <CelebrityShowcase />
            <About />
            <Services />
            <Gallery />
            <Testimonials />
            <Contact />
            <Footer />
          </Suspense>
        ) : (
          // Mobile: Show minimal placeholder until deferred content loads
          <div className="hidden lg:block">
            <Suspense fallback={<DesktopSectionLoader />}>
              <ImageShowcase />
              <CelebrityShowcase />
              <About />
              <Services />
              <Gallery />
              <Testimonials />
              <Contact />
              <Footer />
            </Suspense>
          </div>
        )}
      </div>
    </>
  );
};

// Memoize the Index component to prevent unnecessary re-renders
export default memo(Index);
