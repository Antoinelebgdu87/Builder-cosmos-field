import React, { useState, useEffect } from "react";
import { XPTaskbar } from "./XPTaskbar";
import { XPDesktopIcons } from "./XPDesktopIcons";
import { XPBootLoader } from "./XPBootLoader";
import { XPRecycleBin } from "./XPRecycleBin";
import { XPFileViewer } from "./XPFileViewer";

interface XPDesktopProps {
  children: React.ReactNode;
  showIcons?: boolean;
}

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

export const XPDesktop: React.FC<XPDesktopProps> = ({
  children,
  showIcons = false,
}) => {
  const [isBooted, setIsBooted] = useState(false);
  const [isRecycleBinOpen, setIsRecycleBinOpen] = useState(false);
  const [isFileViewerOpen, setIsFileViewerOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<RecycleBinFile | null>(null);

  useEffect(() => {
    // Check if we've already booted in this session or if boot should be skipped
    const hasBooted = sessionStorage.getItem("xp_booted");
    const skipBoot = localStorage.getItem("skip_xp_boot") === "true";

    if (hasBooted || skipBoot) {
      setIsBooted(true);
    }
  }, []);

  const handleBootComplete = () => {
    sessionStorage.setItem("xp_booted", "true");
    setIsBooted(true);
  };

  const handleOpenRecycleBin = () => {
    setIsRecycleBinOpen(true);
  };

  const handleCloseRecycleBin = () => {
    setIsRecycleBinOpen(false);
  };

  const handleOpenFile = (file: RecycleBinFile) => {
    setSelectedFile(file);
    setIsFileViewerOpen(true);
    setIsRecycleBinOpen(false); // Close recycle bin when opening file
  };

  const handleCloseFileViewer = () => {
    setIsFileViewerOpen(false);
    setSelectedFile(null);
  };

  if (!isBooted) {
    return <XPBootLoader onBootComplete={handleBootComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-xp-blue-400 via-xp-blue-500 to-xp-blue-600 font-ms-sans-serif relative overflow-hidden">
      {/* Desktop Background Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
            radial-gradient(circle at 75% 75%, white 2px, transparent 2px)
          `,
          backgroundSize: "100px 100px",
          backgroundPosition: "0 0, 50px 50px",
        }}
      />

      {/* Windows XP Wallpaper Effect */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%),
            linear-gradient(-45deg, transparent 30%, rgba(255,255,255,0.05) 50%, transparent 70%)
          `,
          backgroundSize: "200px 200px, 150px 150px",
          animation: "float 20s ease-in-out infinite",
        }}
      />

      {/* Desktop Icons */}
      {showIcons && <XPDesktopIcons onOpenRecycleBin={handleOpenRecycleBin} />}

      {/* Main Content */}
      <div className="relative z-10 pb-12 min-h-screen">{children}</div>

      {/* Windows */}
      <XPRecycleBin
        isOpen={isRecycleBinOpen}
        onClose={handleCloseRecycleBin}
        onOpenFile={handleOpenFile}
      />

      <XPFileViewer
        isOpen={isFileViewerOpen}
        onClose={handleCloseFileViewer}
        file={selectedFile}
      />

      {/* Taskbar */}
      <XPTaskbar />
    </div>
  );
};
