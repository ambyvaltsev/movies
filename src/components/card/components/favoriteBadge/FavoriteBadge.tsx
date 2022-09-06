import s from "./FavoriteBadge.module.scss";
import { BsBookmarkCheckFill, BsBookmarkXFill } from "../../../../assets";
import { useState } from "react";

export const FavoriteBadge = () => {
  const [active, setActive] = useState(false);

  const activeStyle = active && s.active;

  return (
    <button className={s.container} onClick={() => setActive(!active)}>
      {active ? (
        <BsBookmarkXFill className={`${s.badge} ${activeStyle}`} />
      ) : (
        <BsBookmarkCheckFill className={s.badge} />
      )}
    </button>
  );
};
