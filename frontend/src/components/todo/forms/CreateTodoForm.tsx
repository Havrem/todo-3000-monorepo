import { useForm } from "react-hook-form";
import styles from "@css/CreateTodoForm.module.scss";
import { toast } from "react-toastify";
import { useCreateTodo } from "@hooks/useTodos";
import type { CreateTodoRequest } from "@schemas/todo.schema";
import { ZodError } from "zod/v4";
import { ApiError } from "@utils/ApiError";
import { AppError } from "@utils/AppError";

interface CreateTodoFormProps {
  onCancel: () => void;
}

export const CreateTodoForm = ({ onCancel }: CreateTodoFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateTodoRequest>();
  const createTodo = useCreateTodo();

  const onSubmit = async (data: CreateTodoRequest) => {
    try {
      await createTodo.mutateAsync(data);
      toast.success("Todo created.");
      onCancel();
    } catch (error) {
      if (error instanceof ZodError) {
        toast.warn("Something went wrong while trying to create a todo!");
        console.error("Unexpected type in apiresponse. Zod parsing failed.");
      } else if (error instanceof ApiError) {
        console.warn("Something went wrong.", error);
      } else if (error instanceof AppError) {
        console.warn(error.message, error.cause);
      } else {
        console.warn("Something went wrong", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.mainContainer}>
      <h1>Create new todo</h1>

      <div className={styles.block}>
        <label>Title</label>
        <input
          type="text"
          {...register("title", {
            required: "Title is required",
            maxLength: {
              value: 100,
              message: "Maximum 100 characters allowed",
            },
          })}
          placeholder="Title..."
        />
        {errors.title && <p>{errors.title.message}</p>}
      </div>

      <div className={styles.block}>
        <label>Description</label>
        <input
          type="text"
          {...register("description", {
            maxLength: {
              value: 200,
              message: "Maximum 200 characters allowed",
            },
          })}
          placeholder="Description..."
        />
        {errors.description && <p>{errors.description.message}</p>}
      </div>

      <div className={styles.block}>
        <label>Due</label>
        <input
          type="date"
          {...register("due", {
            pattern: {
              value: /^\d{4}-\d{2}-\d{2}$/,
              message: "Date must be in YYYY-MM-DD format",
            },
          })}
        />
        {errors.due && <p>{errors.due.message}</p>}
      </div>

      <button type="submit" disabled={isSubmitting} className={styles.add}>
        Add
      </button>
      <button
        type="button"
        disabled={isSubmitting}
        className={styles.cancel}
        onClick={() => onCancel()}
      >
        Cancel
      </button>
    </form>
  );
};
