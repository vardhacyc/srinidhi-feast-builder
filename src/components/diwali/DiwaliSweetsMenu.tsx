
import React, { useState } from 'react';
import { Plus, Leaf, Heart } from 'lucide-react';
import { useCart, Sweet } from '../../contexts/CartContext';
import { Button } from '../ui/button';

const DiwaliSweetsMenu = () => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const sweetCategories = [
    { id: 'all', name: 'All Sweets', emoji: '🍯' },
    { id: 'milk-based', name: 'Milk Based', emoji: '🥛' },
    { id: 'fried', name: 'Fried Delights', emoji: '🍥' },
    { id: 'dry-fruits', name: 'Dry Fruit Special', emoji: '🌰' },
    { id: 'regional', name: 'Regional Specials', emoji: '🏛️' }
  ];

  const sweetsData: Sweet[] = [
    // Milk-based sweets
    {
      id: 'rasgulla',
      name: 'Bengali Rasgulla',
      description: 'Soft, spongy cottage cheese balls in sugar syrup',
      price: 450,
      image: '🍡',
      category: 'milk-based'
    },
    {
      id: 'rasmalai',
      name: 'Rasmalai',
      description: 'Delicate cottage cheese dumplings in sweetened milk',
      price: 550,
      image: '🥛',
      category: 'milk-based'
    },
    {
      id: 'kheer',
      name: 'Royal Kheer',
      description: 'Creamy rice pudding with nuts and cardamom',
      price: 350,
      image: '🍚',
      category: 'milk-based'
    },
    {
      id: 'kulfi',
      name: 'Kulfi Falooda',
      description: 'Traditional Indian ice cream with vermicelli',
      price: 250,
      image: '🍨',
      category: 'milk-based'
    },
    
    // Fried delights
    {
      id: 'jalebi',
      name: 'Crispy Jalebi',
      description: 'Golden spirals soaked in sugar syrup',
      price: 300,
      image: '🌀',
      category: 'fried'
    },
    {
      id: 'gulab-jamun',
      name: 'Gulab Jamun',
      description: 'Soft milk solid balls in rose-flavored syrup',
      price: 400,
      image: '🍯',
      category: 'fried'
    },
    {
      id: 'imarti',
      name: 'Imarti',
      description: 'Flower-shaped crispy sweet in saffron syrup',
      price: 450,
      image: '🌸',
      category: 'fried'
    },
    {
      id: 'balushahi',
      name: 'Balushahi',
      description: 'Flaky pastry glazed with sugar syrup',
      price: 350,
      image: '🥐',
      category: 'fried'
    },

    // Dry fruit specials
    {
      id: 'kaju-katli',
      name: 'Kaju Katli',
      description: 'Diamond-shaped cashew fudge with silver leaf',
      price: 800,
      image: '💎',
      category: 'dry-fruits'
    },
    {
      id: 'badam-halwa',
      name: 'Badam Halwa',
      description: 'Rich almond pudding with ghee and cardamom',
      price: 650,
      image: '🥜',
      category: 'dry-fruits'
    },
    {
      id: 'anjeer-roll',
      name: 'Anjeer Roll',
      description: 'Fig and nut rolls with pure ghee',
      price: 750,
      image: '🌯',
      category: 'dry-fruits',
      isVegan: true
    },
    {
      id: 'pista-roll',
      name: 'Pista Roll',
      description: 'Pistachio rolls with sweetened milk',
      price: 900,
      image: '🟢',
      category: 'dry-fruits'
    },

    // Regional specials
    {
      id: 'mysore-pak',
      name: 'Mysore Pak',
      description: 'Karnataka\'s famous ghee-rich sweet',
      price: 500,
      image: '🟨',
      category: 'regional'
    },
    {
      id: 'soan-papdi',
      name: 'Soan Papdi',
      description: 'Flaky, crispy sweet with cardamom',
      price: 400,
      image: '📄',
      category: 'regional'
    },
    {
      id: 'motichoor-laddu',
      name: 'Motichoor Laddu',
      description: 'Golden droplet laddus with nuts',
      price: 450,
      image: '🟡',
      category: 'regional'
    },
    {
      id: 'coconut-barfi',
      name: 'Coconut Barfi',
      description: 'Fresh coconut fudge squares',
      price: 350,
      image: '🥥',
      category: 'regional',
      isVegan: true
    }
  ];

  const filteredSweets = selectedCategory === 'all' 
    ? sweetsData 
    : sweetsData.filter(sweet => sweet.category === selectedCategory);

  return (
    <section id="sweets" className="py-16 px-4 bg-gradient-to-br from-yellow-50 to-orange-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-orange-800 mb-4">
            🍯 Our Premium Sweet Collection
          </h2>
          <p className="text-lg text-orange-700 max-w-2xl mx-auto">
            Handcrafted with the finest ingredients and traditional recipes
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {sweetCategories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
                selectedCategory === category.id
                  ? 'bg-orange-600 text-white shadow-lg'
                  : 'bg-white text-orange-600 hover:bg-orange-100'
              }`}
            >
              {category.emoji} {category.name}
            </button>
          ))}
        </div>

        {/* Sweets grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSweets.map(sweet => (
            <div
              key={sweet.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-orange-100 overflow-hidden"
            >
              <div className="p-6">
                <div className="text-4xl text-center mb-3">{sweet.image}</div>
                <h3 className="text-lg font-bold text-orange-800 mb-2 text-center">
                  {sweet.name}
                </h3>
                <p className="text-orange-600 text-sm mb-3 text-center h-12">
                  {sweet.description}
                </p>
                
                {/* Badges */}
                <div className="flex justify-center gap-2 mb-3">
                  {sweet.isVegan && (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                      <Leaf className="h-3 w-3" />
                      Vegan
                    </span>
                  )}
                  {sweet.isSugarFree && (
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      Sugar Free
                    </span>
                  )}
                </div>

                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-800 mb-3">
                    ₹{sweet.price}
                    <span className="text-sm font-normal text-orange-600">/kg</span>
                  </div>
                  <Button
                    onClick={() => addToCart(sweet)}
                    className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 hover:scale-105"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredSweets.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🍯</div>
            <p className="text-xl text-orange-700">No sweets found in this category</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default DiwaliSweetsMenu;
