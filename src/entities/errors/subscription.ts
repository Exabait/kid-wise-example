export class InvalidSignatureError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
  }
}

export class SubscriptionCreateError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
  }
}

export class SubscriptionUpdateError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
  }
}

export class SubscriptionNotFoundError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
  }
}
