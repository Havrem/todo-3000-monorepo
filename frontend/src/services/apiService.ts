import type { ZodType } from "zod/v4";
import { z } from "zod/v4";
import { errorResponseSchema } from "@schemas/api.schema";
import { ApiError } from "@utils/ApiError";
import { auth } from "./firebaseService";
import { AppError } from "@utils/AppError";

const BASE_URL = import.meta.env.VITE_API_URL;

async function request<T>(
  path: string,
  options: RequestInit = {},
  schema: ZodType<T>,
): Promise<T> {
  const token = await auth.currentUser?.getIdToken();

  const headers: HeadersInit = {
    ...(options.method !== "GET" && { "Content-Type": "application/json" }),
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      ...options, //Method, body etc...
      headers,
    });

    let data: unknown;

    if (res.status === 204) {
      data = undefined;
      return schema.parse(data);
    }

    try {
      data = await res.json();
    } catch (err) {
      throw new AppError({
        message: "Error formatting response to json.",
        cause: err,
      });
    }

    if (!res.ok) {
      const errorResponse = errorResponseSchema.parse(data);
      throw new ApiError(errorResponse);
    }

    return schema.parse(data);
  } catch (err) {
    if (
      err instanceof z.ZodError ||
      err instanceof ApiError ||
      err instanceof Error
    ) {
      throw err;
    }

    throw new AppError({
      message: "Unknown error during request.",
      cause: err,
    });
  }
}

function get<T>(path: string, schema: ZodType<T[]>): Promise<T[]> {
  return request(
    path,
    {
      method: "GET",
    },
    schema,
  );
}

function post<T>(path: string, body: unknown, schema: ZodType<T>): Promise<T> {
  return request(
    path,
    {
      method: "POST",
      body: JSON.stringify(body),
    },
    schema,
  );
}

function put<T>(path: string, body: unknown, schema: ZodType<T>): Promise<T> {
  return request(
    path,
    {
      method: "PUT",
      body: JSON.stringify(body),
    },
    schema,
  );
}

function del(path: string): Promise<void> {
  return request(
    path,
    {
      method: "DELETE",
    },
    z.undefined(),
  );
}

export const apiService = {
  get,
  post,
  put,
  del,
};
