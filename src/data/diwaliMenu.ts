// Diwali Premium Collection Menu Data
// This data is static to avoid database calls and ensure pricing integrity

export interface MenuProduct {
  id: string;
  name: string;
  price?: number | null;
  unit?: string;
  description?: string;
  image?: string;
}

export interface MenuCategory {
  name: string;
  products: MenuProduct[];
}

export interface MenuData {
  meta: {
    brand: string;
    menu_type: string;
    notes: string[];
    contact: {
      phone: string;
      email: string;
      whatsapp: string;
      location: string;
      hours: string;
    };
  };
  packing_sizes: string[];
  categories: MenuCategory[];
  selections: {
    [key: string]: string[];
  };
}

// Category organization for better UI display
export const CATEGORY_GROUPS = {
  "Individual Items": ["Dry Fruit Sweets", "Ghee Sweets", "Milk Sweets", "Savouries"],
  "Premium Specials": ["Premium Cakes & Sweets", "Bites"],
  "Gift Collections": ["Assorted & Combo Gift Boxes", "Gift Box Packaging"]
};

export const DIWALI_MENU_DATA: MenuData = {
  "meta": {
    "brand": "Sri Nidhi Coimbatore",
    "menu_type": "Diwali Premium Collection",
    "notes": [
      "1/4 KG - 1/2 KG - 1 KG - Gift Box Available (Chargeable) | All items are subject to availability.",
      "₹ GST extra: 5% on Sweets & 5% on Savouries.",
      "Bulk orders: Special rates.",
      "Free delivery within Coimbatore on orders above ₹6000."
    ],
    "contact": {
      "phone": "8760101010",
      "email": "srinidhicatering10@gmail.com",
      "whatsapp": "8760101010",
      "location": "B 111, Manchester Grand, MG Road, Avarampalayam, Coimbatore, TN - 641004",
      "hours": "Mon–Sun: 8:00AM–11:00PM"
    }
  },
  "packing_sizes": ["1/4 KG", "1/2 KG", "1 KG"],
  "categories": [
    {
      "name": "Dry Fruit Sweets",
      "products": [
        {
          "id": "SN202501",
          "name": "Cashew Cake",
          "price": 1400,
          "unit": "kg",
          "description": "Premium cashew-based cake with rich, creamy texture",
          "image": "/lovable-uploads/cashew-cake.jpg"
        },
        {
          "id": "SN202502",
          "name": "Pista Roll",
          "price": 1400,
          "unit": "kg",
          "description": "Delicate pistachio rolls with authentic taste",
          "image": "/lovable-uploads/pista-roll.jpg"
        },
        {
          "id": "SN202503",
          "name": "Kaju Cassata",
          "price": 1400,
          "unit": "kg",
          "description": "Layered cashew dessert with exotic flavors",
          "image": "/lovable-uploads/kaju-cassata.jpg"
        },
        {
          "id": "SN202504",
          "name": "Fig Roll",
          "price": 1400,
          "unit": "kg",
          "description": "Sweet fig rolls with natural fruit flavors",
          "image": "/lovable-uploads/fig-roll.jpg"
        },
        {
          "id": "SN202505",
          "name": "Badam Halwa",
          "price": 1400,
          "unit": "kg",
          "description": "Rich almond halwa made with premium ingredients",
          "image": "/lovable-uploads/badam-halwa.jpg"
        },
        {
          "id": "SN202506",
          "name": "Strawberry Kaju Katli",
          "price": 1400,
          "unit": "kg",
          "description": "Traditional kaju katli with strawberry flavor",
          "image": "/lovable-uploads/strawberry-kaju-katli.jpg"
        }
      ]
    },
    {
      "name": "Ghee Sweets",
      "products": [
        {
          "id": "SN202507",
          "name": "Laddu",
          "price": 600,
          "unit": "kg",
          "description": "Traditional round sweets made with flour, ghee and sugar",
          "image": "/lovable-uploads/ladoo.png"
        },
        {
          "id": "SN202508",
          "name": "Mysurpa",
          "price": 600,
          "unit": "kg",
          "description": "Rich, buttery sweet from Karnataka made with ghee",
          "image": "/lovable-uploads/MysorePak.png"
        },
        {
          "id": "SN202509",
          "name": "Badusha",
          "price": 600,
          "unit": "kg",
          "description": "Flaky, layered sweet pastry soaked in sugar syrup",
          "image": "/lovable-uploads/badusha.jpg"
        },
        {
          "id": "SN202510",
          "name": "Bombay Halwa",
          "price": 600,
          "unit": "kg",
          "description": "Colorful, translucent sweet made with corn flour",
          "image": "/lovable-uploads/bombay_halwa.webp"
        },
        {
          "id": "SN202511",
          "name": "Spl. Laddu",
          "price": 650,
          "unit": "kg",
          "description": "Premium laddus made with pure ghee and finest ingredients",
          "image": "/lovable-uploads/ladoo.png"
        },
        {
          "id": "SN202512",
          "name": "Carrot Mysurpa",
          "price": 650,
          "unit": "kg",
          "description": "Traditional Mysore Pak enhanced with fresh carrots",
          "image": "/lovable-uploads/CarrotMysorePak.webp"
        },
        {
          "id": "SN202513",
          "name": "Soan Papdi",
          "price": 650,
          "unit": "kg",
          "description": "Flaky, crispy sweet with ghee and cardamom",
          "image": "/lovable-uploads/soan-papdi.jpg"
        },
        {
          "id": "SN202514",
          "name": "Dry Fruit Halwa",
          "price": 650,
          "unit": "kg",
          "description": "Rich halwa loaded with assorted dry fruits and ghee",
          "image": "/lovable-uploads/DryFruitHalwa"
        }
      ]
    },
    {
      "name": "Premium Cakes & Sweets",
      "products": [
        {
          "id": "SN202515",
          "name": "Badam Chocolate Cake",
          "price": null,
          "unit": "POA",
          "description": "Premium almond chocolate cake - Price on availability",
          "image": "/lovable-uploads/badam-chocolate-cake.jpg"
        },
        {
          "id": "SN202516",
          "name": "Kaju Gulkand Ball",
          "price": null,
          "unit": "POA",
          "description": "Cashew balls with rose petal preserve - Price on availability",
          "image": "/lovable-uploads/kaju-gulkand-ball.jpg"
        },
        {
          "id": "SN202517",
          "name": "Blueberry Kaju Cake",
          "price": null,
          "unit": "POA",
          "description": "Cashew cake with blueberry flavoring - Price on availability",
          "image": "/lovable-uploads/blueberry-kaju-cake.jpg"
        },
        {
          "id": "SN202518",
          "name": "Biscoff Kaju Cake",
          "price": null,
          "unit": "POA",
          "description": "Premium cashew cake with Biscoff flavor - Price on availability",
          "image": "/lovable-uploads/biscoff-kaju-cake.jpg"
        }
      ]
    },
    {
      "name": "Bites",
      "products": [
        {
          "id": "SN202519",
          "name": "Mewa Bites",
          "description": "Premium mixed dry fruit bites",
          "image": "/lovable-uploads/mewa-bites.jpg"
        },
        {
          "id": "SN202520",
          "name": "Rose Bites",
          "description": "Delicate rose-flavored bite-sized sweets",
          "image": "/lovable-uploads/rose-bites.jpg"
        },
        {
          "id": "SN202521",
          "name": "Orange Bites",
          "description": "Citrusy orange-flavored sweet bites",
          "image": "/lovable-uploads/orange-bites.jpg"
        },
        {
          "id": "SN202522",
          "name": "Mango Bites",
          "description": "Tropical mango-flavored sweet treats",
          "image": "/lovable-uploads/mango-bites.jpg"
        },
        {
          "id": "SN202523",
          "name": "Kesar Pista Bites",
          "description": "Saffron and pistachio flavored premium bites",
          "image": "/lovable-uploads/kesar-pista-bites.jpg"
        },
        {
          "id": "SN202524",
          "name": "Chocolate Bites",
          "description": "Rich chocolate flavored sweet bites",
          "image": "/lovable-uploads/chocolate-bites.jpg"
        },
        {
          "id": "SN202544",
          "name": "Premium Assorted Bites (12pcs)",
          "price": 499,
          "unit": "box",
          "description": "Premium bite-sized sweets collection - 12 pieces",
          "image": "/lovable-uploads/premium-bites-12.jpg"
        },
        {
          "id": "SN202545",
          "name": "Premium Assorted Bites (25pcs)",
          "price": 999,
          "unit": "box",
          "description": "Premium bite-sized sweets collection - 25 pieces",
          "image": "/lovable-uploads/premium-bites-25.jpg"
        }
      ]
    },
    {
      "name": "Milk Sweets",
      "products": [
        {
          "id": "SN202525",
          "name": "Gulkand Burfi",
          "price": 600,
          "unit": "kg",
          "description": "Rose petal preserve flavored milk fudge squares",
          "image": "/lovable-uploads/3f9c1eba-d27c-4ca8-bff6-452efdb026dd.png"
        },
        {
          "id": "SN202526",
          "name": "Dry Jamun",
          "price": 600,
          "unit": "kg",
          "description": "Traditional dried gulab jamun",
          "image": "/lovable-uploads/dry-jamun.jpg"
        },
        {
          "id": "SN202527",
          "name": "Chocolate Burfi",
          "price": 650,
          "unit": "kg",
          "description": "Rich chocolate flavored milk burfi",
          "image": "/lovable-uploads/chocolate-burfi.jpg"
        },
        {
          "id": "SN202528",
          "name": "Badam Mas Cake",
          "price": 650,
          "unit": "kg",
          "description": "Premium almond-based traditional cake",
          "image": "/lovable-uploads/badam-mas-cake.jpg"
        }
      ]
    },
    {
      "name": "Savouries",
      "products": [
        {
          "id": "SN202529",
          "name": "Classic Mixture",
          "price": 450,
          "unit": "kg",
          "description": "Traditional South Indian mixture with various ingredients",
          "image": "/lovable-uploads/classic-mixture.jpg"
        },
        {
          "id": "SN202530",
          "name": "Butter Murukku",
          "price": 450,
          "unit": "kg",
          "description": "Crispy spiral snacks made with butter",
          "image": "/lovable-uploads/butter-murukku.webp"
        },
        {
          "id": "SN202531",
          "name": "Ribbon Pakoda",
          "price": 450,
          "unit": "kg",
          "description": "Ribbon-shaped crispy savory snacks",
          "image": "/lovable-uploads/ribbon-pakoda.jpg"
        },
        {
          "id": "SN202532",
          "name": "Ragi Ribbon Pakoda",
          "price": 450,
          "unit": "kg",
          "description": "Healthy finger millet ribbon-shaped fritters",
          "image": "/lovable-uploads/RagiPakoda.jpg"
        }
      ]
    },
    {
      "name": "Gift Box Packaging",
      "products": [
        {
          "id": "SN202533",
          "name": "1/4kg Box",
          "price": 150,
          "description": "Premium gift box packaging for 1/4 kg sweets",
          "image": "/lovable-uploads/gift-box-quarter.jpg"
        },
        {
          "id": "SN202534",
          "name": "1/2kg Box",
          "price": 300,
          "description": "Premium gift box packaging for 1/2 kg sweets",
          "image": "/lovable-uploads/gift-box-half.jpg"
        },
        {
          "id": "SN202535",
          "name": "1kg Box",
          "price": 600,
          "description": "Premium gift box packaging for 1 kg sweets",
          "image": "/lovable-uploads/gift-box-full.jpg"
        }
      ]
    },
    {
      "name": "Assorted & Combo Gift Boxes",
      "products": [
        {
          "id": "SN202536",
          "name": "Royal Collection (1/4kg)",
          "price": 150,
          "description": "Royal selection: Laddu, Mysurpa, Badusha, Bombay Halwa, Gulkand Burfi, Dry Jamun - 1/4 kg",
          "image": "/lovable-uploads/royal-quarter.jpg"
        },
        {
          "id": "SN202537",
          "name": "Royal Collection (1/2kg)",
          "price": 300,
          "description": "Royal selection: Laddu, Mysurpa, Badusha, Bombay Halwa, Gulkand Burfi, Dry Jamun - 1/2 kg",
          "image": "/lovable-uploads/royal-half.jpg"
        },
        {
          "id": "SN202538",
          "name": "Royal Collection (1kg)",
          "price": 600,
          "description": "Royal selection: Laddu, Mysurpa, Badusha, Bombay Halwa, Gulkand Burfi, Dry Jamun - 1 kg",
          "image": "/lovable-uploads/royal-full.jpg"
        },
        {
          "id": "SN202539",
          "name": "Supreme Collection (1/4kg)",
          "price": 170,
          "description": "Supreme selection: Spl. Laddu, Carrot Mysurpa, Soan Papdi, Chocolate Burfi, Dry Fruit Halwa, Badam Mas Cake - 1/4 kg",
          "image": "/lovable-uploads/supreme-quarter.jpg"
        },
        {
          "id": "SN202540",
          "name": "Supreme Collection (1/2kg)",
          "price": 330,
          "description": "Supreme selection: Spl. Laddu, Carrot Mysurpa, Soan Papdi, Chocolate Burfi, Dry Fruit Halwa, Badam Mas Cake - 1/2 kg",
          "image": "/lovable-uploads/supreme-half.jpg"
        },
        {
          "id": "SN202541",
          "name": "Supreme Collection (1kg)",
          "price": 650,
          "description": "Supreme selection: Spl. Laddu, Carrot Mysurpa, Soan Papdi, Chocolate Burfi, Dry Fruit Halwa, Badam Mas Cake - 1 kg",
          "image": "/lovable-uploads/supreme-full.jpg"
        },
        {
          "id": "SN202542",
          "name": "Grandeur Collection (1/4kg)",
          "price": 350,
          "description": "Grandeur dry fruit selection: Cashew Cake, Pista Roll, Kaju Cassata, Fig Roll, Badam Halwa, Strawberry Kaju Katli - 1/4 kg",
          "image": "/lovable-uploads/grandeur-quarter.jpg"
        },
        {
          "id": "SN202543",
          "name": "Grandeur Collection (1/2kg)",
          "price": 700,
          "description": "Grandeur dry fruit selection: Cashew Cake, Pista Roll, Kaju Cassata, Fig Roll, Badam Halwa, Strawberry Kaju Katli - 1/2 kg",
          "image": "/lovable-uploads/grandeur-half.jpg"
        },
        {
          "id": "SN202546",
          "name": "Grandeur Collection (1kg)",
          "price": 1400,
          "description": "Grandeur dry fruit selection: Cashew Cake, Pista Roll, Kaju Cassata, Fig Roll, Badam Halwa, Strawberry Kaju Katli - 1 kg",
          "image": "/lovable-uploads/grandeur-full.jpg"
        },
        {
          "id": "SN202547",
          "name": "Premium Collection (12pcs)",
          "price": 600,
          "description": "Premium selection: Badam Chocolate Cake, Kaju Gulkand Ball, Blueberry Kaju Cake, Biscoff Kaju Cake - 12 pieces",
          "image": "/lovable-uploads/premium-12.jpg"
        },
        {
          "id": "SN202548",
          "name": "Premium Collection (25pcs)",
          "price": 1200,
          "description": "Premium selection: Badam Chocolate Cake, Kaju Gulkand Ball, Blueberry Kaju Cake, Biscoff Kaju Cake - 25 pieces",
          "image": "/lovable-uploads/premium-25.jpg"
        },
        {
          "id": "SN202549",
          "name": "Dry Fruits Gift Box",
          "price": 1199,
          "description": "Assorted premium dry fruits in elegant gift packaging",
          "image": "/lovable-uploads/dry-fruits-gift-box.jpg"
        }
      ]
    }
  ],
  "selections": {
    "Royal": {
      "items": ["Laddu", "Mysurpa", "Badusha", "Bombay Halwa", "Gulkand Burfi", "Dry Jamun"],
      "pricing": {
        "quarter_kg": 150,
        "half_kg": 300,
        "one_kg": 600
      }
    },
    "Supreme": {
      "items": ["Spl. Laddu", "Carrot Mysurpa", "Soan Papdi", "Chocolate Burfi", "Dry Fruit Halwa", "Badam Mas Cake"],
      "pricing": {
        "quarter_kg": 170,
        "half_kg": 330,
        "one_kg": 650
      }
    },
    "Grandeur": {
      "items": ["Cashew Cake", "Pista Roll", "Kaju Cassata", "Fig Roll", "Badam Halwa", "Strawberry Kaju Katli"],
      "pricing": {
        "quarter_kg": 350,
        "half_kg": 700,
        "one_kg": 1400
      }
    },
    "Premium": {
      "items": ["Badam Chocolate Cake", "Kaju Gulkand Ball", "Blueberry Kaju Cake", "Biscoff Kaju Cake"],
      "pricing": {
        "twelve_pcs": 600,
        "twenty_five_pcs": 1200
      }
    },
    "Bites": {
      "items": ["Mewa Bites", "Rose Bites", "Orange Bites", "Mango Bites", "Kesar Pista Bites", "Chocolate Bites"],
      "pricing": {
        "twelve_pcs": 499,
        "twenty_five_pcs": 999
      }
    }
  }
};

// Helper function to get product by ID with pricing validation
export const getProductById = (id: string): MenuProduct | null => {
  for (const category of DIWALI_MENU_DATA.categories) {
    const product = category.products.find(p => p.id === id);
    if (product) {
      return product;
    }
  }
  return null;
};

// Helper function to get all products from specific categories
export const getProductsByCategory = (categoryName: string): MenuProduct[] => {
  const category = DIWALI_MENU_DATA.categories.find(cat => cat.name === categoryName);
  return category ? category.products : [];
};

// Helper function to calculate price with GST (backend-safe)
export const calculateProductPrice = (productId: string, quantity: number = 1) => {
  const product = getProductById(productId);
  if (!product || !product.price) {
    return null;
  }

  const basePrice = product.price;
  const isSavoury = DIWALI_MENU_DATA.categories
    .find(cat => cat.name === "Savouries")
    ?.products.some(p => p.id === productId);
  
  const gstRate = isSavoury ? 5 : 5; // Both are 5% as per new data
  const gstAmount = (basePrice * gstRate) / 100;
  const finalPrice = basePrice + gstAmount;

  return {
    basePrice,
    gstRate,
    gstAmount: Math.round(gstAmount * quantity),
    totalBeforeGst: basePrice * quantity,
    finalPrice: Math.round(finalPrice * quantity),
    quantity
  };
};