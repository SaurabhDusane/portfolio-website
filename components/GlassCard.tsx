/**
 * GlassCard — reusable glassmorphism container.
 * Wraps children in a translucent card with optional hover lift and accent edge.
 */
"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef, type ReactNode } from "react";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  /** Show the gradient accent line at the top */
  accent?: boolean;
  /** Enable hover lift + glow effect (default true) */
  hover?: boolean;
  className?: string;
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, accent = false, hover = true, className = "", ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={`glass ${accent ? "glass-accent" : ""} relative overflow-hidden ${
          hover ? "hover:-translate-y-1" : ""
        } ${className}`}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

GlassCard.displayName = "GlassCard";
export default GlassCard;
