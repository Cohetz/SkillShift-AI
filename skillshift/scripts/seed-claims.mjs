// Usage:
//   node scripts/seed-claims.mjs --uid <FIREBASE_UID> --tenant <TENANT_ID> --role <ROLE>
// Requires FIREBASE_ADMIN_PROJECT_ID, FIREBASE_ADMIN_CLIENT_EMAIL, FIREBASE_ADMIN_PRIVATE_KEY in env.

import * as admin from 'firebase-admin';

function initAdmin() {
  if (admin.apps.length) return;
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

function parseArgs() {
  const args = process.argv.slice(2);
  const out = {};
  for (let i = 0; i < args.length; i += 2) {
    const k = args[i];
    const v = args[i + 1];
    if (!v) continue;
    if (k === '--uid') out.uid = v;
    if (k === '--tenant') out.tenant = v;
    if (k === '--role') out.role = v;
  }
  return out;
}

async function main() {
  const { uid, tenant, role } = parseArgs();
  if (!uid || !tenant) {
    console.error('Missing required args: --uid and --tenant');
    process.exit(1);
  }
  initAdmin();
  const auth = admin.auth();
  const existing = (await auth.getUser(uid)).customClaims || {};
  const claims = { ...existing, tenantId: tenant };
  if (role) claims.role = role;
  await auth.setCustomUserClaims(uid, claims);
  console.log('Custom claims set for', uid, claims);
}

main().catch((e) => { console.error(e); process.exit(1); });
