import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { LogIn, LogOut, Check, X, Clock, Trash2, Users, Calendar, RefreshCw } from "lucide-react";

type Reservation = Database["public"]["Tables"]["reservations"]["Row"];
type Status = "pending" | "confirmed" | "cancelled";

const STATUS_STYLES: Record<Status, string> = {
  pending:   "bg-amber-900/40 text-amber-300 border border-amber-700/50",
  confirmed: "bg-emerald-900/40 text-emerald-300 border border-emerald-700/50",
  cancelled: "bg-red-900/40 text-red-300 border border-red-700/50",
};

const STATUS_ICONS: Record<Status, React.ReactNode> = {
  pending:   <Clock size={12} />,
  confirmed: <Check size={12} />,
  cancelled: <X size={12} />,
};

export default function Admin() {
  const [session, setSession] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [authLoading, setAuthLoading] = useState(true);

  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [filter, setFilter] = useState<Status | "all">("all");
  const [dataLoading, setDataLoading] = useState(false);
  const [updating, setUpdating] = useState<string | null>(null);

  // Check auth state on mount
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(!!session);
      setAuthLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, s) => {
      setSession(!!s);
    });
    return () => subscription.unsubscribe();
  }, []);

  // Fetch reservations when logged in
  useEffect(() => {
    if (session) fetchReservations();
  }, [session]);

  const fetchReservations = async () => {
    setDataLoading(true);
    const { data } = await supabase
      .from("reservations")
      .select("*")
      .order("date", { ascending: true })
      .order("time", { ascending: true });
    setReservations(data ?? []);
    setDataLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setAuthLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setAuthLoading(false);
    if (error) setLoginError(error.message);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const updateStatus = async (id: string, status: Status) => {
    setUpdating(id);
    await supabase.from("reservations").update({ status }).eq("id", id);
    setReservations((prev) => prev.map((r) => r.id === id ? { ...r, status } : r));
    setUpdating(null);
  };

  const deleteReservation = async (id: string) => {
    if (!confirm("Delete this reservation?")) return;
    await supabase.from("reservations").delete().eq("id", id);
    setReservations((prev) => prev.filter((r) => r.id !== id));
  };

  const filtered = filter === "all" ? reservations : reservations.filter((r) => r.status === filter);

  const counts = {
    all: reservations.length,
    pending: reservations.filter((r) => r.status === "pending").length,
    confirmed: reservations.filter((r) => r.status === "confirmed").length,
    cancelled: reservations.filter((r) => r.status === "cancelled").length,
  };

  // --- Loading skeleton ---
  if (authLoading) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // --- Login screen ---
  if (!session) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-10">
            <p className="font-display text-gold tracking-[0.3em] text-sm mb-2">AURUM</p>
            <h1 className="font-display text-3xl text-cream">Admin Panel</h1>
            <div className="h-px w-12 bg-gold/60 mx-auto mt-4" />
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email" placeholder="Email" required value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-charcoal-mid border border-border text-cream font-body px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors"
            />
            <input
              type="password" placeholder="Password" required value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-charcoal-mid border border-border text-cream font-body px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors"
            />
            {loginError && <p className="text-sm text-red-400 font-body">{loginError}</p>}
            <button type="submit"
              className="btn-gold w-full flex items-center justify-center gap-2">
              <LogIn size={16} /> Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- Admin dashboard ---
  return (
    <div className="min-h-screen bg-charcoal">
      {/* Top bar */}
      <header className="border-b border-border bg-charcoal-mid px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-display text-gold tracking-[0.25em] text-sm">AURUM</span>
          <span className="text-border">|</span>
          <span className="font-body text-cream text-sm">Reservations</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={fetchReservations}
            className="p-2 text-muted-foreground hover:text-gold transition-colors"
            title="Refresh">
            <RefreshCw size={16} />
          </button>
          <button onClick={handleLogout}
            className="flex items-center gap-2 text-sm font-body text-muted-foreground hover:text-cream transition-colors">
            <LogOut size={15} /> Sign Out
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {(["all", "pending", "confirmed", "cancelled"] as const).map((s) => (
            <button key={s} onClick={() => setFilter(s)}
              className={`p-4 border text-left transition-all ${
                filter === s
                  ? "border-gold bg-charcoal-mid"
                  : "border-border bg-charcoal-mid/40 hover:border-gold/50"
              }`}>
              <p className="text-muted-foreground font-body text-xs uppercase tracking-widest mb-1 capitalize">{s}</p>
              <p className="font-display text-3xl text-cream">{counts[s]}</p>
            </button>
          ))}
        </div>

        {/* Table */}
        {dataLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground font-body">
            No {filter === "all" ? "" : filter} reservations yet.
          </div>
        ) : (
          <div className="border border-border overflow-hidden">
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm font-body">
                <thead>
                  <tr className="border-b border-border bg-charcoal-mid/60">
                    {["Guest", "Contact", "Date & Time", "Guests", "Notes", "Status", "Actions"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs text-muted-foreground uppercase tracking-widest font-normal">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r, i) => (
                    <tr key={r.id}
                      className={`border-b border-border/50 transition-colors hover:bg-charcoal-mid/40 ${i % 2 === 0 ? "" : "bg-charcoal-mid/20"}`}>
                      <td className="px-4 py-3 text-cream font-medium">{r.name}</td>
                      <td className="px-4 py-3">
                        <p className="text-cream">{r.email}</p>
                        {r.phone && <p className="text-muted-foreground text-xs mt-0.5">{r.phone}</p>}
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-cream">{new Date(r.date + "T00:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}</p>
                        <p className="text-muted-foreground text-xs mt-0.5">{r.time}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className="flex items-center gap-1.5 text-cream">
                          <Users size={13} className="text-muted-foreground" />{r.guests}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground max-w-[160px] truncate" title={r.notes ?? ""}>
                        {r.notes || "—"}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-sm text-xs capitalize ${STATUS_STYLES[r.status as Status]}`}>
                          {STATUS_ICONS[r.status as Status]} {r.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          {r.status !== "confirmed" && (
                            <button onClick={() => updateStatus(r.id, "confirmed")}
                              disabled={updating === r.id}
                              className="p-1.5 text-emerald-400 hover:bg-emerald-900/30 rounded transition-colors disabled:opacity-40"
                              title="Confirm">
                              <Check size={14} />
                            </button>
                          )}
                          {r.status !== "pending" && (
                            <button onClick={() => updateStatus(r.id, "pending")}
                              disabled={updating === r.id}
                              className="p-1.5 text-amber-400 hover:bg-amber-900/30 rounded transition-colors disabled:opacity-40"
                              title="Mark pending">
                              <Clock size={14} />
                            </button>
                          )}
                          {r.status !== "cancelled" && (
                            <button onClick={() => updateStatus(r.id, "cancelled")}
                              disabled={updating === r.id}
                              className="p-1.5 text-red-400 hover:bg-red-900/30 rounded transition-colors disabled:opacity-40"
                              title="Cancel">
                              <X size={14} />
                            </button>
                          )}
                          <button onClick={() => deleteReservation(r.id)}
                            className="p-1.5 text-muted-foreground hover:text-red-400 hover:bg-red-900/20 rounded transition-colors"
                            title="Delete">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden divide-y divide-border/50">
              {filtered.map((r) => (
                <div key={r.id} className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-cream font-medium font-body">{r.name}</p>
                      <p className="text-muted-foreground text-xs font-body">{r.email}</p>
                    </div>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-sm text-xs capitalize ${STATUS_STYLES[r.status as Status]}`}>
                      {STATUS_ICONS[r.status as Status]} {r.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm font-body text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar size={12} />{new Date(r.date + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                    <span className="flex items-center gap-1"><Clock size={12} />{r.time}</span>
                    <span className="flex items-center gap-1"><Users size={12} />{r.guests}</span>
                  </div>
                  {r.notes && <p className="text-xs text-muted-foreground font-body">{r.notes}</p>}
                  <div className="flex items-center gap-2 pt-1">
                    {r.status !== "confirmed" && (
                      <button onClick={() => updateStatus(r.id, "confirmed")}
                        className="flex items-center gap-1 text-xs px-3 py-1.5 text-emerald-400 border border-emerald-700/50 hover:bg-emerald-900/30 transition-colors">
                        <Check size={12} /> Confirm
                      </button>
                    )}
                    {r.status !== "cancelled" && (
                      <button onClick={() => updateStatus(r.id, "cancelled")}
                        className="flex items-center gap-1 text-xs px-3 py-1.5 text-red-400 border border-red-700/50 hover:bg-red-900/30 transition-colors">
                        <X size={12} /> Cancel
                      </button>
                    )}
                    <button onClick={() => deleteReservation(r.id)}
                      className="ml-auto p-1.5 text-muted-foreground hover:text-red-400 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
