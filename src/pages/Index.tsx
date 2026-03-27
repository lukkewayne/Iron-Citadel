import HeaderCircles from "@/components/dashboard/HeaderCircles";
import SystemHealth from "@/components/dashboard/SystemHealth";
import ProjectVault from "@/components/dashboard/ProjectVault";
import TacticalCode from "@/components/dashboard/TacticalCode";
import InsightHub from "@/components/dashboard/InsightHub";
import DockBar from "@/components/dashboard/DockBar";
import { Shield } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col p-4 md:p-6 gap-4">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-primary" />
          <div>
            <h1 className="text-sm font-semibold uppercase tracking-[0.3em] neon-text">
              Stark Command
            </h1>
            <p className="text-[10px] text-muted-foreground tracking-widest">
              PERSONAL REFUGE v3.2.1
            </p>
          </div>
        </div>
        <HeaderCircles />
      </header>

      {/* Main Grid */}
      <main className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <SystemHealth />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <ProjectVault />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <TacticalCode />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <InsightHub />
        </div>
      </main>

      {/* Dock */}
      <footer className="flex justify-center animate-fade-in" style={{ animationDelay: "0.5s" }}>
        <DockBar />
      </footer>
    </div>
  );
};

export default Index;
