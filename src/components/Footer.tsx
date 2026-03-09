import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-charcoal border-t border-border">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="md:col-span-1">
          <div className="font-display text-3xl text-cream tracking-widest mb-4">
            Aurum<span className="text-gold">.</span>
          </div>
          <p className="text-muted-foreground font-body font-light text-sm leading-relaxed mb-6">
            A sanctuary for the discerning palate. Fine dining elevated by passion and precision.
          </p>
          <div className="flex gap-4">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 border border-border flex items-center justify-center text-muted-foreground hover:border-gold hover:text-gold transition-all"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="section-label mb-6 text-cream">Navigation</h4>
          <ul className="space-y-3">
            {["About", "Menu", "Signature Dishes", "Reservations", "Private Dining", "Gift Cards"].map((l) => (
              <li key={l}>
                <a href="#" className="text-muted-foreground hover:text-gold font-body text-sm transition-colors">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Hours */}
        <div>
          <h4 className="section-label mb-6 text-cream">Hours</h4>
          <ul className="space-y-3 font-body text-sm">
            <li className="flex items-start gap-2 text-muted-foreground">
              <Clock size={13} className="mt-0.5 text-gold flex-shrink-0" />
              <div>
                <div>Monday – Thursday</div>
                <div className="text-cream">6:00 PM – 10:30 PM</div>
              </div>
            </li>
            <li className="flex items-start gap-2 text-muted-foreground">
              <Clock size={13} className="mt-0.5 text-gold flex-shrink-0" />
              <div>
                <div>Friday – Saturday</div>
                <div className="text-cream">5:30 PM – 11:30 PM</div>
              </div>
            </li>
            <li className="flex items-start gap-2 text-muted-foreground">
              <Clock size={13} className="mt-0.5 text-gold flex-shrink-0" />
              <div>
                <div>Sunday</div>
                <div className="text-cream">6:00 PM – 10:00 PM</div>
              </div>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
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
            <a href="#reservations" className="btn-gold text-xs py-3 px-6">
              Reserve Now
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground font-body">
          <span>© 2026 Aurum Restaurant. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gold transition-colors">Allergen Info</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
