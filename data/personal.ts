/**
 * Personal info, bio, education, experience, skills — all sourced here.
 * Edit this file to update the Home, About and Contact pages.
 */

// ─── Personal Info ───────────────────────────────────────────────────────────

export const personalInfo = {
  name: "Saurabh Nilesh Dusane",
  shortName: "Saurabh Dusane",
  role: "AI/ML Engineer",
  /** One-line status shown under the intro. Set to "" to hide it. */
  availability: "Open to ML and AI engineering roles",
  email: "sdusane1@asu.edu",
  github: "https://github.com/SaurabhDusane",
  linkedin: "https://www.linkedin.com/in/saurabh-dusane",
  medium: "https://medium.com/@saurndusane13",
  twitter: "https://x.com/SaurabhDusane",
  formspreeId: "xojapzeo",
  resumePath: "/Resume_Saurabh_Nilesh_Dusane.pdf",
  /** Square avatar (256px WebP, cropped from /headshot.png). Falls back to /headshot.png. */
  avatar: "/images/profile/avatar.webp" as string | undefined,
  /** Home-page intro — the first thing a visitor reads. */
  tagline:
    "I build AI systems that keep working outside the notebook: agents written from scratch, and data pipelines that survive captchas, rate limits, and the failures that don’t announce themselves.",
  /** Short "now" line under the tagline. */
  now: "Right now I’m a research assistant at ASU’s CIPS Lab, building the data pipeline behind a legal-AI project. I finished my M.S. in Computer Engineering in 2026.",
  /** About-page bio. Plain paragraphs, no markup. */
  bio: [
    "I finished my M.S. in Computer Engineering at Arizona State University in 2026. Most of my work sits where data engineering meets ML: a fault-tolerant pipeline that turned 10,000+ SEC litigation releases into a queryable knowledge graph and, before that, customer-segmentation models and the dashboards an early-stage startup’s business team used every day.",
    "Lately I’ve been writing agents from first principles, without a framework, to see what the abstractions are really doing, then benchmarking them against LangGraph on the same tasks.",
  ],
} as const;

// ─── Education ───────────────────────────────────────────────────────────────

export interface Education {
  degree: string;
  school: string;
  period: string;
  gpa?: string;
  /** A few relevant courses — keep it to 3–4. */
  coursework: string[];
}

export const education: Education[] = [
  {
    degree: "M.S. in Computer Engineering (Computer Systems)",
    school: "Arizona State University",
    period: "Aug 2024 – May 2026",
    gpa: "4.00 / 4.00",
    coursework: [
      "Artificial Neural Computation",
      "Data Processing at Scale",
      "Data Mining",
      "Generative AI: Theory and Practice",
    ],
  },
  {
    degree: "B.E. in Artificial Intelligence & Data Science",
    school: "Savitribai Phule Pune University",
    period: "Jun 2020 – Jun 2024",
    gpa: "9.86 / 10",
    coursework: [
      "Computational Intelligence",
      "Distributed Computing",
      "Information Retrieval",
      "Cloud Computing",
    ],
  },
];

// ─── Skills ──────────────────────────────────────────────────────────────────

export interface SkillCategory {
  title: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    skills: ["Python", "SQL", "R", "C/C++", "Java"],
  },
  {
    title: "ML & AI",
    skills: ["PyTorch", "TensorFlow", "Scikit-learn", "XGBoost", "LightGBM", "Transformers", "RAG", "LangChain", "LangGraph", "NER"],
  },
  {
    title: "Data",
    skills: ["Pandas", "NumPy", "Apache Spark", "Airflow", "dbt", "PostgreSQL", "MongoDB", "Snowflake", "BigQuery"],
  },
  {
    title: "Cloud & tooling",
    skills: ["AWS (S3, Redshift, SageMaker)", "GCP", "Azure", "Docker", "Git", "SLURM"],
  },
  {
    title: "Visualization",
    skills: ["Power BI", "Tableau", "Streamlit", "Plotly"],
  },
];

/** Secondary skills, listed quietly under the main groups. */
export const alsoFamiliar: string[] = [".NET", "Angular", "Vue", "Kendo UI"];

// ─── Experience ──────────────────────────────────────────────────────────────

export interface Experience {
  title: string;
  /** One-line result shown on the About timeline before it's expanded. */
  headline: string;
  company: string;
  /** Short organization name for compact lists (home page). */
  companyShort: string;
  duration: string;
  location: string;
  bullets: string[];
}

export const experiences: Experience[] = [
  {
    title: "Research Assistant",
    headline: "Made 10,000+ SEC litigation releases queryable",
    company: "Cognitive Information Processing Systems (CIPS) Lab, Arizona State University",
    companyShort: "CIPS Lab, Arizona State University",
    duration: "Nov 2025 – Present",
    location: "Tempe, AZ",
    bullets: [
      "Built a fault-tolerant ingestion pipeline that made 10,000+ SEC litigation releases queryable, using an async worker pool with SQLite checkpoint/resume to get through WAF blocking, captchas, and rate limits",
      "Found a silent zero-citation bug in the extraction layer, which reported success while corrupting downstream data, and built a recovery layer to repair the affected records",
      "Turned unstructured filings into a 39-field knowledge graph linking legal actors, statutes, and enforcement outcomes, so multi-hop questions can be answered with a query",
      "Designed the NER annotation schema and curated the labeled dataset",
    ],
  },
  {
    title: "Machine Learning Intern",
    headline: "Built 95%-accurate segmentation models on 100GB+ of retail data",
    company: "Cognifront Pvt. Ltd. — Consumer Intelligence & Business Analytics",
    companyShort: "Cognifront (startup)",
    duration: "Dec 2023 – Jun 2024",
    location: "India",
    bullets: [
      "Cleaned and combined 100GB+ of retail data from several sources into one analytics-ready dataset",
      "Built PyTorch classification models for customer segmentation and targeted pricing, reaching 95% accuracy",
      "Modeled 5,000+ logistics records; the routing changes that came out of it improved distribution efficiency by 18%",
      "Built the Streamlit dashboards the non-technical team used day to day",
    ],
  },
  {
    title: "Teaching Assistant",
    headline: "Supported 200+ students in TensorFlow, PyTorch, and software engineering",
    company: "Dept. of AI & Data Science, Savitribai Phule Pune University",
    companyShort: "Savitribai Phule Pune University",
    duration: "Jul 2023 – Mar 2024",
    location: "India",
    bullets: [
      "Supported 200+ students in TensorFlow, PyTorch, and software engineering coursework",
      "Advised capstone teams on projects in healthcare, agriculture, and retail",
    ],
  },
];

// ─── Recognition ─────────────────────────────────────────────────────────────

export const awards: { title: string; detail: string; year: string }[] = [
  { title: "3rd place globally, AVEVA EcoTech Emerge", detail: "PolyHouse Automation — IoT crop monitoring with on-device ML", year: "2023" },
  { title: "2nd place, Smart India Hackathon", detail: "AI traffic optimization with GoogLeNet and fuzzy logic", year: "2022" },
];
