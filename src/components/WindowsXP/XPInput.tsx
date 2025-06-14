import React from "react";
import { cn } from "@/lib/utils";

interface XPInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const XPInput: React.FC<XPInputProps> = ({
  label,
  className,
  ...props
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-ms-sans-serif text-black">
          {label}
        </label>
      )}
      <input
        className={cn(
          "w-full px-2 py-1 border-2 border-t-xp-gray-400 border-l-xp-gray-400 border-r-white border-b-white",
          "bg-white text-black font-ms-sans-serif text-sm focus:outline-none",
          className,
        )}
        {...props}
      />
    </div>
  );
};

interface XPTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export const XPTextarea: React.FC<XPTextareaProps> = ({
  label,
  className,
  ...props
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-ms-sans-serif text-black">
          {label}
        </label>
      )}
      <textarea
        className={cn(
          "w-full px-2 py-1 border-2 border-t-xp-gray-400 border-l-xp-gray-400 border-r-white border-b-white",
          "bg-white text-black font-ms-sans-serif text-sm focus:outline-none resize-none",
          className,
        )}
        {...props}
      />
    </div>
  );
};

interface XPSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
}

export const XPSelect: React.FC<XPSelectProps> = ({
  label,
  options,
  className,
  ...props
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-ms-sans-serif text-black">
          {label}
        </label>
      )}
      <select
        className={cn(
          "w-full px-2 py-1 border-2 border-t-xp-gray-400 border-l-xp-gray-400 border-r-white border-b-white",
          "bg-white text-black font-ms-sans-serif text-sm focus:outline-none",
          className,
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
