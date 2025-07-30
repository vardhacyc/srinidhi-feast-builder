
import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const images = [
    {
      url: "/a1_award.jpg",
      title: "Award-Winning Excellence",
      category: "Awards"
    },
    {
      url: "/a3_demo.jpg",
      title: "Premium Catering Demonstration",
      category: "Events"
    },
    {
      url: "/a2.jpg",
      title: "Professional Service Team",
      category: "Events"
    },
    {
      url: "/a4_outdoor.jpg",
      title: "Outdoor Event Catering",
      category: "Events"
    },
    {
      url: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=800&q=80",
      title: "Traditional South Indian Feast",
      category: "Food"
    },
    {
      url: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=800&q=80",
      title: "Elegant Presentation",
      category: "Food"
    },
    {
      url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",
      title: "Traditional Sweets",
      category: "Food"
    },
    {
      url: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80",
      title: "Buffet Setup",
      category: "Events"
    },
    {
      url: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80",
      title: "Authentic Spices",
      category: "Kitchen"
    }
  ];

  const categories = ['All', 'Awards', 'Events', 'Food', 'Kitchen'];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredImages = activeCategory === 'All' 
    ? images 
    : images.filter(img => img.category === activeCategory);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % filteredImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage > 0 ? selectedImage - 1 : filteredImages.length - 1);
    }
  };

  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-8">
            Our{' '}
            <span className="relative inline-block">
              <span className="text-primary">Gallery</span>
              {/* Hand-drawn yellow underline effect */}
              <div className="absolute -bottom-2 left-0 w-full h-4 bg-accent opacity-60 transform rotate-1 rounded-lg"></div>
            </span>
          </h2>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto font-medium leading-relaxed">
            Glimpse into our culinary artistry and memorable events
          </p>
        </div>

        {/* Category Filter with vibrant styling */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-8 py-4 rounded-xl font-black text-lg transition-all transform ${
                activeCategory === category
                  ? 'btn-gradient-primary shadow-2xl scale-105'
                  : 'bg-white text-gray-700 hover:bg-primary/10 shadow-lg hover:scale-102 border-2 border-primary/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid with enhanced styling */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {filteredImages.map((image, index) => (
            <div 
              key={index}
              className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-primary/20 hover:border-primary/40 hover:-translate-y-2"
              onClick={() => openLightbox(index)}
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center p-6">
                <div className="text-white text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-black mb-2">{image.title}</h3>
                  <p className="text-lg font-medium bg-primary/80 px-3 py-1 rounded-lg">{image.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox with enhanced styling */}
        {selectedImage !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-5xl max-h-full">
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 text-white hover:text-primary z-10 bg-black/50 rounded-full p-2 hover:bg-primary/20 transition-all"
              >
                <X className="h-8 w-8" />
              </button>
              
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-primary z-10 bg-black/50 rounded-full p-3 hover:bg-primary/20 transition-all"
              >
                <ChevronLeft className="h-10 w-10" />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-primary z-10 bg-black/50 rounded-full p-3 hover:bg-primary/20 transition-all"
              >
                <ChevronRight className="h-10 w-10" />
              </button>

              <img
                src={filteredImages[selectedImage].url}
                alt={filteredImages[selectedImage].title}
                className="max-w-full max-h-full object-contain rounded-2xl"
              />
              
              <div className="absolute bottom-6 left-6 text-white bg-black/70 p-4 rounded-xl">
                <h3 className="text-2xl font-black text-primary mb-1">{filteredImages[selectedImage].title}</h3>
                <p className="text-gray-300 text-lg font-medium">{filteredImages[selectedImage].category}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
