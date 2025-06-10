import SignInButton from '@/app/components/utils/SignInButton';
import { getLanguageCookie } from '@/app/i18n/actions';
import { translations } from '@/app/i18n/translations';
import { UserSubscription } from '@/src/entities/models/subscription';
import { UserPresentation } from '@/src/entities/models/user';

import { getExplanationLimitInfo } from '../actions';

export default async function UserInfo({
  user,
  subscription,
}: {
  user: UserPresentation | null;
  subscription: UserSubscription | null;
}) {
  const { explanationCount, resetTime } = await getExplanationLimitInfo();

  const lang = await getLanguageCookie();
  const t = translations[lang];

  // Helper to format reset time
  function formatResetTime(ts: number | null) {
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);

    const now = Date.now();
    const diff = (ts || midnight.getTime()) - now;

    if (diff <= 0) return t.loading || 'soon';

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  }

  const showLimits = !user || !subscription;

  return (
    <section className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-2">
        {t.userInfoTitle || 'Your Info'}
      </h2>
      {user ? (
        <div className="text-sm text-gray-700">
          <div>
            <span className="font-medium">{t.name || 'Name:'}</span> {user.name}
          </div>
          <div>
            <span className="font-medium">{t.email || 'Email:'}</span>{' '}
            {user.email}
          </div>
        </div>
      ) : (
        <div className="md:w-fit">
          <SignInButton text={t.signIn || 'Sign in'} />
        </div>
      )}
      {showLimits && (
        <div className="mt-4 text-sm text-gray-700 bg-blue-50 rounded p-3">
          <div>
            <span className="font-medium">Explanations today:</span>{' '}
            {explanationCount} / 3
          </div>
          <div>
            <span className="font-medium">Limit resets in:</span>{' '}
            {formatResetTime(resetTime)}
          </div>
        </div>
      )}
    </section>
  );
}
