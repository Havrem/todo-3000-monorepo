import { Outlet } from "@tanstack/react-router";
import { Footer } from "@components/shared/Footer";
import styles from "@css/PublicLayout.module.scss";
import { useMediaQuery } from "react-responsive";

export const Public = () => {
  const isDesktop = useMediaQuery({ minWidth: 768 });

  return (
    <div className={styles.mainContainer}>
      <Outlet />
      {isDesktop && <Footer />}
    </div>
  );
};
