import { FC } from "react";
import s from "./Input.module.scss";
import { AiOutlineSearch } from "react-icons/ai";
import { BsSliders } from "react-icons/bs";

interface IStyle {
  [index: string]: string;
}

interface IInputProps {
  style?: IStyle;
  main?: boolean;
  placeholder?: string;
  autocomplete?: string;
}

export const Input: FC<IInputProps> = ({ style, main, placeholder, autocomplete }) => {
  const styles = main ? `${s.input} ${s.main}` : `${s.input}`;
  return (
    <label htmlFor="input" className={s.container}>
      <input
        type="text"
        id="input"
        className={styles}
        style={style}
        placeholder={placeholder}
        autoComplete={autocomplete}
      />
      {main && <BsSliders className={s.settingsIcon} />}
      {main && <AiOutlineSearch className={s.searchIcon} />}
    </label>
  );
};
