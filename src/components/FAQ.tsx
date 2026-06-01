import React, { useState } from 'react';

const FAQ = () => {
  const faqs = [
  {
    question: "Do you provide vegetarian and non-vegetarian menus?",
    answer:
      "Yes, we offer both pure vegetarian catering and non-vegetarian catering menus. All menus are fully customisable. We also handle mixed events with separate veg and non-veg counters."
  },
  {
    question: "What types of catering services are available in Coimbatore?",
    answer:
      "Caterers in Coimbatore provide services for weddings, birthdays, corporate events, housewarming functions, receptions, and traditional family celebrations. Both veg and non-veg menu options with buffet and banana leaf service are available."
  },
  {
    question: "Veg catering services in Coimbatore with price list?",
    answer:
      "Pure veg catering services for all events, starting from ₹200 per plate with customizable menu options."
  },
  {
    question: "Do you provide buffet setup and serving staff?",
    answer:
      "Yes, buffet setup and professional serving staff can be arranged."
  },
  {
    question: "Do you provide catering services for small functions in Coimbatore?",
    answer:
      "Yes, we offer catering services for small gatherings, family functions, birthday parties, and intimate events with customizable veg menus."
  },
  {
    question: "What makes your catering service special?",
    answer:
      "We provide tasty, hygienic food and smooth catering service for all types of events with customised menu options."
  },
  {
    question:
      "Do you have experience in cooking and serving fresh food for large gatherings?",
    answer:
      "Yes, we have experience in preparing and serving fresh, delicious food for small and large gatherings with quality and hygiene."
  }
];

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <>
      <section id="faq" className="relative py-24 overflow-hidden bg-black">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#C9A227]"></div>
              <span
                className="text-sm tracking-[0.3em] uppercase"
                style={{ color: '#C9A227' }}
              >
                FAQ
              </span>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#C9A227]"></div>
            </div>

            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Frequently Asked{' '}
              <span
                className="italic"
                style={{ color: '#C9A227' }}
              >
                Questions
              </span>
            </h2>
        
          </div>

          {/* FAQ Grid */}
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="group p-6 rounded-xl border border-white/10 hover:border-[#C9A227]/30 transition-all duration-300"
                style={{ background: 'rgba(255,255,255,0.02)' }}
                onClick={() => {
                  setExpandedIndex(prev => prev === index ? null : index);
                }}
              >
                <h3
                  className="text-lg font-medium text-white mb-2 group-hover:text-[#C9A227] transition-colors duration-300"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {faq.question}
                </h3>
                {expandedIndex === index && (
                  <p className="text-white/60 text-sm leading-relaxed mt-2">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          
        </div>
      </section>

      {/* FAQ Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map((faq) => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          }, null, 2)
        }}
      />
    </>
  );
};

export default FAQ;