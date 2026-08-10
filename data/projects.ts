/**
 * Projects data — add/remove entries here to update the Projects page.
 * Each project renders as a glassmorphism card with tech tags and links.
 */

/**
 * Optional structured case-study payload. When set, the project gets a full
 * `/projects/[slug]` page and a "Read case study \u2192" link on its card.
 * Sections render only if their data is present \u2014 a sparse case study still looks clean.
 */
export interface CaseStudy {
  /** The problem and why it matters. */
  problem: string;
  /** Constraints \u2014 data scale, compute, team, timeline. */
  context?: string[];
  /** Narrative \u2014 how it was built. Plain text or basic markdown (line breaks become paragraphs). */
  approach: string;
  /** Architecture diagram \u2014 prefer image, fall back to mermaid. */
  architecture?: {
    description?: string;
    /** Path under `/public`, e.g. `/images/projects/<slug>-architecture.png`. */
    image?: string;
    /** Mermaid diagram source (rendered client-side, themed). */
    mermaid?: string;
  };
  /** Key decisions and tradeoffs (why X over Y). */
  decisions?: { title: string; detail: string }[];
  /** Contextualized metrics (vs baseline). */
  results?: string[];
  /** What I'd do differently or what's next. */
  futureWork?: string[];
}

export interface Project {
  id: number;
  /** URL-safe slug (e.g. "urban-flood-risk"). Drives `/projects/[slug]`. */
  slug: string;
  title: string;
  description: string;
  techStack: string[];
  /** Lucide icon name rendered beside the title */
  icon: string;
  githubLink: string;
  demoLink?: string;
  /** Vote-rail metric (e.g. "50K") */
  metric?: string;
  /** Short label under metric (e.g. "records") */
  metricLabel?: string;
  /** Tooltip describing the metric (e.g. "Dataset size") */
  metricTooltip?: string;
  /** Optional outcome bullets shown on Details expand */
  highlights?: string[];
  /** Year completed — used for New sort */
  year?: number;
  /** Numeric sort weight for Top sort (higher = better) */
  topRank?: number;
  /** Optional cover image for the grid card. Falls back to icon-on-tint. */
  coverImage?: string;
  /** Optional full case-study payload. If set, card shows "Read case study \u2192". */
  caseStudy?: CaseStudy;
}

/**
 * Returns true only if the case study has at least one non-empty field.
 * An empty-scaffold `caseStudy: { problem: "", approach: "", context: [], ... }`
 * returns false \u2014 so the card link and page sections stay invisible until I fill it in.
 */
export function hasCaseStudyContent(cs?: CaseStudy): cs is CaseStudy {
  if (!cs) return false;
  return Boolean(
    cs.problem?.trim() ||
      cs.approach?.trim() ||
      (cs.context && cs.context.length > 0) ||
      (cs.decisions && cs.decisions.length > 0) ||
      (cs.results && cs.results.length > 0) ||
      (cs.futureWork && cs.futureWork.length > 0) ||
      cs.architecture?.image ||
      cs.architecture?.mermaid?.trim() ||
      cs.architecture?.description?.trim()
  );
}

export const projects: Project[] = [
  {
    id: 0,
    slug: "miniagent",
    title: "miniagent",
    description:
      "A ReAct-style agent built from first principles with no framework — the reasoning/acting loop, tool-calling, and trace logging are implemented directly to expose agent internals instead of abstracting them.",
    techStack: ["Python", "LLM", "Agents", "ReAct"],
    icon: "bot",
    githubLink: "", // TODO: awaiting repo URL — GitHub action stays hidden until set
    metric: "from scratch",
    metricTooltip: "Built from first principles, no framework",
    year: 2026,
    topRank: 99,
  },
  {
    id: 1,
    slug: "agent-compare",
    title: "agent-compare",
    description:
      "A LangGraph reimplementation of miniagent plus a shared benchmark harness that runs both versions on identical tasks — isolating what the framework adds versus what it costs.",
    techStack: ["Python", "LangGraph", "Agents", "Benchmarking"],
    icon: "gitCompare",
    githubLink: "", // TODO: awaiting repo URL
    metric: "benchmarked",
    metricTooltip: "Same tasks, framework vs. from-scratch",
    year: 2026,
    topRank: 98,
  },
  {
    id: 2,
    slug: "judge-ai",
    title: "Judge AI",
    description:
      "A stacking-ensemble pipeline predicting legal case outcomes across 10,914 cases at ~83% accuracy, with an HTML report output for interpretable results.",
    techStack: ["Python", "Scikit-learn", "Ensemble", "Legal AI"],
    icon: "scale",
    githubLink: "", // TODO: awaiting repo URL
    metric: "83%",
    metricLabel: "acc",
    metricTooltip: "≈83% across 10,914 cases",
    year: 2025,
    topRank: 97,
  },
  {
    id: 3,
    slug: "urban-flood-risk",
    title: "Geospatial Flood Risk Analytics",
    description:
      "A flood-risk prediction system on 1.1M geospatial records from the Salt River Project (Arizona), benchmarking 7 models (Random Forest, XGBoost, LightGBM, neural network) with SMOTE balancing; the neural network reached 86.1% accuracy. Built as region-agnostic scaffolding that decouples feature engineering from model selection.",
    techStack: ["Python", "XGBoost", "LightGBM", "Neural Networks"],
    icon: "droplets",
    githubLink: "https://github.com/SaurabhDusane",
    metric: "86.1%",
    metricLabel: "acc",
    metricTooltip: "Neural-network accuracy, best of 7 models",
    highlights: ["86.1% accuracy — neural network, best of 7 models benchmarked with SMOTE balancing", "1.1M geospatial records from the Salt River Project (Arizona)", "Region-agnostic scaffolding decoupling feature engineering from model selection"],
    year: 2025,
    topRank: 96,
  },
  {
    id: 4,
    slug: "sec-litigation-scraper",
    title: "SEC Litigation Release Scraper",
    description:
      "A fault-tolerant scraper making 10,000+ SEC litigation releases queryable — async worker pool, SQLite checkpoint/resume, and collection logic resilient to WAF blocking, captchas, and rate limits. Deployed on ASU Sol HPC via SLURM.",
    techStack: ["Python", "Data Engineering", "SLURM", "Async"],
    icon: "fileSearch",
    githubLink: "", // TODO: awaiting repo URL
    metric: "10K+",
    metricLabel: "filings",
    metricTooltip: "SEC litigation releases made queryable",
    year: 2025,
    topRank: 95,
  },
  {
    id: 5,
    slug: "indiakanoon-scraper",
    title: "IndiaKanoon Legal Case Scraper",
    description:
      "A scraper for Bombay High Court land-dispute cases with an outcome-masking architecture that hides case outcomes during collection to preserve research integrity for downstream prediction.",
    techStack: ["Python", "Data Engineering", "Legal AI"],
    icon: "gavel",
    githubLink: "", // TODO: awaiting repo URL
    metric: "outcome-masked",
    metricTooltip: "Outcomes hidden during collection",
    year: 2025,
    topRank: 94,
  },
  {
    id: 6,
    slug: "video-to-3d-mesh",
    title: "Video-to-3D Mesh Reconstruction",
    description:
      "A COLMAP + Open3D pipeline reconstructing 3D meshes from video, including a documented finding that object masking collapsed the COLMAP reconstruction.",
    techStack: ["Python", "Computer Vision", "COLMAP", "Open3D"],
    icon: "box",
    githubLink: "", // TODO: awaiting repo URL
    metric: "COLMAP",
    metricLabel: "+ Open3D",
    metricTooltip: "COLMAP + Open3D pipeline",
    year: 2025,
    topRank: 93,
  },
  {
    id: 7,
    slug: "predictive-analytics-platform",
    title: "Production Predictive Analytics & Consumer AI Platform",
    description:
      "Shipped a production-grade ML platform analyzing 50,000+ records at 85%+ accuracy, powering consumer-facing features including an AI chatbot and real-time sentiment engine. Built scalable data pipelines with automated retraining, enabling stakeholders to make data-driven decisions 3x faster.",
    techStack: ["Python", "Deep Learning", "NLP", "Conversational AI", "TensorFlow", "PyTorch"],
    icon: "bot",
    githubLink: "https://github.com/SaurabhDusane",
    metric: "50K",
    metricLabel: "records",
    metricTooltip: "Dataset size",
    highlights: ["85%+ prediction accuracy across consumer segments", "AI chatbot + real-time sentiment engine in production", "Automated retraining pipeline — 3x faster stakeholder decisions"],
    year: 2025,
    topRank: 92,
  },
  {
    id: 8,
    slug: "smart-agriculture",
    title: "PolyHouse Automation",
    description:
      "3rd Place Globally, AVEVA EcoTech Emerge. An IoT crop-monitoring system — a centralized controller orchestrating multiple ESP32 sensor nodes, fusing soil-moisture/temperature/humidity streams, running quantized TensorFlow Lite inference on-device.",
    techStack: ["IoT", "ESP32", "TensorFlow Lite", "Edge AI"],
    icon: "leaf",
    githubLink: "https://github.com/SaurabhDusane",
    metric: "3rd",
    metricLabel: "global",
    metricTooltip: "3rd Place Globally — AVEVA EcoTech Emerge",
    highlights: ["3rd Place Globally — AVEVA EcoTech Emerge Challenge", "Centralized controller orchestrating ESP32 sensor nodes; fused soil-moisture, temperature, and humidity streams", "Quantized TensorFlow Lite inference running on-device"],
    year: 2023,
    topRank: 91,
  },
  {
    id: 9,
    slug: "lstm-election-forecasting",
    title: "LSTM-Powered Election Forecasting System",
    description:
      "Built a time-series forecasting system using LSTM networks trained on 5 years of political and polling data, achieving 2+ week predictive accuracy for real-world election trends.",
    techStack: ["Python", "LSTM", "TensorFlow", "Keras", "Time Series", "Predictive Analytics"],
    icon: "trendingUp",
    githubLink: "https://github.com/SaurabhDusane",
    metric: "5yr",
    metricLabel: "data",
    metricTooltip: "Training data span",
    highlights: ["2+ week predictive accuracy for election trends", "LSTM networks trained on 5 years of polling data"],
    year: 2024,
    topRank: 90,
  },
  {
    id: 10,
    slug: "fake-news-video-detection",
    title: "Multi-Modal Fake News Video Detection (Team Lead)",
    description:
      "Led a 4-person team to build a multi-modal misinformation detection system combining NLP (entity recognition, sentiment analysis) with computer vision for video content analysis.",
    techStack: ["Python", "NLP", "Computer Vision", "TensorFlow", "Scikit-learn", "NER"],
    icon: "shield",
    githubLink: "https://github.com/SaurabhDusane",
    metric: "4",
    metricLabel: "team",
    metricTooltip: "Team size led",
    highlights: ["Multi-modal pipeline: NLP + Computer Vision", "Entity recognition and sentiment analysis on text", "Video-level misinformation classification"],
    year: 2023,
    topRank: 89,
  },
  {
    id: 11,
    slug: "ai-traffic-optimization",
    title: "AI Traffic Optimization System (2nd Place — Smart India Hackathon)",
    description:
      "Secured 2nd place at Smart India Hackathon by leading a team to build a real-time traffic optimization system. Implemented GoogLeNet + Fuzzy Logic for intelligent vehicle detection, boosting accuracy 30% over baseline.",
    techStack: ["Python", "Computer Vision", "CNN", "GoogLeNet", "Fuzzy Logic", "Deep Learning"],
    icon: "traffic",
    githubLink: "https://github.com/SaurabhDusane",
    metric: "2nd",
    metricLabel: "place",
    metricTooltip: "Competition result",
    highlights: ["2nd place at Smart India Hackathon", "GoogLeNet + Fuzzy Logic — 30% accuracy boost over baseline", "Real-time vehicle detection and signal optimization"],
    year: 2022,
    topRank: 88,
  },
];
