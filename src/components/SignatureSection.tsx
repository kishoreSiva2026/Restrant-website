import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useReveal } from "@/hooks/use-reveal";
import duckImage from "@/assets/dish-duck.jpg";
import scallopImage from "@/assets/dish-scallops.jpg";
import dessertImage from "@/assets/dish-dessert.jpg";

const dishes = [
  {
    name: "Seared Duck Breast",
    subtitle: "Cherry Jus · Celeriac · Micro Herbs",
    tag: "Signature Main",
    image: duckImage,
    description: "Our most celebrated dish. Magret duck from the Gascony region, seared to perfection and paired with a velvety morello cherry reduction.",
  },
  {
    name: "Pan Seared Scallops",
    subtitle: "Cauliflower Purée · Crispy Capers · Yuzu",
    tag: "Signature Starter",
    image: scallopImage,
    description: "Hand-dived scallops from the Orkney Islands, caramelised and served over silk-smooth cauliflower purée with a bright citrus note.",
  },
  {
    name: "Chocolate Fondant",
    subtitle: "Gold Leaf · Vanilla Ice Cream · Praline",
    tag: "Signature Dessert",
    image: dessertImage,
    description: "A legendary ending to any evening. Valrhona 70% dark chocolate, a warm liquid centre, and the finest vanilla from Madagascar.",
  },
];

/** Each dish card gets its own InView trigger so it animates as it scrolls in */
function DishCard({ dish, index }: { dish: typeof dishes[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isReversed = index % 2 === 1;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className={`grid md:grid-cols-2 gap-12 items-center ${isReversed ? "md:[direction:rtl]" : ""}`}
    >
      {/* Image */}
      <motion.div
        initial={{ opacity: 0, x: isReversed ? 60 : -60 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isReversed ? 60 : -60 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.05 }}
        className={`relative overflow-hidden ${isReversed ? "md:[direction:ltr]" : ""}`}
      >
        <img
          src={dish.image}
          alt={dish.name}
          className="w-full h-[420px] object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
      </motion.div>

      {/* Text */}
      <div className={isReversed ? "md:[direction:ltr]" : ""}>
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="section-label mb-4 block"
        >
          {dish.tag}
        </motion.span>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="font-display text-3xl md:text-4xl text-cream mb-3"
        >
          {dish.name}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-gold font-body text-sm mb-6 tracking-widest uppercase font-light"
        >
          {dish.subtitle}
        </motion.p>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.65, delay: 0.5, ease: "easeInOut" }}
          className="gold-divider mb-6"
          style={{ marginLeft: 0, transformOrigin: "left" }}
        />
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="text-muted-foreground font-body font-light leading-relaxed text-base mb-8"
        >
          {dish.description}
        </motion.p>
        <motion.a
          href="#menu"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="btn-outline-gold"
        >
          View Full Menu
        </motion.a>
      </div>
    </motion.div>
  );
}

export default function SignatureSection() {
  const [headerRef, headerInView] = useReveal("-60px");

  return (
    <section id="signature" className="py-24 md:py-36 bg-charcoal">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.6 }}
            className="section-label mb-4"
          >
            The Icons
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.75, delay: 0.12 }}
            className="font-display text-4xl md:text-6xl text-cream mb-5"
          >
            Signature <span className="text-gold italic">Dishes</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={headerInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeInOut" }}
            className="gold-divider"
            style={{ transformOrigin: "center" }}
          />
        </div>

        <div className="space-y-24">
          {dishes.map((dish, i) => (
            <DishCard key={dish.name} dish={dish} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
