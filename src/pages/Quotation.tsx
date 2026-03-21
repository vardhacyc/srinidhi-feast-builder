import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, Download, FileText, Users, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { generateQuotationPDF, QuotationItem } from '@/utils/generateQuotationPDF';
import { useToast } from '@/hooks/use-toast';

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
    { name: 'Curd Rice', rate: 40 },
    { name: 'Tamarind Rice', rate: 45 },
  ],
  dinner: [
    { name: 'Mini Meals', rate: 100 },
    { name: 'Chapathi with Kurma', rate: 60 },
    { name: 'Parotta with Salna', rate: 55 },
    { name: 'Fried Rice', rate: 70 },
    { name: 'Noodles', rate: 65 },
  ],
  snacks: [
    { name: 'Samosa (2 pcs)', rate: 25 },
    { name: 'Bajji Combo', rate: 35 },
    { name: 'Cutlet (2 pcs)', rate: 30 },
    { name: 'Sundal', rate: 20 },
    { name: 'Paneer Puffs', rate: 30 },
  ],
  beverages: [
    { name: 'Filter Coffee', rate: 15 },
    { name: 'Tea', rate: 12 },
    { name: 'Lassi', rate: 25 },
    { name: 'Buttermilk', rate: 20 },
    { name: 'Fresh Juice', rate: 35 },
  ],
  desserts: [
    { name: 'Gulab Jamun (2 pcs)', rate: 30 },
    { name: 'Payasam', rate: 25 },
    { name: 'Ice Cream', rate: 40 },
    { name: 'Kesari', rate: 20 },
    { name: 'Jangiri', rate: 25 },
  ],
};

const eventTypes = ['Wedding', 'Birthday', 'Corporate Event', 'House Warming', 'Festival', 'Anniversary', 'Other'];

const allItems = Object.values(menuCategories).flat();

const Quotation = () => {
  const { toast } = useToast();
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: number }>({});
  const [guestCount, setGuestCount] = useState(50);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventType, setEventType] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [notes, setNotes] = useState('');

  const updateQuantity = (itemName: string, change: number) => {
    setSelectedItems(prev => {
      const currentQty = prev[itemName] || 0;
      const newQty = Math.max(0, currentQty + change);
      if (newQty === 0) {
        const { [itemName]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [itemName]: newQty };
    });
  };

  const subtotal = Object.entries(selectedItems).reduce((total, [itemName, quantity]) => {
    const item = allItems.find(i => i.name === itemName);
    return total + (item ? item.rate * quantity * guestCount : 0);
  }, 0);

  const gstAmount = Math.round(subtotal * 0.05);
  const grandTotal = subtotal + gstAmount;
  const selectedCount = Object.values(selectedItems).filter(q => q > 0).length;

  const generatePDF = () => {
    if (!customerName.trim()) {
      toast({ title: 'Customer name is required', variant: 'destructive' });
      return;
    }
    if (selectedCount === 0) {
      toast({ title: 'Please select at least one menu item', variant: 'destructive' });
      return;
    }

    const items: QuotationItem[] = Object.entries(selectedItems)
      .filter(([_, qty]) => qty > 0)
      .map(([itemName, quantity]) => {
        const item = allItems.find(i => i.name === itemName)!;
        return {
          name: itemName,
          rate: item.rate,
          quantity: quantity * guestCount,
          total: item.rate * quantity * guestCount,
        };
      });

    const quotationNumber = `SNC-${Date.now().toString(36).toUpperCase()}`;

    generateQuotationPDF({
      customerName,
      customerPhone,
      customerEmail,
      eventDate,
      eventTime,
      deliveryAddress,
      eventType,
      guestCount,
      notes,
      items,
      subtotal,
      gstAmount,
      grandTotal,
      quotationNumber,
      validityDays: 7,
    });

    toast({ title: 'Quotation PDF downloaded!' });
  };

  return (
    <div className="min-h-screen" style={{ background: '#0A0A0A' }}>
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/95 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </Link>
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4" style={{ color: '#C9A227' }} />
            <span className="text-white font-light" style={{ fontFamily: "'Playfair Display', serif" }}>
              Quotation Generator
            </span>
          </div>
          <div className="w-16" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Customer + Menu */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Details */}
            <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 className="text-lg text-white font-light mb-5 flex items-center gap-2">
                <Users className="w-4 h-4" style={{ color: '#C9A227' }} />
                Customer & Event Details
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/50 text-xs mb-1.5">Customer Name *</label>
                  <Input value={customerName} onChange={e => setCustomerName(e.target.value)}
                    className="bg-transparent border-white/15 text-white" placeholder="Full name" />
                </div>
                <div>
                  <label className="block text-white/50 text-xs mb-1.5">Phone</label>
                  <Input value={customerPhone} onChange={e => setCustomerPhone(e.target.value)}
                    className="bg-transparent border-white/15 text-white" placeholder="+91 ..." />
                </div>
                <div>
                  <label className="block text-white/50 text-xs mb-1.5">Email</label>
                  <Input value={customerEmail} onChange={e => setCustomerEmail(e.target.value)}
                    className="bg-transparent border-white/15 text-white" placeholder="email@example.com" />
                </div>
                <div>
                  <label className="block text-white/50 text-xs mb-1.5">Event Type</label>
                  <select value={eventType} onChange={e => setEventType(e.target.value)}
                    className="w-full h-10 rounded-md px-3 bg-transparent border border-white/15 text-white text-sm">
                    <option value="" className="bg-black">Select type</option>
                    {eventTypes.map(t => <option key={t} value={t} className="bg-black">{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-white/50 text-xs mb-1.5 flex items-center gap-1">
                    <CalendarDays className="w-3 h-3" /> Event Date
                  </label>
                  <Input type="date" value={eventDate} onChange={e => setEventDate(e.target.value)}
                    className="bg-transparent border-white/15 text-white" />
                </div>
                <div>
                  <label className="block text-white/50 text-xs mb-1.5">Event Time</label>
                  <Input type="time" value={eventTime} onChange={e => setEventTime(e.target.value)}
                    className="bg-transparent border-white/15 text-white" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-white/50 text-xs mb-1.5">Delivery Address</label>
                  <Input value={deliveryAddress} onChange={e => setDeliveryAddress(e.target.value)}
                    className="bg-transparent border-white/15 text-white" placeholder="Event venue / delivery address" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-white/50 text-xs mb-1.5">Special Notes</label>
                  <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={2}
                    className="w-full rounded-md px-3 py-2 bg-transparent border border-white/15 text-white text-sm resize-none"
                    placeholder="Any dietary restrictions, special requests..." />
                </div>
              </div>
            </div>

            {/* Guest Count */}
            <div className="rounded-xl p-4" style={{ background: 'rgba(201, 162, 39, 0.1)', border: '1px solid rgba(201, 162, 39, 0.2)' }}>
              <label className="block text-white font-light mb-2">Expected Guests</label>
              <div className="flex items-center gap-4">
                <Input type="number" value={guestCount}
                  onChange={e => setGuestCount(Math.max(1, parseInt(e.target.value) || 1))}
                  className="max-w-[120px] bg-transparent border-white/20 text-white" min="1" />
                <span className="text-white/50 text-sm">People</span>
              </div>
            </div>

            {/* Menu Items */}
            <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 className="text-lg text-white font-light mb-5">Select Menu Items</h3>
              {Object.entries(menuCategories).map(([category, items]) => (
                <div key={category} className="mb-6 last:mb-0">
                  <h4 className="text-sm text-white font-light mb-3 capitalize flex items-center">
                    <span className="w-1 h-4 rounded-full mr-2" style={{ background: '#C9A227' }} />
                    {category}
                  </h4>
                  <div className="grid md:grid-cols-2 gap-2">
                    {items.map(item => (
                      <div key={item.name} className="p-3 rounded-lg transition-all duration-200"
                        style={{
                          background: selectedItems[item.name] ? 'rgba(201, 162, 39, 0.12)' : 'rgba(255,255,255,0.02)',
                          border: selectedItems[item.name] ? '1px solid rgba(201, 162, 39, 0.25)' : '1px solid rgba(255,255,255,0.05)',
                        }}>
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="text-white text-sm font-light">{item.name}</span>
                            <span className="text-xs ml-2" style={{ color: '#C9A227' }}>₹{item.rate}/plate</span>
                          </div>
                          <div className="flex items-center rounded-full p-0.5" style={{ background: 'rgba(255,255,255,0.05)' }}>
                            <button onClick={() => updateQuantity(item.name, -1)}
                              disabled={!selectedItems[item.name]}
                              className="w-6 h-6 rounded-full flex items-center justify-center text-white/50 hover:text-white transition-colors disabled:opacity-30">
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-7 text-center text-white text-xs">{selectedItems[item.name] || 0}</span>
                            <button onClick={() => updateQuantity(item.name, 1)}
                              className="w-6 h-6 rounded-full flex items-center justify-center text-black" style={{ background: '#C9A227' }}>
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

          {/* Right: Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 className="text-lg text-white font-light mb-5 pb-3 border-b border-white/10">
                Quotation Summary
              </h3>

              <div className="space-y-2 mb-4 max-h-[35vh] overflow-y-auto">
                <div className="flex justify-between p-2 rounded-lg text-sm" style={{ background: 'rgba(201, 162, 39, 0.1)' }}>
                  <span className="text-white/50">Guests</span>
                  <span style={{ color: '#C9A227' }}>{guestCount}</span>
                </div>

                {selectedCount === 0 ? (
                  <div className="text-center py-6 rounded-lg border border-dashed border-white/10 text-white/30 text-xs">
                    Select items to build quotation
                  </div>
                ) : (
                  Object.entries(selectedItems)
                    .filter(([_, qty]) => qty > 0)
                    .map(([itemName, quantity]) => {
                      const item = allItems.find(i => i.name === itemName);
                      const itemTotal = item ? item.rate * quantity * guestCount : 0;
                      return (
                        <div key={itemName} className="p-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.02)' }}>
                          <div className="flex justify-between text-xs">
                            <span className="text-white/70">{itemName}</span>
                            <span style={{ color: '#C9A227' }}>x{quantity}</span>
                          </div>
                          <div className="flex justify-between text-xs text-white/40 mt-0.5">
                            <span>₹{item?.rate} × {quantity} × {guestCount}</span>
                            <span className="text-white">₹{itemTotal.toLocaleString('en-IN')}</span>
                          </div>
                        </div>
                      );
                    })
                )}
              </div>

              {selectedCount > 0 && (
                <div className="pt-3 mb-4 border-t border-white/10 space-y-1.5 text-sm">
                  <div className="flex justify-between text-white/50">
                    <span>Subtotal</span>
                    <span className="text-white">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-white/50">
                    <span>GST (5%)</span>
                    <span className="text-white">₹{gstAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-white/10">
                    <span className="text-white/60 text-sm">Grand Total</span>
                    <span className="text-xl font-light" style={{ color: '#C9A227' }}>
                      ₹{grandTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              )}

              <Button onClick={generatePDF}
                disabled={selectedCount === 0 || !customerName.trim()}
                size="lg"
                className="w-full py-6 font-light tracking-wide border-0 disabled:opacity-50"
                style={{ background: '#C9A227', color: '#0A0A0A' }}>
                <Download className="h-4 w-4 mr-2" />
                Download Quotation PDF
              </Button>

              <p className="text-xs text-white/30 text-center mt-3">
                PDF includes company branding, terms & conditions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quotation;
