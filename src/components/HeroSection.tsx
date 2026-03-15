import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-restaurant.jpg";

export default function HeroSection() {
  return (
    <section id="hero" className="relative w-full h-screen min-h-[700px] flex items-end overflow-hidden">
      {/* Background Image */}
      <motion.div
        initial={{ scale: 1.06, opacity: 0.7 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img
          src={heroImage}
          alt="Aurum Restaurant interior"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{ background: "var(--gradient-hero)" }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-24 md:pb-32 w-full">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="section-label mb-5"
        >
          Fine Dining Experience
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.9 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl text-cream leading-tight mb-6 max-w-3xl"
        >
          Where Every<br />
          <span className="text-gold italic">Bite</span> Tells<br />
          a Story.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="text-muted-foreground text-lg max-w-md mb-10 font-body font-light leading-relaxed"
        >
          Elevated cuisine crafted from the finest seasonal ingredients. A sanctuary for the discerning palate.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="flex flex-wrap gap-4"
        >
          <a href="#reservations" className="btn-gold">
            Reserve Your Table
          </a>
          <a href="#menu" className="btn-outline-gold">
            Explore Menu
          </a>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 right-8 hidden md:flex flex-col items-center gap-2"
      >
        <span className="section-label" style={{ writingMode: "vertical-rl" }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-10 bg-gold opacity-70"
        />
      </motion.div>
    </section>
  );
}
