"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  title: string;
  iconColor?: string;
}

export default function SectionHeading({ icon, title, iconColor = "#6366f1" }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex items-center gap-3 mb-6"
    >
      <span style={{ color: iconColor }}>{icon}</span>
      <h2
        className="text-xl font-bold text-white/90"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {title}
      </h2>
    </motion.div>
  );
}
