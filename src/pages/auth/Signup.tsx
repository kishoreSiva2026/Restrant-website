import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Eye, EyeOff } from "lucide-react";

export default function SignupPage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email, password,
      options: { data: { full_name: fullName } },
    });
    setLoading(false);
    if (error) { setError(error.message); return; }
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-card border-r border-border flex-col justify-between p-12">
        <span className="font-display text-primary tracking-[0.3em] text-sm">SAAS APP</span>
        <div>
          <h2 className="font-display text-4xl text-foreground mb-4 leading-tight">
            Start your journey<br />
            <span className="text-primary">today.</span>
          </h2>
          <p className="text-muted-foreground font-body text-sm leading-relaxed max-w-xs">
            Join thousands of teams already using SaaS App to ship faster.
          </p>
        </div>
        <p className="text-muted-foreground font-body text-xs">© 2025 SaaS App. All rights reserved.</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <span className="lg:hidden font-display text-primary tracking-[0.3em] text-sm block mb-8">SAAS APP</span>
            <h1 className="font-display text-3xl text-foreground mb-2">Create account</h1>
            <p className="font-body text-muted-foreground text-sm">Get started for free — no credit card required.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-body text-xs text-muted-foreground uppercase tracking-widest mb-1.5">Full Name</label>
              <input
                type="text" value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Jane Doe"
                className="w-full bg-secondary border border-input text-foreground font-body px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors rounded-md"
              />
            </div>
            <div>
              <label className="block font-body text-xs text-muted-foreground uppercase tracking-widest mb-1.5">Email</label>
              <input
                type="email" required value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-secondary border border-input text-foreground font-body px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors rounded-md"
              />
            </div>
            <div>
              <label className="block font-body text-xs text-muted-foreground uppercase tracking-widest mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"} required value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 6 characters"
                  className="w-full bg-secondary border border-input text-foreground font-body px-4 py-3 pr-11 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors rounded-md"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            {error && <p className="text-sm text-destructive font-body">{error}</p>}
            <button type="submit" disabled={loading}
              className="btn-gold w-full disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? "Creating account…" : "Create Account"}
            </button>
          </form>

          <p className="mt-6 text-center font-body text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
