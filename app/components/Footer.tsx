import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full flex flex-col items-center gap-3 py-4 bg-white/80 border-t text-xs text-gray-500">
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href={`/company-info`}
          prefetch={false}
          className="hover:underline"
        >
          Company Info
        </Link>
        <span>|</span>
        <Link
          href={`/public-offer`}
          prefetch={false}
          className="hover:underline"
        >
          Public Offer
        </Link>
        <span>|</span>
        <Link href={`/privacy`} prefetch={false} className="hover:underline">
          Privacy Policy
        </Link>
        <span>|</span>
        <Link href={`/terms`} prefetch={false} className="hover:underline">
          Terms of Service
        </Link>
      </div>
      <div className="text-center">
        <p>© {new Date().getFullYear()} Kid-Wise</p>
        <p className="mt-1">ФОП Степаненко Всеволод Віталійович</p>
        <p>Email: v.step2327@gmail.com | Phone: +380-664-484-251</p>
      </div>
    </footer>
  );
}
