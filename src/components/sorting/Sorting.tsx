import s from "./Sorting.module.scss";
import { IoIosArrowDown, IoIosArrowUp } from "../../assets";
import { useState, FC, useRef } from "react";
import { ISelected } from "../../pages/movies/components/moviesAll/MoviesAll";

// RATING, NUM_VOTE, YEAR

interface ISortingProps {
  items: { value: string; id: number | string }[];
  selected: ISelected;
  setSelected: (obj: any) => void;
}
export const Sorting: FC<ISortingProps> = ({ items, selected, setSelected }) => {
  const sortList = useRef<HTMLUListElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const selectData = (e: any) => {
    console.log(e.target.dataset.id);
    setSelected((prev: any) => ({
      ...prev,
      order: { value: e.target.textContent, id: e.target.dataset.id },
    }));
  };

  return (
    <div className={s.container}>
      <div className={s.selected} onClick={() => setIsOpen(!isOpen)}>
        <span className={s.selected__name}>{selected?.order?.value || "Rating"}</span>
        {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </div>
      {isOpen && (
        <ul className={s.options} ref={sortList}>
          {items.map((item) => {
            return (
              <li className={s.options__item} key={item.id} onClick={selectData}>
                {(selected?.order?.value || "Rating") === item.value && (
                  <svg
                    className={s.item__icon}
                    width="14"
                    height="10"
                    viewBox="0 0 14 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5.50915 6.79718L2.10132 3.38483L0.898438 4.58611L5.50915 9.20294L13.1013 1.6007L11.8984 0.399414L5.50915 6.79718Z"
                      fill="#FF6600"
                    />
                  </svg>
                )}
                <span data-id={item.id} className={s.item__text}>
                  {item.value}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
