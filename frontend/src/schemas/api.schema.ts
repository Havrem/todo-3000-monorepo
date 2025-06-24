import { z } from "zod/v4";

export const errorDetailSchema = z.object({
  code: z.string(),
  message: z.string(),
  location: z.string(),
  locationType: z.string(),
});
export type ErrorDetail = z.infer<typeof errorDetailSchema>;

export const errorResponseSchema = z.object({
  code: z.number(),
  message: z.string(),
  errors: z.array(errorDetailSchema),
});
export type ErrorResponse = z.infer<typeof errorResponseSchema>;
