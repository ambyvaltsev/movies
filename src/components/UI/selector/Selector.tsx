import { FC, useState, useRef, useEffect } from "react";
import s from "./Selector.module.scss";
import { IoIosArrowUp, IoIosArrowDown } from "../../../assets";

interface ISelectorProps {
  data: string[] | number[];
  setSelectedData: (e: any) => void;
  selectedData: string | number;
}

export const Selector: FC<ISelectorProps> = ({
  data,
  selectedData,
  setSelectedData,
}) => {
  const optionsRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const selectDate = (e: any) => {
    setSelectedData(e);
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
        <div className={s.value}>{selectedData}</div>
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
