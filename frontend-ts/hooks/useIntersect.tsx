import { useState, useEffect, useCallback } from 'react';

const baseOption = {
  root: null,
  threshold: 0.5,
  rootMargin: '0px',
};

type TInterSection = (
  entry: IntersectionObserverEntry,
  observer: IntersectionObserver,
) => void;

const useIntersect = (
  onIntersect: TInterSection,
  option: IntersectionObserverInit,
) => {
  const [ref, setRef] = useState<HTMLElement | null>(null);

  // : Dispatch(SetStateAction<>)

  // const checkIntersect = useCallback(
  //   ([entry], observer) =>  {
  //     console.log('entry', entry);
  //     // if (entry.isIntersecting) {
  //     //   onIntersect(entry, observer);
  //     // }
  //   },
  //   [],
  // );

  // const checkIntersect = (
  //   [entry]: IntersectionObserverEntry,
  //   observer: IntersectionObserver,
  // ) => {
  //   console.log('entrya', entry);
  //   if (entry[0].isIntersecting) {
  //     onIntersect(entry[0], observer);
  //   }
  // };
  useEffect(() => {
    let observer: IntersectionObserver;
    if (ref) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            onIntersect(entry, observer);
          }
        },
        {
          ...baseOption,
          ...option,
        },
      );

      // observer = new IntersectionObserver(checkIntersect, {
      //   ...baseOption,
      //   ...option,
      // });
      observer.observe(ref);
    }
    return () => observer && observer.disconnect();
  }, [ref, option.root, option.threshold, option.rootMargin]);
  return [setRef];
};

export { useIntersect };
