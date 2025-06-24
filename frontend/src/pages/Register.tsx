import { useMediaQuery } from "react-responsive";
import { RegisterLarge } from "@components/auth/register/RegisterLarge";
import { RegisterSmall } from "@components/auth/register/RegisterSmall";

export const Register = () => {
  const isDesktop = useMediaQuery({ minWidth: 768 });

  return isDesktop ? <RegisterLarge /> : <RegisterSmall />;
};
