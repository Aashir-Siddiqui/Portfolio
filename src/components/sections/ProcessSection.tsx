"use client";

import React from "react";
import { processData } from "@/lib/data";
import {
  ScrollTimeline,
  TimelineEvent,
} from "@/components/lightswind/scroll-timeline";
import {
  Lightbulb,
  Layout,
  Code,
  TestTube2,
  Rocket,
  Wrench,
} from "lucide-react";

// Icon mapping for each step
const iconMap: Record<number, React.ReactNode> = {
  1: <Lightbulb className="h-5 w-5 text-primary" />,
  2: <Layout className="h-5 w-5 text-primary" />,
  3: <Code className="h-5 w-5 text-primary" />,
  4: <TestTube2 className="h-5 w-5 text-primary" />,
  5: <Rocket className="h-5 w-5 text-primary" />,
  6: <Wrench className="h-5 w-5 text-primary" />,
};

export default function ProcessSection() {
  // Transform processData into TimelineEvent format
  const timelineEvents: TimelineEvent[] = processData.steps.map((step) => ({
    id: step.id.toString(),
    year: `Step ${step.id}`,
    title: step.title,
    description: step.description,
    icon: iconMap[step.id],
    color: "primary",
  }));

  return (
    <section
      id="process"
      className="min-h-screen py-20 bg-surface/30 dark:bg-surface/30"
    >
      <div className="max-w-7xl mx-auto px-4">
        <ScrollTimeline
          events={timelineEvents}
          title={processData.heading}
          subtitle={processData.subHeading}
          animationOrder="sequential"
          cardAlignment="alternating"
          progressIndicator={true}
          cardVariant="elevated"
          cardEffect="glow"
          parallaxIntensity={0.15}
          progressLineWidth={3}
          progressLineCap="round"
          dateFormat="badge"
          revealAnimation="slide"
          connectorStyle="line"
          perspective={false}
          smoothScroll={true}
          className="bg-transparent"
        />
      </div>
    </section>
  );
}
