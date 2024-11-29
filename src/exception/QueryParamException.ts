export class QueryParamException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}
