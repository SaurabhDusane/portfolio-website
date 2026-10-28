"use client";

import { useEffect, useState } from "react";

interface Item {
  id: string;
  title: string;
}

/**
 * "On this page" list for case studies, shown in the right margin on wide
 * screens. Follows the reader with position: sticky and highlights the
 * section currently in view.
 */
export default function CaseStudyNav({ items }: { items: Item[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const headings = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => !!el);
    // The active section is the last heading that has scrolled past ~30% of the viewport.
    const update = () => {
      const line = window.innerHeight * 0.3;
      let current = headings[0]?.id;
      for (const h of headings) if (h.getBoundingClientRect().top <= line) current = h.id;
      setActive(current);
    };
    const first = requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(first);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [items]);

  return (
    <aside className="case-nav" aria-label="On this page">
      <nav className="case-nav-inner">
        <p className="t-small mb-2" style={{ color: "var(--text-muted)", fontWeight: 500 }}>
          On this page
        </p>
        <ul className="flex flex-col">
          {items.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className="case-nav-link" aria-current={active === item.id ? "location" : undefined}>
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
