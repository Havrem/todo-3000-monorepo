import type { Todo, UpdateTodoRequest } from "../../schemas/todo.schema";
import styles from "@css/TodoItem.module.scss";
import { RemoveIcon } from "@icons/RemoveIcon";
import { CompleteIcon } from "@icons/CompleteIcon";
import { NotCompleteIcon } from "@icons/NotCompleteIcon";
import { useDeleteTodo, useUpdateTodo } from "@hooks/useTodos";
import { toast } from "react-toastify";
import { EditIcon } from "@icons/EditIcon";
import { ZodError } from "zod/v4";
import { ApiError } from "@utils/ApiError";
import { AppError } from "@utils/AppError";

export const TodoItem = ({
  todo,
  select,
  edit,
}: {
  todo: Todo;
  select: (todo: Todo) => void;
  edit: (todo: Todo) => void;
}) => {
  const deleteTodo = useDeleteTodo();
  const updateTodo = useUpdateTodo();

  const handleComplete = async () => {
    const updateRequest: UpdateTodoRequest = {
      completed: !todo.completed,
    };

    try {
      await updateTodo.mutateAsync({ id: todo.id, data: updateRequest });
      toast.success("Todo updated.");
    } catch (error) {
      if (error instanceof ZodError) {
        toast.warn("Something went wrong while trying to update a todo!");
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

  const handleSelect = () => {
    select(todo);
  };

  const handleEdit = () => {
    edit(todo);
  };

  const handleRemove = async () => {
    try {
      await deleteTodo.mutateAsync(todo.id);
      toast.success("Todo removed.");
    } catch (error) {
      if (error instanceof ZodError) {
        toast.warn("Something went wrong while trying to remove a todo!");
        console.error("Unexpected type in apiresponse. Zod parsing failed.");
      } else if (error instanceof ApiError) {
        console.warn("Something went wrong.", error);
      } else {
        console.warn("Something went wrong", error);
      }
    }
  };

  return (
    <div className={styles.mainContainer}>
      {todo.completed ? (
        <button onClick={() => handleComplete()}>
          <CompleteIcon width={30} height={30} fill="#000000" />
        </button>
      ) : (
        <button onClick={() => handleComplete()}>
          <NotCompleteIcon width={30} height={30} fill="#000000" />
        </button>
      )}
      <button onClick={() => handleSelect()}>
        {todo.completed ? (
          <p style={{ textDecoration: "line-through", color: "gray" }}>
            {todo.title}
          </p>
        ) : (
          <p>{todo.title}</p>
        )}
      </button>
      <div className={styles.left}>
        <button onClick={handleEdit} className={styles.edit}>
          <EditIcon width={30} height={30} fill="none" />
        </button>
        <button className={styles.remove} onClick={() => handleRemove()}>
          <RemoveIcon width={30} height={30} stroke="black" fill="none" />
        </button>
      </div>
    </div>
  );
};
