import { projects } from "@/data";
import { ogCard, ogSize } from "@/lib/og";

export const alt = "Project by Saurabh Dusane";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectOgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return ogCard({
    eyebrow: "Saurabh Dusane · Project",
    title: project?.title ?? "Project",
    highlight: project?.stat,
    body: project?.summary,
    footer: "saurabhdusane.com/projects",
  });
}
