"use client";

import { useEffect, useState } from "react";

function format(timeZone: string) {
  return new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone });
}

/**
 * "It's 3:40 pm for me (Arizona time)." The time only exists in the browser,
 * so the server renders the zone alone and the clock fills in after mount,
 * then ticks each minute.
 */
export default function LocalTime({ timeZone, label }: { timeZone: string; label: string }) {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setNow(format(timeZone).replace("AM", "am").replace("PM", "pm"));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, [timeZone]);

  return now ? (
    <>
      It’s <time className="tabular-nums" style={{ color: "var(--text)" }}>{now}</time> for me ({label}).
    </>
  ) : (
    <>I’m on {label}.</>
  );
}
