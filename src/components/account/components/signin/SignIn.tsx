import s from "./SignIn.module.scss";
import { useState, FC, useEffect } from "react";
import { AuthForm } from "../authForm/AuthForm";
import { Link } from "react-router-dom";

export const SignIn: FC = () => {
  return (
    <div className={s.container}>
      <h6 className={s.title}>SignIn</h6>
      <AuthForm btnName='Sign In' />
      <Link to="auth/signup">
        <span className={s.link}>Or SignUp</span>
      </Link>
    </div>
  );
};
