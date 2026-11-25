"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUp, Loader2, Sparkles } from "lucide-react";
import { track } from "@/lib/analytics";

const EXAMPLES = ["Has he worked with Dagster?", "What has he built with LangGraph?", "Is he open to contract roles?"];

interface Answer {
  answer?: string;
  sources?: { title: string; url: string }[];
  error?: string;
}

/**
 * "Ask about my work": a question box backed by /api/ask, which answers only
 * from the site's own pages and links the ones it used. Rendered only when the
 * build has the assistant switched on (NEXT_PUBLIC_ASK_ENABLED, see next.config.ts).
 */
export default function AskBox({ className = "" }: { className?: string }) {
  const [question, setQuestion] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<Answer | null>(null);

  if (process.env.NEXT_PUBLIC_ASK_ENABLED !== "1") return null;

  const ask = async (q: string) => {
    const text = q.trim();
    if (!text || busy) return;
    setQuestion(text);
    setBusy(true);
    setResult(null);
    track("Ask", { page: location.pathname });
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ question: text }),
      });
      setResult((await res.json()) as Answer);
    } catch {
      setResult({ error: "Couldn't reach the assistant. Check your connection and try again." });
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className={`ask ${className}`} aria-labelledby="ask-heading">
      <h2 id="ask-heading" className="ask-title">
        <Sparkles size={16} aria-hidden="true" /> Ask about my work
      </h2>
      <p className="t-small mt-1">
        Answers come only from this site, with links to the pages they&apos;re based on. For anything else,{" "}
        <Link href="/contact" className="link">
          write to me
        </Link>
        .
      </p>
      <form
        className="ask-form mt-3"
        onSubmit={(e) => {
          e.preventDefault();
          ask(question);
        }}
      >
        <label htmlFor="ask-question" className="sr-only">
          Your question
        </label>
        <input
          id="ask-question"
          className="field"
          value={question}
          maxLength={400}
          placeholder="e.g. Has he built data pipelines in production?"
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button type="submit" className="btn btn-primary" disabled={busy || !question.trim()} aria-label="Ask">
          {busy ? <Loader2 size={16} className="animate-spin" aria-hidden="true" /> : <ArrowUp size={16} aria-hidden="true" />}
        </button>
      </form>
      {!result && !busy && (
        <div className="ask-examples mt-3">
          {EXAMPLES.map((q) => (
            <button key={q} type="button" className="ask-example" onClick={() => ask(q)}>
              {q}
            </button>
          ))}
        </div>
      )}
      <div aria-live="polite">
        {result?.error && <p className="ask-error mt-3">{result.error}</p>}
        {result?.answer && (
          <div className="ask-answer mt-3">
            <p>{result.answer}</p>
            {result.sources && result.sources.length > 0 && (
              <p className="t-small mt-2">
                Based on:{" "}
                {result.sources.map((s, i) => (
                  <span key={s.url}>
                    {i > 0 && ", "}
                    <Link href={s.url} className="link">
                      {s.title}
                    </Link>
                  </span>
                ))}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
