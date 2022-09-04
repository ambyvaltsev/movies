import s from "./RelatedList.module.scss";

import { Link } from "react-router-dom";
import { ISingleUnit } from "../../../../models";
import { FC } from "react";

interface IRelatedListProps {
  items: ISingleUnit[];
  link: string;
}

export const RelatedList: FC<IRelatedListProps> = ({ items, link }) => {
  return (
    <ul className={s.container}>
      {items &&
        items.map((item, index) =>
          index < 10 ? (
            <Link to={`/${link}/${item.id}`} key={index}>
              <li className={s.item} data-clickable="true" data-card={item.id}>
                {item.nameEn || item.nameRu}
              </li>
            </Link>
          ) : null
        )}
    </ul>
  );
};
