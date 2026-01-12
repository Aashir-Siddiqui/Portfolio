"use client";

import { servicesData } from "@/lib/data";
import {
  Layout,
  Server,
  Database,
  Cloud,
  Settings,
  Palette,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";
import ShinyText from "../lightswind/shiny-text";

const iconMap = {
  layout: Layout,
  server: Server,
  database: Database,
  cloud: Cloud,
  settings: Settings,
  palette: Palette,
};

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="min-h-screen py-20 bg-background dark:bg-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
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
                What I Offer
              </ShinyText>
            </div>
          </div>

          <h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 font-semibold text-foreground dark:text-foreground leading-normal"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            {servicesData.heading}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted dark:text-muted max-w-3xl mx-auto leading-relaxed">
            {servicesData.subHeading}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {servicesData.services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  index,
}: {
  service: (typeof servicesData.services)[0];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = iconMap[service.icon as keyof typeof iconMap];

  return (
    <div
      className="group relative h-full bg-surface/30 dark:bg-surface/30 backdrop-blur-xl border border-border/30 dark:border-border/30 rounded-xl p-6 lg:p-8 transition-all duration-500 hover:border-primary/50 dark:hover:border-primary/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* <div className="space-y-4"> */}
      {/* Icon Container */}
      <div className="relative mb-6">
        {/* Icon */}
        <div className="relative w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/5 dark:from-primary/20 dark:to-primary/5 rounded-2xl flex items-center justify-center border border-primary/20 dark:border-primary/20 group-hover:scale-110 transition-all duration-500">
          <Icon
            className="w-8 h-8 text-primary dark:text-primary"
            strokeWidth={1.5}
          />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl lg:text-2xl font-bold text-foreground dark:text-foreground mb-3 group-hover:text-primary dark:group-hover:text-primary transition-colors duration-300">
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-sm lg:text-base text-muted dark:text-muted mb-6 leading-relaxed">
        {service.description}
      </p>

      {/* Points List */}
      <ul className="space-y-3">
        {service.points.map((point, idx) => (
          <li
            key={idx}
            className="flex items-start gap-3 text-sm text-foreground/80 dark:text-foreground/80 group/item"
            style={{
              animationDelay: `${idx * 50}ms`,
            }}
          >
            <CheckCircle2
              className="w-4 h-4 text-primary dark:text-primary mt-0.5 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300"
              strokeWidth={2}
            />
            <span className="group-hover/item:text-foreground dark:group-hover/item:text-foreground transition-colors duration-300">
              {point}
            </span>
          </li>
        ))}
      </ul>

      {/* Shine Effect */}
      <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
        <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-foreground/5 to-transparent"></div>
      </div>

      {/* Card Number */}
      <div className="absolute top-6 right-6 text-6xl font-bold text-foreground/5 dark:text-foreground/5 group-hover:text-primary/10 dark:group-hover:text-primary/10 transition-colors duration-500 select-none">
        0{index + 1}
      </div>
      {/* </div> */}
    </div>
  );
}
