
import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import ScribbleUnderline from '@/components/ui/ScribbleUnderline';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    guestCount: '',
    budget: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create WhatsApp message
    const whatsappMessage = `
Event Inquiry from ${formData.name}

Event Details:
- Type: ${formData.eventType}
- Date: ${formData.eventDate}
- Guests: ${formData.guestCount}
- Budget: ${formData.budget}

Contact Information:
- Email: ${formData.email}
- Phone: ${formData.phone}

Message: ${formData.message}

Please provide a detailed quote for this event.
    `;

    const whatsappUrl = `https://wa.me/918760101010?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');

    toast({
      title: "Inquiry Sent!",
      description: "Your inquiry has been sent via WhatsApp. We'll get back to you soon!",
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      eventType: '',
      eventDate: '',
      guestCount: '',
      budget: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["9994316559"],
      link: "tel:9994316559"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      details: ["8760101010"],
      link: "https://wa.me/918760101010"
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@srinidhicatering.com", "booking@srinidhicatering.com"],
      link: "mailto:info@srinidhicatering.com"
    },
    {
      icon: MapPin,
      title: "Address",
      details: ["B111, Manchester Grand, MG Rd", "Sri Kamadhenu Nagar, Avarampalayam", "Coimbatore, Tamil Nadu 641004"],
      link: "https://maps.google.com"
    }
  ];

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-8">
            Get In{' '}
            <span className="relative inline-block">
              <ScribbleUnderline variant="zigzag" delay={1.5} color="#E1A200">
                <span className="text-primary">Touch</span>
              </ScribbleUnderline>
              {/* Hand-drawn yellow underline effect */}
              <div className="absolute -bottom-2 left-0 w-full h-4 bg-accent opacity-60 transform -rotate-1 rounded-lg"></div>
            </span>
          </h2>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto font-medium leading-relaxed">
            Ready to plan your event? Contact us for a personalized quote and consultation
          </p>
        </div>

        {/* Contact Hero Banner */}
        <div className="mb-20 relative overflow-hidden rounded-3xl shadow-2xl">
          <img 
            src="/a1_award.jpg" 
            alt="Contact Sri Nidhi Catering - Award-Winning Service"
            className="w-full h-64 md:h-80 object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <div className="text-white max-w-4xl mx-auto px-8">
              <h3 className="text-3xl md:text-5xl font-black mb-4 text-shadow-strong">
                Award-Winning Excellence
              </h3>
              <p className="text-lg md:text-xl opacity-90 text-shadow-medium">
                Your satisfaction is our commitment. Let's create something extraordinary together.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div>
            <h3 className="text-4xl font-black text-gray-900 mb-10">Contact Information</h3>
            
            <div className="space-y-6 mb-10">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.link}
                  target={info.link.startsWith('http') ? '_blank' : undefined}
                  rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-start space-x-6 p-6 bg-bg-neutral rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group border-2 border-primary/20 hover:border-primary/40 hover:-translate-y-2"
                >
                  <div className="bg-gradient-to-br from-primary to-accent rounded-full p-4 group-hover:scale-110 transition-transform shadow-lg">
                    <info.icon className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h4 className="font-black text-gray-900 mb-2 text-xl">{info.title}</h4>
                    {info.details.map((detail, detailIndex) => (
                      <p key={detailIndex} className="text-gray-700 font-medium text-lg">{detail}</p>
                    ))}
                  </div>
                </a>
              ))}
            </div>

            {/* Business Hours with vibrant styling */}
            <div className="bg-bg-neutral rounded-2xl p-8 shadow-xl border-2 border-primary/20">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-gradient-to-br from-primary to-accent rounded-full p-3 shadow-lg">
                  <Clock className="h-7 w-7 text-white" />
                </div>
                <h4 className="font-black text-gray-900 text-xl">Business Hours</h4>
              </div>
              <div className="space-y-3 text-gray-700 font-medium text-lg">
                <div className="flex justify-between">
                  <span>Monday - Saturday</span>
                  <span className="font-black text-primary">8:00 AM - 10:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-black text-primary">9:00 AM - 9:00 PM</span>
                </div>
                <div className="bg-accent/20 p-4 rounded-xl mt-4">
                  <p className="text-green font-black text-lg">
                    *Available 24/7 for emergency catering services
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form with vibrant styling */}
          <div>
            <div className="bg-bg-neutral rounded-3xl p-10 shadow-2xl border-2 border-primary/20">
              <h3 className="text-4xl font-black text-gray-900 mb-8">Send Inquiry</h3>
              
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-lg font-black text-gray-900 mb-3">
                      Full Name *
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your full name"
                      className="h-14 text-lg border-2 border-primary/30 focus:border-primary rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-lg font-black text-gray-900 mb-3">
                      Phone Number *
                    </label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your phone number"
                      className="h-14 text-lg border-2 border-primary/30 focus:border-primary rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-black text-gray-900 mb-3">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    className="h-14 text-lg border-2 border-primary/30 focus:border-primary rounded-xl"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-lg font-black text-gray-900 mb-3">
                      Event Type *
                    </label>
                    <select
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleInputChange}
                      required
                      className="w-full h-14 p-4 border-2 border-primary/30 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary text-lg font-medium"
                    >
                      <option value="">Select event type</option>
                      <option value="Wedding">Wedding</option>
                      <option value="Corporate Event">Corporate Event</option>
                      <option value="Birthday Party">Birthday Party</option>
                      <option value="Anniversary">Anniversary</option>
                      <option value="Religious Function">Religious Function</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-lg font-black text-gray-900 mb-3">
                      Event Date *
                    </label>
                    <Input
                      type="date"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleInputChange}
                      required
                      className="h-14 text-lg border-2 border-primary/30 focus:border-primary rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-lg font-black text-gray-900 mb-3">
                      Number of Guests *
                    </label>
                    <Input
                      type="number"
                      name="guestCount"
                      value={formData.guestCount}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., 100"
                      min="1"
                      className="h-14 text-lg border-2 border-primary/30 focus:border-primary rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-lg font-black text-gray-900 mb-3">
                      Budget Range
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full h-14 p-4 border-2 border-primary/30 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary text-lg font-medium"
                    >
                      <option value="">Select budget range</option>
                      <option value="Under ₹50,000">Under ₹50,000</option>
                      <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000</option>
                      <option value="₹1,00,000 - ₹2,00,000">₹1,00,000 - ₹2,00,000</option>
                      <option value="₹2,00,000 - ₹5,00,000">₹2,00,000 - ₹5,00,000</option>
                      <option value="Above ₹5,00,000">Above ₹5,00,000</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-black text-gray-900 mb-3">
                    Special Requirements
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Tell us about your event requirements, dietary restrictions, or any special requests..."
                    className="text-lg border-2 border-primary/30 focus:border-primary rounded-xl"
                  />
                </div>

                <Button 
                  type="submit"
                  className="w-full btn-gradient-multicolor hover:shadow-2xl py-6 text-xl font-black rounded-xl hover:scale-105 transition-all duration-300"
                >
                  <Send className="h-6 w-6 mr-3" />
                  Send Inquiry via WhatsApp
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Quick Contact Buttons with vibrant styling */}
        <div className="text-center mt-20">
          <h3 className="text-3xl font-black text-gray-900 mb-8">Need Immediate Assistance?</h3>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="tel:9994316559"
              className="bg-header-bar text-white px-10 py-5 rounded-xl font-black text-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center hover:scale-105 text-shadow-medium"
            >
              <Phone className="h-6 w-6 mr-3" />
              Call Now
            </a>
            <a
              href="https://wa.me/918760101010"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gradient-primary px-10 py-5 rounded-xl font-black text-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center hover:scale-105"
            >
              <MessageCircle className="h-6 w-6 mr-3" />
              WhatsApp Chat
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
