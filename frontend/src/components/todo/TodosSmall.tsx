import { useEffect, useState } from "react";
import styles from "@css/TodosSmall.module.scss";
import { useTodos } from "@hooks/useTodos";
import { TodoItem } from "./TodoItem";
import type { Todo } from "@schemas/todo.schema";
import Modal from "react-modal";
import { CreateTodoForm } from "./forms/CreateTodoForm";
import { EditTodoForm } from "./forms/EditTodoForm";
import { TodoDetails } from "../dashboard/TodoDetails";
import { PuffLoader } from "react-spinners";
import { toast } from "react-toastify";
import { ZodError } from "zod/v4";
import { ApiError } from "@utils/ApiError";
import { AppError } from "@utils/AppError";

Modal.setAppElement("#root");

export const TodosSmall = () => {
  const { data: todos = [], isLoading, error } = useTodos();
  const [createModalIsOpen, setCreateModalIsOpen] = useState<boolean>(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState<boolean>(false);
  const [detailsModalIsOpen, setDetailsModalIsOpen] = useState<boolean>(false);
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

  if (error) {
    if (error instanceof ZodError) {
      toast.warn("Something went wrong while retrieving todos!");
      console.error("Unexpected type in apiresponse. Zod parsing failed.");
    } else if (error instanceof ApiError) {
      console.warn("Something went wrong.", error);
    } else {
      console.warn("Something went wrong", error);
    }
  }

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
                select={(todo) => {
                  setSelectedId(todo.id);
                  setDetailsModalIsOpen(true);
                }}
                edit={(todo) => {
                  setTodoToBeEdited(todo);
                  setEditModalIsOpen(true);
                }}
              />
            ))}
          </div>
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

      <Modal
        isOpen={detailsModalIsOpen}
        onRequestClose={() => setDetailsModalIsOpen(false)}
        className={styles.detailsModal}
        overlayClassName={styles.modalOverlay}
      >
        {selected && <TodoDetails todo={selected} />}
      </Modal>
    </div>
  );
};
