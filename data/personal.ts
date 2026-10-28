/**
 * Personal info, bio, education, experience, skills — all sourced here.
 * Edit this file to update the Home, About and Contact pages.
 */

// ─── Personal Info ───────────────────────────────────────────────────────────

export const personalInfo = {
  name: "Saurabh Nilesh Dusane",
  shortName: "Saurabh Dusane",
  role: "AI/ML Engineer",
  location: "Tempe, Arizona",
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
    "I build AI systems that hold up outside the notebook: agents written from scratch, and data pipelines that survive captchas, rate limits, and the failures that don’t announce themselves.",
  /** Short "now" line under the tagline. */
  now: "Research Assistant at ASU’s CIPS Lab. M.S. in Computer Engineering, Arizona State University (2026).",
  /** About-page bio. Plain paragraphs, no markup. */
  bio: [
    "I’m an ML engineer who enjoys the unglamorous half of AI: getting messy data into shape, and building systems that keep working when their inputs don’t cooperate. I recently finished my M.S. in Computer Engineering at Arizona State University with a 4.0 GPA.",
    "At ASU’s CIPS Lab I work on the data side of a legal-AI research project. I built a fault-tolerant pipeline that turned 10,000+ SEC litigation releases into a queryable knowledge graph, and caught a silent extraction failure that was reporting success while corrupting the data downstream. Before that, I interned at Cognifront, an early-stage startup, building customer-segmentation models and the dashboards the business team used day to day.",
    "Lately I’ve been writing agents from first principles, without a framework, to understand what the abstractions actually do, then comparing that against LangGraph on identical tasks. I’m looking for ML and AI engineering roles where that kind of care about reliability matters.",
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
    company: "Cognitive Information Processing Systems (CIPS) Lab, Arizona State University",
    companyShort: "CIPS Lab, Arizona State University",
    duration: "Nov 2025 – Present",
    location: "Tempe, AZ",
    bullets: [
      "Built a fault-tolerant ingestion pipeline that makes 10,000+ SEC litigation releases queryable: an async worker pool with SQLite checkpoint/resume, resilient to WAF blocking, captchas, and rate limits",
      "Caught a silent zero-citation failure in the extraction layer that reported success while corrupting downstream data, then built a recovery layer to repair it",
      "Transformed unstructured filings into a 39-field knowledge graph linking legal actors, statutes, and enforcement outcomes for multi-hop queries",
      "Designed the NER entity-annotation schema and curated the labeled dataset",
    ],
  },
  {
    title: "Machine Learning Intern",
    company: "Cognifront Pvt. Ltd. — Consumer Intelligence & Business Analytics",
    companyShort: "Cognifront (startup)",
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
    title: "Teaching Assistant",
    company: "Dept. of AI & Data Science, Savitribai Phule Pune University",
    companyShort: "Savitribai Phule Pune University",
    duration: "Jul 2023 – Mar 2024",
    location: "India",
    bullets: [
      "Supported 200+ students across TensorFlow, PyTorch, and software-engineering coursework",
      "Advised capstone teams building projects in healthcare, agriculture, and retail",
    ],
  },
];

// ─── Leadership & recognition ────────────────────────────────────────────────

export interface Leadership {
  title: string;
  company: string;
  duration: string;
  detail: string;
}

export const leadership: Leadership[] = [
  {
    title: "Grad Initiatives Team Volunteer",
    company: "International Students and Scholars Center, Arizona State University",
    duration: "Oct 2024 – Present",
    detail: "Help run community programs for 500+ international graduate students.",
  },
  {
    title: "Co-Founder & President",
    company: "Phoenix AI Club",
    duration: "Mar 2023 – Jan 2024",
    detail: "Grew the club to 1,500+ members in three months and ran 13+ technical workshops on ML and deep learning.",
  },
];

export const awards: { title: string; detail: string; year: string }[] = [
  { title: "3rd place globally, AVEVA EcoTech Emerge", detail: "PolyHouse Automation — IoT crop monitoring with on-device ML", year: "2023" },
  { title: "2nd place, Smart India Hackathon", detail: "AI traffic optimization with GoogLeNet and fuzzy logic", year: "2022" },
];
