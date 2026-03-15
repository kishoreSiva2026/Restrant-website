import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MenuSection from "@/components/MenuSection";

export default function Menu() {
  return (
    <div className="min-h-screen bg-charcoal">
      <Navbar />
      <div className="pt-28">
        <MenuSection />
      </div>
      <Footer />
    </div>
  );
}
