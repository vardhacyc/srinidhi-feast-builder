import React, { useState } from 'react';
import SmartImage from '@/components/SmartImage';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Star, Phone, Crown, ShoppingCart, Plus, Minus, X, ArrowRight, 
  Leaf, Users, Award
} from 'lucide-react';
import { DELIVERY_CONFIG } from '@/config/deliveryConfig';

interface DiwaliSweet {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  specialty: string;
  premium: boolean;
  stockLeft: number;
  rating: number;
  category: string;
  tastingNotes: string[];
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  type: 'sweet' | 'giftbox';
}

const sweetItems: DiwaliSweet[] = [
  {
    id: "gulab-jamun",
    name: "Premium Gulab Jamun",
    description: "Soft milk dumplings soaked in aromatic cardamom syrup",
    price: 449,
    originalPrice: 549,
    image: "gulab-jamun",
    specialty: "Bestseller • Made with Pure Khoya",
    premium: true,
    stockLeft: 8,
    rating: 4.9,
    category: "Syrup Based",
    tastingNotes: ["Rich cardamom aroma", "Melt-in-mouth texture", "Perfect sweetness balance"]
  },
  {
    id: "kaju-katli",
    name: "Royal Kaju Katli",
    description: "Premium cashew fudge with edible silver leaf",
    price: 849,
    originalPrice: 999,
    image: "kaju-katli",
    specialty: "Premium Collection • Hand-cut Diamond Shapes",
    premium: true,
    stockLeft: 5,
    rating: 4.9,
    category: "Dry Sweets",
    tastingNotes: ["Pure cashew flavor", "Silky smooth texture", "Delicate sweetness"]
  },
  {
    id: "motichoor-ladoo",
    name: "Traditional Motichoor Ladoo",
    description: "Fine gram flour pearls bound with ghee and aromatic spices",
    price: 389,
    originalPrice: 449,
    image: "motichoor-ladoo",
    specialty: "Festival Special • Handmade",
    premium: false,
    stockLeft: 12,
    rating: 4.8,
    category: "Traditional",
    tastingNotes: ["Nutty gram flour", "Rich ghee finish", "Perfectly spiced"]
  },
  {
    id: "badusha",
    name: "Crispy Badusha",
    description: "Flaky pastry rings soaked in aromatic sugar syrup",
    price: 329,
    originalPrice: 389,
    image: "badusha",
    specialty: "Crispy Delight • Multi-layered",
    premium: false,
    stockLeft: 18,
    rating: 4.7,
    category: "Syrup Based",
    tastingNotes: ["Buttery layers", "Sweet syrup absorption", "Perfect crunch"]
  },
  {
    id: "rasgulla",
    name: "Bengali Rasgulla",
    description: "Spongy cottage cheese balls in light sugar syrup",
    price: 299,
    originalPrice: 349,
    image: "rasgulla",
    specialty: "Authentic Bengali • Fresh Daily",
    premium: false,
    stockLeft: 20,
    rating: 4.6,
    category: "Syrup Based",
    tastingNotes: ["Light & spongy", "Mild sweetness", "Fresh dairy taste"]
  },
  {
    id: "mysore-pak",
    name: "Authentic Mysore Pak",
    description: "Rich ghee-based sweet with perfect texture and taste",
    price: 499,
    originalPrice: 579,
    image: "mysore-pak",
    specialty: "South Indian Classic • Ghee Rich",
    premium: true,
    stockLeft: 10,
    rating: 4.8,
    category: "Traditional",
    tastingNotes: ["Pure ghee aroma", "Melt-in-mouth", "Rich & indulgent"]
  },
  {
    id: "coconut-barfi",
    name: "Coconut Barfi",
    description: "Pure coconut sweet with cardamom and nuts",
    price: 379,
    originalPrice: 429,
    image: "coconut-barfi",
    specialty: "Fresh Coconut • No Artificial Colors",
    premium: false,
    stockLeft: 15,
    rating: 4.7,
    category: "Dry Sweets",
    tastingNotes: ["Fresh coconut", "Mild cardamom", "Nutty crunch"]
  },
  {
    id: "rasmalai",
    name: "Rasmalai",
    description: "Soft cottage cheese dumplings in sweetened milk",
    price: 549,
    originalPrice: 649,
    image: "rasmalai",
    specialty: "Premium Dessert • Saffron Infused",
    premium: true,
    stockLeft: 7,
    rating: 4.9,
    category: "Syrup Based",
    tastingNotes: ["Creamy milk", "Saffron notes", "Delicate texture"]
  },
  {
    id: "soan-papdi",
    name: "Soan Papdi",
    description: "Flaky, crispy sweet with ghee and cardamom",
    price: 299,
    originalPrice: 349,
    image: "soan-papdi",
    specialty: "Traditional Recipe • Extra Flaky",
    premium: false,
    stockLeft: 25,
    rating: 4.6,
    category: "Dry Sweets",
    tastingNotes: ["Crispy texture", "Ghee richness", "Cardamom flavor"]
  }
];

const categories = ["All", "Premium", "Traditional", "Syrup Based", "Dry Sweets"];

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Chennai",
    rating: 5,
    text: "The best Diwali sweets I've ever tasted! The quality is exceptional and delivery was perfect.",
    item: "Premium Collection Box"
  },
  {
    name: "Rajesh Kumar",
    location: "Bangalore",
    rating: 5,
    text: "Ordered for our office Diwali celebration. Everyone loved the authentic taste and presentation.",
    item: "Corporate Bulk Order"
  },
  {
    name: "Meera Patel",
    location: "Hyderabad",
    rating: 5,
    text: "Sri Nidhi never disappoints! Fresh, delicious, and beautifully packaged. Highly recommended!",
    item: "Royal Gift Box"
  }
];

export default function Diwali() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [hoveredSweet, setHoveredSweet] = useState<string | null>(null);
  
  const totalCustomers = 2847;
  const customerCount = 9847;

  // Helper function to calculate price with GST
  const calculatePriceWithGST = (basePrice: number) => {
    const gstRate = DELIVERY_CONFIG.gstRates.sweets; // All items in this collection are sweets
    const gstAmount = (basePrice * gstRate) / 100;
    return {
      basePrice,
      gstRate,
      gstAmount: Math.round(gstAmount),
      finalPrice: Math.round(basePrice + gstAmount)
    };
  };

  const filteredSweets = sweetItems.filter(sweet => 
    selectedCategory === "All" || 
    (selectedCategory === "Premium" && sweet.premium) ||
    sweet.category === selectedCategory
  );

  const addToCart = (item: DiwaliSweet) => {
    setCart(prev => {
      const existing = prev.find(cartItem => cartItem.id === item.id);
      if (existing) {
        return prev.map(cartItem => 
          cartItem.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { 
        id: item.id, 
        name: item.name, 
        price: item.price, 
        quantity: 1, 
        type: 'sweet'
      }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleOrderWhatsApp = (sweetName: string) => {
    const message = `Hi! I'd like to order ${sweetName} from Sri Nidhi Diwali Collection. Please confirm availability and delivery details.`;
    const whatsappUrl = `https://wa.me/918760101010?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleWhatsAppOrder = () => {
    if (cart.length === 0) return;
    
    const orderDetails = cart.map(item => 
      `${item.name} x${item.quantity} = ₹${item.price * item.quantity}`
    ).join('\n');
    
    const message = `🎊 *Sri Nidhi Diwali Order* 🎊\n\n${orderDetails}\n\n*Total: ₹${cartTotal}*\n\nPlease confirm availability and delivery time for this Diwali order. Thank you!`;
    
    const whatsappUrl = `https://wa.me/918760101010?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      {/* Local styles for sheen, noise, gloss enhancements */}
      <style>{`
        @keyframes heroSheen {0%{transform:translateX(-100%) skewX(-15deg);}60%{transform:translateX(120%) skewX(-15deg);}100%{transform:translateX(120%) skewX(-15deg);} }
        @keyframes slowPulseGlow {0%,100%{box-shadow:0 8px 28px -12px #b0790026,0 0 0 1px #00000012;}50%{box-shadow:0 10px 34px -10px #b0790040,0 0 0 1px #00000020;}}
        .hero-bar {position:relative;}
        .hero-bar:after {content:"";position:absolute;inset:0;pointer-events:none;background:linear-gradient(180deg,rgba(255,255,255,.55),rgba(255,255,255,0) 55%);mix-blend:soft-light;}
        .hero-bar:before {content:"";position:absolute;top:0;left:-30%;width:35%;height:100%;background:linear-gradient(100deg,rgba(255,255,255,0),rgba(255,255,255,.85) 45%,rgba(255,255,255,0) 70%);filter:blur(2px);animation:heroSheen 5.5s ease-in-out 1.2s infinite;}
        .noise-overlay {background:repeating-linear-gradient(45deg,rgba(0,0,0,0.03) 0 4px,rgba(0,0,0,0.015) 4px 8px);mix-blend:multiply;}
        .texture-vignette {background:radial-gradient(circle at 50% 35%,rgba(255,228,90,0.35),rgba(255,228,90,0) 60%),radial-gradient(circle at 50% 120%,rgba(176,118,0,0.55),rgba(34,26,0,0.9));}
        .card-premium {transition:transform .55s cubic-bezier(.19,1,.22,1), box-shadow .55s; position:relative;}
        .card-premium:before {content:"";position:absolute;inset:0;border:1px solid rgba(255,255,255,0.42);border-radius:inherit;pointer-events:none;mix-blend:overlay;}
        .card-premium:after {content:"";position:absolute;top:0;left:0;right:0;height:20%;background:linear-gradient(180deg,rgba(255,255,255,.65),rgba(255,255,255,0));opacity:.85;pointer-events:none;}
        .card-premium:hover {transform:translateY(-6px);box-shadow:0 18px 40px -18px rgba(0,0,0,0.55),0 6px 14px -6px rgba(176,118,0,0.45);} 
        .cta-btn {transition:transform .5s, box-shadow .5s;}
        .cta-btn:hover {transform:translateY(-3px);box-shadow:0 10px 26px -8px rgba(0,0,0,.45),inset 0 2px 4px rgba(255,255,255,.55);} 
        .cta-btn:active {transform:translateY(-1px);box-shadow:0 6px 18px -6px rgba(0,0,0,.55),inset 0 1px 3px rgba(255,255,255,.5);} 
        .stat-box {backdrop-filter:blur(4px);} 
      `}</style>
      <div className="min-h-screen relative overflow-hidden" style={{ background:'#1a1608' }}>
        {/* Layered background */}
        <div className="absolute inset-0 texture-vignette opacity-[0.85]" />
        <div className="absolute inset-0" style={{background:'radial-gradient(circle at 22% 28%,#FFFBE6 0%,#FFF3B3 34%,#FFE45A 58%,#F2C200 78%,#2a2100 92%)'}} />
        <div className="absolute inset-0 noise-overlay opacity-[0.12] mix-blend-multiply" />
        <div className="absolute inset-0 pointer-events-none" style={{background:'linear-gradient(to bottom,rgba(255,255,210,.55),rgba(255,255,210,0) 45%)'}} />
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center">
          {/* Reduced, deeper particles */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({length:6}).map((_,i)=> (
              <span key={i} className="absolute rounded-full" style={{
                top:`${18+Math.random()*60}%`,
                left:`${8+Math.random()*78}%`,
                width:`${14+Math.random()*26}px`,
                height:`${14+Math.random()*26}px`,
                background:'radial-gradient(circle at 30% 30%,#FFF9C8,#FFE45A 55%,#B07600 92%)',
                opacity:0.18 + Math.random()*0.25,
                filter:'blur(1.2px)',
                animation:`float ${6+Math.random()*6}s ease-in-out ${Math.random()*2}s infinite`
              }} />
            ))}
          </div>
          <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
            {/* Header Badge refined */}
            <div className="inline-flex items-center gap-2 mb-10 px-8 py-2.5 rounded-full border border-black/30 shadow-[0_4px_16px_-6px_rgba(0,0,0,.6)] bg-[linear-gradient(145deg,#2a2100,#3b2e08)] relative overflow-hidden">
              <span className="absolute inset-0 opacity-60" style={{background:'linear-gradient(145deg,#FFE45A22,#F2C20011)'}} />
              <span className="w-2.5 h-2.5 rounded-full" style={{background:'radial-gradient(circle at 30% 30%,#FFE45A,#F2C200 60%,#B07600)'}} />
              <span className="text-[10px] tracking-[0.28em] font-semibold text-[#FFEFA8] drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">FRESH • HANDCRAFTED</span>
            </div>
            {/* Hero Bar & Heading */}
            <h1 className="mb-10 leading-[1.04]">
              <span className="sr-only">Festive Sweet Collection</span>
              <span aria-hidden className="hero-bar block mx-auto max-w-4xl h-[90px] md:h-[120px] rounded-[64px] shadow-[0_10px_26px_-10px_rgba(0,0,0,.75),0_2px_4px_-1px_rgba(0,0,0,.55)] relative overflow-hidden" style={{background:'linear-gradient(110deg,#2a2100,#3d3008 12%,#6d5605 28%,#FFE45A 48%,#F8D22A 56%,#C18A05 70%,#3d3008 88%,#2a2100)'}} />
              <span className="block text-[clamp(2.3rem,5.2vw,4.2rem)] font-extrabold mt-8 tracking-tight" style={{background:'linear-gradient(90deg,#FFF9D4,#FFE148 38%,#B07600 78%)',WebkitBackgroundClip:'text',color:'transparent',textShadow:'0 3px 14px rgba(0,0,0,0.4)'}}>Festive Sweet Collection</span>
            </h1>
            <p className="max-w-3xl mx-auto text-lg md:text-[1.35rem] font-medium leading-relaxed mb-12" style={{color:'#3f3f3f'}}>Pure yellow spectrum. Heightened gloss. Deep flavour minimalism.</p>
            <Button onClick={()=>document.getElementById('collection')?.scrollIntoView({behavior:'smooth'})} className="cta-btn group relative px-16 py-5 rounded-full font-semibold text-[#1d1604] focus-visible:outline-none" style={{background:'linear-gradient(140deg,#FFF8D2,#FFE148 42%,#F5C800 70%,#B07600 100%)'}}>
              <span className="flex items-center text-lg tracking-wide">Explore Collection <ArrowRight className="w-5 h-5 ml-3 transition-transform group-hover:translate-x-1" /></span>
              <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 group-hover:opacity-90 transition-opacity duration-700" style={{background:'radial-gradient(circle at 32% 28%,rgba(255,255,255,.8),rgba(255,255,255,0) 60%)'}} />
            </Button>
            {/* Stats */}
            <div className="mt-20 grid grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                {label:'Customers',value: totalCustomers.toLocaleString()+"+"},
                {label:'Taste',value:'4.9★'},
                {label:'Fresh',value:'Same Day'}
              ].map((i,idx)=>(
                <div key={idx} className="stat-box relative p-7 rounded-3xl border border-black/30 bg-[linear-gradient(150deg,#2a2100,#3b2e08)] shadow-[0_10px_26px_-12px_rgba(0,0,0,0.8)] overflow-hidden">
                  <div className="absolute inset-0 opacity-[0.18]" style={{background:'radial-gradient(circle at 62% 32%,#FFE45A,#B07600)'}} />
                  <div className="text-3xl md:text-4xl font-black tracking-tight mb-1" style={{background:'linear-gradient(90deg,#FFEFA8,#FFE148 40%,#B07600)',WebkitBackgroundClip:'text',color:'transparent'}}>{i.value}</div>
                  <div className="text-[10px] font-medium tracking-[0.25em] uppercase text-[#bfa76d]">{i.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Collection */}
        <section id="collection" className="py-28 px-6 relative">
          <div className="absolute inset-0 opacity-[0.45]" style={{background:'radial-gradient(circle at 60% 18%,#F2C20022,#B0760000 65%)'}} />
          <div className="max-w-7xl mx-auto relative">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-extrabold mb-7" style={{background:'linear-gradient(90deg,#FFF9D4,#FFE148 42%,#B07600 80%)',WebkitBackgroundClip:'text',color:'transparent'}}>Signature Yellows</h2>
              <p className="text-base md:text-lg font-medium" style={{color:'#45423c'}}>Curated single‑palette sweets – texture & sheen define hierarchy.</p>
            </div>
            {/* Category Filter */}
            <div className="flex justify-center mb-16">
              <div className="inline-flex rounded-full p-2 bg-[linear-gradient(120deg,#2a2100,#3b2e08)] border border-black/40 shadow-[0_6px_20px_-8px_rgba(0,0,0,0.75)] gap-1">
                {categories.map(cat => (
                  <button key={cat} onClick={()=>setSelectedCategory(cat)} className={`px-7 py-2.5 rounded-full text-[11px] md:text-xs font-semibold tracking-wide transition-all ${selectedCategory===cat?'text-[#1d1604]':'text-[#d4c79a] hover:text-[#FFE148]'} relative overflow-hidden`} style={selectedCategory===cat?{background:'linear-gradient(140deg,#FFE148,#F5C800 55%,#B07600)',boxShadow:'0 4px 10px -4px #B07600aa'}:{}}>
                    {selectedCategory===cat && <span className="absolute inset-0 opacity-30" style={{background:'radial-gradient(circle at 30% 30%,#FFF8D2,#FFE148 60%,#B07600)'}} />}
                    <span className="relative">{cat}</span>
                  </button>
                ))}
              </div>
            </div>
            {/* Product Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              {filteredSweets.map(sweet => (
                <Card key={sweet.id} 
                  className="group card-premium relative border border-black/40 rounded-[34px] overflow-hidden bg-[radial-gradient(circle_at_30%_22%,#2a2100,#3b2e08_38%,#6d5605_58%,#B07600_72%,#2a2100)] animate-[slowPulseGlow_9s_ease-in-out_infinite]"
                  onMouseEnter={() => setHoveredSweet(sweet.id)}
                  onMouseLeave={() => setHoveredSweet(null)}
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden bg-red-500">
                    {/* Show the exact URL being generated */}
                    <div className="absolute top-0 left-0 right-0 bg-black/90 text-yellow-300 text-xs p-2 z-20">
                      URL: /diwaliSweets/{sweet.image}{sweet.image === 'mysore-pak' ? '.jpeg' : sweet.image === 'rasgulla' ? '.avif' : '.jpg'}
                    </div>
                    <img 
                      src={`/diwaliSweets/${sweet.image}${sweet.image === 'mysore-pak' ? '.jpeg' : sweet.image === 'rasgulla' ? '.avif' : '.jpg'}`} 
                      alt={sweet.name}
                      className="w-full h-full object-cover transition-transform duration-[1400ms] group-hover:scale-110" 
                      style={{filter:'brightness(1.08) contrast(1.06) saturate(1.22)'}}
                      onLoad={(e) => {
                        console.log(`✓ SUCCESS: ${sweet.name} loaded from`, e.currentTarget.src);
                      }}
                      onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        console.error(`✗ FAILED: ${sweet.name} could not load from`, img.src);
                        // Don't change src to see the failing URL
                      }}
                    />
                    {sweet.premium && (
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-semibold tracking-[0.15em] bg-[linear-gradient(145deg,#FFE148,#B07600)] text-[#1d1604] shadow">PREMIUM</div>
                    )}
                    {sweet.stockLeft <= 10 && (
                      <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-semibold tracking-[0.15em] bg-[linear-gradient(145deg,#B07600,#2a2100)] text-[#FFEFA8] shadow">{sweet.stockLeft} LEFT</div>
                    )}
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-3">
                      <CardTitle className="text-lg font-bold leading-snug" style={{background:'linear-gradient(90deg,#FFEFA8,#FFE148 40%,#B07600)',WebkitBackgroundClip:'text',color:'transparent'}}>{sweet.name}</CardTitle>
                      <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-[#1d1604]/70 text-[#FFE148] text-[11px] font-semibold">
                        <Star className="w-3.5 h-3.5 fill-[#FFE148] text-[#FFE148]" /> {sweet.rating}
                      </div>
                    </div>
                    <CardDescription className="mt-2 text-[#d4c79a] font-medium leading-relaxed">
                      {sweet.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                     <div className="mb-4">
                       <Badge className="bg-[#1d1604]/70 text-[#FFEFA8] font-medium border-0 text-[10px] tracking-[0.15em]">{sweet.specialty}</Badge>
                     </div>
                     <div className="flex items-center gap-3 mb-6">
                       {(() => {
                         const priceInfo = calculatePriceWithGST(sweet.price);
                         return (
                           <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 border border-amber-200/50 shadow-lg flex-1">
                             <div className="text-lg font-bold text-amber-900 mb-1">
                               ₹{priceInfo.finalPrice}
                               <span className="text-sm font-normal text-amber-700"> /kg</span>
                             </div>
                             <div className="text-xs text-amber-600 space-y-0.5">
                               <div>Base: ₹{priceInfo.basePrice} + GST {priceInfo.gstRate}%</div>
                               <div className="text-amber-500">(GST: ₹{priceInfo.gstAmount})</div>
                             </div>
                           </div>
                         );
                       })()}
                       {sweet.originalPrice && (
                         <span className="text-xs line-through text-[#8c7a4d]">₹{sweet.originalPrice}</span>
                       )}
                     </div>
                    {hoveredSweet===sweet.id && (
                      <div className="mb-6 p-4 rounded-xl border border-[#FFE14833] bg-[linear-gradient(160deg,#3b2e08,#6d5605)]">
                        <p className="text-[10px] font-semibold tracking-[0.2em] text-[#FFE148] mb-2">TASTING NOTES</p>
                        <div className="flex flex-wrap gap-2">
                          {sweet.tastingNotes.map((note,i)=> (
                            <span key={i} className="px-3 py-1 rounded-full text-[10px] font-semibold bg-[#1d1604]/70 text-[#FFEFA8] tracking-wide shadow">{note}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="space-y-3">
                      <Button onClick={()=>addToCart(sweet)} className="w-full rounded-xl font-semibold text-[#1d1604] text-sm py-3 cta-btn" style={{background:'linear-gradient(140deg,#FFEFA8,#FFE148 45%,#F5C800 70%,#B07600)'}}>
                        <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
                      </Button>
                      <Button onClick={()=>handleOrderWhatsApp(sweet.name)} className="w-full rounded-xl font-semibold text-[#1d1604] text-sm py-3 cta-btn" style={{background:'linear-gradient(140deg,#FFEFA8,#FFE148 45%,#F5C800 70%,#B07600)'}}>
                        Order via WhatsApp
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        {/* Testimonials */}
        <section className="py-28 relative">
          <div className="absolute inset-0 opacity-[0.35]" style={{background:'radial-gradient(circle at 18% 28%,#FFE14822,#B0760000 60%)'}} />
          <div className="max-w-7xl mx-auto px-6 relative">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-7" style={{background:'linear-gradient(90deg,#FFEFA8,#FFE148 40%,#B07600)',WebkitBackgroundClip:'text',color:'transparent'}}>Voices in Yellow</h2>
              <p className="text-[#4e4a43] font-medium">Real delight. One palette. Layered depth.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-12">
              {testimonials.map((t,i)=>(
                <Card key={i} className="card-premium relative p-8 rounded-[34px] border border-black/40 bg-[radial-gradient(circle_at_35%_20%,#2a2100,#3b2e08_40%,#6d5605_60%,#B07600_78%,#2a2100)]">
                  <div className="flex mb-5 gap-1">
                    {Array.from({length:t.rating}).map((_,s)=>(<Star key={s} className="w-5 h-5 fill-[#FFE148] text-[#FFE148] drop-shadow-[0_1px_2px_rgba(0,0,0,.6)]" />))}
                  </div>
                  <p className="text-[#e5d7aa] font-medium italic mb-6 leading-relaxed">"{t.text}"</p>
                  <div className="text-sm font-semibold tracking-wide text-[#FFE148]">{t.name} • {t.location}</div>
                  <div className="text-[10px] mt-1 text-[#bfa76d] uppercase tracking-[0.22em]">{t.item}</div>
                </Card>
              ))}
            </div>
            <div className="text-center mt-20">
              <div className="inline-flex items-center gap-8 px-16 py-8 rounded-[40px] border border-black/40 bg-[linear-gradient(140deg,#2a2100,#3b2e08_40%,#6d5605_65%,#B07600)] shadow-[0_10px_28px_-14px_rgba(0,0,0,0.75)] relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.2]" style={{background:'radial-gradient(circle at 70% 30%,#FFE148,#B07600)'}} />
                <Users className="w-10 h-10 text-[#FFE148]" />
                <div className="text-5xl font-black leading-none" style={{background:'linear-gradient(90deg,#FFEFA8,#FFE148 40%,#B07600)',WebkitBackgroundClip:'text',color:'transparent'}}>{customerCount.toLocaleString()}+</div>
                <div className="text-[#d4c79a] font-semibold tracking-wide text-sm">Happy Sweet Lovers</div>
              </div>
            </div>
          </div>
        </section>
        {/* Cart Sidebar (unchanged structural, adjust colors) */}
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex">
            <div className="flex-1 bg-black/70 backdrop-blur-sm" onClick={()=>setIsCartOpen(false)} />
            <div className="w-96 h-full overflow-y-auto border-l border-black/60 shadow-[0_0_50px_-12px_rgba(0,0,0,.9)] bg-[linear-gradient(165deg,#2a2100,#3b2e08_45%,#6d5605_70%,#B07600)] relative">
              <div className="p-6 border-b border-black/50 flex items-center justify-between relative">
                <h3 className="text-lg font-extrabold tracking-tight" style={{background:'linear-gradient(90deg,#FFEFA8,#FFE148 40%,#B07600)',WebkitBackgroundClip:'text',color:'transparent'}}>Your Cart</h3>
                <Button variant="outline" size="sm" onClick={()=>setIsCartOpen(false)} className="border border-[#FFE14855] text-[#FFE148] hover:bg-[#FFE14822]">
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="p-6 space-y-6">
                {cart.length===0 ? (
                  <div className="text-center py-16 text-[#d4c79a] font-medium">Empty</div>
                ):(
                  <>
                    {cart.map(item=> (
                      <div key={item.id} className="flex items-center gap-4 p-4 rounded-2xl border border-[#FFE14833] bg-[linear-gradient(150deg,#3b2e08,#6d5605)]">
                        <div className="flex-1">
                          <h4 className="font-semibold text-[#FFEFA8] text-sm leading-tight">{item.name}</h4>
                          <p className="text-[10px] text-[#bfa76d] mt-1">₹{item.price} each</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" onClick={()=>updateQuantity(item.id,item.quantity-1)} className="border border-[#FFE14855] text-[#FFE148] hover:bg-[#FFE14822] w-7 h-7 p-0">
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-8 text-center font-semibold text-[#FFE148] text-sm">{item.quantity}</span>
                          <Button variant="outline" size="sm" onClick={()=>updateQuantity(item.id,item.quantity+1)} className="border border-[#FFE14855] text-[#FFE148] hover:bg-[#FFE14822] w-7 h-7 p-0">
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        <Button variant="outline" size="sm" onClick={()=>removeFromCart(item.id)} className="border border-[#FFE14855] text-[#FFE148] hover:bg-[#FFE14822] w-7 h-7 p-0">
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                    <div className="pt-4 border-t border-[#FFE14833]">
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-xs font-semibold tracking-[0.25em] text-[#bfa76d]">TOTAL</span>
                        <span className="text-xl font-extrabold" style={{background:'linear-gradient(90deg,#FFEFA8,#FFE148 40%,#B07600)',WebkitBackgroundClip:'text',color:'transparent'}}>₹{cartTotal}</span>
                      </div>
                      <Button onClick={handleWhatsAppOrder} className="w-full rounded-xl font-semibold text-[#1d1604] text-sm py-3 cta-btn" style={{background:'linear-gradient(140deg,#FFEFA8,#FFE148 45%,#F5C800 70%,#B07600)'}}>
                        Place WhatsApp Order
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
        {/* Floating Cart Button */}
        {cart.length>0 && (
          <Button onClick={()=>setIsCartOpen(true)} className="fixed bottom-6 right-6 rounded-full w-20 h-20 flex items-center justify-center cta-btn" style={{background:'linear-gradient(140deg,#FFEFA8,#FFE148 45%,#F5C800 70%,#B07600)',boxShadow:'0 14px 38px -14px rgba(0,0,0,.85)'}}>
            <div className="relative">
              <ShoppingCart className="w-8 h-8 text-[#1d1604]" />
              <span className="absolute -top-2 -right-2 min-w-[26px] h-6 rounded-full bg-[#1d1604] text-[#FFE148] text-xs font-bold flex items-center justify-center shadow">{cartCount}</span>
            </div>
          </Button>
        )}
        {/* Contact Button */}
        <Button onClick={()=>handleOrderWhatsApp('General Inquiry')} className="fixed bottom-6 left-6 rounded-full px-8 py-4 font-semibold text-[#1d1604] cta-btn" style={{background:'linear-gradient(140deg,#FFEFA8,#FFE148 45%,#F5C800 70%,#B07600)',boxShadow:'0 14px 38px -14px rgba(0,0,0,.85)'}}>
          <Phone className="w-5 h-5 mr-2" /> WhatsApp
        </Button>
      </div>
    </>
  );
}
