// File: /frontend/src/hooks/useInView.ts

import { useState, useEffect, useRef, RefObject } from "react";

// REFACTOR 1: Define a clear, specific return type for our hook.
// This tells TypeScript exactly what to expect: a tuple with a RefObject first and a boolean second.
type UseInViewResponse = [RefObject<HTMLDivElement>, boolean];

// This hook returns a ref and a boolean indicating if the element is in view.
export const useInView = (
  options?: IntersectionObserverInit
): UseInViewResponse => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = ref.current; // Capture the current ref value

    // REFACTOR 2: We only create the observer if the ref is attached to an element.
    if (!currentRef) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      // If the element is intersecting (visible), update the state.
      // This logic now correctly triggers only once.
      if (entry.isIntersecting) {
        setIsInView(true);
        // Once it's in view, we stop observing to save resources.
        observer.unobserve(currentRef);
      }
    }, options);

    observer.observe(currentRef);

    // The cleanup function will run when the component unmounts.
    return () => {
      observer.unobserve(currentRef);
    };
  }, [options]); // REFACTOR 3: The dependency array should only include 'options'.
  // The effect should not re-run every time 'isInView' changes.

  // The hook returns the ref object and the boolean state.
  return [ref, isInView];
};
