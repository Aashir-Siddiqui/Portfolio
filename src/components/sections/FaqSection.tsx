"use client";

import React from "react";

function FaqSection() {
  return (
    <section
      id="faq"
      className="min-h-screen py-20 bg-background dark:bg-background flex items-center justify-center"
    >
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-5xl md:text-6xl font-light text-foreground dark:text-foreground mb-6">
          <span className="text-primary dark:text-primary font-medium">
            FAQ
          </span>
        </h2>
        <p className="text-xl text-muted dark:text-foreground">
          FAQ section coming soon...
        </p>
      </div>
    </section>
  );
}

export default FaqSection;
