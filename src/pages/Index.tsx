import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import MenuSection from "@/components/MenuSection";
import SignatureSection from "@/components/SignatureSection";
import ReservationSection from "@/components/ReservationSection";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";

const Index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-charcoal">
      <LoadingScreen isVisible={loading} />
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
