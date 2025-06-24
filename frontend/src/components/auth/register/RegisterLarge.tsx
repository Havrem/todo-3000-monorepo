import { useNavigate } from "@tanstack/react-router";
import styles from "@css/RegisterLarge.module.scss";
import { RegisterFormLarge } from "./RegisterFormLarge";

export const RegisterLarge = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.mainContainer}>
      <div className={styles.top}>
        <h1>Todo</h1>
        <p>Whenever - wherever</p>
      </div>
      <div className={styles.bottom}>
        <RegisterFormLarge />
        <button
          className={styles.switchBtn}
          onClick={() => navigate({ to: "/login" })}
        >
          Already have an account? Login!
        </button>
      </div>
    </div>
  );
};
