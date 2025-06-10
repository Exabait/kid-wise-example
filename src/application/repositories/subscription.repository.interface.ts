import { AppActionResponse, AppResponse } from '@/src/entities/common';
import {
  ICreateSubscription,
  SubscriptionCheckoutOptions,
  SubscriptionCheckoutResponse,
  SubscriptionFormOptions,
  UserSubscription,
} from '@/src/entities/models/subscription';

export interface ISubscriptionsRepository {
  createSubscriptionForm(options: SubscriptionFormOptions): {
    form: string;
    orderId: string;
  };
  getSubscriptionCheckout(
    options: SubscriptionCheckoutOptions
  ): AppResponse<SubscriptionCheckoutResponse>;
  getUserSubscription(
    userId: string
  ): Promise<AppResponse<UserSubscription | null>>;
  getAllUserSubscriptions(
    userId: string
  ): Promise<AppResponse<UserSubscription[]>>;
  handlePaymentCallback(data: {
    data: string;
    signature: string;
  }): Promise<AppResponse<{ orderId: string }>>;
  createSubscription(options: ICreateSubscription): Promise<AppActionResponse>;
  deleteSubscription(
    subscriptionId: string
  ): Promise<AppActionResponse<unknown>>;
  cancelSubscription(
    subscriptionId: string
  ): Promise<AppActionResponse<unknown>>;
  updateSubscription(
    subscriptionId: string,
    options: Partial<UserSubscription>
  ): Promise<AppActionResponse<unknown>>;
}
