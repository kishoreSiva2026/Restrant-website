import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReservationSection from "@/components/ReservationSection";

export default function Reservation() {
  return (
    <div className="min-h-screen bg-charcoal">
      <Navbar />
      <div className="pt-28">
        <ReservationSection />
      </div>
      <Footer />
    </div>
  );
}
