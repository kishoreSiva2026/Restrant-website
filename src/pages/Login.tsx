import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (authError) {
      setError(authError.message);
    } else {
      navigate("/");
    }
  };

  const inputClass =
    "w-full bg-charcoal border border-border text-cream font-body font-light px-4 py-3 pl-11 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors";

  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center px-4">
      {/* Background subtle pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "repeating-linear-gradient(45deg, hsl(42,60%,52%) 0, hsl(42,60%,52%) 1px, transparent 0, transparent 50%)", backgroundSize: "24px 24px" }} />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: "easeOut" }}
        className="relative w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-10">
          <Link to="/" className="font-display text-4xl text-cream tracking-widest inline-block">
            Aurum<span className="text-gold">.</span>
          </Link>
          <div className="h-px w-12 bg-gold/60 mx-auto mt-4 mb-4" />
          <p className="section-label">Member Sign In</p>
        </div>

        <div className="bg-charcoal-mid border border-border p-10">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input type="email" placeholder="Email Address" required value={email}
                onChange={(e) => setEmail(e.target.value)} className={inputClass} />
            </div>
            <div className="relative">
              <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input type="password" placeholder="Password" required value={password}
                onChange={(e) => setPassword(e.target.value)} className={inputClass} />
            </div>

            {error && (
              <p className="text-sm text-center font-body" style={{ color: "hsl(var(--destructive))" }}>{error}</p>
            )}

            <button type="submit" disabled={loading}
              className="btn-gold w-full flex items-center justify-center gap-2 disabled:opacity-60">
              <LogIn size={16} />
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-border text-center">
            <p className="text-muted-foreground font-body text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="text-gold hover:text-gold-light transition-colors">
                Create one
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center mt-6 text-xs text-muted-foreground font-body">
          <Link to="/" className="hover:text-gold transition-colors">← Back to Aurum</Link>
        </p>
      </motion.div>
    </div>
  );
}
