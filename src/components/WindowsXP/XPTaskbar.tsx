import React, { useState } from "react";
import { XPButton } from "./XPButton";
import { XPStartMenu } from "./XPStartMenu";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export const XPTaskbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);

  const getTime = () => {
    return new Date().toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getDate = () => {
    return new Date().toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const [currentTime, setCurrentTime] = React.useState(getTime());
  const [currentDate, setCurrentDate] = React.useState(getDate());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(getTime());
      setCurrentDate(getDate());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const toggleStartMenu = () => {
    setIsStartMenuOpen(!isStartMenuOpen);
  };

  return (
    <>
      <XPStartMenu
        isOpen={isStartMenuOpen}
        onClose={() => setIsStartMenuOpen(false)}
      />

      <div className="fixed bottom-0 left-0 right-0 h-10 bg-gradient-to-r from-xp-blue-500 to-xp-blue-600 border-t-2 border-xp-blue-300 flex items-center justify-between px-1 z-40">
        <div className="flex items-center h-full">
          <XPButton
            variant="start"
            onClick={toggleStartMenu}
            className={cn(
              "h-8 rounded-r-lg flex items-center space-x-2 px-4",
              isStartMenuOpen &&
                "bg-xp-green-500 border-t-xp-gray-400 border-l-xp-gray-400 border-r-white border-b-white",
            )}
          >
            <span className="text-sm">🪟</span>
            <span className="font-bold">Démarrer</span>
          </XPButton>

          {/* Quick Launch */}
          <div className="flex ml-2 border-r border-xp-blue-400 pr-2">
            <XPButton
              variant="taskbar"
              onClick={() => navigate("/")}
              className="h-7 text-xs px-2"
              title="Afficher le bureau"
            >
              🖥️
            </XPButton>
            <XPButton
              variant="taskbar"
              onClick={() => navigate("/mes-creations")}
              className="h-7 text-xs px-2"
              title="Mes Créations"
            >
              📁
            </XPButton>
          </div>

          {/* Running Applications */}
          <div className="flex ml-2">
            <XPButton
              variant="taskbar"
              onClick={() => navigate("/")}
              className={cn(
                "h-7 text-xs min-w-32",
                isActive("/") &&
                  "bg-xp-gray-300 border-t-xp-gray-400 border-l-xp-gray-400 border-r-white border-b-white",
              )}
            >
              <span className="flex items-center space-x-1">
                <span>🎬</span>
                <span>Portfolio Lino LVT</span>
              </span>
            </XPButton>

            {location.pathname !== "/" && (
              <XPButton
                variant="taskbar"
                onClick={() => navigate(location.pathname)}
                className="bg-xp-gray-300 border-t-xp-gray-400 border-l-xp-gray-400 border-r-white border-b-white h-7 text-xs min-w-32"
              >
                <span className="flex items-center space-x-1">
                  <span>
                    {location.pathname === "/mes-creations" && "📁"}
                    {location.pathname === "/contact" && "📧"}
                    {location.pathname === "/admin" && "🔐"}
                  </span>
                  <span>
                    {location.pathname === "/mes-creations" && "Mes Créations"}
                    {location.pathname === "/contact" && "Contact"}
                    {location.pathname === "/admin" && "Administration"}
                  </span>
                </span>
              </XPButton>
            )}
          </div>
        </div>

        {/* System Tray */}
        <div className="flex items-center space-x-1">
          {/* System Icons */}
          <div className="flex items-center space-x-1 pr-2 border-r border-xp-blue-400">
            <div
              className="w-4 h-4 bg-xp-gray-200 border border-xp-gray-400 flex items-center justify-center cursor-pointer"
              title="Volume"
            >
              <span className="text-xs">🔊</span>
            </div>
            <div
              className="w-4 h-4 bg-xp-gray-200 border border-xp-gray-400 flex items-center justify-center cursor-pointer"
              title="Réseau"
            >
              <span className="text-xs">📶</span>
            </div>
            <div
              className="w-4 h-4 bg-xp-gray-200 border border-xp-gray-400 flex items-center justify-center cursor-pointer"
              title="Antivirus"
            >
              <span className="text-xs">🛡️</span>
            </div>
          </div>

          {/* Clock */}
          <div
            className="bg-xp-gray-200 border border-xp-gray-400 px-3 py-1 cursor-pointer hover:bg-xp-gray-100"
            title={`${currentDate} ${currentTime}`}
          >
            <div className="text-xs font-ms-sans-serif text-black text-center">
              <div className="leading-tight">{currentTime}</div>
              <div className="leading-tight text-xxs">{currentDate}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
