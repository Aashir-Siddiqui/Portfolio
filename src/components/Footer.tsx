"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Instagram,
  Twitter,
  Facebook,
  Heart,
  ArrowUp,
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import logo from "../../public/images/logo.png";
import Link from "next/link";
import ShinyText from "./lightswind/shiny-text";
import AnimatedButton from "./AnimatedButton";

// Types
interface NavigationLink {
  name: string;
  href: string;
}

interface SocialLink {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  url: string;
  color: string;
}

interface ContactInfo {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
  href: string;
}

interface AccordionSectionProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

// Navigation Links
const navigationLinks: {
  main: NavigationLink[];
  services: NavigationLink[];
  resources: NavigationLink[];
} = {
  main: [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Services", href: "#services" },
    { name: "Process", href: "#process" },
    { name: "Projects", href: "#projects" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" },
  ],
  services: [
    { name: "Frontend Development", href: "#services" },
    { name: "Backend Development", href: "#services" },
    { name: "Full-Stack Solutions", href: "#services" },
    { name: "API Development", href: "#services" },
    { name: "UI/UX Design", href: "#services" },
  ],
  resources: [
    { name: "Blog", href: "#" },
    { name: "Case Studies", href: "#" },
    { name: "Portfolio", href: "#" },
    { name: "Resume", href: "/cv/Aashir-Siddiqui-CV.pdf" },
  ],
};

// Social Links
const socialLinks: SocialLink[] = [
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/aashir-siddiqui-88a676394/",
    color: "hover:text-[#0077B5]",
  },
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com/Aashir-Siddiqui",
    color: "hover:text-foreground",
  },
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://www.instagram.com/aashirsiddiqui_/?next=%2F&hl=en",
    color: "hover:text-[#E4405F]",
  },
  {
    name: "Twitter/X",
    icon: Twitter,
    url: "https://x.com/AashirSiddiquiX",
    color: "hover:text-[#1DA1F2]",
  },
  {
    name: "Facebook",
    icon: Facebook,
    url: "https://www.facebook.com/aashir.siddiqui.2025",
    color: "hover:text-[#1877F2]",
  },
];

// Contact Info
const contactInfo: ContactInfo[] = [
  {
    icon: Mail,
    text: "aashirsiddiqui217@gmail.com",
    href: "mailto:aashirsiddiqui217@gmail.com",
  },
  {
    icon: Phone,
    text: "+92 370 1082668",
    href: "tel:+923701082668",
  },
  {
    icon: MapPin,
    text: "Karachi, Pakistan",
    href: "#",
  },
];

// Accordion Component
const AccordionSection: React.FC<AccordionSectionProps> = ({
  title,
  children,
  isOpen,
  onToggle,
}) => {
  return (
    <div className="border-b border-border/30 dark:border-border/30">
      <button
        onClick={onToggle}
        className="w-full py-4 flex items-center justify-between text-left group"
        aria-expanded={isOpen}
      >
        <h3 className="text-base font-semibold text-foreground dark:text-foreground group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        <ChevronDown
          className={`w-5 h-5 text-muted dark:text-muted group-hover:text-primary transition-all duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 pb-4" : "max-h-0"
        }`}
      >
        <div className="space-y-3">{children}</div>
      </div>
    </div>
  );
};

export default function Footer() {
  const [openSections, setOpenSections] = useState<{
    quickLinks: boolean;
    services: boolean;
    contact: boolean;
  }>({
    quickLinks: false,
    services: false,
    contact: false,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Smooth scroll to section
  const scrollToSection = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.getElementById(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <footer className="relative bg-background dark:bg-background border-t border-border/50 dark:border-border/50">
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-primary hover:bg-primary-hover text-background dark:text-background rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl z-10 cursor-pointer"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          {/* Desktop Grid Layout */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Column 1 - Brand & Description */}
            <div className="lg:col-span-1 space-y-6">
              <div className="flex items-center space-x-2">
                <Image src={logo} alt="Logo" width={40} height={40} />
                <span
                  className="text-xl font-bold text-foreground dark:text-foreground"
                  style={{ fontFamily: "var(--font-roboto)" }}
                >
                  Aashir Siddiqui
                </span>
              </div>

              <p className="text-sm text-muted dark:text-muted leading-relaxed">
                Full-Stack Developer crafting scalable, high-performance web
                applications with modern technologies and clean architecture.
              </p>

              <div className="flex items-center space-x-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <Link
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 rounded-lg bg-surface/50 dark:bg-surface/50 border border-border/30 dark:border-border/30 flex items-center justify-center text-muted dark:text-muted transition-all duration-300 hover:scale-110 cursor-pointer ${social.color}`}
                      aria-label={social.name}
                    >
                      <Icon className="w-4 h-4" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Column 2 - Quick Links */}
            <div>
              <h3 className="text-lg font-semibold text-foreground dark:text-foreground mb-4">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {navigationLinks.main.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-sm text-muted dark:text-muted hover:text-primary dark:hover:text-primary transition-colors duration-300 cursor-pointer flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-300 mr-0 group-hover:mr-2"></span>
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 - Services */}
            <div>
              <h3 className="text-lg font-semibold text-foreground dark:text-foreground mb-4">
                Services
              </h3>
              <ul className="space-y-3">
                {navigationLinks.services.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-sm text-muted dark:text-muted hover:text-primary dark:hover:text-primary transition-colors duration-300 cursor-pointer flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-300 mr-0 group-hover:mr-2"></span>
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4 - Contact Info */}
            <div>
              <h3 className="text-lg font-semibold text-foreground dark:text-foreground mb-4">
                Get in Touch
              </h3>
              <ul className="space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <li key={index}>
                      <a
                        href={info.href}
                        className="flex items-start space-x-3 text-sm text-muted dark:text-muted hover:text-primary dark:hover:text-primary transition-colors duration-300 group"
                      >
                        <Icon className="w-5 h-5 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300 cursor-pointer" />
                        <span className="leading-relaxed">{info.text}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-6">
                <AnimatedButton
                  label="Start a Project"
                  icon={ExternalLink}
                  iconSize={18}
                  size="sm"
                  onClick={() => scrollToSection("#contact")}
                />
              </div>
            </div>
          </div>

          {/* Mobile Accordion Layout */}
          <div className="lg:hidden space-y-6">
            {/* Brand Section - Always Visible on Mobile */}
            <div className="space-y-6 pb-6 border-b border-border/30 dark:border-border/30">
              <div className="flex items-center space-x-2">
                <Image src={logo} alt="Logo" width={36} height={36} />
                <span
                  className="text-lg font-bold text-foreground dark:text-foreground"
                  style={{ fontFamily: "var(--font-roboto)" }}
                >
                  Aashir Siddiqui
                </span>
              </div>

              <p className="text-sm text-muted dark:text-muted leading-relaxed">
                Full-Stack Developer crafting scalable, high-performance web
                applications with modern technologies and clean architecture.
              </p>

              <div className="flex items-center space-x-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <Link
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 rounded-lg bg-surface/50 dark:bg-surface/50 border border-border/30 dark:border-border/30 flex items-center justify-center text-muted dark:text-muted transition-all duration-300 hover:scale-110 cursor-pointer ${social.color}`}
                      aria-label={social.name}
                    >
                      <Icon className="w-4 h-4" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Accordions */}
            <div className="space-y-0">
              {/* Quick Links Accordion */}
              <AccordionSection
                title="Quick Links"
                isOpen={openSections.quickLinks}
                onToggle={() => toggleSection("quickLinks")}
              >
                {navigationLinks.main.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm text-muted dark:text-muted hover:text-primary dark:hover:text-primary transition-colors duration-300 cursor-pointer flex items-center group w-full"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-300 mr-0 group-hover:mr-2"></span>
                    {link.name}
                  </button>
                ))}
              </AccordionSection>

              {/* Services Accordion */}
              <AccordionSection
                title="Services"
                isOpen={openSections.services}
                onToggle={() => toggleSection("services")}
              >
                {navigationLinks.services.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm text-muted dark:text-muted hover:text-primary dark:hover:text-primary transition-colors duration-300 cursor-pointer flex items-center group w-full"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-300 mr-0 group-hover:mr-2"></span>
                    {link.name}
                  </button>
                ))}
              </AccordionSection>

              {/* Contact Accordion */}
              <AccordionSection
                title="Get in Touch"
                isOpen={openSections.contact}
                onToggle={() => toggleSection("contact")}
              >
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <a
                      key={index}
                      href={info.href}
                      className="flex items-start space-x-3 text-sm text-muted dark:text-muted hover:text-primary dark:hover:text-primary transition-colors duration-300 group"
                    >
                      <Icon className="w-5 h-5 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300 cursor-pointer" />
                      <span className="leading-relaxed">{info.text}</span>
                    </a>
                  );
                })}
                <div className="pt-2">
                  <AnimatedButton
                    label="Start a Project"
                    icon={ExternalLink}
                    iconSize={18}
                    size="sm"
                    onClick={() => scrollToSection("#contact")}
                  />
                </div>
              </AccordionSection>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/30 dark:border-border/30 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted dark:text-muted text-center md:text-left">
              <p className="flex items-center justify-center md:justify-start gap-1">
                © {new Date().getFullYear()} Developed by{" "}
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
                  Aashir Siddiqui
                </ShinyText>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-surface/20 to-transparent pointer-events-none"></div>
    </footer>
  );
}
