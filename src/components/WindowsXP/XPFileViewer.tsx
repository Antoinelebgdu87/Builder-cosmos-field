import React from "react";
import { XPWindow } from "./XPWindow";
import { XPButton } from "./XPButton";

interface FileViewerProps {
  isOpen: boolean;
  onClose: () => void;
  file: {
    id: string;
    name: string;
    type: "image" | "video" | "document" | "other";
    icon: string;
    content?: string;
    size: string;
  } | null;
}

export const XPFileViewer: React.FC<FileViewerProps> = ({
  isOpen,
  onClose,
  file,
}) => {
  if (!isOpen || !file) return null;

  const getApplicationName = (type: string) => {
    switch (type) {
      case "image":
        return "Visionneuse d'images Windows";
      case "video":
        return "Lecteur Windows Media";
      case "document":
        return "Bloc-notes";
      default:
        return "Application par défaut";
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case "image":
        return "🖼️";
      case "video":
        return "🎬";
      case "document":
        return "📄";
      default:
        return "📁";
    }
  };

  return (
    <XPWindow
      title={`${file.name} - ${getApplicationName(file.type)}`}
      onClose={onClose}
      className="w-full max-w-4xl mx-auto mt-12"
    >
      <div className="space-y-4">
        {/* File Header */}
        <div className="bg-xp-gray-100 border border-xp-gray-300 p-3 flex items-center space-x-3">
          <span className="text-3xl">{getFileIcon(file.type)}</span>
          <div>
            <h3 className="font-bold text-lg font-ms-sans-serif text-black">
              {file.name}
            </h3>
            <p className="text-sm text-xp-gray-600 font-ms-sans-serif">
              Taille : {file.size} • Type : {file.type.toUpperCase()}
            </p>
          </div>
        </div>

        {/* File Content */}
        <div className="bg-white border-2 border-t-xp-gray-400 border-l-xp-gray-400 border-r-white border-b-white p-4 min-h-96 max-h-96 overflow-y-auto">
          {file.type === "image" && (
            <div className="text-center space-y-4">
              <div className="w-full h-48 bg-xp-gray-100 border-2 border-xp-gray-300 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-2">🖼️</div>
                  <p className="text-sm text-xp-gray-600 font-ms-sans-serif">
                    Aperçu d'image non disponible
                  </p>
                  <p className="text-xs text-xp-gray-500 font-ms-sans-serif">
                    (Simulation Windows XP)
                  </p>
                </div>
              </div>
              {file.content && (
                <div className="text-left">
                  <h4 className="font-bold mb-2 font-ms-sans-serif">
                    Informations sur le fichier :
                  </h4>
                  <pre className="text-xs font-mono font-ms-sans-serif whitespace-pre-wrap bg-xp-gray-50 p-3 border border-xp-gray-300">
                    {file.content}
                  </pre>
                </div>
              )}
            </div>
          )}

          {file.type === "video" && (
            <div className="text-center space-y-4">
              <div className="w-full h-48 bg-black border-2 border-xp-gray-300 flex items-center justify-center relative">
                <div className="text-center text-white">
                  <div className="text-6xl mb-2">▶️</div>
                  <p className="text-sm">Lecteur vidéo</p>
                  <p className="text-xs">(Simulation)</p>
                </div>
                {/* Fake video controls */}
                <div className="absolute bottom-2 left-2 right-2 bg-xp-gray-300 p-1 flex items-center space-x-2">
                  <button className="w-6 h-6 bg-white border border-gray-400 flex items-center justify-center text-xs">
                    ▶️
                  </button>
                  <div className="flex-1 h-2 bg-gray-400">
                    <div className="h-full w-1/3 bg-blue-500"></div>
                  </div>
                  <span className="text-xs">1:24 / 3:24</span>
                </div>
              </div>
              {file.content && (
                <div className="text-left">
                  <h4 className="font-bold mb-2 font-ms-sans-serif">
                    Détails de la vidéo :
                  </h4>
                  <pre className="text-xs font-mono font-ms-sans-serif whitespace-pre-wrap bg-xp-gray-50 p-3 border border-xp-gray-300">
                    {file.content}
                  </pre>
                </div>
              )}
            </div>
          )}

          {file.type === "document" && (
            <div className="space-y-2">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl">📄</span>
                <h4 className="font-bold font-ms-sans-serif">
                  Contenu du document
                </h4>
              </div>
              <div className="bg-white border border-xp-gray-300 p-3">
                <pre className="text-sm font-mono font-ms-sans-serif whitespace-pre-wrap leading-relaxed">
                  {file.content || "Aucun contenu disponible pour ce fichier."}
                </pre>
              </div>
            </div>
          )}

          {file.type === "other" && (
            <div className="text-center space-y-4">
              <div className="text-6xl">❓</div>
              <h4 className="font-bold font-ms-sans-serif">
                Type de fichier non pris en charge
              </h4>
              <p className="text-sm text-xp-gray-600 font-ms-sans-serif">
                Impossible d'afficher le contenu de ce fichier.
              </p>
              {file.content && (
                <div className="text-left">
                  <pre className="text-xs font-mono font-ms-sans-serif whitespace-pre-wrap bg-xp-gray-50 p-3 border border-xp-gray-300">
                    {file.content}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center bg-xp-gray-100 border border-xp-gray-300 p-2">
          <div className="text-xs text-xp-gray-600 font-ms-sans-serif">
            📅 Ouvert depuis la Corbeille • Lecture seule
          </div>
          <div className="flex space-x-2">
            <XPButton className="text-xs px-3 py-1" onClick={onClose}>
              📁 Ouvrir l'emplacement
            </XPButton>
            <XPButton
              className="text-xs px-3 py-1 bg-green-100"
              onClick={onClose}
            >
              ✅ Fermer
            </XPButton>
          </div>
        </div>
      </div>
    </XPWindow>
  );
};
