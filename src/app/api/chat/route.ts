// src/app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// COMPLETE PORTFOLIO CONTEXT - All information from data.ts
const PORTFOLIO_CONTEXT = `
You are Aashir Siddiqui's AI assistant. Provide accurate, helpful, and concise responses.

=== PERSONAL INFORMATION ===
Full Name: Aashir Siddiqui
Role: Full-Stack Developer & Creative Engineer
Location: Karachi, Pakistan
Status: Available for freelance projects and full-time opportunities
Portfolio: https://aashirsiddiqui.vercel.app

=== CONTACT INFORMATION ===
Email: aashirsiddiqui217@gmail.com
Phone/WhatsApp: +92 336 2746653
LinkedIn: https://linkedin.com/in/aashir-siddiqui-88a676394
GitHub: https://github.com/Aashir-Siddiqui
Portfolio: https://aashirsiddiqui.vercel.app

=== ABOUT AASHIR ===
Aashir is a Full-Stack Developer focused on building fast, scalable, and production-ready web applications. He has hands-on experience across the complete product lifecycle from designing intuitive, responsive user interfaces to architecting robust backend systems and APIs.

Tagline: Building scalable, secure, and maintainable full-stack solutions using modern technologies.

Experience: 1+ year of hands-on development experience building production-ready applications.

=== TECHNICAL SKILLS ===

Core Specializations:
• Full-Stack Web Development
• Frontend Development (React, Next.js, Tailwind CSS, shadcn/ui)
• Backend Development (Node.js, Express, FastAPI)
• REST & GraphQL APIs (Apollo Server)
• Database Design & Management (MongoDB, MySQL, PostgreSQL)
• ORM & Query Builders (Prisma, Mongoose, Sequelize)
• Cloud & Backend Services (Firebase, Supabase, Appwrite)
• Caching, Queues & Messaging (Redis, Kafka, BullMQ)
• Containerization & Deployment (Docker, Vercel, Netlify)
• UI/UX & Visual Design (Adobe Illustrator, Canva)

Technologies & Tools:
Frontend: React, Next.js, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS, Bootstrap, shadcn/ui, Vite
Backend: Node.js, Express.js, FastAPI, Python
Databases: MongoDB, MySQL, PostgreSQL
ORMs: Prisma, Mongoose, Sequelize
APIs: GraphQL, Apollo Server, REST APIs, Axios
Authentication: JWT
Cloud/BaaS: Firebase, Supabase, Appwrite
DevOps: Docker, Redis, Kafka, BullMQ
Deployment: Vercel, Netlify
Design: Adobe Illustrator, Canva
Tools: Git, GitHub, Postman, npm, pnpm
Other: React Router, Redux, Zustand, Socket.IO, Twilio

=== SERVICES OFFERED ===

1. Frontend Development
   • React.js & Next.js applications
   • TypeScript-based scalable UI
   • Tailwind CSS, Bootstrap & shadcn/ui
   • SEO-friendly and accessible UI
   • Pixel-perfect and responsive layouts

2. Backend Development
   • Node.js & Express.js APIs
   • Python & FastAPI backend services
   • REST & GraphQL APIs (Apollo Server)
   • Authentication & authorization
   • Clean architecture & best practices

3. Database & Data Management
   • MongoDB, MySQL & PostgreSQL
   • ORMs: Prisma, Mongoose, Sequelize
   • Schema design & migrations
   • Performance optimization
   • Data security & integrity

4. Cloud & Backend Services
   • Firebase, Supabase & Appwrite
   • Authentication & storage services
   • Serverless & managed backends
   • Real-time databases
   • Cloud-based scaling

5. DevOps & Deployment
   • Docker containerization
   • Deployment on Vercel & Netlify
   • Redis caching strategies
   • Kafka & BullMQ for background jobs
   • Environment & CI/CD setup

6. UI/UX & Creative Design
   • Adobe Illustrator & Canva
   • Modern UI layouts
   • Consistent design systems
   • User-centered design approach
   • Brand-focused visuals

=== FEATURED PROJECTS ===

1. MediVault AI (AI-Powered Healthcare Platform)
   Description: AI-driven healthcare platform for secure medical record management, document processing, and insights extraction using OCR and generative AI.
   Tech: React 19, Redux Toolkit, Tailwind CSS, Framer Motion, Node.js, Express.js, MongoDB, JWT, Google Generative AI, Tesseract.js, Cloudinary
   Type: Full-Stack + AI
   Live: LinkedIn Post
   GitHub: https://github.com/Aashir-Siddiqui/MediVaultAI

2. Flash Chat (Real-Time Chat Application)
   Description: Real-time messaging app with instant messaging, authentication, media sharing, and live updates using WebSockets.
   Tech: React, Tailwind CSS, Radix UI, Zustand, Socket.IO, Node.js, Express.js, MongoDB, JWT
   Type: Full-Stack
   Live: LinkedIn Post
   GitHub: https://github.com/Aashir-Siddiqui/Flash-Chat

3. Agency AI (AI Agency Landing Page)
   Description: Modern landing page focused on performance, smooth animations, and conversion-driven UI design.
   Tech: React, Tailwind CSS, Motion, Vite, Aceternity UI
   Type: Frontend
   Live: https://agency-ai-aashir.netlify.app/
   GitHub: https://github.com/Aashir-Siddiqui/Agency-Ai

4. Atriom Technologies (Corporate Website)
   Description: Premium corporate website with immersive animations, 3D visuals, and interactive experiences.
   Tech: Next.js, React, Three.js, React Three Fiber, GSAP, Framer Motion, Tailwind CSS
   Type: Frontend / UI Engineering
   Live: https://atriom-technologies.vercel.app/
   GitHub: https://github.com/Aashir-Siddiqui/Atriom-Technologies

5. Currency Converter (Finance Utility)
   Description: Fast and intuitive currency converter with real-time exchange rates and animated UI.
   Tech: React, Tailwind CSS, Radix UI, Framer Motion, Axios, API Integration
   Type: Frontend
   Live: https://currencyconverter-aashir.netlify.app/
   GitHub: https://github.com/Aashir-Siddiqui/Currency-Converter

6. Todo Master (Task Management)
   Description: Full-stack task management app with authentication, protected routes, and persistent storage.
   Tech: Next.js, React, Tailwind CSS, MongoDB, JWT, CRUD Operations
   Type: Full-Stack
   Live: https://todomaster-aashir.vercel.app/
   GitHub: https://github.com/Aashir-Siddiqui/Todo-Master

=== DEVELOPMENT PROCESS ===

1. Discovery & Requirements
   Understanding business goals, target audience, and technical requirements to define clear project scope.

2. Planning & System Design
   Creating wireframes, user flows, and selecting the right tech stack for scalable architecture.

3. Development
   Building frontend and backend features using modern frameworks with clean, maintainable code.

4. Testing & Quality Assurance
   Thorough testing to ensure performance, security, and bug-free user experience.

5. Deployment
   Deploying applications to production with optimized configurations and cloud platforms.

6. Maintenance & Support
   Providing ongoing updates, improvements, and support to keep the product reliable and scalable.

=== FREQUENTLY ASKED QUESTIONS ===

Q1: What type of projects do you work on?
A: I work on full-stack web applications, SaaS platforms, APIs, dashboards, and custom software solutions using modern technologies.

Q2: Do you provide complete end-to-end development?
A: Yes. I handle the complete development lifecycle — from planning and design to development, deployment, and post-launch support.

Q3: Which technologies do you specialize in?
A: I specialize in React, Next.js, TypeScript, Node.js, Python, FastAPI, GraphQL, and modern relational and NoSQL databases.

Q4: Can you build scalable and production-ready systems?
A: Absolutely. I follow clean architecture, scalable system design, and best practices to ensure applications are secure, performant, and future-proof.

Q5: Do you offer API development and integrations?
A: Yes. I build and integrate REST and GraphQL APIs, including authentication, third-party services, and complex backend logic.

Q6: How do you ensure code quality?
A: I focus on clean, maintainable code, proper testing, and performance optimization to deliver reliable and high-quality solutions.

Q7: Do you deploy and maintain projects?
A: Yes. I deploy applications on platforms like Vercel and Netlify, and provide ongoing maintenance, updates, and technical support.

Q8: Are you available for long-term or remote work?
A: Yes. I am open to long-term collaborations, remote projects, and ongoing development partnerships.

=== PRICING & CHARGES ===
Aashir's pricing is project-based and depends on:
• Project scope and complexity
• Timeline and deadline
• Required features and integrations
• Technology stack
• Ongoing maintenance needs

For accurate pricing, contact Aashir for a free consultation and custom quote.

=== CV/RESUME DOWNLOAD ===
CV Download: Available on the portfolio website - click "Download CV" button in the hero section
Alternative: Contact Aashir directly via email or LinkedIn to request his detailed CV/resume

=== AVAILABILITY ===
Current Status: Available for new projects
Work Types: Freelance projects, Full-time positions, Contract work, Remote opportunities
Response Time: Typically responds within 24 hours
Start Date: Immediate start available
`;

// Fallback responses for portfolio-related questions
const FALLBACK_RESPONSES = {
  contact: `📧 **Contact Aashir:**

**Email:** aashirsiddiqui217@gmail.com
**Phone/WhatsApp:** +92 336 2746653
**LinkedIn:** linkedin.com/in/aashir-siddiqui-88a676394
**GitHub:** github.com/Aashir-Siddiqui

Feel free to reach out for project inquiries!`,

  phone: `📱 You can reach Aashir at:
**+92 336 2746653** (WhatsApp available)

Or email at: **aashirsiddiqui217@gmail.com**`,

  email: `📧 Email Aashir at:
**aashirsiddiqui217@gmail.com**

He typically responds within 24 hours!`,

  cv: `📄 **Download CV:**

Visit Aashir's portfolio at **aashirsiddiqui.vercel.app** and click the "Download CV" button in the hero section.

Or contact him directly via email to request his detailed resume!`,

  skills: `💻 **Aashir's Core Skills:**

• **Frontend:** React, Next.js, TypeScript, Tailwind CSS
• **Backend:** Node.js, Express.js, Python, FastAPI
• **Databases:** MongoDB, MySQL, PostgreSQL
• **APIs:** REST APIs, GraphQL, Apollo Server
• **DevOps:** Docker, Redis, Kafka, Vercel
• **Design:** Adobe Illustrator, Canva

He builds production-ready full-stack applications!`,

  services: `🚀 **Services Offered:**

• **Frontend Development** - React, Next.js, TypeScript
• **Backend Development** - Node.js, Python, APIs
• **Database Management** - MongoDB, PostgreSQL, MySQL
• **Cloud Services** - Firebase, Supabase, Appwrite
• **DevOps** - Docker, Redis, Kafka deployment
• **UI/UX Design** - Modern, responsive interfaces

Contact for a free consultation!`,

  projects: `🎨 **Featured Projects:**

• **MediVault AI** - AI healthcare platform (React, Node.js, MongoDB)
• **Flash Chat** - Real-time messaging app (Socket.IO, Express)
• **Agency AI** - Modern landing page
• **Atriom Technologies** - 3D corporate website (Three.js)
• **Currency Converter** - Real-time exchange rates
• **Todo Master** - Full-stack task manager

Visit his portfolio or GitHub for more details!`,

  pricing: `💰 **Pricing:**

Aashir's pricing is **project-based** and depends on:
• Project scope & complexity
• Timeline & features
• Technology stack
• Maintenance needs

📧 Contact him for a **free consultation** and custom quote at:
**aashirsiddiqui217@gmail.com**`,

  about: `👋 **About Aashir:**

Aashir is a **Full-Stack Developer** with **1+ year** of experience building scalable, production-ready web applications.

He specializes in:
• React, Next.js, TypeScript
• Node.js, Express, Python
• MongoDB, PostgreSQL
• GraphQL, REST APIs
• Docker, Redis, Kafka

He's available for freelance and full-time opportunities!`,

  availability: `✅ **Availability:**

Aashir is currently **available** for:
• Freelance projects
• Full-time positions
• Contract work
• Remote opportunities

**Immediate start available!**

Contact: **aashirsiddiqui217@gmail.com**`,

  process: `🔧 **Development Process:**

1. **Discovery** - Understanding your goals and requirements
2. **Planning** - Wireframes, system design, tech stack selection
3. **Development** - Building with clean, maintainable code
4. **Testing** - Ensuring performance and security
5. **Deployment** - Launching on cloud platforms
6. **Maintenance** - Ongoing support and updates`,

  experience: `Aashir has **1+ year** of hands-on development experience.

He's built:
• 10+ production applications
• AI-powered platforms (MediVault AI)
• Real-time chat systems (Flash Chat)
• Corporate websites with 3D visuals
• E-commerce and SaaS platforms

He's skilled in full-stack development, AI integration, and modern UI engineering.`,

  technologies: `Aashir works with modern technologies:

• **Frontend:** React, Next.js, TypeScript, Tailwind CSS
• **Backend:** Node.js, Express.js, Python, FastAPI
• **Databases:** MongoDB, MySQL, PostgreSQL
• **APIs:** GraphQL, REST APIs, Apollo Server
• **DevOps:** Docker, Redis, Kafka, Vercel
• **Design:** Adobe Illustrator, Canva

He stays updated with the latest tech trends!`,

  github: `Aashir's GitHub profile:
**🔗 github.com/Aashir-Siddiqui**

You can find his open-source projects, code samples, and contributions there. Check out MediVault AI, Flash Chat, and more!`,

  linkedin: `Connect with Aashir on LinkedIn:
**🔗 linkedin.com/in/aashir-siddiqui-88a676394**

You can view his professional experience, connect for networking, or send a message for project inquiries!`,

  default: `Hi! I'm Aashir's AI assistant. I can help you with questions about:

• **Aashir's Skills** - Technologies & expertise
• **Projects** - Portfolio & case studies
• **Services** - What he offers
• **Contact** - Email, phone, LinkedIn
• **Pricing** - Project rates
• **General Questions** - Anything else!

What would you like to know?`,
};

// Enhanced keyword matching for portfolio questions
function getFallbackResponseForPortfolio(message: string): string {
  const msg = message.toLowerCase();

  // Contact related
  if (msg.includes("contact") || msg.includes("reach"))
    return FALLBACK_RESPONSES.contact;
  if (
    msg.includes("phone") ||
    msg.includes("number") ||
    msg.includes("whatsapp") ||
    msg.includes("call")
  )
    return FALLBACK_RESPONSES.phone;
  if (msg.includes("email") || msg.includes("gmail") || msg.includes("mail"))
    return FALLBACK_RESPONSES.email;

  // CV/Resume
  if (msg.includes("cv") || msg.includes("resume") || msg.includes("download"))
    return FALLBACK_RESPONSES.cv;

  // Skills & Tech
  if (
    msg.includes("skill") ||
    msg.includes("technology") ||
    msg.includes("tech stack")
  )
    return FALLBACK_RESPONSES.skills;
  if (
    msg.includes("technologies") ||
    msg.includes("tools") ||
    msg.includes("frameworks")
  )
    return FALLBACK_RESPONSES.technologies;

  // Services
  if (
    msg.includes("service") ||
    msg.includes("offer") ||
    msg.includes("provide")
  )
    return FALLBACK_RESPONSES.services;

  // Projects
  if (
    msg.includes("project") ||
    msg.includes("work") ||
    msg.includes("portfolio")
  )
    return FALLBACK_RESPONSES.projects;

  // Pricing
  if (
    msg.includes("price") ||
    msg.includes("cost") ||
    msg.includes("charge") ||
    msg.includes("rate") ||
    msg.includes("fee")
  )
    return FALLBACK_RESPONSES.pricing;

  // About
  if (
    msg.includes("about") ||
    msg.includes("who is") ||
    msg.includes("tell me about")
  )
    return FALLBACK_RESPONSES.about;

  // Availability
  if (
    msg.includes("available") ||
    msg.includes("hire") ||
    msg.includes("hiring") ||
    msg.includes("freelance")
  )
    return FALLBACK_RESPONSES.availability;

  // Process
  if (
    msg.includes("process") ||
    msg.includes("workflow") ||
    msg.includes("how do you work")
  )
    return FALLBACK_RESPONSES.process;

  // Experience
  if (
    msg.includes("experience") ||
    msg.includes("years") ||
    msg.includes("background")
  )
    return FALLBACK_RESPONSES.experience;

  // Social
  if (msg.includes("github")) return FALLBACK_RESPONSES.github;
  if (msg.includes("linkedin")) return FALLBACK_RESPONSES.linkedin;

  return "";
}

// Check if question is about Aashir's portfolio
function isPortfolioQuestion(message: string): boolean {
  const portfolioKeywords = [
    "aashir",
    "your",
    "you",
    "portfolio",
    "project",
    "skill",
    "experience",
    "contact",
    "email",
    "phone",
    "service",
    "price",
    "cv",
    "resume",
    "hire",
    "available",
  ];

  const msg = message.toLowerCase();
  return portfolioKeywords.some((keyword) => msg.includes(keyword));
}

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message?.trim()) {
      return NextResponse.json({ message: "Please enter a message!" });
    }

    const userMessage = message.trim();
    if (userMessage.length > 500) {
      return NextResponse.json({
        message: "Please keep your message under 500 characters.",
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // Check if it's a portfolio question or general question (before API call)
    const isAboutPortfolio = isPortfolioQuestion(userMessage);

    if (!apiKey) {
      console.log("⚠️ No API key, using fallback");
      const fallback = getFallbackResponseForPortfolio(userMessage);
      return NextResponse.json({
        message: fallback || FALLBACK_RESPONSES.default,
      });
    }

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 400, // Slightly longer for general questions
        },
      });

      console.log(
        `📝 Question Type: ${isAboutPortfolio ? "Portfolio" : "General"}`
      );
      console.log(`💬 User Message: ${userMessage}`);

      let prompt = "";

      if (isAboutPortfolio) {
        // Portfolio-related question
        prompt = `${PORTFOLIO_CONTEXT}

User Question: ${userMessage}

Instructions: 
- Provide accurate, concise responses (2-4 sentences maximum)
- Use markdown for formatting (bold, bullets, etc.)
- Be friendly and professional
- Provide specific information from the context
- For contact info, always provide email, phone, LinkedIn
- For pricing, explain it's project-based and suggest consultation
- For CV, mention download button on website
- Never make up information
- Keep answers SHORT and to the point

Response:`;
      } else {
        // General question (like "what is Next.js")
        prompt = `You are a helpful and knowledgeable AI assistant. Answer the user's question clearly and concisely.

User Question: ${userMessage}

Instructions:
- Provide SHORT, accurate answers (maximum 5-6 sentences)
- Be friendly, helpful, and conversational
- Use simple language that's easy to understand
- If the question is technical, give a brief but complete explanation
- Use markdown formatting (bold, bullets) when it makes the answer clearer
- Don't be too verbose - be concise but informative
- Answer naturally like a helpful assistant

Response:`;
      }

      const result = await Promise.race([
        model.generateContent(prompt),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Timeout")), 10000)
        ),
      ]);

      const response = await (result as any).response;
      const text = response.text();

      if (!text?.trim()) {
        throw new Error("Empty response");
      }

      console.log("✅ AI response successful");
      return NextResponse.json({ message: text.trim() });
    } catch (aiError: any) {
      console.error("AI Error:", aiError.message);
      console.log("⚠️ Using fallback response");

      // Only use portfolio fallback for portfolio questions
      if (isAboutPortfolio) {
        const fallback = getFallbackResponseForPortfolio(userMessage);
        if (fallback) {
          return NextResponse.json({ message: fallback });
        }
      }

      // General fallback for all questions
      return NextResponse.json({
        message:
          "Sorry, I'm having trouble connecting right now. Please try again in a moment! 🔄",
      });
    }
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ message: FALLBACK_RESPONSES.default });
  }
}
