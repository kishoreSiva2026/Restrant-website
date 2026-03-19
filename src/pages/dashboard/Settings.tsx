import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Check, User } from "lucide-react";

export default function Settings() {
  const { user } = useAuth();
  const [fullName, setFullName] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState<{ text: string; error?: boolean } | null>(null);

  useEffect(() => {
    if (user) {
      setFullName(user.user_metadata?.full_name ?? "");
    }
  }, [user]);

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await Promise.all([
      supabase.auth.updateUser({ data: { full_name: fullName } }),
      supabase.from("profiles").update({ full_name: fullName, updated_at: new Date().toISOString() }).eq("id", user!.id),
    ]);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      setPasswordMsg({ text: "Password must be at least 6 characters.", error: true });
      return;
    }
    setPasswordSaving(true);
    const { error } = await supabase.auth.updateUser({ password });
    setPasswordSaving(false);
    if (error) {
      setPasswordMsg({ text: error.message, error: true });
    } else {
      setPasswordMsg({ text: "Password updated successfully." });
      setPassword("");
    }
    setTimeout(() => setPasswordMsg(null), 3000);
  };

  return (
    <div className="space-y-8 max-w-xl">
      <div>
        <h1 className="font-display text-3xl text-foreground">Settings</h1>
        <p className="font-body text-muted-foreground text-sm mt-1">Manage your account preferences.</p>
      </div>

      {/* Profile section */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-border bg-secondary/30">
          <div className="flex items-center gap-2">
            <User size={15} className="text-muted-foreground" />
            <h2 className="font-body text-sm font-medium text-foreground">Profile</h2>
          </div>
        </div>
        <div className="p-6">
          <form onSubmit={handleProfileSave} className="space-y-4">
            <div>
              <label className="block font-body text-xs text-muted-foreground uppercase tracking-widest mb-1.5">Full Name</label>
              <input value={fullName} onChange={e => setFullName(e.target.value)}
                placeholder="Your name"
                className="w-full bg-secondary border border-input text-foreground font-body px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors rounded-md" />
            </div>
            <div>
              <label className="block font-body text-xs text-muted-foreground uppercase tracking-widest mb-1.5">Email</label>
              <input value={user?.email ?? ""} disabled
                className="w-full bg-secondary/50 border border-input text-muted-foreground font-body px-4 py-2.5 text-sm rounded-md cursor-not-allowed" />
            </div>
            <button type="submit" disabled={saving}
              className="btn-gold flex items-center gap-2 text-xs px-6 py-2.5 disabled:opacity-50">
              {saved ? <><Check size={14} /> Saved!</> : saving ? "Saving…" : "Save Changes"}
            </button>
          </form>
        </div>
      </div>

      {/* Password section */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-border bg-secondary/30">
          <h2 className="font-body text-sm font-medium text-foreground">Change Password</h2>
        </div>
        <div className="p-6">
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="block font-body text-xs text-muted-foreground uppercase tracking-widest mb-1.5">New Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                placeholder="Min. 6 characters"
                className="w-full bg-secondary border border-input text-foreground font-body px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors rounded-md" />
            </div>
            {passwordMsg && (
              <p className={`text-sm font-body ${passwordMsg.error ? "text-destructive" : "text-emerald-400"}`}>
                {passwordMsg.text}
              </p>
            )}
            <button type="submit" disabled={passwordSaving || !password}
              className="btn-gold flex items-center gap-2 text-xs px-6 py-2.5 disabled:opacity-50">
              {passwordSaving ? "Updating…" : "Update Password"}
            </button>
          </form>
        </div>
      </div>

      {/* Account info */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="font-body text-sm font-medium text-foreground mb-3">Account Info</h2>
        <div className="space-y-2">
          <div className="flex justify-between text-sm font-body">
            <span className="text-muted-foreground">User ID</span>
            <span className="text-foreground text-xs font-mono truncate max-w-[180px]">{user?.id}</span>
          </div>
          <div className="flex justify-between text-sm font-body">
            <span className="text-muted-foreground">Member since</span>
            <span className="text-foreground">{user?.created_at ? new Date(user.created_at).toLocaleDateString("en-US", { month: "long", year: "numeric" }) : "—"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
