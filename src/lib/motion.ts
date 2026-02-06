import type { Variants, Transition } from 'framer-motion';

// ============================================================================
// SPRING CONFIGURATIONS
// Documented values from Motion docs: https://motion.dev/docs/react-transitions
// - stiffness (default: 1): Higher = more sudden movement
// - damping (default: 10): Opposing force. 0 = infinite oscillation
// - mass (default: 1): Higher = more lethargic
// - bounce (0-1): 0 = no bounce, 1 = extremely bouncy
// ============================================================================

/** Smooth Apple-style spring -- gentle deceleration, no overshoot */
export const springSmooth = {
  type: 'spring' as const,
  stiffness: 120,
  damping: 20,
  mass: 1,
} as const;

/** Snappy micro-interaction spring -- fast response for buttons/toggles */
export const springSnappy = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 30,
  mass: 0.8,
} as const;

/** Bouncy spring -- playful entrance animations */
export const springBouncy = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 15,
  mass: 1,
} as const;

/** Gentle spring -- slow, elegant transitions (page, modals) */
export const springGentle = {
  type: 'spring' as const,
  stiffness: 80,
  damping: 20,
  mass: 1.2,
} as const;

/** Duration-based spring using visualDuration + bounce (easier to tune) */
export const springDuration = {
  type: 'spring' as const,
  visualDuration: 0.4,
  bounce: 0.2,
} as const;

// Backward-compatible aliases (used by existing components)
export const appleSpring = { stiffness: 120, damping: 20 } as const;
export const microSpring = { stiffness: 400, damping: 30 } as const;
export const bouncySpring = { stiffness: 300, damping: 15 } as const;

// ============================================================================
// EASING CURVES
// https://motion.dev/docs/react-transitions#ease
// ============================================================================

/** Apple's signature ease -- fast start, gentle deceleration */
export const appleEase = [0.4, 0, 0.2, 1] as [number, number, number, number];

/** Enter ease -- responsive feel per Emil Kowalski's recommendation */
export const easeEnter = [0.0, 0.0, 0.2, 1] as [number, number, number, number];

/** Exit ease -- gentle start, fast end */
export const easeExit = [0.4, 0, 1, 1] as [number, number, number, number];

/** Dramatic ease -- strong deceleration for hero elements */
export const easeDramatic = [0.16, 1, 0.3, 1] as [number, number, number, number];

// ============================================================================
// STANDARD TRANSITIONS
// ============================================================================

export const appleTransition: Transition = {
  duration: 0.6,
  ease: appleEase,
};

export const fastTransition: Transition = {
  duration: 0.3,
  ease: easeEnter,
};

export const slowTransition: Transition = {
  duration: 0.8,
  ease: easeDramatic,
};

// ============================================================================
// SCROLL REVEAL VARIANTS
// https://motion.dev/docs/react-scroll-animations
// Use with whileInView + viewport={{ once: true }}
// ============================================================================

/**
 * Fade + slide up -- spread directly onto motion components.
 * Usage: <motion.div {...fadeInUp}>
 */
export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6, ease: appleEase },
};

/** Fade + slide from left (direct-prop spread) */
export const fadeInLeft = {
  initial: { opacity: 0, x: -40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6, ease: appleEase },
};

/** Fade + slide from right (direct-prop spread) */
export const fadeInRight = {
  initial: { opacity: 0, x: 40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6, ease: appleEase },
};

/** Scale up from slightly smaller (direct-prop spread) */
export const scaleIn = {
  initial: { opacity: 0, scale: 0.92 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.5, ease: appleEase },
};

/** Blur-to-clear reveal (direct-prop spread) */
export const blurIn = {
  initial: { opacity: 0, filter: 'blur(10px)', y: 10 },
  whileInView: { opacity: 1, filter: 'blur(0px)', y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.7, ease: appleEase },
};

// --- Variants versions (for use with initial="hidden" whileInView="visible") ---

export const scrollRevealVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: appleEase },
  },
};

export const blurInVariants: Variants = {
  hidden: { opacity: 0, filter: 'blur(10px)', y: 10 },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: { duration: 0.7, ease: appleEase },
  },
};

// ============================================================================
// STAGGER CONTAINER + ITEM
// https://motion.dev/docs/react-transitions#delaychildren
// Parent uses staggerChildren; children define their own hidden/visible.
// ============================================================================

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: appleEase },
  },
};

export const staggerItemScale: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 15 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { ...springDuration },
  },
};

// ============================================================================
// HERO ENTRANCE SEQUENCE
// Timeline: title words -> subtitle -> CTAs -> scroll indicator
// Uses stagger + individual delays for cinematic feel
// ============================================================================

export const heroEntrance = {
  container: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  } satisfies Variants,

  /** Each word fades + slides up with blur clear */
  word: {
    hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: easeDramatic },
    },
  } satisfies Variants,

  subtitle: {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: appleEase, delay: 0.6 },
    },
  } satisfies Variants,

  cta: {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: appleEase, delay: 0.9 },
    },
  } satisfies Variants,

  scrollIndicator: {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: appleEase, delay: 1.2 },
    },
  } satisfies Variants,
};

// Keep backward-compat alias
export const wordReveal = {
  container: heroEntrance.container,
  word: heroEntrance.word,
};

// ============================================================================
// CHAPTER CARD SCROLL REVEAL (stagger from bottom)
// ============================================================================

export const chapterCardReveal = {
  container: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  } satisfies Variants,

  card: {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: appleEase,
      },
    },
  } satisfies Variants,
};

// ============================================================================
// SHOWCASE CARD 3D TILT HOVER
// Mouse-position-based 3D rotation. Use with onMouseMove handler.
// rotateX/rotateY driven by useMotionValue + useTransform in component.
// ============================================================================

export const cardTilt3D = {
  /** Rest state for whileHover reset */
  rest: {
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    transition: { ...springSmooth },
  },
  /** Hover lift effect (combine with mouse-based rotateX/Y via style) */
  hover: {
    scale: 1.03,
    boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
    transition: { ...springSnappy },
  },
} satisfies Record<string, object>;

/** Perspective wrapper style -- apply to parent of 3D-tilting cards */
export const perspective3DStyle = {
  perspective: 800,
  transformStyle: 'preserve-3d' as const,
};

// ============================================================================
// STATS COUNTER BLUR-TO-CLEAR
// ============================================================================

export const statsReveal = {
  container: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  } satisfies Variants,

  stat: {
    hidden: { opacity: 0, filter: 'blur(12px)', scale: 0.9 },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      scale: 1,
      transition: { duration: 0.8, ease: easeDramatic },
    },
  } satisfies Variants,
};

// ============================================================================
// CARD HOVER & TAP
// https://motion.dev/docs/react-gestures
// ============================================================================

export const cardHover = {
  whileHover: {
    y: -4,
    transition: { ...springSnappy },
  },
};

export const cardHoverGlow = {
  whileHover: {
    y: -6,
    boxShadow: '0 16px 32px rgba(0,0,0,0.12)',
    transition: { ...springSnappy },
  },
};

export const tapScale = {
  whileTap: { scale: 0.97 },
};

export const buttonHover = {
  whileHover: {
    scale: 1.02,
    transition: { ...springSnappy },
  },
  whileTap: { scale: 0.97 },
};

// ============================================================================
// LAYOUT ANIMATION VARIANTS
// https://motion.dev/docs/react-layout-animations
// Use with <motion.div layout /> and layoutId for shared elements.
// ============================================================================

/** Nav indicator (active tab underline) -- use layoutId="nav-indicator" */
export const navIndicatorTransition: Transition = {
  type: 'spring',
  stiffness: 500,
  damping: 35,
};

/** Page transition variants for AnimatePresence */
export const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3, ease: appleEase },
};

/** Slide-based page transition */
export const pageSlideTransition = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
  transition: { duration: 0.35, ease: appleEase },
};

/** Layout transition for modals/dialogs (use on layoutId element) */
export const modalLayoutTransition: Transition = {
  layout: { duration: 0.3, ease: appleEase },
  default: { duration: 0.3, ease: appleEase },
};

// ============================================================================
// JOURNEY TIMELINE (horizontal scroll reveal)
// Each step fades in as user scrolls horizontally.
// Use with useScroll({ container }) + useTransform for x-offset.
// ============================================================================

export const journeyTimeline = {
  container: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  } satisfies Variants,

  step: {
    hidden: { opacity: 0, x: 60, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.6, ease: appleEase },
    },
  } satisfies Variants,
};

// ============================================================================
// PARALLAX LAYER VARIANTS (multi-speed parallax)
// Use with useScroll + useTransform to map scrollYProgress to y offset.
// Speed multiplier determines distance: higher = more movement.
// ============================================================================

/** Parallax speed presets for useTransform mapping */
export const parallaxSpeeds = {
  /** Background layer -- moves slowest (subtle depth) */
  slow: 0.15,
  /** Default mid-ground speed */
  medium: 0.3,
  /** Foreground layer -- moves fastest (strong depth) */
  fast: 0.5,
  /** Hero background image parallax */
  hero: 0.2,
} as const;

// ============================================================================
// SCROLL PROGRESS BAR
// https://motion.dev/docs/react-scroll-animations#scroll-linked-animations
// Use useScroll() + useSpring for smooth progress indicator.
// ============================================================================

/** Spring config for scroll progress smoothing (via useSpring) */
export const scrollProgressSpring = {
  stiffness: 100,
  damping: 30,
  restDelta: 0.001,
} as const;

// ============================================================================
// SHIMMER & DECORATIVE
// ============================================================================

export const shimmerKeyframes = {
  '0%': { backgroundPosition: '-200% center' },
  '100%': { backgroundPosition: '200% center' },
};

/** Pulse glow for active/live indicators */
export const pulseGlow: Variants = {
  initial: { opacity: 0.6, scale: 1 },
  animate: {
    opacity: [0.6, 1, 0.6],
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

/** Floating animation for decorative elements */
export const floatingAnimation: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-5, 5, -5],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// ============================================================================
// PERFORMANCE NOTES
// - All layout animations use CSS transform (GPU-accelerated)
// - Use layout="position" for elements changing aspect ratio
// - Set will-change: transform on frequently animated elements via CSS
// - Use layoutScroll on scrollable parents of layout-animated children
// - Use useSpring to smooth scroll-linked values (prevents jank)
// - Prefer whileInView + viewport={{ once: true }} for one-shot reveals
// ============================================================================

// ============================================================================
// CHAPTER GRADIENT MAP
// ============================================================================

export const chapterGradients: Record<number, string> = {
  1: 'var(--chapter-1-gradient)',
  2: 'var(--chapter-2-gradient)',
  3: 'var(--chapter-3-gradient)',
  4: 'var(--chapter-4-gradient)',
  5: 'var(--chapter-5-gradient)',
  6: 'var(--chapter-6-gradient)',
  7: 'var(--chapter-7-gradient)',
  8: 'var(--chapter-8-gradient)',
};
