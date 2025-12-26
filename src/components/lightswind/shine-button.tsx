"use client";

import React from "react";

interface ShineButtonProps {
  label?: string;
  onClick?: () => void;
  href?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  bgColor?: string;
}

const sizeStyles: Record<
  NonNullable<ShineButtonProps["size"]>,
  { padding: string; fontSize: string }
> = {
  sm: { padding: "0.5rem 1rem", fontSize: "0.875rem" },
  md: { padding: "0.6rem 1.4rem", fontSize: "1rem" },
  lg: { padding: "0.8rem 1.8rem", fontSize: "1.125rem" },
};

export const ShineButton: React.FC<ShineButtonProps> = ({
  label = "Shine now",
  onClick,
  className = "",
  size = "md",
}) => {
  const { padding, fontSize } = sizeStyles[size];

  return (
    <button
      onClick={onClick}
      // FIX: Text color theme ke mutabiq set kiya.
      // Light Mode: text-white | Dark Mode: dark:text-background
      className={`relative font-medium rounded-md min-w-[120px] min-h-[44px] transition-all duration-700 ease-in-out
        border-none cursor-pointer
        focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background
        hover:bg-[length:280%_auto] active:scale-95 
        bg-primary hover:bg-primary-hover 
        text-white dark:text-background 
        ${className}`}
      style={{
        backgroundSize: "280% auto",
        backgroundPosition: "initial",
        fontSize,
        padding,
        transition: "0.8s",
      }}
      onMouseEnter={(e) =>
        ((e.target as HTMLButtonElement).style.backgroundPosition = "right top")
      }
      onMouseLeave={(e) =>
        ((e.target as HTMLButtonElement).style.backgroundPosition = "initial")
      }
    >
      <span className="relative z-10">{label}</span>

      {/* Shine effect */}
      <div
        className="absolute top-0 left-[-75%] w-[200%] 
      h-full bg-white/40 skew-x-[-20deg] opacity-0 
      group-hover:opacity-100 animate-shine pointer-events-none z-0"
      />
    </button>
  );
};
