// File: /frontend/src/pages/landing/LandingPage.tsx

import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import AboutSection from "@/components/landing/AboutSection";
import ContactSection from "@/components/landing/ContactSection";

const LandingPage = () => {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <AboutSection />
      <ContactSection /> {/* 2. Add it here */}
    </div>
  );
};

export default LandingPage;
