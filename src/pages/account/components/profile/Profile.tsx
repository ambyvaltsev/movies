import s from "./Profile.module.scss";
import { Poster } from "../../../../components";
import empty_avatar from "../../../../assets/img/empty_avatar.gif";
import { useAppSelector } from "../../../../hooks";

export const Profile = () => {
  const { login, date } = useAppSelector((state) => state.auth.entities);
  return (
    <div className={s.container}>
      <div className={s.avatar}>
        <Poster url={empty_avatar} alt={"Avatar"} />
      </div>
      <div className={s.user}>
        <span className={s.user__login}>{login}</span>
        <div className={s.user__reg}>
          <span className={s.reg__title}>Registration:</span>
          <span className={s.reg__date}>{date}</span>
        </div>
      </div>
    </div>
  );
};
