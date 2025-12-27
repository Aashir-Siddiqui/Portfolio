"use client";
import type { Transition } from "motion/react";
import { motion } from "motion/react";
import React from "react";

interface DownloadProps extends React.SVGAttributes<SVGSVGElement> {
  width?: number;
  height?: number;
  strokeWidth?: number;
  stroke?: string;
}

const defaultTransition: Transition = {
  type: "spring",
  stiffness: 250,
  damping: 25,
};

const Download = ({
  width = 28,
  height = 28,
  strokeWidth = 2,
  stroke = "currentColor", // Changed to currentColor to inherit from parent
  ...props
}: DownloadProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        display: "inline-block",
        verticalAlign: "middle",
      }}
      {...props}
    >
      {/* Container box - subtle pulse */}
      <motion.path
        animate={{
          opacity: [1, 0.7, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
      />

      {/* Arrow - continuous bounce */}
      <motion.g
        animate={{
          y: [0, 4, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" x2="12" y1="15" y2="3" />
      </motion.g>
    </svg>
  );
};

// Add displayName for identification
Download.displayName = "Download";

export { Download };
