import { useState } from "react";
import { LayoutGrid, Monitor, Terminal, Shield, Gauge } from "lucide-react";

const modes = [
  { id: "overview", label: "Overview", icon: LayoutGrid },
  { id: "monitor", label: "Monitor", icon: Monitor },
  { id: "terminal", label: "Terminal", icon: Terminal },
  { id: "security", label: "Security", icon: Shield },
  { id: "perf", label: "Performance", icon: Gauge },
];

const DockBar = () => {
  const [active, setActive] = useState("overview");

  return (
    <div className="glass-panel rounded-xl px-6 py-3 flex items-center justify-center gap-3">
      {modes.map((m) => {
        const Icon = m.icon;
        return (
          <button
            key={m.id}
            onClick={() => setActive(m.id)}
            className={`dock-button flex items-center gap-2 ${active === m.id ? "active" : ""}`}
          >
            <Icon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{m.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default DockBar;
