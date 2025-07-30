
import { Heart, Shield, Users, Trophy } from 'lucide-react';
import ScribbleUnderline from '@/components/ui/ScribbleUnderline';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Passion for Food",
      description: "Every dish is prepared with love and attention to detail"
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "Highest standards of hygiene and food safety"
    },
    {
      icon: Users,
      title: "Customer First",
      description: "Your satisfaction is our top priority"
    },
    {
      icon: Trophy,
      title: "Excellence",
      description: "Award-winning service and exceptional taste"
    }
  ];

  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-8">
            About{' '}
            <span className="relative inline-block">
              <ScribbleUnderline variant="smooth" delay={0.8}>
                <span className="text-primary">Yolo Caterers</span>
              </ScribbleUnderline>
              {/* Hand-drawn yellow underline effect */}
              <div className="absolute -bottom-2 left-0 w-full h-4 bg-accent opacity-60 transform rotate-1 rounded-lg"></div>
              {/* Added gold accent border for premium touch */}
              <div className="absolute -bottom-4 left-2 w-20 h-1 bg-gold rounded-full"></div>
            </span>
          </h2>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto font-medium leading-relaxed">
            A unit of Sri Nidhi Catering - Creating delightful memories that your taste buds will fondly remember forever
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <div className="bg-gradient-to-br from-primary/10 to-accent/20 rounded-3xl p-12 h-96 flex items-center justify-center border-4 border-primary/20 shadow-2xl">
              <div className="text-center">
                <div className="bg-white rounded-full p-8 w-32 h-32 mx-auto mb-6 shadow-xl flex items-center justify-center border-4 border-primary">
                  <Heart className="h-16 w-16 text-primary" />
                </div>
                <h3 className="text-3xl font-black text-gray-900 mb-2">15+ Years</h3>
                <p className="text-gray-700 font-semibold text-lg">of Culinary Excellence</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-4xl font-black text-gray-900 mb-6">
              Our <span className="text-primary">Story</span>
            </h3>
            <div className="space-y-6">
              <p className="text-gray-700 text-lg leading-relaxed">
                <strong className="text-primary">Yolo a unit of Sri Nidhi Catering</strong> is an independent Catering Company based in Coimbatore 
                providing professional catering services to private and corporate clients. Building on the 
                legacy of <strong className="text-header-bar">Kovai Catering</strong>, our food creates a delightful memory that your taste buds will 
                fondly remember forever.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Ours is a <strong className="text-primary">mega food production set-up</strong> with a state-of-the-art kitchen and our outlet caters 
                to the hunger pangs of thousands of people daily, creating a variety of dishes. With chefs 
                who can cook a wide range of authentic, traditional dishes from any chosen cuisine and 
                technology that brings menus at the click of a button.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Carrying forward the trusted reputation of <strong className="text-header-bar">Kovai Catering</strong>, Yolo Caterers has the winning 
                combination to keep your tummy happy, whether it's intimate family gatherings, grand weddings, 
                or corporate events. We bring <strong className="text-primary">excellence and flavor</strong> to every occasion with over 15 years of 
                culinary expertise.
              </p>
            </div>
          </div>
        </div>

        {/* Values section with vibrant styling and gold accents */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-gold/30 hover:border-gold group hover:-translate-y-2"
            >
              <div className="bg-gradient-to-br from-primary to-accent rounded-full p-6 w-20 h-20 mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg border-2 border-gold/20">
                <value.icon className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-black text-gray-900 mb-4">{value.title}</h4>
              <p className="text-gray-700 leading-relaxed">{value.description}</p>
              {/* Gold accent divider for premium touch */}
              <div className="w-12 h-1 bg-gold rounded-full mx-auto mt-4"></div>
            </div>
          ))}
        </div>

        {/* Awards & Achievements Section */}
        <div className="mt-32 bg-gradient-to-br from-primary/5 to-accent/10 rounded-3xl p-12 border-2 border-gold/20">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-black text-gray-900 mb-6">
              Awards & <span className="text-primary">Recognition</span>
            </h3>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium leading-relaxed">
              Our commitment to excellence has been recognized with prestigious awards and certifications
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-gold/30">
                  <div className="flex items-center mb-4">
                    <Trophy className="h-8 w-8 text-gold mr-4" />
                    <h4 className="text-2xl font-black text-gray-900">Excellence Award</h4>
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Recognized for outstanding catering services and customer satisfaction across 500+ successful events.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-gold/30">
                  <div className="flex items-center mb-4">
                    <Shield className="h-8 w-8 text-primary mr-4" />
                    <h4 className="text-2xl font-black text-gray-900">Quality Certification</h4>
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Certified for maintaining highest standards of food safety, hygiene, and quality assurance.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-gold/30">
                  <div className="flex items-center mb-4">
                    <Users className="h-8 w-8 text-accent mr-4" />
                    <h4 className="text-2xl font-black text-gray-900">Customer Choice</h4>
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Preferred catering partner for 50,000+ satisfied customers and repeat clients.
                  </p>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative group">
                <img 
                  src="/a1_award.jpg" 
                  alt="Award-Winning Excellence - Sri Nidhi Catering" 
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl border-4 border-gold/30 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h5 className="text-2xl font-black mb-2">Award-Winning Excellence</h5>
                  <p className="text-lg">Recognized for outstanding service and culinary mastery</p>
                </div>
                
                {/* Decorative gold frame corners */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-gold rounded-tl-2xl"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-gold rounded-tr-2xl"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-gold rounded-bl-2xl"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-gold rounded-br-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
