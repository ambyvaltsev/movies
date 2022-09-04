import { FC } from "react";
import s from "./Poster.module.scss";

interface IPosterProps {
  url: string;
  alt: string;
  style?: { [k: string]: string };
}

export const Poster: FC<IPosterProps> = ({ url, alt, style }) => {
  return (
    <div className={s.container} style={style}>
      <img src={url} alt={alt} />
    </div>
  );
};
