"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  X,
  Send,
  Bot,
  User,
  Loader2,
  Sparkles,
  Minimize2,
  BotMessageSquare,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi! 👋 I'm Aashir's AI assistant. I can answer questions about his **skills**, **projects**, **experience**, and more. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [resetTime, setResetTime] = useState<Date | null>(null);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [remainingTime, setRemainingTime] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Constants
  const MESSAGE_LIMIT = 30;
  const COOLDOWN_MINUTES = 30;
  const STORAGE_KEY = "chatbot_rate_limit";

  // Load rate limit data from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      const resetDate = new Date(data.resetTime);
      const now = new Date();

      if (now < resetDate) {
        setMessageCount(data.count);
        setResetTime(resetDate);
        if (data.count >= MESSAGE_LIMIT) {
          setIsRateLimited(true);
        }
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Update remaining time every second
  useEffect(() => {
    if (!isRateLimited || !resetTime) return;

    const interval = setInterval(() => {
      const now = new Date();
      const diff = resetTime.getTime() - now.getTime();

      if (diff <= 0) {
        setIsRateLimited(false);
        setMessageCount(0);
        setResetTime(null);
        localStorage.removeItem(STORAGE_KEY);
        setRemainingTime("");
      } else {
        const minutes = Math.floor(diff / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);
        setRemainingTime(`${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isRateLimited, resetTime]);

  const saveRateLimitData = (count: number, reset: Date) => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        count,
        resetTime: reset.toISOString(),
      })
    );
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    if (isRateLimited) {
      const warningMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: `⚠️ You've reached the message limit (${MESSAGE_LIMIT} messages). Please try again in **${remainingTime}**.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, warningMessage]);
      return;
    }

    const newCount = messageCount + 1;
    setMessageCount(newCount);

    let currentResetTime = resetTime;
    if (!currentResetTime) {
      currentResetTime = new Date(Date.now() + COOLDOWN_MINUTES * 60 * 1000);
      setResetTime(currentResetTime);
    }

    saveRateLimitData(newCount, currentResetTime);

    if (newCount >= MESSAGE_LIMIT) {
      setIsRateLimited(true);
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage.content }),
      });

      const data = await response.json();

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          data.message || "Sorry, I couldn't process that. Please try again.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "Oops! Something went wrong. Please try again or contact Aashir directly.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickQuestions = [
    "What are your tech skills?",
    "Show me your projects",
    "What services do you offer?",
    "How do you build APIs?",
    "Tell me about your database experience",
    "What's your development process?",
    "How can I hire you?",
    "Do you offer consulting?",
  ];

  const handleQuickQuestion = (question: string) => {
    setInput(question);
    setTimeout(() => handleSend(), 100);
  };

  const parseMarkdown = (text: string) => {
    // Split by lines to handle lists and paragraphs
    const lines = text.split("\n");

    return lines.map((line, lineIndex) => {
      // Handle bullet points (• or *)
      if (line.trim().startsWith("•") || line.trim().startsWith("*")) {
        const content = line.trim().replace(/^[•*]\s*/, "");
        return (
          <div key={lineIndex} className="flex gap-2 my-1">
            <span className="text-primary mt-0.5">•</span>
            <span>{parseLine(content)}</span>
          </div>
        );
      }

      // Handle numbered lists
      if (/^\d+\.\s/.test(line.trim())) {
        const content = line.trim().replace(/^\d+\.\s*/, "");
        return (
          <div key={lineIndex} className="flex gap-2 my-1">
            <span className="text-primary font-semibold">
              {line.match(/^\d+/)?.[0]}.
            </span>
            <span>{parseLine(content)}</span>
          </div>
        );
      }

      // Regular paragraphs
      return line.trim() ? (
        <p key={lineIndex} className="my-1">
          {parseLine(line)}
        </p>
      ) : (
        <br key={lineIndex} />
      );
    });
  };

  const parseLine = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\)|https?:\/\/[^\s]+)/g);

    return parts.map((part, index) => {
      // Bold text **text**
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={index} className="font-semibold text-foreground">
            {part.slice(2, -2)}
          </strong>
        );
      }

      // Links [text](url)
      if (part.startsWith("[") && part.includes("](")) {
        const match = part.match(/\[(.*?)\]\((.*?)\)/);
        if (match) {
          return (
            <a
              key={index}
              href={match[2]}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {match[1]}
            </a>
          );
        }
      }

      // Direct URLs
      if (part.match(/^https?:\/\//)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline break-all"
          >
            {part}
          </a>
        );
      }

      return <span key={index}>{part}</span>;
    });
  };

  return (
    <>
      {/* Floating Chat Button - Mobile Optimized */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 group cursor-pointer"
          aria-label="Open AI chatbot"
        >
          {/* Animated Wavy Circles */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="absolute w-12 h-12 rounded-full border-2 border-primary/30 animate-ping"
              style={{ animationDuration: "1.5s" }}
            />
          </div>

          {/* Main Button with Animated Bot Icon */}
          <div className="relative w-14 h-14 bg-primary hover:bg-primary-hover text-background rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95">
            {/* Animated Bot Icon - Moves Up and Down */}
            <BotMessageSquare
              className="w-6 h-6 animate-bounce"
              style={{ animationDuration: "1.5s" }}
            />
          </div>
        </button>
      )}

      {/* Chat Window - Fully Responsive with Smooth Slide-Up Animation */}
      {isOpen && (
        <div
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[420px] max-w-[calc(100vw-32px)] bg-background/95 dark:bg-background/95 backdrop-blur-2xl border border-border/50 dark:border-border/50 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300"
          style={{
            height: isMinimized ? "80px" : "80vh",
            maxHeight: isMinimized ? "80px" : "calc(100vh - 32px)",
            animation: "smoothSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Smooth Slide-Up Animation */}
          <style jsx>{`
            @keyframes smoothSlideUp {
              0% {
                opacity: 0;
                transform: translateY(30px) scale(0.95);
              }
              100% {
                opacity: 1;
                transform: translateY(0) scale(1);
              }
            }
          `}</style>

          {/* Header - Improved Design */}
          <div className="relative bg-gradient-to-r from-primary/10 via-primary/5 to-transparent dark:from-primary/10 dark:via-primary/5 dark:to-transparent p-4 border-b border-border/30 dark:border-border/30 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Bot Avatar */}
                <div className="relative">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-lg">
                    <Bot className="w-6 h-6 text-background" />
                  </div>
                  {/* Status Indicator */}
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background shadow-md">
                    <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75" />
                  </div>
                </div>

                {/* Info */}
                <div>
                  <h3 className="text-base font-semibold text-foreground dark:text-foreground flex items-center gap-2">
                    AI Assistant
                    <Sparkles className="w-4 h-4 text-primary" />
                  </h3>
                  <p className="text-xs text-muted dark:text-muted">
                    {isLoading ? "Typing..." : "Online"}
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="w-9 h-9 rounded-lg hover:bg-surface dark:hover:bg-surface flex items-center justify-center transition-all cursor-pointer group"
                  aria-label={isMinimized ? "Maximize" : "Minimize"}
                >
                  <Minimize2 className="w-4 h-4 text-muted dark:text-muted group-hover:text-foreground" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-9 h-9 rounded-lg hover:bg-surface dark:hover:bg-surface flex items-center justify-center transition-all cursor-pointer group"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4 text-muted dark:text-muted group-hover:text-foreground" />
                </button>
              </div>
            </div>
          </div>

          {/* Messages Area - Mobile Optimized */}
          {!isMinimized && (
            <>
              <div
                className="flex-1 overflow-y-auto p-4 space-y-4"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "var(--primary) transparent",
                }}
              >
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {/* Bot Avatar */}
                    {message.role === "assistant" && (
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot className="w-4 h-4 text-primary" />
                      </div>
                    )}

                    {/* Message Bubble */}
                    <div
                      className={`max-w-[85%] sm:max-w-[75%] rounded-xl sm:rounded-2xl px-3 py-2 sm:px-4 sm:py-3 ${
                        message.role === "user"
                          ? "bg-primary text-background"
                          : "bg-surface/50 dark:bg-surface/50 text-foreground dark:text-foreground border border-border/30"
                      }`}
                    >
                      <div className="text-sm leading-relaxed">
                        {message.role === "assistant"
                          ? parseMarkdown(message.content)
                          : message.content}
                      </div>

                      <span
                        className={`text-[10px] mt-1.5 block ${
                          message.role === "user"
                            ? "text-background/60"
                            : "text-muted/60"
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    {/* User Avatar */}
                    {message.role === "user" && (
                      <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                    )}
                  </div>
                ))}

                {/* Loading */}
                {isLoading && (
                  <div className="flex gap-3 animate-in fade-in slide-in-from-bottom-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-primary animate-pulse" />
                    </div>
                    <div className="bg-surface/50 dark:bg-surface/50 border border-border/30 rounded-2xl px-4 py-3 flex items-center gap-2">
                      <div className="flex gap-1">
                        <div
                          className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        />
                        <div
                          className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        />
                        <div
                          className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        />
                      </div>
                      <span className="text-xs text-muted">Thinking...</span>
                    </div>
                  </div>
                )}

                {/* Quick Questions - Mobile Grid (2 columns) */}
                {messages.length === 1 && !isLoading && (
                  <div className="space-y-3 pt-2">
                    <p className="text-xs text-center text-muted font-medium">
                      Suggested questions
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {quickQuestions.map((question) => (
                        <button
                          key={question}
                          onClick={() => handleQuickQuestion(question)}
                          className="w-full text-left px-3 py-2.5 bg-surface/30 dark:bg-surface/30 hover:bg-surface/50 dark:hover:bg-surface/50 border border-border/30 rounded-xl text-xs text-foreground transition-all hover:border-primary/30 active:scale-95 cursor-pointer"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area - Improved Design */}
              <div className="p-4 border-t border-border/30 dark:border-border/30 bg-surface/20 dark:bg-surface/20">
                {/* Rate Limit Warning */}
                {isRateLimited && (
                  <div className="mb-3 p-3 bg-primary-dark/10 border border-muted/20 rounded-xl flex items-start gap-2">
                    <div className="text-primary-hover mt-0.5 text-sm">⚠️</div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-primary-hover dark:text-primary-hover">
                        Message limit reached ({MESSAGE_LIMIT} messages)
                      </p>
                      <p className="text-xs text-primary-dark dark:text-primary-dark mt-0.5">
                        Try again in {remainingTime}
                      </p>
                    </div>
                  </div>
                )}

                {/* Message Counter */}
                {!isRateLimited && messageCount > 0 && (
                  <div className="mb-2 flex items-center justify-between text-xs">
                    <span className="text-muted/60">
                      Messages: {messageCount}/{MESSAGE_LIMIT}
                    </span>
                    {messageCount >= MESSAGE_LIMIT - 10 && (
                      <span className="text-primary dark:text-primary font-medium">
                        {MESSAGE_LIMIT - messageCount} left
                      </span>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-center gap-2 mx-4 sm:mx-0">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={
                      isRateLimited ? "Limit reached..." : "Ask me anything..."
                    }
                    className="flex-1 px-2 py-2 sm:px-4 sm:py-3 bg-background dark:bg-background border border-border/50 dark:border-border/50 rounded-xl text-[12px] sm:text-sm text-foreground dark:text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading || isRateLimited}
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading || isRateLimited}
                    className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 bg-primary hover:bg-primary-hover text-background rounded-xl flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg cursor-pointer active:scale-95"
                    aria-label="Send message"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-center gap-1.5 mt-2">
                  <Sparkles className="w-3 h-3 text-primary/60" />
                  <p className="text-[10px] text-muted/60 text-center">
                    AI-powered •{" "}
                    {isRateLimited
                      ? "Rate limited"
                      : `${MESSAGE_LIMIT} msg/${COOLDOWN_MINUTES}min`}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
