import s from "./FilterMobile.module.scss";
import { IoMdClose } from "../../../assets";
import { FC } from "react";
import { ISelected } from "../../../pages/movies/components/moviesAll/MoviesAll";
import { Selector } from "../../UI";
import { genres, countries } from "../../../helpers";

interface IFilterMobileProps {
  setSelected: (obj: any) => void;
  selected: ISelected;
  isOpen?: boolean
  setIsOpen: () => void
}

export const FilterMobile: FC<IFilterMobileProps> = ({ setSelected, selected, isOpen, setIsOpen }) => {

  const activeStyle = isOpen ? `${s.active}` : ''
  return (
    <aside className={`${s.container} ${activeStyle}`}>
      <div className={s.filter}>
        <div className={s.filter__item}>
          <h6 className={s.filter__title}>Countries</h6>
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
        </div>
        <div className={s.filter__item}>
          <h6 className={s.filter__title}>Genres</h6>
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
        </div>
      </div>
      <IoMdClose className={s.btn__close} onClick={setIsOpen} />
    </aside>
  );
};
