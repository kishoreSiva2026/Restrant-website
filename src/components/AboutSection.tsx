import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import aboutImage from "@/assets/about-restaurant.jpg";

const stats = [
  { value: "15+", label: "Years of Excellence" },
  { value: "3", label: "Michelin Stars" },
  { value: "200+", label: "Curated Wines" },
  { value: "48", label: "Tables Available" },
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 md:py-36 bg-charcoal" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9 }}
            className="relative"
          >
            <img
              src={aboutImage}
              alt="Aurum Restaurant dining room"
              className="w-full h-[520px] object-cover"
            />
            {/* Gold border accent */}
            <div className="absolute -bottom-5 -right-5 w-full h-full border border-gold/30 pointer-events-none" />

            {/* Award badge */}
            <div className="absolute top-6 -right-6 bg-gold p-6 shadow-lg hidden md:flex flex-col items-center justify-center w-28 h-28">
              <span className="font-display text-3xl font-bold text-charcoal leading-none">3★</span>
              <span className="font-body text-[10px] font-bold text-charcoal/80 tracking-widest uppercase mt-1">Michelin</span>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15 }}
          >
            <p className="section-label mb-4">Our Story</p>
            <h2 className="font-display text-4xl md:text-5xl text-cream mb-6 leading-tight">
              A Passion for<br />
              <span className="text-gold italic">Culinary Art</span>
            </h2>

            <div className="gold-divider mb-8" style={{ marginLeft: 0 }} />

            <p className="text-muted-foreground font-body font-light leading-relaxed mb-5">
              Founded in 2009 by Chef Lucian Moreau, Aurum was born from a singular vision: to create a dining experience where impeccable ingredients, meticulous technique, and soulful hospitality converge.
            </p>
            <p className="text-muted-foreground font-body font-light leading-relaxed mb-10">
              Our menus change with the seasons, guided by the finest local producers and global artisans. Every plate is an invitation — to slow down, savour, and celebrate.
            </p>

            <a href="#menu" className="btn-gold inline-flex">
              Discover Our Menu
            </a>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px mt-20 border border-border"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="bg-charcoal-mid px-8 py-10 text-center">
              <div className="font-display text-4xl text-gold mb-2">{stat.value}</div>
              <div className="font-body text-xs text-muted-foreground uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
