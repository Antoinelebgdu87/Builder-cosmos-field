import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { soundManager } from "@/lib/sounds";

interface XPButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "start" | "taskbar";
  children: React.ReactNode;
}

export const XPButton: React.FC<XPButtonProps> = ({
  variant = "default",
  children,
  className,
  onMouseDown,
  onMouseUp,
  onClick,
  ...props
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsPressed(true);
    soundManager.playClick();
    onMouseDown?.(e);
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsPressed(false);
    onMouseUp?.(e);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    soundManager.initialize(); // Initialize audio context on first click
    onClick?.(e);
  };

  const baseClasses =
    "font-ms-sans-serif text-sm relative transition-none select-none";

  const variantClasses = {
    default: cn(
      "bg-xp-gray-200 border-2 px-4 py-1",
      isPressed
        ? "border-t-xp-gray-400 border-l-xp-gray-400 border-r-white border-b-white"
        : "border-t-white border-l-white border-r-xp-gray-400 border-b-xp-gray-400",
      "hover:bg-xp-gray-100",
    ),
    start: cn(
      "bg-gradient-to-r from-xp-green-400 to-xp-green-500 border-2 px-6 py-2 text-white font-bold rounded-r-xl",
      isPressed
        ? "border-t-xp-gray-400 border-l-xp-gray-400 border-r-white border-b-white"
        : "border-t-white border-l-white border-r-xp-gray-400 border-b-xp-gray-400",
    ),
    taskbar: cn(
      "bg-xp-gray-200 border border-xp-gray-300 px-3 py-1 mx-1",
      isPressed
        ? "border-t-xp-gray-400 border-l-xp-gray-400 border-r-white border-b-white bg-xp-gray-300"
        : "border-t-white border-l-white border-r-xp-gray-400 border-b-xp-gray-400",
      "hover:bg-xp-gray-100",
    ),
  };

  return (
    <button
      className={cn(baseClasses, variantClasses[variant], className)}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => setIsPressed(false)}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};
