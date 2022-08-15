import { FC, useState } from "react";
import s from "./Input.module.scss";

interface IStyle {
  [index: string]: string;
}

interface IInputProps {
  style?: IStyle;
  header?: boolean;
  placeholder?: string;
  autocomplete?: string;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const Input: FC<IInputProps> = ({ style, header, placeholder, autocomplete, onFocus, onBlur }) => {
  const styles = header ? `${s.input} ${s.header}` : `${s.input}`;

  return (
    <label htmlFor="input" className={s.label}>
      <input
        type="text"
        id="input"
        className={styles}
        style={style}
        placeholder={placeholder}
        autoComplete={autocomplete}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </label>
  );
};
