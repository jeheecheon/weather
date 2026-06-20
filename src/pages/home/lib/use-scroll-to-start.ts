import { useLayoutEffect, useRef } from "react";

export function useScrollToStart<T>(deps: T) {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const target = targetRef.current;
    if (!container || !target) {
      return;
    }

    container.scrollLeft +=
      target.getBoundingClientRect().left - container.getBoundingClientRect().left;
  }, [deps]);

  return { containerRef, targetRef };
}
