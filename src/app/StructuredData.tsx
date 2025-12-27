export function StructuredData() {
  // Person Schema
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Aashir Siddiqui",
    alternateName: "Aashir",
    url: "https://aashirsiddiqui.vercel.app",
    email: "aashirsiddiqui217@gmail.com",
    telephone: "+92-370-1082668",
    sameAs: [
      "https://www.linkedin.com/in/aashir-siddiqui-88a676394",
      "https://github.com/Aashir-Siddiqui",
      "https://x.com/AashirSiddiquiX",
      "https://www.instagram.com/aashirsiddiqui_/?next=%2F&hl=en",
      "https://www.facebook.com/aashir.siddiqui.2025",
    ],
    jobTitle: "Full-Stack Developer",
    worksFor: {
      "@type": "Organization",
      name: "Freelance",
    },
    address: {
      "@type": "PostalAddress",
      postalCode: "75850",
      addressLocality: "Karachi",
      addressRegion: "Sindh",
      addressCountry: "PK",
    },
    knowsAbout: [
      "React",
      "Next.js",
      "Node.js",
      "TypeScript",
      "JavaScript",
      "Python",
      "MongoDB",
      "Express.js",
      "GraphQL",
      "Full-Stack Development",
      "Web Development",
      "AI Integration",
      "REST API",
      "Microservices",
      "UI/UX Design",
    ],
    knowsLanguage: ["en", "ur"],
    description:
      "Full-Stack Developer specializing in React, Next.js, Node.js, and AI integration. Building modern, scalable web applications with clean architecture.",
  };

  // WebSite Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Aashir Siddiqui Portfolio",
    url: "https://aashirsiddiqui.vercel.app",
    description:
      "Full-Stack Developer portfolio showcasing modern web applications, AI integrations, and creative engineering projects.",
    author: {
      "@type": "Person",
      name: "Aashir Siddiqui",
    },
    inLanguage: "en",
    copyrightYear: new Date().getFullYear(),
    copyrightHolder: {
      "@type": "Person",
      name: "Aashir Siddiqui",
    },
  };

  // ProfilePage Schema
  const profileSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateCreated: "2024-01-01T00:00:00+05:00",
    dateModified: new Date().toISOString(),
    mainEntity: personSchema,
  };

  // Combine schemas (removed breadcrumb for single-page site)
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [personSchema, websiteSchema, profileSchema],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
