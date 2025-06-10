import { Suspense } from 'react';

import { UserSubscription } from '@/src/entities/models/subscription';

import { getUser } from '../actions';
import { getLanguageCookie } from '../i18n/actions';
import { getUserSubscription } from './actions';
import Subscriptions from './components/Subscriptions';
import UserInfo from './components/UserInfo';

export const dynamic = 'force-dynamic';

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ fromCheckout?: string; fromAuth?: string }>;
}) {
  const { fromCheckout, fromAuth } = await searchParams;

  if (fromCheckout) {
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  const { data: user, error: userError } = await getUser();

  const lang = await getLanguageCookie();

  let subscription: UserSubscription | null = null;
  let subscriptionError: string | null = null;
  if (user) {
    const subscriptionResponse = await getUserSubscription();
    subscription = subscriptionResponse.data;
    if (subscriptionResponse.error) {
      subscriptionError = subscriptionResponse.error;
    }
  }

  const loader = (
    <section className="bg-white rounded-lg shadow p-4">
      <div className="text-center py-6">
        <span className="animate-spin inline-block w-6 h-6 border-4 border-blue-400 border-t-transparent rounded-full"></span>
      </div>
    </section>
  );

  return (
    <>
      <main className="w-full mx-auto p-4 md:p-8 flex flex-col gap-8 md:gap-10 bg-kidwise-background min-h-screen bg-dots shadow-xl">
        {userError || subscriptionError ? (
          <section className="bg-white rounded-lg shadow p-4">
            <div className="text-red-500 text-sm">
              {userError || subscriptionError}
            </div>
          </section>
        ) : null}
        {fromAuth && !user ? (
          loader
        ) : (
          <>
            <Suspense fallback={loader}>
              <UserInfo user={user} subscription={subscription} />
            </Suspense>
            <Suspense fallback={fromAuth ? loader : null}>
              <Subscriptions
                user={user}
                activeSubscription={subscription}
                lang={lang}
              />
            </Suspense>
          </>
        )}
      </main>
    </>
  );
}
