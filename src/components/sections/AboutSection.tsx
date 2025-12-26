"use client";

import { aboutData } from "@/lib/data";
import Image from "next/image";
import { Check } from "lucide-react";
import { ShineButton } from "@/components/lightswind/shine-button";

export default function AboutSection() {
  return (
    <div
      id="about"
      className="min-h-screen bg-background dark:bg-background pt-32 pb-20 px-4"
    >
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-16">
          <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light mb-4">
            <span className="text-foreground dark:text-foreground">About </span>
            <span className="text-primary dark:text-primary font-medium">
              Me
            </span>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-foreground dark:text-foreground max-w-3xl mx-auto">
            {aboutData.tagline}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
          {/* Left Column - Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden bg-surface/50 dark:bg-surface/50 border border-border/30 dark:border-border/30 shadow-2xl">
              <Image
                src="/images/aboutImg.jpeg"
                alt={aboutData.intro.name}
                width={600}
                height={700}
                className="w-full h-auto object-cover"
                priority
              />

              {/* Name Badge at Bottom */}
              <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6">
                <div className="bg-surface/90 dark:bg-surface/90 backdrop-blur-xl rounded-2xl p-4 md:p-6 border border-border/50 dark:border-border/50">
                  <h2 className="text-xl md:text-3xl font-bold text-foreground dark:text-foreground mb-2">
                    {aboutData.intro.name}
                  </h2>
                  <p className="text-sm md:text-xl text-primary dark:text-primary font-light">
                    {aboutData.intro.role}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - About Content & Specializations */}
          <div className="space-y-4">
            {/* Introduction */}
            <div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-foreground dark:text-foreground">
                Hi, I'm{" "}
                <span className="text-primary dark:text-primary">
                  {aboutData.intro.name.split(" ")[0]}
                </span>
                {" — "}
                <span className="text-primary dark:text-primary">
                  Developer & Creative Engineer
                </span>
              </h3>

              {/* Description Paragraphs */}
              <div className="space-y-4 text-muted dark:text-muted text-sm sm:text-base leading-relaxed">
                {aboutData.intro.description.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Specializations - 2 Column Grid */}
            <div className="pt-8">
              <h4 className="text-xl md:text-2xl font-bold mb-6 text-foreground dark:text-foreground">
                I specialize in:
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                {aboutData.specializations.map((spec, index) => (
                  <div key={index} className="flex items-start gap-3 group">
                    {/* Check Icon */}
                    <Check
                      className="w-5 h-5 text-primary dark:text-primary flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300"
                      strokeWidth={2.5}
                    />

                    {/* Specialization Text */}
                    <span className="text-sm text-foreground dark:text-foreground font-medium group-hover:text-primary dark:group-hover:text-primary transition-colors duration-300">
                      {spec}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <ShineButton
                label="View Services"
                onClick={() =>
                  document
                    .getElementById("services")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                size="lg"
              />
              <button
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-8 py-4 border border-border dark:border-border text-foreground dark:text-foreground rounded-xl font-semibold hover:bg-surface dark:hover:bg-surface transition-all duration-500 transform hover:scale-105 text-center"
              >
                Hire Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
