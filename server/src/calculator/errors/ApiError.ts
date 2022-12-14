export class ApiError {
  code: number;
  message: string;
  name: string;
  constructor(code: number, message: string, name: string) {
    this.code = code;
    this.message = message;
    this.name = name;
  }

  static internalError(message: string, name: string) {
    return new ApiError(500, message, name);
  }

  static unavailable(message: string, name: string) {
    return new ApiError(503, message, name)
  }
}