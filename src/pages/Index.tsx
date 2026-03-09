import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import MenuSection from "@/components/MenuSection";
import SignatureSection from "@/components/SignatureSection";
import ReservationSection from "@/components/ReservationSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-charcoal">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <MenuSection />
      <SignatureSection />
      <ReservationSection />
      <Footer />
    </div>
  );
};

export default Index;
