import { motion } from "framer-motion";
import { useReveal } from "@/hooks/use-reveal";
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from "lucide-react";

const navLinks = ["About", "Menu", "Signature Dishes", "Reservations", "Private Dining", "Gift Cards"];

export default function Footer() {
  const [ref, isInView] = useReveal("-40px");

  return (
    <footer id="contact" className="bg-charcoal border-t border-border">
      <div ref={ref} className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-4 gap-12">
        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="md:col-span-1"
        >
          <div className="font-display text-3xl text-cream tracking-widest mb-4">
            Aurum<span className="text-gold">.</span>
          </div>
          <p className="text-muted-foreground font-body font-light text-sm leading-relaxed mb-6">
            A sanctuary for the discerning palate. Fine dining elevated by passion and precision.
          </p>
          <div className="flex gap-4">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                className="w-9 h-9 border border-border flex items-center justify-center text-muted-foreground hover:border-gold hover:text-gold transition-all"
              >
                <Icon size={15} />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.75, delay: 0.12 }}
        >
          <h4 className="section-label mb-6 text-cream">Navigation</h4>
          <ul className="space-y-3">
            {navLinks.map((l, i) => (
              <motion.li
                key={l}
                initial={{ opacity: 0, x: -12 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
                transition={{ duration: 0.4, delay: 0.25 + i * 0.06 }}
              >
                <a href="#" className="text-muted-foreground hover:text-gold font-body text-sm transition-colors">
                  {l}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Hours */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.75, delay: 0.22 }}
        >
          <h4 className="section-label mb-6 text-cream">Hours</h4>
          <ul className="space-y-3 font-body text-sm">
            {[
              { days: "Monday – Thursday", hours: "6:00 PM – 10:30 PM" },
              { days: "Friday – Saturday", hours: "5:30 PM – 11:30 PM" },
              { days: "Sunday", hours: "6:00 PM – 10:00 PM" },
            ].map((row, i) => (
              <motion.li
                key={row.days}
                initial={{ opacity: 0, x: -12 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
                transition={{ duration: 0.4, delay: 0.35 + i * 0.09 }}
                className="flex items-start gap-2 text-muted-foreground"
              >
                <Clock size={13} className="mt-0.5 text-gold flex-shrink-0" />
                <div>
                  <div>{row.days}</div>
                  <div className="text-cream">{row.hours}</div>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.75, delay: 0.32 }}
        >
          <h4 className="section-label mb-6 text-cream">Contact</h4>
          <ul className="space-y-4 font-body text-sm text-muted-foreground">
            <li className="flex items-start gap-3">
              <MapPin size={14} className="mt-0.5 text-gold flex-shrink-0" />
              <span>12 Rue de la Paix<br />Paris, 75001, France</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={14} className="text-gold flex-shrink-0" />
              <a href="tel:+33142603000" className="hover:text-gold transition-colors">+33 1 42 60 30 00</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={14} className="text-gold flex-shrink-0" />
              <a href="mailto:reservations@aurum.fr" className="hover:text-gold transition-colors">
                reservations@aurum.fr
              </a>
            </li>
          </ul>
          <div className="mt-8">
            <motion.a
              href="#reservations"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="btn-gold text-xs py-3 px-6 inline-flex"
            >
              Reserve Now
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.65 }}
        className="border-t border-border"
      >
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground font-body">
          <span>© 2026 Aurum Restaurant. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gold transition-colors">Allergen Info</a>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
