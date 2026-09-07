import React, { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 800);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          // Entrance starts near full size, never from nothing.
          initial={{ opacity: 0, transform: 'scale(0.94)' }}
          animate={{ opacity: 1, transform: 'scale(1)' }}
          exit={{ opacity: 0, transform: 'scale(0.94)' }}
          transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
                ? 'auto'
                : 'smooth',
            })
          }
          aria-label="Back to top"
          className="material-panel press fixed bottom-6 right-6 z-40 flex size-10 items-center justify-center rounded-full border border-line text-ink"
        >
          <ChevronUp className="size-[18px]" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
