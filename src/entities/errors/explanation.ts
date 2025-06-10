export class InvalidWordError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
  }
}

export class BadWordError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
  }
}

export class ExplanationNotFoundError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
  }
}
