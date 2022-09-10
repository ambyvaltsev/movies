import { FC, useState, useRef, useEffect } from "react";
import s from "./Selector.module.scss";
import { IoIosArrowUp, IoIosArrowDown } from "../../../assets";

interface ISelectorProps {
  data: { value: string | number; id?: number | string }[];
  setSelectedData: (e: any) => void;
  selectedData: string | number;
  style?: { [k: string]: string };
}

export const Selector: FC<ISelectorProps> = ({ data, selectedData, setSelectedData, style }) => {
  const optionsRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const selectData = (e: any) => {
    setSelectedData(e);
    setIsOpen(false);
  };

  useEffect(() => {
    const instance = optionsRef.current;
    instance?.addEventListener("click", selectData);
    return () => instance?.removeEventListener("click", selectData);
  }, [isOpen]);

  return (
    <div className={s.container} style={style}>
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
              <div key={d.value} className={s.option} data-id={d.id}>
                {d.value}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
