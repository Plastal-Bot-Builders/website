import { useEffect, useRef } from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { decryptDisabled, decryptElement, OWNED_ATTR } from '../../lib/decrypt';

interface DecryptedTextProps extends HTMLMotionProps<'span'> {
     text: string;
     /** Classes for the text itself. */
     className?: string;
     /** Classes for the wrapper (e.g. "block"). */
     parentClassName?: string;
     /** 'view': once, when it scrolls into view. 'hover': each time the pointer enters. 'both': both. */
     animateOn?: 'view' | 'hover' | 'both';
     /** Kept for older call sites; the reveal always runs from the start of the text. */
     revealDirection?: 'start' | 'end' | 'center';
     /** Total time in ms (defaults to a length-based time). */
     duration?: number;
}

/**
 * A piece of text that resolves from scrambled glyphs, left to right (see src/lib/decrypt.ts).
 *
 * Most body text on the site gets this effect without the component: App.tsx runs it page-wide. Use the component
 * for text outside a paragraph or list item, or for the hover effect.
 */
export default function DecryptedText({
     text,
     className = '',
     parentClassName = '',
     animateOn = 'hover',
     revealDirection: _revealDirection,
     duration,
     ...props
}: DecryptedTextProps) {
     const ref = useRef<HTMLSpanElement>(null);
     const stopRef = useRef<(() => void) | null>(null);

     const run = () => {
          const el = ref.current;
          if (!el || decryptDisabled()) return;
          stopRef.current?.();
          stopRef.current = decryptElement(el, { duration, skipOwned: false });
     };

     useEffect(() => {
          const el = ref.current;
          if (!el || (animateOn !== 'view' && animateOn !== 'both') || typeof IntersectionObserver === 'undefined') return;
          const io = new IntersectionObserver(
               entries => {
                    if (entries.some(e => e.isIntersecting)) {
                         io.disconnect();
                         run();
                    }
               },
               { rootMargin: '0px 0px -8% 0px', threshold: 0 },
          );
          io.observe(el);
          return () => io.disconnect();
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [animateOn, text]);

     useEffect(() => () => stopRef.current?.(), []);

     const hoverProps = animateOn === 'hover' || animateOn === 'both' ? { onMouseEnter: run } : {};

     return (
          <motion.span
               ref={ref}
               className={parentClassName}
               style={{ display: 'inline-block', whiteSpace: 'pre-wrap' }}
               {...{ [OWNED_ATTR]: '' }}
               {...hoverProps}
               {...props}
          >
               <span className={className}>{text}</span>
          </motion.span>
     );
}
