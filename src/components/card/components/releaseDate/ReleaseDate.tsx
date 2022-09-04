import { FC } from "react";
import s from "./ReleaseDate.module.scss";

interface IReleaseDateProps {
  date: string;
}

export const ReleaseDate: FC<IReleaseDateProps> = ({ date }) => {
  return (
    <div>
      <div className={s.container}>
        <span className={s.date__day}>{+date.split("-")[2]}</span>
        <span className={s.date__month}>{new Date(date).toLocaleString("en-US", { month: "long" })}</span>
      </div>
    </div>
  );
};
