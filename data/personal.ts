/**
 * Personal info, bio, education, experience, skills — all sourced here.
 * Edit this file to update the Bio and Contact pages.
 */

// ─── Personal Info ───────────────────────────────────────────────────────────

export const personalInfo = {
  name: "Saurabh Nilesh Dusane",
  role: "AI/ML Engineer · Data Scientist · Full-Stack AI Builder",
  email: "sdusane1@asu.edu",
  github: "https://github.com/SaurabhDusane",
  linkedin: "https://www.linkedin.com/in/saurabh-dusane",
  medium: "https://medium.com/@saurndusane13",
  twitter: "https://x.com/SaurabhDusane",
  instagram: "", // TODO: add Instagram URL
  formspreeId: "xojapzeo",
  resumePath: "/Resume_Saurabh_Nilesh_Dusane.pdf",
  /** Image path/URL for the pinned hero cover banner on r/home. Falls back to orange gradient. */
  heroCover: undefined as string | undefined,
  /** Image path/URL for the profile card banner strip. Falls back to solid orange. */
  profileCover: undefined as string | undefined,
  /** Image path/URL for the profile avatar. Falls back to /headshot.png. */
  avatar: undefined as string | undefined,
  bio: [
    "Most engineers build models. <strong>I build systems that think</strong> — and then I put them in people's hands. Right now I've just completed my M.S. at Arizona State (4.0 GPA), but the classroom is only half the story; the rest happens at 2 AM debugging tokenizers, prototyping real-time pipelines, or mentoring the next wave of ML builders.",
    "What drives me? The <strong>moment messy, chaotic data becomes a decision</strong>. Whether it's a predictive engine crunching 50K+ patient records or a conversational agent that actually understands context — I care about outcomes, not just accuracy scores. That mindset has helped me ship systems that improved operational efficiency by <strong>18–30%</strong> across every role I've held.",
    "I'm equal parts researcher and builder: fluent in the math <em>and</em> the deploy script. If your problem lives at the intersection of <strong>deep learning, scalable infrastructure, and real business impact</strong> — let's talk.",
  ],
  coreCompetencies: [
    { label: "ML Pipeline Design", icon: "pipeline" },
    { label: "Deep Learning & NLP", icon: "brain" },
    { label: "Predictive Analytics (85%+ acc.)", icon: "chart" },
    { label: "AWS / GCP Deployment", icon: "cloud" },
    { label: "Real-time Data Systems", icon: "zap" },
    { label: "BI Dashboards & Storytelling", icon: "bar" },
    { label: "Agile Cross-functional Delivery", icon: "team" },
    { label: "Mentored 200+ Students", icon: "mentor" },
  ],
} as const;

// ─── Focus Domains (hero pill badges) ────────────────────────────────────────

export const focusDomains = [
  { label: "Machine Learning", icon: "brain" },
  { label: "Data Science", icon: "chart" },
  { label: "Conversational AI", icon: "bot" },
  { label: "Computer Vision", icon: "eye" },
] as const;

// ─── Education ───────────────────────────────────────────────────────────────

export interface Education {
  degree: string;
  sub?: string;
  school: string;
  period: string;
  gpa?: string;
  expected?: string;
  focus: string;
  coursework: string[];
  color: string;
}

export const education: Education[] = [
  {
    degree: "Master of Science in Computer Engineering (Computer Systems)",
    sub: "Graduate Studies",
    school: "Arizona State University",
    period: "Aug 2024 – May 2026",
    gpa: "4.00/4.00",
    focus: "Machine Learning Systems, Advanced Data Mining, Blockchain Architecture",
    coursework: [
      "EEE 511 Artificial Neural Computation",
      "CSE 511 Data Processing at Scale",
      "CSE 551 Foundations of Algorithms",
      "EEE 554 Probability & Random Processes",
      "CSE 573 Semantic Web Mining",
      "CSE 572 Data Mining",
      "CSE 540 Engineering Blockchain Applications",
      "EEE 598 Generative AI: Theory and Practice",
    ],
    color: "#a855f7",
  },
  {
    degree: "Bachelor of Engineering in AI & Data Science",
    sub: "Undergraduate Studies",
    school: "Savitribai Phule Pune University (SPPU)",
    period: "Jun 2020 – Jun 2024",
    gpa: "9.86/10.0",
    focus: "Comprehensive foundation in AI/ML with focus on practical applications and research",
    coursework: [
      "210252 Data Structure & Algorithm",
      "217530 Management Information System",
      "310253 Introduction to Artificial Intelligence",
      "370254C Cloud Computing",
      "377529 Basics of Data Science",
      "417522 Data Modeling & Visualization",
      "417524B Information Retrieval",
      "417530 Computational Intelligence",
      "417531 Distributed Computing",
      "417533B Business Intelligence",
      "417529B Entrepreneurial Business Administration & Startup Basics",
    ],
    color: "#6366f1",
  },
];

// ─── Skills ──────────────────────────────────────────────────────────────────

export interface SkillCategory {
  title: string;
  icon: string;
  color: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    icon: "terminal",
    color: "#6366f1",
    skills: ["Python", "SQL", "R", "C/C++", "Java"],
  },
  {
    title: "ML & AI",
    icon: "brain",
    color: "#a855f7",
    skills: ["PyTorch", "TensorFlow", "Scikit-learn", "XGBoost", "LightGBM", "Transformers", "RAG", "LangChain", "NER"],
  },
  {
    title: "Data & Pipelines",
    icon: "chart",
    color: "#14b8a6",
    skills: ["Pandas", "NumPy", "Apache Spark", "Airflow", "DBT"],
  },
  {
    title: "Cloud & DevOps",
    icon: "target",
    color: "#3b82f6",
    skills: ["AWS (S3, Redshift, SageMaker)", "GCP", "Azure", "Docker", "Git"],
  },
  {
    title: "Databases",
    icon: "database",
    color: "#ec4899",
    skills: ["PostgreSQL", "MongoDB", "Snowflake", "BigQuery", "SQL Server"],
  },
  {
    title: "Visualization",
    icon: "pieChart",
    color: "#7c3aed",
    skills: ["Power BI", "Tableau", "Streamlit", "Plotly"],
  },
];

/** De-emphasized secondary skills — web frameworks, kept off the main panel. */
export const alsoFamiliar: string[] = [".NET", "Angular", "Vue", "Kendo UI"];

export const proficiency = [
  { label: "Python / ML", pct: 95, gradient: "from-violet-500 to-fuchsia-500" },
  { label: "Deep Learning / NLP", pct: 88, gradient: "from-fuchsia-500 to-pink-500" },
  { label: "Data Analytics / BI", pct: 90, gradient: "from-teal-500 to-blue-500" },
  { label: "Cloud / DevOps", pct: 78, gradient: "from-blue-500 to-indigo-500" },
  { label: "Computer Vision", pct: 85, gradient: "from-amber-500 to-pink-500" },
] as const;

// ─── Experience ──────────────────────────────────────────────────────────────

export interface Experience {
  badge: string;
  badgeColor: "emerald" | "blue" | "amber" | "purple";
  title: string;
  company: string;
  duration: string;
  location: string;
  bullets: string[];
}

export const experiences: Experience[] = [
  {
    badge: "Current",
    badgeColor: "emerald",
    title: "Research Assistant",
    company: "Cognitive Information Processing Systems (CIPS) Lab, Arizona State University",
    duration: "Nov 2025 – Present",
    location: "Tempe, AZ",
    bullets: [
      "Built a fault-tolerant ingestion pipeline that makes 10,000+ SEC litigation releases queryable — an async worker pool with SQLite checkpoint/resume, resilient to WAF blocking, captchas, and rate limits",
      "Caught a silent zero-citation failure in the extraction layer that reported success while corrupting downstream data, then built a recovery layer to repair it",
      "Transformed unstructured filings into a 39-field knowledge graph linking legal actors, statutes, and enforcement outcomes for multi-hop queries",
      "Designed the NER entity-annotation schema and curated the labeled dataset",
    ],
  },
  {
    badge: "Internship",
    badgeColor: "blue",
    title: "Machine Learning Intern — Consumer Intelligence & Business Analytics",
    company: "Cognifront Pvt. Ltd. (Startup)",
    duration: "Dec 2023 – Jun 2024",
    location: "India",
    bullets: [
      "Unified and cleaned 100GB+ of multi-source retail data into an analytics-ready dataset",
      "Built classification models in Python/PyTorch reaching 95% accuracy for customer segmentation and targeted pricing",
      "Modeled 5,000+ logistics records; routing changes improved distribution efficiency by 18%",
      "Built the Streamlit dashboards the non-technical team relied on",
    ],
  },
  {
    badge: "Teaching",
    badgeColor: "amber",
    title: "Teaching Assistant",
    company: "Dept. of AI & Data Science, Savitribai Phule Pune University (SPPU)",
    duration: "Jul 2023 – Mar 2024",
    location: "India",
    bullets: [
      "Supported 200+ students across TensorFlow, PyTorch, and software-engineering coursework",
      "Advised capstone teams building projects in healthcare, agriculture, and retail",
    ],
  },
];

// ─── Leadership ──────────────────────────────────────────────────────────────

export interface Leadership {
  badge: string;
  badgeColor: "emerald" | "blue" | "amber" | "purple";
  title: string;
  company: string;
  duration: string;
  bullets: string[];
}

export const leadership: Leadership[] = [
  {
    badge: "Current",
    badgeColor: "emerald",
    title: "Grad Initiatives Team Volunteer",
    company: "International Students and Scholars Center (ISSC), Arizona State University",
    duration: "Oct 2024 – Present",
    bullets: [
      "Spearhead community integration programs supporting 500+ international graduate students",
    ],
  },
  {
    badge: "Founder",
    badgeColor: "purple",
    title: "Co-Founder & President",
    company: "Phoenix AI Club (University Organization)",
    duration: "Mar 2023 – Jan 2024",
    bullets: [
      "Scaled from 0 to 1,500+ members in 3 months—delivered 13+ technical workshops on ML, deep learning, and AI applications",
    ],
  },
];
