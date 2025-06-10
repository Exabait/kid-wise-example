import { SupabaseClient } from '@supabase/supabase-js';
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

import { ISupabaseService } from '@/src/application/services/supabase.service.interface';
import { AppActionResponse, AppResponse } from '@/src/entities/common';
import {
  InvalidSignatureError,
  SubscriptionUpdateError,
} from '@/src/entities/errors/subscription';
import {
  ICreateSubscription,
  SubscriptionCheckoutOptions,
  SubscriptionCheckoutResponse,
  SubscriptionFormOptions,
  UserSubscription,
} from '@/src/entities/models/subscription';

import { ISubscriptionsRepository } from '../../application/repositories/subscription.repository.interface';

const LiqPay = require('liqpay-sdk-nodejs');

export class SubscriptionsRepository implements ISubscriptionsRepository {
  private liqpay: typeof LiqPay;
  private supabaseClient: SupabaseClient;

  constructor(private readonly supabaseService: ISupabaseService) {
    this.liqpay = new LiqPay(
      process.env.LIQPAY_PUBLIC_KEY as string,
      process.env.LIQPAY_PRIVATE_KEY as string
    );
    this.supabaseClient = this.supabaseService.getClientWithServiceRole();
  }

  async getUserSubscription(
    userId: string
  ): Promise<{ data: UserSubscription | null; error: any }> {
    const result = await this.supabaseClient
      .from('subscriptions')
      .select('*')
      .eq('profile_id', userId)
      .eq('status', 'active')
      .maybeSingle();
    return {
      data: result.data
        ? this.dbSubscriptionToUserSubscription(result.data)
        : null,
      error: result.error?.message,
    };
  }

  async getAllUserSubscriptions(
    userId: string
  ): Promise<{ data: UserSubscription[]; error: any }> {
    const result = await this.supabaseClient
      .from('subscriptions')
      .select('*')
      .eq('profile_id', userId);
    return {
      data: result.data
        ? result.data.map(this.dbSubscriptionToUserSubscription)
        : [],
      error: result.error?.message,
    };
  }

  async createSubscription(options: ICreateSubscription) {
    const { error } = await this.supabaseClient.from('subscriptions').insert({
      profile_id: options.userId,
      status: 'pending',
      order_id: options.orderId,
      price: options.price,
      currency: options.currency,
      period: options.period,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  }

  createSubscriptionForm(options: SubscriptionFormOptions): {
    form: string;
    orderId: string;
  } {
    const orderId = uuidv4();
    const subscribeDateStart = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

    const form: string = this.liqpay.cnb_form({
      action: 'subscribe',
      version: '3',
      subscribe_date_start: subscribeDateStart,
      amount: options.amount,
      currency: options.currency,
      description: options.description,
      order_id: orderId,
      subscribe_periodicity: options.subscribe_periodicity,
      result_url: options.redirectUrl,
      server_url: options.callbackUrl,
    });

    return { form, orderId };
  }

  getSubscriptionCheckout(
    options: SubscriptionCheckoutOptions
  ): AppResponse<SubscriptionCheckoutResponse> {
    try {
      const orderId = uuidv4();
      const subscribeDateStart = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

      const params = this.liqpay.cnb_params({
        action: 'subscribe',
        version: '3',
        subscribe_date_start: subscribeDateStart,
        amount: options.amount,
        currency: options.currency,
        description: options.description,
        order_id: orderId,
        subscribe_periodicity: options.subscribe_periodicity,
        result_url: options.redirectUrl,
        server_url: options.callbackUrl,
      });

      const data = Buffer.from(JSON.stringify(params)).toString('base64');
      const signature = this.liqpay.str_to_sign(
        ((process.env.LIQPAY_PRIVATE_KEY as string) +
          data +
          process.env.LIQPAY_PRIVATE_KEY) as string
      );

      return {
        data: {
          url: 'https://www.liqpay.ua/api/3/checkout',
          data,
          signature,
          orderId,
        },
      };
    } catch (error) {
      console.error(error);
      return { data: null, error: 'Failed to get subscription checkout' };
    }
  }

  async cancelSubscription(subscriptionId: string): Promise<AppActionResponse> {
    const unsubscribe = await this.liqpay.api('request', {
      action: 'unsubscribe',
      version: '3',
      order_id: subscriptionId,
    });

    try {
      await unsubscribe;
      await this.supabaseClient
        .from('subscriptions')
        .update({
          status: 'cancelled',
          updated_at: new Date(),
        })
        .eq('order_id', subscriptionId);
      return { success: true };
    } catch (error: any) {
      console.error(error);
      return { success: false, error: error.message };
    }
  }

  async deleteSubscription(subscriptionId: string): Promise<AppActionResponse> {
    const { error } = await this.supabaseClient
      .from('subscriptions')
      .delete()
      .eq('id', subscriptionId);
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  }

  async updateSubscription(
    subscriptionId: string,
    options: Partial<UserSubscription>
  ): Promise<AppActionResponse> {
    const dbSubscription = this.userSubscriptionToDbSubscription(options);
    for (const key in dbSubscription) {
      if (dbSubscription[key] === undefined) {
        delete dbSubscription[key];
      }
    }
    const { error } = await this.supabaseClient
      .from('subscriptions')
      .update(dbSubscription)
      .eq('id', subscriptionId);
    return { success: !error, error: error?.message };
  }

  async handlePaymentCallback(data: {
    data: string;
    signature: string;
  }): Promise<AppResponse<{ orderId: string }>> {
    const sign = this.liqpay.str_to_sign(
      ((process.env.LIQPAY_PRIVATE_KEY as string) +
        data.data +
        process.env.LIQPAY_PRIVATE_KEY) as string
    );

    if (sign !== data.signature) {
      throw new InvalidSignatureError('Invalid signature', { cause: data });
    }

    const decodedData = Buffer.from(data.data, 'base64').toString('utf-8');
    const parsedData: { order_id: string } = JSON.parse(decodedData);

    const result = await this.supabaseClient
      .from('subscriptions')
      .update({
        status: 'active',
        updated_at: new Date(),
      })
      .eq('order_id', parsedData.order_id)
      .select('id')
      .single();

    console.log('handlePaymentCallback result', result);

    if (result.error) {
      throw new SubscriptionUpdateError(
        'Failed to update subscription confirmation status',
        { cause: result.error }
      );
    }

    return { data: { orderId: result.data?.id } };
  }

  private dbSubscriptionToUserSubscription(data: any): UserSubscription {
    return {
      id: data.id,
      userId: data.profile_id,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      status: data.status,
      orderId: data.order_id,
      price: data.price,
      currency: data.currency,
      period: data.period,
    };
  }

  private userSubscriptionToDbSubscription(
    data: Partial<UserSubscription>
  ): any {
    return {
      id: data.id,
      profile_id: data.userId,
      status: data.status,
      order_id: data.orderId,
      price: data.price,
      currency: data.currency,
      period: data.period,
      created_at: data.createdAt,
      updated_at: data.updatedAt,
    };
  }
}
