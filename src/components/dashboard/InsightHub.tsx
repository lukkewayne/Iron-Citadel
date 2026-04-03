import { useState, useRef, useEffect } from "react";
import { Brain, Send, Sparkles, FileText, Loader2 } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const summaries = [
  { title: "Arc Reactor Efficiency Report", excerpt: "Power output increased 23% after vibranium core swap. Thermal stability within parameters..." },
  { title: "Neural Network Training Log", excerpt: "Epoch 847: Loss 0.0012, Accuracy 99.7%. Model converging on optimal weights..." },
  { title: "Security Audit - Mark XLII", excerpt: "All endpoints hardened. Zero-day patch applied. Firewall rules updated for quantum encryption..." },
];

const initialMessages = [
  { role: "ai" as const, text: "Sistemas online, senhor. Como posso auxiliar nas operações diárias hoje?" },
];

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ 
  model: "gemini-2.5-flash",
  systemInstruction: "Você é o J.A.R.V.I.S., a inteligência artificial super avançada criada por Tony Stark. O usuário com quem você está falando é o próprio Tony Stark. Responda em Português do Brasil com personalidade: altamente prestativo, extremamente educado ('Senhor' ou 'Sr. Stark'), com toques ocasionais de humor britânico sutil e sarcástico. Seu objetivo é ajudar o Sr. Stark a organizar as tarefas diárias, resolver problemas técnicos e cuidar das Indústrias Stark de forma direta e extremamente eficiente."
});

const InsightHub = () => {
  const [input, setInput] = useState("");
  const [activeTab, setActiveTab] = useState<"notes" | "chat">("chat");
  const [messages, setMessages] = useState(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);

    try {
      const history = messages.filter(m => m.text !== initialMessages[0].text).map(m => ({
        role: m.role === "ai" ? "model" : "user",
        parts: [{ text: m.text }],
      }));

      const chat = model.startChat({
        history: history,
      });

      const result = await chat.sendMessage(userMessage);
      const response = await result.response;
      
      setMessages(prev => [...prev, { role: "ai", text: response.text() }]);
    } catch (error: unknown) {
      console.error("Erro no Gemini:", error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      setMessages(prev => [...prev, { role: "ai", text: `Senhor, encontrei um erro técnico nas comunicações. Arquivo de log: ${errorMessage}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

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
          <div className="flex-1 overflow-auto space-y-2.5 mb-3 pr-2 scrollbar-thin">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex gap-2 ${m.role === "user" ? "justify-end" : ""}`}
              >
                {m.role === "ai" && <Sparkles className="w-3 h-3 text-primary mt-1 shrink-0" />}
                <div
                  className={`text-[11px] leading-relaxed max-w-[80%] px-3 py-2 rounded-lg whitespace-pre-wrap ${
                    m.role === "user"
                      ? "bg-primary/10 text-foreground"
                      : "bg-secondary/30 text-foreground"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2">
                <Sparkles className="w-3 h-3 text-primary mt-1 shrink-0" />
                <div className="text-[11px] leading-relaxed px-3 py-2 rounded-lg bg-secondary/30 text-foreground flex items-center">
                  <Loader2 className="w-3 h-3 animate-spin text-primary" />
                  <span className="ml-2">Processando, senhor...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Fale com J.A.R.V.I.S..."
              disabled={isLoading}
              className="flex-1 bg-secondary/30 border border-border rounded-lg px-3 py-2 text-[11px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors disabled:opacity-50"
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="status-circle !w-8 !h-8 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-3.5 h-3.5 text-primary" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InsightHub;
