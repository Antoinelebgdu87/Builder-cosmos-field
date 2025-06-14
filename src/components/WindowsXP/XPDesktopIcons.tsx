import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { soundManager } from "@/lib/sounds";

interface DesktopIcon {
  id: string;
  name: string;
  icon: string;
  action: () => void;
  position: { x: number; y: number };
  type: "folder" | "application" | "recycle";
}

interface XPDesktopIconsProps {
  onOpenRecycleBin: () => void;
}

export const XPDesktopIcons: React.FC<XPDesktopIconsProps> = ({
  onOpenRecycleBin,
}) => {
  const navigate = useNavigate();
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const dragRef = useRef<HTMLDivElement>(null);

  const [iconPositions, setIconPositions] = useState<
    Record<string, { x: number; y: number }>
  >({
    portfolio: { x: 20, y: 20 },
    creations: { x: 20, y: 120 },
    contact: { x: 20, y: 220 },
    admin: { x: 20, y: 320 },
    computer: { x: 20, y: 420 },
    recycle: { x: 20, y: 520 },
  });

  const icons: DesktopIcon[] = [
    {
      id: "portfolio",
      name: "Portfolio Lino LVT",
      icon: "🎬",
      action: () => navigate("/"),
      position: iconPositions.portfolio,
      type: "application",
    },
    {
      id: "creations",
      name: "Mes Créations",
      icon: "📁",
      action: () => navigate("/mes-creations"),
      position: iconPositions.creations,
      type: "folder",
    },
    {
      id: "contact",
      name: "Contact",
      icon: "📧",
      action: () => navigate("/contact"),
      position: iconPositions.contact,
      type: "application",
    },
    {
      id: "admin",
      name: "Administration",
      icon: "🔐",
      action: () => navigate("/admin"),
      position: iconPositions.admin,
      type: "application",
    },
    {
      id: "computer",
      name: "Poste de travail",
      icon: "💻",
      action: () => {
        soundManager.playNotification();
        alert("Fonctionnalité non disponible");
      },
      position: iconPositions.computer,
      type: "folder",
    },
    {
      id: "recycle",
      name: "Corbeille",
      icon: "🗑️",
      action: onOpenRecycleBin,
      position: iconPositions.recycle,
      type: "recycle",
    },
  ];

  const handleMouseDown = (e: React.MouseEvent, icon: DesktopIcon): void => {
    e.preventDefault();
    setSelectedIcon(icon.id);
    setIsDragging(icon.id);

    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });

    soundManager.playClick();
  };

  const handleMouseMove = (e: MouseEvent): void => {
    if (!isDragging) return;

    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;

    // Boundaries to keep icons on screen
    const maxX = window.innerWidth - 80;
    const maxY = window.innerHeight - 100;

    setIconPositions((prev) => ({
      ...prev,
      [isDragging]: {
        x: Math.max(0, Math.min(maxX, newX)),
        y: Math.max(0, Math.min(maxY, newY)),
      },
    }));
  };

  const handleMouseUp = (): void => {
    setIsDragging(null);
  };

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  const handleIconClick = (icon: DesktopIcon): void => {
    setSelectedIcon(icon.id);
    setTimeout(() => setSelectedIcon(null), 200);
  };

  const handleIconDoubleClick = (icon: DesktopIcon): void => {
    soundManager.playClick();
    icon.action();
  };

  const handleDesktopClick = (): void => {
    setSelectedIcon(null);
  };

  return (
    <div
      className="absolute inset-0 z-20"
      onClick={handleDesktopClick}
      onContextMenu={(e) => e.preventDefault()}
    >
      {icons.map((icon) => (
        <div
          key={icon.id}
          className={`absolute cursor-pointer select-none transition-colors duration-150 ${
            selectedIcon === icon.id
              ? "bg-blue-500/30 border border-blue-500"
              : ""
          } ${isDragging === icon.id ? "z-50" : "z-30"}`}
          style={{
            left: `${iconPositions[icon.id]?.x || icon.position.x}px`,
            top: `${iconPositions[icon.id]?.y || icon.position.y}px`,
            cursor: isDragging === icon.id ? "grabbing" : "grab",
          }}
          onMouseDown={(e) => handleMouseDown(e, icon)}
          onClick={(e) => {
            e.stopPropagation();
            handleIconClick(icon);
          }}
          onDoubleClick={(e) => {
            e.stopPropagation();
            handleIconDoubleClick(icon);
          }}
        >
          <div className="flex flex-col items-center p-2 w-20 text-center rounded">
            <div className="text-3xl mb-1 drop-shadow-lg pointer-events-none">
              {icon.icon}
            </div>
            <div className="text-white text-xs font-ms-sans-serif drop-shadow-md leading-tight pointer-events-none">
              {icon.name}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
