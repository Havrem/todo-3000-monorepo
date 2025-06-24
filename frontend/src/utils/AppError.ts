export class AppError extends Error {
  public cause?: unknown;

  constructor({ message, cause }: { message: string; cause?: unknown }) {
    super(message);
    this.cause = cause;
  }
}
