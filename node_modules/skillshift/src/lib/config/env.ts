export function isMockMode() {
  const flag = process.env.NEXT_PUBLIC_USE_MOCK ?? process.env.USE_MOCK;
  if (typeof flag === 'string') {
    return flag.toLowerCase() === 'true';
  }
  // Fallback: if Firebase keys are missing, stay in mock
  const hasFirebase = Boolean(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);
  return !hasFirebase;
}
