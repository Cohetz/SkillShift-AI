"use client";
import { useEffect, useState } from 'react';

export default function LogoutButton() {
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    let unsub: (() => void) | undefined;
    (async () => {
      const { getClientAuth } = await import('@/lib/firebase/config');
      const { onAuthStateChanged } = await import('firebase/auth');
      const auth = getClientAuth();
      unsub = onAuthStateChanged(auth, (user) => setSignedIn(!!user));
    })();
    return () => { if (unsub) unsub(); };
  }, []);

  if (!signedIn) return null;

  async function handleLogout() {
    try {
      await fetch('/api/auth/session', { method: 'DELETE' });
      const { getClientAuth, getClientApp } = await import('@/lib/firebase/config');
      const { getAuth, signOut } = await import('firebase/auth');
      // If getClientAuth throws for any reason, fallback to getAuth(getClientApp())
      try {
        await signOut(getClientAuth());
      } catch {
        await signOut(getAuth(getClientApp()));
      }
      if (typeof window !== 'undefined') window.location.href = '/login';
    } catch {
      // no-op
    }
  }

  return (
    <button onClick={handleLogout} className="text-sm text-red-600 hover:underline">Sign out</button>
  );
}
