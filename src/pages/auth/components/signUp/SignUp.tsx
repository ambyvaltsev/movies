import s from "./SignUp.module.scss";
import { AuthForm } from "../../../../components";
import { Link, useNavigate } from "react-router-dom";
import { IUser } from "../../../../components/authForm/AuthForm";
import { useAppDispatch } from "../../../../hooks";
import { createUser } from "../../../../store/auth/auth.slice";

export const SignUp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const signup = (data: IUser) => {
    dispatch(createUser(data))
      .unwrap()
      .then(() => navigate("/"));
  };

  return (
    <div className={s.container}>
      <h6 className={s.title}>SignUp</h6>
      <AuthForm btnName="Sign Up" handleLog={signup} />
      <Link to="/auth">
        <span className={s.link}>Back</span>
      </Link>
    </div>
  );
};
