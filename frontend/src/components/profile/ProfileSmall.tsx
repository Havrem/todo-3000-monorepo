import { useNavigate } from "@tanstack/react-router";
import styles from "@css/ProfileSmall.module.scss";
import { useAuth } from "@hooks/useAuth";

export const ProfileSmall = () => {
  const { user, logout } = useAuth();
  const imageSrcUrl = user?.photoURL || "/avatars/elephant.png";
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate({ to: "/login" });
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.top}>
        <img src={imageSrcUrl} className={styles.avatar} />
        <p className={styles.username}>{user?.email}</p>
      </div>
      <div className={styles.bottom}>
        <div className={styles.filler}></div>
      </div>
      <div className={styles.mid}>
        <button onClick={handleLogout} className={styles.logout}>
          Logout
        </button>
      </div>
    </div>
  );
};
