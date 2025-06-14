import React, { useEffect } from "react";
import { XPTaskbar } from "./XPTaskbar";
import { soundManager } from "@/lib/sounds";

interface XPDesktopProps {
  children: React.ReactNode;
}

export const XPDesktop: React.FC<XPDesktopProps> = ({ children }) => {
  useEffect(() => {
    // Play startup sound on component mount
    const timer = setTimeout(() => {
      soundManager.playStartup();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-xp-blue-400 via-xp-blue-500 to-xp-blue-600 font-ms-sans-serif relative overflow-hidden">
      {/* Desktop Background Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
            radial-gradient(circle at 75% 75%, white 2px, transparent 2px)
          `,
          backgroundSize: "50px 50px",
          backgroundPosition: "0 0, 25px 25px",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 pb-8">{children}</div>

      {/* Taskbar */}
      <XPTaskbar />
    </div>
  );
};
