'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { use, useEffect, useState } from 'react';

import { Language } from '@/src/entities/Languages';

import { getUser } from '../actions';
import { translations } from '../i18n/translations';

interface UserHeaderMenuProps {
  lang: Language;
}

export default function UserHeaderMenu({ lang }: UserHeaderMenuProps) {
  const searchParams = useSearchParams();

  const [user, setUser] = useState<{
    name: string;
    email?: string;
    avatarUrl?: string;
  } | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const onSignIn = async () => {
    const result = await fetch('/api/auth/sign-in');
    const { url } = await result.json();
    if (url) {
      window.location.href = url;
    }
  };

  const onSignOut = async () => {
    await fetch('/api/auth/sign-out', { method: 'POST' });
    window.location.replace(new URL('/', window.location.origin));
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownOpen &&
      !(event.target as HTMLElement).closest('.dropdown-menu')
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const result = await fetch('/api/user/current');
      const { data } = await result.json();

      if (data) {
        setUser(data);
      }
    };
    if (!searchParams.get('fromAuth')) {
      fetchUser();
    }
  }, []);

  useEffect(() => {
    if (searchParams.get('fromAuth')) {
      const handleNewUser = async () => {
        const waitForUser = new Promise(resolve => {
          setTimeout(() => {
            resolve(true);
          }, 500);
        });

        const result = await getUser();
        if (!result.data) {
          await waitForUser;
          window.location.replace('/settings');
        } else {
          setUser(result.data);
        }
      };
      handleNewUser();
    }
  }, [searchParams]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <div className="relative">
      <button
        className="w-8 h-8 rounded-full overflow-hidden border border-gray-300 focus:outline-none"
        onClick={() => setDropdownOpen(open => !open)}
      >
        {user && user.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt="avatar"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="12" fill="#e5e7eb" />
              <path d="M12 12a5 5 0 100-10 5 5 0 000 10z" fill="#9ca3af" />
              <path
                d="M12 14c-4 0-6 2-6 4v2h12v-2c0-2-2-4-6-4z"
                fill="#9ca3af"
              />
            </svg>
          </div>
        )}
      </button>
      {dropdownOpen && (
        <ul className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10">
          <li>
            <Link href="/settings">
              <button
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                onClick={() => {
                  setDropdownOpen(false);
                }}
              >
                {translations[lang].settings}
              </button>
            </Link>
          </li>
          <li>
            <button
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              onClick={user ? onSignOut : onSignIn}
            >
              {user ? translations[lang].signOut : translations[lang].signIn}
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
