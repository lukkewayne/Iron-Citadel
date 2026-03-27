import { useState } from "react";
import { Brain, Send, Sparkles, FileText } from "lucide-react";

const summaries = [
  { title: "Arc Reactor Efficiency Report", excerpt: "Power output increased 23% after vibranium core swap. Thermal stability within parameters..." },
  { title: "Neural Network Training Log", excerpt: "Epoch 847: Loss 0.0012, Accuracy 99.7%. Model converging on optimal weights..." },
  { title: "Security Audit - Mark XLII", excerpt: "All endpoints hardened. Zero-day patch applied. Firewall rules updated for quantum encryption..." },
];

const chatMessages = [
  { role: "user" as const, text: "Analyze reactor thermal output" },
  { role: "ai" as const, text: "Thermal output is at 3.2GW with 98.7% efficiency. Core temperature stable at 4,200K. No anomalies detected." },
  { role: "user" as const, text: "Compare with Mark V specs" },
  { role: "ai" as const, text: "Mark V output was 1.8GW at 91.2% efficiency. Current reactor shows 77.8% improvement in raw output." },
];

const InsightHub = () => {
  const [input, setInput] = useState("");
  const [activeTab, setActiveTab] = useState<"notes" | "chat">("chat");

  return (
    <div className="glass-panel rounded-lg p-4 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-3">
        <Brain className="w-4 h-4 text-primary" />
        <h2 className="text-xs uppercase tracking-[0.2em] neon-text">Insight Hub</h2>
        <div className="ml-auto flex gap-1">
          {(["notes", "chat"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-[10px] px-2 py-0.5 rounded transition-all ${
                activeTab === tab
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab === "notes" ? "Notes" : "Gemini"}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "notes" ? (
        <div className="flex-1 overflow-auto space-y-2">
          {summaries.map((s) => (
            <div key={s.title} className="p-2.5 rounded-md bg-secondary/20 hover:bg-secondary/40 transition-colors cursor-pointer">
              <div className="flex items-center gap-2 mb-1">
                <FileText className="w-3 h-3 text-primary" />
                <span className="text-[11px] text-foreground">{s.title}</span>
              </div>
              <p className="text-[10px] text-muted-foreground leading-relaxed">{s.excerpt}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 overflow-auto space-y-2.5 mb-3">
            {chatMessages.map((m, i) => (
              <div
                key={i}
                className={`flex gap-2 ${m.role === "user" ? "justify-end" : ""}`}
              >
                {m.role === "ai" && <Sparkles className="w-3 h-3 text-primary mt-1 shrink-0" />}
                <div
                  className={`text-[11px] leading-relaxed max-w-[80%] px-3 py-2 rounded-lg ${
                    m.role === "user"
                      ? "bg-primary/10 text-foreground"
                      : "bg-secondary/30 text-foreground"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Gemini..."
              className="flex-1 bg-secondary/30 border border-border rounded-lg px-3 py-2 text-[11px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
            />
            <button className="status-circle !w-8 !h-8">
              <Send className="w-3.5 h-3.5 text-primary" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InsightHub;
