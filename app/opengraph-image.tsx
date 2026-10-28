import { ogCard, ogSize } from "@/lib/og";

export const dynamic = "force-static";
export const alt = "Saurabh Nilesh Dusane — ML, AI & Data Engineer";
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return ogCard({
    eyebrow: "SD",
    title: "Saurabh Nilesh Dusane",
    highlight: "ML, AI & Data Engineer",
    body: "Data pipelines, models, and agents that keep working outside the notebook.",
    footer: "saurabhdusane.com",
  });
}
