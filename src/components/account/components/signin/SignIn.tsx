import s from "./SignIn.module.scss";
import { useAppSelector } from "../../../../hooks";

export const SignIn = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  return (
    <div className={s.container}>
      <button className={s.signin}>Sign in</button>
    </div>
  );
};
