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
    topRank: 95,
    // Empty scaffold — fill these in to make the case-study page appear.
    // Empty fields render nothing; the "Read case study →" link stays hidden until
    // at least one field has content (see hasCaseStudyContent above).
    caseStudy: {
      problem: "",          // TODO
      context: [],          // TODO: bullets — data scale, compute, team, timeline
      approach: "",         // TODO: narrative; blank lines split into paragraphs
      architecture: {
        description: "",     // TODO: caption under the diagram
        mermaid: "",         // TODO: mermaid source string
        // OR drop /images/projects/predictive-analytics-platform-architecture.png
        // and set: image: "/images/projects/predictive-analytics-platform-architecture.png"
      },
      decisions: [],        // TODO: [{ title, detail }]
      results: [],          // TODO: contextualized metrics vs baseline
      futureWork: [],       // TODO
    },
  },
  {
    id: 1,
    slug: "urban-flood-risk",
    title: "Urban Flood Risk Prediction Engine (1.1M+ Data Points)",
    description:
      "Engineered an ML framework processing 1.1M+ environmental records to predict urban flood probability at 86.1% accuracy—benchmarked across 7 model architectures including Neural Networks, XGBoost, and LightGBM.",
    techStack: ["Python", "Neural Networks", "XGBoost", "LightGBM", "TensorFlow", "Scikit-learn"],
    icon: "droplets",
    githubLink: "https://github.com/SaurabhDusane",
    metric: "86%",
    metricLabel: "acc.",
    metricTooltip: "Model accuracy",
    highlights: ["86.1% accuracy — best of 7 benchmarked architectures", "1.1M+ environmental data points processed", "Compared Neural Networks, XGBoost, LightGBM, and more"],
    year: 2024,
    topRank: 86,
    // Empty scaffold — see notes on project id 0.
    caseStudy: {
      problem: "",          // TODO
      context: [],          // TODO
      approach: "",         // TODO
      architecture: {
        description: "",     // TODO
        mermaid: "",         // TODO
        // OR: image: "/images/projects/urban-flood-risk-architecture.png"
      },
      decisions: [],        // TODO
      results: [],          // TODO
      futureWork: [],       // TODO
    },
  },
  {
    id: 2,
    slug: "smart-agriculture",
    title: "IoT Smart Agriculture System (3rd Place — AVEVA EcoTech)",
    description:
      "Won 3rd place at the AVEVA EcoTech Emerge Challenge by building an IoT-powered automation system for sustainable agriculture. Deployed TensorFlow Lite on ESP32 edge devices for real-time crop condition prediction.",
    techStack: ["IoT", "ESP32", "TensorFlow Lite", "Edge AI", "Python", "Data Analysis"],
    icon: "leaf",
    githubLink: "https://github.com/SaurabhDusane",
    metric: "3rd",
    metricLabel: "place",
    metricTooltip: "Competition result",
    highlights: ["3rd place globally at AVEVA EcoTech Emerge Challenge", "TensorFlow Lite on ESP32 for real-time edge inference", "Sustainable agriculture automation with IoT sensors"],
    year: 2023,
    topRank: 90,
  },
  {
    id: 3,
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
    topRank: 75,
  },
  {
    id: 4,
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
    topRank: 70,
  },
  {
    id: 5,
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
