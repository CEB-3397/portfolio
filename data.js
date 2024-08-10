/*
 * ─────────────────────────────────────────────────────────────
 *  PORTFOLIO CONTENT — edit this file only.
 * ─────────────────────────────────────────────────────────────
 *  Inline highlight syntax (works in any text field):
 *    {blue|text}   {pink|text}   {green|text}   {amber|text}
 *  e.g. "Built a {blue|real-time} dashboard with {pink|React}"
 *
 *  Leave a field as "" or [] to hide it.
 */
window.PORTFOLIO = {
  name: "BOULEKCHAR CHIHAB-EDDINE",
  initials: "CEB",
  roles: [
    "Lead Web Engineer",
    "Technical Consultant",
    "Full-Stack Web Developer",
    "Frontend Developer",
  ],
  location: "Constantine, Algeria",
  availability: "Open to new opportunities", // "" to hide the badge
  // One file per theme (the button follows the current theme), a single
  // "resume.pdf" string for both, or "" to hide the Download CV button
  resumeUrl: { light: "resume-light.pdf", dark: "resume-dark.pdf" },

  // One-line hero tagline under the typed role ("" to hide)
  tagline: "Bridging {amber|product vision} and {green|production code} with precision.",

  // Bio, one sentence per line
  summary: [
    "I build {blue|resilient, high-impact web products} that solve real problems.",
    "Over the past {pink|six years}, I’ve worked closely with business owners and product leads to take complex, messy workflows and turn them into {blue|intuitive web applications} that just work.",
    "Whether it’s architecting a custom management portal from scratch, stitching together reliable backend systems, or obsessing over frontend feel and speed, I treat every project like a {green|living product}—built to scale, perform, and drive actual value from day one.",
  ],

  stats: [
    { value: "6+", label: "years in production" },
    { value: "24+", label: "custom builds shipped" },
    { value: "14", label: "retained clients" },
    { value: "98%", label: "repeat & referral rate" },
  ],

  // Shown in the hero "editor" card
  snippet: {
    stack: ["TypeScript", "React", "Node.js", "PostgreSQL", "AWS"],
    focus: "scalable systems",
    coffee: true,
  },

  experience: [
    {
      role: "Lead Web Engineer & Technical Consultant",
      company: "Independent Practice",
      location: "Remote / Global",
      period: "2024 — Present",
      bullets: [
        "Taking ambitious web platforms from early whiteboards to {green|battle-tested production}.",
        "I partner directly with founders and product teams to engineer {blue|end-to-end web applications}, custom management dashboards, and {blue|high-throughput APIs}.",
        "My focus is writing {pink|clean, scalable code} that turns complex operational bottlenecks into effortless, dependable digital products that businesses can run on.",
      ],
      stack: [],
    },
    {
      role: "Full-Stack Web Developer",
      company: "Contract Engagements",
      location: "Remote",
      period: "2022 — 2024",
      bullets: [
        "Turned product roadmaps into {green|living software}.",
        "Built responsive, {blue|high-performance web applications} and internal tools with a heavy focus on speed, user delight, and bulletproof reliability.",
        "Handled everything from {pink|secure payment flows} and {pink|user access controls} to {pink|database tuning} and {pink|real-time data syncs}, shipping early, iterating fast, and closing critical delivery milestones.",
      ],
      stack: [],
    },
    {
      role: "Frontend Developer",
      company: "Freelance Services",
      location: "Remote",
      period: "2020 — 2022",
      bullets: [
        "Breathed life into static designs, translating complex UI mockups into snappy, {blue|pixel-precise web interfaces} that felt natural on any screen.",
        "Obsessed over {pink|rendering speed}, {pink|responsive layouts}, and {pink|cross-browser consistency}, setting high standards for visual polish and clean frontend structure from day one.",
      ],
      stack: [],
    },
  ],

  // role: optional line under the title; live/code: URLs, or "" to hide
  projects: [
    {
      title: "Enterprise Operations & Logistics Portal",
      role: "Full-Stack Architect & Lead Developer",
      description:
        "Designed and built a centralized web portal to streamline day-to-day operations and cross-team workflows. Replaced fragmented spreadsheets with an interactive {blue|real-time dashboard}, granular {pink|role-based access}, and automated {pink|data synchronization}. The system cut down administrative bottlenecks dramatically and delivered a seamless interface tailored to high-frequency daily use.",
      stack: [],
      live: "",
      code: "",
      featured: true,
    },
    {
      title: "Commercial Transaction & Client Management Hub",
      role: "Full-Stack Web Developer",
      description:
        "Developed a dedicated client-facing platform focused on seamless onboarding, contract tracking, and {pink|secure payment processing}. Engineered {blue|custom API integrations} to bridge external payment providers with the core database, ensuring zero drop-off during checkout, ironclad transaction logging, and instantaneous record updates.",
      stack: [],
      live: "",
      code: "",
    },
    {
      title: "Custom Workflow & Analytics Tool",
      role: "Frontend & API Engineer",
      description:
        "A lightweight, {blue|high-performance dashboard} turning complex internal processes into a clean, single-screen workflow with instant {pink|data visualization}.",
      stack: [],
      live: "",
      code: "",
    },
  ],

  skills: [
    { group: "Languages", items: ["TypeScript", "JavaScript", "Python", "Go", "SQL"] },
    { group: "Frontend", items: ["React", "Next.js", "Vue", "Tailwind CSS", "Redux"] },
    { group: "Backend", items: ["Node.js", "Express", "NestJS", "GraphQL", "REST"] },
    { group: "Databases", items: ["PostgreSQL", "MySQL", "MongoDB", "Redis"] },
    { group: "Cloud & DevOps", items: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD"] },
    { group: "Practices", items: ["System Design", "TDD", "Microservices", "Agile", "Mentoring"] },
  ],

  education: [
    {
      degree: "Master’s Degree in {blue|Information and Communication Sciences and Technologies} (STIC)",
      school: "University of Constantine 2 – Abdelhamid Mehri",
      period: "2018 — 2020",
    },
    {
      degree: "Bachelor’s Degree in {blue|Information and Communication Technologies} (TIC)",
      school: "University of Constantine 2 – Abdelhamid Mehri",
      period: "2015 — 2018",
    },
  ],

  certifications: [], // e.g. ["AWS Certified Solutions Architect"]; [] hides the section

  // avatar: image URL/path, or "" to show initials
  testimonials: [
    {
      quote:
        "He took our messy functional requirements and turned them into a {blue|clean, rock-solid web app}. What stood out wasn’t just the quality of the code, but how painless the entire delivery process felt from day one.",
      name: "Lyes Faouzi Nemer",
      role: "Client",
      company: "Web Development",
      avatar: "",
    },
    {
      quote:
        "Fast, sharp, and ridiculously easy to work with. He caught bottlenecks we didn’t even realize we had and handed off a frontend that feels {blue|lightning quick}.",
      name: "Aouya Abdelmoumen",
      role: "Client",
      company: "Web Development",
      avatar: "",
    },
    {
      quote:
        "Built our platform right on schedule and handled the architecture with {blue|absolute precision}. A rare developer who truly cares about the end product.",
      name: "Teyar Raid Nasrellah",
      role: "Client",
      company: "Full-Stack Development",
      avatar: "",
    },
  ],

  contact: {
    email: "chihab.boulekchar@gmail.com",
    phone: "+213 552 24 05 86",
    // A string is shown and linked; { text, url: "" } is shown without a link; "" hides it
    linkedin: { text: "LinkedIn", url: "" },
    github: "github.com/ceb-3397",
  },
};
