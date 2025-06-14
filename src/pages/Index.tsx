import React from "react";
import { XPDesktop } from "@/components/WindowsXP/XPDesktop";
import { XPWindow } from "@/components/WindowsXP/XPWindow";
import { XPButton } from "@/components/WindowsXP/XPButton";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <XPDesktop>
      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="animate-xp-startup">
          <XPWindow
            title="Bienvenue - Lino LVT Portfolio"
            className="w-full max-w-4xl mx-auto"
            showControls={false}
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

              {/* Stats Section */}
              <div className="bg-white border-2 border-t-xp-gray-400 border-l-xp-gray-400 border-r-white border-b-white p-4 rounded">
                <h2 className="text-xl font-bold text-black mb-4 font-ms-sans-serif">
                  📊 Statistiques
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-xp-gray-100 p-3 border border-xp-gray-300">
                    <div className="text-2xl font-bold text-xp-blue-600">
                      2 ans
                    </div>
                    <div className="text-sm text-black">d'expérience</div>
                  </div>
                  <div className="bg-xp-gray-100 p-3 border border-xp-gray-300">
                    <div className="text-2xl font-bold text-xp-green-500">
                      +1M
                    </div>
                    <div className="text-sm text-black">de vues générées</div>
                  </div>
                </div>
              </div>

              {/* Services Section */}
              <div className="bg-white border-2 border-t-xp-gray-400 border-l-xp-gray-400 border-r-white border-b-white p-4 rounded">
                <h2 className="text-xl font-bold text-black mb-4 font-ms-sans-serif">
                  🎬 Services
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 mx-auto bg-xp-blue-100 border-2 border-xp-gray-300 flex items-center justify-center">
                      <span className="text-2xl">✂️</span>
                    </div>
                    <h3 className="font-bold text-black">Montage</h3>
                    <p className="text-sm text-xp-gray-600">
                      Édition vidéo professionnelle
                    </p>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 mx-auto bg-xp-blue-100 border-2 border-xp-gray-300 flex items-center justify-center">
                      <span className="text-2xl">🎨</span>
                    </div>
                    <h3 className="font-bold text-black">Motion Design</h3>
                    <p className="text-sm text-xp-gray-600">
                      Animations et effets visuels
                    </p>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 mx-auto bg-xp-blue-100 border-2 border-xp-gray-300 flex items-center justify-center">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <h3 className="font-bold text-black">Créatif</h3>
                    <p className="text-sm text-xp-gray-600">
                      Contenu original et engageant
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex flex-wrap justify-center gap-4">
                <XPButton
                  onClick={() => navigate("/mes-creations")}
                  className="px-6 py-2"
                >
                  📁 Voir mes créations
                </XPButton>
                <XPButton
                  onClick={() => navigate("/contact")}
                  className="px-6 py-2"
                >
                  📧 Me contacter
                </XPButton>
                <XPButton
                  onClick={() => navigate("/admin")}
                  className="px-6 py-2 bg-xp-gray-300"
                >
                  🔐 Admin
                </XPButton>
              </div>

              {/* About Section */}
              <div className="bg-white border-2 border-t-xp-gray-400 border-l-xp-gray-400 border-r-white border-b-white p-4 rounded">
                <h2 className="text-xl font-bold text-black mb-4 font-ms-sans-serif">
                  ℹ️ À propos
                </h2>
                <p className="text-black font-ms-sans-serif leading-relaxed">
                  Passionné par la création de contenu depuis 2 ans, j'ai
                  développé une expertise en montage vidéo et motion design.
                  Avec plus d'un million de vues générées, je mets mon
                  savoir-faire au service de vos projets créatifs.
                </p>
              </div>
            </div>
          </XPWindow>
        </div>
      </div>
    </XPDesktop>
  );
};

export default Index;
