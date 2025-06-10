export interface UserSubscription {
  id: string;
  orderId: string;
  userId: string;
  price: number;
  currency: 'USD' | 'UAH';
  period: 'month' | 'year';
  status: 'active' | 'cancelled' | 'pending';
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateSubscription
  extends Pick<
    UserSubscription,
    'userId' | 'orderId' | 'price' | 'currency' | 'period'
  > {}

export interface SubscriptionFormOptions {
  description: string;
  callbackUrl: string;
  redirectUrl: string;
  amount: `${number}`;
  currency: 'USD' | 'UAH';
  subscribe_periodicity: 'month' | 'year';
}

export interface SubscriptionCheckoutOptions extends SubscriptionFormOptions {}

export interface SubscriptionCheckoutResponse {
  url: string;
  data: string;
  signature: string;
  orderId: string;
}
