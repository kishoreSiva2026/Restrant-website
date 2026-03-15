import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const links = [
  { label: "About", href: "/about" },
  { label: "Menu", href: "/menu" },
  { label: "Signature", href: "/signature" },
  { label: "Reservations", href: "/reservation" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const location = useLocation();

  // Transparent navbar only on home page
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setLoggedIn(!!session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, s) => setLoggedIn(!!s));
    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const solid = !isHome || scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        solid ? "py-3 bg-charcoal/95 backdrop-blur-md border-b border-border" : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-display text-2xl text-cream tracking-widest">
          Aurum<span className="text-gold">.</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`nav-link ${location.pathname === link.href ? "text-gold" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA + Auth */}
        <div className="hidden md:flex items-center gap-3">
          {loggedIn ? (
            <button onClick={handleLogout} className="nav-link flex items-center gap-1.5">
              <User size={14} /> Sign Out
            </button>
          ) : (
            <Link to="/login" className="nav-link flex items-center gap-1.5">
              <User size={14} /> Sign In
            </Link>
          )}
          <Link to="/reservation" className="btn-gold text-xs py-3 px-6">
            Reserve a Table
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-cream"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-charcoal-mid border-t border-border px-6 py-8 flex flex-col gap-6"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`nav-link text-base ${location.pathname === link.href ? "text-gold" : ""}`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {loggedIn ? (
              <button onClick={() => { handleLogout(); setMobileOpen(false); }}
                className="nav-link text-left flex items-center gap-1.5">
                <User size={14} /> Sign Out
              </button>
            ) : (
              <Link to="/login" onClick={() => setMobileOpen(false)}
                className="nav-link flex items-center gap-1.5">
                <User size={14} /> Sign In
              </Link>
            )}
            <Link to="/reservation" className="btn-gold text-center mt-2" onClick={() => setMobileOpen(false)}>
              Reserve a Table
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
