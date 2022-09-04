import s from "./Search.module.scss";
import { Input } from "../UI";
import { AiOutlineSearch, IoMdClose, BsSliders } from "../../assets";
import { FC, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { SearchTooltip, SearchTooltipDefault  } from "../search/components"
import { useMatchMedia } from "../../hooks";

export const Search: FC = () => {
  const [isInput, setIsInput] = useState({ focus: false, mobile: false });
  const { isSmallMobile } = useMatchMedia();
  const [input, setInput] = useState<string>("");
  const debounce = useDebounce(input, 300);

  const iconFocusStyle = isInput.focus && `${s.focus}`;
  const mobileStyle = isInput.mobile && `${s.mobile}`;
  const closeInput = () => {
    setTimeout(() => {
      setIsInput({ focus: false, mobile: false });
      setInput("");
    }, 200);
  };

  return (
    <div className={`${s.container} ${mobileStyle}`}>
      {(!isSmallMobile || isInput.mobile) && (
        <Input
          setInput={(e: any) => setInput(e.target.value)}
          input={input}
          isHeaderMobile={isInput.mobile ? true : false}
          isHeader
          placeholder="Movies, TV series"
          autoComplete="off"
          onFocus={() => setIsInput((prev) => ({ ...prev, focus: true }))}
          onBlur={closeInput}
        />
      )}

      
      {isSmallMobile ? (
        <AiOutlineSearch
          className={`${s.icon__searchMobile} ${mobileStyle} ${iconFocusStyle}`}
          onClick={() => setIsInput((prev) => ({ ...prev, mobile: true }))}
        />
      ) : (
        <div className={`${s.icons} ${iconFocusStyle}`}>
          <BsSliders />
          <AiOutlineSearch />
        </div>
      )}

      {isInput.mobile && (
        <IoMdClose
          className={`${s.icon__cancelSearch} ${iconFocusStyle}`}
          onClick={() => setIsInput((prev) => ({ ...prev, mobile: false }))}
        />
      )}
      
      {isInput.focus && (
        <div className={`${s.tooltip} ${mobileStyle}`}>
          {input ? <SearchTooltip keyword={debounce} /> : <SearchTooltipDefault />}
        </div>
      )}
    </div>
  );
};
