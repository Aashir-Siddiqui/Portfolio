"use client";

import React, { useState } from "react";
import {
  Mail,
  Send,
  Linkedin,
  Instagram,
  Facebook,
  Github,
  Twitter,
  User,
  MessageSquare,
  FileText,
  Loader2,
} from "lucide-react";
import ShinyText from "@/components/lightswind/shiny-text";
import AnimatedButton from "@/components/AnimatedButton";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "motion/react";

// Social Links Data
const socialLinks = [
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/aashir-siddiqui-88a676394/",
    color: "hover:text-[#0077B5]",
    bgColor: "hover:bg-[#0077B5]/10",
  },
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com/Aashir-Siddiqui",
    color: "hover:text-foreground",
    bgColor: "hover:bg-foreground/10",
  },
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://www.instagram.com/aashirsiddiqui_/?next=%2F&hl=en",
    color: "hover:text-[#E4405F]",
    bgColor: "hover:bg-[#E4405F]/10",
  },
  {
    name: "Twitter/X",
    icon: Twitter,
    url: "https://x.com/AashirSiddiquiX",
    color: "hover:text-[#1DA1F2]",
    bgColor: "hover:bg-[#1DA1F2]/10",
  },
  {
    name: "Facebook",
    icon: Facebook,
    url: "https://www.facebook.com/aashir.siddiqui.2025",
    color: "hover:text-[#1877F2]",
    bgColor: "hover:bg-[#1877F2]/10",
  },
  {
    name: "Email",
    icon: Mail,
    url: "mailto:aashirsiddiqui217@gmail.com",
    color: "hover:text-primary",
    bgColor: "hover:bg-primary/10",
  },
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle WhatsApp contact
  const handleWhatsApp = () => {
    const phoneNumber = "923362746653";
    const message = "Hi Aashir! I'd like to discuss a project with you.";
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappURL, "_blank");
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Show loading toast
    const loadingToast = toast.loading("Sending your message...");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          from_name: "Portfolio Contact Form",
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Dismiss loading toast
        toast.dismiss(loadingToast);

        // Show success toast
        toast.success("Message sent successfully! I'll get back to you soon.", {
          duration: 5000,
          position: "top-center",
          style: {
            background: "#10b981",
            color: "#fff",
            padding: "16px",
            borderRadius: "12px",
            fontSize: "14px",
            fontWeight: "500",
          },
          icon: "✅",
        });

        // Reset form
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        // Dismiss loading toast
        toast.dismiss(loadingToast);

        // Show error toast
        toast.error(result.message || "Something went wrong!", {
          duration: 5000,
          position: "top-center",
          style: {
            background: "#ef4444",
            color: "#fff",
            padding: "16px",
            borderRadius: "12px",
            fontSize: "14px",
            fontWeight: "500",
          },
          icon: "❌",
        });
      }
    } catch (error) {
      // Dismiss loading toast
      toast.dismiss(loadingToast);

      // Show error toast
      toast.error("Failed to send message. Please try again.", {
        duration: 5000,
        position: "top-center",
        style: {
          background: "#ef4444",
          color: "#fff",
          padding: "16px",
          borderRadius: "12px",
          fontSize: "14px",
          fontWeight: "500",
        },
        icon: "❌",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Toast Container */}
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 4000,
          style: {
            borderRadius: "12px",
            fontSize: "14px",
          },
        }}
      />

      <section
        id="contact"
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
                  Let's Connect
                </ShinyText>
              </div>
            </div>

            {/* Heading */}
            <h2
              className="text-4xl sm:text-5xl md:text-6xl font-semibold text-foreground dark:text-foreground leading-normal mb-6"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Get in Touch
            </h2>

            {/* Subheading */}
            <p className="text-base sm:text-lg md:text-xl text-muted dark:text-muted max-w-2xl mx-auto">
              Have a project in mind or want to collaborate? Feel free to reach
              out. I'd love to hear from you!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Side - Contact Form */}
            <div className="order-2 lg:order-1">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-foreground dark:text-foreground mb-2"
                  >
                    Your Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted dark:text-muted" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Xavier"
                      className="w-full pl-12 pr-4 py-3.5 bg-surface/30 dark:bg-surface/30 border border-border/30 dark:border-border/30 rounded-xl text-foreground dark:text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground dark:text-foreground mb-2"
                  >
                    Your Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted dark:text-muted" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="xavier@example.com"
                      className="w-full pl-12 pr-4 py-3.5 bg-surface/30 dark:bg-surface/30 border border-border/30 dark:border-border/30 rounded-xl text-foreground dark:text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Subject Field */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-foreground dark:text-foreground mb-2"
                  >
                    Subject
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted dark:text-muted" />
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="Project Inquiry"
                      className="w-full pl-12 pr-4 py-3.5 bg-surface/30 dark:bg-surface/30 border border-border/30 dark:border-border/30 rounded-xl text-foreground dark:text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-foreground dark:text-foreground mb-2"
                  >
                    Message
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-muted dark:text-muted" />
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell me about your project..."
                      className="w-full pl-12 pr-4 py-3.5 bg-surface/30 dark:bg-surface/30 border border-border/30 dark:border-border/30 rounded-xl text-foreground dark:text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 resize-none"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-8 py-4 bg-primary hover:bg-primary-hover text-background dark:text-background rounded-xl font-semibold transition-all duration-300 transform disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <motion.div
                        animate={{
                          x: [0, 3, 0],
                          y: [0, -3, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <Send className="w-5 h-5" />
                      </motion.div>
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Right Side - Social Links & CTA */}
            <div className="order-1 lg:order-2 space-y-8">
              {/* Get in Touch via WhatsApp */}
              <div className="bg-surface/30 dark:bg-surface/30 backdrop-blur-xl border border-border/30 dark:border-border/30 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-foreground dark:text-foreground mb-4">
                  Quick Response?
                </h3>
                <p className="text-muted dark:text-muted mb-6">
                  For urgent inquiries or quick questions, reach out directly
                  via WhatsApp.
                </p>
                <AnimatedButton
                  label="Get in Touch on WhatsApp"
                  className="text-[12px] sm:text-lg"
                  icon={MessageSquare}
                  iconSize={18}
                  size="lg"
                  fullWidth
                  onClick={handleWhatsApp}
                />
              </div>

              {/* Social Links */}
              <div className="bg-surface/30 dark:bg-surface/30 backdrop-blur-xl border border-border/30 dark:border-border/30 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-foreground dark:text-foreground mb-4">
                  Connect with Me
                </h3>
                <p className="text-muted dark:text-muted mb-6">
                  Follow me on social media or check out my work on GitHub.
                </p>

                <div className="grid grid-cols-3 gap-4">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <Link
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group relative flex items-center justify-center p-4 bg-surface/50 dark:bg-surface/50 border border-border/30 dark:border-border/30 rounded-xl transition-all duration-300 ${social.bgColor} ${social.color}`}
                        title={social.name}
                      >
                        <Icon className="w-6 h-6 text-foreground dark:text-foreground transition-colors duration-300" />

                        {/* Tooltip */}
                        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-foreground dark:bg-foreground text-background dark:text-background text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-[999]">
                          {social.name}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-surface/30 dark:bg-surface/30 backdrop-blur-xl border border-border/30 dark:border-border/30 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-foreground dark:text-foreground mb-4">
                  📧 Direct Email
                </h3>
                <Link
                  href="mailto:aashirsiddiqui217@gmail.com"
                  className="text-primary dark:text-primary hover:underline font-medium"
                >
                  aashirsiddiqui217@gmail.com
                </Link>

                <h3 className="text-xl font-bold text-foreground dark:text-foreground mb-4 mt-6">
                  ⏰ Response Time
                </h3>
                <p className="text-muted dark:text-muted text-sm">
                  I typically respond within 24-48 hours during business days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
