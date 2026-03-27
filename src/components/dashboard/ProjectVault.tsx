import { FolderGit2, ExternalLink, Star, GitBranch } from "lucide-react";

const projects = [
  { name: "arc-reactor-v3", lang: "TypeScript", stars: 142, status: "active" },
  { name: "jarvis-neural-net", lang: "Python", stars: 89, status: "active" },
  { name: "mark-xlii-firmware", lang: "Rust", stars: 234, status: "archived" },
  { name: "stark-ui-kit", lang: "React", stars: 56, status: "active" },
  { name: "repulsor-sim", lang: "C++", stars: 178, status: "active" },
];

const statusColor: Record<string, string> = {
  active: "bg-primary",
  archived: "bg-muted-foreground",
};

const ProjectVault = () => (
  <div className="glass-panel rounded-lg p-4 h-full flex flex-col">
    <div className="flex items-center gap-2 mb-3">
      <FolderGit2 className="w-4 h-4 text-primary" />
      <h2 className="text-xs uppercase tracking-[0.2em] neon-text">Project Vault</h2>
    </div>
    <div className="flex-1 overflow-auto space-y-1.5">
      {projects.map((p) => (
        <div
          key={p.name}
          className="flex items-center gap-3 px-3 py-2 rounded-md bg-secondary/30 hover:bg-secondary/60 transition-colors cursor-pointer group"
        >
          <div className={`w-1.5 h-1.5 rounded-full ${statusColor[p.status]}`} />
          <GitBranch className="w-3 h-3 text-muted-foreground" />
          <span className="text-xs flex-1 text-foreground">{p.name}</span>
          <span className="text-[10px] text-muted-foreground">{p.lang}</span>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Star className="w-3 h-3" />
            <span className="text-[10px]">{p.stars}</span>
          </div>
          <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      ))}
    </div>
    <div className="mt-3 pt-2 border-t border-border">
      <span className="text-[10px] text-muted-foreground">{projects.length} repositories • 3 active</span>
    </div>
  </div>
);

export default ProjectVault;
