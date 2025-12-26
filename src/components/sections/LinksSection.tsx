"use client";

import React from "react";

function LinksSection() {
  return (
    <section
      id="links"
      className="min-h-screen py-20 bg-surface/30 dark:bg-surface/30 flex items-center justify-center"
    >
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-5xl md:text-6xl font-light text-foreground dark:text-foreground mb-6">
          My{" "}
          <span className="text-primary dark:text-primary font-medium">
            Links
          </span>
        </h2>
        <p className="text-xl text-muted dark:text-foreground">
          Links section coming soon...
        </p>
      </div>
    </section>
  );
}

export default LinksSection;
