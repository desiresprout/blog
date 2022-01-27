import { useState, useEffect, useRef } from 'react';

const baseOption = {
  root: null,
  threshold: 0.5,
  rootMargin: '0px',
};

const useIntersect = (callback: any, option?: IntersectionObserverInit) => {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const observer = useRef<IntersectionObserver>();

  const updateEntry = async ([entry]: IntersectionObserverEntry[]) => {
    if (entry.isIntersecting) {
      observer.current?.unobserve(entry.target);
      await callback();
      observer.current?.observe(entry.target);
    }
  };

  useEffect(() => {
    if (ref) {
      observer.current = new IntersectionObserver(updateEntry, {
        ...baseOption,
        ...option,
      });

      observer.current.observe(ref);
    }
    return () => observer && observer.current?.disconnect();
  }, [ref, option?.root, option?.threshold, option?.rootMargin]);
  return [setRef];
};

export { useIntersect };
