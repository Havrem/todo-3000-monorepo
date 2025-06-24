import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { todoService } from "@services/todoService";
import {
  type Todo,
  type CreateTodoRequest,
  type UpdateTodoRequest,
} from "@schemas/todo.schema";

export function useTodos() {
  return useQuery({
    queryKey: ["todos"],
    queryFn: (): Promise<Todo[]> => todoService.getTodos(),
  });
}

export function useCreateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTodoRequest) => todoService.createTodo(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });
}

export function useUpdateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateTodoRequest }) =>
      todoService.updateTodo(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => todoService.deleteTodo(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });
}
