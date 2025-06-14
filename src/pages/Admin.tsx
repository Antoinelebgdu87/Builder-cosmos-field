import React, { useState, useEffect } from "react";
import { XPDesktop } from "@/components/WindowsXP/XPDesktop";
import { XPWindow } from "@/components/WindowsXP/XPWindow";
import { XPButton } from "@/components/WindowsXP/XPButton";
import { XPInput, XPTextarea, XPSelect } from "@/components/WindowsXP/XPInput";
import { useAuth } from "@/hooks/useAuth";
import { useDesktop } from "@/hooks/useDesktop";
import { portfolioStorage, type PortfolioItem } from "@/lib/storage";

const Admin = () => {
  const { isAuthenticated, isLoading, login, logout } = useAuth();
  const { closeWindow, minimizeWindow } = useDesktop();
  const [items, setItems] = useState<PortfolioItem[]>([]);

  // Login form state
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [loginError, setLoginError] = useState("");

  // Add item form state
  const [formData, setFormData] = useState({
    title: "",
    link: "",
    description: "",
    type: "montage" as "montage" | "motion-design" | "autre",
  });

  useEffect(() => {
    if (isAuthenticated) {
      setItems(portfolioStorage.getItems());
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(loginData.username, loginData.password);
    if (!success) {
      setLoginError("Identifiants incorrects");
    } else {
      setLoginError("");
      setLoginData({ username: "", password: "" });
    }
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.link) {
      alert("Veuillez remplir au moins le titre et le lien");
      return;
    }

    const newItem = portfolioStorage.addItem(formData);
    setItems(portfolioStorage.getItems());
    setFormData({
      title: "",
      link: "",
      description: "",
      type: "montage",
    });
    alert("Création ajoutée avec succès!");
  };

  const handleDeleteItem = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette création?")) {
      portfolioStorage.deleteItem(id);
      setItems(portfolioStorage.getItems());
    }
  };

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
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <XPDesktop showIcons={true}>
        <div className="flex items-center justify-center min-h-screen">
          <XPWindow
            title="Chargement..."
            className="w-80"
            onClose={closeWindow}
            onMinimize={minimizeWindow}
          >
            <div className="text-center py-8">
              <div className="text-4xl mb-4">⏳</div>
              <p className="font-ms-sans-serif">
                Vérification de l'authentification...
              </p>
            </div>
          </XPWindow>
        </div>
      </XPDesktop>
    );
  }

  if (!isAuthenticated) {
    return (
      <XPDesktop showIcons={true}>
        <div className="flex items-center justify-center min-h-screen p-8">
          <XPWindow
            title="Connexion Administrateur"
            className="w-full max-w-md"
            onClose={closeWindow}
            onMinimize={minimizeWindow}
          >
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto bg-xp-gray-300 border-2 border-xp-gray-400 flex items-center justify-center mb-3">
                  <span className="text-2xl">🔐</span>
                </div>
                <h2 className="text-xl font-bold text-black font-ms-sans-serif">
                  Accès Administrateur
                </h2>
              </div>

              <XPInput
                label="Nom d'utilisateur"
                type="text"
                value={loginData.username}
                onChange={(e) =>
                  setLoginData((prev) => ({
                    ...prev,
                    username: e.target.value,
                  }))
                }
                required
              />

              <XPInput
                label="Mot de passe"
                type="password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                required
              />

              {loginError && (
                <div className="bg-red-100 border-2 border-red-300 p-2 text-red-700 text-sm">
                  ❌ {loginError}
                </div>
              )}

              <XPButton type="submit" className="w-full py-2">
                🔓 Se connecter
              </XPButton>
            </form>
          </XPWindow>
        </div>
      </XPDesktop>
    );
  }

  return (
    <XPDesktop showIcons={true}>
      <div className="p-4 pt-8 space-y-4">
        {/* Header */}
        <XPWindow
          title="Administration - Lino LVT Portfolio"
          className="w-full max-w-6xl mx-auto"
          onClose={closeWindow}
          onMinimize={minimizeWindow}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-black font-ms-sans-serif">
                🛠️ Panneau d'Administration
              </h1>
              <p className="text-sm text-xp-gray-600">
                Gérez vos créations et le contenu du portfolio
              </p>
            </div>
            <XPButton onClick={logout} className="bg-red-100">
              🚪 Se déconnecter
            </XPButton>
          </div>
        </XPWindow>

        {/* Add Item Form */}
        <XPWindow
          title="Ajouter une nouvelle création"
          className="w-full max-w-6xl mx-auto"
        >
          <form onSubmit={handleAddItem} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <XPInput
                label="Titre de la création"
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Ex: Montage vidéo YouTube"
                required
              />

              <XPInput
                label="Lien vers la création"
                type="url"
                value={formData.link}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, link: e.target.value }))
                }
                placeholder="https://..."
                required
              />
            </div>

            <XPSelect
              label="Type de création"
              value={formData.type}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  type: e.target.value as any,
                }))
              }
              options={[
                { value: "montage", label: "✂️ Montage" },
                { value: "motion-design", label: "🎨 Motion Design" },
                { value: "autre", label: "📄 Autre" },
              ]}
            />

            <XPTextarea
              label="Description (optionnelle)"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Décrivez votre création..."
              rows={4}
            />

            <XPButton
              type="submit"
              className="w-full py-2 bg-xp-green-400 text-white"
            >
              ➕ Ajouter la création
            </XPButton>
          </form>
        </XPWindow>

        {/* Items List */}
        <XPWindow
          title={`Mes créations (${items.length})`}
          className="w-full max-w-6xl mx-auto"
        >
          {items.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">📭</div>
              <p className="text-xp-gray-600 font-ms-sans-serif">
                Aucune création ajoutée pour le moment.
              </p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border-2 border-t-white border-l-white border-r-xp-gray-400 border-b-xp-gray-400 p-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-lg">
                          {getTypeIcon(item.type)}
                        </span>
                        <h3 className="font-bold text-black font-ms-sans-serif">
                          {item.title}
                        </h3>
                        <span className="text-xs bg-xp-gray-200 px-2 py-0.5 rounded">
                          {getTypeLabel(item.type)}
                        </span>
                      </div>

                      {item.description && (
                        <p className="text-sm text-black mb-2 font-ms-sans-serif">
                          {item.description}
                        </p>
                      )}

                      <div className="text-xs text-xp-gray-600 space-y-1">
                        <div>📅 Ajouté le: {formatDate(item.createdAt)}</div>
                        <div>
                          🔗 Lien:
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xp-blue-600 underline ml-1"
                          >
                            {item.link}
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="ml-4">
                      <XPButton
                        onClick={() => handleDeleteItem(item.id)}
                        className="bg-red-100 text-red-700 px-3 py-1 text-xs"
                      >
                        🗑️ Supprimer
                      </XPButton>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </XPWindow>
      </div>
    </XPDesktop>
  );
};

export default Admin;
