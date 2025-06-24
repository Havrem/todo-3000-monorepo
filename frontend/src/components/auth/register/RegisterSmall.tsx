import { useNavigate } from "@tanstack/react-router";
import styles from "@css/RegisterSmall.module.scss";
import { RegisterFormSmall } from "./RegisterFormSmall";

export const RegisterSmall = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.mainContainer}>
      <div className={styles.top}>
        <h1>Todo</h1>
        <p>Whenever - wherever</p>
      </div>
      <div className={styles.bottom}>
        <RegisterFormSmall />
        <button
          className={styles.switchBtn}
          onClick={() => navigate({ to: "/login" })}
        >
          Already have an account? Login!
        </button>
        <div className={styles.filler}></div>
      </div>
    </div>
  );
};
