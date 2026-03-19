import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { FolderKanban, Files, TrendingUp, Clock } from "lucide-react";
import { Link } from "react-router-dom";

export default function DashboardOverview() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ projects: 0, files: 0 });
  const [recentProjects, setRecentProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const [{ count: projectCount }, { count: fileCount }, { data: recent }] = await Promise.all([
        supabase.from("projects").select("*", { count: "exact", head: true }),
        supabase.from("files").select("*", { count: "exact", head: true }),
        supabase.from("projects").select("*").order("created_at", { ascending: false }).limit(5),
      ]);
      setStats({ projects: projectCount ?? 0, files: fileCount ?? 0 });
      setRecentProjects(recent ?? []);
      setLoading(false);
    };
    load();
  }, []);

  const STATUS_COLORS: Record<string, string> = {
    active: "text-emerald-400 bg-emerald-900/30 border-emerald-700/40",
    completed: "text-primary bg-primary/10 border-primary/30",
    archived: "text-muted-foreground bg-secondary border-border",
  };

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl text-foreground">
          {greeting()}{user?.user_metadata?.full_name ? `, ${user.user_metadata.full_name.split(" ")[0]}` : ""}.
        </h1>
        <p className="font-body text-muted-foreground mt-1 text-sm">Here's what's happening with your workspace.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Projects", value: stats.projects, icon: FolderKanban, color: "text-primary" },
          { label: "Total Files", value: stats.files, icon: Files, color: "text-emerald-400" },
          { label: "Active Projects", value: recentProjects.filter(p => p.status === "active").length, icon: TrendingUp, color: "text-amber-400" },
          { label: "Recent Activity", value: recentProjects.length, icon: Clock, color: "text-blue-400" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-card border border-border rounded-lg p-5">
            <div className="flex items-start justify-between mb-3">
              <p className="font-body text-xs text-muted-foreground uppercase tracking-widest">{label}</p>
              <Icon size={16} className={color} />
            </div>
            <p className="font-display text-3xl text-foreground">
              {loading ? <span className="inline-block w-8 h-7 bg-secondary rounded animate-pulse" /> : value}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Projects */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl text-foreground">Recent Projects</h2>
          <Link to="/dashboard/projects" className="font-body text-xs text-primary hover:underline tracking-wide">
            View all →
          </Link>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-16 bg-card border border-border rounded-lg animate-pulse" />
            ))}
          </div>
        ) : recentProjects.length === 0 ? (
          <div className="bg-card border border-border rounded-lg p-10 text-center">
            <FolderKanban size={32} className="text-muted-foreground mx-auto mb-3" />
            <p className="font-body text-muted-foreground text-sm">No projects yet.</p>
            <Link to="/dashboard/projects" className="btn-gold mt-4 inline-flex text-xs px-6 py-2.5">
              Create First Project
            </Link>
          </div>
        ) : (
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            {recentProjects.map((p, i) => (
              <div key={p.id}
                className={`flex items-center justify-between px-5 py-4 ${i < recentProjects.length - 1 ? "border-b border-border/50" : ""}`}>
                <div>
                  <p className="font-body text-sm text-foreground font-medium">{p.name}</p>
                  {p.description && <p className="font-body text-xs text-muted-foreground mt-0.5 line-clamp-1">{p.description}</p>}
                </div>
                <span className={`text-xs font-body px-2.5 py-1 rounded-full border capitalize ${STATUS_COLORS[p.status] ?? STATUS_COLORS.active}`}>
                  {p.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
