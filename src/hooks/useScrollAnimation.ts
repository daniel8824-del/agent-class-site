import { useRef, useCallback } from 'react';
import {
  useInView,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useAnimation,
} from 'framer-motion';
import {
  scrollRevealVariants,
  parallaxSpeeds,
  scrollProgressSpring,
  springSmooth,
} from '@/lib/motion';
import type { Variants, MotionValue } from 'framer-motion';

// ============================================================================
// useScrollReveal
// Triggers variant animation when element enters viewport.
// https://motion.dev/docs/react-scroll-animations#scroll-triggered-animations
// ============================================================================

interface ScrollRevealResult {
  ref: React.RefObject<HTMLElement | null>;
  controls: ReturnType<typeof useAnimation>;
  variants: Variants;
  inView: boolean;
}

export function useScrollReveal(
  variants: Variants = scrollRevealVariants,
  options: { once?: boolean; margin?: string } = {},
): ScrollRevealResult {
  const { once = true, margin = '-50px' } = options;
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once, margin: margin as `${number}px` });
  const controls = useAnimation();

  if (inView) {
    controls.start('visible');
  }

  return { ref, controls, variants, inView };
}

// ============================================================================
// useParallax
// Maps element scroll progress to a y-offset for parallax depth.
// https://motion.dev/docs/react-scroll-animations#scroll-linked-animations
// ============================================================================

interface ParallaxResult {
  ref: React.RefObject<HTMLElement | null>;
  y: MotionValue<number>;
}

export function useParallax(
  speed: number | keyof typeof parallaxSpeeds = 'medium',
): ParallaxResult {
  const multiplier = typeof speed === 'string' ? parallaxSpeeds[speed] : speed;
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [-100 * multiplier, 100 * multiplier],
  );

  return { ref, y };
}

// ============================================================================
// useScrollProgress
// Returns smoothed scroll progress (0-1) for the entire page.
// Use for reading progress bars: <motion.div style={{ scaleX }} />
// https://motion.dev/docs/react-scroll-animations#value-smoothing
// ============================================================================

export function useScrollProgress(): MotionValue<number> {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, scrollProgressSpring);
  return scaleX;
}

// ============================================================================
// useElementScrollProgress
// Returns smoothed scroll progress for a specific element within viewport.
// Useful for section-specific animations.
// ============================================================================

interface ElementScrollResult {
  ref: React.RefObject<HTMLElement | null>;
  progress: MotionValue<number>;
  smoothProgress: MotionValue<number>;
}

export function useElementScrollProgress(
  offset: [string, string] = ['start end', 'end start'],
): ElementScrollResult {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: offset as any });
  const smoothProgress = useSpring(scrollYProgress, scrollProgressSpring);

  return { ref, progress: scrollYProgress, smoothProgress };
}

// ============================================================================
// useScrollTransform
// Maps scroll progress to arbitrary output values (colors, scale, etc).
// https://motion.dev/docs/react-scroll-animations#transform-other-values
// ============================================================================

export function useScrollTransform<T>(
  inputRange: number[],
  outputRange: T[],
): { ref: React.RefObject<HTMLElement | null>; value: MotionValue<T> } {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const value = useTransform(scrollYProgress, inputRange, outputRange);

  return { ref, value };
}

// ============================================================================
// useCardTilt
// Mouse-position-based 3D rotation for showcase cards.
// Returns motion values for rotateX/rotateY + onMouseMove/onMouseLeave handlers.
// ============================================================================

interface CardTiltResult {
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
  onMouseMove: (e: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave: () => void;
  style: {
    rotateX: MotionValue<number>;
    rotateY: MotionValue<number>;
    transformStyle: 'preserve-3d';
  };
}

export function useCardTilt(maxTilt = 12): CardTiltResult {
  const rotateXRaw = useMotionValue(0);
  const rotateYRaw = useMotionValue(0);

  const rotateX = useSpring(rotateXRaw, springSmooth);
  const rotateY = useSpring(rotateYRaw, springSmooth);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const percentX = (e.clientX - centerX) / (rect.width / 2);
      const percentY = (e.clientY - centerY) / (rect.height / 2);

      rotateYRaw.set(percentX * maxTilt);
      rotateXRaw.set(-percentY * maxTilt);
    },
    [maxTilt, rotateXRaw, rotateYRaw],
  );

  const onMouseLeave = useCallback(() => {
    rotateXRaw.set(0);
    rotateYRaw.set(0);
  }, [rotateXRaw, rotateYRaw]);

  return {
    rotateX,
    rotateY,
    onMouseMove,
    onMouseLeave,
    style: {
      rotateX,
      rotateY,
      transformStyle: 'preserve-3d' as const,
    },
  };
}
