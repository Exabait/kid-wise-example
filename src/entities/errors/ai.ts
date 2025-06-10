export class AIResponseError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
  }
}
