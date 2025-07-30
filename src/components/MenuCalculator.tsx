
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
    
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(summary)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="calculator" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Menu <span className="text-orange-600">Calculator</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-600 to-red-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select your menu items and get instant pricing for your event
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Menu Selection */}
            <div className="lg:col-span-2">
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <Calculator className="h-6 w-6 mr-2 text-orange-600" />
                  Select Menu Items
                </h3>

                {/* Guest count */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Guests
                  </label>
                  <Input
                    type="number"
                    value={guestCount}
                    onChange={(e) => setGuestCount(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-32"
                    min="1"
                  />
                </div>

                {/* Menu items by category */}
                {Object.entries(menuCategories).map(([category, items]) => (
                  <div key={category} className="mb-8">
                    <h4 className="text-xl font-semibold text-gray-800 mb-4 capitalize">
                      {category}
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {items.map((item) => (
                        <div 
                          key={item.name}
                          className="bg-white rounded-lg p-4 shadow-sm border hover:shadow-md transition-shadow"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="font-medium text-gray-800">{item.name}</h5>
                            <span className="text-orange-600 font-semibold">₹{item.rate}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">per plate</span>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => updateQuantity(item.name, -1)}
                                className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="w-8 text-center font-medium">
                                {selectedItems[item.name] || 0}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.name, 1)}
                                className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center hover:bg-orange-700 transition-colors"
                              >
                                <Plus className="h-4 w-4" />
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
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 sticky top-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Guests:</span>
                    <span className="font-semibold">{guestCount}</span>
                  </div>

                  {Object.entries(selectedItems).filter(([_, qty]) => qty > 0).length === 0 ? (
                    <p className="text-gray-500 italic">No items selected</p>
                  ) : (
                    <div className="space-y-2">
                      {Object.entries(selectedItems)
                        .filter(([_, quantity]) => quantity > 0)
                        .map(([itemName, quantity]) => {
                          const item = allItems.find(item => item.name === itemName);
                          const itemTotal = item ? item.rate * quantity * guestCount : 0;
                          return (
                            <div key={itemName} className="text-sm">
                              <div className="flex justify-between">
                                <span>{itemName}</span>
                                <span>x{quantity}</span>
                              </div>
                              <div className="flex justify-between text-gray-600">
                                <span>₹{item?.rate} x {quantity} x {guestCount}</span>
                                <span>₹{itemTotal}</span>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  )}
                </div>

                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">Total:</span>
                    <span className="text-2xl font-bold text-orange-600">₹{calculateTotal()}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">*Prices are estimated</p>
                </div>

                <Button
                  onClick={generateOrderSummary}
                  disabled={Object.keys(selectedItems).length === 0}
                  className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send to WhatsApp
                </Button>

                <p className="text-xs text-gray-600 mt-4 text-center">
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
