import React, { useState, useRef, useEffect } from "react";
import { XPButton } from "./XPButton";
import { useNavigate } from "react-router-dom";

interface XPStartMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const XPStartMenu: React.FC<XPStartMenuProps> = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const menuItems = [
    {
      icon: "🎬",
      label: "Portfolio Lino LVT",
      action: () => {
        navigate("/");
        onClose();
      },
    },
    {
      icon: "📁",
      label: "Mes Créations",
      action: () => {
        navigate("/mes-creations");
        onClose();
      },
    },
    {
      icon: "📧",
      label: "Contact",
      action: () => {
        navigate("/contact");
        onClose();
      },
    },
    { icon: "separator", label: "", action: () => {} },
    {
      icon: "🔐",
      label: "Administration",
      action: () => {
        navigate("/admin");
        onClose();
      },
    },
    { icon: "separator", label: "", action: () => {} },
    {
      icon: "💻",
      label: "Poste de travail",
      action: () => {
        alert("Fonctionnalité non disponible");
        onClose();
      },
    },
    {
      icon: "🎛️",
      label: "Panneau de configuration",
      action: () => {
        alert("Fonctionnalité non disponible");
        onClose();
      },
    },
    {
      icon: "🔍",
      label: "Rechercher",
      action: () => {
        alert("Fonctionnalité non disponible");
        onClose();
      },
    },
    {
      icon: "❓",
      label: "Aide et support",
      action: () => {
        alert("Fonctionnalité non disponible");
        onClose();
      },
    },
    { icon: "separator", label: "", action: () => {} },
    {
      icon: "🔄",
      label: "Redémarrer",
      action: () => {
        window.location.reload();
      },
    },
    {
      icon: "⚡",
      label: "Arrêter l'ordinateur",
      action: () => {
        alert("Au revoir !");
        onClose();
      },
    },
  ];

  return (
    <div
      ref={menuRef}
      className="fixed bottom-8 left-0 w-80 bg-xp-gray-100 border-2 border-t-white border-l-white border-r-xp-gray-400 border-b-xp-gray-400 shadow-lg z-50 animate-xp-startup"
    >
      {/* User Section */}
      <div className="bg-gradient-to-r from-xp-blue-500 to-xp-blue-400 text-white p-3 flex items-center space-x-3">
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
          <span className="text-2xl">👤</span>
        </div>
        <div>
          <div className="font-bold font-ms-sans-serif">Lino LVT</div>
          <div className="text-xs opacity-90">Créateur de Contenu</div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="p-2">
        {menuItems.map((item, index) => {
          if (item.icon === "separator") {
            return (
              <div key={index} className="h-px bg-xp-gray-300 my-1 mx-2" />
            );
          }

          return (
            <div
              key={index}
              className="flex items-center space-x-3 p-2 hover:bg-xp-blue-100 cursor-pointer rounded font-ms-sans-serif text-sm"
              onClick={item.action}
            >
              <span className="text-lg w-6">{item.icon}</span>
              <span className="text-black">{item.label}</span>
            </div>
          );
        })}
      </div>

      {/* Bottom Section */}
      <div className="bg-xp-gray-200 border-t border-xp-gray-300 p-2 flex justify-between">
        <XPButton
          className="text-xs px-3 py-1"
          onClick={() => {
            alert("Fonctionnalité non disponible");
            onClose();
          }}
        >
          Tous les programmes
        </XPButton>
        <XPButton
          className="text-xs px-3 py-1"
          onClick={() => {
            window.location.reload();
          }}
        >
          Déconnexion
        </XPButton>
      </div>
    </div>
  );
};
