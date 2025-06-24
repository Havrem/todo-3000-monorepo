import type { ErrorDetail, ErrorResponse } from "@schemas/api.schema";

export class ApiError extends Error {
  public code: number;
  public errorDetails: ErrorDetail[];

  constructor(errorResponse: ErrorResponse) {
    super(errorResponse.message);
    this.code = errorResponse.code;
    this.errorDetails = errorResponse.errors;
  }
}
