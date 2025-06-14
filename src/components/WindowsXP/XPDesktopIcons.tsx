import React, { useState } from "react";
import { XPButton } from "./XPButton";
import { useNavigate } from "react-router-dom";

interface DesktopIcon {
  id: string;
  name: string;
  icon: string;
  action: () => void;
  position: { x: number; y: number };
}

export const XPDesktopIcons: React.FC = () => {
  const navigate = useNavigate();
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  const icons: DesktopIcon[] = [
    {
      id: "portfolio",
      name: "Portfolio Lino LVT",
      icon: "🎬",
      action: () => navigate("/"),
      position: { x: 20, y: 20 },
    },
    {
      id: "creations",
      name: "Mes Créations",
      icon: "📁",
      action: () => navigate("/mes-creations"),
      position: { x: 20, y: 120 },
    },
    {
      id: "contact",
      name: "Contact",
      icon: "📧",
      action: () => navigate("/contact"),
      position: { x: 20, y: 220 },
    },
    {
      id: "admin",
      name: "Administration",
      icon: "🔐",
      action: () => navigate("/admin"),
      position: { x: 20, y: 320 },
    },
    {
      id: "computer",
      name: "Poste de travail",
      icon: "💻",
      action: () => alert("Fonctionnalité non disponible"),
      position: { x: 20, y: 420 },
    },
    {
      id: "recycle",
      name: "Corbeille",
      icon: "🗑️",
      action: () => alert("Corbeille vide"),
      position: { x: 20, y: 520 },
    },
  ];

  const handleIconClick = (icon: DesktopIcon) => {
    setSelectedIcon(icon.id);
    setTimeout(() => {
      setSelectedIcon(null);
      icon.action();
    }, 200);
  };

  const handleDesktopClick = () => {
    setSelectedIcon(null);
  };

  return (
    <div className="absolute inset-0 z-0" onClick={handleDesktopClick}>
      {icons.map((icon) => (
        <div
          key={icon.id}
          className={`absolute cursor-pointer select-none ${
            selectedIcon === icon.id ? "bg-blue-500/30" : ""
          }`}
          style={{
            left: `${icon.position.x}px`,
            top: `${icon.position.y}px`,
          }}
          onClick={(e) => {
            e.stopPropagation();
            handleIconClick(icon);
          }}
          onDoubleClick={(e) => {
            e.stopPropagation();
            icon.action();
          }}
        >
          <div className="flex flex-col items-center p-2 w-20 text-center">
            <div className="text-3xl mb-1 drop-shadow-lg">{icon.icon}</div>
            <div className="text-white text-xs font-ms-sans-serif drop-shadow-md leading-tight">
              {icon.name}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
