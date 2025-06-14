import React from "react";
import { XPDesktop } from "@/components/WindowsXP/XPDesktop";
import { XPWindow } from "@/components/WindowsXP/XPWindow";
import { XPButton } from "@/components/WindowsXP/XPButton";

const Contact = () => {
  const openEmail = () => {
    window.location.href = "mailto:linolvt.pro@gmail.com";
  };

  const openTwitter = () => {
    window.open("https://x.com/LinolvtPro", "_blank", "noopener,noreferrer");
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("linolvt.pro@gmail.com");
      alert("Email copié dans le presse-papiers!");
    } catch (err) {
      alert("Impossible de copier l'email");
    }
  };

  return (
    <XPDesktop>
      <div className="flex items-center justify-center min-h-screen p-8">
        <XPWindow
          title="Contact - Lino LVT Portfolio"
          className="w-full max-w-2xl mx-auto"
          showControls={false}
        >
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-xp-green-400 to-xp-green-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                <span className="text-3xl">📧</span>
              </div>
              <h1 className="text-2xl font-bold text-black font-ms-sans-serif">
                Me Contacter
              </h1>
              <p className="text-xp-gray-600 font-ms-sans-serif">
                Parlons de votre prochain projet créatif
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-4">
              {/* Email */}
              <div className="bg-white border-2 border-t-xp-gray-400 border-l-xp-gray-400 border-r-white border-b-white p-4 rounded">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-xp-blue-100 border border-xp-gray-300 flex items-center justify-center">
                    <span className="text-xl">📧</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-black font-ms-sans-serif">
                      Email
                    </h3>
                    <p className="text-sm text-xp-gray-600">
                      Pour les demandes professionnelles
                    </p>
                  </div>
                </div>
                <div className="bg-xp-gray-100 p-3 border border-xp-gray-300 mb-3">
                  <code className="text-black font-ms-sans-serif">
                    linolvt.pro@gmail.com
                  </code>
                </div>
                <div className="flex gap-2">
                  <XPButton onClick={openEmail} className="flex-1">
                    📨 Ouvrir dans l'email
                  </XPButton>
                  <XPButton onClick={copyEmail} className="flex-1">
                    📋 Copier l'adresse
                  </XPButton>
                </div>
              </div>

              {/* Twitter */}
              <div className="bg-white border-2 border-t-xp-gray-400 border-l-xp-gray-400 border-r-white border-b-white p-4 rounded">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-black text-white border border-xp-gray-300 flex items-center justify-center">
                    <span className="text-xl font-bold">𝕏</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-black font-ms-sans-serif">
                      Twitter (X)
                    </h3>
                    <p className="text-sm text-xp-gray-600">
                      Suivez mes actualités
                    </p>
                  </div>
                </div>
                <div className="bg-xp-gray-100 p-3 border border-xp-gray-300 mb-3">
                  <code className="text-black font-ms-sans-serif">
                    @LinolvtPro
                  </code>
                </div>
                <XPButton onClick={openTwitter} className="w-full">
                  🐦 Suivre sur X (Twitter)
                </XPButton>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-xp-blue-50 border-2 border-xp-blue-200 p-4">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">💡</span>
                <div>
                  <h3 className="font-bold text-black font-ms-sans-serif mb-2">
                    Informations utiles
                  </h3>
                  <ul className="text-sm text-black font-ms-sans-serif space-y-1">
                    <li>• Temps de réponse: 24-48h</li>
                    <li>• Disponible du lundi au vendredi</li>
                    <li>• Devis gratuit sur demande</li>
                    <li>• Portfolio complet disponible</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Services Box */}
            <div className="bg-white border-2 border-t-xp-gray-400 border-l-xp-gray-400 border-r-white border-b-white p-4">
              <h3 className="font-bold text-black font-ms-sans-serif mb-3">
                🎬 Services proposés
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-xp-gray-100 p-3 border border-xp-gray-300">
                  <h4 className="font-bold text-black text-sm">
                    ✂️ Montage Vidéo
                  </h4>
                  <p className="text-xs text-xp-gray-600">
                    Édition professionnelle
                  </p>
                </div>
                <div className="bg-xp-gray-100 p-3 border border-xp-gray-300">
                  <h4 className="font-bold text-black text-sm">
                    🎨 Motion Design
                  </h4>
                  <p className="text-xs text-xp-gray-600">
                    Animations et effets
                  </p>
                </div>
                <div className="bg-xp-gray-100 p-3 border border-xp-gray-300">
                  <h4 className="font-bold text-black text-sm">
                    🎯 Conseil Créatif
                  </h4>
                  <p className="text-xs text-xp-gray-600">
                    Stratégie de contenu
                  </p>
                </div>
                <div className="bg-xp-gray-100 p-3 border border-xp-gray-300">
                  <h4 className="font-bold text-black text-sm">
                    📈 Optimisation
                  </h4>
                  <p className="text-xs text-xp-gray-600">
                    Performance des vues
                  </p>
                </div>
              </div>
            </div>
          </div>
        </XPWindow>
      </div>
    </XPDesktop>
  );
};

export default Contact;
