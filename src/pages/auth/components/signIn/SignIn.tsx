import s from "./SignIn.module.scss";
import { FC } from "react";
import { AuthForm } from "../../../../components";
import { Link, useNavigate } from "react-router-dom";
import { IUser } from "../../../../components/authForm/AuthForm";
import { loginUser } from "../../../../store/auth/auth.slice";
import { useAppDispatch } from "../../../../hooks";

export const SignIn: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const signin = (data: IUser) => {
    dispatch(loginUser(data))
      .unwrap()
      .then(() => navigate("/"));
  };

  return (
    <div className={s.container}>
      <h6 className={s.title}>SignIn</h6>
      <AuthForm btnName="Sign In" handleLog={signin} />
      <Link to="/auth/signup">
        <span className={s.link}>Or SignUp</span>
      </Link>
    </div>
  );
};
