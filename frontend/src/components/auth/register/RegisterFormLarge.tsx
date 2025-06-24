import { useForm } from "react-hook-form";
import styles from "@css/LoginFormLarge.module.scss";
import { useAuth } from "@hooks/useAuth";
import { toast } from "react-toastify";
import { useNavigate } from "@tanstack/react-router";

interface FormInput {
  email: string;
  password: string;
}

export const RegisterFormLarge = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormInput>();
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: FormInput) => {
    try {
      await registerUser(data.email, data.password);
      navigate({ to: "/dashboard" });
    } catch (err) {
      console.warn("Register failed", err);
      toast.error("Register failed. Please check your credentials.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.mainContainer}>
      <div className={styles.fields}>
        <div className={styles.block}>
          <div className={styles.top}>
            <label>Email</label>
            <input
              {...register("email", {
                required: "Email address is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email format",
                },
              })}
              placeholder="Enter an email..."
            />
          </div>
          <div className={styles.error}>
            {errors.email && <p>{errors.email.message}</p>}
          </div>
        </div>

        <div className={styles.block}>
          <div className={styles.top}>
            <label>Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              placeholder="Enter a password..."
            />
          </div>
          <div className={styles.error}>
            {errors.password && <p>{errors.password.message}</p>}
          </div>
        </div>
      </div>

      <button type="submit" disabled={isSubmitting}>
        Register
      </button>
    </form>
  );
};
