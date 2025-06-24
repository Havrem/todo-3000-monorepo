import { useMediaQuery } from "react-responsive";
import { LoginLarge } from "@components/auth/login/LoginLarge";
import { LoginSmall } from "@components/auth/login/LoginSmall";

export const Login = () => {
  const isDesktop = useMediaQuery({ minWidth: 768 });

  return isDesktop ? <LoginLarge /> : <LoginSmall />;
};
