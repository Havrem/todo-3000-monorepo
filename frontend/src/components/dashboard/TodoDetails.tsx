import styles from "@css/TodoDetails.module.scss";
import type { Todo } from "@schemas/todo.schema";

export const TodoDetails = ({ todo }: { todo: Todo }) => {
  return (
    <div className={styles.mainContainer}>
      <h2>Details</h2>
      <p>
        Title: <span>{todo.title}</span>
      </p>
      <p>
        Description: <span>{todo.description}</span>
      </p>
      <p>
        Due: <span>{todo.due.format("YYYY MM DD")}</span>
      </p>
      <p>
        Status: <span> {todo.completed ? "Done" : "Not done"}</span>
      </p>
    </div>
  );
};
