import { useNavigate } from "@tanstack/react-router";
import styles from "@css/LoginSmall.module.scss";
import { LoginFormSmall } from "./LoginFormSmall";

export const LoginSmall = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.mainContainer}>
      <div className={styles.top}>
        <h1>Todo</h1>
        <p>Whenever - wherever</p>
      </div>
      <div className={styles.bottom}>
        <LoginFormSmall />
        <button
          className={styles.switchBtn}
          onClick={() => navigate({ to: "/register" })}
        >
          Don't have an account yet? Register!
        </button>
        <div className={styles.filler}></div>
      </div>
    </div>
  );
};
