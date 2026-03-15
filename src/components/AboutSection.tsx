import { motion } from "framer-motion";
import { useReveal } from "@/hooks/use-reveal";
import aboutImage from "@/assets/about-restaurant.jpg";

const stats = [
  { value: "15+", label: "Years of Excellence" },
  { value: "3", label: "Michelin Stars" },
  { value: "200+", label: "Curated Wines" },
  { value: "48", label: "Tables Available" },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 36 },
  transition: { duration: 0.85, ease: [0.25, 0.1, 0.25, 1], delay },
});

const EASE = "easeOut" as const;

const fadeLeft = (delay = 0) => ({
  initial: { opacity: 0, x: -48 },
  transition: { duration: 0.9, ease: EASE, delay },
});

const fadeRight = (delay = 0) => ({
  initial: { opacity: 0, x: 48 },
  transition: { duration: 0.9, ease: EASE, delay },
});

export default function AboutSection() {
  const [ref, isInView] = useReveal("-100px");

  return (
    <section id="about" className="py-24 md:py-36 bg-charcoal" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            {...fadeLeft()}
            animate={isInView ? { opacity: 1, x: 0 } : fadeLeft().initial}
            className="relative"
          >
            <img
              src={aboutImage}
              alt="Aurum Restaurant dining room"
              className="w-full h-[520px] object-cover"
            />
            <div className="absolute -bottom-5 -right-5 w-full h-full border border-gold/30 pointer-events-none" />
            <div className="absolute top-6 -right-6 bg-gold p-6 shadow-lg hidden md:flex flex-col items-center justify-center w-28 h-28">
              <span className="font-display text-3xl font-bold text-charcoal leading-none">3★</span>
              <span className="font-body text-[10px] font-bold text-charcoal/80 tracking-widest uppercase mt-1">Michelin</span>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            {...fadeRight(0.15)}
            animate={isInView ? { opacity: 1, x: 0 } : fadeRight(0.15).initial}
          >
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="section-label mb-4"
            >
              Our Story
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.75, delay: 0.3 }}
              className="font-display text-4xl md:text-5xl text-cream mb-6 leading-tight"
            >
              A Passion for<br />
              <span className="text-gold italic">Culinary Art</span>
            </motion.h2>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: "easeInOut" }}
              className="gold-divider mb-8"
              style={{ marginLeft: 0, transformOrigin: "left" }}
            />

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-muted-foreground font-body font-light leading-relaxed mb-5"
            >
              Founded in 2009 by Chef Lucian Moreau, Aurum was born from a singular vision: to create a dining experience where impeccable ingredients, meticulous technique, and soulful hospitality converge.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.7, delay: 0.62 }}
              className="text-muted-foreground font-body font-light leading-relaxed mb-10"
            >
              Our menus change with the seasons, guided by the finest local producers and global artisans. Every plate is an invitation — to slow down, savour, and celebrate.
            </motion.p>

      <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.6, delay: 0.75 }}
            >
              <a href="/menu" className="btn-gold inline-flex">Discover Our Menu</a>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px mt-20 border border-border">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
              transition={{ duration: 0.65, delay: 0.5 + i * 0.1 }}
              className="bg-charcoal-mid px-8 py-10 text-center"
            >
              <div className="font-display text-4xl text-gold mb-2">{stat.value}</div>
              <div className="font-body text-xs text-muted-foreground uppercase tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
