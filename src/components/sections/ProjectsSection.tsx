"use client";

import React, { useState, useCallback, useEffect } from "react";
import { projectsData } from "@/lib/data";
import {
  ExternalLink,
  Github,
  Play,
  Filter,
  Code2,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Linkedin,
} from "lucide-react";
import Image from "next/image";
import ShinyText from "@/components/lightswind/shiny-text";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";

// Filter categories
const categories = ["ALL", "Full-Stack", "Frontend", "AI", "UI Engineering"];

// Helper function to extract LinkedIn post URN from iframe
function extractLinkedInUrn(iframeString: string): string {
  const match = iframeString.match(/urn:li:ugcPost:(\d+)/);
  return match ? match[1] : "";
}

// Helper function to check if URL is LinkedIn
function isLinkedInPost(url: string): boolean {
  return url.includes("linkedin.com/embed") || url.includes("<iframe");
}

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    skipSnaps: false,
    dragFree: false,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

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
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  // Filter projects based on selected category
  const filteredProjects = projectsData.projects.filter((project) => {
    if (activeFilter === "ALL") return true;
    return project.type.includes(activeFilter);
  });

  return (
    <section
      id="projects"
      className="min-h-screen py-20 bg-background dark:bg-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-5 py-2.5 mb-8 relative group">
            <div className="absolute inset-0 bg-surface/80 dark:bg-surface/80 rounded-full border backdrop-blur-xl border-border"></div>
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
                Portfolio Showcase
              </ShinyText>
            </div>
          </div>

          {/* Heading */}
          <h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-foreground dark:text-foreground mb-6 leading-tight"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            <span className="text-primary dark:text-primary font-medium">
              {projectsData.heading}
            </span>
          </h2>

          {/* Subheading */}
          <p className="text-base sm:text-lg md:text-xl text-muted dark:text-muted max-w-3xl mx-auto leading-relaxed">
            {projectsData.subHeading}
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <div className="flex items-center gap-2 text-muted dark:text-muted">
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Filter:</span>
          </div>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 cursor-pointer ${
                activeFilter === category
                  ? "bg-primary text-background dark:text-background"
                  : "bg-surface/30 dark:bg-surface/30 text-foreground dark:text-foreground hover:bg-surface/50 dark:hover:bg-surface/50 border border-border/30 dark:border-border/30"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(50%-12px)]"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                    }}
                    viewport={{ once: true }}
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className={`hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 w-12 h-12 items-center justify-center rounded-full bg-surface/80 dark:bg-surface/80 backdrop-blur-xl border border-border/30 dark:border-border/30 transition-all duration-300 ${
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
            className={`hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 w-12 h-12 items-center justify-center rounded-full bg-surface/80 dark:bg-surface/80 backdrop-blur-xl border border-border/30 dark:border-border/30 transition-all duration-300 ${
              canScrollNext
                ? "text-foreground dark:text-foreground hover:bg-primary hover:text-background dark:hover:text-background hover:border-primary cursor-pointer"
                : "text-muted/30 dark:text-muted/30 cursor-not-allowed"
            }`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Navigation Buttons */}
        <div className="flex md:hidden items-center justify-center gap-4 mt-8">
          <button
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className={`w-12 h-12 flex items-center justify-center rounded-full bg-surface/80 dark:bg-surface/80 backdrop-blur-xl border border-border/30 dark:border-border/30 transition-all duration-300 ${
              canScrollPrev
                ? "text-foreground dark:text-foreground hover:bg-primary hover:text-background dark:hover:text-background"
                : "text-muted/30 dark:text-muted/30 cursor-not-allowed"
            }`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={scrollNext}
            disabled={!canScrollNext}
            className={`w-12 h-12 flex items-center justify-center rounded-full bg-surface/80 dark:bg-surface/80 backdrop-blur-xl border border-border/30 dark:border-border/30 transition-all duration-300 ${
              canScrollNext
                ? "text-foreground dark:text-foreground hover:bg-primary hover:text-background dark:hover:text-background"
                : "text-muted/30 dark:text-muted/30 cursor-not-allowed"
            }`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-muted dark:text-muted">
              No projects found in this category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

// Individual Project Card Component
interface ProjectCardProps {
  project: (typeof projectsData.projects)[0];
}

function ProjectCard({ project }: ProjectCardProps) {
  const isLinkedIn = isLinkedInPost(project.mediaUrl);
  const linkedInUrn = isLinkedIn ? extractLinkedInUrn(project.mediaUrl) : "";

  return (
    <div className="group relative bg-surface/30 dark:bg-surface/30 backdrop-blur-xl border border-border/30 dark:border-border/30 rounded-2xl overflow-hidden hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-500 h-full flex flex-col">
      {/* Project Number Badge */}
      <div className="absolute top-4 left-4 z-20 w-12 h-12 bg-primary/90 dark:bg-primary/90 backdrop-blur-sm rounded-xl flex items-center justify-center">
        <span className="text-2xl font-bold text-background dark:text-background">
          {project.id}
        </span>
      </div>

      {/* Type Badge */}
      <div className="absolute top-4 right-4 z-20 px-4 py-2 bg-background/90 dark:bg-background/90 backdrop-blur-sm border border-border/30 dark:border-border/30 rounded-full">
        <span className="text-xs font-semibold text-primary dark:text-primary flex items-center gap-1">
          <Code2 className="w-3 h-3" />
          {project.type}
        </span>
      </div>

      {/* Media Container - Fixed Height */}
      <div className="relative h-72 bg-surface dark:bg-surface overflow-hidden flex-shrink-0">
        {project.mediaType === "video" && isLinkedIn ? (
          // LinkedIn Embed with Thumbnail
          <Link
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-full h-full group/video block"
          >
            {/* Check if thumbnail exists, otherwise show LinkedIn icon */}
            {project.thumbnailUrl ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.thumbnailUrl}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </>
            ) : (
              // Fallback to LinkedIn Icon
              <div className="w-full h-full flex items-center justify-center bg-[#0077B5]/10 dark:bg-[#0077B5]/20">
                <div className="text-center space-y-4">
                  <Linkedin className="w-20 h-20 mx-auto text-[#0077B5] dark:text-[#0077B5]" />
                  <p className="text-sm font-medium text-foreground dark:text-foreground">
                    LinkedIn Post
                  </p>
                  <p className="text-xs text-muted dark:text-muted px-4">
                    Click to view on LinkedIn
                  </p>
                </div>
              </div>
            )}

            {/* Play/View Button Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover/video:bg-black/10 flex items-center justify-center transition-all duration-300">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#0077B5] rounded-full flex items-center justify-center transform transition-all duration-300 opacity-0 group-hover/video:opacity-100 group-hover/video:scale-110">
                <ExternalLink className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
            </div>
          </Link>
        ) : project.mediaType === "video" ? (
          // YouTube Video
          <Link
            href={project.mediaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-full h-full group/video block"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://img.youtube.com/vi/${extractYoutubeId(
                project.mediaUrl
              )}/maxresdefault.jpg`}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700"
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-all duration-300 group-hover/video:bg-black/50">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary rounded-full flex items-center justify-center transform transition-all duration-300 group-hover/video:scale-110">
                <Play className="w-8 h-8 sm:w-10 sm:h-10 text-background dark:text-background fill-current ml-1" />
              </div>
            </div>
          </Link>
        ) : (
          // Static Image
          <Image
            src={project.mediaUrl}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700"
          />
        )}
      </div>

      {/* Content - Flexible Height with Fixed Structure */}
      <div className="p-6 space-y-4 flex flex-col flex-1">
        {/* Category - Fixed */}
        <div className="flex items-center gap-2 text-primary dark:text-primary flex-shrink-0">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">{project.category}</span>
        </div>

        {/* Title - Fixed Height (2 lines) */}
        <h3 className="text-2xl font-bold text-foreground dark:text-foreground group-hover:text-primary dark:group-hover:text-primary transition-colors duration-300 line-clamp-2 flex-shrink-0 min-h-[3.5rem]">
          {project.title}
        </h3>

        {/* Description - Fixed Height (3 lines) */}
        <p className="text-sm text-muted dark:text-muted leading-relaxed line-clamp-3 flex-shrink-0 min-h-[4.5rem]">
          {project.description}
        </p>

        {/* Tech Stack - Fixed Height */}
        <div className="flex flex-wrap gap-2 flex-shrink-0 min-h-[2.5rem]">
          {project.techStack.slice(0, 6).map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1.5 text-xs font-medium bg-surface/50 dark:bg-surface/50 border border-border/30 dark:border-border/30 text-foreground dark:text-foreground rounded-lg"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 6 && (
            <span className="px-3 py-1.5 text-xs font-medium bg-primary/10 dark:bg-primary/10 text-primary dark:text-primary rounded-lg">
              +{project.techStack.length - 6} more
            </span>
          )}
        </div>

        {/* Spacer to push buttons to bottom */}
        <div className="flex-1"></div>

        {/* Action Buttons - Fixed at Bottom */}
        <div className="flex flex-wrap gap-3 pt-2 flex-shrink-0">
          <Link
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 min-w-[140px] flex items-center justify-center gap-2 px-5 py-3 bg-primary hover:bg-primary-hover text-background dark:text-background rounded-xl font-semibold transition-all duration-300 transform"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Live Demo</span>
          </Link>
          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-5 py-3 border border-border dark:border-border text-foreground dark:text-foreground rounded-xl font-semibold hover:bg-surface dark:hover:bg-surface transition-all duration-300 transform"
            >
              <Github className="w-4 h-4" />
              <span>Code</span>
            </Link>
          )}
        </div>
      </div>

      {/* Shine Effect */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
        <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-foreground/5 to-transparent"></div>
      </div>
    </div>
  );
}

// Helper function to extract YouTube video ID
function extractYoutubeId(url: string): string {
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/
  );
  return match ? match[1] : "";
}
