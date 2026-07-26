import { motion } from 'motion/react';
import type { ReactNode } from 'react';

/* ─────────────────────────────────────────────────────────
 * ANIMATION STORYBOARD — scroll-into-view card reveal
 *
 *   0ms   grid scrolls into view (fires once, margin -80px early)
 *   0ms   first card fades in, slides up 20px → 0
 *  80ms   second card starts (staggered by REVEAL.stagger)
 * 160ms   third card starts
 *  ...    one card every REVEAL.stagger seconds
 * ───────────────────────────────────────────────────────── */
const REVEAL = {
  offsetY: 20, // px each card slides up from
  stagger: 0.08, // seconds between each card's entrance
  spring: { type: 'spring' as const, stiffness: 300, damping: 30 },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: REVEAL.stagger } },
};

const item = {
  hidden: { opacity: 0, y: REVEAL.offsetY },
  show: { opacity: 1, y: 0, transition: REVEAL.spring },
};

export function RevealGrid({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children }: { children: ReactNode }) {
  return <motion.div variants={item}>{children}</motion.div>;
}
