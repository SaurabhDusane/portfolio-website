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
  formspreeId: "xojapzeo",
  resumePath: "/Resume_Saurabh_Nilesh_Dusane.pdf",
  bio: [
    "Most engineers build models. <strong>I build systems that think</strong> — and then I put them in people's hands. Right now I'm finishing my M.S. at Arizona State (4.0 GPA), but the classroom is only half the story; the rest happens at 2 AM debugging tokenizers, prototyping real-time pipelines, or mentoring the next wave of ML builders.",
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
    degree: "Master of Science in Computer Engineering",
    sub: "(Computer Systems)",
    school: "Arizona State University",
    period: "Aug 2024 – Present",
    gpa: "4.00/4.00",
    expected: "May 2026",
    focus: "Machine Learning Systems, Advanced Data Mining, Blockchain Architecture",
    coursework: [
      "Data Mining",
      "Semantic Web Mining",
      "Engineering Blockchain Applications",
      "Foundation of Algorithms",
      "Advanced ML Systems",
    ],
    color: "#a855f7",
  },
  {
    degree: "Bachelor of Engineering in AI & Data Science",
    school: "K. K. Wagh Institute of Engineering",
    period: "June 2020 – May 2024",
    focus: "Comprehensive foundation in AI/ML with focus on practical applications and research",
    coursework: [
      "Machine Learning",
      "Deep Learning",
      "Statistical Analysis",
      "Data Mining",
      "Business Intelligence",
      "Computer Vision",
      "NLP",
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
    title: "Programming Languages",
    icon: "terminal",
    color: "#6366f1",
    skills: ["Python", "SQL", "R", "C/C++", "Go", "Java", "Scala"],
  },
  {
    title: "ML & AI Frameworks",
    icon: "brain",
    color: "#a855f7",
    skills: ["TensorFlow", "PyTorch", "Keras", "Scikit-learn", "XGBoost", "OpenCV", "Transformers", "NLTK"],
  },
  {
    title: "Data Science & Analytics",
    icon: "chart",
    color: "#14b8a6",
    skills: ["Pandas", "NumPy", "Matplotlib", "Plotly", "Apache Spark", "Selenium"],
  },
  {
    title: "Databases & Cloud",
    icon: "database",
    color: "#3b82f6",
    skills: ["MySQL", "MongoDB", "PostgreSQL", "AWS", "GCP", "Docker", "FastAPI"],
  },
  {
    title: "BI & Visualization",
    icon: "pieChart",
    color: "#ec4899",
    skills: ["Tableau", "Power BI", "Jupyter"],
  },
  {
    title: "Specializations",
    icon: "target",
    color: "#7c3aed",
    skills: ["Deep Learning", "Computer Vision", "NLP", "Predictive Analytics", "Feature Engineering", "Statistical Modeling"],
  },
];

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
    title: "Graduate Research Volunteer — Conversational AI",
    company: "Prof. Hasan Davulcu's Research Group, ASU",
    duration: "Nov 2025 – Present",
    location: "Tempe, AZ",
    bullets: [
      "Architected and deployed a production-ready legal chatbot serving the US legal fraternity, reducing document review time by an estimated 40%",
      "Engineered consumer-facing AI features that boosted user engagement and improved operational efficiency by 30%",
      "Maintained 99.5%+ system uptime across predictive analytics models via automated monitoring and CI/CD workflows",
      "Drove cross-functional Agile sprints to ship AI capabilities on schedule",
    ],
  },
  {
    badge: "Internship",
    badgeColor: "blue",
    title: "AI/ML Intern — Consumer AI & Regional Analytics",
    company: "Cognifront Pvt. Ltd. (Startup)",
    duration: "Dec 2023 – Jun 2024",
    location: "India",
    bullets: [
      "Built and launched an NLP-powered chatbot generating personalized product recommendations",
      "Designed predictive analytics models processing 5,000+ records, reducing waste by 18%",
      "Delivered executive-facing BI dashboards (Tableau/Power BI) used by 3 stakeholder teams",
      "Owned production AI system health—implemented performance monitoring and model retraining pipelines",
    ],
  },
  {
    badge: "Teaching",
    badgeColor: "amber",
    title: "AI/ML Teaching Assistant — Technical Mentorship",
    company: "K. K. Wagh Institute, Dept. of AI & Data Science",
    duration: "Jul 2023 – Mar 2024",
    location: "India",
    bullets: [
      "Mentored 200+ students through hands-on ML workshops covering TensorFlow, PyTorch, and deployment",
      "Guided 8 student teams in building entrepreneurial AI products, 3 advancing to regional competitions",
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
    company: "ISSC, Arizona State University",
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
