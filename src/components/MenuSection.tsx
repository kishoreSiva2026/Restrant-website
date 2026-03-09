import { useState } from "react";
import { motion } from "framer-motion";
import { useReveal } from "@/hooks/use-reveal";

type MenuItem = {
  name: string;
  description: string;
  price: string;
  tag?: string;
};

type MenuCategory = {
  id: string;
  label: string;
  items: MenuItem[];
};

const menuData: MenuCategory[] = [
  {
    id: "starters",
    label: "Starters",
    items: [
      { name: "Tuna Tartare", description: "Bluefin tuna, avocado crème, cucumber pearls, sesame oil, yuzu dressing", price: "$28", tag: "Chef's Pick" },
      { name: "Foie Gras Torchon", description: "Sauternes jelly, brioche mouillette, fig compote, aged balsamic", price: "$34" },
      { name: "Burrata & Heirloom Tomato", description: "Stracciatella, stone-fruit vinaigrette, fresh basil, Sicilian olive oil", price: "$22" },
      { name: "Lobster Bisque", description: "Saffron cream, brandy, cognac, toasted sourdough croutons", price: "$26", tag: "Seasonal" },
      { name: "Wild Mushroom Velouté", description: "Truffle oil, parmesan foam, chervil, crispy shallots", price: "$20" },
      { name: "Beef Carpaccio", description: "Wagyu tenderloin, rocket, capers, aged parmesan, lemon vinaigrette", price: "$32" },
    ],
  },
  {
    id: "mains",
    label: "Mains",
    items: [
      { name: "Seared Duck Breast", description: "Morello cherry jus, celeriac purée, wilted spinach, micro herbs", price: "$54", tag: "Signature" },
      { name: "Pan Seared Halibut", description: "Saffron beurre blanc, pea velouté, pancetta crisps, samphire", price: "$58" },
      { name: "Wagyu Beef Tenderloin", description: "200-day grain-fed, bone marrow butter, roasted shallots, pomme purée", price: "$78", tag: "Chef's Pick" },
      { name: "Roasted Lamb Rack", description: "Herb crust, ratatouille niçoise, anchovy butter, lavender jus", price: "$62" },
      { name: "Truffle Risotto", description: "Acquerello rice, black truffle, aged parmesan, crispy sage, hazelnut", price: "$48", tag: "Vegetarian" },
      { name: "Dover Sole Meunière", description: "Brown butter, lemon, capers, parsley, pommes vapeur", price: "$64" },
    ],
  },
  {
    id: "desserts",
    label: "Desserts",
    items: [
      { name: "Chocolate Fondant", description: "Valrhona dark chocolate, vanilla bean ice cream, gold leaf, praline", price: "$22", tag: "Signature" },
      { name: "Crème Brûlée", description: "Madagascar vanilla, thin caramel crust, seasonal berry compote", price: "$18" },
      { name: "Lemon Tart", description: "Sablé breton, lemon curd, Italian meringue, candied zest", price: "$18" },
      { name: "Cheese Selection", description: "Five artisan cheeses, honeycomb, quince paste, walnut bread", price: "$26" },
      { name: "Mango & Passionfruit", description: "Coconut panna cotta, mango gel, passionfruit caviar, lime tuile", price: "$20", tag: "Seasonal" },
      { name: "Petit Fours", description: "An assortment of handmade chocolates and confections", price: "$14" },
    ],
  },
];

const tagColors: Record<string, string> = {
  "Chef's Pick": "bg-gold/20 text-gold border-gold/30",
  Seasonal: "bg-wine/20 text-wine border-wine/30",
  Signature: "bg-gold/10 text-gold-light border-gold/20",
  Vegetarian: "bg-green-900/30 text-green-400 border-green-700/30",
};

export default function MenuSection() {
  const [activeTab, setActiveTab] = useState("starters");
  const [headerRef, headerInView] = useReveal("-60px");
  const [tabsRef, tabsInView] = useReveal("-40px");

  const active = menuData.find((c) => c.id === activeTab)!;

  return (
    <section id="menu" className="py-24 md:py-36" style={{ background: "var(--gradient-section)" }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.6 }}
            className="section-label mb-4"
          >
            Culinary Journey
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.75, delay: 0.12 }}
            className="font-display text-4xl md:text-6xl text-cream mb-5"
          >
            Our <span className="text-gold italic">Menu</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={headerInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeInOut" }}
            className="gold-divider mb-6"
            style={{ transformOrigin: "center" }}
          />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.65, delay: 0.4 }}
            className="text-muted-foreground font-body max-w-xl mx-auto"
          >
            Inspired by the seasons. Defined by craft. Each dish is a reflection of our commitment to the extraordinary.
          </motion.p>
        </div>

        {/* Tabs */}
        <motion.div
          ref={tabsRef}
          initial={{ opacity: 0, y: 20 }}
          animate={tabsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center gap-0 mb-14 border border-border w-fit mx-auto"
        >
          {menuData.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-8 py-4 font-body text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
                activeTab === cat.id
                  ? "bg-gold text-charcoal"
                  : "bg-charcoal-mid text-muted-foreground hover:text-cream"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Menu Items Grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="grid md:grid-cols-2 gap-4"
        >
          {active.items.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="menu-card p-6 flex justify-between gap-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-display text-lg text-cream">{item.name}</h3>
                  {item.tag && (
                    <span className={`text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 border rounded-sm ${tagColors[item.tag]}`}>
                      {item.tag}
                    </span>
                  )}
                </div>
                <p className="font-body text-sm text-muted-foreground leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
              <div className="font-display text-xl text-gold whitespace-nowrap pt-1">
                {item.price}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: active.items.length * 0.08 + 0.1 }}
          className="text-center mt-14"
        >
          <p className="text-muted-foreground text-sm font-body mb-5">
            Seasonal menu updated weekly · Dietary requirements available on request
          </p>
          <a href="#reservations" className="btn-outline-gold">
            Reserve Your Experience
          </a>
        </motion.div>
      </div>
    </section>
  );
}
