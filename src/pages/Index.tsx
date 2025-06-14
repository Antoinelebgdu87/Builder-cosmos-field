import React, { useState } from "react";
import { XPDesktop } from "@/components/WindowsXP/XPDesktop";
import { XPWindow } from "@/components/WindowsXP/XPWindow";
import { XPButton } from "@/components/WindowsXP/XPButton";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [showDesktop, setShowDesktop] = useState(false);

  if (showDesktop) {
    return <XPDesktop showIcons={true}>{null}</XPDesktop>;
  }

  return (
    <XPDesktop>
      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="animate-xp-startup">
          <XPWindow
            title="Bienvenue - Lino LVT Portfolio"
            className="w-full max-w-4xl mx-auto"
            onMinimize={() => setShowDesktop(true)}
            onClose={() => setShowDesktop(true)}
          >
            <div className="space-y-6">
              {/* Header Section */}
              <div className="text-center space-y-4">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-xp-blue-300 to-xp-blue-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                  <span className="text-4xl font-bold text-white">LVT</span>
                </div>
                <h1 className="text-3xl font-bold text-black font-ms-sans-serif">
                  Lino LVT
                </h1>
                <p className="text-lg text-xp-gray-600 font-ms-sans-serif">
                  Créateur de Contenu • Montage & Motion Design
                </p>
              </div>

              {/* Welcome Message */}
              <div className="bg-xp-blue-50 border-2 border-xp-blue-200 p-4 rounded">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">👋</span>
                  <div>
                    <h3 className="font-bold text-black font-ms-sans-serif text-lg">
                      Bienvenue sur mon Portfolio !
                    </h3>
                    <p className="text-black font-ms-sans-serif text-sm">
                      Découvrez mes créations et mon parcours dans l'univers du
                      montage vidéo et du motion design.
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats Section */}
              <div className="bg-white border-2 border-t-xp-gray-400 border-l-xp-gray-400 border-r-white border-b-white p-4 rounded">
                <h2 className="text-xl font-bold text-black mb-4 font-ms-sans-serif">
                  📊 Mes Statistiques
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-xp-gray-100 p-4 border border-xp-gray-300 text-center">
                    <div className="text-3xl font-bold text-xp-blue-600 mb-2">
                      2
                    </div>
                    <div className="text-sm text-black font-semibold">
                      ANNÉES
                    </div>
                    <div className="text-xs text-xp-gray-600">d'expérience</div>
                  </div>
                  <div className="bg-xp-gray-100 p-4 border border-xp-gray-300 text-center">
                    <div className="text-3xl font-bold text-xp-green-500 mb-2">
                      +1M
                    </div>
                    <div className="text-sm text-black font-semibold">VUES</div>
                    <div className="text-xs text-xp-gray-600">générées</div>
                  </div>
                  <div className="bg-xp-gray-100 p-4 border border-xp-gray-300 text-center">
                    <div className="text-3xl font-bold text-orange-500 mb-2">
                      ∞
                    </div>
                    <div className="text-sm text-black font-semibold">
                      CRÉATIVITÉ
                    </div>
                    <div className="text-xs text-xp-gray-600">sans limites</div>
                  </div>
                </div>
              </div>

              {/* Services Section */}
              <div className="bg-white border-2 border-t-xp-gray-400 border-l-xp-gray-400 border-r-white border-b-white p-4 rounded">
                <h2 className="text-xl font-bold text-black mb-4 font-ms-sans-serif">
                  🎬 Mes Services
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-4 p-3 bg-xp-gray-100 border border-xp-gray-300">
                    <div className="w-12 h-12 bg-blue-100 border border-xp-gray-400 flex items-center justify-center">
                      <span className="text-2xl">✂️</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-black font-ms-sans-serif">
                        Montage Vidéo
                      </h3>
                      <p className="text-sm text-xp-gray-600">
                        Édition professionnelle pour YouTube, réseaux sociaux
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-3 bg-xp-gray-100 border border-xp-gray-300">
                    <div className="w-12 h-12 bg-purple-100 border border-xp-gray-400 flex items-center justify-center">
                      <span className="text-2xl">🎨</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-black font-ms-sans-serif">
                        Motion Design
                      </h3>
                      <p className="text-sm text-xp-gray-600">
                        Animations et effets visuels captivants
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex flex-wrap justify-center gap-3 bg-xp-gray-100 p-4 border border-xp-gray-300">
                <XPButton
                  onClick={() => navigate("/mes-creations")}
                  className="px-6 py-2 bg-blue-100"
                >
                  📁 Découvrir mes créations
                </XPButton>
                <XPButton
                  onClick={() => navigate("/contact")}
                  className="px-6 py-2 bg-green-100"
                >
                  📧 Me contacter
                </XPButton>
                <XPButton
                  onClick={() => setShowDesktop(true)}
                  className="px-6 py-2 bg-yellow-100"
                >
                  🖥️ Voir le bureau
                </XPButton>
              </div>

              {/* Quick Info */}
              <div className="text-center text-xs text-xp-gray-600 font-ms-sans-serif">
                💡 Astuce : Double-cliquez sur les icônes du bureau pour
                naviguer rapidement !
              </div>
            </div>
          </XPWindow>
        </div>
      </div>
    </XPDesktop>
  );
};

export default Index;
