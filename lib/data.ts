export const personalInfo = {
  name: "Saurabh Nilesh Dusane",
  role: "AI/ML Engineer  /  Data Scientist  /  Full-Stack AI Builder",
  email: "sdusane1@asu.edu",
  github: "https://github.com/SaurabhDusane",
  linkedin: "https://www.linkedin.com/in/saurabh-dusane",
  medium: "https://medium.com/@saurndusane13",
  twitter: "https://x.com/SaurabhDusane",
  formspreeId: "xojapzeo",
  resumePath: "/Resume_Saurabh_Nilesh_Dusane.pdf",
  bio: [
    "I'm an AI/ML Engineer who ships <strong>production-grade intelligent systems</strong>. Currently pursuing my M.S. in Computer Engineering at Arizona State University (4.0 GPA), I specialize in turning complex, messy data into solutions that drive <strong>measurable business outcomes</strong>—from predictive models processing 50K+ records to conversational AI serving real users.",
    "I don't just build models—I deliver <strong>end-to-end AI solutions</strong> that move metrics. Every project I take on blends rigorous engineering with creative problem-solving, and I've consistently delivered systems that improve operational efficiency by <strong>18-30%</strong>. I thrive at the intersection of research and real-world impact.",
  ],
  coreCompetencies:
    "End-to-end ML pipeline design • Deep learning & NLP at scale • Predictive analytics with 85%+ accuracy • Production deployment on AWS/GCP • Real-time data processing • Business intelligence dashboards • Cross-functional Agile delivery • Technical mentorship of 200+ students",
};

export const focusDomains = [
  { label: "Machine Learning", icon: "brain" },
  { label: "Data Science", icon: "chart" },
  { label: "Conversational AI", icon: "bot" },
  { label: "Computer Vision", icon: "eye" },
];

export interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  icon: string;
  githubLink: string;
  demoLink: string;
}

export const projects: Project[] = [
  {
    id: 0,
    title: "Production Predictive Analytics & Consumer AI Platform",
    description:
      "Shipped a production-grade ML platform analyzing 50,000+ records at 85%+ accuracy, powering consumer-facing features including an AI chatbot and real-time sentiment engine. Built scalable data pipelines with automated retraining, enabling stakeholders to make data-driven decisions 3x faster.",
    techStack: ["Python", "Deep Learning", "NLP", "Conversational AI", "TensorFlow", "PyTorch"],
    icon: "bot",
    githubLink: "https://github.com/SaurabhDusane",
    demoLink: "",
  },
  {
    id: 1,
    title: "Urban Flood Risk Prediction Engine (1.1M+ Data Points)",
    description:
      "Engineered an ML framework processing 1.1M+ environmental records to predict urban flood probability at 86.1% accuracy—benchmarked across 7 model architectures including Neural Networks, XGBoost, and LightGBM.",
    techStack: ["Python", "Neural Networks", "XGBoost", "LightGBM", "TensorFlow", "Scikit-learn"],
    icon: "droplets",
    githubLink: "https://github.com/SaurabhDusane",
    demoLink: "",
  },
  {
    id: 2,
    title: "IoT Smart Agriculture System (3rd Place — AVEVA EcoTech)",
    description:
      "Won 3rd place at the AVEVA EcoTech Emerge Challenge by building an IoT-powered automation system for sustainable agriculture. Deployed TensorFlow Lite on ESP32 edge devices for real-time crop condition prediction.",
    techStack: ["IoT", "ESP32", "TensorFlow Lite", "Edge AI", "Python", "Data Analysis"],
    icon: "leaf",
    githubLink: "https://github.com/SaurabhDusane",
    demoLink: "",
  },
  {
    id: 3,
    title: "LSTM-Powered Election Forecasting System",
    description:
      "Built a time-series forecasting system using LSTM networks trained on 5 years of political and polling data, achieving 2+ week predictive accuracy for real-world election trends.",
    techStack: ["Python", "LSTM", "TensorFlow", "Keras", "Time Series", "Predictive Analytics"],
    icon: "trendingUp",
    githubLink: "https://github.com/SaurabhDusane",
    demoLink: "",
  },
  {
    id: 4,
    title: "Multi-Modal Fake News Video Detection (Team Lead)",
    description:
      "Led a 4-person team to build a multi-modal misinformation detection system combining NLP (entity recognition, sentiment analysis) with computer vision for video content analysis.",
    techStack: ["Python", "NLP", "Computer Vision", "TensorFlow", "Scikit-learn", "NER"],
    icon: "shield",
    githubLink: "https://github.com/SaurabhDusane",
    demoLink: "",
  },
  {
    id: 5,
    title: "AI Traffic Optimization System (2nd Place — Smart India Hackathon)",
    description:
      "Secured 2nd place at Smart India Hackathon by leading a team to build a real-time traffic optimization system. Implemented GoogLeNet + Fuzzy Logic for intelligent vehicle detection, boosting accuracy 30% over baseline.",
    techStack: ["Python", "Computer Vision", "CNN", "GoogLeNet", "Fuzzy Logic", "Deep Learning"],
    icon: "traffic",
    githubLink: "https://github.com/SaurabhDusane",
    demoLink: "",
  },
];

export interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  categoryColor: string;
  url: string;
  date: string;
  readTime: number;
  featured: boolean;
}

export const articles: Article[] = [
  {
    id: 1,
    title: "The Role of AI in Top-Level Business Decision-Making",
    excerpt:
      "A deep dive into why C-suite leaders are adopting AI for strategic advantage—and the decision frameworks that separate hype from real ROI.",
    category: "Technical Essay",
    categoryColor: "indigo",
    url: "https://medium.com/@saurndusane13/the-role-of-artificial-intelligence-in-top-level-business-decision-making",
    date: "Sep 18, 2024",
    readTime: 7,
    featured: true,
  },
  {
    id: 2,
    title: "Request Through Fear vs...",
    excerpt:
      "An introspective piece on how fear shapes the way we ask, receive, and connect with others.",
    category: "Poetry & Creative",
    categoryColor: "purple",
    url: "https://medium.com/@saurndusane13/request-through-fear",
    date: "Jun 19, 2025",
    readTime: 3,
    featured: false,
  },
  {
    id: 3,
    title: "Exploring the Spectrum of Morality",
    excerpt:
      "Dissecting modern ethical frameworks through the lens of technology, cognitive bias, and evolving societal norms.",
    category: "Topical Essay",
    categoryColor: "orange",
    url: "https://medium.com/@saurndusane13/exploring-the-spectrum-of-morality",
    date: "Oct 4, 2024",
    readTime: 9,
    featured: false,
  },
  {
    id: 4,
    title: "Conscience: The Moral Compass of Humanity",
    excerpt:
      "How does conscience operate as an internal algorithm? A look at the intersection of moral philosophy and behavioral science.",
    category: "Topical Essay",
    categoryColor: "orange",
    url: "https://medium.com/@saurndusane13/conscience-the-moral-compass",
    date: "May 25, 2024",
    readTime: 8,
    featured: false,
  },
  {
    id: 5,
    title: "The Unshakable Paradox: Rationality, Practicality, and Beyond",
    excerpt:
      "Why the smartest strategy isn't always the most logical one—navigating the paradox of rationality in high-stakes decisions.",
    category: "Topical Essay",
    categoryColor: "orange",
    url: "https://medium.com/@saurndusane13/the-unshakable-paradox",
    date: "May 15, 2024",
    readTime: 7,
    featured: false,
  },
  {
    id: 6,
    title: "Religion-Culture: US and India",
    excerpt:
      "A data-informed comparative analysis of how cultural identity and religious structures shape societal decision-making across two democracies.",
    category: "Topical Essay",
    categoryColor: "orange",
    url: "https://medium.com/@saurndusane13/religion-culture-navigating",
    date: "Nov 7, 2024",
    readTime: 9,
    featured: false,
  },
  {
    id: 7,
    title: "The New Global Pandemic: DeepFakes",
    excerpt:
      "The technical anatomy of deepfakes, their societal threat vectors, and why AI-powered detection is the next critical infrastructure challenge.",
    category: "Technical Essay",
    categoryColor: "indigo",
    url: "https://medium.com/@saurndusane13/the-new-global-pandemic-deepfakes",
    date: "Nov 17, 2023",
    readTime: 7,
    featured: false,
  },
  {
    id: 8,
    title: "Rationality vs Practicality: A Modern Approach",
    excerpt:
      "A practical framework for when to think and when to act—lessons from engineering, philosophy, and startup culture.",
    category: "Topical Essay",
    categoryColor: "orange",
    url: "https://medium.com/@saurndusane13/rationality-vs-practicality",
    date: "Nov 1, 2023",
    readTime: 6,
    featured: false,
  },
  {
    id: 9,
    title: "Evolution of History: A Dissonant Perspective on Multiculturalism",
    excerpt:
      "How dominant historical narratives are constructed, challenged, and reshaped—and what that means for multicultural discourse today.",
    category: "Topical Essay",
    categoryColor: "orange",
    url: "https://medium.com/@saurndusane13/evolution-of-history",
    date: "Oct 15, 2023",
    readTime: 10,
    featured: false,
  },
];

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
  { label: "Python / ML", pct: 95, gradient: "from-indigo-500 to-purple-500" },
  { label: "Deep Learning / NLP", pct: 88, gradient: "from-purple-500 to-pink-500" },
  { label: "Data Analytics / BI", pct: 90, gradient: "from-teal-500 to-blue-500" },
  { label: "Cloud / DevOps", pct: 78, gradient: "from-blue-500 to-indigo-500" },
  { label: "Computer Vision", pct: 85, gradient: "from-amber-500 to-pink-500" },
];

export interface Experience {
  badge: string;
  badgeColor: string;
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
      'Architected and deployed a <span class="text-purple-300 font-semibold">production-ready legal chatbot</span> serving the US legal fraternity, reducing document review time by an estimated 40%',
      'Engineered consumer-facing AI features that boosted user engagement and <span class="text-purple-300 font-semibold">improved operational efficiency by 30%</span>',
      'Maintained <span class="text-purple-300 font-semibold">99.5%+ system uptime</span> across predictive analytics models via automated monitoring and CI/CD workflows',
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
      'Built and launched an NLP-powered chatbot generating <span class="text-purple-300 font-semibold">personalized product recommendations</span>',
      'Designed predictive analytics models processing <span class="text-purple-300 font-semibold">5,000+ records</span>, reducing waste by 18%',
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
      'Mentored <span class="text-purple-300 font-semibold">200+ students</span> through hands-on ML workshops covering TensorFlow, PyTorch, and deployment',
      "Guided 8 student teams in building entrepreneurial AI products, 3 advancing to regional competitions",
    ],
  },
];

export const leadership = [
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
      'Scaled from 0 to <span class="text-purple-300 font-semibold">1,500+ members in 3 months</span>—delivered 13+ technical workshops on ML, deep learning, and AI applications',
    ],
  },
];

export const education = [
  {
    degree: "Master of Science in Computer Engineering",
    sub: "(Computer Systems)",
    school: "Arizona State University",
    period: "Aug 2024 - Present",
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
    sub: "",
    school: "K. K. Wagh Institute of Engineering",
    period: "June 2020 - May 2024",
    gpa: "",
    expected: "",
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
