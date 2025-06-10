'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { translations } from '@/app/i18n/translations';
import { setSubscriptionId } from '@/app/middleware/subscription';
import { Language } from '@/src/entities/Languages';
import {
  SubscriptionCheckoutResponse,
  UserSubscription,
} from '@/src/entities/models/subscription';
import { UserPresentation } from '@/src/entities/models/user';

import {
  cancelSubscription,
  getMonthlySubscriptionCheckout,
  getYearlySubscriptionCheckout,
} from '../actions';
import SubscriptionCardWithCheckoutForm from './SubscriptionCardWithCheckoutForm';

interface SubscriptionsProps {
  user: UserPresentation | null;
  activeSubscription: UserSubscription | null;
  lang: Language;
}

export default function Subscriptions({
  user,
  activeSubscription,
  lang,
}: SubscriptionsProps) {
  const router = useRouter();
  const t = translations[lang];

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [monthlyCheckout, setMonthlyCheckout] =
    useState<SubscriptionCheckoutResponse | null>(null);
  const [yearlyCheckout, setYearlyCheckout] =
    useState<SubscriptionCheckoutResponse | null>(null);

  const onCancelClick = async () => {
    if (!activeSubscription) return;
    setIsLoading(true);

    const res = await cancelSubscription(activeSubscription.orderId);
    if (res.success) {
      router.refresh();
    }
    if (res.error) {
      setError(res.error as string);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (activeSubscription) return;

    let mounted = true;
    setIsLoading(true);

    Promise.all([
      getMonthlySubscriptionCheckout(),
      getYearlySubscriptionCheckout(),
    ])
      .then(([monthly, yearly]) => {
        if (!mounted) return;
        if (monthly.data) {
          setMonthlyCheckout(monthly.data);
        }
        if (yearly.data) {
          setYearlyCheckout(yearly.data);
        }
        if (monthly.error || yearly.error) {
          setError(monthly.error || yearly.error || 'Failed to load products');
        }
      })
      .catch(() => {
        if (mounted) setError('Failed to load products');
      })
      .finally(() => {
        if (mounted) setIsLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (activeSubscription) {
      setSubscriptionId().then();
    }
  }, [activeSubscription]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return (
    <section className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-4">
        {t.availableSubscriptions || 'Available Subscriptions'}
      </h2>
      {activeSubscription ? (
        <div className="mb-6 p-4 rounded border bg-blue-50 border-blue-200">
          <div className="font-semibold text-blue-800 mb-1">
            {t.activeSubscription || 'Your Active Subscription'}
          </div>
          <div className="text-sm text-blue-900">
            {t.status || 'Status:'}{' '}
            <span className="font-medium">{activeSubscription.status}</span>
          </div>
          <div className="text-sm text-blue-900">
            {t.type || 'Type:'}{' '}
            <span className="font-medium">{activeSubscription.period}</span>
          </div>
          <div className="text-sm text-blue-900">
            {t.price || 'Price:'}{' '}
            <span className="font-medium">
              {activeSubscription.price} {activeSubscription.currency}
            </span>
          </div>
          <div className="text-xs text-blue-700 mt-2">
            {t.renewsAutomatically || 'Renews automatically.'}
            <button
              className="text-red-500 hover:text-red-700 mt-2"
              onClick={onCancelClick}
            >
              {t.cancelSubscription || 'Cancel Subscription'}
            </button>
          </div>
        </div>
      ) : null}
      <div className="mb-6 p-4 rounded bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
        <div className="font-semibold text-blue-800 mb-2 text-base flex items-center gap-2">
          <svg
            className="w-5 h-5 text-blue-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {t.premiumFeaturesTitle || 'Premium features for subscribers:'}
        </div>
        <ul className="list-disc pl-5 text-blue-900 text-sm space-y-1">
          <li>
            {t.premiumFeature1 ||
              'Get a simple explanation, 3 examples, a fun game idea, and an interesting fact for every word or phrase'}
          </li>
          <li>
            {t.premiumFeature2 ||
              'See a generated image for each word or phrase'}
          </li>
          <li>{t.premiumFeature3 || 'Unlimited explanations'}</li>
        </ul>
      </div>
      {isLoading ? (
        <div className="text-center py-6">
          <span className="animate-spin inline-block w-6 h-6 border-4 border-blue-400 border-t-transparent rounded-full"></span>
        </div>
      ) : null}
      {error ? <div className="text-red-500 text-sm mb-4">{error}</div> : null}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {monthlyCheckout && !activeSubscription ? (
          <SubscriptionCardWithCheckoutForm
            title={t.monthly || 'Monthly'}
            description=""
            price={5}
            currency="USD"
            period="month"
            checkoutData={monthlyCheckout}
            withSignIn={!user}
            lang={lang}
          />
        ) : null}
        {yearlyCheckout && !activeSubscription ? (
          <SubscriptionCardWithCheckoutForm
            title={t.yearly || 'Yearly'}
            description=""
            price={50}
            currency="USD"
            period="year"
            checkoutData={yearlyCheckout}
            withSignIn={!user}
            lang={lang}
          />
        ) : null}
      </section>
    </section>
  );
}
