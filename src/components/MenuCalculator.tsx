
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

    const summary = `
Order Summary:
Guests: ${guestCount}

Items:
${selectedItemsList.join('\n')}

Total Amount: ₹${calculateTotal()}

Please confirm availability and provide final quote.
    `;
    
    const whatsappUrl = `https://wa.me/919994316559?text=${encodeURIComponent(summary)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="calculator" className="py-20 bg-neutral">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
            Menu
            <div className="relative inline-block mx-3">
              Calculator
              <div className="absolute -bottom-3 left-0 w-full h-4 bg-primary/30 -skew-x-12 transform"></div>
            </div>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select your menu items and get instant pricing for your event with our interactive calculator
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Menu Selection */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-2xl p-8">
                <h3 className="text-3xl font-black text-gray-900 mb-8 flex items-center">
                  <Calculator className="h-8 w-8 mr-3 text-primary" />
                  Select Menu Items
                </h3>

                {/* Guest count */}
                <div className="mb-10">
                  <label className="block text-lg font-bold text-gray-900 mb-3">
                    Number of Guests
                  </label>
                  <Input
                    type="number"
                    value={guestCount}
                    onChange={(e) => setGuestCount(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-40 px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-primary focus:ring-opacity-20 transition-all"
                    min="1"
                  />
                </div>

                {/* Menu items by category */}
                {Object.entries(menuCategories).map(([category, items]) => (
                  <div key={category} className="mb-10">
                    <h4 className="text-2xl font-black text-gray-900 mb-6 capitalize">
                      {category}
                    </h4>
                    <div className="grid md:grid-cols-2 gap-6">
                      {items.map((item) => (
                        <div 
                          key={item.name}
                          className="bg-gray-50 rounded-2xl p-6 shadow-lg border-2 border-gray-100 hover:border-primary hover:shadow-xl transition-all transform hover:scale-105"
                        >
                          <div className="flex justify-between items-start mb-4">
                            <h5 className="font-bold text-lg text-gray-900">{item.name}</h5>
                            <span className="text-primary font-black text-xl">₹{item.rate}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600 font-medium">per plate</span>
                            <div className="flex items-center space-x-3">
                              <button
                                onClick={() => updateQuantity(item.name, -1)}
                                className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-all transform hover:scale-110"
                              >
                                <Minus className="h-5 w-5" />
                              </button>
                              <span className="w-10 text-center font-black text-lg">
                                {selectedItems[item.name] || 0}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.name, 1)}
                                className="w-10 h-10 rounded-full btn-gradient-primary flex items-center justify-center hover:scale-110 transition-all transform"
                              >
                                <Plus className="h-5 w-5" />
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
              <div className="bg-gradient-to-br from-primary/10 to-green/10 rounded-3xl shadow-2xl p-8 sticky top-6">
                <h3 className="text-3xl font-black text-gray-900 mb-8">Order Summary</h3>
                
                <div className="space-y-6 mb-8">
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">Guests:</span>
                    <span className="font-black text-lg">{guestCount}</span>
                  </div>

                  {Object.entries(selectedItems).filter(([_, qty]) => qty > 0).length === 0 ? (
                    <p className="text-gray-500 italic">No items selected</p>
                  ) : (
                    <div className="space-y-4">
                      {Object.entries(selectedItems)
                        .filter(([_, quantity]) => quantity > 0)
                        .map(([itemName, quantity]) => {
                          const item = allItems.find(item => item.name === itemName);
                          const itemTotal = item ? item.rate * quantity * guestCount : 0;
                          return (
                            <div key={itemName} className="bg-white rounded-xl p-4 shadow-lg">
                              <div className="flex justify-between">
                                <span className="font-bold">{itemName}</span>
                                <span className="font-black text-primary">x{quantity}</span>
                              </div>
                              <div className="flex justify-between text-gray-600 mt-2">
                                <span>₹{item?.rate} x {quantity} x {guestCount}</span>
                                <span className="font-bold">₹{itemTotal}</span>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  )}
                </div>

                <div className="border-t-2 border-gray-200 pt-6 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-black">Total:</span>
                    <span className="text-3xl font-black text-primary">₹{calculateTotal()}</span>
                  </div>
                  <p className="text-gray-600 mt-2 font-medium">*Prices are estimated</p>
                </div>

                <Button
                  onClick={generateOrderSummary}
                  disabled={Object.keys(selectedItems).length === 0}
                  size="lg"
                  className="w-full btn-gradient-multicolor font-black text-lg py-6 rounded-xl transform hover:scale-105 transition-all shadow-xl"
                >
                  <Send className="h-6 w-6 mr-3" />
                  Send to WhatsApp
                </Button>

                <p className="text-gray-600 mt-4 text-center font-medium">
                  Click to send your order details via WhatsApp for final confirmation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuCalculator;
