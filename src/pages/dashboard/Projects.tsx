import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Pencil, Trash2, FolderKanban, X, Check } from "lucide-react";
import { useRealtimeProjects } from "@/hooks/use-realtime-projects";

type Project = {
  id: string;
  name: string;
  description: string | null;
  status: string;
  created_at: string;
};

type Status = "active" | "archived" | "completed";

const STATUS_STYLES: Record<Status, string> = {
  active: "text-emerald-400 bg-emerald-900/30 border-emerald-700/40",
  completed: "text-primary bg-primary/10 border-primary/30",
  archived: "text-muted-foreground bg-secondary border-border",
};

const STATUSES: Status[] = ["active", "completed", "archived"];

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", description: "", status: "active" as Status });
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<Status | "all">("all");

  const fetch = async () => {
    setLoading(true);
    const { data } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
    setProjects(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetch(); }, []);

  const openCreate = () => {
    setEditId(null);
    setForm({ name: "", description: "", status: "active" });
    setShowForm(true);
  };

  const openEdit = (p: Project) => {
    setEditId(p.id);
    setForm({ name: p.name, description: p.description ?? "", status: p.status as Status });
    setShowForm(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setSaving(true);
    if (editId) {
      await supabase.from("projects").update({ ...form, updated_at: new Date().toISOString() }).eq("id", editId);
    } else {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) await supabase.from("projects").insert({ ...form, user_id: user.id });
    }
    setSaving(false);
    setShowForm(false);
    fetch();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    setDeletingId(id);
    await supabase.from("projects").delete().eq("id", id);
    setProjects(prev => prev.filter(p => p.id !== id));
    setDeletingId(null);
  };

  const filtered = filter === "all" ? projects : projects.filter(p => p.status === filter);
  const counts = {
    all: projects.length,
    active: projects.filter(p => p.status === "active").length,
    completed: projects.filter(p => p.status === "completed").length,
    archived: projects.filter(p => p.status === "archived").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-foreground">Projects</h1>
          <p className="font-body text-muted-foreground text-sm mt-1">Manage and track all your projects.</p>
        </div>
        <button onClick={openCreate} className="btn-gold flex items-center gap-2 text-xs px-5 py-3">
          <Plus size={15} /> New Project
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 p-1 bg-card border border-border rounded-lg w-fit">
        {(["all", "active", "completed", "archived"] as const).map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-md text-xs font-body transition-colors capitalize ${
              filter === s ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}>
            {s} <span className="ml-1 opacity-70">({counts[s]})</span>
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => <div key={i} className="h-40 bg-card border border-border rounded-lg animate-pulse" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-card border border-border rounded-lg p-14 text-center">
          <FolderKanban size={36} className="text-muted-foreground mx-auto mb-3" />
          <p className="font-body text-muted-foreground text-sm mb-4">No {filter !== "all" ? filter : ""} projects yet.</p>
          <button onClick={openCreate} className="btn-gold text-xs px-6 py-2.5">Create Project</button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(p => (
            <div key={p.id} className="bg-card border border-border rounded-lg p-5 flex flex-col gap-3 hover:border-primary/40 transition-colors">
              <div className="flex items-start justify-between gap-2">
                <p className="font-body text-sm text-foreground font-medium leading-snug">{p.name}</p>
                <span className={`text-xs font-body px-2 py-0.5 rounded-full border capitalize flex-shrink-0 ${STATUS_STYLES[p.status as Status] ?? STATUS_STYLES.active}`}>
                  {p.status}
                </span>
              </div>
              {p.description && <p className="font-body text-xs text-muted-foreground leading-relaxed line-clamp-2">{p.description}</p>}
              <div className="mt-auto flex items-center justify-between pt-2 border-t border-border/50">
                <p className="font-body text-xs text-muted-foreground">
                  {new Date(p.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </p>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(p)} className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary rounded transition-colors">
                    <Pencil size={13} />
                  </button>
                  <button onClick={() => handleDelete(p.id)} disabled={deletingId === p.id}
                    className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded transition-colors disabled:opacity-40">
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-background/80 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-lg w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-xl text-foreground">{editId ? "Edit Project" : "New Project"}</h2>
              <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block font-body text-xs text-muted-foreground uppercase tracking-widest mb-1.5">Name *</label>
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required
                  placeholder="Project name"
                  className="w-full bg-secondary border border-input text-foreground font-body px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors rounded-md" />
              </div>
              <div>
                <label className="block font-body text-xs text-muted-foreground uppercase tracking-widest mb-1.5">Description</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="Optional description…" rows={3}
                  className="w-full bg-secondary border border-input text-foreground font-body px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors rounded-md resize-none" />
              </div>
              <div>
                <label className="block font-body text-xs text-muted-foreground uppercase tracking-widest mb-1.5">Status</label>
                <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as Status }))}
                  className="w-full bg-secondary border border-input text-foreground font-body px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors rounded-md">
                  {STATUSES.map(s => <option key={s} value={s} className="capitalize">{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                </select>
              </div>
              <div className="flex gap-3 pt-1">
                <button type="button" onClick={() => setShowForm(false)}
                  className="flex-1 py-2.5 border border-border text-muted-foreground hover:text-foreground font-body text-sm rounded-md transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={saving}
                  className="flex-1 btn-gold py-2.5 flex items-center justify-center gap-2 text-xs disabled:opacity-50">
                  {saving ? "Saving…" : <><Check size={14} /> {editId ? "Save Changes" : "Create"}</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
