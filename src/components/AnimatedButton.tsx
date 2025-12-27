"use client";

import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface AnimatedButtonProps {
  label: string;
  onClick?: () => void;
  href?: string;
  icon?: LucideIcon | React.ComponentType<any>;
  iconSize?: number;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  label,
  onClick,
  href,
  icon: Icon,
  iconSize = 18,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  fullWidth = false,
}) => {
  // Size variants
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-2.5 text-base",
    lg: "px-8 py-3 text-lg",
  };

  // Variant styles
  const variantClasses = {
    primary:
      "bg-primary hover:bg-primary-hover text-background dark:text-background",
    secondary:
      "bg-surface hover:bg-surface-light text-foreground dark:bg-surface dark:hover:bg-surface-light",
    outline:
      "border-2 border-primary hover:bg-primary hover:text-background text-primary dark:border-primary dark:hover:bg-primary dark:hover:text-background",
  };

  const baseClasses = cn(
    "relative flex items-center justify-center space-x-2 rounded-lg font-semibold overflow-hidden group transition-all duration-500 transform cursor-pointer",
    sizeClasses[size],
    variantClasses[variant],
    fullWidth ? "w-full" : "",
    disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "",
    className
  );

  // Check if icon is Download component
  const isDownloadIcon = Icon && (Icon as any).displayName === "Download";

  const content = (
    <>
      {/* Shine Effect */}
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />

      {/* Icon */}
      {Icon && (
        <span className="relative z-10 transition-transform duration-300 flex items-center justify-center">
          {isDownloadIcon ? (
            // Download component with currentColor support
            <Icon width={iconSize} height={iconSize} stroke="currentColor" />
          ) : (
            // Regular Lucide icon
            <Icon size={iconSize} />
          )}
        </span>
      )}

      {/* Label */}
      <span className="relative z-10">{label}</span>
    </>
  );

  // If href is provided, render as anchor tag
  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {content}
      </Link>
    );
  }

  // Otherwise render as button
  return (
    <button onClick={onClick} className={baseClasses} disabled={disabled}>
      {content}
    </button>
  );
};

export default AnimatedButton;
