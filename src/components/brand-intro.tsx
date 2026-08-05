"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { siteConfig } from "@/src/config/site";
import { Image } from "./image";

export function BrandIntro() {
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (sessionStorage.getItem("sk:intro-seen")) return;
    sessionStorage.setItem("sk:intro-seen", "1");
    const reveal = window.setTimeout(() => setVisible(true), 0);
    const timer = window.setTimeout(() => setVisible(false), reduced ? 250 : 1900);
    return () => { window.clearTimeout(reveal); window.clearTimeout(timer); };
  }, [reduced]);
  return (
    <AnimatePresence>
      {visible && (
        <motion.div className="brand-intro" initial={{ opacity: 1 }} exit={{ y: "-100%" }} transition={{ duration: reduced ? 0.1 : 0.72, ease: [0.76, 0, 0.24, 1] }}>
          <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}>
            <Image src={siteConfig.brand.monogramIvory} alt="" width={180} height={180} priority />
            <span>{siteConfig.displayName}</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
