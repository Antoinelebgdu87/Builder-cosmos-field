import React, { useState, useEffect } from "react";
import { XPDesktop } from "@/components/WindowsXP/XPDesktop";
import { XPWindow } from "@/components/WindowsXP/XPWindow";
import { XPButton } from "@/components/WindowsXP/XPButton";
import { portfolioStorage, type PortfolioItem } from "@/lib/storage";

const MesCreations = () => {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [selectedType, setSelectedType] = useState<string>("tous");

  useEffect(() => {
    setItems(portfolioStorage.getItems());
  }, []);

  const filteredItems =
    selectedType === "tous"
      ? items
      : items.filter((item) => item.type === selectedType);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "montage":
        return "✂️";
      case "motion-design":
        return "🎨";
      case "autre":
        return "📄";
      default:
        return "📁";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "montage":
        return "Montage";
      case "motion-design":
        return "Motion Design";
      case "autre":
        return "Autre";
      default:
        return "Inconnu";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const openLink = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <XPDesktop>
      <div className="p-4 pt-8">
        <XPWindow
          title="Mes Créations - Lino LVT Portfolio"
          className="w-full max-w-6xl mx-auto"
          showControls={false}
        >
          <div className="space-y-4">
            {/* Header */}
            <div className="text-center">
              <h1 className="text-2xl font-bold text-black font-ms-sans-serif mb-2">
                📁 Mes Créations
              </h1>
              <p className="text-xp-gray-600 font-ms-sans-serif">
                Découvrez mes réalisations en montage et motion design
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-2 bg-xp-gray-100 p-3 border border-xp-gray-300">
              <XPButton
                onClick={() => setSelectedType("tous")}
                className={selectedType === "tous" ? "bg-xp-blue-200" : ""}
              >
                📂 Tous
              </XPButton>
              <XPButton
                onClick={() => setSelectedType("montage")}
                className={selectedType === "montage" ? "bg-xp-blue-200" : ""}
              >
                ✂️ Montage
              </XPButton>
              <XPButton
                onClick={() => setSelectedType("motion-design")}
                className={
                  selectedType === "motion-design" ? "bg-xp-blue-200" : ""
                }
              >
                🎨 Motion Design
              </XPButton>
              <XPButton
                onClick={() => setSelectedType("autre")}
                className={selectedType === "autre" ? "bg-xp-blue-200" : ""}
              >
                📄 Autre
              </XPButton>
            </div>

            {/* Content */}
            {filteredItems.length === 0 ? (
              <div className="text-center py-12 bg-white border-2 border-t-xp-gray-400 border-l-xp-gray-400 border-r-white border-b-white">
                <div className="text-6xl mb-4">📭</div>
                <h3 className="text-xl font-bold text-black mb-2">
                  Aucune création
                </h3>
                <p className="text-xp-gray-600">
                  {selectedType === "tous"
                    ? "Aucune création n'a été ajoutée pour le moment."
                    : `Aucune création de type "${getTypeLabel(selectedType)}" trouvée.`}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border-2 border-t-white border-l-white border-r-xp-gray-400 border-b-xp-gray-400 p-4 hover:bg-xp-gray-50 transition-colors"
                  >
                    <div className="space-y-3">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl">
                            {getTypeIcon(item.type)}
                          </span>
                          <div>
                            <h3 className="font-bold text-black font-ms-sans-serif line-clamp-1">
                              {item.title}
                            </h3>
                            <span className="text-xs text-xp-gray-600 bg-xp-gray-200 px-2 py-0.5 rounded">
                              {getTypeLabel(item.type)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      {item.description && (
                        <p className="text-sm text-black font-ms-sans-serif line-clamp-3">
                          {item.description}
                        </p>
                      )}

                      {/* Date */}
                      <div className="text-xs text-xp-gray-600">
                        Ajouté le {formatDate(item.createdAt)}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <XPButton
                          onClick={() => openLink(item.link)}
                          className="flex-1 text-xs py-1"
                        >
                          🔗 Voir le projet
                        </XPButton>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Stats */}
            {items.length > 0 && (
              <div className="bg-xp-gray-100 p-3 border border-xp-gray-300 text-center">
                <span className="text-sm font-ms-sans-serif text-black">
                  Total: {items.length} création{items.length > 1 ? "s" : ""}
                  {selectedType !== "tous" && (
                    <>
                      {" "}
                      • {filteredItems.length}{" "}
                      {getTypeLabel(selectedType).toLowerCase()}
                    </>
                  )}
                </span>
              </div>
            )}
          </div>
        </XPWindow>
      </div>
    </XPDesktop>
  );
};

export default MesCreations;
