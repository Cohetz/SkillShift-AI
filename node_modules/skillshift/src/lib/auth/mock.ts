// Deprecated mock auth. Left only to avoid breaking imports during transition.
export async function signIn() { throw new Error('mock auth removed'); }
export async function register() { throw new Error('mock auth removed'); }
export async function resetPassword() { throw new Error('mock auth removed'); }
export async function reset() { throw new Error('mock auth removed'); }
export async function refreshClaimsOnLogin() { return; }
export async function getTenantAndToken() { return { token: null, tenantId: null }; }
