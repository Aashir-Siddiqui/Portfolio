"use client";

import React, { useState, useEffect } from "react";
import { Contact } from "lucide-react";
import Image from "next/image";
import logo from "../../public/logo.png";
import { ToggleTheme } from "../components/lightswind/toggle-theme";
import AnimatedButton from "./AnimatedButton";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Detect active section
      const sections = [
        "home",
        "about",
        "skills",
        "services",
        "process",
        "projects",
        "faq",
        "contact",
      ];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "about" },
    { name: "Skills", href: "skills" },
    { name: "Services", href: "services" },
    { name: "Process", href: "process" },
    { name: "Projects", href: "projects" },
    { name: "FAQ", href: "faq" },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
        scrolled
          ? "top-2 w-[95%] lg:w-[90%] xl:w-[85%] max-w-7xl"
          : "top-0 w-full max-w-7xl"
      }`}
      style={{
        willChange: "transform, width, top",
      }}
    >
      <div
        className={`relative transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          scrolled
            ? "rounded-2xl border bg-background/80 dark:bg-background/80"
            : "bg-none rounded-none border-0"
        } backdrop-blur-xl border-border`}
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`flex justify-between items-center transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
              scrolled ? "h-16" : "h-20"
            }`}
          >
            <button
              onClick={() => scrollToSection("home")}
              className="flex items-center group focus:outline-none space-x-1 cursor-pointer"
            >
              <div
                className={`transition-all duration-500 ease-out group-hover:scale-105 ${
                  scrolled ? "w-10 h-10" : "w-12 h-12"
                }`}
              >
                <Image
                  src={logo}
                  alt="logo"
                  width={scrolled ? 40 : 44}
                  height={scrolled ? 40 : 44}
                />
              </div>
              <span
                className={`font-bold transition-all duration-500 ${
                  scrolled ? "text-lg" : "text-xl"
                } text-foreground`}
                style={{ fontFamily: "var(--font-roboto)" }}
              >
                aashir
              </span>
            </button>

            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link, index) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className={`relative cursor-pointer px-4 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 group ${
                    activeSection === link.href
                      ? "text-primary"
                      : "text-muted hover:text-foreground"
                  }`}
                  style={{
                    transitionDelay: `${index * 30}ms`,
                  }}
                >
                  <span
                    className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                      activeSection === link.href
                        ? "scale-100 bg-surface/70"
                        : "scale-0 group-hover:scale-100 bg-surface/70"
                    }`}
                  />

                  <span className="relative">{link.name}</span>

                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-primary transition-all duration-300 rounded-full ${
                      activeSection === link.href
                        ? "w-3/4"
                        : "w-0 group-hover:w-3/4"
                    }`}
                  />
                </button>
              ))}
            </div>

            <div className="hidden md:flex items-center space-x-3">
              <ToggleTheme
                animationType="circle-spread"
                duration={500}
                className="p-2.5 rounded-xl transition-all duration-300 cursor-pointer transform hover:scale-110 text-muted hover:text-foreground hover:bg-surface/70"
              />

              <AnimatedButton
                label="Contact"
                icon={Contact}
                iconSize={18}
                onClick={() => scrollToSection("contact")}
                size="md"
              />
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl transition-all duration-300 transform hover:scale-110 text-muted hover:text-foreground hover:bg-surface/70"
            >
              <div className="relative w-6 h-6">
                <span
                  className={`absolute top-1.5 left-0 w-full h-0.5 bg-current rounded-full transition-all duration-300 ${
                    mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
                  }`}
                />
                <span
                  className={`absolute top-3 left-0 w-full h-0.5 bg-current rounded-full transition-all duration-300 ${
                    mobileMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`absolute top-4.5 left-0 w-full h-0.5 bg-current rounded-full transition-all duration-300 ${
                    mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            mobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border-t border-border/50 px-4 py-4 space-y-1">
            {navLinks.map((link, index) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-500 transform ${
                  activeSection === link.href
                    ? "text-primary bg-surface/70"
                    : "text-muted hover:text-foreground hover:bg-surface/70"
                } ${
                  mobileMenuOpen
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-4 opacity-0"
                }`}
                style={{
                  transitionDelay: mobileMenuOpen ? `${index * 50}ms` : "0ms",
                }}
              >
                {link.name}
              </button>
            ))}

            <div
              className={`pt-3 flex items-center space-x-2 transition-all duration-500 ${
                mobileMenuOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
              style={{
                transitionDelay: mobileMenuOpen ? "300ms" : "0ms",
              }}
            >
              <div className="flex-1 flex justify-center">
                <ToggleTheme
                  animationType="circle-spread"
                  duration={500}
                  className="p-3 rounded-xl transition-all duration-300 transform hover:scale-105 text-muted hover:text-foreground hover:bg-surface/70"
                />
              </div>
              <AnimatedButton
                label="Contact"
                icon={Contact}
                iconSize={18}
                onClick={() => scrollToSection("contact")}
                size="lg"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
