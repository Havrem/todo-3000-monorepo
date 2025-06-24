import { useMediaQuery } from "react-responsive";
import { ProfileLarge } from "@components/profile/ProfileLarge";
import { ProfileSmall } from "@components/profile/ProfileSmall";

export const Profile = () => {
  const isDesktop = useMediaQuery({ minWidth: 768 });

  return isDesktop ? <ProfileLarge /> : <ProfileSmall />;
};
