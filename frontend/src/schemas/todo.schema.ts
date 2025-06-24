import dayjs from "dayjs";
import { z } from "zod/v4";

export const todoSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  due: z.iso.date().transform((val) => dayjs(val)),
  completed: z.boolean(),
});
export type Todo = z.infer<typeof todoSchema>;

export const createTodoRequestSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  due: z.iso.date(),
});
export type CreateTodoRequest = z.infer<typeof createTodoRequestSchema>;

export const updateTodoRequestSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  due: z.iso.date().optional(),
  completed: z.boolean().optional(),
});
export type UpdateTodoRequest = z.infer<typeof updateTodoRequestSchema>;
