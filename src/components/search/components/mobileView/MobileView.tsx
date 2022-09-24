import s from "./MobileView.module.scss";
import { AiOutlineSearch, IoMdClose} from "../../../../assets";
import { Input } from "../../../UI";
import { FC, useEffect, useRef, useState } from "react";
import { useDebounce } from "../../../../hooks/useDebounce";
import { SearchTooltip, SearchTooltipDefault } from "..";

interface IMobileViewProps {
  style?: { [k: string]: string };
}

export const MobileView: FC<IMobileViewProps> = ({ style }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocus, setIsFocus] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState<string>("");
  const debounce = useDebounce(input, 300);

  const iconFocusStyle = isFocus && `${s.focus}`;
  const closeInput = () => {
    setTimeout(() => {
      setIsFocus(false)
      setIsOpen(false);
      setInput("");
    }, 200);
  };
  
  useEffect(() => {
    isOpen && inputRef.current?.focus();
  }, [isOpen]);

  return (
    <div className={s.container} style={style}>
      {isOpen && (
        <div className={s.input__wrapper}>
          <Input
            ref={inputRef}
            setInput={(e: any) => setInput(e.target.value)}
            input={input}
            isHeaderMobile
            isHeader
            placeholder="Movies, TV series"
            autoComplete="off"
            onFocus={() => setIsFocus(true)}
            onBlur={closeInput}
          />
        </div>
      )}

      <AiOutlineSearch
        className={`${s.search__btnOpen} ${isOpen && s.open} ${isFocus && s.focus}`}
        onClick={() => setIsOpen(true)}
      />
      {isFocus && (
        <IoMdClose className={`${s.search__btnCansel} ${iconFocusStyle}`} onClick={() => setIsOpen(false)} />
      )}

      {isFocus && (
        <div className={s.tooltip}>
          {input ? <SearchTooltip keyword={debounce} /> : <SearchTooltipDefault />}
        </div>
      )}
    </div>
  );
};
