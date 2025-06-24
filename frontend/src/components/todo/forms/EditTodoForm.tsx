import { useForm } from "react-hook-form";
import styles from "@css/CreateTodoForm.module.scss";
import { toast } from "react-toastify";
import { useUpdateTodo } from "@hooks/useTodos";
import type { UpdateTodoRequest, Todo } from "@schemas/todo.schema";
import { ZodError } from "zod/v4";
import { ApiError } from "@utils/ApiError";
import { AppError } from "@utils/AppError";

interface EditTodoFormProps {
  onCancel: () => void;
  todo: Todo;
}

export const EditTodoForm = ({ onCancel, todo }: EditTodoFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateTodoRequest>();
  const updateTodo = useUpdateTodo();

  const onSubmit = async (data: UpdateTodoRequest) => {
    try {
      await updateTodo.mutateAsync({ id: todo.id, data: data });
      toast.success("Todo updated.");
      onCancel();
    } catch (error) {
      if (error instanceof ZodError) {
        toast.warn("Something went wrong while trying to edit a todo!");
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
      <h1>Edit todo</h1>

      <div className={styles.block}>
        <label>Title</label>
        <input
          defaultValue={todo.title}
          type="text"
          {...register("title", {
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
          defaultValue={todo.description}
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
          defaultValue={todo.due.format("YYYY-MM-DD")}
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
        Update
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
