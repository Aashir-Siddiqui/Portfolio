"use client";

import { allSkills } from "@/lib/data";
import Image from "next/image";
import { useState } from "react";

export default function SkillsSection() {
  // Divide skills into 3 different groups
  const rowSize = Math.ceil(allSkills.length / 3);
  const firstRowSkills = allSkills.slice(0, rowSize);
  const secondRowSkills = allSkills.slice(rowSize, rowSize * 2);
  const thirdRowSkills = allSkills.slice(rowSize * 2);

  return (
    <section
      id="skills"
      className="min-h-screen py-20 bg-background dark:bg-background overflow-hidden"
    >
      {/* Section Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-light text-foreground dark:text-foreground mb-6 leading-tight">
          Expertise Across Modern{" "}
          <span className="text-primary dark:text-primary font-medium">
            Technologies
          </span>
          💻 &{" "}
          <span className="text-primary dark:text-primary font-medium">
            Frameworks
          </span>
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-muted dark:text-muted max-w-3xl mx-auto leading-relaxed">
          Modern technologies and platforms I work with to build scalable,
          high-performance solutions
        </p>
      </div>

      {/* Marquee Rows Container */}
      <div className="max-w-7xl mx-auto">
        {/* First Row - Right to Left */}
        <MarqueeRow skills={firstRowSkills} direction="right" />

        {/* Second Row - Left to Right */}
        <MarqueeRow skills={secondRowSkills} direction="left" />

        {/* Third Row - Right to Left */}
        <MarqueeRow skills={thirdRowSkills} direction="right" />
      </div>
    </section>
  );
}

// Marquee Row Component
function MarqueeRow({
  skills,
  direction,
}: {
  skills: typeof allSkills;
  direction: "left" | "right";
}) {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Enhanced Gradient Fades */}
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-background dark:from-background via-background/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-background dark:from-background via-background/80 to-transparent z-10 pointer-events-none" />

      {/* Marquee Content */}
      <div className="flex overflow-hidden">
        <div
          className={`flex gap-4 md:gap-6 py-8 ${
            direction === "right"
              ? isPaused
                ? "[animation-play-state:paused] animate-scroll-right"
                : "animate-scroll-right"
              : isPaused
              ? "[animation-play-state:paused] animate-scroll-left"
              : "animate-scroll-left"
          }`}
        >
          {/* Triple skills for seamless loop */}
          {[...skills, ...skills, ...skills].map((skill, index) => (
            <SkillCard key={`${skill.id}-${index}`} skill={skill} />
          ))}
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        .animate-scroll-right {
          animation: scroll-right 60s linear infinite;
        }

        .animate-scroll-left {
          animation: scroll-left 60s linear infinite;
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        @keyframes scroll-left {
          0% {
            transform: translateX(-33.333%);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}

// Enhanced Skill Card Component with Glassy Effect
function SkillCard({
  skill,
}: {
  skill: { id: string; name: string; logo: string };
}) {
  const [showName, setShowName] = useState(false);

  return (
    <div
      className="flex-shrink-0 relative"
      onMouseEnter={() => setShowName(true)}
      onMouseLeave={() => setShowName(false)}
    >
      {/* Glow Effect on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Glassy Card Container */}
      <div className="group relative flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-surface/30 dark:bg-surface/30 backdrop-blur-xl border border-border/30 dark:border-border/30 rounded-2xl hover:border-primary/60 dark:hover:border-primary/60 hover:bg-surface/50 dark:hover:bg-surface/50 transition-all duration-300">
        {/* Shine Effect */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-foreground/10 to-transparent"></div>
        </div>

        {/* Logo */}
        <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 z-10">
          <Image
            src={skill.logo}
            alt={skill.name}
            width={64}
            height={64}
            className="object-contain transition-all duration-300 filter drop-shadow-lg"
          />
        </div>

        {/* Reflection Effect */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background/10 to-transparent rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Enhanced Name Label - Shows on hover */}
      <div
        className={`absolute -bottom-6 sm:-bottom-8 left-1/2 -translate-x-1/2 transition-all duration-300 z-20 ${
          showName
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-2 pointer-events-none"
        }`}
        style={{ fontFamily: "var(--font-roboto)" }}
      >
        <div className="relative">
          {/* Glow behind label */}
          {/* <div className="absolute inset-0 bg-primary/20 rounded-xl blur-md"></div> */}

          {/* Label */}
          <span className="relative block text-xs sm:text-sm font-semibold text-foreground dark:text-foreground whitespace-nowrap">
            {skill.name}
          </span>
        </div>
      </div>
    </div>
  );
}
