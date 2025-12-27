"use client";

import ShinyText from "@/components/lightswind/shiny-text";
import AnimatedButton from "../AnimatedButton";
import { MessageSquare } from "lucide-react";
import { Download } from "../lightswind/Download";

export default function HeroSection() {
  const handleDownloadCV = () => {
    // Option 1: Direct download from public folder
    const link = document.createElement("a");
    link.href = "/cv/Aashir-Siddiqui-CV.pdf";
    link.download = "Aashir-Siddiqui-CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Option 2: Open in new tab (user khud download kar sakta hai)
    // window.open("/cv/Aashir-Siddiqui-CV.pdf", "_blank");
  };

  // WhatsApp Contact Function
  const handleWhatsAppContact = () => {
    const phoneNumber = "923362746653";
    const message =
      "Hi Aashir! I'm interested in discussing a project with you.";
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <div
      id="home"
      className="relative min-h-screen overflow-hidden bg-background transition-colors duration-300"
    >
      <section className="relative z-10 pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 px-5 py-2.5 mb-8 relative group">
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
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light mb-6 leading-[1.1] text-foreground transition-colors duration-300">
              Full-Stack{" "}
              <span className="text-primary font-medium">Developer</span>
              <br />&{" "}
              <span className="text-primary font-medium">
                Creative Engineer
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-md mb-10 max-w-2xl mx-auto text-foreground text-sm md:text-lg transition-colors duration-300">
              I build modern, scalable, and high-performance web applications
              using React, Next.js, Node.js, and GraphQL with clean UI and
              powerful backend architecture.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-4">
              <AnimatedButton
                label="Download CV"
                icon={Download}
                iconSize={24}
                size="lg"
                onClick={handleDownloadCV}
              />

              <button
                onClick={handleWhatsAppContact}
                className="w-auto px-8 py-4 border border-border text-foreground rounded-lg font-semibold hover:bg-surface transition-all duration-500 cursor-pointer transform flex items-center justify-center gap-2"
              >
                <MessageSquare size={18} />
                <span>Get in Touch</span>
              </button>
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
