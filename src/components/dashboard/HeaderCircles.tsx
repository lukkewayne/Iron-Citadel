import { useEffect, useState } from "react";
import { Wifi, Zap, Loader, Clock, Globe } from "lucide-react";

const CircleItem = ({
  label,
  children,
  subtitle,
  subtitleClass = "neon-text",
  circleStyle,
}: {
  label: string;
  children: React.ReactNode;
  subtitle?: string;
  subtitleClass?: string;
  circleStyle?: React.CSSProperties;
}) => (
  <div className="flex flex-col items-center gap-1.5">
    <div className="status-circle" style={circleStyle}>
      {children}
    </div>
    <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
      {label}
    </span>
    {subtitle && (
      <span className={`text-[9px] ${subtitleClass}`}>{subtitle}</span>
    )}
  </div>
);

const HeaderCircles = () => {
  const [time, setTime] = useState(new Date());
  const [energy, setEnergy] = useState(100);
  const [ping, setPing] = useState(0);

  useEffect(() => {
    const checkPing = async () => {
      const start = Date.now();
      try {
        await fetch('https://www.google.com/favicon.ico', { mode: 'no-cors', cache: 'no-cache' });
        const end = Date.now();
        setPing(end - start);
      } catch (error) {
        setPing(0);
      }
    };
    checkPing();
    const interval = setInterval(checkPing, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const updateBattery = (batt: any) => {
      setEnergy(Math.round(batt.level * 100));
    };

    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((batt: any) => {
        updateBattery(batt);
        batt.addEventListener('levelchange', () => updateBattery(batt));
      });
    }
  }, []);

  const fmt = (n: number) => String(n).padStart(2, "0");
  const timeStr = `${fmt(time.getHours())}:${fmt(time.getMinutes())}:${fmt(time.getSeconds())}`;

  return (
    <div className="flex items-center gap-5">
      <CircleItem label="Nexus" subtitle="Online">
        <Globe className="w-5 h-5 text-primary animate-pulse-neon" />
      </CircleItem>
      <CircleItem 
        label="Synapse" 
        subtitle={`${ping}ms`}
        subtitleClass={
          ping === 0 || ping >= 150 ? "text-red-500 drop-shadow-[0_0_5px_rgba(239,68,68,0.8)]" : 
          ping < 60 ? "text-green-500 drop-shadow-[0_0_5px_rgba(34,197,94,0.8)]" : 
          "text-yellow-500 drop-shadow-[0_0_5px_rgba(234,179,8,0.8)]"
        }
        circleStyle={{
          borderColor: ping === 0 || ping >= 150 ? '#ef4444' : ping < 60 ? '#22c55e' : '#eab308',
          boxShadow: `0 0 10px ${ping === 0 || ping >= 150 ? 'rgba(239,68,68,0.5)' : ping < 60 ? 'rgba(34,197,94,0.5)' : 'rgba(234,179,8,0.5)'}`
        }}
      >
        <Wifi className={`w-5 h-5 ${
          ping === 0 || ping >= 150 ? "text-red-500 drop-shadow-[0_0_5px_rgba(239,68,68,0.8)]" : 
          ping < 60 ? "text-green-500 drop-shadow-[0_0_5px_rgba(34,197,94,0.8)]" : 
          "text-yellow-500 drop-shadow-[0_0_5px_rgba(234,179,8,0.8)]"
        }`} />
      </CircleItem>
      <CircleItem 
        label="Reactor" 
        subtitle={`${Math.round(energy)}%`}
        subtitleClass={energy < 25 ? "text-red-500 drop-shadow-[0_0_5px_rgba(239,68,68,0.8)]" : "neon-text"}
      >
        <Zap className={`w-5 h-5 ${energy < 25 ? 'text-red-500 drop-shadow-[0_0_5px_rgba(239,68,68,0.8)]' : 'text-primary'}`} />
      </CircleItem>
      <CircleItem label="Core">
        <Loader className="w-5 h-5 text-primary animate-spin-slow" />
      </CircleItem>
      <CircleItem label="Chronos">
        <Clock className="w-5 h-5 text-primary" />
        <span className="absolute text-[0px]">{/* clock in subtitle */}</span>
      </CircleItem>
      <div className="text-primary font-mono text-sm tracking-wider neon-text -mt-2">
        {timeStr}
      </div>
    </div>
  );
};

export default HeaderCircles;
