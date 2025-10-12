import HeroSection from '../sections/HeroSection';
import { HowItWorks } from '../sections/HowItWorks';
import ImpactSection from '../sections/ImpactSection';
import CommunityImpactSection from '../sections/CommunityImpactSection';

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <HowItWorks />
      <ImpactSection />
      <CommunityImpactSection />
    </div>
  );
};

export default HomePage;