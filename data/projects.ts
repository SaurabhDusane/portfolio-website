/**
 * Projects data — add/remove entries here to update the Projects page.
 * Each project renders as a glassmorphism card with tech tags and links.
 */

export interface Project {
  id: number;
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
    metric: "50K",
    metricLabel: "records",
    metricTooltip: "Dataset size",
    highlights: ["85%+ prediction accuracy across consumer segments", "AI chatbot + real-time sentiment engine in production", "Automated retraining pipeline — 3x faster stakeholder decisions"],
    year: 2025,
    topRank: 95,
  },
  {
    id: 1,
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
  },
  {
    id: 2,
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
