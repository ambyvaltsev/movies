import { useState, useRef, useEffect } from "react";

export const useShowInfoCard = (isLoading: boolean) => {
  const ref = useRef<HTMLDivElement>(null);
  const [info, setInfo] = useState<{ id: string; x: number; y: number }>({ id: "", x: 0, y: 0 });

  const openCard = (e: any) => {
    if (e.target.dataset.card) {
      const left =
        e.clientX + 260 > document.documentElement.clientWidth
          ? document.documentElement.clientWidth - 270
          : e.pageX;
      const top = e.clientY + 150 > document.documentElement.clientHeight ? e.pageY - 150 : e.pageY;
      setInfo({ id: e.target.dataset.card, x: left, y: top - 70 });
    }
  };

  const closeCard = () => {
    setInfo({ ...info, id: "" });
  };

  useEffect(() => {
    const instance = ref.current;
    if (instance) {
      instance.addEventListener("mouseover", openCard);
      instance.addEventListener("mouseout", closeCard);
      return () => {
        instance.removeEventListener("mouseover", openCard);
        instance.removeEventListener("mouseover", closeCard);
      };
    }
  }, [ref.current, isLoading]);

  return { info, ref };
};
