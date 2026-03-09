import { useRef } from "react";
import { motion, useInView } from "framer-motion";
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

export default function SignatureSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="signature" className="py-24 md:py-36 bg-charcoal" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="section-label mb-4">The Icons</p>
          <h2 className="font-display text-4xl md:text-6xl text-cream mb-5">
            Signature <span className="text-gold italic">Dishes</span>
          </h2>
          <div className="gold-divider" />
        </motion.div>

        {/* Dishes */}
        <div className="space-y-24">
          {dishes.map((dish, i) => (
            <motion.div
              key={dish.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: i * 0.15 }}
              className={`grid md:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "md:[direction:rtl]" : ""}`}
            >
              {/* Image */}
              <div className={`relative overflow-hidden ${i % 2 === 1 ? "md:[direction:ltr]" : ""}`}>
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-[420px] object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
              </div>

              {/* Text */}
              <div className={`${i % 2 === 1 ? "md:[direction:ltr]" : ""}`}>
                <span className="section-label mb-4 block">{dish.tag}</span>
                <h3 className="font-display text-3xl md:text-4xl text-cream mb-3">{dish.name}</h3>
                <p className="text-gold font-body text-sm mb-6 tracking-widest uppercase font-light">{dish.subtitle}</p>
                <div className="gold-divider mb-6" style={{ marginLeft: 0 }} />
                <p className="text-muted-foreground font-body font-light leading-relaxed text-base mb-8">
                  {dish.description}
                </p>
                <a href="#menu" className="btn-outline-gold">
                  View Full Menu
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
