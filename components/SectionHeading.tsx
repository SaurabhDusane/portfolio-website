/**
 * SectionHeading — consistent section title with colored icon.
 * Fades in from left on scroll into viewport.
 */
"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface SectionHeadingProps {
  icon: ReactNode;
  title: string;
  /** Accent color applied to the icon (hex) */
  iconColor?: string;
}

export default function SectionHeading({
  icon,
  title,
  iconColor = "#8b5cf6",
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="flex items-center gap-3 mb-4"
    >
      <span style={{ color: iconColor }} aria-hidden="true">
        {icon}
      </span>
      <h2
        className="text-xl font-bold text-white/90"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {title}
      </h2>
    </motion.div>
  );
}
