import s from "./ScoreBadge.module.scss";
import { Star } from "../../../../components";
import { useState, FC } from "react";

interface IScoreBadgeProps {
  id: string | number;
}

export const ScoreBadge: FC<IScoreBadgeProps> = ({ id }) => {
  const [isOpen, seIsOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [value, setValue] = useState(0);
  const handleSelectValue = (e: any) => {
    setValue(e.target.dataset.value);
  };
  const handleOpen = (e: any) => {
    seIsOpen(!isOpen);
  };

  return (
    <div className={s.container}>
      <button className={s.badge} onClick={handleOpen}>
        <svg
          className={s.badge__icon}
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="0 0 32 31"
        >
          <path
            className={s.badge__icon}
            fillRule="evenodd"
            d="M16.771 24.13L26.522 31.227 22.79 19.767 32.541 12.828 20.582 12.828 16.771 1 12.959 12.828 1 12.828 10.751 19.767 7.019 31.227z"
            transform="translate(-.89 -.309)"
          />
        </svg>
      </button>
      {isOpen && (
        <div className={s.badge__bar}>
          {Array.from({ length: 10 }, (x, i) => i + 1).map((el, i) => {
            return (
              <Star
                key={i}
                radioNum={el}
                value={value}
                selectValue={handleSelectValue}
                active={active}
                setActiveOver={() => setActive(el)}
                setActiveOut={() => setActive(0)}
                id={id}
                style={{ width: "16px", height: "16px" }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
