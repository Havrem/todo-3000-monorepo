import { DashboardLarge } from "@components/dashboard/DashboardLarge";
import { DashboardSmall } from "@components/dashboard/DashboardSmall";
import { useMediaQuery } from "react-responsive";

export const Dashboard = () => {
  const isDesktop = useMediaQuery({ minWidth: 768 });

  return isDesktop ? <DashboardLarge /> : <DashboardSmall />;
};
