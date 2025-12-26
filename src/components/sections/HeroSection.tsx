"use client";

import { ShineButton } from "@/components/lightswind/shine-button";
import ShinyText from "@/components/lightswind/shiny-text";
import Image from "next/image";

export default function HeroSection() {
  return (
    <div  id="home" className="relative min-h-screen overflow-hidden bg-background transition-colors duration-300">
      {/* Main Content */}
      <section className="relative z-10 pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            {/* Badge with Glassy Background and Shiny Border */}
            <div className="inline-flex items-center space-x-2 px-5 py-2.5 mb-8 relative group">
              {/* Glassy Background */}
              <div className="absolute inset-0 bg-surface/80 dark:bg-surface/80 rounded-full border backdrop-blur-xl border-border"></div>

              {/* Content */}
              <div className="relative flex items-center space-x-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                </span>

                <ShinyText
                  size="sm"
                  weight="normal"
                  speed={3}
                  intensity={1}
                  shineWidth={80}
                  pauseOnHover={true}
                  repeat="infinite"
                  gradientType="linear"
                  className="text-gray-light"
                >
                  Available for New Opportunities
                </ShinyText>
              </div>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-light mb-6 leading-[1.1] text-foreground transition-colors duration-300">
              Full-Stack{" "}
              <span className="text-primary font-medium">Developer</span>
              <br />&{" "}
              <span className="text-primary font-medium">
                Creative Designer
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-md mb-10 max-w-2xl mx-auto text-foreground text-sm md:text-lg transition-colors duration-300">
              I build modern, scalable, and high-performance web applications
              using React, Next.js, Node.js, and GraphQL with clean UI and
              powerful backend architecture.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <ShineButton
                label="View my Services"
                href="#services"
                size="lg"
              />
              <a
                href="#contact"
                className="w-full sm:w-auto px-8 py-4 border border-border text-foreground rounded-xl font-semibold hover:bg-surface transition-all duration-500 transform hover:scale-105"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Border Shine Animation */}
      <style jsx>{`
        @keyframes shine-border {
          0%,
          100% {
            background-position: 200% 0;
          }
          50% {
            background-position: -200% 0;
          }
        }

        .animate-shine-border {
          animation: shine-border 3s linear infinite;
        }
      `}</style>
    </div>
  );
}
