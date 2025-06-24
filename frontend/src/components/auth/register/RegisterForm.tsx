import { useForm } from "react-hook-form";
import styles from "@css/LoginForm.module.scss";
import { useAuth } from "@hooks/useAuth";
import { toast } from "react-toastify";
import { useNavigate } from "@tanstack/react-router";

interface FormInput {
  email: string;
  password: string;
}

export const RegisterForm = () => {
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
      console.warn("Login failed", err);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.mainContainer}>
      <div className={styles.block}>
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
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div className={styles.block}>
        <label>Password</label>
        <input
          {...register("password", {
            required: "Password is required",
            minLength: { value: 8, message: "Minimum 8 characters" },
          })}
          placeholder="Enter a password..."
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Register"}
      </button>
    </form>
  );
};
