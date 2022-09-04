import { FC } from "react";
import s from "./Input.module.scss";

interface IStyle {
  [k: string]: string;
}

interface IInputProps {
  style?: IStyle;
  isHeader?: boolean;
  isHeaderMobile?: boolean;
  placeholder?: string;
  autoComplete?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  input: string;
  setInput: (e: any) => void;
}

export const Input: FC<IInputProps> = ({
  isHeader,
  isHeaderMobile,
  input,
  setInput,
  ...props
}) => {
  const header = isHeader && `${s.header}`;
  const headerMobile = isHeaderMobile && `${s.headerMobile}`
  return (
    <label htmlFor="input" className={`${s.label} ${s.headerMobile}`}>
      <input
        onChange={setInput}
        value={input}
        type="text"
        id="input"
        className={`${s.input} ${header} ${headerMobile}`}
        {...props}
      />
    </label>
  );
};
