"use client";

import React, { useRef } from "react";
import { processData } from "@/lib/data";
import { motion, useInView } from "framer-motion";
import {
  Lightbulb,
  Layout,
  Code,
  TestTube2,
  Rocket,
  Wrench,
} from "lucide-react";

// Simple icon mapping for each step
const iconMap: Record<number, React.ReactNode> = {
  1: <Lightbulb className="h-5 w-5" />,
  2: <Layout className="h-5 w-5" />,
  3: <Code className="h-5 w-5" />,
  4: <TestTube2 className="h-5 w-5" />,
  5: <Rocket className="h-5 w-5" />,
  6: <Wrench className="h-5 w-5" />,
};

interface ProcessItemProps {
  step: {
    id: number;
    title: string;
    description: string;
    tags: string[];
  };
  index: number;
  isLast: boolean;
}

const ProcessItem: React.FC<ProcessItemProps> = ({ step, index, isLast }) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(itemRef, { once: true, margin: "-50px" });

  return (
    <div
      ref={itemRef}
      className="relative flex gap-0"
    >
      {/* Timeline line and dot */}
      <div className="relative flex flex-col items-center">
        {/* Icon container with simple static icon */}
        <div
          className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 dark:bg-primary/10 border-2 border-primary dark:border-primary text-primary shrink-0"
        >
          {iconMap[step.id]}
        </div>

        {/* Vertical line */}
        {!isLast && (
          <div
            className="w-[2px] bg-primary dark:bg-primary h-full my-0.5 rounded-full"
          />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-12 px-6">
        <div
          className="group"
        >
          {/* Step header */}
          <div className="mb-2">
            <h3 className="text-xl font-semibold text-foreground dark:text-foreground group-hover:text-primary dark:group-hover:text-primary transition-colors duration-300">
              {step.title}
            </h3>
            <p className="text-sm text-muted dark:text-muted mt-1">
              Step {step.id} of {processData.steps.length}
            </p>
          </div>

          {/* Description */}
          <p className="text-[15px] leading-relaxed text-foreground/80 dark:text-foreground/70 mb-4">
            {step.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {step.tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 dark:bg-primary/5 text-primary dark:text-primary border border-primary/20 dark:border-primary/10 hover:bg-primary/20 dark:hover:bg-primary/10 transition-colors duration-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative min-h-screen py-20 bg-background dark:bg-background"
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          {/* Heading */}
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-foreground dark:text-foreground mb-6 leading-tight"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            <span
              className="font-semibold text-foreground dark:text-foreground leading-normal"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              {processData.heading}
            </span>
          </h2>

          {/* Subheading */}
          <p className="text-base sm:text-lg md:text-xl text-muted dark:text-muted max-w-3xl mx-auto leading-relaxed">
            {processData.subHeading}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {processData.steps.map((step, index) => (
            <ProcessItem
              key={step.id}
              step={step}
              index={index}
              isLast={index === processData.steps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
