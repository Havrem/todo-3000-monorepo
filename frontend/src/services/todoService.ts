import type {
  CreateTodoRequest,
  UpdateTodoRequest,
} from "@schemas/todo.schema";
import { todoSchema, type Todo } from "@schemas/todo.schema";
import { apiService } from "./apiService";
import { z } from "zod/v4";

function getTodos(): Promise<Todo[]> {
  return apiService.get("/todos", z.array(todoSchema));
}

function createTodo(data: CreateTodoRequest) {
  return apiService.post("/todos", data, todoSchema);
}

function updateTodo(id: number, data: UpdateTodoRequest) {
  return apiService.put(`/todos/${id}`, data, todoSchema);
}

function deleteTodo(id: number) {
  return apiService.del(`/todos/${id}`);
}

export const todoService = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
