import { useState } from 'react';
import { ArrowLeft, Check, Send, ChevronDown, ChevronUp, Utensils, Coffee, Cake, Leaf, Sun, Moon, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface MenuItem {
    id: string;
    name: string;
    nameTamil?: string;
}

interface MenuCategory {
    id: string;
    name: string;
    nameTamil: string;
    icon: typeof Utensils;
    items: MenuItem[];
}

const MenuBuilder = () => {
    const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['sweets', 'snacks', 'main-course']));
    const [mealType, setMealType] = useState<'morning' | 'evening'>('morning');

    // Menu data extracted from Tamil pamphlet
    const morningMenu: MenuCategory[] = [
        {
            id: 'sweets',
            name: 'Sweets',
            nameTamil: 'ஸ்வீட்',
            icon: Cake,
            items: [
                { id: 'carrot-halwa', name: 'Carrot Halwa', nameTamil: 'கேரட் மைசூர்பா' },
                { id: 'mini-laddu', name: 'Mini Laddu', nameTamil: 'மினி லட்டு' },
                { id: 'kadalai-paruppu-halwa', name: 'Kadalai Paruppu Halwa', nameTamil: 'கடலைப்பருப்பு+பழம்+நெய்' },
                { id: 'badam-halwa', name: 'Badam Halwa', nameTamil: 'தேங்காய் ஒப்பிட்டு' },
                { id: 'mini-jilebi', name: 'Mini Jilebi', nameTamil: 'மினி ஜிலேபி' },
                { id: 'mini-mysurpa', name: 'Mini Mysurpa', nameTamil: 'மினி மைசூர்பா' },
                { id: 'kodumai-halwa', name: 'Kodumai Halwa', nameTamil: 'கோதுமை அல்வா' },
                { id: 'puri-halwa', name: 'Poori Halwa', nameTamil: 'பூரி அல்வா' },
                { id: 'carrot-halwa-kesari', name: 'Carrot Kesari', nameTamil: 'கேரட் கேசரி' },
                { id: 'rava-kesari', name: 'Rava Kesari', nameTamil: 'ரவா கேசரி' },
                { id: 'pineapple-kesari', name: 'Pineapple Kesari', nameTamil: 'அன்னாசி கேசரி' },
            ]
        },
        {
            id: 'snacks',
            name: 'Snacks & Tiffin',
            nameTamil: 'ஸ்னாக்ஸ்',
            icon: Coffee,
            items: [
                { id: 'poori', name: 'Poori', nameTamil: 'பூரி' },
                { id: 'mini-chapathi', name: 'Mini Chapathi', nameTamil: 'மினி சப்பாத்தி' },
                { id: 'mini-parotta', name: 'Mini Parotta', nameTamil: 'மினி பரோட்டா' },
                { id: 'mini-parotta-dip', name: 'Mini Parotta Dip', nameTamil: 'மினி பரோட்டா டிப்' },
                { id: 'puri-masala', name: 'Poori Masala', nameTamil: 'பூரி மசாலா' },
                { id: 'medu-vada', name: 'Medu Vada', nameTamil: 'மெது வடை' },
                { id: 'ulundu-vada', name: 'Ulundu Vada', nameTamil: 'உளுந்து வடை' },
                { id: 'sambar-vada', name: 'Sambar Vada', nameTamil: 'சாம்பார் வடை' },
                { id: 'masala-vada', name: 'Masala Vada', nameTamil: 'மசாலா வடை' },
                { id: 'curd-vada', name: 'Curd Vada (Thayir Vada)', nameTamil: 'தயிர் வடை' },
            ]
        },
        {
            id: 'idli-dosa',
            name: 'Idli & Dosa',
            nameTamil: 'இட்லி & தோசை',
            icon: Sun,
            items: [
                { id: 'idli', name: 'Idli', nameTamil: 'இட்லி' },
                { id: 'rava-idli', name: 'Rava Idli', nameTamil: 'ரவா இட்லி' },
                { id: 'veg-idli', name: 'Veg Idli', nameTamil: 'வெஜ் இட்லி' },
                { id: 'malliga-idli', name: 'Malliga Idli', nameTamil: 'மல்லிகை இட்லி' },
                { id: 'mini-sambar-idli', name: 'Mini Sambar Idli', nameTamil: 'மினி சாம்பார் இட்லி' },
                { id: 'thatte-idli', name: 'Thatte Idli', nameTamil: 'தட்டே இட்லி' },
                { id: 'plain-dosa', name: 'Plain Dosa', nameTamil: 'சாதா தோசை' },
                { id: 'masala-dosa', name: 'Masala Dosa', nameTamil: 'மசாலா தோசை' },
                { id: 'onion-dosa', name: 'Onion Rava Dosa', nameTamil: 'ஆனியன் ரவா தோசை' },
                { id: 'mysore-masala-dosa', name: 'Mysore Masala Dosa', nameTamil: 'மைசூர் மசாலா தோசை' },
                { id: 'paneer-dosa', name: 'Paneer Dosa', nameTamil: 'பன்னீர் தோசை' },
                { id: 'kal-dosa', name: 'Kal Dosa', nameTamil: 'கல் தோசை' },
                { id: 'set-dosa', name: 'Set Dosa', nameTamil: 'செட் தோசை' },
                { id: 'neer-dosa', name: 'Neer Dosa', nameTamil: 'நீர் தோசை' },
            ]
        },
        {
            id: 'pongal-upma',
            name: 'Pongal & Upma',
            nameTamil: 'பொங்கல் & உப்புமா',
            icon: Leaf,
            items: [
                { id: 'ven-pongal', name: 'Ven Pongal', nameTamil: 'வெண் பொங்கல்' },
                { id: 'sakkarai-pongal', name: 'Sakkarai Pongal', nameTamil: 'சர்க்கரை பொங்கல்' },
                { id: 'rava-upma', name: 'Rava Upma', nameTamil: 'ரவா உப்புமா' },
                { id: 'veg-upma', name: 'Veg Upma', nameTamil: 'வெஜ் உப்புமா' },
                { id: 'semiya-upma', name: 'Semiya Upma', nameTamil: 'சேமியா உப்புமா' },
                { id: 'kichadi', name: 'Kichadi', nameTamil: 'கிச்சடி' },
            ]
        },
        {
            id: 'sambar-kootu',
            name: 'Sambar & Kootu',
            nameTamil: 'சாம்பார் & கூட்டு',
            icon: Utensils,
            items: [
                { id: 'sambar', name: 'Sambar', nameTamil: 'சாம்பார்' },
                { id: 'thakkali-kolambu', name: 'Thakkali Kolambu', nameTamil: 'தக்காளி கூட்டு' },
                { id: 'poondu-kolambu', name: 'Poondu Kolambu', nameTamil: 'பூண்டு கூட்டு' },
                { id: 'thakkali-gothsu', name: 'Thakkali Gothsu', nameTamil: 'தக்காளிகொத்சு' },
                { id: 'kootu', name: 'Kootu', nameTamil: 'கூட்டு' },
            ]
        },
        {
            id: 'rice-varieties',
            name: 'Rice Varieties',
            nameTamil: 'சாத வகைகள்',
            icon: Utensils,
            items: [
                { id: 'white-rice', name: 'White Rice', nameTamil: 'வெள்ளை சாதம்' },
                { id: 'jeera-rice', name: 'Jeera Rice', nameTamil: 'ஜீரா சாதம்' },
                { id: 'thakkali-rice', name: 'Thakkali Rice', nameTamil: 'தக்காளி சாதம்' },
                { id: 'pulao', name: 'Veg Pulao', nameTamil: 'புலாவ் சாதம்' },
                { id: 'lemon-rice', name: 'Lemon Rice', nameTamil: 'எலுமிச்சை சாதம்' },
                { id: 'coconut-rice', name: 'Coconut Rice', nameTamil: 'தேங்காய் சாதம்' },
                { id: 'curd-rice', name: 'Curd Rice', nameTamil: 'தயிர் சாதம்' },
                { id: 'veg-biryani', name: 'Veg Biryani', nameTamil: 'வெஜ் பிரியாணி' },
                { id: 'mushroom-biryani', name: 'Mushroom Biryani', nameTamil: 'காளான் பிரியாணி' },
                { id: 'paneer-biryani', name: 'Paneer Biryani', nameTamil: 'பன்னீர் பிரியாணி' },
            ]
        },
        {
            id: 'curries',
            name: 'Curries & Gravies',
            nameTamil: 'கறிகள்',
            icon: Utensils,
            items: [
                { id: 'paneer-butter-masala', name: 'Paneer Butter Masala', nameTamil: 'பன்னீர் பட்டர் மசாலா' },
                { id: 'palak-paneer', name: 'Palak Paneer', nameTamil: 'பாலக் பன்னீர்' },
                { id: 'mushroom-masala', name: 'Mushroom Masala', nameTamil: 'காளான் மசாலா' },
                { id: 'gobi-masala', name: 'Gobi Masala', nameTamil: 'கோபி மசாலா' },
                { id: 'aloo-gobi', name: 'Aloo Gobi', nameTamil: 'உருளை-கோபி' },
                { id: 'mixed-veg-curry', name: 'Mixed Veg Curry', nameTamil: 'மிக்ஸ்ட் வெஜ்' },
                { id: 'channa-masala', name: 'Channa Masala', nameTamil: 'சன்னா மசாலா' },
                { id: 'kadai-paneer', name: 'Kadai Paneer', nameTamil: 'கடாய் பன்னீர்' },
            ]
        },
        {
            id: 'chutneys-pickles',
            name: 'Chutneys & Pickles',
            nameTamil: 'சட்னி & ஊறுகாய்',
            icon: Leaf,
            items: [
                { id: 'coconut-chutney', name: 'Coconut Chutney', nameTamil: 'தேங்காய் சட்னி' },
                { id: 'tomato-chutney', name: 'Tomato Chutney', nameTamil: 'தக்காளி சட்னி' },
                { id: 'onion-chutney', name: 'Onion Chutney', nameTamil: 'வெங்காய சட்னி' },
                { id: 'pudina-chutney', name: 'Pudina Chutney', nameTamil: 'புதினா சட்னி' },
                { id: 'mango-pickle', name: 'Mango Pickle', nameTamil: 'மாங்காய் ஊறுகாய்' },
                { id: 'lemon-pickle', name: 'Lemon Pickle', nameTamil: 'எலுமிச்சை ஊறுகாய்' },
            ]
        },
        {
            id: 'beverages',
            name: 'Beverages',
            nameTamil: 'பானங்கள்',
            icon: Coffee,
            items: [
                { id: 'filter-coffee', name: 'Filter Coffee', nameTamil: 'ஃபில்டர் காபி' },
                { id: 'tea', name: 'Tea', nameTamil: 'டீ' },
                { id: 'badam-milk', name: 'Badam Milk', nameTamil: 'பாதாம் மில்க்' },
                { id: 'rose-milk', name: 'Rose Milk', nameTamil: 'ரோஸ் மில்க்' },
                { id: 'buttermilk', name: 'Buttermilk', nameTamil: 'மோர்' },
                { id: 'tender-coconut', name: 'Tender Coconut', nameTamil: 'இளநீர்' },
                { id: 'fruit-juice', name: 'Fresh Fruit Juice', nameTamil: 'பழச்சாறு' },
                { id: 'water', name: 'Packaged Water', nameTamil: 'தண்ணீர்' },
            ]
        },
        {
            id: 'desserts-payasam',
            name: 'Payasam & Desserts',
            nameTamil: 'பாயசம்',
            icon: Cake,
            items: [
                { id: 'paruppu-payasam', name: 'Paruppu Payasam', nameTamil: 'பருப்பு பாயாசம்' },
                { id: 'ada-pradhaman', name: 'Ada Pradhaman', nameTamil: 'அடை பிரதமன்' },
                { id: 'javvarisi-payasam', name: 'Javvarisi Payasam', nameTamil: 'ஜவ்வரிசி பாயாசம்' },
                { id: 'kodumai-payasam', name: 'Wheat Payasam', nameTamil: 'கோதுமை பாயாசம்' },
                { id: 'badam-payasam', name: 'Badam Payasam', nameTamil: 'பாதாம் பாயசம்' },
                { id: 'pal-payasam', name: 'Pal Payasam', nameTamil: 'பால் பாயசம்' },
                { id: 'sakkarai-payasam', name: 'Sakkarai Payasam', nameTamil: 'சர்க்கரை பாயசம்' },
                { id: 'semiya-payasam', name: 'Semiya Payasam', nameTamil: 'சேமியா பாயசம்' },
            ]
        },
        {
            id: 'parcel-items',
            name: 'Parcel Items',
            nameTamil: 'பார்சல் இனிப்பு மற்றும் காரம்',
            icon: Package,
            items: [
                { id: 'laddu-parcel', name: 'Laddu', nameTamil: 'லட்டு' },
                { id: 'mysurpa-parcel', name: 'Mysurpa', nameTamil: 'மைசூர்பா' },
                { id: 'mundiri-cake', name: 'Mundiri Cake', nameTamil: 'முந்திரி கேக்' },
                { id: 'badusha', name: 'Badusha', nameTamil: 'பாதுஷா' },
                { id: 'jilebi-parcel', name: 'Jilebi', nameTamil: 'ஜிலேபி' },
                { id: 'mixture', name: 'Mixture', nameTamil: 'மிக்சர்' },
                { id: 'ribbon-pakoda', name: 'Ribbon Pakoda', nameTamil: 'ரிப்பன் பக்கோடா' },
                { id: 'murukku', name: 'Murukku', nameTamil: 'முல்லு முருக்கு' },
            ]
        },
    ];

    const eveningMenu: MenuCategory[] = [
        {
            id: 'evening-sweets',
            name: 'Sweets',
            nameTamil: 'ஸ்வீட்',
            icon: Cake,
            items: [
                { id: 'ev-horlicks-pori', name: 'Horlicks Pori', nameTamil: 'ஹார்லிக்ஸ் பொரி' },
                { id: 'ev-strawberry-pori', name: 'Strawberry Pori', nameTamil: 'ஸ்ட்ராபெரி பொரி' },
                { id: 'ev-angurpuli', name: 'Angur Puli', nameTamil: 'அங்கூர்புலி' },
                { id: 'ev-malabar-sandwich', name: 'Malabar Sandwich', nameTamil: 'மலபார் சாண்ட்விச்' },
                { id: 'ev-badam-rose', name: 'Badam Rose', nameTamil: 'பாதாம் ரோஸ்' },
                { id: 'ev-mango-kesari', name: 'Mango Kesari', nameTamil: 'மாங்காய் கேசரி' },
                { id: 'ev-pineapple-kesari', name: 'Pineapple Kesari', nameTamil: 'அன்னாசி கேசரி' },
                { id: 'ev-gulab-jamun', name: 'Gulab Jamun', nameTamil: 'குலாப் ஜாமூன்' },
                { id: 'ev-halwa', name: 'Halwa', nameTamil: 'அல்வா' },
            ]
        },
        {
            id: 'starters',
            name: 'Starters',
            nameTamil: 'ஸ்டார்டர்',
            icon: Coffee,
            items: [
                { id: 'st-veg-spring-roll', name: 'Veg Spring Roll', nameTamil: 'வெஜ் ஸ்பிரிங்ரோல்' },
                { id: 'st-mushroom-spring-roll', name: 'Mushroom Spring Roll', nameTamil: 'மஷ்ரூம் ஸ்பிரிங்ரோல்' },
                { id: 'st-veg-cutlet', name: 'Veg Cutlet', nameTamil: 'வெஜ் கட்லட்' },
                { id: 'st-paneer-cutlet', name: 'Paneer Cutlet', nameTamil: 'பன்னீர் கட்லட்' },
                { id: 'st-mushroom-cutlet', name: 'Mushroom Cutlet', nameTamil: 'மஷ்ரூம் கட்லட்' },
                { id: 'st-corn-cutlet', name: 'Corn Cutlet', nameTamil: 'கார்ன் கட்லட்' },
                { id: 'st-american-corn', name: 'American Corn', nameTamil: 'அமெரிக்கன் கார்ன்' },
                { id: 'st-cheese-roll', name: 'Cheese Roll', nameTamil: 'சீஸ் ரோல்' },
                { id: 'st-paneer-samosa', name: 'Paneer Samosa', nameTamil: 'பன்னீர் சமோசா' },
                { id: 'st-aniyan-samosa', name: 'Onion Samosa', nameTamil: 'ஆனியன் சமோசா' },
                { id: 'st-cocktail-samosa', name: 'Cocktail Samosa', nameTamil: 'காக்டெயில் சமோசா' },
                { id: 'st-mayonaise-bonda', name: 'Mayonaise Bonda', nameTamil: 'மயோனைஸ் போண்டா' },
                { id: 'st-mundiri-bonda', name: 'Mundiri Bonda', nameTamil: 'முந்திரி போண்டா' },
                { id: 'st-cheese-balls', name: 'Cheese Balls', nameTamil: 'சீஸ் பால்ஸ்' },
            ]
        },
        {
            id: 'starter-special',
            name: 'Starter Specials',
            nameTamil: 'ஸ்பெஷல் ஸ்டார்டர்',
            icon: Utensils,
            items: [
                { id: 'ss-peppers-chilli', name: 'Peppers Chilli', nameTamil: 'பேப்பர்ஸ் சில்லி' },
                { id: 'ss-kovaikkai-chilli', name: 'Kovaikkai Chilli', nameTamil: 'கோவக்காய் சில்லி' },
                { id: 'ss-pudalangkai-chilli', name: 'Pudalangkai Chilli', nameTamil: 'புடலங்காய் சில்லி' },
                { id: 'ss-mushroom-chilli', name: 'Mushroom Chilli', nameTamil: 'மஷ்ரூம் சில்லி' },
                { id: 'ss-paneer-chilli', name: 'Paneer Chilli', nameTamil: 'பன்னீர் சில்லி' },
                { id: 'ss-karivepilai-chilli', name: 'Karivepilai Chilli', nameTamil: 'கறிவேப்பிலை சில்லி' },
                { id: 'ss-gobi-65', name: 'Gobi 65', nameTamil: 'கோபி 65' },
                { id: 'ss-mushroom-65', name: 'Mushroom 65', nameTamil: 'மஷ்ரூம் 65' },
                { id: 'ss-paneer-65', name: 'Paneer 65', nameTamil: 'பன்னீர் 65' },
                { id: 'ss-baby-corn-65', name: 'Baby Corn 65', nameTamil: 'பேபி கார்ன் 65' },
            ]
        },
        {
            id: 'dinner-dips',
            name: 'Dips & Sauces',
            nameTamil: 'டிப்ஸ்',
            icon: Leaf,
            items: [
                { id: 'dip-thakkali-sauce', name: 'Thakkali Sauce', nameTamil: 'தக்காளி சாஸ்' },
                { id: 'dip-hot-garlic', name: 'Hot & Garlic Sauce', nameTamil: 'ஹாட் கார்லிக் சாஸ்' },
            ]
        },
        {
            id: 'parutals',
            name: 'Parutals',
            nameTamil: 'பொரியல்',
            icon: Leaf,
            items: [
                { id: 'p-romal-roti', name: 'Romal Roti', nameTamil: 'ரோமால் ரோட்டி' },
                { id: 'p-pattar-naan', name: 'Pattar Naan', nameTamil: 'பட்டர் நான்' },
                { id: 'p-spinach-kulcha', name: 'Spinach Kulcha', nameTamil: 'ஸ்பினச் குல்ச்சா' },
                { id: 'p-mini-parotta', name: 'Mini Parotta', nameTamil: 'மினி பரோட்டா' },
                { id: 'p-chilli-parotta', name: 'Chilli Parotta', nameTamil: 'சில்லி பரோட்டா' },
                { id: 'p-methi-sappathi', name: 'Methi Sappathi', nameTamil: 'மெத்தி சப்பாத்தி' },
                { id: 'p-masala-sappathi', name: 'Masala Sappathi', nameTamil: 'மசாலா சப்பாத்தி' },
                { id: 'p-aloo-sappathi', name: 'Aloo Sappathi', nameTamil: 'ஆலு சப்பாத்தி' },
                { id: 'p-methi-puri', name: 'Methi Puri', nameTamil: 'மெத்தி பூரி' },
                { id: 'p-aloo-pattru', name: 'Aloo Pattru', nameTamil: 'ஆலு பட்ருப்' },
                { id: 'p-mini-puri', name: 'Mini Puri', nameTamil: 'மினி பூரி' },
            ]
        },
        {
            id: 'kurumas',
            name: 'Kuruma & Gravy',
            nameTamil: 'குருமா',
            icon: Utensils,
            items: [
                { id: 'k-veg-kuruma', name: 'Veg Kuruma', nameTamil: 'வெஜ் குருமா' },
                { id: 'k-veg-salna', name: 'Veg Salna', nameTamil: 'வெஜ் சால்னா' },
                { id: 'k-navrathina-kuruma', name: 'Navrathina Kuruma', nameTamil: 'நவரத்தின குருமா' },
                { id: 'k-pattir-paneer', name: 'Pattir Paneer Kuruma', nameTamil: 'பட்டர் பன்னீர் குருமா' },
                { id: 'k-mushrum-kuruma', name: 'Mushroom Kuruma', nameTamil: 'மஷ்ரூம் குருமா' },
                { id: 'k-aloo-kuruma', name: 'Aloo Kuruma', nameTamil: 'ஆலு குருமா' },
                { id: 'k-channa-kuruma', name: 'Channa Kuruma', nameTamil: 'சன்னா குருமா' },
                { id: 'k-dal-makhani', name: 'Dal Makhani', nameTamil: 'தால் மகானி' },
            ]
        },
        {
            id: 'dinner-kolambu',
            name: 'Kolambu',
            nameTamil: 'கொளம்பு',
            icon: Utensils,
            items: [
                { id: 'dk-vatha-kolambu', name: 'Vatha Kolambu', nameTamil: 'வத்த கூழம்பு' },
                { id: 'dk-poondu-kolambu', name: 'Poondu Kolambu', nameTamil: 'பூண்டு கூழம்பு' },
                { id: 'dk-kathirikai-kolambu', name: 'Kathirikai Kolambu', nameTamil: 'கத்திரிக்காய் கூழம்பு' },
                { id: 'dk-vendaikai-kolambu', name: 'Vendaikai Kolambu', nameTamil: 'வெண்டைக்காய் கூழம்பு' },
            ]
        },
        {
            id: 'rasam',
            name: 'Rasam',
            nameTamil: 'ரசம்',
            icon: Utensils,
            items: [
                { id: 'r-thakkali-rasam', name: 'Thakkali Rasam', nameTamil: 'தக்காளி ரசம்' },
                { id: 'r-paneer-rasam', name: 'Paneer Rasam', nameTamil: 'மைசூர் ரசம்' },
                { id: 'r-thakkali-rasam-2', name: 'Thakkali Pepper Rasam', nameTamil: 'தக்காளி ரசம்' },
                { id: 'r-milagu-rasam', name: 'Milagu Rasam', nameTamil: 'மிளகு ரசம்' },
                { id: 'r-kothamalli-rasam', name: 'Kothamalli Rasam', nameTamil: 'கொத்தமல்லி ரசம்' },
                { id: 'r-pineapple-rasam', name: 'Pineapple Rasam', nameTamil: 'அன்னாசி ரசம்' },
            ]
        },
        {
            id: 'poriyal',
            name: 'Poriyal',
            nameTamil: 'பொரியல்',
            icon: Leaf,
            items: [
                { id: 'po-carrot-peas', name: 'Carrot Peas', nameTamil: 'கேரட் பீன்ஸ்' },
                { id: 'po-avaraikkai', name: 'Avaraikkai', nameTamil: 'அவரைக்காய்' },
                { id: 'po-kovakkai', name: 'Kovakkai', nameTamil: 'கோவக்காய்' },
                { id: 'po-kosu', name: 'Kosu', nameTamil: 'கோஸ்' },
                { id: 'po-kothala-poriyal', name: 'Kothala Poriyal', nameTamil: 'கத்தரி பொரியல்' },
            ]
        },
        {
            id: 'dinner-kootu',
            name: 'Kootu',
            nameTamil: 'கூட்டு',
            icon: Utensils,
            items: [
                { id: 'dko-poonai-kootu', name: 'Poonai Kootu', nameTamil: 'பூசணி கூட்டு' },
                { id: 'dko-pudalangkai-kootu', name: 'Pudalangkai Kootu', nameTamil: 'புடலங்காய் கூட்டு' },
                { id: 'dko-morakkai-kootu', name: 'Morakkai Kootu', nameTamil: 'மொரக்காய் கூட்டு' },
                { id: 'dko-senai-kilangu', name: 'Senai Kilangu', nameTamil: 'சேனை கிழங்கு' },
                { id: 'dko-vazhaikkai-kootu', name: 'Vazhaikkai Kootu', nameTamil: 'வாழைக்காய் கூட்டு' },
            ]
        },
        {
            id: 'vadai',
            name: 'Vadai',
            nameTamil: 'வடை',
            icon: Coffee,
            items: [
                { id: 'vd-keera-vadai', name: 'Keera Vadai', nameTamil: 'கீரை வடை' },
                { id: 'vd-masala-vadai', name: 'Masala Vadai', nameTamil: 'மசாலா வடை' },
                { id: 'vd-thattapairu', name: 'Thattapairu Vadai', nameTamil: 'தட்டப்பாயிறு' },
                { id: 'vd-senai-kilangu', name: 'Senai Kilangu Vadai', nameTamil: 'சேனை கிழங்கு' },
            ]
        },
        {
            id: 'payasam-dinner',
            name: 'Payasam',
            nameTamil: 'பாயசம்',
            icon: Cake,
            items: [
                { id: 'pd-pasiparupu', name: 'Pasiparupu Payasam', nameTamil: 'பாசிப்பருப்பு' },
                { id: 'pd-pacharisi', name: 'Pacharisi Payasam', nameTamil: 'பச்சரிசி' },
                { id: 'pd-aval', name: 'Aval Payasam', nameTamil: 'அவல்' },
                { id: 'pd-kodumai', name: 'Kodumai Payasam', nameTamil: 'கோதுமை' },
                { id: 'pd-parut', name: 'Paruthi Payasam', nameTamil: 'பருத்' },
            ]
        },
        {
            id: 'appalam',
            name: 'Appalam & Extras',
            nameTamil: 'அப்பளம்',
            icon: Leaf,
            items: [
                { id: 'ap-appalam', name: 'Appalam', nameTamil: 'அப்பளம்' },
                { id: 'ap-vadagam', name: 'Vadagam', nameTamil: 'வடகம்' },
                { id: 'ap-chips', name: 'Chips', nameTamil: 'சிப்ஸ்' },
                { id: 'ap-pappadam', name: 'Pappadam', nameTamil: 'பப்படம்' },
            ]
        },
        {
            id: 'thayir',
            name: 'Thayir',
            nameTamil: 'தயிர்',
            icon: Leaf,
            items: [
                { id: 'th-badam-thayir', name: 'Badam Thayir', nameTamil: 'பாதாம் தயிர்' },
                { id: 'th-kab-thayir', name: 'Kab Thayir', nameTamil: 'கப் தயிர்' },
            ]
        },
        {
            id: 'oorugai',
            name: 'Oorugai',
            nameTamil: 'ஊறுகாய்',
            icon: Leaf,
            items: [
                { id: 'oo-mangai', name: 'Mangai Oorugai', nameTamil: 'மாங்காய்' },
                { id: 'oo-inji-thokku', name: 'Inji Thokku', nameTamil: 'இஞ்சி தொக்கு' },
            ]
        },
        {
            id: 'vazhaipalapazham',
            name: 'Banana & Fruits',
            nameTamil: 'வாழைப்பழம்',
            icon: Leaf,
            items: [
                { id: 'bp-virupaarchi', name: 'Virupaarchi', nameTamil: 'விருப்பாற்சி' },
                { id: 'bp-morris', name: 'Morris', nameTamil: 'மோரிஸ்' },
                { id: 'bp-rasthali', name: 'Rasthali', nameTamil: 'ரஸ்தாளி' },
                { id: 'bp-karpuravalli', name: 'Karpuravalli', nameTamil: 'கற்பூரவள்ளி' },
                { id: 'bp-poovan', name: 'Poovan', nameTamil: 'பூவன்' },
            ]
        },
        {
            id: 'pida',
            name: 'Pida',
            nameTamil: 'பீடா',
            icon: Cake,
            items: [
                { id: 'pida-pineapple', name: 'Pineapple Pida', nameTamil: 'பைனாப்பிள் பீடா' },
                { id: 'pida-special', name: 'Special Pida', nameTamil: 'ஸ்பெஷல் பீடா' },
            ]
        },
        {
            id: 'evening-beverages',
            name: 'Beverages',
            nameTamil: 'பானங்கள்',
            icon: Coffee,
            items: [
                { id: 'eb-water-300', name: 'Water 300ml', nameTamil: 'தண்ணீர் 300ml' },
                { id: 'eb-water-500', name: 'Water 500ml', nameTamil: 'தண்ணீர் 500ml' },
                { id: 'eb-water-20l', name: 'Water 20L Can', nameTamil: 'தண்ணீர் 20லிட்டர் கேன்' },
            ]
        },
        {
            id: 'snacks-section',
            name: 'Snacks',
            nameTamil: 'ஸ்னாக்ஸ்',
            icon: Coffee,
            items: [
                { id: 'sn-valaikai-bajji', name: 'Vazhaikkai Bajji', nameTamil: 'வாழைக்காய் பஜ்ஜி' },
                { id: 'sn-vengaya-pakoda', name: 'Vengaya Pakoda', nameTamil: 'வெங்காய பக்கோடா' },
                { id: 'sn-masala-bonda', name: 'Masala Bonda', nameTamil: 'மசாலா போண்டா' },
                { id: 'sn-maisur-bonda', name: 'Maisur Bonda', nameTamil: 'மைசூர் போண்டா' },
                { id: 'sn-aniyan-samosa', name: 'Onion Samosa', nameTamil: 'ஆனியன் சமோசா' },
                { id: 'sn-tea', name: 'Tea', nameTamil: 'டீ' },
                { id: 'sn-coffee', name: 'Coffee', nameTamil: 'காபி' },
                { id: 'sn-welcom-drink', name: 'Welcome Drink', nameTamil: 'வெல்கம் ட்ரிங்க்' },
                { id: 'sn-madayel-kupandar', name: 'Mocktail', nameTamil: 'மாக்டெயில் குப்பண்டர்' },
            ]
        },
    ];

    const afternoonMenu: MenuCategory[] = [
        {
            id: 'afternoon-sweets',
            name: 'Sweets',
            nameTamil: 'ஸ்வீட்',
            icon: Cake,
            items: [
                { id: 'af-parupu-poli', name: 'Parupu Poli', nameTamil: 'பருப்பு போலி' },
                { id: 'af-thengai-poli', name: 'Thengai Poli', nameTamil: 'தேங்காய் போலி' },
                { id: 'af-pineapple-kesari', name: 'Pineapple Kesari', nameTamil: 'பைனாப்பிள் கேசரி' },
                { id: 'af-gulab-jamun', name: 'Gulab Jamun', nameTamil: 'குலாப் ஜாமூன்' },
                { id: 'af-mini-mysurpa', name: 'Mini Mysurpa', nameTamil: 'மினி மைசூர்பா' },
                { id: 'af-poonikai-halwa', name: 'Poonikai Halwa', nameTamil: 'பூசணிக்காய் அல்வா' },
            ]
        },
        {
            id: 'biryani-section',
            name: 'Biryani',
            nameTamil: 'பிரியாணி',
            icon: Utensils,
            items: [
                { id: 'bir-veg-biryani', name: 'Veg Biryani', nameTamil: 'வெஜ் பிரியாணி' },
                { id: 'bir-pasikay-battani', name: 'Pattani Biryani', nameTamil: 'பட்டாணி பிரியாணி' },
                { id: 'bir-mushroom-biryani', name: 'Mushroom Biryani', nameTamil: 'காளான் பிரியாணி' },
                { id: 'bir-thakkali-biryani', name: 'Thakkali Biryani', nameTamil: 'தக்காளி பிரியாணி' },
                { id: 'bir-malli-biryani', name: 'Malli Biryani', nameTamil: 'மல்லி பிரியாணி' },
            ]
        },
        {
            id: 'thayir-pachadi',
            name: 'Thayir Pachadi',
            nameTamil: 'தயிர் பச்சடி',
            icon: Leaf,
            items: [
                { id: 'tp-vengaya', name: 'Vengaya Pachadi', nameTamil: 'வெங்காயம்' },
                { id: 'tp-poonai', name: 'Poonai Pachadi', nameTamil: 'பூசணி' },
                { id: 'tp-karaikkai', name: 'Karaikkai Pachadi', nameTamil: 'காரைக்காய்' },
            ]
        },
        {
            id: 'afternoon-rice',
            name: 'Rice Varieties',
            nameTamil: 'சாதம்',
            icon: Utensils,
            items: [
                { id: 'ar-pachchai-arisi', name: 'Patchai Arisi Sadam', nameTamil: 'பச்சை அரிசி' },
                { id: 'ar-puzhungal-arisi', name: 'Puzhungal Arisi', nameTamil: 'புழுங்கல் அரிசி' },
            ]
        },
        {
            id: 'afternoon-parupu',
            name: 'Parupu',
            nameTamil: 'பருப்பு',
            icon: Leaf,
            items: [
                { id: 'par-parupu-nei', name: 'Parupu Nei', nameTamil: 'பருப்பு-நெய்' },
                { id: 'par-parsai-parupu', name: 'Parsai Parupu ', nameTamil: 'பாசி பருப்பு-நெய்' },
                { id: 'par-kosu-parupu', name: 'Kosu Parupu', nameTamil: 'கொஸு பருப்பு-நெய்' },
            ]
        },
        {
            id: 'afternoon-sambar',
            name: 'Sambar',
            nameTamil: 'சாம்பார்',
            icon: Utensils,
            items: [
                { id: 'as-murungai-sambar', name: 'Murungai Sambar', nameTamil: 'முருங்கை+சின்ன வெங்காய சாம்பார்' },
                { id: 'as-malabar-sambar', name: 'Malabar Sambar', nameTamil: 'மலபார் சாம்பார்' },
                { id: 'as-navrathina-sambar', name: 'Navrathina Sambar', nameTamil: 'நவரத்தின சாம்பார்' },
                { id: 'as-kathiri-urulan-sambar', name: 'Kathiri Urulan Sambar', nameTamil: 'கத்திரி உருளை சாம்பார்' },
                { id: 'as-poonikai-sambar', name: 'Poonikai Sambar', nameTamil: 'பூசணிக்காய் சாம்பார்' },
            ]
        },
        {
            id: 'afternoon-kolambu',
            name: 'Kolambu',
            nameTamil: 'கொழம்பு',
            icon: Utensils,
            items: [
                { id: 'ak-vatha-kolambu', name: 'Vatha Kolambu', nameTamil: 'வத்த கூழம்பு' },
                { id: 'ak-poondu-kolambu', name: 'Poondu Kolambu', nameTamil: 'பூண்டு கூழம்பு' },
                { id: 'ak-kathirikai-kolambu', name: 'Kathirikai Kolambu', nameTamil: 'கத்திரிக்காய் கூழம்பு' },
                { id: 'ak-vendaikai-kolambu', name: 'Vendaikai Kolambu', nameTamil: 'வெண்டைக்காய் கூழம்பு' },
            ]
        },
        {
            id: 'afternoon-rasam',
            name: 'Rasam',
            nameTamil: 'ரசம்',
            icon: Utensils,
            items: [
                { id: 'afr-thakkali', name: 'Thakkali Rasam', nameTamil: 'தக்காளி ரசம்' },
                { id: 'afr-parupu', name: 'Parupu Rasam', nameTamil: 'பருப்பு ரசம்' },
                { id: 'afr-milagu', name: 'Milagu Rasam', nameTamil: 'மிளகு ரசம்' },
                { id: 'afr-mango', name: 'Mango Rasam', nameTamil: 'மாங்காய் ரசம்' },
                { id: 'afr-pineapple', name: 'Pineapple Rasam', nameTamil: 'அன்னாசி ரசம்' },
            ]
        },
        {
            id: 'afternoon-kootu',
            name: 'Kootu',
            nameTamil: 'கூட்டு',
            icon: Utensils,
            items: [
                { id: 'afk-poonai', name: 'Poonai Kootu', nameTamil: 'பூசணி கூட்டு' },
                { id: 'afk-morakkai', name: 'Morakkai Kootu', nameTamil: 'மொரக்காய் கூட்டு' },
                { id: 'afk-senai', name: 'Senai Kootu', nameTamil: 'சேனை கூட்டு' },
                { id: 'afk-vazhaikkai', name: 'Vazhaikkai Kootu', nameTamil: 'வாழைக்காய் கூட்டு' },
            ]
        },
        {
            id: 'afternoon-poriyal',
            name: 'Poriyal',
            nameTamil: 'பொரியல்',
            icon: Leaf,
            items: [
                { id: 'afp-carrot', name: 'Carrot Beans', nameTamil: 'கேரட் பீன்ஸ்' },
                { id: 'afp-avaraikkai', name: 'Avaraikkai', nameTamil: 'அவரைக்காய்' },
                { id: 'afp-kovakkai', name: 'Kovakkai', nameTamil: 'கோவக்காய்' },
                { id: 'afp-kosu', name: 'Kosu', nameTamil: 'கோஸ்' },
                { id: 'afp-kathiri', name: 'Kathiri Poriyal', nameTamil: 'கத்தரி பொரியல்' },
            ]
        },
    ];

    const currentMenu = mealType === 'morning' ? morningMenu : [...eveningMenu, ...afternoonMenu];

    const toggleItem = (itemId: string) => {
        setSelectedItems(prev => {
            const newSet = new Set(prev);
            if (newSet.has(itemId)) {
                newSet.delete(itemId);
            } else {
                newSet.add(itemId);
            }
            return newSet;
        });
    };

    const toggleCategory = (categoryId: string) => {
        setExpandedCategories(prev => {
            const newSet = new Set(prev);
            if (newSet.has(categoryId)) {
                newSet.delete(categoryId);
            } else {
                newSet.add(categoryId);
            }
            return newSet;
        });
    };

    const getSelectedItemsFromCategory = (categoryId: string) => {
        const category = currentMenu.find(cat => cat.id === categoryId);
        if (!category) return 0;
        return category.items.filter(item => selectedItems.has(item.id)).length;
    };

    const generateWhatsAppMessage = () => {
        const allCategories = [...morningMenu, ...eveningMenu, ...afternoonMenu];
        let message = '🍽️ *Sri Nidhi Catering - Menu Selection*\n\n';
        message += '━━━━━━━━━━━━━━━━━━━━\n\n';

        allCategories.forEach(category => {
            const selectedFromCategory = category.items.filter(item => selectedItems.has(item.id));
            if (selectedFromCategory.length > 0) {
                message += `*${category.name}*\n`;
                selectedFromCategory.forEach(item => {
                    message += `  ✓ ${item.name}\n`;
                });
                message += '\n';
            }
        });

        message += '━━━━━━━━━━━━━━━━━━━━\n';
        message += `*Total Items Selected: ${selectedItems.size}*\n\n`;
        message += 'Please provide a quote for this menu selection.\n';
        message += 'Event Date: ___\nGuest Count: ___\n';

        window.open(`https://wa.me/918760101010?text=${encodeURIComponent(message)}`, '_blank');
    };

    const clearSelection = () => {
        setSelectedItems(new Set());
    };

    return (
        <div className="min-h-screen" style={{ background: '#0A0A0A' }}>
            {/* Header */}
            <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-xl border-b border-white/10">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Link
                            to="/"
                            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span className="text-sm">Back to Home</span>
                        </Link>
                        <div className="flex items-center gap-3">
                            <img src="/cateringLogo.png" alt="Sri Nidhi" className="w-8 h-8 object-contain" />
                            <span className="text-white font-light" style={{ fontFamily: "'Playfair Display', serif" }}>
                                Menu Builder
                            </span>
                        </div>
                        <div className="text-sm" style={{ color: '#C9A227' }}>
                            {selectedItems.size} items
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                {/* Page Title */}
                <div className="text-center mb-8">
                    <h1
                        className="text-3xl md:text-4xl font-light text-white mb-2"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        Build Your <span style={{ color: '#C9A227' }}>Menu</span>
                    </h1>
                    <p className="text-white/50 text-sm">
                        Select items to create your custom wedding menu
                    </p>
                </div>

                {/* Meal Type Toggle */}
                <div className="flex justify-center mb-8">
                    <div className="inline-flex rounded-full p-1" style={{ background: 'rgba(255,255,255,0.05)' }}>
                        <button
                            onClick={() => setMealType('morning')}
                            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all ${mealType === 'morning' ? 'text-black' : 'text-white/60'
                                }`}
                            style={{ background: mealType === 'morning' ? '#C9A227' : 'transparent' }}
                        >
                            <Sun className="w-4 h-4" />
                            Morning / Lunch
                        </button>
                        <button
                            onClick={() => setMealType('evening')}
                            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all ${mealType === 'evening' ? 'text-black' : 'text-white/60'
                                }`}
                            style={{ background: mealType === 'evening' ? '#C9A227' : 'transparent' }}
                        >
                            <Moon className="w-4 h-4" />
                            Evening / Dinner
                        </button>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Menu Categories */}
                    <div className="lg:col-span-2 space-y-4">
                        {currentMenu.map((category) => (
                            <div
                                key={category.id}
                                className="rounded-xl overflow-hidden"
                                style={{
                                    background: 'rgba(255,255,255,0.02)',
                                    border: '1px solid rgba(255,255,255,0.1)'
                                }}
                            >
                                {/* Category Header */}
                                <button
                                    onClick={() => toggleCategory(category.id)}
                                    className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-10 h-10 rounded-lg flex items-center justify-center"
                                            style={{ background: 'rgba(201, 162, 39, 0.1)' }}
                                        >
                                            <category.icon className="w-5 h-5" style={{ color: '#C9A227' }} />
                                        </div>
                                        <div className="text-left">
                                            <h3 className="text-white font-medium">{category.name}</h3>
                                            <p className="text-white/40 text-xs">{category.nameTamil}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {getSelectedItemsFromCategory(category.id) > 0 && (
                                            <span
                                                className="px-2 py-0.5 rounded-full text-xs font-medium"
                                                style={{ background: '#C9A227', color: '#0A0A0A' }}
                                            >
                                                {getSelectedItemsFromCategory(category.id)} selected
                                            </span>
                                        )}
                                        {expandedCategories.has(category.id) ? (
                                            <ChevronUp className="w-5 h-5 text-white/40" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5 text-white/40" />
                                        )}
                                    </div>
                                </button>

                                {/* Category Items */}
                                {expandedCategories.has(category.id) && (
                                    <div className="px-4 pb-4 grid grid-cols-2 md:grid-cols-3 gap-2">
                                        {category.items.map((item) => (
                                            <button
                                                key={item.id}
                                                onClick={() => toggleItem(item.id)}
                                                className={`flex items-center gap-2 p-3 rounded-lg text-left transition-all ${selectedItems.has(item.id)
                                                    ? 'bg-[#C9A227]/20 border-[#C9A227]/50'
                                                    : 'bg-white/5 border-transparent hover:bg-white/10'
                                                    }`}
                                                style={{ border: '1px solid' }}
                                            >
                                                <div
                                                    className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 ${selectedItems.has(item.id) ? 'bg-[#C9A227]' : 'bg-white/10'
                                                        }`}
                                                >
                                                    {selectedItems.has(item.id) && <Check className="w-3 h-3 text-black" />}
                                                </div>
                                                <div>
                                                    <span className="text-sm text-white block">{item.name}</span>
                                                    {item.nameTamil && (
                                                        <span className="text-xs text-white/40">{item.nameTamil}</span>
                                                    )}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Selection Summary - Sticky Sidebar */}
                    <div className="lg:col-span-1">
                        <div
                            className="sticky top-24 rounded-xl p-6"
                            style={{
                                background: 'rgba(255,255,255,0.02)',
                                border: '1px solid rgba(255,255,255,0.1)'
                            }}
                        >
                            <h3 className="text-lg text-white font-light mb-4 pb-4 border-b border-white/10">
                                Your Selection
                            </h3>

                            {selectedItems.size === 0 ? (
                                <div className="text-center py-8">
                                    <Utensils className="w-12 h-12 mx-auto mb-4 text-white/20" />
                                    <p className="text-white/40 text-sm">No items selected yet</p>
                                    <p className="text-white/30 text-xs mt-1">Browse categories and select items</p>
                                </div>
                            ) : (
                                <>
                                    <div className="max-h-[40vh] overflow-y-auto space-y-3 mb-6">
                                        {[...morningMenu, ...eveningMenu, ...afternoonMenu].map(category => {
                                            const selectedFromCategory = category.items.filter(item => selectedItems.has(item.id));
                                            if (selectedFromCategory.length === 0) return null;

                                            return (
                                                <div key={category.id}>
                                                    <h4 className="text-xs text-white/40 uppercase tracking-wide mb-2">
                                                        {category.name}
                                                    </h4>
                                                    {selectedFromCategory.map(item => (
                                                        <div
                                                            key={item.id}
                                                            className="flex items-center justify-between py-1.5"
                                                        >
                                                            <span className="text-white/70 text-sm">{item.name}</span>
                                                            <button
                                                                onClick={() => toggleItem(item.id)}
                                                                className="text-white/30 hover:text-red-400 text-xs"
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <div className="pt-4 border-t border-white/10">
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="text-white/50">Total Items</span>
                                            <span className="text-xl font-light" style={{ color: '#C9A227' }}>
                                                {selectedItems.size}
                                            </span>
                                        </div>

                                        <Button
                                            onClick={generateWhatsAppMessage}
                                            size="lg"
                                            className="w-full py-6 font-medium tracking-wide transition-all duration-300 hover:scale-[1.02] border-0 mb-3"
                                            style={{
                                                background: '#C9A227',
                                                color: '#0A0A0A',
                                            }}
                                        >
                                            <Send className="w-4 h-4 mr-2" />
                                            Send via WhatsApp
                                        </Button>

                                        <button
                                            onClick={clearSelection}
                                            className="w-full py-2 text-sm text-white/40 hover:text-white/70 transition-colors"
                                        >
                                            Clear All
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuBuilder;
