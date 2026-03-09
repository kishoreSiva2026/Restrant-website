import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, Clock, Users, User, Mail, Phone, MessageSquare } from "lucide-react";

const timeSlots = ["6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM"];

export default function ReservationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", guests: "2", date: "", time: "7:00 PM", notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: "", email: "", phone: "", guests: "2", date: "", time: "7:00 PM", notes: "" });
  };

  const inputClass =
    "w-full bg-charcoal border border-border text-cream font-body font-light px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors";

  return (
    <section id="reservations" className="py-24 md:py-36" style={{ background: "var(--gradient-section)" }} ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="section-label mb-4">Join Us</p>
          <h2 className="font-display text-4xl md:text-6xl text-cream mb-5">
            Make a <span className="text-gold italic">Reservation</span>
          </h2>
          <div className="gold-divider mb-6" />
          <p className="text-muted-foreground font-body max-w-md mx-auto">
            Reserve your table for an unforgettable evening. We recommend booking at least 48 hours in advance.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-charcoal-mid border border-border p-8 md:p-12"
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="w-16 h-16 border border-gold mx-auto mb-6 flex items-center justify-center">
                <span className="text-gold text-2xl font-display">✓</span>
              </div>
              <h3 className="font-display text-2xl text-cream mb-3">Reservation Confirmed</h3>
              <p className="text-muted-foreground font-body">
                We look forward to welcoming you. A confirmation will be sent to your email shortly.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1 */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="relative">
                  <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={`${inputClass} pl-11`}
                  />
                </div>
                <div className="relative">
                  <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="email"
                    placeholder="Email Address"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={`${inputClass} pl-11`}
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="relative">
                  <Phone size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className={`${inputClass} pl-11`}
                  />
                </div>
                <div className="relative">
                  <Users size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <select
                    value={form.guests}
                    onChange={(e) => setForm({ ...form, guests: e.target.value })}
                    className={`${inputClass} pl-11 appearance-none`}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <option key={n} value={n} className="bg-charcoal-mid">
                        {n} {n === 1 ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="relative">
                  <Calendar size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="date"
                    required
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className={`${inputClass} pl-11`}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div className="relative">
                  <Clock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <select
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                    className={`${inputClass} pl-11 appearance-none`}
                  >
                    {timeSlots.map((t) => (
                      <option key={t} value={t} className="bg-charcoal-mid">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div className="relative">
                <MessageSquare size={15} className="absolute left-4 top-4 text-muted-foreground" />
                <textarea
                  placeholder="Special requests, dietary requirements, or occasion details..."
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  rows={4}
                  className={`${inputClass} pl-11 resize-none`}
                />
              </div>

              <div className="text-center pt-2">
                <button type="submit" className="btn-gold w-full sm:w-auto px-16">
                  Confirm Reservation
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
