"use client";

import React from "react";

function ContactSection() {
  return (
    <section
      id="contact"
      className="min-h-screen py-20 bg-background dark:bg-background flex items-center justify-center"
    >
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-5xl md:text-6xl font-light text-foreground dark:text-foreground mb-6">
          Get in{" "}
          <span className="text-primary dark:text-primary font-medium">
            Touch
          </span>
        </h2>
        <p className="text-xl text-muted dark:text-foreground">
          Contact section coming soon...
        </p>
      </div>
    </section>
  );
}

export default ContactSection;
