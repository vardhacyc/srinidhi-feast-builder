import { memo, useState, useEffect } from "react";
import { Star, Sparkles } from "lucide-react";

const CelebrityShowcase = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-[#0A0A0A]">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Sparkles className="w-4 h-4" style={{ color: "#C9A227" }} />
            <span
              className="text-sm tracking-[0.3em] uppercase"
              style={{ color: "#C9A227" }}
            >
              Featured Event
            </span>
            <Sparkles className="w-4 h-4" style={{ color: "#C9A227" }} />
          </div>

          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Celebrity{" "}
            <span className="italic" style={{ color: "#C9A227" }}>
              Events
            </span>
          </h2>
        </div>

        {/* Main Showcase */}
        <div className="max-w-5xl mx-auto">
          <div className="relative group rounded-2xl overflow-hidden">
            <img
              src="/celebrity-wedding.png"
              alt="Celebrity Wedding Catered by Sri Nidhi Catering"
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.3) 40%, transparent 70%)",
              }}
            ></div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex -space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-[#C9A227]"
                      style={{ color: "#C9A227" }}
                    />
                  ))}
                </div>
                <span
                  className="text-xs tracking-wide uppercase"
                  style={{ color: "#C9A227" }}
                >
                  Premium Wedding Catering
                </span>
              </div>

              <h3
                className="text-2xl md:text-4xl font-light text-white mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Sai Pallavi's Sister's Wedding
              </h3>

              <p className="text-white/60 max-w-2xl leading-relaxed">
                Proud to be the official caterers for Pooja Kannan's traditional
                Badaga-style wedding in the serene hills of Kotagiri, Ooty. A
                beautiful celebration of Nilgiri heritage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(CelebrityShowcase);
