import { useAppSelector } from "../../hooks";
import s from "./AccountHeader.module.scss";

export const AccountHeader = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  return (
    <div className={s.container}>{isAuth ? <div className={s.account}></div> : <button className={s.signin}>Sign in</button>}</div>
  );
};
