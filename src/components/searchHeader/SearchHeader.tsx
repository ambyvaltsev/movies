import s from "./SearchHeader.module.scss";
import { Input } from "../UI";
import { AiOutlineSearch } from "react-icons/ai";
import { BsSliders } from "react-icons/bs";
import { FC, useState } from "react";

export const SearchHeader: FC = () => {
  const [isFocus, setIsFocus] = useState<boolean>(false);

  return (
    <div className={s.container}>
      <Input
        header
        placeholder="Movies, TV series"
        autocomplete="off"
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
      <div className={s.icons}>
        <BsSliders className={isFocus ? `${s.icons__icon} ${s.focus}` : `${s.icons__icon}`} />
        <AiOutlineSearch className={isFocus ? `${s.icons__icon} ${s.focus}` : `${s.icons__icon}`} />
      </div>
    </div>
  );
};
