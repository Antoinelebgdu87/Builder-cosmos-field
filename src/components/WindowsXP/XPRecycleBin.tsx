import React, { useState } from "react";
import { XPWindow } from "./XPWindow";
import { XPButton } from "./XPButton";
import { soundManager } from "@/lib/sounds";

interface RecycleBinFile {
  id: string;
  name: string;
  originalLocation: string;
  deletedDate: string;
  size: string;
  type: "image" | "video" | "document" | "other";
  icon: string;
  content?: string;
}

interface XPRecycleBinProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenFile: (file: RecycleBinFile) => void;
}

export const XPRecycleBin: React.FC<XPRecycleBinProps> = ({
  isOpen,
  onClose,
  onOpenFile,
}) => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const files: RecycleBinFile[] = [
    {
      id: "1",
      name: "1.jpg",
      originalLocation: "C:\\Documents\\Photos",
      deletedDate: "14/06/2025 15:30",
      size: "2.4 MB",
      type: "image",
      icon: "🖼️",
      content: `Information sur le fichier : 1.jpg
      
Créateur : Lino LVT
Type : Image JPEG
Taille : 2.4 MB
Date de création : 10/06/2025
Description : Photo de profil pour le portfolio

Contenu technique :
- Résolution : 1920x1080
- Qualité : Haute définition
- Compression : Standard JPEG
- Espace colorimétrique : sRGB

Notes du créateur :
"Cette photo a été prise pour mon portfolio. 
J'ai utilisé un éclairage professionnel et 
fait quelques retouches en post-production.
Le résultat me plaît beaucoup !"

Dernière modification : 12/06/2025 14:22`,
    },
    {
      id: "2",
      name: "montage_video.mp4",
      originalLocation: "C:\\Videos\\Projets",
      deletedDate: "14/06/2025 14:15",
      size: "45.7 MB",
      type: "video",
      icon: "🎬",
      content: `Projet de montage vidéo : montage_video.mp4

Créateur : Lino LVT
Logiciel utilisé : Adobe Premiere Pro
Durée : 3 minutes 24 secondes
Format : MP4 1080p 60fps

Détails du projet :
- Nombre de clips utilisés : 23
- Effets appliqués : 12
- Transitions : 8
- Musique de fond : Track_ambient_01.mp3

Résumé du contenu :
"Montage créatif combinant plusieurs techniques :
- Jump cuts rythmés
- Color grading cinématique  
- Effets de transition fluides
- Synchronisation audio parfaite

Ce projet représente +2M de vues sur YouTube
et fait partie de mes meilleures créations !"

Rendu final : 14/06/2025 12:45
Taille finale : 45.7 MB`,
    },
    {
      id: "3",
      name: "script_projet.txt",
      originalLocation: "C:\\Documents\\Scripts",
      deletedDate: "13/06/2025 16:45",
      size: "12 KB",
      type: "document",
      icon: "📄",
      content: `SCRIPT PROJET VIDÉO - LINO LVT

=== INTRODUCTION ===
Durée : 15 secondes
- Logo animé avec son signature
- Texte : "Nouvelle création de Lino LVT"
- Transition : Fondu enchaîné

=== PARTIE 1 : PRÉSENTATION ===
Durée : 45 secondes
- Montage rapide des meilleurs moments
- Musique dynamique (140 BPM)
- Textes overlay avec statistiques
- Couleurs dominantes : Bleu/Orange

=== PARTIE 2 : DÉVELOPPEMENT ===
Durée : 2 minutes
- Démonstration du processus créatif
- Voix off explicative
- Zoom sur détails techniques
- Ajout d'effets visuels

=== CONCLUSION ===
Durée : 24 secondes
- Résumé visuel impactant
- Call-to-action
- Liens vers réseaux sociaux
- Logo de fin

NOTES TECHNIQUES :
- Format : 1920x1080 60fps
- Bitrate : 8000 kbps
- Audio : 48kHz stéréo
- Couleur : Rec.709

STATUS : ✅ APPROUVÉ`,
    },
    {
      id: "4",
      name: "thumbnail_design.psd",
      originalLocation: "C:\\Design\\Thumbnails",
      deletedDate: "13/06/2025 11:20",
      size: "34.2 MB",
      type: "image",
      icon: "🎨",
      content: `Fichier Photoshop : thumbnail_design.psd

Créateur : Lino LVT
Application : Adobe Photoshop 2024
Dimensions : 1280x720 pixels (16:9)
Résolution : 300 DPI

Calques utilisés :
1. Arrière-plan dégradé
2. Photo principale (portrait)
3. Texte titre "NOUVELLE VIDÉO"
4. Effets lumineux
5. Logo LVT
6. Bordure décorative

Polices utilisées :
- Montserrat Bold (titre)
- Open Sans Regular (sous-titre)

Palette de couleurs :
- #FF6B35 (Orange vif)
- #004E89 (Bleu profond)
- #FFFFFF (Blanc)
- #1A1A1A (Noir)

Objectif :
"Créer une thumbnail accrocheuse pour YouTube
qui maximise le taux de clic (CTR).
Design moderne avec contraste élevé."

Performance attendue : +15% CTR
Date limite : 15/06/2025`,
    },
  ];

  const formatFileSize = (size: string) => size;

  const getFileTypeColor = (type: string) => {
    switch (type) {
      case "image":
        return "text-blue-600";
      case "video":
        return "text-purple-600";
      case "document":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  const handleFileClick = (file: RecycleBinFile) => {
    setSelectedFile(file.id);
    soundManager.playClick();
  };

  const handleFileDoubleClick = (file: RecycleBinFile) => {
    soundManager.playNotification();
    onOpenFile(file);
  };

  const handleEmptyRecycleBin = () => {
    soundManager.playNotification();
    alert("Êtes-vous sûr de vouloir vider définitivement la corbeille ?");
  };

  if (!isOpen) return null;

  return (
    <XPWindow
      title={`Corbeille - ${files.length} élément(s)`}
      onClose={onClose}
      className="w-full max-w-4xl mx-auto mt-8"
    >
      <div className="space-y-3">
        {/* Toolbar */}
        <div className="bg-xp-gray-100 border border-xp-gray-300 p-2 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-ms-sans-serif">Fichiers :</span>
            <span className="text-sm font-bold">{files.length}</span>
          </div>
          <XPButton
            onClick={handleEmptyRecycleBin}
            className="text-xs px-3 py-1 bg-red-100"
          >
            🗑️ Vider la corbeille
          </XPButton>
        </div>

        {/* File List Header */}
        <div className="bg-xp-gray-200 border border-xp-gray-400 p-2 grid grid-cols-12 gap-2 text-xs font-bold font-ms-sans-serif">
          <div className="col-span-4">Nom</div>
          <div className="col-span-3">Emplacement d'origine</div>
          <div className="col-span-2">Date de suppression</div>
          <div className="col-span-2">Taille</div>
          <div className="col-span-1">Type</div>
        </div>

        {/* File List */}
        <div className="bg-white border-2 border-t-xp-gray-400 border-l-xp-gray-400 border-r-white border-b-white max-h-64 overflow-y-auto">
          {files.map((file) => (
            <div
              key={file.id}
              className={`grid grid-cols-12 gap-2 p-2 text-xs font-ms-sans-serif cursor-pointer hover:bg-xp-blue-100 ${
                selectedFile === file.id
                  ? "bg-xp-blue-200 border border-xp-blue-500"
                  : "border border-transparent"
              }`}
              onClick={() => handleFileClick(file)}
              onDoubleClick={() => handleFileDoubleClick(file)}
            >
              <div className="col-span-4 flex items-center space-x-2">
                <span className="text-lg">{file.icon}</span>
                <span className={getFileTypeColor(file.type)}>{file.name}</span>
              </div>
              <div className="col-span-3 text-xp-gray-600 truncate">
                {file.originalLocation}
              </div>
              <div className="col-span-2 text-xp-gray-600">
                {file.deletedDate}
              </div>
              <div className="col-span-2 text-xp-gray-600">
                {formatFileSize(file.size)}
              </div>
              <div className="col-span-1 text-xp-gray-600 capitalize">
                {file.type}
              </div>
            </div>
          ))}
        </div>

        {/* Status Bar */}
        <div className="bg-xp-gray-100 border border-xp-gray-300 p-2 text-xs font-ms-sans-serif flex justify-between">
          <span>
            {selectedFile
              ? `1 élément sélectionné`
              : `${files.length} éléments`}
          </span>
          <span>Espace utilisé : 94.3 MB</span>
        </div>

        {/* Instructions */}
        <div className="bg-xp-blue-50 border border-xp-blue-200 p-3 text-xs font-ms-sans-serif">
          <div className="flex items-center space-x-2">
            <span className="text-lg">💡</span>
            <div>
              <strong>Instructions :</strong> Double-cliquez sur un fichier pour
              l'ouvrir et voir son contenu détaillé.
            </div>
          </div>
        </div>
      </div>
    </XPWindow>
  );
};
