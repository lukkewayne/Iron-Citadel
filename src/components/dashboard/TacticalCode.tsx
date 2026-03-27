import { useState } from "react";
import { Code2, Copy, Check } from "lucide-react";

const codeSnippets = [
  {
    title: "reactor.core.ts",
    lang: "typescript",
    code: `interface ArcReactor {
  power: number;
  element: 'palladium' | 'vibranium';
  output: () => EnergyStream;
}

const initReactor = (cfg: ArcReactor) => {
  console.log(\`[STARK] Reactor online: \${cfg.power}GW\`);
  return cfg.output();
};`,
  },
  {
    title: "neural_link.py",
    lang: "python",
    code: `class JarvisNeuralLink:
    def __init__(self, model="gemini-2.0"):
        self.model = model
        self.context_window = 1_000_000

    async def process(self, query: str) -> Response:
        tokens = await self.tokenize(query)
        return await self.inference(tokens)`,
  },
];

const syntaxHighlight = (code: string) => {
  return code
    .replace(/(\/\/.*$|#.*$)/gm, '<span class="text-muted-foreground">$1</span>')
    .replace(/\b(interface|const|return|class|def|async|await|import|from|self)\b/g, '<span style="color:hsl(191,100%,50%)">$1</span>')
    .replace(/\b(number|string|boolean|str|int|Response)\b/g, '<span style="color:hsl(191,80%,70%)">$1</span>')
    .replace(/(["'`])(?:(?=(\\?))\2.)*?\1/g, '<span style="color:hsl(140,60%,60%)">$&</span>')
    .replace(/\b(\d+[_\d]*)\b/g, '<span style="color:hsl(30,90%,65%)">$&</span>');
};

const TacticalCode = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const snippet = codeSnippets[activeIdx];

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-panel rounded-lg p-4 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-3">
        <Code2 className="w-4 h-4 text-primary" />
        <h2 className="text-xs uppercase tracking-[0.2em] neon-text">Tactical Code</h2>
      </div>
      <div className="flex gap-2 mb-3">
        {codeSnippets.map((s, i) => (
          <button
            key={s.title}
            onClick={() => setActiveIdx(i)}
            className={`text-[10px] px-2.5 py-1 rounded transition-all ${
              i === activeIdx
                ? "bg-primary/15 text-primary border border-primary/30"
                : "text-muted-foreground hover:text-foreground border border-transparent"
            }`}
          >
            {s.title}
          </button>
        ))}
      </div>
      <div className="flex-1 bg-secondary/20 rounded-md p-3 overflow-auto relative group">
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 p-1.5 rounded glass-panel opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {copied ? (
            <Check className="w-3 h-3 text-primary" />
          ) : (
            <Copy className="w-3 h-3 text-muted-foreground" />
          )}
        </button>
        <pre className="text-[11px] leading-5">
          <code dangerouslySetInnerHTML={{ __html: syntaxHighlight(snippet.code) }} />
        </pre>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-[10px] text-muted-foreground">{snippet.lang}</span>
        <span className="text-[10px] text-muted-foreground">
          {snippet.code.split("\n").length} lines
        </span>
      </div>
    </div>
  );
};

export default TacticalCode;
