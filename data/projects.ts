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

/** Which of the three areas a project belongs to; drives the track toggles on the home page. */
export type Track = "data" | "ml" | "ai";

export const trackLabels: Record<Track, string> = {
  data: "Data engineering",
  ml: "ML",
  ai: "AI & agents",
};

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
  /** The single most telling fact, in plain words (e.g. "~83% accuracy on 10,914 cases"). */
  stat?: string;
  /** Show in "Selected work" on the home page. */
  featured?: boolean;
  /** Areas this project counts toward (home page track toggles). */
  tracks?: Track[];
  /** Headline numbers for the project page (value + short label). */
  keyNumbers?: { value: string; label: string }[];
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
    id: 10,
    slug: "guardian",
    title: "Guardian",
    description:
      "A self-healing maintenance layer that attaches to an existing ETL pipeline. It validates every stage’s output; when a stage goes bad, the bad rows are quarantined (never dropped), consumers keep reading the stage’s last good snapshot or a declared fallback, and the rest of the pipeline keeps running. Once the stage is fixed, its quarantined rows are replayed. An advisory LLM agent can diagnose the failure and propose a verified fix as a draft pull request.",
    summary:
      "A self-healing layer for existing ETL pipelines: it quarantines bad rows, keeps downstream stages running, and lets an LLM diagnose the failure.",
    stat: "Every row ends up promoted or quarantined, exactly once",
    featured: true,
    tracks: ["data", "ai"],
    techStack: ["Python", "Pandera", "DuckDB", "Parquet", "Dagster", "LLM agents"],
    githubLink: "https://github.com/SaurabhDusane/guardian",
    year: 2026,
    // Drafted from the repository README. Benchmarks are not published yet, so
    // no performance numbers are claimed here.
    caseStudy: {
      problem:
        "When one stage of a data pipeline produces bad output, the usual options are both bad: stop the whole run, including stages that never touched the bad data, or let the bad rows flow into the numbers people read the next morning. Guardian handles the space in between: contain the failure, keep everything else running, and help find out why it happened.",
      context: [
        "Attaches to an existing pipeline, declared once in YAML: stages, schemas, quarantine thresholds and fallback edges",
        "Runs as a standalone DAG runner or as a Dagster plugin, with the same repair behaviour in both",
        "The core is plain Python over pandas, Pandera, Parquet and DuckDB, and never imports Dagster",
        "The LLM agent is advisory: it can diagnose and propose, but never promote, merge or change pipeline state",
      ],
      approach:
        "Every stage’s output is validated against its schema and split into good and bad rows. At or below the stage’s threshold, the good rows become a new immutable snapshot and the bad ones go to quarantine. Above it, nothing is promoted: the stage is marked degraded, the still-good rows are quarantined too, and consumers keep reading the last good snapshot, or this run’s upstream data through a declared fallback adapter.\n\nRecovery is explicit. Replay re-runs a fixed stage on its quarantined records and upserts the recovered rows by key, so running it twice changes nothing. New versions of a stage can run in shadow on live inputs and are promoted only with approval.\n\nFor the why, a diagnosis command builds a deterministic, redacted evidence bundle (failed rules, sampled bad rows, schema and code changes, provenance) and asks a model for a root cause. Every claim has to cite an item in the bundle. A propose command goes one step further: it writes a fix as a new version, runs the stage’s tests and a shadow run, and at most opens a draft pull request.",
      architecture: {
        description: "The same YAML spec drives both runners; all repair logic lives in the core.",
        mermaid: `flowchart LR
  S[pipeline.yaml] --> R[Standalone runner]
  S --> D[Dagster plugin]
  R --> C[Guardian core]
  D --> C
  C --> P[(Parquet snapshots)]
  C --> Q[(Quarantine)]
  C --> E[(Event log)]
  A[Diagnosis agent: read-only] -.-> C`,
      },
      decisions: [
        {
          title: "Keep the core independent of the orchestrator",
          detail:
            "The value is in the repair rules (what to promote, what to quarantine, which snapshot a consumer reads), and those shouldn’t depend on who schedules the stages. A layering test keeps Dagster out of the core, so every scenario runs unchanged against both runners.",
        },
        {
          title: "Never lose a row silently",
          detail:
            "Every row handed to a stage ends up in exactly one place: the promoted snapshot or quarantine. Rejected batches quarantine their good rows too, quarantine is append-only, and replay merges by key. Property tests check the invariant on randomly generated bad data.",
        },
        {
          title: "Reroute where the data is read, not in the graph",
          detail:
            "Dagster’s graph is static, so instead of rewriting it per failure, Guardian decides which snapshot each consumer reads. The pipeline keeps flowing, and an asset check shows exactly which stage is degraded and why.",
        },
        {
          title: "Limit the agent in code, not in the prompt",
          detail:
            "The agent only sees a read-only view of Guardian, can only commit to its own fix branches, can create a draft pull request but never merge, and can’t act on an unknown diagnosis. Each limit is enforced and tested.",
        },
      ],
      results: [
        "In the demo, corrupting half of one stage’s output rolls that stage back, keeps all 443 of its rows in quarantine, and reroutes the stage below it so revenue numbers stay current",
        "Repair behaviour tested once per DAG role (source, leaf, fallback-protected and more) under both runners",
        "An evaluation harness that builds a labelled case for every stage and fault type, for both diagnosis and fixes",
      ],
      futureWork: [
        "Publish overhead, throughput and recovery benchmarks at 10k to 1M rows; the harness is built, but no results are recorded yet",
        "Run the diagnosis and fix evaluations against a real model",
      ],
    },
  },
  {
    id: 11,
    slug: "fp8-kvcache",
    title: "fp8-kvcache",
    description:
      "A quantized, tiered KV-cache for LLM inference. The first part is a Triton paged-attention decode kernel that reads an FP8 (e4m3) KV-cache with fused dequantization, to be benchmarked against a PyTorch reference, FlashInfer and vLLM’s FP8 path, with roofline analysis. The second is tiered offload from GPU to pinned CPU memory with async prefetch. No results yet: every number will come from saved benchmark runs.",
    summary: "A Triton decode kernel that reads an FP8 KV-cache, to shrink memory during LLM inference. In progress.",
    stat: "In progress, no results yet",
    tracks: ["ai", "ml"],
    techStack: ["Python", "Triton", "CUDA", "vLLM", "LLM inference"],
    githubLink: "https://github.com/SaurabhDusane/fp8-kvcache",
    year: 2026,
  },
  {
    id: 0,
    slug: "miniagent",
    title: "miniagent",
    description:
      "A ReAct-style agent written from first principles, with no framework. The reasoning-and-acting loop, tool calling, and trace logging are implemented directly, so every step the agent takes is visible instead of hidden behind an abstraction.",
    summary: "A ReAct agent built from first principles, with the reasoning loop, tool calls and trace logging written by hand.",
    stat: "Built without an agent framework",
    featured: true,
    tracks: ["ai"],
    techStack: ["Python", "LLM", "Agents", "ReAct"],
    githubLink: "https://github.com/SaurabhDusane/miniagent",
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
      "miniagent rebuilt in LangGraph, plus a shared benchmark harness that runs both versions on identical tasks. The point is to isolate what the framework adds, and what it costs.",
    summary: "miniagent rebuilt in LangGraph, plus a benchmark harness that runs both versions on identical tasks.",
    stat: "Framework vs. from-scratch on the same tasks",
    tracks: ["ai"],
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
      "A stacking-ensemble pipeline that predicts legal case outcomes. Across 10,914 cases it reaches about 83% accuracy, and it writes an HTML report so the results can be inspected rather than taken on faith.",
    summary: "A stacking ensemble that predicts legal case outcomes and writes interpretable HTML reports.",
    stat: "~83% accuracy on 10,914 cases",
    featured: true,
    keyNumbers: [{ value: "~83%", label: "accuracy" }, { value: "10,914", label: "legal cases" }],
    tracks: ["ml"],
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
      "Flood-risk prediction on 1.1M geospatial records from the Salt River Project. I benchmarked seven models, including Random Forest, XGBoost, LightGBM, and a neural network, with SMOTE balancing; the neural network did best, with an R² of 0.861. Feature engineering is kept separate from model selection, so the pipeline can be reused for other regions.",
    summary: "Flood-risk prediction on Salt River Project data, benchmarking seven models with SMOTE balancing.",
    stat: "R² = 0.861 on 1.1M records",
    featured: true,
    keyNumbers: [{ value: "0.861", label: "R² (neural network)" }, { value: "1.1M", label: "geospatial records" }, { value: "7", label: "models benchmarked" }],
    tracks: ["ml"],
    techStack: ["Python", "XGBoost", "LightGBM", "Neural Networks"],
    githubLink: "https://github.com/SaurabhDusane/flood-risk-prediction",
    highlights: ["An R² of 0.861 from a neural network, the best of seven models benchmarked with SMOTE balancing", "1.1M geospatial records from the Salt River Project", "Feature engineering kept separate from model selection, so the pipeline works for other regions"],
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
        "I built the pipeline as region-agnostic scaffolding: feature engineering is decoupled from model selection, so the same features feed every model, and moving to a new region means new data rather than a new pipeline.\n\nWith the features fixed, I benchmarked seven models on the same SMOTE-balanced data. The neural network performed best, with an R² of 0.861.",
      architecture: {
        mermaid: `flowchart LR
  A[(1.1M geospatial records)] --> B[Feature engineering]
  B --> C[SMOTE balancing]
  C --> D[7-model benchmark]
  D --> E[Neural network: R² 0.861]`,
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
        "An R² of 0.861 from the neural network, the best of seven models benchmarked",
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
      "A fault-tolerant scraper that makes 10,000+ SEC litigation releases queryable. An async worker pool with SQLite checkpoint/resume keeps collection going through WAF blocks, captchas, and rate limits. It runs on ASU’s Sol HPC cluster via SLURM.",
    summary: "A fault-tolerant scraper that makes SEC litigation releases queryable, built to survive WAF blocks, captchas and rate limits.",
    stat: "10,000+ filings, run on ASU’s Sol HPC",
    featured: true,
    keyNumbers: [{ value: "10,000+", label: "litigation releases" }, { value: "39", label: "fields in the knowledge graph" }],
    tracks: ["data"],
    techStack: ["Python", "Data Engineering", "SLURM", "Async", "Legal AI"],
    githubLink: "https://github.com/SaurabhDusane/sec-litigation-scraper",
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
      "A scraper for Bombay High Court land-dispute cases. It hides each case’s outcome during collection, so the data stays usable for honest outcome prediction later.",
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
      "A COLMAP + Open3D pipeline that reconstructs 3D meshes from video. Along the way I documented a useful negative result: masking out the object made the COLMAP reconstruction collapse.",
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
      "An ML platform analyzing 50,000+ records at 85%+ accuracy, behind consumer-facing features including an AI chatbot and a real-time sentiment engine. Data pipelines with automated retraining kept the models current and helped stakeholders make decisions 3x faster.",
    summary: "An ML platform behind consumer features, including a chatbot and a real-time sentiment engine, with automated retraining.",
    stat: "85%+ accuracy on 50,000+ records",
    keyNumbers: [{ value: "50,000+", label: "records" }, { value: "85%+", label: "accuracy" }, { value: "3x", label: "faster decisions" }],
    techStack: ["Python", "Deep Learning", "NLP", "Conversational AI", "TensorFlow", "PyTorch"],
    githubLink: "https://github.com/SaurabhDusane",
    highlights: ["85%+ prediction accuracy across consumer segments", "An AI chatbot and a real-time sentiment engine in production", "Automated retraining that helped stakeholders decide 3x faster"],
    year: 2025,
  },
  {
    id: 8,
    slug: "smart-agriculture",
    title: "PolyHouse Automation",
    description:
      "IoT crop monitoring that placed 3rd globally at AVEVA EcoTech Emerge. A central controller coordinates several ESP32 sensor nodes, combines soil-moisture, temperature, and humidity readings, and runs quantized TensorFlow Lite models on the device.",
    summary: "IoT crop monitoring: ESP32 sensor nodes feeding a controller that runs quantized TensorFlow Lite on-device.",
    stat: "3rd place globally, AVEVA EcoTech Emerge",
    keyNumbers: [{ value: "3rd", label: "place globally, AVEVA EcoTech Emerge" }],
    techStack: ["IoT", "ESP32", "TensorFlow Lite", "Edge AI"],
    githubLink: "https://github.com/SaurabhDusane",
    highlights: ["3rd place globally in the AVEVA EcoTech Emerge Challenge", "A central controller coordinating ESP32 sensor nodes and combining soil-moisture, temperature, and humidity readings", "Quantized TensorFlow Lite models running on the device"],
    year: 2023,
  },
  {
    id: 9,
    slug: "lstm-election-forecasting",
    title: "LSTM-Powered Election Forecasting System",
    description:
      "LSTM time-series models trained on five years of political and polling data, forecasting election trends accurately two or more weeks ahead.",
    summary: "LSTM time-series models trained on five years of political and polling data.",
    stat: "Accurate 2+ weeks ahead",
    keyNumbers: [{ value: "5 yrs", label: "of polling data" }, { value: "2+ wks", label: "forecast horizon" }],
    techStack: ["Python", "LSTM", "TensorFlow", "Keras", "Time Series", "Predictive Analytics"],
    githubLink: "https://github.com/SaurabhDusane",
    highlights: ["Accurate election-trend forecasts two or more weeks ahead", "LSTM networks trained on five years of polling data"],
    year: 2024,
  },
  {
    id: 10,
    slug: "fake-news-video-detection",
    title: "Multi-Modal Fake News Video Detection",
    description:
      "I led a team of four building a multi-modal misinformation detector. It combines NLP (entity recognition and sentiment analysis) with computer vision to classify video content.",
    summary: "A misinformation detector for video that combines NLP (entities, sentiment) with computer vision.",
    stat: "Led a team of four",
    keyNumbers: [{ value: "4", label: "people on the team I led" }],
    techStack: ["Python", "NLP", "Computer Vision", "TensorFlow", "Scikit-learn", "NER"],
    githubLink: "https://github.com/SaurabhDusane",
    highlights: ["A multi-modal pipeline combining NLP and computer vision", "Entity recognition and sentiment analysis on the text", "Misinformation classification for whole videos"],
    year: 2023,
  },
  {
    id: 11,
    slug: "ai-traffic-optimization",
    title: "AI Traffic Optimization System",
    description:
      "I led the team that placed 2nd at Smart India Hackathon with a real-time traffic optimization system. Vehicle detection uses GoogLeNet with fuzzy logic and is 30% more accurate than the baseline.",
    summary: "Real-time vehicle detection and signal optimization using GoogLeNet with fuzzy logic.",
    stat: "2nd place, Smart India Hackathon",
    keyNumbers: [{ value: "2nd", label: "place, Smart India Hackathon" }, { value: "+30%", label: "accuracy over baseline" }],
    techStack: ["Python", "Computer Vision", "CNN", "GoogLeNet", "Fuzzy Logic", "Deep Learning"],
    githubLink: "https://github.com/SaurabhDusane",
    highlights: ["2nd place at Smart India Hackathon", "GoogLeNet with fuzzy logic, 30% more accurate than the baseline", "Real-time vehicle detection and signal optimization"],
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
