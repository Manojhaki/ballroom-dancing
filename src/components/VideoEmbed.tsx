/* ─────────────────────────────────────────────────────────
 * ANIMATION STORYBOARD — video embed entrance
 *
 *   0ms   frame fades in, scale 0.96 → 1.0 (on mount; these
 *         embeds sit above the fold, so no scroll trigger needed)
 * ───────────────────────────────────────────────────────── */

import { motion } from 'motion/react';

const FRAME = {
  initialScale: 0.96,
  spring: { type: 'spring' as const, stiffness: 300, damping: 30 },
};

const CHANNEL_URL = 'https://www.youtube.com/@PartTimeBallroomDancing';

interface VideoEmbedProps {
  videoId: string;
  title: string;
  orientation: 'horizontal' | 'vertical';
  isOwn: boolean;
}

export default function VideoEmbed({ videoId, title, orientation, isOwn }: VideoEmbedProps) {
  return (
    <div>
      {isOwn && (
        <span className="mb-2 inline-block rounded-full bg-gold-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gold-800">
          Danced by me
        </span>
      )}
      <motion.div
        initial={{ opacity: 0, scale: FRAME.initialScale }}
        animate={{ opacity: 1, scale: 1 }}
        transition={FRAME.spring}
        className={`overflow-hidden rounded-2xl border border-maroon-200 bg-black shadow-sm ${
          orientation === 'vertical' ? 'mx-auto aspect-[9/16] max-w-xs' : 'aspect-video w-full'
        }`}
      >
        <iframe
          className="h-full w-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </motion.div>
      <p className="mt-2 text-sm text-maroon-700/70">
        {title}.{' '}
        <a
          href={`https://www.youtube.com/watch?v=${videoId}`}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-maroon-800 underline hover:text-maroon-900"
        >
          {isOwn ? 'watch on YouTube' : 'open on YouTube'}
        </a>
        {isOwn && (
          <>
            {' · '}
            <a
              href={CHANNEL_URL}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-maroon-800 underline hover:text-maroon-900"
            >
              more on my channel
            </a>
          </>
        )}
      </p>
    </div>
  );
}
