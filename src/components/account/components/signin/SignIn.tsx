import s from "./SignIn.module.scss";
import { useState, FC, useEffect } from "react";

export const SignIn: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);
  return (
    <div className={s.container}>
      <button className={s.signin__btnOpen}>Sign in</button>
      {isOpen && (
        <div className={s.signin__content}>
          <div className={s.signin__popup}>
            <h1 className={s.signin__title}>
              Sign In or <span>Sign Up</span>
            </h1>
            <form className={s.signin__form}></form>
            <button className={s.signin__btnClose}></button>
          </div>
        </div>
      )}
    </div>
  );
};
