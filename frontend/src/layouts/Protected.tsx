import { Navigate, Outlet } from "@tanstack/react-router";
import { Footer } from "@components/shared/Footer";
import styles from "@css/ProtectedLayout.module.scss";
import { useAuth } from "@hooks/useAuth";
import { DotLoader } from "react-spinners";
import { useMediaQuery } from "react-responsive";
import { NavbarLarge } from "@components/shared/NavbarLarge";
import { NavbarSmall } from "@components/shared/NavbarSmall";

export const Protected = () => {
  const { user, initializing } = useAuth();
  const isDesktop = useMediaQuery({ minWidth: 768 });

  if (initializing) {
    return (
      <div className={styles.loading}>
        <DotLoader color="#36d7b7" size={150} />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className={styles.mainContainer}>
      {isDesktop && <NavbarLarge />}
      <Outlet />
      {isDesktop && <Footer />}
      {!isDesktop && <NavbarSmall />}
    </div>
  );
};
