import s from "./FilterDesktop.module.scss";
import { IoIosArrowDown, IoIosArrowUp } from "../../../assets";
import { useState, FC } from "react";
import { ISelected } from "../../../pages/movies/components/moviesAll/MoviesAll";
import { Selector } from "../../UI";
import { genres, countries } from "../../../helpers";

interface IFilterDesktopProps {
  setSelected: (obj: any) => void;
  selected: ISelected;
}

export const FilterDesktop: FC<IFilterDesktopProps> = ({ setSelected, selected }) => {
  const [hideSelector, setHideSelector] = useState({ countries: false, genres: false });

  const hideCountriesSelector = () => {
    setHideSelector((prev) => ({ ...prev, countries: !prev.countries }));
  };
  const hideGenresSelector = () => {
    setHideSelector((prev) => ({ ...prev, genres: !prev.genres }));
  };
  return (
    <aside className={s.container}>
      <div className={s.filter__item}>
        <div className={s.item__title} onClick={hideCountriesSelector}>
          {hideSelector.countries ? (
            <IoIosArrowDown className={s.item__icon} />
          ) : (
            <IoIosArrowUp className={s.item__icon} />
          )}
          <span>Countries</span>
        </div>
        {!hideSelector.countries && (
          <Selector
            data={countries}
            selectedData={selected?.country?.value || "All countries"}
            setSelectedData={(e) =>
              setSelected((prev: ISelected) => ({
                ...prev,
                country: { value: e.target.textContent, id: e.target.dataset.id },
              }))
            }
            style={{ width: "130px" }}
          />
        )}
      </div>
      <div className={s.filter__item}>
        <div className={s.item__title} onClick={hideGenresSelector}>
          {hideSelector.genres ? (
            <IoIosArrowDown className={s.item__icon} />
          ) : (
            <IoIosArrowUp className={s.item__icon} />
          )}
          <span>Genres</span>
        </div>
        {!hideSelector.genres && (
          <Selector
            data={genres}
            selectedData={selected?.genre?.value || "All genres"}
            setSelectedData={(e) =>
              setSelected((prev: ISelected) => ({
                ...prev,
                genre: { value: e.target.textContent, id: e.target.dataset.id },
              }))
            }
            style={{ width: "130px" }}
          />
        )}
      </div>
    </aside>
  );
};