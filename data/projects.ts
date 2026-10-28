/**
 * Projects data — add/remove entries here to update the Projects page.
 * Each project renders as a row on /projects and gets its own /projects/[slug] page.
 */

/**
 * Optional structured case-study payload. When filled in, the project page
 * renders these sections instead of the short description.
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
  /** Repository URL. Leave "" when there's no public repo — the link stays hidden. */
  githubLink: string;
  demoLink?: string;
  /** One-sentence summary shown in project lists. */
  summary: string;
  /** The single most telling fact, in plain words (e.g. "86.1% accuracy on 1.1M records"). */
  stat?: string;
  /** Show in "Selected work" on the home page. */
  featured?: boolean;
  /** Optional outcome bullets, shown on the project page */
  highlights?: string[];
  /** Year completed */
  year?: number;
  /** Optional cover image, shown on the project page. */
  coverImage?: string;
  /** Optional full case-study payload. */
  caseStudy?: CaseStudy;
}

/**
 * Returns true only if the case study has at least one non-empty field.
 * An empty-scaffold `caseStudy: { problem: "", approach: "", context: [], ... }`
 * returns false \u2014 so the case-study sections stay hidden until it's filled in.
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
    summary: "A ReAct agent built from first principles, with the reasoning loop, tool calls and trace logging written by hand.",
    stat: "Built without an agent framework",
    featured: true,
    techStack: ["Python", "LLM", "Agents", "ReAct"],
    githubLink: "", // TODO: awaiting repo URL — GitHub action stays hidden until set
    year: 2026,
    // Empty scaffold — stays invisible (hasCaseStudyContent === false) until a
    // field is filled. No case-study sections render while everything is blank.
    caseStudy: {
      problem: "",
      context: [],
      approach: "",
      architecture: { description: "", mermaid: "" },
      decisions: [],
      results: [],
      futureWork: [],
    },
  },
  {
    id: 1,
    slug: "agent-compare",
    title: "agent-compare",
    description:
      "A LangGraph reimplementation of miniagent plus a shared benchmark harness that runs both versions on identical tasks — isolating what the framework adds versus what it costs.",
    summary: "miniagent rebuilt in LangGraph, plus a benchmark harness that runs both versions on identical tasks.",
    stat: "Framework vs. from-scratch on the same tasks",
    techStack: ["Python", "LangGraph", "Agents", "Benchmarking"],
    githubLink: "", // TODO: awaiting repo URL
    year: 2026,
    // Empty scaffold — see note on the miniagent entry.
    caseStudy: {
      problem: "",
      context: [],
      approach: "",
      architecture: { description: "", mermaid: "" },
      decisions: [],
      results: [],
      futureWork: [],
    },
  },
  {
    id: 2,
    slug: "judge-ai",
    title: "Judge AI",
    description:
      "A stacking-ensemble pipeline predicting legal case outcomes across 10,914 cases at ~83% accuracy, with an HTML report output for interpretable results.",
    summary: "A stacking ensemble that predicts legal case outcomes and produces interpretable HTML reports.",
    stat: "~83% accuracy on 10,914 cases",
    featured: true,
    techStack: ["Python", "Scikit-learn", "Ensemble", "Legal AI"],
    githubLink: "", // TODO: awaiting repo URL
    year: 2025,
    // Empty scaffold — see note on the miniagent entry.
    caseStudy: {
      problem: "",
      context: [],
      approach: "",
      architecture: { description: "", mermaid: "" },
      decisions: [],
      results: [],
      futureWork: [],
    },
  },
  {
    id: 3,
    slug: "urban-flood-risk",
    title: "Geospatial Flood Risk Analytics",
    description:
      "A flood-risk prediction system on 1.1M geospatial records from the Salt River Project (Arizona), benchmarking 7 models (Random Forest, XGBoost, LightGBM, neural network) with SMOTE balancing; the neural network reached 86.1% accuracy. Built as region-agnostic scaffolding that decouples feature engineering from model selection.",
    summary: "Flood-risk prediction on Salt River Project data, benchmarking seven models with SMOTE balancing.",
    stat: "86.1% accuracy on 1.1M records",
    featured: true,
    techStack: ["Python", "XGBoost", "LightGBM", "Neural Networks"],
    githubLink: "https://github.com/SaurabhDusane",
    highlights: ["86.1% accuracy — neural network, best of 7 models benchmarked with SMOTE balancing", "1.1M geospatial records from the Salt River Project (Arizona)", "Region-agnostic scaffolding decoupling feature engineering from model selection"],
    year: 2025,
    // Drafted from the facts in this entry. Review the wording; add the other
    // three benchmarked models and any futureWork you want to mention.
    caseStudy: {
      problem:
        "Flood risk depends on many geospatial signals at once, and the locations that matter most are a small minority of the data. The goal was a model that predicts risk well on Salt River Project (Arizona) data without being hard-wired to that one region.",
      context: [
        "1.1M geospatial records from the Salt River Project, Arizona",
        "Imbalanced classes, handled with SMOTE balancing",
        "Seven candidate models, including Random Forest, XGBoost, LightGBM, and a neural network",
      ],
      approach:
        "I built the pipeline as region-agnostic scaffolding: feature engineering is decoupled from model selection, so the same features feed every model, and moving to a new region means new data rather than a new pipeline.\n\nWith the features fixed, I benchmarked seven models on the same SMOTE-balanced data. The neural network performed best, at 86.1% accuracy.",
      architecture: {
        mermaid: `flowchart LR
  A[(1.1M geospatial records)] --> B[Feature engineering]
  B --> C[SMOTE balancing]
  C --> D[7-model benchmark]
  D --> E[Neural network: 86.1%]`,
      },
      decisions: [
        {
          title: "Keep features separate from models",
          detail:
            "Decoupling feature engineering from model selection made the seven-model benchmark a like-for-like comparison, and means the pipeline can be pointed at another region’s data.",
        },
        {
          title: "Balance the data before comparing models",
          detail:
            "Training every candidate on the same SMOTE-balanced data keeps the comparison about the models, not about how each one copes with class imbalance.",
        },
      ],
      results: [
        "86.1% accuracy from the neural network, the best of seven models benchmarked",
        "A region-agnostic pipeline that separates feature engineering from model selection",
      ],
      futureWork: [],
    },
  },
  {
    id: 4,
    slug: "sec-litigation-scraper",
    title: "SEC Litigation Release Scraper",
    description:
      "A fault-tolerant scraper making 10,000+ SEC litigation releases queryable — async worker pool, SQLite checkpoint/resume, and collection logic resilient to WAF blocking, captchas, and rate limits. Deployed on ASU Sol HPC via SLURM.",
    summary: "A fault-tolerant scraper that makes SEC litigation releases queryable, built to survive WAF blocks, captchas and rate limits.",
    stat: "10,000+ filings, run on ASU’s Sol HPC",
    featured: true,
    techStack: ["Python", "Data Engineering", "SLURM", "Async"],
    githubLink: "", // TODO: awaiting repo URL
    year: 2025,
    // Drafted from the facts in this entry and the CIPS Lab experience bullets
    // in personal.ts. Review the wording; add futureWork if there's a next step.
    caseStudy: {
      problem:
        "SEC litigation releases are published as thousands of separate pages of unstructured legal text. To study enforcement patterns (who was charged, under which statutes, and with what outcome), the research project needed every release collected reliably and turned into structured, queryable data.",
      context: [
        "10,000+ litigation releases to collect from the SEC website",
        "A site that resists automated access with WAF blocking, captchas, and rate limits",
        "Long-running jobs on ASU’s Sol HPC cluster, scheduled through SLURM",
        "Downstream research depends on the data being correct, not just present",
      ],
      approach:
        "Collection runs as an async worker pool. Every release is checkpointed in SQLite, so a job that gets blocked, rate-limited, or pre-empted on the cluster resumes where it stopped instead of starting over.\n\nExtracted text becomes a 39-field knowledge graph linking legal actors, statutes, and enforcement outcomes, so questions that span several cases and parties can be answered with a query instead of by reading filings. I also designed the NER entity-annotation schema and curated the labeled dataset used for entity extraction.",
      architecture: {
        description: "Runs on ASU’s Sol HPC cluster via SLURM.",
        mermaid: `flowchart LR
  A[SEC litigation releases] --> B[Async worker pool]
  B <--> C[(SQLite checkpoints)]
  B --> D[Extraction]
  D --> E[Recovery layer]
  E --> F[(39-field knowledge graph)]`,
      },
      decisions: [
        {
          title: "Checkpoint every release",
          detail:
            "A long scrape against a site that blocks automated traffic will be interrupted. Recording progress per release in SQLite makes each interruption cheap: restart the job and it continues from the last checkpoint.",
        },
        {
          title: "Treat “success” as a claim to verify",
          detail:
            "The extraction layer once reported success while returning zero citations, silently corrupting downstream data. I traced the failure and built a recovery layer to repair the affected records.",
        },
      ],
      results: [
        "10,000+ SEC litigation releases collected and queryable",
        "A 39-field knowledge graph linking legal actors, statutes, and enforcement outcomes",
        "A silent zero-citation extraction failure found and repaired",
        "An NER annotation schema and curated labeled dataset for entity extraction",
      ],
      futureWork: [],
    },
  },
  {
    id: 5,
    slug: "indiakanoon-scraper",
    title: "IndiaKanoon Legal Case Scraper",
    description:
      "A scraper for Bombay High Court land-dispute cases with an outcome-masking architecture that hides case outcomes during collection to preserve research integrity for downstream prediction.",
    summary: "A scraper for Bombay High Court land-dispute cases that hides outcomes during collection to keep downstream prediction honest.",
    stat: "Outcome masking for research integrity",
    techStack: ["Python", "Data Engineering", "Legal AI"],
    githubLink: "", // TODO: awaiting repo URL
    year: 2025,
  },
  {
    id: 6,
    slug: "video-to-3d-mesh",
    title: "Video-to-3D Mesh Reconstruction",
    description:
      "A COLMAP + Open3D pipeline reconstructing 3D meshes from video, including a documented finding that object masking collapsed the COLMAP reconstruction.",
    summary: "A COLMAP + Open3D pipeline that reconstructs 3D meshes from video.",
    stat: "Documented why object masking broke reconstruction",
    techStack: ["Python", "Computer Vision", "COLMAP", "Open3D"],
    githubLink: "", // TODO: awaiting repo URL
    year: 2025,
  },
  {
    id: 7,
    slug: "predictive-analytics-platform",
    title: "Production Predictive Analytics & Consumer AI Platform",
    description:
      "Shipped a production-grade ML platform analyzing 50,000+ records at 85%+ accuracy, powering consumer-facing features including an AI chatbot and real-time sentiment engine. Built scalable data pipelines with automated retraining, enabling stakeholders to make data-driven decisions 3x faster.",
    summary: "An ML platform behind consumer features, including a chatbot and a real-time sentiment engine, with automated retraining.",
    stat: "85%+ accuracy on 50,000+ records",
    techStack: ["Python", "Deep Learning", "NLP", "Conversational AI", "TensorFlow", "PyTorch"],
    githubLink: "https://github.com/SaurabhDusane",
    highlights: ["85%+ prediction accuracy across consumer segments", "AI chatbot + real-time sentiment engine in production", "Automated retraining pipeline — 3x faster stakeholder decisions"],
    year: 2025,
  },
  {
    id: 8,
    slug: "smart-agriculture",
    title: "PolyHouse Automation",
    description:
      "3rd Place Globally, AVEVA EcoTech Emerge. An IoT crop-monitoring system — a centralized controller orchestrating multiple ESP32 sensor nodes, fusing soil-moisture/temperature/humidity streams, running quantized TensorFlow Lite inference on-device.",
    summary: "IoT crop monitoring: ESP32 sensor nodes feeding a controller that runs quantized TensorFlow Lite on-device.",
    stat: "3rd place globally, AVEVA EcoTech Emerge",
    techStack: ["IoT", "ESP32", "TensorFlow Lite", "Edge AI"],
    githubLink: "https://github.com/SaurabhDusane",
    highlights: ["3rd Place Globally — AVEVA EcoTech Emerge Challenge", "Centralized controller orchestrating ESP32 sensor nodes; fused soil-moisture, temperature, and humidity streams", "Quantized TensorFlow Lite inference running on-device"],
    year: 2023,
  },
  {
    id: 9,
    slug: "lstm-election-forecasting",
    title: "LSTM-Powered Election Forecasting System",
    description:
      "Built a time-series forecasting system using LSTM networks trained on 5 years of political and polling data, achieving 2+ week predictive accuracy for real-world election trends.",
    summary: "LSTM time-series models trained on five years of political and polling data.",
    stat: "Accurate forecasts 2+ weeks ahead",
    techStack: ["Python", "LSTM", "TensorFlow", "Keras", "Time Series", "Predictive Analytics"],
    githubLink: "https://github.com/SaurabhDusane",
    highlights: ["2+ week predictive accuracy for election trends", "LSTM networks trained on 5 years of polling data"],
    year: 2024,
  },
  {
    id: 10,
    slug: "fake-news-video-detection",
    title: "Multi-Modal Fake News Video Detection",
    description:
      "Led a 4-person team to build a multi-modal misinformation detection system combining NLP (entity recognition, sentiment analysis) with computer vision for video content analysis.",
    summary: "Misinformation detection that combines NLP (entities, sentiment) with computer vision on video.",
    stat: "Led a team of four",
    techStack: ["Python", "NLP", "Computer Vision", "TensorFlow", "Scikit-learn", "NER"],
    githubLink: "https://github.com/SaurabhDusane",
    highlights: ["Multi-modal pipeline: NLP + Computer Vision", "Entity recognition and sentiment analysis on text", "Video-level misinformation classification"],
    year: 2023,
  },
  {
    id: 11,
    slug: "ai-traffic-optimization",
    title: "AI Traffic Optimization System",
    description:
      "Secured 2nd place at Smart India Hackathon by leading a team to build a real-time traffic optimization system. Implemented GoogLeNet + Fuzzy Logic for intelligent vehicle detection, boosting accuracy 30% over baseline.",
    summary: "Real-time vehicle detection and signal optimization using GoogLeNet with fuzzy logic.",
    stat: "2nd place, Smart India Hackathon",
    techStack: ["Python", "Computer Vision", "CNN", "GoogLeNet", "Fuzzy Logic", "Deep Learning"],
    githubLink: "https://github.com/SaurabhDusane",
    highlights: ["2nd place at Smart India Hackathon", "GoogLeNet + Fuzzy Logic — 30% accuracy boost over baseline", "Real-time vehicle detection and signal optimization"],
    year: 2022,
  },
];

/**
 * Returns a repository URL worth linking, or undefined. A link to the bare
 * GitHub profile isn't a repo, so it's treated as "no public code".
 */
export function repoUrl(project: Project): string | undefined {
  const url = project.githubLink?.trim().replace(/\/+$/, "");
  if (!url) return undefined;
  const path = url.replace(/^https?:\/\/(www\.)?github\.com\/?/i, "");
  return path.includes("/") ? url : undefined;
}
