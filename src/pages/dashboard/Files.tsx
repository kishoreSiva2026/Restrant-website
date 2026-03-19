import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Upload, Trash2, Download, File, Image, FileText, Film, Music, Archive, FolderOpen } from "lucide-react";

type FileRecord = {
  id: string;
  name: string;
  storage_path: string;
  mime_type: string | null;
  size_bytes: number;
  created_at: string;
};

function fileIcon(mime: string | null) {
  if (!mime) return <File size={18} className="text-muted-foreground" />;
  if (mime.startsWith("image/")) return <Image size={18} className="text-blue-400" />;
  if (mime.startsWith("video/")) return <Film size={18} className="text-purple-400" />;
  if (mime.startsWith("audio/")) return <Music size={18} className="text-pink-400" />;
  if (mime.includes("pdf") || mime.includes("text")) return <FileText size={18} className="text-amber-400" />;
  if (mime.includes("zip") || mime.includes("rar")) return <Archive size={18} className="text-orange-400" />;
  return <File size={18} className="text-muted-foreground" />;
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function FilesPage() {
  const { user } = useAuth();
  const [files, setFiles] = useState<FileRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const fetchFiles = async () => {
    setLoading(true);
    const { data } = await supabase.from("files").select("*").order("created_at", { ascending: false });
    setFiles(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchFiles(); }, []);

  const uploadFile = async (file: File) => {
    if (!user) return;
    setUploading(true);
    const path = `${user.id}/${Date.now()}-${file.name}`;
    const { error: storageError } = await supabase.storage.from("user-files").upload(path, file);
    if (!storageError) {
      await supabase.from("files").insert({
        name: file.name,
        storage_path: path,
        mime_type: file.type || null,
        size_bytes: file.size,
        user_id: user.id,
      });
      fetchFiles();
    }
    setUploading(false);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    files.forEach(uploadFile);
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    Array.from(e.dataTransfer.files).forEach(uploadFile);
  };

  const handleDelete = async (file: FileRecord) => {
    if (!confirm(`Delete "${file.name}"?`)) return;
    setDeletingId(file.id);
    await Promise.all([
      supabase.storage.from("user-files").remove([file.storage_path]),
      supabase.from("files").delete().eq("id", file.id),
    ]);
    setFiles(prev => prev.filter(f => f.id !== file.id));
    setDeletingId(null);
  };

  const handleDownload = async (file: FileRecord) => {
    const { data } = await supabase.storage.from("user-files").createSignedUrl(file.storage_path, 60);
    if (data?.signedUrl) window.open(data.signedUrl, "_blank");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-foreground">Files</h1>
          <p className="font-body text-muted-foreground text-sm mt-1">Upload and manage your files.</p>
        </div>
        <button onClick={() => inputRef.current?.click()} disabled={uploading}
          className="btn-gold flex items-center gap-2 text-xs px-5 py-3 disabled:opacity-50">
          <Upload size={15} /> {uploading ? "Uploading…" : "Upload"}
        </button>
        <input ref={inputRef} type="file" multiple className="hidden" onChange={handleFileInput} />
      </div>

      {/* Drop zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          dragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
        }`}>
        <Upload size={28} className="mx-auto mb-2 text-muted-foreground" />
        <p className="font-body text-sm text-muted-foreground">
          {dragOver ? "Drop files here" : "Drag & drop files here, or click to browse"}
        </p>
        <p className="font-body text-xs text-muted-foreground mt-1">Max 50MB per file</p>
      </div>

      {/* File list */}
      {loading ? (
        <div className="space-y-2">
          {[1, 2, 3].map(i => <div key={i} className="h-14 bg-card border border-border rounded-lg animate-pulse" />)}
        </div>
      ) : files.length === 0 ? (
        <div className="bg-card border border-border rounded-lg p-12 text-center">
          <FolderOpen size={36} className="text-muted-foreground mx-auto mb-3" />
          <p className="font-body text-muted-foreground text-sm">No files uploaded yet.</p>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          {files.map((f, i) => (
            <div key={f.id}
              className={`flex items-center gap-4 px-5 py-3.5 ${i < files.length - 1 ? "border-b border-border/50" : ""}`}>
              <div className="flex-shrink-0">{fileIcon(f.mime_type)}</div>
              <div className="flex-1 min-w-0">
                <p className="font-body text-sm text-foreground truncate">{f.name}</p>
                <p className="font-body text-xs text-muted-foreground mt-0.5">
                  {formatBytes(f.size_bytes)} · {new Date(f.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </p>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button onClick={() => handleDownload(f)}
                  className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded transition-colors">
                  <Download size={14} />
                </button>
                <button onClick={() => handleDelete(f)} disabled={deletingId === f.id}
                  className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded transition-colors disabled:opacity-40">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
