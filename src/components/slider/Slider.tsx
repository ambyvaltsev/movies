import s from "./Slider.module.scss";
import { FC, useState, ReactNode, Children, useEffect, useRef } from "react";
import { VscTriangleLeft, VscTriangleRight } from "../../assets";
import { useGetNumberItems } from "./hooks/useGetNumberItems";
import { useGetItemWidth } from "./hooks/useGetItemWidth";

interface ISliderProps {
  length: number;
  children: ReactNode;
}

export const Slider: FC<ISliderProps> = ({ length, children }) => {
  const count = useRef<number>(0);
  const number = useGetNumberItems();
  const { width, ref } = useGetItemWidth(number);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (Math.abs(count.current) > length - number) {
      ++count.current;
    }
    setOffset(width * count.current);
  }, [width]);

  const moveRight = () => {
    if (offset <= -width * (length - number)) {
      return;
    }
    count.current--;
    setOffset((prev) => prev - width);
  };
  const moveLeft = () => {
    if (offset === 0) {
      return;
    }
    count.current++;
    setOffset((prev) => prev + width);
  };

  return (
    <section className={s.container} ref={ref}>
      <div className={s.slider__content} style={{ transform: `translateX(${offset}px)` }}>
        {Children.map(children, (child) => {
          return (
            <div className={s.slider__item} style={{ minWidth: `${width}px` }}>
              {child}
            </div>
          );
        })}
      </div>
      <button className={s.btn__right} onClick={moveRight}>
        <VscTriangleRight />
      </button>
      <button className={s.btn__left} onClick={moveLeft}>
        <VscTriangleLeft />
      </button>
    </section>
  );
};
