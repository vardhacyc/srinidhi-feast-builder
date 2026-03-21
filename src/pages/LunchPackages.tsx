import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, Star, ChefHat, Sparkles, UtensilsCrossed } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LUNCH_PACKAGES, ADD_ONS, SERVICE_CHARGES, type LunchPackage } from '@/data/lunchPackages';
import { generateLunchMenuPDF } from '@/utils/generateLunchMenuPDF';
import { useToast } from '@/hooks/use-toast';

const tierColors: Record<string, { border: string; glow: string; badge: string }> = {
  'Popular': { border: 'rgba(201, 162, 39, 0.5)', glow: 'rgba(201, 162, 39, 0.08)', badge: '#C9A227' },
  'Premium': { border: 'rgba(180, 90, 40, 0.5)', glow: 'rgba(180, 90, 40, 0.08)', badge: '#B45A28' },
  'Grand Feast': { border: 'rgba(201, 122, 25, 0.6)', glow: 'rgba(201, 122, 25, 0.1)', badge: '#C97A19' },
};

const PackageCard = ({ pkg, index }: { pkg: LunchPackage; index: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const tier = pkg.highlight ? tierColors[pkg.highlight] : null;
  const displayItems = isExpanded ? pkg.items : pkg.items.slice(0, 6);

  return (
    <div
      ref={ref}
      className="group relative rounded-2xl overflow-hidden transition-all duration-700 cursor-pointer"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transitionDelay: `${index * 80}ms`,
        background: tier ? tier.glow : 'rgba(255,255,255,0.02)',
        border: `1px solid ${tier ? tier.border : 'rgba(255,255,255,0.08)'}`,
      }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Hover glow effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(201, 162, 39, 0.06) 0%, transparent 70%)',
        }}
      />

      {/* Highlight badge */}
      {pkg.highlight && (
        <div
          className="absolute top-0 right-0 px-4 py-1.5 text-[10px] font-medium tracking-[0.15em] uppercase rounded-bl-xl"
          style={{ background: tier!.badge, color: '#0A0A0A' }}
        >
          <Star className="w-3 h-3 inline mr-1 -mt-0.5" />
          {pkg.highlight}
        </div>
      )}

      <div className="p-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-5">
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase mb-1" style={{ color: '#C9A227' }}>
              Package {index + 1}
            </p>
            <h3
              className="text-xl text-white font-light"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {pkg.name}
            </h3>
          </div>
          <div className="text-right">
            <span className="text-3xl font-light" style={{ color: '#C9A227', fontFamily: "'Playfair Display', serif" }}>
              ₹{pkg.price}
            </span>
            <p className="text-[10px] text-white/30 tracking-wide">per plate</p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px mb-4" style={{ background: 'linear-gradient(to right, rgba(201,162,39,0.4), rgba(201,162,39,0.05))' }} />

        {/* Items grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
          {displayItems.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2 py-1 transition-all duration-300"
              style={{ opacity: isVisible ? 1 : 0, transitionDelay: `${(index * 80) + (i * 30)}ms` }}
            >
              <span
                className="w-1 h-1 rounded-full flex-shrink-0"
                style={{ background: '#C9A227' }}
              />
              <span className="text-white/70 text-[13px] font-light leading-tight">{item.name}</span>
            </div>
          ))}
        </div>

        {/* Expand indicator */}
        {pkg.items.length > 6 && (
          <div className="mt-3 text-center">
            <span className="text-[11px] tracking-wide" style={{ color: '#C9A227' }}>
              {isExpanded ? '— Show less —' : `+ ${pkg.items.length - 6} more items`}
            </span>
          </div>
        )}
      </div>

      {/* Bottom accent */}
      <div
        className="h-0.5 w-0 group-hover:w-full transition-all duration-700"
        style={{ background: 'linear-gradient(to right, #C9A227, rgba(180, 90, 40, 0.6))' }}
      />
    </div>
  );
};

const LunchPackages = () => {
  const { toast } = useToast();
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHeaderVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleDownloadPDF = () => {
    generateLunchMenuPDF();
    toast({ title: 'Menu PDF downloaded!' });
  };

  return (
    <div className="min-h-screen" style={{ background: '#0A0A0A' }}>
      {/* Nav */}
      <div className="sticky top-0 z-50 bg-black/95 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" />
            <span>Home</span>
          </Link>
          <Button
            onClick={handleDownloadPDF}
            size="sm"
            className="border-0 text-sm font-light tracking-wide"
            style={{ background: '#C9A227', color: '#0A0A0A' }}
          >
            <Download className="w-3.5 h-3.5 mr-1.5" />
            Download PDF
          </Button>
        </div>
      </div>

      {/* Hero Header */}
      <section className="relative py-20 overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[120px] opacity-20"
            style={{ background: 'radial-gradient(circle, hsl(38, 95%, 55%), transparent)' }}
          />
          <div
            className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-[100px] opacity-10"
            style={{ background: 'radial-gradient(circle, hsl(15, 60%, 50%), transparent)' }}
          />
        </div>

        <div
          className="container mx-auto px-4 text-center relative z-10 transition-all duration-1000"
          style={{ opacity: headerVisible ? 1 : 0, transform: headerVisible ? 'translateY(0)' : 'translateY(30px)' }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-4 h-4" style={{ color: '#C9A227' }} />
            <span className="text-[11px] tracking-[0.3em] uppercase" style={{ color: '#C9A227' }}>
              Traditional South Indian
            </span>
            <Sparkles className="w-4 h-4" style={{ color: '#C9A227' }} />
          </div>

          <h1
            className="text-4xl md:text-6xl font-light text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Lunch{' '}
            <span className="italic" style={{ color: '#C9A227' }}>Packages</span>
          </h1>

          <p className="text-white/40 text-sm md:text-base font-light max-w-lg mx-auto mb-2">
            Authentic flavours crafted with love — from classic banana-leaf meals to grand feast spreads
          </p>

          {/* Decorative dots */}
          <div className="flex justify-center gap-1.5 mt-6">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className="w-1 h-1 rounded-full transition-all duration-500"
                style={{
                  background: '#C9A227',
                  opacity: headerVisible ? 0.3 + (i * 0.1) : 0,
                  transitionDelay: `${600 + i * 80}ms`,
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="container mx-auto px-4 pb-12">
        <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {LUNCH_PACKAGES.map((pkg, i) => (
            <PackageCard key={pkg.id} pkg={pkg} index={i} />
          ))}
        </div>
      </section>

      {/* Add-Ons & Service Charges */}
      <section className="container mx-auto px-4 pb-20 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-5">
          {/* Add-ons */}
          <div
            className="rounded-2xl p-6"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <div className="flex items-center gap-2 mb-4">
              <UtensilsCrossed className="w-4 h-4" style={{ color: '#C9A227' }} />
              <h3 className="text-sm tracking-[0.15em] uppercase" style={{ color: '#C9A227' }}>Add-Ons</h3>
            </div>
            <div className="space-y-3">
              {ADD_ONS.map(addon => (
                <div key={addon.name} className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-white/60 text-sm font-light">{addon.name}</span>
                  <span className="text-sm font-light" style={{ color: '#C9A227' }}>₹{addon.price}/-</span>
                </div>
              ))}
            </div>
          </div>

          {/* Service Charges */}
          <div
            className="rounded-2xl p-6"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <div className="flex items-center gap-2 mb-4">
              <ChefHat className="w-4 h-4" style={{ color: '#C9A227' }} />
              <h3 className="text-sm tracking-[0.15em] uppercase" style={{ color: '#C9A227' }}>Service Charges</h3>
            </div>
            <div className="space-y-3">
              {SERVICE_CHARGES.map(charge => (
                <div key={charge.name} className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-white/60 text-sm font-light">{charge.name}</span>
                  <span className="text-sm font-light" style={{ color: '#C9A227' }}>
                    {typeof charge.price === 'number' ? `₹${charge.price}/-` : charge.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Note */}
        <p className="text-center text-white/25 text-xs mt-8 font-light">
          * Mandapam charges (gas, electricity, washing water, vessel rent & cleaning) to be borne by the party.
        </p>
      </section>
    </div>
  );
};

export default LunchPackages;
