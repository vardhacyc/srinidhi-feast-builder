import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const Contact = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+91 87601 01010', '+91 9994316559'],
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['srinidhicatering10@gmail.com'],
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: ['4, Sarathi Nagar, Main Rd', 'Nandha Nagar, Singanallur', 'Coimbatore, Tamil Nadu  641005.'],
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: ['Mon - Sun: 7AM - 10PM'],
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const message = formData.get('message');

    const whatsappMessage = `Hi, I'm ${name}. ${message} Contact me at ${phone}`;
    window.open(`https://wa.me/918760101010?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
  };

  return (
    <section id="contact" className="relative py-24 overflow-hidden bg-[#0A0A0A]">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#C9A227]"></div>
            <span className="text-sm tracking-[0.3em] uppercase" style={{ color: '#C9A227' }}>
              Contact Us
            </span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#C9A227]"></div>
          </div>

          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Get In{' '}
            <span className="italic" style={{ color: '#C9A227' }}>Touch</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div>
            <div className="grid sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl transition-all duration-300 hover:border-[#C9A227]/30"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                    style={{
                      background: 'rgba(201, 162, 39, 0.1)',
                      border: '1px solid rgba(201, 162, 39, 0.3)'
                    }}
                  >
                    <info.icon className="w-5 h-5" style={{ color: '#C9A227' }} />
                  </div>
                  <h3 className="text-white font-medium mb-2">{info.title}</h3>
                  {info.details.map((detail, i) => (
                    info.title === 'Call Us' ? (
                      <a key={i} href={`tel:${detail.replace(/\s/g, '')}`} className="block text-white/50 text-sm hover:text-[#C9A227] transition-colors">{detail}</a>
                    ) : info.title === 'Email Us' ? (
                      <a key={i} href={`mailto:${detail}`} className="block text-white/50 text-sm hover:text-[#C9A227] transition-colors">{detail}</a>
                    ) : (
                      <p key={i} className="text-white/50 text-sm">{detail}</p>
                    )
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form
              onSubmit={handleSubmit}
              className="p-8 rounded-2xl"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.1)'
              }}
            >
              <h3 className="text-xl text-white font-light mb-6">Send us a Message</h3>

              <div className="space-y-4">
                <Input
                  name="name"
                  placeholder="Your Name"
                  required
                  className="bg-transparent border-white/20 text-white placeholder:text-white/40 focus:border-[#C9A227]"
                />
                <Input
                  name="phone"
                  type="tel"
                  placeholder="Phone Number"
                  required
                  className="bg-transparent border-white/20 text-white placeholder:text-white/40 focus:border-[#C9A227]"
                />
                <Textarea
                  name="message"
                  placeholder="Tell us about your event..."
                  required
                  rows={4}
                  className="bg-transparent border-white/20 text-white placeholder:text-white/40 focus:border-[#C9A227] resize-none"
                />
                <Button
                  type="submit"
                  size="lg"
                  className="w-full py-6 font-medium tracking-wide transition-all duration-300 hover:scale-[1.02] border-0"
                  style={{
                    background: '#C9A227',
                    color: '#0A0A0A',
                  }}
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send via WhatsApp
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
