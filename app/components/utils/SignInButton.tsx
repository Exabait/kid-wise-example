'use client';

import Button from '../ui/Button';

export default function SignInButton({ text }: { text: string }) {
  const onSignIn = async () => {
    const result = await fetch('/api/auth/sign-in');
    const { url } = await result.json();
    if (url) {
      window.location.href = url;
    }
  };
  return <Button onClick={onSignIn}>{text}</Button>;
}
