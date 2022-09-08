import { useState, useRef, useEffect } from "react";

export const useGetItemWidth = (number: number) => {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const observer = new ResizeObserver((entries) => {
        setWidth(entries[0].contentRect.width / number);
      });
      observer.observe(ref.current);
      return () => observer.disconnect();
    }
  }, [number]);
  return { width, ref };
};
