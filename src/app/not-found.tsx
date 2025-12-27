"use client";

import React from "react";
import { Home, ArrowLeft, Search, Mail, FileQuestion } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../../public/images/logo.png";
import AnimatedButton from "@/components/AnimatedButton";

export default function NotFound() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/");
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-background dark:bg-background flex items-center justify-center px-4 py-30">
      <div className="max-w-4xl w-full text-center">
        {/* Animated 404 Number */}
        <div className="relative mb-8">
          {/* Glow Effect */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 bg-primary/20 dark:bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
          </div>

          {/* 404 Text */}
          <div className="relative">
            <h1
              className="text-[120px] sm:text-[160px] md:text-[200px] font-bold leading-none bg-gradient-to-br from-primary via-primary to-primary-dark bg-clip-text text-transparent"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              404
            </h1>
          </div>
        </div>

        {/* Heading */}
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground dark:text-foreground mb-4"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          Oops! Page Not Found
        </h2>

        {/* Description */}
        <p className="text-base sm:text-lg text-muted dark:text-muted max-w-2xl mx-auto mb-8 leading-relaxed">
          Looks like you've ventured into uncharted territory. The page you're
          looking for doesn't exist or may have been moved. Let me help you get
          back on track!
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <AnimatedButton
            label="Go Back Home"
            icon={Home}
            iconSize={18}
            size="lg"
            onClick={handleGoHome}
          />
          <button
            onClick={handleGoBack}
            className="px-8 py-4 border border-border dark:border-border text-foreground dark:text-foreground rounded-xl font-semibold hover:bg-surface dark:hover:bg-surface transition-all duration-300 transform flex items-center gap-2"
          >
            <ArrowLeft size={18} />
            <span>Go Back</span>
          </button>
        </div>

        {/* Fun Error Code Animation */}
        <div className="mt-12 flex items-center justify-center gap-2 text-sm text-muted dark:text-muted">
          <span>Error Code:</span>
          <code className="px-3 py-1 bg-surface/50 dark:bg-surface/50 border border-border/30 dark:border-border/30 rounded-lg font-mono text-primary dark:text-primary">
            404_PAGE_NOT_FOUND
          </code>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 dark:bg-primary/10 rounded-full blur-2xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-32 h-32 bg-primary/10 dark:bg-primary/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>
    </div>
  );
}
