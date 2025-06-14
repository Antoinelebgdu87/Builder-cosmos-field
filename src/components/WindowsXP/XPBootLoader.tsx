import React, { useState, useEffect } from "react";
import { soundManager } from "@/lib/sounds";

interface XPBootLoaderProps {
  onBootComplete: () => void;
}

export const XPBootLoader: React.FC<XPBootLoaderProps> = ({
  onBootComplete,
}) => {
  const [stage, setStage] = useState<"bios" | "loading" | "welcome">("bios");
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [dots, setDots] = useState("");

  const skipBoot = () => {
    localStorage.setItem("skip_xp_boot", "true");
    onBootComplete();
  };

  useEffect(() => {
    const sequence = async () => {
      // BIOS Screen (shortened)
      setTimeout(() => setStage("loading"), 1000);

      // Loading Screen with progress (faster)
      setTimeout(() => {
        const progressInterval = setInterval(() => {
          setLoadingProgress((prev) => {
            if (prev >= 100) {
              clearInterval(progressInterval);
              setTimeout(() => setStage("welcome"), 200);
              return 100;
            }
            return prev + 5; // Faster progress
          });
        }, 50); // Faster updates
      }, 1200);

      // Welcome screen then complete (much shorter)
      setTimeout(() => {
        soundManager.playStartup();
        setTimeout(onBootComplete, 800);
      }, 3000);
    };

    sequence();
  }, [onBootComplete]);

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    return () => clearInterval(dotsInterval);
  }, []);

  // Add keyboard listener for ESC key to skip boot
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        skipBoot();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  if (stage === "bios") {
    return (
      <div className="fixed inset-0 bg-black text-white font-mono text-sm overflow-hidden">
        <div className="p-4 space-y-2">
          <div className="text-center text-lg font-bold mb-4">
            AWARD BIOS v6.00PG
          </div>
          <div>CPU: Intel(R) Pentium(R) 4 CPU 3.00GHz</div>
          <div>Memory Test: 512MB OK</div>
          <div>Primary Master: WDC WD800JB-00JJC0</div>
          <div>Primary Slave: None</div>
          <div>Secondary Master: DVD-ROM Drive</div>
          <div>Secondary Slave: None</div>
          <div className="mt-4">
            <div>Detecting IDE drives...</div>
            <div className="mt-2">Press DEL to enter SETUP</div>
          </div>
          <div className="absolute bottom-4 left-4">
            <div className="animate-pulse">Starting Windows XP...</div>
          </div>
          <div className="absolute bottom-4 right-4">
            <button
              onClick={skipBoot}
              className="bg-blue-600 text-white px-3 py-1 text-xs hover:bg-blue-700 rounded"
            >
              ESC: Passer le démarrage
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (stage === "loading") {
    return (
      <div className="fixed inset-0 bg-black flex flex-col justify-center items-center">
        {/* Windows XP Logo */}
        <div className="mb-8">
          <div className="text-center">
            <div className="text-6xl font-bold text-white mb-2">
              <span className="text-red-500">W</span>
              <span className="text-orange-500">i</span>
              <span className="text-yellow-500">n</span>
              <span className="text-green-500">d</span>
              <span className="text-blue-500">o</span>
              <span className="text-indigo-500">w</span>
              <span className="text-purple-500">s</span>
            </div>
            <div className="text-white text-2xl font-semibold">
              <span className="text-orange-500">XP</span> Professional
            </div>
          </div>
        </div>

        {/* Loading Bar */}
        <div className="w-80 mb-4">
          <div className="bg-gray-700 rounded-full h-3 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-green-500 h-full rounded-full relative">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 to-green-400 transition-all duration-150"
                style={{ width: `${loadingProgress}%` }}
              />
              {/* Moving highlight */}
              <div className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
            </div>
          </div>
          <div className="text-white text-center mt-2 text-sm">
            {loadingProgress}% Complete
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-white text-lg">Chargement{dots}</div>

        {/* Skip button */}
        <button
          onClick={skipBoot}
          className="absolute bottom-8 right-8 bg-blue-600 text-white px-4 py-2 text-sm hover:bg-blue-700 rounded"
        >
          Passer (ESC)
        </button>

        {/* Microsoft Copyright */}
        <div className="absolute bottom-8 left-8 text-gray-400 text-sm">
          Copyright © Microsoft Corporation
        </div>
      </div>
    );
  }

  if (stage === "welcome") {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
        <div className="flex flex-col justify-center items-center h-full text-white">
          <div className="text-center space-y-6">
            <div className="text-4xl font-bold mb-4">Bienvenue</div>
            <div className="w-16 h-16 border-4 border-white rounded-full animate-spin border-t-transparent mx-auto" />
            <div className="text-xl">Préparation de votre bureau...</div>
            <button
              onClick={skipBoot}
              className="bg-white text-blue-600 px-4 py-2 text-sm hover:bg-gray-100 rounded"
            >
              Continuer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
