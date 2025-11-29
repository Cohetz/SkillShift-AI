export async function signIn(identifier: string, password: string) {
  const { getAuth, signInWithEmailAndPassword } = await import('firebase/auth');
  const { getClientApp } = await import('@/lib/firebase/config');
  const auth = getAuth(getClientApp());
  const userCred = await signInWithEmailAndPassword(auth, identifier, password);
  try {
    const idToken = await userCred.user.getIdToken();
    await fetch('/api/auth/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken }),
    });
  } catch {
    // best-effort; API routes still accept Authorization header tokens
  }
  return userCred;
}

export async function register(email: string, password: string) {
  const { getAuth, createUserWithEmailAndPassword } = await import('firebase/auth');
  const { getClientApp } = await import('@/lib/firebase/config');
  const auth = getAuth(getClientApp());
  return createUserWithEmailAndPassword(auth, email, password);
}

export async function reset(email: string) {
  const { getAuth, sendPasswordResetEmail } = await import('firebase/auth');
  const { getClientApp } = await import('@/lib/firebase/config');
  const auth = getAuth(getClientApp());
  return sendPasswordResetEmail(auth, email);
}
