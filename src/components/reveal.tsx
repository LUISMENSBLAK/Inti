"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return (
    <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 34, clipPath: "inset(0 0 20% 0)" }} whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.85, delay, ease: [0.76, 0, 0.24, 1] }}>
      {children}
    </motion.div>
  );
}
