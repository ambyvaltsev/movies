import s from "./AuthForm.module.scss";
import { BsEye, BsEyeSlash } from "../../../../assets";
import { useState, FC } from "react";
import { useForm } from "react-hook-form";

interface IFormInputs {
  login: string;
  password: string;
}

interface IAuthFormProps {
  btnName: string;
}
export const AuthForm: FC<IAuthFormProps> = ({ btnName }) => {
  const [isHide, setIsHide] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({ mode: "onSubmit" });
  const onSubmit = (e: any) => {
    console.dir(JSON.stringify(e));
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <label className={s.label} htmlFor="#login">
        <input
          className={s.input}
          id="#login"
          placeholder="Login"
          {...register("login", {
            required: "Required field",
            minLength: {
              value: 4,
              message: "Min 4 characters required",
            },
            pattern: {
              value: /[A-Za-z]/,
              message: "Only latin letters",
            },
          })}
        />
        <span className={s.error}>{errors?.login && errors?.login?.message}</span>
      </label>
      <label className={s.label} htmlFor="#password">
        <input
          type={isHide ? "password" : "text"}
          className={s.input}
          id="#password"
          placeholder="Password"
          {...register("password", {
            required: "Required field",
            minLength: {
              value: 4,
              message: "Min 4 characters required",
            },
            pattern: {
              value: /((?=.*[0-9])([A-Za-z]))/,
              message: "Only latin letters and at least one number",
            },
          })}
        />
        {isHide ? (
          <BsEye className={s.password__icon} onClick={() => setIsHide(false)} />
        ) : (
          <BsEyeSlash className={s.password__icon} onClick={() => setIsHide(true)} />
        )}
        <span className={s.error}>{errors?.password?.message}</span>
      </label>
      <button type="submit" className={s.btn}>
        {btnName}
      </button>
    </form>
  );
};
