export async function refreshClaimsOnLogin() {
  try {
    const { getClientAuth } = await import('@/lib/firebase/config');
    const { onAuthStateChanged } = await import('firebase/auth');
    const auth = getClientAuth();
    return new Promise<void>((resolve) => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          await user.getIdToken(true);
        }
        resolve();
      });
    });
  } catch {
    return;
  }
}

export async function getTenantAndToken() {
  try {
    const { getClientAuth } = await import('@/lib/firebase/config');
    const { getIdToken, getIdTokenResult } = await import('firebase/auth');
    const auth = getClientAuth();
    const user = auth.currentUser;
    if (!user) return { token: null, tenantId: null };
    const token = await getIdToken(user);
    const claims = await getIdTokenResult(user);
    const tenantId = (claims.claims['tenantId'] as string) || null;
    return { token, tenantId };
  } catch {
    return { token: null, tenantId: null };
  }
}
