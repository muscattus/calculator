export class LastHistoryError extends Error {
  constructor(message: string) {
    super();
    this.message = message;
    this.name = "LastHistoryError";
  }
}