import React from "react";
import { XPDesktop } from "@/components/WindowsXP/XPDesktop";
import { XPWindow } from "@/components/WindowsXP/XPWindow";
import { XPButton } from "@/components/WindowsXP/XPButton";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <XPDesktop>
      <div className="flex items-center justify-center min-h-screen p-8">
        <XPWindow
          title="Erreur 404 - Page introuvable"
          className="w-full max-w-md"
          showControls={false}
        >
          <div className="text-center space-y-6">
            {/* Error Icon */}
            <div className="w-24 h-24 mx-auto bg-red-100 border-2 border-red-300 flex items-center justify-center">
              <span className="text-4xl">❌</span>
            </div>

            {/* Error Message */}
            <div>
              <h1 className="text-2xl font-bold text-black font-ms-sans-serif mb-2">
                Erreur 404
              </h1>
              <p className="text-xp-gray-600 font-ms-sans-serif">
                La page que vous cherchez n'existe pas ou a été déplacée.
              </p>
            </div>

            {/* System-style error box */}
            <div className="bg-xp-gray-100 border-2 border-t-xp-gray-400 border-l-xp-gray-400 border-r-white border-b-white p-4 text-left">
              <div className="text-sm font-ms-sans-serif text-black space-y-1">
                <div>
                  <strong>Erreur:</strong> Page non trouvée
                </div>
                <div>
                  <strong>Code:</strong> HTTP 404
                </div>
                <div>
                  <strong>URL:</strong> {window.location.pathname}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <XPButton onClick={() => navigate("/")} className="w-full py-2">
                🏠 Retour à l'accueil
              </XPButton>
              <XPButton
                onClick={() => window.history.back()}
                className="w-full py-2 bg-xp-gray-300"
              >
                ⬅️ Page précédente
              </XPButton>
            </div>

            {/* Help text */}
            <div className="bg-xp-blue-50 border border-xp-blue-200 p-3">
              <p className="text-xs text-black font-ms-sans-serif">
                💡 <strong>Astuce:</strong> Utilisez la barre de navigation pour
                explorer le portfolio de Lino LVT.
              </p>
            </div>
          </div>
        </XPWindow>
      </div>
    </XPDesktop>
  );
};

export default NotFound;
