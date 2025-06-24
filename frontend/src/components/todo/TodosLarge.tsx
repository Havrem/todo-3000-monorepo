import { useEffect, useState } from "react";
import styles from "@css/TodosLarge.module.scss";
import { useTodos } from "@hooks/useTodos";
import { TodoItem } from "./TodoItem";
import type { Todo } from "@schemas/todo.schema";
import Modal from "react-modal";
import { CreateTodoForm } from "./forms/CreateTodoForm";
import { EditTodoForm } from "./forms/EditTodoForm";
import { PuffLoader } from "react-spinners";
import { ZodError } from "zod/v4";
import { toast } from "react-toastify";
import { ApiError } from "@utils/ApiError";
import { AppError } from "@utils/AppError";

export const TodosLarge = () => {
  const { data: todos = [], isLoading, error } = useTodos();
  const [createModalIsOpen, setCreateModalIsOpen] = useState<boolean>(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState<boolean>(false);
  const [todoToBeEdited, setTodoToBeEdited] = useState<Todo | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selected = todos.find((t) => t.id === selectedId) ?? null;

  useEffect(() => {
    if (error) {
      toast.warn("Something went wrong while retrieving todos!");
      if (error instanceof ZodError) {
        console.error("Unexpected type in apiresponse. Zod parsing failed.");
      } else if (error instanceof ApiError) {
        console.warn("Something went wrong.", error);
      } else if (error instanceof AppError) {
        console.warn(error.message, error.cause);
      } else {
        console.warn("Something went wrong", error);
      }
    }
  }, [error]);

  const handleAdd = () => {
    setCreateModalIsOpen(true);
  };

  useEffect(() => {
    if (todos.length === 0) {
      setSelectedId(null);
      return;
    }

    if (!selected) {
      setSelectedId(todos[0].id);
    }
  }, [todos, selected]);

  if (isLoading)
    return (
      <div className={styles.spinner}>
        <PuffLoader color="#36d7b7" size={200} />
      </div>
    );

  return (
    <div className={styles.mainContainer}>
      <div className={styles.top}>
        <h1>Todos</h1>
        <button className={styles.addBtn} onClick={handleAdd}>
          Add Todo
        </button>
      </div>

      <div className={styles.bottom}>
        <div className={styles.left}>
          <h2>Manage</h2>
          <div className={styles.list}>
            {todos.map((todo) => (
              <TodoItem
                todo={todo}
                key={todo.id}
                select={(todo) => setSelectedId(todo.id)}
                edit={(todo) => {
                  setTodoToBeEdited(todo);
                  setEditModalIsOpen(true);
                }}
              />
            ))}
          </div>
        </div>

        <div className={styles.right}>
          <h2>Details</h2>
          {selected ? (
            <div className={styles.info}>
              <p>
                Title: <span>{selected.title}</span>
              </p>
              <p>
                Description: <span>{selected.description}</span>
              </p>
              <p>
                Due: <span>{selected.due.format("YYYY MM DD")}</span>
              </p>
              <p>
                Status: <span> {selected.completed ? "Done" : "Not done"}</span>
              </p>
            </div>
          ) : (
            <div className={styles.info}>
              <p>Select a todo to view details.</p>
            </div>
          )}
          <div className={styles.filler}></div>
        </div>
      </div>

      <Modal
        isOpen={createModalIsOpen}
        onRequestClose={() => setCreateModalIsOpen(false)}
        className={styles.createModal}
        overlayClassName={styles.modalOverlay}
      >
        <CreateTodoForm onCancel={() => setCreateModalIsOpen(false)} />
      </Modal>

      <Modal
        isOpen={editModalIsOpen}
        onRequestClose={() => setEditModalIsOpen(false)}
        className={styles.editModal}
        overlayClassName={styles.modalOverlay}
      >
        {todoToBeEdited && (
          <EditTodoForm
            todo={todoToBeEdited}
            onCancel={() => {
              setTodoToBeEdited(null);
              setEditModalIsOpen(false);
            }}
          />
        )}
      </Modal>
    </div>
  );
};
