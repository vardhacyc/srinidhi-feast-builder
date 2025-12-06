
const ImageShowcase = () => {
  const images = [
    {
      src: '/a3_demo.jpg',
      alt: 'Professional Food Service',
      title: 'Professional Service',
    },
    {
      src: '/a2.jpg',
      alt: 'Authentic Biryani',
      title: 'Authentic Cuisine',
    },
    {
      src: '/a4_outdoor.jpg',
      alt: 'Outdoor Event Setup',
      title: 'Outdoor Events',
    },
    {
      src: '/a1_award.jpg',
      alt: 'Award Winning',
      title: 'Award Winning',
    },
  ];

  return (
    <section className="relative py-8 bg-gray-950 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <span className="text-white font-bold text-sm">{image.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageShowcase;
