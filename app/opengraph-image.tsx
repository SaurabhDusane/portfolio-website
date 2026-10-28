import { ogCard, ogSize } from "@/lib/og";

export const dynamic = "force-static";
export const alt = "Saurabh Nilesh Dusane — AI/ML Engineer";
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return ogCard({
    eyebrow: "SD",
    title: "Saurabh Nilesh Dusane",
    highlight: "AI/ML Engineer",
    body: "Agents built from scratch, and data pipelines that survive captchas, rate limits, and silent failures.",
    footer: "saurabhdusane.com",
  });
}
