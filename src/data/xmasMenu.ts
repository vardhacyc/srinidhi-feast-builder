// Christmas, Thanksgiving & New Year Premium Collection Menu Data
// Exotic International Sweets & Festive Treats

export interface XmasSweet {
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
  origin: string;
}

export const xmasSweetItems: XmasSweet[] = [
  {
    id: "xmas-001",
    name: "Belgian Chocolate Truffles",
    description: "Handcrafted Belgian dark chocolate truffles with rich ganache center",
    price: 899,
    originalPrice: 1099,
    image: "https://images.unsplash.com/photo-1548848864-09b365b6e72c?w=800&q=80",
    specialty: "Premium Collection • Imported Cocoa",
    premium: true,
    stockLeft: 8,
    rating: 4.9,
    category: "Chocolate Delights",
    tastingNotes: ["Rich dark chocolate", "Smooth ganache", "Velvety finish"],
    origin: "Belgium"
  },
  {
    id: "xmas-002",
    name: "French Macarons Collection",
    description: "Assorted flavors of delicate French macarons with buttercream filling",
    price: 799,
    originalPrice: 999,
    image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=800&q=80",
    specialty: "Handmade • 12 Flavors",
    premium: true,
    stockLeft: 12,
    rating: 4.9,
    category: "French Patisserie",
    tastingNotes: ["Almond meringue", "Buttercream center", "Crispy shell"],
    origin: "France"
  },
  {
    id: "xmas-003",
    name: "Italian Tiramisu Cups",
    description: "Classic Italian dessert with coffee-soaked ladyfingers and mascarpone",
    price: 649,
    originalPrice: 799,
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=80",
    specialty: "Authentic Recipe • Fresh Coffee",
    premium: true,
    stockLeft: 10,
    rating: 4.8,
    category: "Italian Classics",
    tastingNotes: ["Espresso infusion", "Creamy mascarpone", "Cocoa dusting"],
    origin: "Italy"
  },
  {
    id: "xmas-004",
    name: "Turkish Baklava",
    description: "Layers of phyllo pastry with pistachios and honey syrup",
    price: 599,
    originalPrice: 749,
    image: "https://images.unsplash.com/photo-1519676867240-f03562e64548?w=800&q=80",
    specialty: "Traditional • Pistachio Rich",
    premium: true,
    stockLeft: 15,
    rating: 4.8,
    category: "Middle Eastern",
    tastingNotes: ["Flaky pastry", "Pure honey", "Pistachio crunch"],
    origin: "Turkey"
  },
  {
    id: "xmas-005",
    name: "Spanish Churros with Chocolate",
    description: "Crispy fried dough sticks served with thick Spanish hot chocolate",
    price: 449,
    originalPrice: 549,
    image: "https://images.unsplash.com/photo-1561657043-5e726df9f8f6?w=800&q=80",
    specialty: "Fresh Made • Cinnamon Sugar",
    premium: false,
    stockLeft: 20,
    rating: 4.7,
    category: "Spanish Treats",
    tastingNotes: ["Crispy exterior", "Soft inside", "Rich chocolate"],
    origin: "Spain"
  },
  {
    id: "xmas-006",
    name: "Japanese Mochi Assortment",
    description: "Soft rice cakes filled with sweet red bean paste and ice cream",
    price: 749,
    originalPrice: 899,
    image: "https://images.unsplash.com/photo-1582716401301-b2407dc7563d?w=800&q=80",
    specialty: "Premium • 6 Flavors",
    premium: true,
    stockLeft: 14,
    rating: 4.8,
    category: "Asian Fusion",
    tastingNotes: ["Chewy texture", "Sweet bean paste", "Ice cream center"],
    origin: "Japan"
  },
  {
    id: "xmas-007",
    name: "Swiss Chocolate Fondue Set",
    description: "Premium Swiss chocolate with fresh fruits and marshmallows",
    price: 999,
    originalPrice: 1199,
    image: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=800&q=80",
    specialty: "Interactive Dessert • Premium Chocolate",
    premium: true,
    stockLeft: 6,
    rating: 4.9,
    category: "Chocolate Delights",
    tastingNotes: ["Silky chocolate", "Fresh fruits", "Gourmet experience"],
    origin: "Switzerland"
  },
  {
    id: "xmas-008",
    name: "Austrian Sachertorte",
    description: "Classic Viennese chocolate cake with apricot jam and chocolate glaze",
    price: 899,
    originalPrice: 1099,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80",
    specialty: "Authentic Recipe • Premium Apricot",
    premium: true,
    stockLeft: 8,
    rating: 4.9,
    category: "European Cakes",
    tastingNotes: ["Dense chocolate", "Apricot tang", "Dark chocolate glaze"],
    origin: "Austria"
  },
  {
    id: "xmas-009",
    name: "Greek Loukoumades",
    description: "Honey puffs with cinnamon, walnuts, and chocolate drizzle",
    price: 399,
    originalPrice: 499,
    image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=800&q=80",
    specialty: "Traditional • Freshly Fried",
    premium: false,
    stockLeft: 22,
    rating: 4.7,
    category: "Mediterranean",
    tastingNotes: ["Fluffy dough", "Honey sweetness", "Walnut crunch"],
    origin: "Greece"
  },
  {
    id: "xmas-010",
    name: "American Red Velvet Cupcakes",
    description: "Classic red velvet with cream cheese frosting and festive decorations",
    price: 549,
    originalPrice: 649,
    image: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=800&q=80",
    specialty: "Holiday Special • Cream Cheese Frosting",
    premium: false,
    stockLeft: 18,
    rating: 4.8,
    category: "American Classics",
    tastingNotes: ["Velvety texture", "Tangy frosting", "Festive decoration"],
    origin: "USA"
  },
  {
    id: "xmas-011",
    name: "Brazilian Brigadeiros",
    description: "Chocolate fudge balls rolled in sprinkles, a Brazilian favorite",
    price: 449,
    originalPrice: 549,
    image: "https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=800&q=80",
    specialty: "Traditional • Handrolled",
    premium: false,
    stockLeft: 25,
    rating: 4.7,
    category: "South American",
    tastingNotes: ["Fudgy chocolate", "Sweet condensed milk", "Decorative sprinkles"],
    origin: "Brazil"
  },
  {
    id: "xmas-012",
    name: "French Crème Brûlée",
    description: "Classic custard dessert with caramelized sugar crust",
    price: 599,
    originalPrice: 749,
    image: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=800&q=80",
    specialty: "Premium • Vanilla Bean",
    premium: true,
    stockLeft: 12,
    rating: 4.9,
    category: "French Patisserie",
    tastingNotes: ["Silky custard", "Vanilla bean", "Caramel crack"],
    origin: "France"
  },
  {
    id: "xmas-013",
    name: "Italian Cannoli",
    description: "Crispy pastry shells filled with sweet ricotta and chocolate chips",
    price: 549,
    originalPrice: 649,
    image: "https://images.unsplash.com/photo-1534432586870-32ab18ceea8a?w=800&q=80",
    specialty: "Sicilian Style • Fresh Ricotta",
    premium: false,
    stockLeft: 16,
    rating: 4.8,
    category: "Italian Classics",
    tastingNotes: ["Crispy shell", "Creamy ricotta", "Chocolate chips"],
    origin: "Italy"
  },
  {
    id: "xmas-014",
    name: "British Christmas Pudding",
    description: "Traditional steamed pudding with dried fruits, spices, and brandy",
    price: 799,
    originalPrice: 999,
    image: "https://images.unsplash.com/photo-1482487088693-519e5bd723c9?w=800&q=80",
    specialty: "Holiday Classic • Brandy Flambé",
    premium: true,
    stockLeft: 9,
    rating: 4.8,
    category: "British Traditions",
    tastingNotes: ["Spiced fruits", "Brandy warmth", "Rich texture"],
    origin: "United Kingdom"
  },
  {
    id: "xmas-015",
    name: "German Stollen",
    description: "Traditional German Christmas bread with marzipan, nuts, and dried fruits",
    price: 699,
    originalPrice: 849,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&q=80",
    specialty: "Christmas Special • Marzipan Center",
    premium: true,
    stockLeft: 11,
    rating: 4.8,
    category: "German Bakery",
    tastingNotes: ["Fruity bread", "Marzipan core", "Powdered sugar"],
    origin: "Germany"
  }
];

export const xmasCategories = [
  "All",
  "Premium",
  "Chocolate Delights",
  "French Patisserie",
  "Italian Classics",
  "European Cakes",
  "Asian Fusion"
];

export const xmasTestimonials = [
  {
    name: "Sarah Williams",
    location: "Coimbatore",
    rating: 5,
    text: "Absolutely divine! The French macarons were perfect for our Christmas party. Everyone loved them!",
    item: "French Macarons Collection"
  },
  {
    name: "Michael Chen",
    location: "Chennai",
    rating: 5,
    text: "Best exotic sweets I've had in India! The Belgian truffles were authentic and delicious.",
    item: "Belgian Chocolate Truffles"
  },
  {
    name: "Priya Reddy",
    location: "Bangalore",
    rating: 5,
    text: "Made our New Year celebration extra special. The variety and quality are outstanding!",
    item: "Premium Gift Collection"
  }
];
