import { useRef, useEffect } from "react";

export const useObserver = (isLoading: boolean, ref: any, limit: boolean, callback: () => void,) => {
  const observer = useRef<any>();

  useEffect(() => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    if (ref.current) {
      const cb = function ([entry]: any, observer: any) {
        if (entry.isIntersecting && limit) {
          callback();
        }
      };
      observer.current = new IntersectionObserver(cb);

      observer.current.observe(ref.current);
    }
  }, [isLoading, ref.current]);
};
