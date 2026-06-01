const Intro = () => {
  return (
    <section className="relative py-24 bg-black overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-[#C9A227]"></div>
            <span
              className="text-sm tracking-[0.3em] uppercase"
              style={{ color: "#C9A227" }}
            >
              Welcome to Sri Nidhi Catering
            </span>
            <div className="w-12 h-px bg-[#C9A227]"></div>
          </div>

          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-8"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Professional Catering Services in{" "}
            <span className="italic text-[#C9A227]">Coimbatore</span>
          </h2>
        </div>

        {/* Content */}
        <div className="space-y-8 text-center">
          <p className="text-lg leading-relaxed text-white/70 text-justify">
            Sri Nidhi Catering provides professional catering services in Coimbatore for weddings, receptions, corporate events, birthday parties, and family functions. We are committed to delivering delicious food, hygienic preparation, and friendly service that make every event special and memorable.
          </p>

          <p className="text-lg leading-relaxed text-white/60 text-justify">
            Our catering team offers a wide variety of menu options including traditional South Indian meals, customised dishes, vegetarian and non-vegetarian catering, and special event packages to match your taste and budget.
          </p>


        </div>

        {/* Highlight Box */}
        {/* <div
          className="mt-12 p-8 rounded-2xl text-center"
          style={{
            background: "rgba(201, 162, 39, 0.08)",
            border: "1px solid rgba(201, 162, 39, 0.2)",
          }}
        >
          <h3 className="text-[#C9A227] text-xl font-medium mb-3">
            Making Every Event Delicious & Memorable
          </h3>
          <p className="text-white/60 leading-relaxed">
            Whether it's an intimate family gathering or a grand celebration,
            our experienced catering team delivers fresh food, professional
            service, and unforgettable dining experiences tailored to your
            event.
          </p>
        </div> */}
      </div>
    </section>
  );
};

export default Intro;