"use client";

import React, { useState, useCallback, useEffect } from "react";
import { testimonialsData } from "@/lib/data";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import ShinyText from "@/components/lightswind/shiny-text";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";

export default function TestimonialsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop: true,
    skipSnaps: false,
    dragFree: false,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  // Auto-scroll every 5 seconds
  useEffect(() => {
    if (!emblaApi) return;

    const autoScroll = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(0);
      }
    }, 5000);

    return () => clearInterval(autoScroll);
  }, [emblaApi]);

  return (
    <section
      id="testimonials"
      className="min-h-screen py-20 bg-background dark:bg-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground dark:text-foreground leading-normal mb-6"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            {testimonialsData.heading}
          </h2>

          {/* Subheading */}
          <p className="text-base sm:text-lg md:text-xl text-muted dark:text-muted max-w-3xl mx-auto leading-relaxed">
            {testimonialsData.subHeading}
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonialsData.testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)] pl-0 first:pl-0 last:pr-0"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                    }}
                    viewport={{ once: true }}
                    className="h-full"
                  >
                    <TestimonialCard testimonial={testimonial} />
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons - Desktop */}
          <button
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className={`hidden md:flex absolute left-5 top-1/2 -translate-y-1/2 -translate-x-12 w-12 h-12 items-center justify-center rounded-full bg-surface/80 dark:bg-surface/80 backdrop-blur-xl border border-border/30 dark:border-border/30 transition-all duration-300 ${
              canScrollPrev
                ? "text-foreground dark:text-foreground hover:bg-primary hover:text-background dark:hover:text-background hover:border-primary cursor-pointer"
                : "text-muted/30 dark:text-muted/30 cursor-not-allowed"
            }`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={scrollNext}
            disabled={!canScrollNext}
            className={`hidden md:flex absolute right-5 top-1/2 -translate-y-1/2 translate-x-12 w-12 h-12 items-center justify-center rounded-full bg-surface/80 dark:bg-surface/80 backdrop-blur-xl border border-border/30 dark:border-border/30 transition-all duration-300 ${
              canScrollNext
                ? "text-foreground dark:text-foreground hover:bg-primary hover:text-background dark:hover:text-background hover:border-primary cursor-pointer"
                : "text-muted/30 dark:text-muted/30 cursor-not-allowed"
            }`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dots Indicator - Mobile */}
        <div className="flex md:hidden justify-center items-center gap-2 mt-8">
          {testimonialsData.testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === selectedIndex
                  ? "w-8 bg-primary dark:bg-primary"
                  : "w-2 bg-border dark:bg-border hover:bg-primary/50 dark:hover:bg-primary/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Individual Testimonial Card Component
interface TestimonialCardProps {
  testimonial: (typeof testimonialsData.testimonials)[0];
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="group relative h-full min-h-[320px]">
      {/* Main Card Container */}
      <div className="relative bg-surface/60 dark:bg-surface/60 backdrop-blur-xl border border-border/20 dark:border-border/20 rounded-3xl p-6 sm:p-8 hover:border-primary/30 dark:hover:border-primary/30 transition-all duration-500 h-full flex flex-col mx-3">
        {/* Top Section - Client Info */}
        <div className="flex items-start gap-4 mb-6 flex-shrink-0">
          <div className="relative flex-shrink-0">
            <div className="relative w-16 h-16 flex items-center justify-center overflow-hidden p-3">
              <Image
                src={testimonial.avatar}
                alt={testimonial.name}
                width={40}
                height={40}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Name & Company */}
          <div className="flex-1 min-w-0">
            <h4 className="text-lg font-bold text-foreground dark:text-foreground mb-1 truncate">
              {testimonial.name}
            </h4>
            <p className="text-sm text-muted dark:text-muted truncate">
              {testimonial.role}
            </p>
            <p className="text-xs text-muted/60 dark:text-muted/60 truncate">
              {testimonial.company}
            </p>
          </div>

          {/* Star Rating - Compact */}
          <div className="flex items-center gap-0.5 flex-shrink-0">
            {[...Array(testimonial.rating)].map((_, index) => (
              <Star
                key={index}
                className="w-3.5 h-3.5 fill-primary/80 text-primary/80"
              />
            ))}
          </div>
        </div>

        {/* Divider Line */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-border/50 to-transparent mb-6 flex-shrink-0"></div>

        {/* Feedback Text */}
        <div className="flex-1 mb-6">
          <p className="text-sm sm:text-base text-foreground/90 dark:text-foreground/90 leading-relaxed">
            {testimonial.feedback}
          </p>
        </div>

        {/* Quote Mark - Subtle */}
        <div className="absolute bottom-4 right-6 opacity-5 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none">
          <Quote className="w-20 h-20 text-primary" strokeWidth={1} />
        </div>

        {/* Shine Effect */}
        <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
          <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-foreground/5 to-transparent"></div>
        </div>
      </div>
    </div>
  );
}
