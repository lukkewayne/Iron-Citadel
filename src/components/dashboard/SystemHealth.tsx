import { useEffect, useRef, useState } from "react";
import { Activity, Battery, Cpu, HardDrive, MemoryStick } from "lucide-react";

const SineWaveCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const offsetRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const drawWave = (amplitude: number, frequency: number, speed: number, alpha: number) => {
        ctx.beginPath();
        ctx.strokeStyle = `hsla(191, 100%, 50%, ${alpha})`;
        ctx.lineWidth = 1.5;
        for (let x = 0; x < w; x++) {
          const y = h / 2 + Math.sin((x * frequency) / w + offsetRef.current * speed) * amplitude;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      };

      drawWave(20, 8, 0.03, 0.8);
      drawWave(15, 12, 0.02, 0.4);
      drawWave(10, 6, 0.04, 0.2);

      offsetRef.current += 1;
      animRef.current = requestAnimationFrame(draw);
    };

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };

    resize();
    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-28" />;
};

const MetricBar = ({ label, value, icon: Icon }: { label: string; value: number; icon: React.ElementType }) => (
  <div className="flex items-center gap-3">
    <Icon className="w-3.5 h-3.5 text-primary shrink-0" />
    <span className="text-[11px] text-muted-foreground w-12">{label}</span>
    <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-1000"
        style={{
          width: `${value}%`,
          background: `linear-gradient(90deg, hsl(191 100% 50% / 0.6), hsl(191 100% 50%))`,
          boxShadow: "0 0 8px hsl(191 100% 50% / 0.5)",
        }}
      />
    </div>
    <span className="text-[11px] neon-text w-8 text-right">{value}%</span>
  </div>
);

const SystemHealth = () => {
  const [metrics, setMetrics] = useState({ cpu: 42, mem: 67, disk: 34 });
  const [energy, setEnergy] = useState(100);
  const [ping, setPing] = useState(0);

  useEffect(() => {
    const checkPing = async () => {
      const start = Date.now();
      try {
        // Fazemos uma requisição rápida para um servidor confiável
        await fetch('https://www.google.com/favicon.ico', { mode: 'no-cors', cache: 'no-cache' });
        const end = Date.now();
        setPing(end - start);
      } catch (error) {
        setPing(0); // Sistema offline
      }
    };

    // Mede o pulso inicial e depois a cada 10 segundos
    checkPing();
    const interval = setInterval(checkPing, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Função para atualizar o nível da bateria
    const updateBattery = (batt: any) => {
      setEnergy(Math.round(batt.level * 100));
    };

    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((batt: any) => {
        updateBattery(batt);
        // Ouve mudanças no nível enquanto o site está aberto
        batt.addEventListener('levelchange', () => updateBattery(batt));
      });
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setMetrics({
        cpu: Math.round(30 + Math.random() * 40),
        mem: Math.round(55 + Math.random() * 25),
        disk: Math.round(30 + Math.random() * 15),
      });
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="glass-panel rounded-lg p-4 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-3">
        <Activity className="w-4 h-4 text-primary" />
        <h2 className="text-xs uppercase tracking-[0.2em] neon-text">System Health</h2>
      </div>
      <SineWaveCanvas />
      <div className="flex flex-col gap-2.5 mt-3">
        <MetricBar label="CPU" value={metrics.cpu} icon={Cpu} />
        <MetricBar label="MEM" value={metrics.mem} icon={MemoryStick} />
        <MetricBar label="DISK" value={metrics.disk} icon={HardDrive} />
        <MetricBar label="BATT" value={energy} icon={Battery} />
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse-neon" />
          <span className="text-[10px] text-muted-foreground">All systems nominal</span>
        </div>
        <div className="flex items-center gap-1">
          <Activity className="w-3 h-3 text-primary opacity-70" />
          <span className="text-[10px] text-primary">{ping} ms</span>
        </div>
      </div>
    </div>
  );
};

export default SystemHealth;
