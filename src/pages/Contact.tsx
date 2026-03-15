import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter, Send } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const hours = [
  { days: "Monday – Thursday", time: "6:00 PM – 10:30 PM" },
  { days: "Friday – Saturday", time: "5:30 PM – 11:30 PM" },
  { days: "Sunday", time: "6:00 PM – 10:00 PM" },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, ease: "easeOut", delay },
});

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 5000);
  };

  const inputClass =
    "w-full bg-charcoal border border-border text-cream font-body font-light px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors";

  return (
    <div className="min-h-screen bg-charcoal">
      <Navbar />
      <main className="pt-28 pb-0">
        {/* Hero banner */}
        <section className="py-20 text-center border-b border-border">
          <motion.p {...fadeUp(0)} className="section-label mb-4">Get in Touch</motion.p>
          <motion.h1 {...fadeUp(0.1)} className="font-display text-5xl md:text-7xl text-cream mb-5">
            Contact <span className="text-gold italic">Us</span>
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeInOut" }}
            className="gold-divider mb-6"
            style={{ transformOrigin: "center" }}
          />
          <motion.p {...fadeUp(0.4)} className="text-muted-foreground font-body max-w-md mx-auto">
            We'd love to hear from you — whether it's a reservation inquiry, private event, or simply to say hello.
          </motion.p>
        </section>

        {/* Info + Form */}
        <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16">
          {/* Left: info */}
          <div className="space-y-10">
            <motion.div {...fadeUp(0.1)}>
              <h3 className="font-display text-2xl text-cream mb-6">Find Us</h3>
              <ul className="space-y-5 font-body text-sm text-muted-foreground">
                <li className="flex items-start gap-4">
                  <div className="w-9 h-9 border border-border flex items-center justify-center flex-shrink-0">
                    <MapPin size={15} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-cream font-medium mb-0.5">Address</p>
                    12 Rue de la Paix<br />Paris, 75001, France
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-9 h-9 border border-border flex items-center justify-center flex-shrink-0">
                    <Phone size={15} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-cream font-medium mb-0.5">Phone</p>
                    <a href="tel:+33142603000" className="hover:text-gold transition-colors">+33 1 42 60 30 00</a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-9 h-9 border border-border flex items-center justify-center flex-shrink-0">
                    <Mail size={15} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-cream font-medium mb-0.5">Email</p>
                    <a href="mailto:reservations@aurum.fr" className="hover:text-gold transition-colors">reservations@aurum.fr</a>
                  </div>
                </li>
              </ul>
            </motion.div>

            <motion.div {...fadeUp(0.2)}>
              <h3 className="font-display text-2xl text-cream mb-5">Opening Hours</h3>
              <ul className="space-y-3">
                {hours.map((h) => (
                  <li key={h.days} className="flex items-start gap-3 font-body text-sm text-muted-foreground">
                    <Clock size={13} className="mt-0.5 text-gold flex-shrink-0" />
                    <div>
                      <span className="text-cream">{h.days}</span>
                      <br />{h.time}
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div {...fadeUp(0.3)}>
              <h3 className="font-display text-xl text-cream mb-4">Follow Us</h3>
              <div className="flex gap-3">
                {[Instagram, Facebook, Twitter].map((Icon, i) => (
                  <a key={i} href="#"
                    className="w-10 h-10 border border-border flex items-center justify-center text-muted-foreground hover:border-gold hover:text-gold transition-all">
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: contact form */}
          <motion.div {...fadeUp(0.2)}>
            <h3 className="font-display text-2xl text-cream mb-8">Send a Message</h3>
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="border border-gold/40 bg-gold/5 p-10 text-center"
              >
                <div className="w-12 h-12 border border-gold mx-auto mb-4 flex items-center justify-center">
                  <span className="text-gold text-xl font-display">✓</span>
                </div>
                <p className="text-cream font-display text-lg mb-2">Message Sent</p>
                <p className="text-muted-foreground font-body text-sm">We'll get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <input type="text" placeholder="Your Name" required value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={inputClass} />
                  <input type="email" placeholder="Email Address" required value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={inputClass} />
                </div>
                <input type="text" placeholder="Subject" value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className={inputClass} />
                <textarea placeholder="Your message..." rows={6} required value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`${inputClass} resize-none`} />
                <button type="submit" className="btn-gold flex items-center gap-2 w-full sm:w-auto px-12">
                  <Send size={15} /> Send Message
                </button>
              </form>
            )}
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
