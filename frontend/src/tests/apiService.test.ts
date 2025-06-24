import { z } from "zod/v4";
import { describe, expect, it, vi } from "vitest";
import { apiService } from "@services/apiService";
import { ApiError } from "@utils/ApiError";
import { beforeEach } from "node:test";

const aSchema = z.object({
  id: z.number(),
  name: z.string(),
});

global.fetch = vi.fn();
const mockFetch = global.fetch as unknown as ReturnType<typeof vi.fn>;

vi.mock("../services/firebaseService", () => ({
  auth: {
    currentUser: {
      getIdToken: vi.fn().mockResolvedValue("mock-token-123"),
    },
  },
}));

beforeEach(() => {
  mockFetch.mockReset();
});

it("returns parsed data on success", async () => {
  mockFetch.mockResolvedValueOnce({
    ok: true,
    status: 200,
    json: async () => [{ id: 1, name: "Test" }],
  });

  const data = await apiService.get("/test", z.array(aSchema));
  expect(data[0].id).toBe(1);
  expect(data[0].name).toBe("Test");
});

it("throws ApiError on API error response", async () => {
  const error = {
    code: 400,
    message: "Validation failed due to one or more issues.",
    errors: [
      {
        code: "titleRequired",
        message: "Title is required",
        location: "field",
        locationType: "title",
      },
    ],
  };

  mockFetch.mockResolvedValueOnce({
    ok: false,
    status: 400,
    json: async () => error,
  });

  await expect(apiService.get("/test", z.array(aSchema))).rejects.toThrow(
    ApiError,
  );
});

it("throws ZodError on schema validation fail", async () => {
  mockFetch.mockResolvedValueOnce({
    ok: true,
    status: 200,
    json: async () => ({ id: "not-a-number", name: "Test" }),
  });

  await expect(apiService.get("/test", z.array(aSchema))).rejects.toThrow(
    z.ZodError,
  );
});

it("throws generic Error if response body is not valid JSON", async () => {
  mockFetch.mockResolvedValueOnce({
    ok: false,
    status: 500,
    json: async () => {
      throw new Error("Unexpected token < in JSON");
    },
  });

  await expect(apiService.get("/test", z.array(aSchema))).rejects.toThrow(
    "Error formatting response to json.",
  );
});

it('throws "Unknown error during request" for non-standard error', async () => {
  mockFetch.mockImplementationOnce(() => {
    throw "totally weird failure";
  });

  await expect(apiService.get("/test", z.array(aSchema))).rejects.toThrow(
    "Unknown error during request.",
  );
});

describe("apiService token handling", () => {
  it("adds Authorization header if Firebase token exists", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => [{ id: 1, name: "Test" }],
    });

    await apiService.get("/test", z.array(aSchema));

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/test"),
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer mock-token-123",
        }),
      }),
    );
  });
});
