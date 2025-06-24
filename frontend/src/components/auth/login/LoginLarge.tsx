import { useNavigate } from "@tanstack/react-router";
import styles from "@css/LoginLarge.module.scss";
import { LoginFormLarge } from "./LoginFormLarge";

export const LoginLarge = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.mainContainer}>
      <div className={styles.top}>
        <h1>Todo</h1>
        <p>Whenever - wherever</p>
      </div>
      <div className={styles.bottom}>
        <LoginFormLarge />
        <button
          className={styles.switchBtn}
          onClick={() => navigate({ to: "/register" })}
        >
          Don't have an account yet? Register!
        </button>
      </div>
    </div>
  );
};
