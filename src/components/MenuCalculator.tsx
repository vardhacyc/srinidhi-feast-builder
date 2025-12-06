import { useState } from 'react';
import { Plus, Minus, Calculator, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const MenuCalculator = () => {
  const [guestCount, setGuestCount] = useState(50);
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: number }>({});

  const menuCategories = {
    breakfast: [
      { name: 'Idli (3 pcs)', rate: 40 },
      { name: 'Dosa', rate: 45 },
      { name: 'Vada (2 pcs)', rate: 35 },
      { name: 'Upma', rate: 30 },
      { name: 'Pongal', rate: 35 },
      { name: 'Poori with Curry', rate: 40 },
    ],
    lunch: [
      { name: 'South Indian Thali', rate: 120 },
      { name: 'Vegetable Biryani', rate: 80 },
      { name: 'Sambar Rice', rate: 60 },
      { name: 'Lemon Rice', rate: 45 },
    ],
    snacks: [
      { name: 'Samosa (2 pcs)', rate: 25 },
      { name: 'Bajji Combo', rate: 35 },
      { name: 'Cutlet (2 pcs)', rate: 30 },
      { name: 'Sundal', rate: 20 },
    ],
    beverages: [
      { name: 'Filter Coffee', rate: 15 },
      { name: 'Tea', rate: 12 },
      { name: 'Lassi', rate: 25 },
      { name: 'Buttermilk', rate: 20 },
    ],
  };

  const allItems = Object.values(menuCategories).flat();

  const updateQuantity = (itemName: string, change: number) => {
    setSelectedItems(prev => {
      const currentQty = prev[itemName] || 0;
      const newQty = Math.max(0, currentQty + change);
      if (newQty === 0) {
        const { [itemName]: removed, ...rest } = prev;
        return rest;
      }
      return { ...prev, [itemName]: newQty };
    });
  };

  const calculateTotal = () => {
    return Object.entries(selectedItems).reduce((total, [itemName, quantity]) => {
      const item = allItems.find(item => item.name === itemName);
      return total + (item ? item.rate * quantity * guestCount : 0);
    }, 0);
  };

  const generateOrderSummary = () => {
    const selectedItemsList = Object.entries(selectedItems)
      .filter(([_, quantity]) => quantity > 0)
      .map(([itemName, quantity]) => {
        const item = allItems.find(item => item.name === itemName);
        const itemTotal = item ? item.rate * quantity * guestCount : 0;
        return `${itemName} x ${quantity} = ₹${itemTotal}`;
      });

    const summary = `Order Summary:\nGuests: ${guestCount}\n\nItems:\n${selectedItemsList.join('\n')}\n\nTotal: ₹${calculateTotal()}\n\nPlease confirm availability.`;
    window.open(`https://wa.me/918760101010?text=${encodeURIComponent(summary)}`, '_blank');
  };

  return (
    <section id="calculator" className="relative py-24 overflow-hidden bg-black">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Calculator className="w-4 h-4" style={{ color: '#C9A227' }} />
            <span className="text-sm tracking-[0.3em] uppercase" style={{ color: '#C9A227' }}>
              Menu Builder
            </span>
          </div>

          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Build Your{' '}
            <span className="italic" style={{ color: '#C9A227' }}>Feast</span>
          </h2>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Menu Selection */}
            <div className="lg:col-span-2">
              <div
                className="rounded-2xl p-6"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                {/* Guest count */}
                <div
                  className="mb-8 p-4 rounded-xl"
                  style={{
                    background: 'rgba(201, 162, 39, 0.1)',
                    border: '1px solid rgba(201, 162, 39, 0.2)'
                  }}
                >
                  <label className="block text-white font-light mb-3">Expected Guests</label>
                  <div className="flex items-center gap-4">
                    <Input
                      type="number"
                      value={guestCount}
                      onChange={(e) => setGuestCount(Math.max(1, parseInt(e.target.value) || 1))}
                      className="max-w-xs bg-transparent border-white/20 text-white font-light"
                      min="1"
                    />
                    <span className="text-white/50 text-sm">People</span>
                  </div>
                </div>

                {/* Menu items */}
                {Object.entries(menuCategories).map(([category, items]) => (
                  <div key={category} className="mb-8 last:mb-0">
                    <h4 className="text-lg text-white font-light mb-4 capitalize flex items-center">
                      <span className="w-1 h-5 rounded-full mr-3" style={{ background: '#C9A227' }}></span>
                      {category}
                    </h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      {items.map((item) => (
                        <div
                          key={item.name}
                          className="p-4 rounded-xl transition-all duration-300"
                          style={{
                            background: selectedItems[item.name] ? 'rgba(201, 162, 39, 0.15)' : 'rgba(255,255,255,0.02)',
                            border: selectedItems[item.name] ? '1px solid rgba(201, 162, 39, 0.3)' : '1px solid rgba(255,255,255,0.05)'
                          }}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <h5 className="text-white font-light text-sm">{item.name}</h5>
                              <span className="text-sm" style={{ color: '#C9A227' }}>₹{item.rate}</span>
                              <span className="text-xs text-white/30 ml-2">per plate</span>
                            </div>

                            <div className="flex items-center rounded-full p-1" style={{ background: 'rgba(255,255,255,0.05)' }}>
                              <button
                                onClick={() => updateQuantity(item.name, -1)}
                                className="w-7 h-7 rounded-full flex items-center justify-center text-white/50 hover:text-white transition-colors"
                                disabled={!selectedItems[item.name]}
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="w-8 text-center text-white text-sm font-light">
                                {selectedItems[item.name] || 0}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.name, 1)}
                                className="w-7 h-7 rounded-full flex items-center justify-center text-black transition-all"
                                style={{ background: '#C9A227' }}
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div
                className="sticky top-24 rounded-2xl p-6"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                <h3 className="text-lg text-white font-light mb-6 pb-4 border-b border-white/10">
                  Your Estimate
                </h3>

                <div className="space-y-3 mb-6 max-h-[40vh] overflow-y-auto">
                  <div
                    className="flex justify-between items-center p-3 rounded-lg"
                    style={{ background: 'rgba(201, 162, 39, 0.1)' }}
                  >
                    <span className="text-white/50 text-sm">Guests</span>
                    <span style={{ color: '#C9A227' }}>{guestCount}</span>
                  </div>

                  {Object.entries(selectedItems).filter(([_, qty]) => qty > 0).length === 0 ? (
                    <div className="text-center py-8 rounded-lg border border-dashed border-white/10 text-white/30 text-sm">
                      Select items to see summary
                    </div>
                  ) : (
                    Object.entries(selectedItems)
                      .filter(([_, quantity]) => quantity > 0)
                      .map(([itemName, quantity]) => {
                        const item = allItems.find(item => item.name === itemName);
                        const itemTotal = item ? item.rate * quantity * guestCount : 0;
                        return (
                          <div key={itemName} className="p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.02)' }}>
                            <div className="flex justify-between mb-1 text-sm">
                              <span className="text-white/70">{itemName}</span>
                              <span style={{ color: '#C9A227' }}>x{quantity}</span>
                            </div>
                            <div className="flex justify-between text-xs text-white/40">
                              <span>₹{item?.rate} × {quantity} × {guestCount}</span>
                              <span className="text-white">₹{itemTotal.toLocaleString()}</span>
                            </div>
                          </div>
                        );
                      })
                  )}
                </div>

                <div className="pt-4 mb-6 border-t border-white/10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/50 text-sm">Estimated Total</span>
                    <span className="text-2xl font-light" style={{ color: '#C9A227' }}>
                      ₹{calculateTotal().toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-right text-white/30">*Final price may vary</p>
                </div>

                <Button
                  onClick={generateOrderSummary}
                  disabled={Object.keys(selectedItems).length === 0}
                  size="lg"
                  className="w-full py-6 font-light tracking-wide transition-all duration-300 border-0 disabled:opacity-50"
                  style={{
                    background: '#C9A227',
                    color: '#0A0A0A',
                  }}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Get Quote on WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuCalculator;
