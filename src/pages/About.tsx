import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutSection from "@/components/AboutSection";

export default function About() {
  return (
    <div className="min-h-screen bg-charcoal">
      <Navbar />
      <div className="pt-28">
        <AboutSection />
      </div>
      <Footer />
    </div>
  );
}
