export class ApiError {
  code: number;
  message: string;
  name: string;
  constructor(code: number, message: string, name: string) {
    this.code = code;
    this.message = message;
    this.name = name;
  }

  static badRequest(message: string, name: string) {
    return new ApiError(400, message, name);
  }

  static internal(message: string, name: string) {
    return new ApiError(500, message, name)
  }
}