/**
 * PageTransition — wraps page content with a quick fade + slight rise entrance.
 * Key it by pathname so it re-fires on each route change. Under 250ms, and
 * drops the movement (and any delay) when the user prefers reduced motion.
 */
"use client";

import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export default function PageTransition({
  children,
  className = "",
}: PageTransitionProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0 : 0.22, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
