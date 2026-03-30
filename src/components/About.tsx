import { memo } from "react";
import { Heart, Leaf, Award, Users } from "lucide-react";

const About = () => {
  const features = [
    { icon: Heart, title: "Passion for Food", value: "15+ Years" },
    { icon: Leaf, title: "Fresh Ingredients", value: "Premium Quality" },
    { icon: Award, title: "Award Winning", value: "Excellence" },
    { icon: Users, title: "Expert Team", value: "50+ Staff" },
  ];

  return (
    <section id="about" className="relative py-24 overflow-hidden bg-black">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="/a2.jpg"
                alt="Sri Nidhi Catering Team"
                className="w-full h-[500px] object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to right, rgba(0,0,0,0.3) 0%, transparent 50%)",
                }}
              ></div>
            </div>

            {/* Floating card */}
            <div
              className="absolute -bottom-8 -right-8 p-6 rounded-xl"
              style={{
                background: "#C9A227",
                boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
              }}
            >
              <div className="text-4xl font-light text-black mb-1">100+</div>
              <div className="text-sm text-black/70 tracking-wide uppercase">
                Weddings Served
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div>
            {/* Decorative element */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-[#C9A227]"></div>
              <span
                className="text-sm tracking-[0.3em] uppercase"
                style={{ color: "#C9A227" }}
              >
                About Us
              </span>
            </div>

            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Crafting Culinary{" "}
              <span className="italic" style={{ color: "#C9A227" }}>
                Excellence
              </span>{" "}
              Since 2008
            </h2>

            <p className="text-white/60 text-lg mb-6 leading-relaxed">
              Sri Nidhi Catering is where food is celebrated. We are the top
              gourmet wedding caterer in Coimbatore, specializing in authentic
              South Indian and Nilgiri-style cuisine.
            </p>

            <p className="text-white/50 mb-10 leading-relaxed">
              From intimate family gatherings to grand destination weddings, we
              deliver exceptional food with impeccable service. Our team of 50+
              professionals ensures every event is a culinary masterpiece.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: "rgba(201, 162, 39, 0.1)",
                      border: "1px solid rgba(201, 162, 39, 0.3)",
                    }}
                  >
                    <feature.icon
                      className="w-5 h-5"
                      style={{ color: "#C9A227" }}
                    />
                  </div>
                  <div>
                    <div className="text-white font-medium">
                      {feature.title}
                    </div>
                    <div className="text-white/50 text-sm">{feature.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(About);
