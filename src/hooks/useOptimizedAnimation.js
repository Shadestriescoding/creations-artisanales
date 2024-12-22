import { useState, useEffect, useCallback } from 'react';

const useOptimizedAnimation = (options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '50px',
    shouldAnimate = true,
    reduceMotion = false
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const [element, setElement] = useState(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Vérifier les préférences de réduction de mouvement
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const callback = useCallback((entries) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  }, []);

  const setRef = useCallback((node) => {
    if (node !== null) {
      setElement(node);
    }
  }, []);

  useEffect(() => {
    if (element && shouldAnimate && !reduceMotion && !prefersReducedMotion) {
      const observer = new IntersectionObserver(callback, {
        threshold,
        rootMargin
      });

      observer.observe(element);

      return () => {
        if (element) {
          observer.unobserve(element);
        }
      };
    } else if (element && (!shouldAnimate || reduceMotion || prefersReducedMotion)) {
      setIsVisible(true);
    }
  }, [callback, element, threshold, rootMargin, shouldAnimate, reduceMotion, prefersReducedMotion]);

  const getAnimationProps = useCallback(() => {
    if (!shouldAnimate || reduceMotion || prefersReducedMotion) {
      return {
        initial: false,
        animate: false
      };
    }

    return {
      initial: "hidden",
      animate: isVisible ? "visible" : "hidden",
      variants: {
        hidden: { 
          opacity: 0,
          y: 20
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: "easeOut"
          }
        }
      }
    };
  }, [isVisible, shouldAnimate, reduceMotion, prefersReducedMotion]);

  return {
    setRef,
    isVisible,
    getAnimationProps,
    prefersReducedMotion
  };
};

export default useOptimizedAnimation; 