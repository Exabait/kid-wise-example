import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
      <h1 className="text-4xl font-extrabold text-kidwise-blue mb-4">404</h1>
      <p className="text-lg text-gray-700 mb-2">
        Page not found / Сторінку не знайдено
      </p>
      <p className="text-base text-gray-500 mb-6">
        Sorry, we couldn&apos;t find the page you&apos;re looking for.
        <br />
        Вибачте, ми не змогли знайти цю сторінку.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-kidwise-blue text-white rounded-xl font-semibold hover:bg-kidwise-accent transition"
      >
        Go Home / На головну
      </Link>
    </main>
  );
}
