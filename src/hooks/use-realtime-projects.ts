import { useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Project = {
  id: string;
  name: string;
  status: string;
};

type Options = {
  onInsert?: (project: Project) => void;
  onUpdate?: (project: Project, oldProject: Project) => void;
  onDelete?: (project: Project) => void;
};

const STATUS_LABELS: Record<string, string> = {
  active: "Active",
  completed: "Completed",
  archived: "Archived",
};

const STATUS_ICONS: Record<string, string> = {
  active: "🟢",
  completed: "✅",
  archived: "📦",
};

export function useRealtimeProjects(options: Options = {}) {
  const optionsRef = useRef(options);
  optionsRef.current = options;

  useEffect(() => {
    const channel = supabase
      .channel("projects-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "projects" },
        (payload) => {
          const project = payload.new as Project;
          toast.success(`Project created`, {
            description: `"${project.name}" has been added.`,
            duration: 4000,
          });
          optionsRef.current.onInsert?.(project);
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "projects" },
        (payload) => {
          const newProject = payload.new as Project;
          const oldProject = payload.old as Project;

          if (oldProject.status && newProject.status !== oldProject.status) {
            const icon = STATUS_ICONS[newProject.status] ?? "🔄";
            const label = STATUS_LABELS[newProject.status] ?? newProject.status;
            toast(`${icon} Status changed`, {
              description: `"${newProject.name}" is now ${label}.`,
              duration: 4500,
            });
          } else {
            toast(`✏️ Project updated`, {
              description: `"${newProject.name}" was updated.`,
              duration: 3500,
            });
          }
          optionsRef.current.onUpdate?.(newProject, oldProject);
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "projects" },
        (payload) => {
          const project = payload.old as Project;
          toast.error(`Project deleted`, {
            description: project.name ? `"${project.name}" has been removed.` : "A project was deleted.",
            duration: 4000,
          });
          optionsRef.current.onDelete?.(project);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
}
