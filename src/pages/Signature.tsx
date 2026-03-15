import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SignatureSection from "@/components/SignatureSection";

export default function Signature() {
  return (
    <div className="min-h-screen bg-charcoal">
      <Navbar />
      <div className="pt-28">
        <SignatureSection />
      </div>
      <Footer />
    </div>
  );
}
