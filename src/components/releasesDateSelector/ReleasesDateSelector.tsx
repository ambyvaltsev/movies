import { FC, useState, useRef, useEffect } from "react";
import s from "./ReleasesDateSelector.module.scss";
import { IoIosArrowUp, IoIosArrowDown } from "../../assets";

interface IReleasesDateSelectorProps {
  data: string[] | number[];
  setSelectedDate: (e: any) => void;
  selectedDate: string | number;
}

export const ReleasesDateSelector: FC<IReleasesDateSelectorProps> = ({
  data,
  selectedDate,
  setSelectedDate,
}) => {
  const optionsRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const selectDate = (e: any) => {
    setSelectedDate(e);
    setIsOpen(false);
  };

  useEffect(() => {
    const instance = optionsRef.current;
    instance?.addEventListener("click", selectDate);
    return () => instance?.removeEventListener("click", selectDate);
  }, [isOpen]);

  return (
    <div className={s.container}>
      <div className={s.display} onClick={() => setIsOpen(!isOpen)}>
        <div className={s.value}>{selectedDate}</div>
        <div className={s.button}>
          {isOpen && <IoIosArrowUp />}
          {!isOpen && <IoIosArrowDown />}
        </div>
      </div>
      {isOpen && (
        <div className={s.options} ref={optionsRef}>
          {data?.map((d) => {
            return (
              <div key={d} className={s.option}>
                {d}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
