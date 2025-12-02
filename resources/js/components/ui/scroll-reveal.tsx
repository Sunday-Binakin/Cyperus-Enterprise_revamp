import { ReactNode, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
}

export default function ScrollReveal({ children, direction = 'up', delay = 0 }: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const getInitialOffset = () => {
    switch (direction) {
      case 'up':
        return { y: 50, x: 0 };
      case 'down':
        return { y: -50, x: 0 };
      case 'left':
        return { x: -50, y: 0 };
      case 'right':
        return { x: 50, y: 0 };
      default:
        return { y: 50, x: 0 };
    }
  };

  const initialOffset = getInitialOffset();

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        x: initialOffset.x,
        y: initialOffset.y
      }}
      animate={{
        opacity: isInView ? 1 : 0,
        y: isInView ? 0 : initialOffset.y,
        x: isInView ? 0 : initialOffset.x
      }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
    >
      {children}
    </motion.div>
  );
}

