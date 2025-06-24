import { Link } from "@tanstack/react-router";
import styles from "@css/NavbarSmall.module.scss";
import { HomeIcon } from "@icons/HomeIcon";
import { ProfileIcon } from "@icons/ProfileIcon";
import { TodoIcon } from "@icons/TodoIcon";

export const NavbarSmall = () => {
  return (
    <nav className={styles.mainContainer}>
      <div className={styles.innerContainer}>
        <Link to="/dashboard">
          <HomeIcon width={30} height={30} fill="#000000" />
        </Link>
        <Link to="/todos">
          <TodoIcon width={30} height={30} fill="#000000" />
        </Link>
        <Link to="/profile">
          <ProfileIcon width={30} height={30} fill="#000000" />
        </Link>
      </div>
    </nav>
  );
};
