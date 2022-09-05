import s from "./ShortInfo.module.scss";
import { FC } from "react";

interface IShortInfoProps {
  data: { title: string; text: string }[];
}

export const ShortInfo: FC<IShortInfoProps> = ({ data }) => {
  return (
    <>
      {data &&
        data.map((item, index) => {
          return (
            <p className={s.info} key={index}>
              <span className={s.info__title}>{item.title}</span>
              {item.text}
            </p>
          );
        })}
    </>
  );
};
