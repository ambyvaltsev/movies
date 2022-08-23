import { FC } from "react";
import s from "./KinopoiskRating.module.scss";

interface IStarBadgeProps {
  radioNum: number;
  selectValue: (e: any) => void;
  value: number;
  rating: number;
  active: number;
  setActiveOver: () => void;
  setActiveOut: () => void;
}

export const StarBadge: FC<IStarBadgeProps> = ({
  radioNum,
  selectValue,
  value,
  rating,
  setActiveOver,
  setActiveOut,
  active,
}) => {
  const fill =
    radioNum <= Math.floor(rating)
      ? "100%"
      : radioNum === Math.ceil(rating)
      ? `${Number("0." + String(rating).split(".")[1]) * 100}%`
      : "0%";

  const colorActive = radioNum <= active ? "#036" : "#CCC";
  return (
    <>
      {fill && (
        <label
          className={s.label}
          htmlFor={`kpicon${radioNum}`}
          onMouseOver={setActiveOver}
          onMouseOut={setActiveOut}
        >
          <input
            type="radio"
            className={s.radio}
            data-value={radioNum}
            id={`kpicon${radioNum}`}
            value={value}
            onChange={selectValue}
            checked={value === radioNum}
          />
          <span className={s.icon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              viewBox="0 0 32 31"
              fill={`url(#${radioNum}grad)`}
            >
              <defs>
                <linearGradient id={`${radioNum}grad`}>
                  <stop
                    offset={radioNum <= active ? "100%" : fill}
                    stopColor={active ? colorActive : "#f66600"}
                  />
                  <stop
                    offset={radioNum <= active ? "100%" : fill}
                    stopColor={active ? colorActive : "#CCC"}
                    stopOpacity="1"
                  />
                </linearGradient>
              </defs>
              <path
                fillRule="evenodd"
                d="M16.771 24.13L26.522 31.227 22.79 19.767 32.541 12.828 20.582 12.828 16.771 1 12.959 12.828 1 12.828 10.751 19.767 7.019 31.227z"
                transform="translate(-.89 -.309)"
              />
            </svg>
          </span>
        </label>
      )}
    </>
  );
};
