import { useState, useEffect, useRef } from 'react';

interface ScrollState {
  isScrolled: boolean;
  scrollY: number;
  scrollDirection: 'up' | 'down';
}

export function useScrollState(threshold = 50): ScrollState {
  const [state, setState] = useState<ScrollState>({
    isScrolled: false,
    scrollY: 0,
    scrollDirection: 'down',
  });
  const prevScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setState({
        isScrolled: currentY > threshold,
        scrollY: currentY,
        scrollDirection: currentY > prevScrollY.current ? 'down' : 'up',
      });
      prevScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return state;
}
