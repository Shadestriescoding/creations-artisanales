import { useState, useEffect, useCallback } from 'react';

const useProgressiveLoading = (options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '50px',
    delay = 100,
    batchSize = 3,
  } = options;

  const [visibleSections, setVisibleSections] = useState(new Set());
  const [loadedSections, setLoadedSections] = useState(new Set());
  const [observers, setObservers] = useState(new Map());

  const handleIntersection = useCallback(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setVisibleSections(
          prev => new Set([...prev, entry.target.dataset.section])
        );
      }
    });
  }, []);

  useEffect(() => {
    const loadNextBatch = () => {
      const visibleArray = Array.from(visibleSections);
      const loadedArray = Array.from(loadedSections);
      const notLoadedVisible = visibleArray.filter(
        section => !loadedArray.includes(section)
      );

      if (notLoadedVisible.length > 0) {
        const nextBatch = notLoadedVisible.slice(0, batchSize);
        setLoadedSections(prev => new Set([...prev, ...nextBatch]));
      }
    };

    const timer = setTimeout(loadNextBatch, delay);
    return () => clearTimeout(timer);
  }, [visibleSections, loadedSections, batchSize, delay]);

  const observeSection = useCallback(
    (element, sectionId) => {
      if (!element || observers.has(sectionId)) return;

      const observer = new IntersectionObserver(handleIntersection, {
        threshold,
        rootMargin,
      });

      element.dataset.section = sectionId;
      observer.observe(element);

      setObservers(prev => new Map([...prev, [sectionId, observer]]));

      return () => {
        observer.disconnect();
        setObservers(prev => {
          const newMap = new Map(prev);
          newMap.delete(sectionId);
          return newMap;
        });
      };
    },
    [handleIntersection, observers, threshold, rootMargin]
  );

  const isLoaded = useCallback(
    sectionId => {
      return loadedSections.has(sectionId);
    },
    [loadedSections]
  );

  const shouldRender = useCallback(
    sectionId => {
      return loadedSections.has(sectionId) || visibleSections.has(sectionId);
    },
    [loadedSections, visibleSections]
  );

  useEffect(() => {
    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [observers]);

  return {
    observeSection,
    isLoaded,
    shouldRender,
    visibleSections: Array.from(visibleSections),
    loadedSections: Array.from(loadedSections),
  };
};

export default useProgressiveLoading;
