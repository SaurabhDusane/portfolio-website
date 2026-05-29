/**
 * Writing/essays data — add entries here to update the Writing page.
 * Each article renders as a card linking to Medium.
 */

export interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: "Technical Essay" | "Poetry & Creative" | "Topical Essay";
  url: string;
  date: string;
  /** Estimated read time in minutes */
  readTime: number;
  featured?: boolean;
}

export const articles: Article[] = [
  {
    id: 1,
    title: "The Role of AI in Top-Level Business Decision-Making",
    excerpt:
      "A deep dive into why C-suite leaders are adopting AI for strategic advantage—and the decision frameworks that separate hype from real ROI.",
    category: "Technical Essay",
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
    url: "https://medium.com/@saurndusane13/request-through-fear",
    date: "Jun 19, 2025",
    readTime: 3,
  },
  {
    id: 3,
    title: "Exploring the Spectrum of Morality",
    excerpt:
      "Dissecting modern ethical frameworks through the lens of technology, cognitive bias, and evolving societal norms.",
    category: "Topical Essay",
    url: "https://medium.com/@saurndusane13/exploring-the-spectrum-of-morality",
    date: "Oct 4, 2024",
    readTime: 9,
  },
  {
    id: 4,
    title: "Conscience: The Moral Compass of Humanity",
    excerpt:
      "How does conscience operate as an internal algorithm? A look at the intersection of moral philosophy and behavioral science.",
    category: "Topical Essay",
    url: "https://medium.com/@saurndusane13/conscience-the-moral-compass",
    date: "May 25, 2024",
    readTime: 8,
  },
  {
    id: 5,
    title: "The Unshakable Paradox: Rationality, Practicality, and Beyond",
    excerpt:
      "Why the smartest strategy isn't always the most logical one—navigating the paradox of rationality in high-stakes decisions.",
    category: "Topical Essay",
    url: "https://medium.com/@saurndusane13/the-unshakable-paradox",
    date: "May 15, 2024",
    readTime: 7,
  },
  {
    id: 6,
    title: "Religion-Culture: US and India",
    excerpt:
      "A data-informed comparative analysis of how cultural identity and religious structures shape societal decision-making across two democracies.",
    category: "Topical Essay",
    url: "https://medium.com/@saurndusane13/religion-culture-navigating",
    date: "Nov 7, 2024",
    readTime: 9,
  },
  {
    id: 7,
    title: "The New Global Pandemic: DeepFakes",
    excerpt:
      "The technical anatomy of deepfakes, their societal threat vectors, and why AI-powered detection is the next critical infrastructure challenge.",
    category: "Technical Essay",
    url: "https://medium.com/@saurndusane13/the-new-global-pandemic-deepfakes",
    date: "Nov 17, 2023",
    readTime: 7,
  },
  {
    id: 8,
    title: "Rationality vs Practicality: A Modern Approach",
    excerpt:
      "A practical framework for when to think and when to act—lessons from engineering, philosophy, and startup culture.",
    category: "Topical Essay",
    url: "https://medium.com/@saurndusane13/rationality-vs-practicality",
    date: "Nov 1, 2023",
    readTime: 6,
  },
  {
    id: 9,
    title: "Evolution of History: A Dissonant Perspective on Multiculturalism",
    excerpt:
      "How dominant historical narratives are constructed, challenged, and reshaped—and what that means for multicultural discourse today.",
    category: "Topical Essay",
    url: "https://medium.com/@saurndusane13/evolution-of-history",
    date: "Oct 15, 2023",
    readTime: 10,
  },
];
