'use client';

import {
  CheckCircleIcon,
  CurrencyDollarIcon,
  StarIcon,
} from '@heroicons/react/24/solid';

import { useRef, useState } from 'react';

import SignInButton from '@/app/components/utils/SignInButton';
import { translations } from '@/app/i18n/translations';
import { Language } from '@/src/entities/Languages';
import { SubscriptionCheckoutResponse } from '@/src/entities/models/subscription';

import { createSubscription } from '../actions';

interface SubscriptionCardWithCheckoutFormProps {
  title: string;
  description: string;
  price: number;
  currency: 'USD' | 'UAH';
  period: 'month' | 'year';
  checkoutData: SubscriptionCheckoutResponse;
  withSignIn?: boolean;
  lang: Language;
}

export default function SubscriptionCardWithCheckoutForm({
  title,
  description,
  price,
  currency,
  period,
  checkoutData,
  withSignIn = false,
  lang,
}: SubscriptionCardWithCheckoutFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formRef = useRef<HTMLFormElement | null>(null);
  const t = translations[lang];

  const subscribe = async () => {
    if (formRef.current) {
      setIsLoading(true);
      const { success, error } = await createSubscription({
        orderId: checkoutData.orderId,
        price,
        currency,
        period,
      });
      setIsLoading(false);
      if (success) {
        formRef.current?.submit();
      } else {
        setError(error ?? 'Unknown error');
      }
    }
  };

  return (
    <article className="border rounded-xl p-4 flex flex-col bg-gradient-to-br from-white to-blue-50 shadow-sm hover:shadow-lg transition-shadow duration-200 relative group">
      {period === 'month' && (
        <span className="absolute top-2 right-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow text-yellow-900">
          <StarIcon className="w-4 h-4 inline-block" />{' '}
          {t.mostPopular || 'Most Popular'}
        </span>
      )}
      {period === 'year' && (
        <span className="absolute top-2 right-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow text-yellow-900">
          <CurrencyDollarIcon className="w-4 h-4 inline-block" />{' '}
          {t.twoMonthsFree || '2 months for free'}
        </span>
      )}
      <div className="flex-1">
        <div className="font-semibold text-lg flex items-center gap-2">
          <CheckCircleIcon className="w-5 h-5 text-blue-500" /> {title}
        </div>
        <div className="text-sm text-gray-500 mt-1 mb-2">{description}</div>
        <div className="text-xl font-bold mt-1 mb-2">
          {price} {currency}{' '}
          <span className="text-base font-medium text-gray-500">
            / {t[period === 'month' ? 'monthly' : 'yearly'] || period}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2 w-full sm:w-auto mt-4 sm:mt-0">
        <div className="w-full" />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        {withSignIn ? (
          <div className="w-fit">
            <SignInButton text={t.signIn || 'Sign in'} />
          </div>
        ) : (
          <button
            className={`mt-3 sm:mt-0 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-2 rounded-lg font-semibold shadow hover:from-blue-700 hover:to-blue-600 transition w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
            onClick={subscribe}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="text-gray-200">{t.loading || 'Loading...'}</div>
            ) : (
              `${t.subscribeFor || 'Subscribe for'} ${price} ${currency}`
            )}
          </button>
        )}
      </div>
      <form
        ref={formRef}
        id={`liqpay-form-${checkoutData.orderId}`}
        action={checkoutData.url}
        method="POST"
        className="contents"
      >
        <input type="hidden" name="data" value={checkoutData.data} />
        <input type="hidden" name="signature" value={checkoutData.signature} />
      </form>
    </article>
  );
}
