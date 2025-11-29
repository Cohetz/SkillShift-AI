import { chatFlow } from '@genkit-ai/flow';
import * as admin from 'firebase-admin';
const firestore = admin.firestore();

export const gerarPlano30 = chatFlow({
  name: 'gerar_plano_30',
  description: 'Cria um plano de 30 dias personalizado',
  async run({ diagnostic, userId }) {
    const prompt = `Gere um plano de 30 dias baseado em habilidades: ${diagnostic.skills} lacunas: ${diagnostic.gaps} estilo: ${diagnostic.learningStyle}`;
    const result = await this.llm.generate(prompt);
    let parsed: any;
    try { parsed = JSON.parse(result.text); } catch { parsed = { raw: result.text }; }

    await firestore.collection('plans').add({
      userId,
      plan: parsed,
      createdAt: Date.now(),
      updatedAt: Date.now()
    });
    return parsed;
  }
});
