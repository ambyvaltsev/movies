import s from "./Account.module.scss";
import { ReactNode, FC } from "react";
import { SignIn } from "./components";

interface IAccountExtension {
  SignIn: typeof SignIn;
}

interface IAccountProps {
  children: ReactNode;
}

export const Account: FC<IAccountProps> & IAccountExtension = ({ children }) => {
  return <div>{children}</div>;
};

Account.SignIn = SignIn;
