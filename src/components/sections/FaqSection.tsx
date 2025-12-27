"use client";

import React, { useState } from "react";
import { faqsData } from "@/lib/data";
import {
  ChevronDown,
  Code,
  Layers,
  Zap,
  Shield,
  Globe,
  Users,
  Headphones,
  Briefcase,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Icon mapping for each FAQ
const iconMap: Record<number, React.ReactNode> = {
  1: <Briefcase className="w-5 h-5" />,
  2: <Layers className="w-5 h-5" />,
  3: <Code className="w-5 h-5" />,
  4: <Shield className="w-5 h-5" />,
  5: <Globe className="w-5 h-5" />,
  6: <Zap className="w-5 h-5" />,
  7: <Headphones className="w-5 h-5" />,
  8: <Users className="w-5 h-5" />,
};

export default function FaqSection() {
  const [openId, setOpenId] = useState<number | null>(null); // No FAQ open by default

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section
      id="faq"
      className="min-h-screen py-20 bg-background dark:bg-background"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[400px_1fr] gap-8 lg:gap-16 items-center">
          {/* Left Sider */}
          <div className="space-y-4">
            {/* Heading */}
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground dark:text-foreground leading-tight"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              {faqsData.heading}
            </h2>

            {/* Subheading */}
            <p className="text-base text-muted dark:text-muted leading-relaxed">
              {faqsData.subHeading}
            </p>
          </div>

          {/* Right Side */}
          <div className="space-y-3">
            {faqsData.faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                }}
                viewport={{ once: true, margin: "-20px" }}
              >
                <FaqItem
                  faq={faq}
                  isOpen={openId === faq.id}
                  onToggle={() => toggleFaq(faq.id)}
                  icon={iconMap[faq.id]}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Individual FAQ Item Component
interface FaqItemProps {
  faq: {
    id: number;
    question: string;
    answer: string;
  };
  isOpen: boolean;
  onToggle: () => void;
  icon: React.ReactNode;
}

function FaqItem({ faq, isOpen, onToggle, icon }: FaqItemProps) {
  return (
    <div
      className={`group relative bg-surface/30 dark:bg-surface/30 backdrop-blur-sm border rounded-xl transition-all duration-300 ${
        isOpen
          ? "border-border/50 dark:border-border/50"
          : "border-border/20 dark:border-border/20 hover:border-border/40 dark:hover:border-border/40"
      }`}
    >
      {/* Question Button */}
      <button
        onClick={onToggle}
        className="w-full text-left px-5 py-4 flex items-center gap-4 transition-all duration-200"
      >
        {/* Icon */}
        <div className="flex-shrink-0 w-9 h-9 flex items-center justify-center text-foreground/70 dark:text-foreground/70">
          {icon}
        </div>

        {/* Question Text */}
        <div className="flex-1 pr-2">
          <h3 className="text-base font-medium text-foreground dark:text-foreground leading-snug">
            {faq.question}
          </h3>
        </div>

        {/* Chevron Icon */}
        <div
          className={`flex-shrink-0 transition-transform duration-300 text-foreground/50 dark:text-foreground/50 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <ChevronDown className="w-5 h-5" />
        </div>
      </button>

      {/* Answer - Animated */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: {
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1],
              },
              opacity: {
                duration: 0.25,
              },
            }}
            className="overflow-hidden"
          >
            <div className="pr-16 pb-4 pl-[4.3rem]">
              <motion.p
                initial={{ y: -5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.25, delay: 0.1 }}
                className="text-sm text-muted dark:text-muted leading-relaxed"
              >
                {faq.answer}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shine Effect on Hover */}
      <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
        <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-foreground/5 to-transparent"></div>
      </div>
    </div>
  );
}
