import styles from "@css/ProfileLarge.module.scss";
import { useAuth } from "@hooks/useAuth";

export const ProfileLarge = () => {
  const { user } = useAuth();
  const imageSrcUrl = user?.photoURL || "/avatars/elephant.png";

  return (
    <div className={styles.mainContainer}>
      <div className={styles.left}>
        <img src={imageSrcUrl} className={styles.avatar} />
        <p className={styles.username}>{user?.email}</p>
      </div>
      <div className={styles.right}>
        <div className={styles.filler}></div>
      </div>
    </div>
  );
};
