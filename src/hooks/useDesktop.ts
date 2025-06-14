import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useDesktop = () => {
  const [isDesktopMode, setIsDesktopMode] = useState(false);
  const navigate = useNavigate();

  // Check if we're in desktop mode from URL or localStorage
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const desktopMode = urlParams.get("desktop") === "true";
    const storedDesktop = localStorage.getItem("desktop_mode") === "true";

    if (desktopMode || storedDesktop) {
      setIsDesktopMode(true);
    }
  }, []);

  const goToDesktop = () => {
    setIsDesktopMode(true);
    localStorage.setItem("desktop_mode", "true");
    navigate("/?desktop=true");
  };

  const openWindow = (path: string) => {
    setIsDesktopMode(false);
    localStorage.setItem("desktop_mode", "false");
    navigate(path);
  };

  const closeWindow = () => {
    setIsDesktopMode(true);
    localStorage.setItem("desktop_mode", "true");
    navigate("/?desktop=true");
  };

  const minimizeWindow = () => {
    setIsDesktopMode(true);
    localStorage.setItem("desktop_mode", "true");
    navigate("/?desktop=true");
  };

  return {
    isDesktopMode,
    goToDesktop,
    openWindow,
    closeWindow,
    minimizeWindow,
  };
};
