import s from "./DesktopView.module.scss";
import { Input } from "../../../UI";
import { AiOutlineSearch, BsSliders } from "../../../../assets";
import { FC, useState } from "react";
import { useDebounce } from "../../../../hooks/useDebounce";
import { SearchTooltip, SearchTooltipDefault } from "..";
import { Link } from "react-router-dom";

export const DesktopView: FC = () => {
  const [isFocus, setIsFocus] = useState(false);
  const [input, setInput] = useState<string>("");
  const debounce = useDebounce(input, 300);

  const iconFocusStyle = isFocus && `${s.focus}`;
  const closeInput = () => {
    setTimeout(() => {
      setIsFocus(false);
      setInput("");
    }, 200);
  };

  return (
    <div className={s.container}>
      <Input
        setInput={(e: any) => setInput(e.target.value)}
        input={input}
        isHeader
        placeholder="Movies, TV series"
        autoComplete="off"
        onFocus={() => setIsFocus(true)}
        onBlur={closeInput}
      />

      <div className={`${s.icons} ${iconFocusStyle}`}>
        <Link to="/all">
          <BsSliders />
        </Link>
        <AiOutlineSearch />
      </div>

      {isFocus && (
        <div className={s.tooltip}>
          {input ? <SearchTooltip keyword={debounce} /> : <SearchTooltipDefault />}
        </div>
      )}
    </div>
  );
};
