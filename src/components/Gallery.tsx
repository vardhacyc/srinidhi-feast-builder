const Gallery = () => {
  const images = [
    {
      src: "/a3_demo.jpg",
      alt: "Wedding Catering Setup",
      title: "Wedding Catering",
    },
    { src: "/a2.jpg", alt: "Biryani Preparation", title: "Biryani Special" },
    {
      src: "/a4_outdoor.jpg",
      alt: "Outdoor Event Setup",
      title: "Outdoor Events",
    },
    {
      src: "/a1_award.jpg",
      alt: "Award Winning Service",
      title: "Award Winning",
    },
    {
      src: "/celebrity-wedding.png",
      alt: "Celebrity Events",
      title: "Celebrity Events",
    },
  ];

  return (
    <section id="gallery" className="relative py-24 overflow-hidden bg-black">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#C9A227]"></div>
            <span
              className="text-sm tracking-[0.3em] uppercase"
              style={{ color: "#C9A227" }}
            >
              Portfolio
            </span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#C9A227]"></div>
          </div>

          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Our{" "}
            <span className="italic" style={{ color: "#C9A227" }}>
              Portfolio
            </span>
          </h2>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer"
            >
              <img
                src={image.src}
                alt={image.alt}
                width="400"
                height="400"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(201, 162, 39, 0.2) 50%, transparent 100%)",
                }}
              ></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-sm font-light text-white">{image.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
