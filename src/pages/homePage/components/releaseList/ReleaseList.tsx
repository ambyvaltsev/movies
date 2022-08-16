import { FC } from "react";
import { ReleaseItem } from "..";
import s from "./ReleaseList.module.scss";

interface IListData {
  id: string;
  nameRu: string;
  nameEn: string;
  date: string;
  poster: string;
}
interface IReleaseListProps {
  title: string;
  listData: IListData[];
}

export const ReleaseList: FC<IReleaseListProps> = ({ title, listData }) => {

  return (
    <div className={s.container}>
      <h4 className={s.title}>{title}</h4>
      <ul className={s.list}>
        {listData?.map((item, index) => {
          if (index < 5) {
            return (
              <ReleaseItem
                key={item.id}
                index={index}
                poster={item.poster}
                nameRu={item.nameRu}
                nameEn={item.nameEn}
                date={item.date}
              />
            );
          }
        })}
      </ul>
    </div>
  );
};
