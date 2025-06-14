import React from "react";
import { XPButton } from "./XPButton";
import { useNavigate, useLocation } from "react-router-dom";

export const XPTaskbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getTime = () => {
    return new Date().toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const [currentTime, setCurrentTime] = React.useState(getTime());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(getTime());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 h-8 bg-gradient-to-r from-xp-blue-500 to-xp-blue-600 border-t-2 border-xp-blue-300 flex items-center justify-between px-1 z-50">
      <div className="flex items-center">
        <XPButton
          variant="start"
          onClick={() => navigate("/")}
          className="h-6 rounded-r-lg"
        >
          <span className="flex items-center space-x-1">
            <span className="text-xs">🪟</span>
            <span>Démarrer</span>
          </span>
        </XPButton>

        <div className="flex ml-2">
          <XPButton
            variant="taskbar"
            onClick={() => navigate("/")}
            className={cn(
              "h-6 text-xs",
              isActive("/") &&
                "bg-xp-gray-300 border-t-xp-gray-400 border-l-xp-gray-400 border-r-white border-b-white",
            )}
          >
            Accueil
          </XPButton>
          <XPButton
            variant="taskbar"
            onClick={() => navigate("/mes-creations")}
            className={cn(
              "h-6 text-xs",
              isActive("/mes-creations") &&
                "bg-xp-gray-300 border-t-xp-gray-400 border-l-xp-gray-400 border-r-white border-b-white",
            )}
          >
            Mes Créations
          </XPButton>
          <XPButton
            variant="taskbar"
            onClick={() => navigate("/contact")}
            className={cn(
              "h-6 text-xs",
              isActive("/contact") &&
                "bg-xp-gray-300 border-t-xp-gray-400 border-l-xp-gray-400 border-r-white border-b-white",
            )}
          >
            Contact
          </XPButton>
        </div>
      </div>

      <div className="bg-xp-gray-200 border border-xp-gray-400 px-2 py-0.5 mx-2">
        <span className="text-xs font-ms-sans-serif text-black">
          {currentTime}
        </span>
      </div>
    </div>
  );
};

import { cn } from "@/lib/utils";
