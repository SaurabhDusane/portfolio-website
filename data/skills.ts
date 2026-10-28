/**
 * Capabilities shown in the skills map on /about. Each one lists the tech
 * tags that count as evidence for it; a project is linked to a capability
 * when its `techStack` contains any of those tags, so the map stays in sync
 * with data/projects.ts automatically.
 */
import { projects, type Project } from "./projects";

export interface Capability {
  id: string;
  label: string;
  tags: string[];
}

export const capabilities: Capability[] = [
  { id: "agents", label: "LLM agents", tags: ["LLM", "Agents", "ReAct", "LangGraph"] },
  { id: "classical-ml", label: "Classical ML", tags: ["Scikit-learn", "Ensemble", "XGBoost", "LightGBM", "Fuzzy Logic"] },
  {
    id: "deep-learning",
    label: "Deep learning",
    tags: ["Neural Networks", "Deep Learning", "TensorFlow", "PyTorch", "Keras", "LSTM", "CNN", "GoogLeNet", "TensorFlow Lite"],
  },
  { id: "nlp", label: "NLP", tags: ["NLP", "NER", "Conversational AI"] },
  { id: "vision", label: "Computer vision", tags: ["Computer Vision", "COLMAP", "Open3D", "CNN", "GoogLeNet"] },
  { id: "data-eng", label: "Data engineering", tags: ["Data Engineering", "Async", "SLURM"] },
  { id: "forecasting", label: "Forecasting", tags: ["LSTM", "Time Series", "Predictive Analytics"] },
  { id: "edge", label: "Edge & IoT", tags: ["IoT", "ESP32", "TensorFlow Lite", "Edge AI"] },
  { id: "legal", label: "Legal AI", tags: ["Legal AI"] },
];

/** Projects that use a capability, in the order of data/projects.ts. */
export function projectsFor(cap: Capability, list: Project[] = projects): Project[] {
  return list.filter((p) => p.techStack.some((t) => cap.tags.includes(t)));
}

/** Edges of the skills map as [capability id, project slug] pairs. */
export const skillEdges: [string, string][] = capabilities.flatMap((c) =>
  projectsFor(c).map((p) => [c.id, p.slug] as [string, string])
);
