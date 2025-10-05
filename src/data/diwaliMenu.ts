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
          "id": "SN202501-250g",
          "name": "Cashew Cake (1/4kg)",
          "price": 350,
          "unit": "250g",
          "description": "Premium cashew-based cake with rich, creamy texture - 1/4 kg",
          "image": "/lovable-uploads/CashewCake.webp"
        },
        {
          "id": "SN202501-500g",
          "name": "Cashew Cake (1/2kg)",
          "price": 700,
          "unit": "500g",
          "description": "Premium cashew-based cake with rich, creamy texture - 1/2 kg",
          "image": "/lovable-uploads/CashewCake.webp"
        },
        {
          "id": "SN202501",
          "name": "Cashew Cake (1kg)",
          "price": 1400,
          "unit": "kg",
          "description": "Premium cashew-based cake with rich, creamy texture - 1 kg",
          "image": "/lovable-uploads/CashewCake.webp"
        },
        {
          "id": "SN202502-250g",
          "name": "Pista Roll (1/4kg)",
          "price": 350,
          "unit": "250g",
          "description": "Delicate pistachio rolls with authentic taste - 1/4 kg",
          "image": "/lovable-uploads/pista-roll.png"
        },
        {
          "id": "SN202502-500g",
          "name": "Pista Roll (1/2kg)",
          "price": 700,
          "unit": "500g",
          "description": "Delicate pistachio rolls with authentic taste - 1/2 kg",
          "image": "/lovable-uploads/pista-roll.png"
        },
        {
          "id": "SN202502",
          "name": "Pista Roll (1kg)",
          "price": 1400,
          "unit": "kg",
          "description": "Delicate pistachio rolls with authentic taste - 1 kg",
          "image": "/lovable-uploads/pista-roll.png"
        },
        {
          "id": "SN202503-250g",
          "name": "Kaju Cassata (1/4kg)",
          "price": 350,
          "unit": "250g",
          "description": "Layered cashew dessert with exotic flavors - 1/4 kg",
          "image": "/lovable-uploads/kaju-katli.png"
        },
        {
          "id": "SN202503-500g",
          "name": "Kaju Cassata (1/2kg)",
          "price": 700,
          "unit": "500g",
          "description": "Layered cashew dessert with exotic flavors - 1/2 kg",
          "image": "/lovable-uploads/kaju-katli.png"
        },
        {
          "id": "SN202503",
          "name": "Kaju Cassata (1kg)",
          "price": 1400,
          "unit": "kg",
          "description": "Layered cashew dessert with exotic flavors - 1 kg",
          "image": "/lovable-uploads/kaju-katli.png"
        },
        {
          "id": "SN202504-250g",
          "name": "Fig Roll (1/4kg)",
          "price": 350,
          "unit": "250g",
          "description": "Sweet fig rolls with natural fruit flavors - 1/4 kg",
          "image": "/figroll.png"
        },
        {
          "id": "SN202504-500g",
          "name": "Fig Roll (1/2kg)",
          "price": 700,
          "unit": "500g",
          "description": "Sweet fig rolls with natural fruit flavors - 1/2 kg",
          "image": "/figroll.png"
        },
        {
          "id": "SN202504",
          "name": "Fig Roll (1kg)",
          "price": 1400,
          "unit": "kg",
          "description": "Sweet fig rolls with natural fruit flavors - 1 kg",
          "image": "/figroll.png"
        },
        {
          "id": "SN202505-250g",
          "name": "Badam Halwa (1/4kg)",
          "price": 350,
          "unit": "250g",
          "description": "Rich almond halwa made with premium ingredients - 1/4 kg",
          "image": "/lovable-uploads/coconut-burfi.png"
        },
        {
          "id": "SN202505-500g",
          "name": "Badam Halwa (1/2kg)",
          "price": 700,
          "unit": "500g",
          "description": "Rich almond halwa made with premium ingredients - 1/2 kg",
          "image": "/lovable-uploads/coconut-burfi.png"
        },
        {
          "id": "SN202505",
          "name": "Badam Halwa (1kg)",
          "price": 1400,
          "unit": "kg",
          "description": "Rich almond halwa made with premium ingredients - 1 kg",
          "image": "/lovable-uploads/coconut-burfi.png"
        },
        {
          "id": "SN202506-250g",
          "name": "Strawberry Kaju Katli (1/4kg)",
          "price": 350,
          "unit": "250g",
          "description": "Traditional kaju katli with strawberry flavor - 1/4 kg",
          "image": "/lovable-uploads/Strawberry-pista-Roll.webp"
        },
        {
          "id": "SN202506-500g",
          "name": "Strawberry Kaju Katli (1/2kg)",
          "price": 700,
          "unit": "500g",
          "description": "Traditional kaju katli with strawberry flavor - 1/2 kg",
          "image": "/lovable-uploads/Strawberry-pista-Roll.webp"
        },
        {
          "id": "SN202506",
          "name": "Strawberry Kaju Katli (1kg)",
          "price": 1400,
          "unit": "kg",
          "description": "Traditional kaju katli with strawberry flavor - 1 kg",
          "image": "/lovable-uploads/Strawberry-pista-Roll.webp"
        }
      ]
    },
    {
      "name": "Ghee Sweets",
      "products": [
        {
          "id": "SN202507-250g",
          "name": "Laddu (1/4kg)",
          "price": 150,
          "unit": "250g",
          "description": "Traditional round sweets made with flour, ghee and sugar - 1/4 kg",
          "image": "/lovable-uploads/ladoo.png"
        },
        {
          "id": "SN202507-500g",
          "name": "Laddu (1/2kg)",
          "price": 300,
          "unit": "500g",
          "description": "Traditional round sweets made with flour, ghee and sugar - 1/2 kg",
          "image": "/lovable-uploads/ladoo.png"
        },
        {
          "id": "SN202507",
          "name": "Laddu (1kg)",
          "price": 600,
          "unit": "kg",
          "description": "Traditional round sweets made with flour, ghee and sugar - 1 kg",
          "image": "/lovable-uploads/ladoo.png"
        },
        {
          "id": "SN202508-250g",
          "name": "Mysurpa (1/4kg)",
          "price": 150,
          "unit": "250g",
          "description": "Rich, buttery sweet from Karnataka made with ghee - 1/4 kg",
          "image": "/lovable-uploads/MysorePak.png"
        },
        {
          "id": "SN202508-500g",
          "name": "Mysurpa (1/2kg)",
          "price": 300,
          "unit": "500g",
          "description": "Rich, buttery sweet from Karnataka made with ghee - 1/2 kg",
          "image": "/lovable-uploads/MysorePak.png"
        },
        {
          "id": "SN202508",
          "name": "Mysurpa (1kg)",
          "price": 600,
          "unit": "kg",
          "description": "Rich, buttery sweet from Karnataka made with ghee - 1 kg",
          "image": "/lovable-uploads/MysorePak.png"
        },
        {
          "id": "SN202509-250g",
          "name": "Badusha (1/4kg)",
          "price": 150,
          "unit": "250g",
          "description": "Flaky, layered sweet pastry soaked in sugar syrup - 1/4 kg",
          "image": "/lovable-uploads/badusha.jpg"
        },
        {
          "id": "SN202509-500g",
          "name": "Badusha (1/2kg)",
          "price": 300,
          "unit": "500g",
          "description": "Flaky, layered sweet pastry soaked in sugar syrup - 1/2 kg",
          "image": "/lovable-uploads/badusha.jpg"
        },
        {
          "id": "SN202509",
          "name": "Badusha (1kg)",
          "price": 600,
          "unit": "kg",
          "description": "Flaky, layered sweet pastry soaked in sugar syrup - 1 kg",
          "image": "/lovable-uploads/badusha.jpg"
        },
        {
          "id": "SN202510-250g",
          "name": "Bombay Halwa (1/4kg)",
          "price": 150,
          "unit": "250g",
          "description": "Colorful, translucent sweet made with corn flour - 1/4 kg",
          "image": "/lovable-uploads/bombay_halwa.webp"
        },
        {
          "id": "SN202510-500g",
          "name": "Bombay Halwa (1/2kg)",
          "price": 300,
          "unit": "500g",
          "description": "Colorful, translucent sweet made with corn flour - 1/2 kg",
          "image": "/lovable-uploads/bombay_halwa.webp"
        },
        {
          "id": "SN202510",
          "name": "Bombay Halwa (1kg)",
          "price": 600,
          "unit": "kg",
          "description": "Colorful, translucent sweet made with corn flour - 1 kg",
          "image": "/lovable-uploads/bombay_halwa.webp"
        },
        {
          "id": "SN202511-250g",
          "name": "Spl. Laddu (1/4kg)",
          "price": 163,
          "unit": "250g",
          "description": "Premium laddus made with pure ghee and finest ingredients - 1/4 kg",
          "image": "/lovable-uploads/ladoo.png"
        },
        {
          "id": "SN202511-500g",
          "name": "Spl. Laddu (1/2kg)",
          "price": 325,
          "unit": "500g",
          "description": "Premium laddus made with pure ghee and finest ingredients - 1/2 kg",
          "image": "/lovable-uploads/ladoo.png"
        },
        {
          "id": "SN202511",
          "name": "Spl. Laddu (1kg)",
          "price": 650,
          "unit": "kg",
          "description": "Premium laddus made with pure ghee and finest ingredients - 1 kg",
          "image": "/lovable-uploads/ladoo.png"
        },
        {
          "id": "SN202512-250g",
          "name": "Carrot Mysurpa (1/4kg)",
          "price": 163,
          "unit": "250g",
          "description": "Traditional Mysore Pak enhanced with fresh carrots - 1/4 kg",
          "image": "/lovable-uploads/CarrotMysorePak.webp"
        },
        {
          "id": "SN202512-500g",
          "name": "Carrot Mysurpa (1/2kg)",
          "price": 325,
          "unit": "500g",
          "description": "Traditional Mysore Pak enhanced with fresh carrots - 1/2 kg",
          "image": "/lovable-uploads/CarrotMysorePak.webp"
        },
        {
          "id": "SN202512",
          "name": "Carrot Mysurpa (1kg)",
          "price": 650,
          "unit": "kg",
          "description": "Traditional Mysore Pak enhanced with fresh carrots - 1 kg",
          "image": "/lovable-uploads/CarrotMysorePak.webp"
        },
        {
          "id": "SN202513-250g",
          "name": "Soan Papdi (1/4kg)",
          "price": 163,
          "unit": "250g",
          "description": "Flaky, crispy sweet with ghee and cardamom - 1/4 kg",
          "image": "/lovable-uploads/soan-papdi.png"
        },
        {
          "id": "SN202513-500g",
          "name": "Soan Papdi (1/2kg)",
          "price": 325,
          "unit": "500g",
          "description": "Flaky, crispy sweet with ghee and cardamom - 1/2 kg",
          "image": "/lovable-uploads/soan-papdi.png"
        },
        {
          "id": "SN202513",
          "name": "Soan Papdi (1kg)",
          "price": 650,
          "unit": "kg",
          "description": "Flaky, crispy sweet with ghee and cardamom - 1 kg",
          "image": "/lovable-uploads/soan-papdi.png"
        },
        {
          "id": "SN202514-250g",
          "name": "Dry Fruit Halwa (1/4kg)",
          "price": 163,
          "unit": "250g",
          "description": "Rich halwa loaded with assorted dry fruits and ghee - 1/4 kg",
          "image": "/dryfruitHalwa.png"
        },
        {
          "id": "SN202514-500g",
          "name": "Dry Fruit Halwa (1/2kg)",
          "price": 325,
          "unit": "500g",
          "description": "Rich halwa loaded with assorted dry fruits and ghee - 1/2 kg",
          "image": "/dryfruitHalwa.png"
        },
        {
          "id": "SN202514",
          "name": "Dry Fruit Halwa (1kg)",
          "price": 650,
          "unit": "kg",
          "description": "Rich halwa loaded with assorted dry fruits and ghee - 1 kg",
          "image": "/dryfruitHalwa.png"
        }
      ]
    },
    {
      "name": "Premium Cakes & Sweets",
      "products": [
        {
          "id": "SN202515",
          "name": "Badam Chocolate Cake",
          "description": "Premium almond chocolate cake",
          "image": "/mysore-pak.png"
        },
        {
          "id": "SN202516",
          "name": "Kaju Gulkand Ball",
          "description": "Cashew balls with rose petal preserve",
          "image": "/lovable-uploads/gulkand-ball.jpg"
        },
        {
          "id": "SN202517",
          "name": "Blueberry Kaju Cake",
          "description": "Cashew cake with blueberry flavoring",
          "image": "/rasgulla.png"
        },
        {
          "id": "SN202518",
          "name": "Biscoff Kaju Cake",
          "description": "Premium cashew cake with Biscoff flavor",
          "image": "/lovable-uploads/coconut-burfi.png"
        }
      ]
    },
    {
      "name": "Bites",
      "products": [
        {
          "id": "SN202549",
          "name": "Dry Fruits Gift Box",
          "price": 1199,
          "unit": "box",
          "description": "Premium gift box with assorted dry fruits and sweets",
          "image": "/lovable-uploads/soan-papdi.png"
        }
      ]
    },
    {
      "name": "Milk Sweets",
      "products": [
        {
          "id": "SN202525-250g",
          "name": "Gulkand Burfi (1/4kg)",
          "price": 150,
          "unit": "250g",
          "description": "Rose petal preserve flavored milk fudge squares - 1/4 kg",
          "image": "/lovable-uploads/3f9c1eba-d27c-4ca8-bff6-452efdb026dd.png"
        },
        {
          "id": "SN202525-500g",
          "name": "Gulkand Burfi (1/2kg)",
          "price": 300,
          "unit": "500g",
          "description": "Rose petal preserve flavored milk fudge squares - 1/2 kg",
          "image": "/lovable-uploads/3f9c1eba-d27c-4ca8-bff6-452efdb026dd.png"
        },
        {
          "id": "SN202525",
          "name": "Gulkand Burfi (1kg)",
          "price": 600,
          "unit": "kg",
          "description": "Rose petal preserve flavored milk fudge squares - 1 kg",
          "image": "/lovable-uploads/3f9c1eba-d27c-4ca8-bff6-452efdb026dd.png"
        },
        {
          "id": "SN202526-250g",
          "name": "Dry Jamun (1/4kg)",
          "price": 150,
          "unit": "250g",
          "description": "Traditional dried gulab jamun - 1/4 kg",
          "image": "/gulab-jamun.png"
        },
        {
          "id": "SN202526-500g",
          "name": "Dry Jamun (1/2kg)",
          "price": 300,
          "unit": "500g",
          "description": "Traditional dried gulab jamun - 1/2 kg",
          "image": "/gulab-jamun.png"
        },
        {
          "id": "SN202526",
          "name": "Dry Jamun (1kg)",
          "price": 600,
          "unit": "kg",
          "description": "Traditional dried gulab jamun - 1 kg",
          "image": "/gulab-jamun.png"
        },
        {
          "id": "SN202527-250g",
          "name": "Chocolate Burfi (1/4kg)",
          "price": 163,
          "unit": "250g",
          "description": "Rich chocolate burfi with premium cocoa - 1/4 kg",
          "image": "/lovable-uploads/coconut-burfi.png"
        },
        {
          "id": "SN202527-500g",
          "name": "Chocolate Burfi (1/2kg)",
          "price": 325,
          "unit": "500g",
          "description": "Rich chocolate burfi with premium cocoa - 1/2 kg",
          "image": "/lovable-uploads/coconut-burfi.png"
        },
        {
          "id": "SN202527",
          "name": "Chocolate Burfi (1kg)",
          "price": 650,
          "unit": "kg",
          "description": "Rich chocolate burfi with premium cocoa - 1 kg",
          "image": "/lovable-uploads/coconut-burfi.png"
        },
        {
          "id": "SN202528-250g",
          "name": "Badam Mas Cake (1/4kg)",
          "price": 163,
          "unit": "250g",
          "description": "Premium almond-based traditional cake - 1/4 kg",
          "image": "/lovable-uploads/CashewCake.webp"
        },
        {
          "id": "SN202528-500g",
          "name": "Badam Mas Cake (1/2kg)",
          "price": 325,
          "unit": "500g",
          "description": "Premium almond-based traditional cake - 1/2 kg",
          "image": "/lovable-uploads/CashewCake.webp"
        },
        {
          "id": "SN202528",
          "name": "Badam Mas Cake (1kg)",
          "price": 650,
          "unit": "kg",
          "description": "Premium almond-based traditional cake - 1 kg",
          "image": "/lovable-uploads/CashewCake.webp"
        }
      ]
    },
    {
      "name": "Savouries",
      "products": [
        {
          "id": "SN202529-250g",
          "name": "Classic Mixture (1/4kg)",
          "price": 113,
          "unit": "250g",
          "description": "Traditional South Indian mixture with various ingredients - 1/4 kg",
          "image": "/lovable-uploads/ribbon-pakoda.jpg"
        },
        {
          "id": "SN202529-500g",
          "name": "Classic Mixture (1/2kg)",
          "price": 225,
          "unit": "500g",
          "description": "Traditional South Indian mixture with various ingredients - 1/2 kg",
          "image": "/lovable-uploads/ribbon-pakoda.jpg"
        },
        {
          "id": "SN202529",
          "name": "Classic Mixture (1kg)",
          "price": 450,
          "unit": "kg",
          "description": "Traditional South Indian mixture with various ingredients - 1 kg",
          "image": "/lovable-uploads/ribbon-pakoda.jpg"
        },
        {
          "id": "SN202530-250g",
          "name": "Butter Murukku (1/4kg)",
          "price": 113,
          "unit": "250g",
          "description": "Crispy spiral snacks made with butter - 1/4 kg",
          "image": "/lovable-uploads/butter-murukku.webp"
        },
        {
          "id": "SN202530-500g",
          "name": "Butter Murukku (1/2kg)",
          "price": 225,
          "unit": "500g",
          "description": "Crispy spiral snacks made with butter - 1/2 kg",
          "image": "/lovable-uploads/butter-murukku.webp"
        },
        {
          "id": "SN202530",
          "name": "Butter Murukku (1kg)",
          "price": 450,
          "unit": "kg",
          "description": "Crispy spiral snacks made with butter - 1 kg",
          "image": "/lovable-uploads/butter-murukku.webp"
        },
        {
          "id": "SN202531-250g",
          "name": "Ribbon Pakoda (1/4kg)",
          "price": 113,
          "unit": "250g",
          "description": "Ribbon-shaped crispy savory snacks - 1/4 kg",
          "image": "/lovable-uploads/ribbon-pakoda.jpg"
        },
        {
          "id": "SN202531-500g",
          "name": "Ribbon Pakoda (1/2kg)",
          "price": 225,
          "unit": "500g",
          "description": "Ribbon-shaped crispy savory snacks - 1/2 kg",
          "image": "/lovable-uploads/ribbon-pakoda.jpg"
        },
        {
          "id": "SN202531",
          "name": "Ribbon Pakoda (1kg)",
          "price": 450,
          "unit": "kg",
          "description": "Ribbon-shaped crispy savory snacks - 1 kg",
          "image": "/lovable-uploads/ribbon-pakoda.jpg"
        },
        {
          "id": "SN202532-250g",
          "name": "Ragi Ribbon Pakoda (1/4kg)",
          "price": 113,
          "unit": "250g",
          "description": "Healthy finger millet ribbon-shaped fritters - 1/4 kg",
          "image": "/lovable-uploads/RagiPakoda.jpg"
        },
        {
          "id": "SN202532-500g",
          "name": "Ragi Ribbon Pakoda (1/2kg)",
          "price": 225,
          "unit": "500g",
          "description": "Healthy finger millet ribbon-shaped fritters - 1/2 kg",
          "image": "/lovable-uploads/RagiPakoda.jpg"
        },
        {
          "id": "SN202532",
          "name": "Ragi Ribbon Pakoda (1kg)",
          "price": 450,
          "unit": "kg",
          "description": "Healthy finger millet ribbon-shaped fritters - 1 kg",
          "image": "/lovable-uploads/RagiPakoda.jpg"
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
          "image": "/royal.png"
        },
        {
          "id": "SN202537",
          "name": "Royal Collection (1/2kg)",
          "price": 300,
          "description": "Royal selection: Laddu, Mysurpa, Badusha, Bombay Halwa, Gulkand Burfi, Dry Jamun - 1/2 kg",
          "image": "/royal.png"
        },
        {
          "id": "SN202538",
          "name": "Royal Collection (1kg)",
          "price": 600,
          "description": "Royal selection: Laddu, Mysurpa, Badusha, Bombay Halwa, Gulkand Burfi, Dry Jamun - 1 kg",
          "image": "/royal.png"
        },
        {
          "id": "SN202539",
          "name": "Supreme Collection (1/4kg)",
          "price": 170,
          "description": "Supreme selection: Spl. Laddu, Carrot Mysurpa, Soan Papdi, Chocolate Burfi, Dry Fruit Halwa, Badam Mas Cake - 1/4 kg",
          "image": "/supreme.png"
        },
        {
          "id": "SN202540",
          "name": "Supreme Collection (1/2kg)",
          "price": 330,
          "description": "Supreme selection: Spl. Laddu, Carrot Mysurpa, Soan Papdi, Chocolate Burfi, Dry Fruit Halwa, Badam Mas Cake - 1/2 kg",
          "image": "/supreme.png"
        },
        {
          "id": "SN202541",
          "name": "Supreme Collection (1kg)",
          "price": 650,
          "description": "Supreme selection: Spl. Laddu, Carrot Mysurpa, Soan Papdi, Chocolate Burfi, Dry Fruit Halwa, Badam Mas Cake - 1 kg",
          "image": "/supreme.png"
        },
        {
          "id": "SN202542",
          "name": "Grandeur Collection (1/4kg)",
          "price": 350,
          "description": "Grandeur dry fruit selection: Cashew Cake, Pista Roll, Kaju Cassata, Fig Roll, Badam Halwa, Strawberry Kaju Katli - 1/4 kg",
          "image": "/grandeur.png"
        },
        {
          "id": "SN202543",
          "name": "Grandeur Collection (1/2kg)",
          "price": 700,
          "description": "Grandeur dry fruit selection: Cashew Cake, Pista Roll, Kaju Cassata, Fig Roll, Badam Halwa, Strawberry Kaju Katli - 1/2 kg",
          "image": "/grandeur.png"
        },
        {
          "id": "SN202546",
          "name": "Grandeur Collection (1kg)",
          "price": 1400,
          "description": "Grandeur dry fruit selection: Cashew Cake, Pista Roll, Kaju Cassata, Fig Roll, Badam Halwa, Strawberry Kaju Katli - 1 kg",
          "image": "/grandeur.png"
        },
        {
          "id": "SN202544",
          "name": "Premium Assorted Bites (12pcs)",
          "price": 499,
          "unit": "box",
          "description": "Delicious assorted premium bite-sized sweets - perfect for gifting",
          "image": "/premiumbites.png"
        },
        {
          "id": "SN202545",
          "name": "Premium Assorted Bites (25pcs)",
          "price": 999,
          "unit": "box",
          "description": "Delicious assorted premium bite-sized sweets - perfect for gifting",
          "image": "/premiumbites.png"
        },
        {
          "id": "SN202547",
          "name": "Premium Collection (12pcs)",
          "price": 600,
          "unit": "box",
          "description": "Premium selection: Badam Chocolate Cake, Kaju Gulkand Ball, Blueberry Kaju Cake, Biscoff Kaju Cake - 12 pieces",
          "image": "/lovable-uploads/90e0608c-b5fa-480e-9dfa-0a8173cd3f7e.png"
        },
        {
          "id": "SN202548",
          "name": "Premium Collection (25pcs)",
          "price": 1200,
          "unit": "box",
          "description": "Premium selection: Badam Chocolate Cake, Kaju Gulkand Ball, Blueberry Kaju Cake, Biscoff Kaju Cake - 25 pieces",
          "image": "/lovable-uploads/soan-papdi.png"
        }

      ]
    }
  ],
  "selections": {
    "Royal": ["Laddu", "Mysurpa", "Badusha", "Bombay Halwa", "Gulkand Burfi", "Dry Jamun"],
    "Supreme": ["Spl. Laddu", "Carrot Mysurpa", "Soan Papdi", "Chocolate Burfi", "Dry Fruit Halwa", "Badam Mas Cake"],
    "Grandeur": ["Cashew Cake", "Pista Roll", "Kaju Cassata", "Fig Roll", "Badam Halwa", "Strawberry Kaju Katli"],
    "Premium": ["Badam Chocolate Cake", "Kaju Gulkand Ball", "Blueberry Kaju Cake", "Biscoff Kaju Cake"],
    "Premium Assorted": ["Mewa Bites", "Rose Bites", "Orange Bites", "Mango Bites", "Kesar Pista Bites", "Chocolate Bites"]
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