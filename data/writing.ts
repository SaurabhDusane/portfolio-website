/**
 * Writing data — add entries here to update the Writing page.
 *
 * Two kinds of entry share one list:
 * - essays published on Medium (`url` set): each gets an on-site preview page
 *   at /writing/<slug> with a summary, key points, a pull quote and a link out.
 * - technical notes (`body` set): written for this site and shown in full there.
 *
 * Titles, dates and links match the Medium posts. Quotes are copied verbatim.
 */

export type WritingCategory = "Technical notes" | "Tech & AI" | "Ethics & reasoning" | "Culture & society";

/** Display order of the category filters. */
export const writingCategories: WritingCategory[] = [
  "Technical notes",
  "Tech & AI",
  "Ethics & reasoning",
  "Culture & society",
];

/** One block of a technical note's body. */
export type NoteBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "code"; text: string; lang?: string };

export interface Article {
  /** URL-safe slug. Drives `/writing/[slug]`. */
  slug: string;
  title: string;
  /** Rest of the published title (the part after the colon), shown on the article page. */
  subtitle?: string;
  /** One plain sentence: what the piece argues. Shown in lists. */
  excerpt: string;
  category: WritingCategory;
  /** ISO date (YYYY-MM-DD) of first publication. */
  date: string;
  /** Estimated read time in minutes */
  readTime: number;
  /** Shown as the large card at the top of /writing. */
  featured?: boolean;
  /** Medium link. Set for essays; absent for on-site notes. */
  url?: string;
  /** Essays: a short paragraph for the preview page. */
  summary?: string;
  /** Essays: what the piece covers. */
  points?: string[];
  /** Essays: one sentence copied verbatim from the piece. */
  quote?: string;
  /** Pieces that belong together; parts are numbered from 1. */
  series?: { id: string; name: string; part: number };
  /** Notes: the full text. */
  body?: NoteBlock[];
  /** Notes: the repository the note is about. */
  repo?: string;
}

const MEDIUM = "https://medium.com/@saurndusane13";

export const articles: Article[] = [
  // ─── Technical notes ──────────────────────────────────────────────────────
  {
    slug: "why-guardian-quarantines",
    title: "Why Guardian quarantines bad rows instead of failing the run",
    excerpt:
      "When one pipeline stage breaks, stopping everything turns a local problem into an outage. Here is what Guardian does instead.",
    category: "Technical notes",
    date: "2026-10-28",
    readTime: 4,
    repo: "https://github.com/SaurabhDusane/guardian",
    body: [
      {
        type: "p",
        text: "A data pipeline usually handles a bad batch in one of two ways. It crashes the run, or it lets the bad rows flow downstream and hopes a dashboard looks wrong enough for someone to notice. Both cost something. A crash stops every downstream stage, including the ones that never touched the bad data. Letting it through means the numbers people read the next morning are wrong, and nobody knows.",
      },
      {
        type: "p",
        text: "Guardian takes a third path. It attaches to an existing pipeline, validates every stage’s output against a schema, and splits the rows into good and bad. What happens next depends on a threshold set for each stage.",
      },
      { type: "h2", text: "The rule" },
      {
        type: "list",
        items: [
          "If the share of bad rows is at or below the stage’s threshold, the good rows become a new snapshot, the bad rows go to quarantine, and the stage stays healthy.",
          "Above the threshold, or when the schema itself is wrong, nothing is promoted. The stage is marked degraded and its consumers keep reading its last good snapshot. The rows that were still good are quarantined too, so nothing is lost.",
          "If the stage’s code crashes, the result is the same rollback.",
        ],
      },
      {
        type: "p",
        text: "Quarantined rows are never deleted. Each one keeps the rule it failed, the reason, and the original row.",
      },
      { type: "h2", text: "What it looks like" },
      {
        type: "p",
        text: "The demo pipeline turns messy e-commerce orders into daily revenue by region and customer segment. In one scenario I corrupt the region and segment columns in half of one stage’s output, far past its 10% threshold. The event log records what happened:",
      },
      {
        type: "code",
        lang: "json",
        text: `{"kind": "ROLLBACK", "block": "b6_enrich",
 "data": {"reason": "bad-row fraction 0.5011 exceeds threshold 0.1"}}
{"kind": "QUARANTINE", "block": "b6_enrich",
 "data": {"rows": 443, "rules": {"region:isin(['NA', 'EU'])": 222, "rollback": 221}}}
{"kind": "REROUTE", "block": "b8_aggregate",
 "data": {"upstream": "b6_enrich", "source": "b5_normalize", "adapter": "b5_to_b6_shape"}}`,
      },
      {
        type: "p",
        text: "That one run shows all three repairs. The broken stage’s output is never promoted, so its last good snapshot stays at the previous run. All 443 rows are kept: 222 under the rule that caught them, and 221 under “rollback” because the batch as a whole was rejected. The aggregate stage downstream reroutes through a declared fallback edge and reads this run’s upstream data through an adapter, so the revenue numbers stay current. The only thing lost is the segment breakdown, which is why that stage produces 98 rows instead of 130. A stage that doesn’t depend on the broken one isn’t affected at all.",
      },
      { type: "h2", text: "Getting the rows back" },
      {
        type: "p",
        text: "Once the stage is fixed, replay re-runs it on its quarantined records. Rows that now pass are marked as replayed and, if the stage declares a merge key, upserted into a copy of the last good snapshot. Replay only consumes records that are still quarantined, so running it twice changes nothing.",
      },
      { type: "h2", text: "Why not just fail loudly?" },
      {
        type: "p",
        text: "Failing loudly is right when nothing downstream can be trusted. But most failures are local: one stage, one column, one bad upstream feed. Stopping the whole pipeline for that makes the damage bigger than it is. Quarantine keeps the blast radius the size of the actual problem, and it keeps the evidence for whoever has to find out why.",
      },
      {
        type: "p",
        text: "That is where the LLM comes in. Guardian’s diagnose command builds an evidence bundle from what it stored: the failed rules, a sample of quarantined rows, schema and code changes since the last good run, and where each input came from. It asks a model for a root cause, and every claim in the answer has to cite an item in that bundle. An answer that cites something that isn’t there is rejected. The diagnosis is advisory only. It never edits code or promotes anything.",
      },
    ],
  },
  {
    slug: "what-a-react-loop-needs",
    title: "What a ReAct loop actually needs",
    excerpt:
      "I wrote a tool-calling agent with no framework to see what the loop really is. The loop is short; handling what goes wrong is the rest.",
    category: "Technical notes",
    date: "2026-10-28",
    readTime: 3,
    repo: "https://github.com/SaurabhDusane/miniagent",
    body: [
      {
        type: "p",
        text: "Agent frameworks are fine until you need to know exactly how a tool result gets fed back to the model, how the model decides it’s done, or what happens when it starts going in circles. I wrote miniagent to answer those questions for myself: a tool-calling ReAct agent on the raw Anthropic SDK, with no LangChain, no LangGraph and no agent framework. The whole loop is about 200 lines of Python.",
      },
      { type: "h2", text: "The loop" },
      {
        type: "list",
        ordered: true,
        items: [
          "Add the user’s message to memory.",
          "Call the model with the list of tools.",
          "If it stops on its own, return its answer.",
          "If it asks for tools, run each one and add the results to memory.",
          "Go back to step 2.",
        ],
      },
      {
        type: "code",
        lang: "text",
        text: `> Write a file called answer.txt containing the result of 123 * 456.

I wrote the result to answer.txt.
(iterations=3, stop_reason=end_turn)`,
      },
      {
        type: "p",
        text: "That is the whole idea. Everything else is handling the ways it goes wrong.",
      },
      { type: "h2", text: "What the loop needs besides the loop" },
      {
        type: "list",
        items: [
          "Errors are signals. A tool that throws doesn’t crash the agent. The exception goes back to the model as an error result, so it can try something else.",
          "Loop detection. If the model makes the same tool call twice in a row, the agent stops with stop_reason=loop_detected instead of burning tokens.",
          "Memory trimming. Once the conversation passes its token budget, the oldest tool calls and results are dropped first. The system prompt and the latest user message always stay.",
          "Isolation. Generated code runs in a separate Python process with a timeout, never inside the agent itself.",
        ],
      },
      {
        type: "p",
        text: "Tool schemas are built from each function’s signature and docstring, so adding a tool is one function. Every model response, tool call and finish event goes to a JSONL trace, so a bad run can be read step by step afterwards.",
      },
      { type: "h2", text: "What’s next" },
      {
        type: "p",
        text: "agent-compare rebuilds the same agent in LangGraph and runs both versions on identical tasks. I’ll write up what the framework adds, and what it costs, once the benchmark numbers are in.",
      },
    ],
  },

  // ─── Essays (Medium) ──────────────────────────────────────────────────────
  {
    slug: "ai-in-business-decision-making",
    title: "The Role of Artificial Intelligence in Top-Level Business Decision-Making",
    subtitle: "Necessity, Responsibility, and Human Factors",
    excerpt:
      "Where AI helps executive decisions, where it falls short, and why a person still has to answer for the call.",
    category: "Tech & AI",
    date: "2024-09-19",
    readTime: 4,
    featured: true,
    url: `${MEDIUM}/the-role-of-artificial-intelligence-in-top-level-business-decision-making-necessity-df3eb118a245`,
    summary:
      "AI can make business decisions better informed, but the essay argues for using it carefully: with clear accountability for outcomes, and with human judgment kept in the loop rather than replaced.",
    points: [
      "AI analyses large amounts of data quickly but lacks context and ethical judgment.",
      "When an AI-recommended decision causes harm, it is unclear who is accountable.",
      "AI struggles with situations it has never seen, so human creativity still matters.",
    ],
    quote: "Human creativity and adaptability remain invaluable in navigating uncharted territories and driving innovation.",
  },
  {
    slug: "respect-through-fear-vs-love",
    title: "Respect Through Fear vs. Respect Through Love",
    subtitle: "Impacts on Environment, Efficiency, and Family Dynamics",
    excerpt:
      "Respect built on fear gets quick compliance but costs trust; respect built on care holds up better, at work and at home.",
    category: "Ethics & reasoning",
    date: "2024-06-10",
    readTime: 3,
    url: `${MEDIUM}/respect-through-fear-vs-fa99026f9113`,
    summary:
      "A comparison of two ways respect gets earned. Fear produces obedience in the short term; respect that comes from care and trust produces people who actually want to cooperate, and the essay traces the difference through workplaces and families.",
    points: [
      "Fear brings short-term compliance but raises stress, weakens trust and suppresses initiative.",
      "Respect built on care leads to trust, open communication and people motivated from within.",
      "In families, fear strains the bond between parents and children, while empathy builds cooperation.",
    ],
    quote:
      "Fear-based respect may yield immediate compliance but often at the cost of long-term sustainability and emotional health.",
  },
  {
    slug: "spectrum-of-morality",
    title: "Exploring the Spectrum of Morality",
    subtitle: "Its Significance and Evolution in Modern Society",
    excerpt:
      "What morality is for in a connected, technology-heavy world, how it has changed, and how it bends in extreme circumstances.",
    category: "Ethics & reasoning",
    date: "2024-06-04",
    readTime: 3,
    url: `${MEDIUM}/exploring-the-spectrum-of-morality-its-significance-and-evolution-in-modern-society-073ebf334456`,
    summary:
      "Morality as the thing that lets strangers trust each other. The essay looks at why a globalised world needs it more, how it grew out of survival instincts into something shaped by culture and philosophy, and how scarcity tests it.",
    points: [
      "Morality builds the trust and cooperation a connected, technology-driven world depends on.",
      "It evolved from survival-based altruism into a mix of biology, culture and philosophy.",
      "Scarcity and abundance each raise their own moral dilemmas.",
    ],
    quote:
      "For instance, stealing food, while generally considered morally wrong, might be seen as justifiable in dire circumstances.",
  },
  {
    slug: "conscience-moral-compass",
    title: "Conscience: The Moral Compass of Humanity",
    excerpt: "How conscience works as an inner sense of right and wrong, and why it can be wrong too.",
    category: "Ethics & reasoning",
    date: "2024-05-25",
    readTime: 4,
    url: `${MEDIUM}/conscience-the-moral-compass-of-humanity-5c6431acfa61`,
    summary:
      "Conscience as a mix of reasoning, empathy and a sense of consequences, shaped by how and where we grow up. The essay takes its limits seriously: a conscience can be too strict, can clash with someone else’s, and can simply be biased.",
    points: [
      "Conscience combines reasoning, empathy and thinking ahead about consequences.",
      "An overly strict conscience causes guilt and anxiety, and different consciences can conflict.",
      "Because it can be biased, reflecting and taking other perspectives makes it better.",
    ],
    quote: "Conscience is not infallible.",
  },
  {
    slug: "the-unsolvable-paradox",
    title: "The Unsolvable Paradox",
    subtitle: "Rationality, Practicality, and Beyond",
    excerpt:
      "Six months after the first essay: the gap between the ideal choice and the workable one isn’t a problem to solve, but one to live with.",
    category: "Ethics & reasoning",
    date: "2024-05-19",
    readTime: 3,
    series: { id: "rationality", name: "Rationality and practicality", part: 2 },
    url: `${MEDIUM}/the-unsolvable-paradox-rationality-practicality-and-beyond-48e68c8546d6`,
    summary:
      "The follow-up to “Rationality vs Practicality”. Where the first essay looked for a balance between the two, this one argues the tension never fully goes away, and looks at what it costs us psychologically and how some philosophies make peace with it.",
    points: [
      "Ideal choices, like buying organic food, often run into cost and availability.",
      "Living with these conflicts brings cognitive dissonance, guilt and stress.",
      "Some Eastern philosophies treat accepting contradiction as a path to balance.",
    ],
    quote: "The unsolvable paradox is not a problem to be solved but a reality to be acknowledged.",
  },
  {
    slug: "bridging-cultures-us-india",
    title: "Bridging Cultures",
    subtitle: "Navigating the Dynamic Dichotomy between the United States and India",
    excerpt:
      "Where the US and India differ, from family and communication to religion and economics, and where the two are starting to meet.",
    category: "Culture & society",
    date: "2024-04-02",
    readTime: 3,
    url: `${MEDIUM}/bridging-cultures-navigating-the-dynamic-dichotomy-between-the-united-states-and-india-7bfde51db780`,
    summary:
      "A side-by-side look at two cultures: family and values, how people communicate, religion and philosophy, economic policy, technology and food. The differences are real, but the essay keeps finding places where each is borrowing from the other.",
    points: [
      "The US leans individualist while India centres the family, though urban India is shifting.",
      "Americans tend to communicate directly; Indians often rely more on context and subtlety.",
      "India’s economy moved from socialist principles toward market-driven policy after the 1990s.",
    ],
  },
  {
    slug: "deepfakes-global-pandemic",
    title: "The New Global Pandemic: Deepfakes",
    excerpt:
      "How deepfakes spread misinformation and fraud, with examples from India, and what regulation and public awareness can do about it.",
    category: "Tech & AI",
    date: "2023-11-17",
    readTime: 3,
    url: `${MEDIUM}/the-new-global-pandemic-deepfakes-cf644d5d4f26`,
    summary:
      "What deepfakes are and why they matter, told largely through India: misinformation, damaged reputations, fraud, and the risk to elections in a country with many languages. The essay ends on regulation, technical safeguards and public education.",
    points: [
      "Deepfakes spread misinformation, damage reputations and enable fraud.",
      "A 2020 Delhi election campaign used deepfaked messages in several languages, raising questions of consent.",
      "In a linguistically diverse country, deepfakes could inflame tensions or distort elections.",
    ],
    quote: "With deepfakes, the age-old saying, “Seeing is Believing”, is losing its credibility.",
  },
  {
    slug: "rationality-vs-practicality",
    title: "Rationality vs Practicality: A Modern Approach",
    excerpt:
      "Rationality and practicality as partners, not rivals: a good decision has to be sound in theory and workable in practice.",
    category: "Ethics & reasoning",
    date: "2023-11-07",
    readTime: 3,
    series: { id: "rationality", name: "Rationality and practicality", part: 1 },
    url: `${MEDIUM}/rationality-vs-practicality-a-modern-approach-f29259e53264`,
    summary:
      "The first of two essays on the same tension. This one treats rationality and practicality as complements, using examples from data-driven tech companies, lean startups and climate policy to show what balancing them looks like.",
    points: [
      "Rationality rests on evidence and data, like the recommendations large tech companies run on.",
      "Practicality asks what can actually be done within constraints, like a startup testing a minimum viable product.",
      "Climate policy shows the need to pair ambitious goals with gradual, feasible steps.",
    ],
    quote: "It’s about making decisions that are not just theoretically sound, but also practically feasible.",
  },
  {
    slug: "evolution-of-history",
    title: "Evolution of History through our Time",
    subtitle: "A Unbiased Perspective on Global History",
    excerpt:
      "How history moved from accounts written by conquerors toward more inclusive ones, and why bias still needs watching.",
    category: "Culture & society",
    date: "2023-09-03",
    readTime: 3,
    url: `${MEDIUM}/evolution-of-history-through-our-time-a-unbiased-perspective-on-global-history-e21b264f5cf0`,
    summary:
      "A short history of how history gets written: from chronicles by the powerful, through the Enlightenment and the rise of critical, evidence-based methods, to decolonisation and the internet widening whose stories get told.",
    points: [
      "Early chronicles by conquerors and dominant civilisations often cast others as inferior.",
      "Enlightenment thinkers and historians like Ranke pushed for critical, evidence-based methods.",
      "Decolonisation and digital access have broadened whose voices shape the record.",
    ],
  },
  {
    slug: "geopolitics-in-daily-life",
    title: "Geopolitics in Daily Life",
    excerpt:
      "How decisions between countries show up in everyday prices, shortages and work, and why it’s worth following them.",
    category: "Culture & society",
    date: "2023-05-30",
    readTime: 7,
    url: `${MEDIUM}/geopolitics-in-daily-life-e7b0d50a19ca`,
    summary:
      "Geopolitics brought down to the kitchen table: how international decisions move the price and supply of food, energy and medicine, why staying informed helps you see changes coming, and what it means for businesses working across borders.",
    points: [
      "International decisions change the price and availability of food, energy and medicine.",
      "Following reliable news helps people anticipate changes instead of reacting to them.",
      "Businesses need geopolitical awareness to handle trade rules, sanctions and overseas partners.",
    ],
    quote: "Conflicts abroad might also result in a lack of necessities like medicine or gasoline.",
  },
];

/** Milliseconds since epoch for sorting. */
export function articleTime(a: Article): number {
  const t = Date.parse(`${a.date}T00:00:00Z`);
  return Number.isNaN(t) ? 0 : t;
}

/** "Sep 19, 2024", or "Sep 19" with `withYear: false`. */
export function formatArticleDate(a: Article, { withYear = true } = {}): string {
  return new Date(`${a.date}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    ...(withYear ? { year: "numeric" } : {}),
    timeZone: "UTC",
  });
}

export function articleYear(a: Article): number {
  return Number(a.date.slice(0, 4));
}

/** Articles, newest first. */
export const articlesByDate: Article[] = [...articles].sort((a, b) => articleTime(b) - articleTime(a));

export const essays = articlesByDate.filter((a) => a.url);
export const notes = articlesByDate.filter((a) => a.body);

export function findArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

/** The other parts of an article's series, in part order. */
export function seriesParts(a: Article): Article[] {
  if (!a.series) return [];
  return articles.filter((x) => x.series?.id === a.series!.id).sort((x, y) => x.series!.part - y.series!.part);
}

/** Up to `n` related pieces: series siblings first, then the same category, then the newest. */
export function relatedArticles(a: Article, n = 3): Article[] {
  const picked: Article[] = [];
  const add = (list: Article[]) => {
    for (const x of list) if (x.slug !== a.slug && !picked.includes(x) && picked.length < n) picked.push(x);
  };
  add(seriesParts(a));
  add(articlesByDate.filter((x) => x.category === a.category));
  add(articlesByDate);
  return picked;
}
