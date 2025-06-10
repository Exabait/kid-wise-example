'use client';

import { useEffect } from 'react';

export default function ScrollToHere({ id }: { id: string }) {
  useEffect(() => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  }, [id]);

  return null;
}
