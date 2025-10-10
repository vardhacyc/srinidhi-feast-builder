import { KovaiCartProvider } from '@/contexts/KovaiCartContext';
import DiwaliHero from '@/components/diwali/DiwaliHero';
import DiwaliSweetsMenu from '@/components/diwali/DiwaliSweetsMenu';
import DiwaliFooter from '@/components/diwali/DiwaliFooter';
import DiwaliHeader from '@/components/diwali/DiwaliHeader';
import KovaiFloatingCart from '@/components/KovaiFloatingCart';
import WhatsAppFloat from '@/components/ui/WhatsAppFloat';

const KovaiIndex = () => {
  return (
    <KovaiCartProvider>
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-green-50 to-teal-50">
        <DiwaliHeader />
        <DiwaliHero />
        <DiwaliSweetsMenu />
        <KovaiFloatingCart />
        <DiwaliFooter />
        <WhatsAppFloat 
          phoneNumber="918760101010"
          message="Hi! I'm interested in your products from Kovai Caterers. Could you please provide more information?"
        />
      </div>
    </KovaiCartProvider>
  );
};

export default KovaiIndex;
