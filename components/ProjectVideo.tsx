"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import type { ProjectVideo as Video } from "@/data/projects";

/**
 * A project's walkthrough. A YouTube video is a still image until it's played
 * (nothing loads from YouTube before that, and it uses youtube-nocookie); an
 * uploaded file loads only when played. The transcript is always on the page.
 */
export default function ProjectVideo({ video }: { video: Video }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="pv">
      <div className="pv-frame">
        {video.youtube ? (
          playing ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(video.youtube)}?autoplay=1&rel=0`}
              title={video.title}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <button type="button" className="pv-poster" onClick={() => setPlaying(true)} aria-label={`Play: ${video.title}`}>
              {/* eslint-disable-next-line @next/next/no-img-element -- remote thumbnail, shown only on this click-to-play poster */}
              <img src={video.poster ?? `https://i.ytimg.com/vi/${encodeURIComponent(video.youtube)}/hqdefault.jpg`} alt="" />
              <span className="pv-play">
                <Play size={22} aria-hidden="true" />
              </span>
            </button>
          )
        ) : (
          <video controls preload="none" poster={video.poster} src={video.src} aria-label={video.title} />
        )}
      </div>
      <p className="t-small mt-2">
        {video.title}
        {video.duration && <> · {video.duration}</>}
      </p>
      <details className="pv-transcript mt-3">
        <summary className="t-small">Transcript</summary>
        <p className="t-body mt-2">{video.transcript}</p>
      </details>
    </div>
  );
}
