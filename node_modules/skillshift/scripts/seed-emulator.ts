async function seed() {
  const base = 'http://localhost:9099/identitytoolkit.googleapis.com/v1';
  const apiKey = 'fake-api-key';
  const users = [
    { email: 'admin@empresa_a.com', password: 'Senha123!', tenantId: 'empresa_a' },
    { email: 'gestor@empresa_a.com', password: 'Senha123!', tenantId: 'empresa_a' },
    { email: 'user@empresa_b.com', password: 'Senha123!', tenantId: 'empresa_b' }
  ];

  for (const u of users) {
    const signUp = await fetch(`${base}/accounts:signUp?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: u.email, password: u.password, returnSecureToken: true })
    });
    const data = await signUp.json();
    if (!data.localId) {
      console.error('Erro ao criar usuário', data);
      continue;
    }
    const setClaims = await fetch(`http://localhost:9099/emulator/v1/projects/demo-project/accounts:update`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ localId: data.localId, customAttributes: JSON.stringify({ tenantId: u.tenantId }) })
    });
    console.log('Seeded', u.email, await setClaims.text());
  }
}

seed().catch(e => { console.error(e); process.exit(1); });
