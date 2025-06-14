import React from "react";
import { cn } from "@/lib/utils";
import { XPButton } from "./XPButton";

interface XPWindowProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  showControls?: boolean;
}

export const XPWindow: React.FC<XPWindowProps> = ({
  title,
  children,
  className,
  onClose,
  onMinimize,
  onMaximize,
  showControls = true,
}) => {
  return (
    <div
      className={cn(
        "bg-xp-gray-100 border-2 border-t-white border-l-white border-r-xp-gray-400 border-b-xp-gray-400 shadow-xp-window",
        className,
      )}
    >
      {/* Title Bar */}
      <div className="bg-gradient-to-r from-xp-blue-500 to-xp-blue-400 text-white px-2 py-1 flex items-center justify-between border-b-2 border-xp-gray-400">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-white/20 rounded-sm flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-sm"></div>
          </div>
          <span className="font-ms-sans-serif text-sm font-bold">{title}</span>
        </div>

        {showControls && (
          <div className="flex space-x-1">
            {onMinimize && (
              <XPButton
                variant="default"
                className="w-6 h-5 p-0 text-xs bg-xp-gray-200 text-black"
                onClick={onMinimize}
              >
                _
              </XPButton>
            )}
            {onMaximize && (
              <XPButton
                variant="default"
                className="w-6 h-5 p-0 text-xs bg-xp-gray-200 text-black"
                onClick={onMaximize}
              >
                □
              </XPButton>
            )}
            {onClose && (
              <XPButton
                variant="default"
                className="w-6 h-5 p-0 text-xs bg-xp-gray-200 text-black"
                onClick={onClose}
              >
                ×
              </XPButton>
            )}
          </div>
        )}
      </div>

      {/* Window Content */}
      <div className="p-3">{children}</div>
    </div>
  );
};
