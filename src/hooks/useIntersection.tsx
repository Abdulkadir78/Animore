import { useEffect, useState } from "react";

export const useIntersection = (
  ref: React.RefObject<any>,
  options?: IntersectionObserverInit
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    // Remove the observer when the component is unmounted
    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return { isIntersecting };
};
