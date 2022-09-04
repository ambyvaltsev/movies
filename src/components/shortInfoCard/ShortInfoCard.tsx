import s from "./ShortCardInfo.module.scss";
import { Poster } from "../../components";
import { FC } from "react";

interface IShortInfoCardProps {
  url: string;
  alt: string;
  title: string;
  data: { title: string; text: string }[];
}

export const ShortInfoCard: FC<IShortInfoCardProps> = ({ url, alt, data, title }) => {
  return (
    <div className={s.container}>
      <Poster url={url} alt={alt} />
      <div className={s.content}>
        <h6 className={s.name}>{title}</h6>
        {data &&
          data.map((item, index) => {
            return (
              <p className={s.info} key={index}>
                <span className={s.info__title}>{item.title}</span>
                {item.text}
              </p>
            );
          })}
      </div>
    </div>
  );
};
