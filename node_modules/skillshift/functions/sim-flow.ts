import { chatFlow, memory } from '@genkit-ai/flow';
import * as admin from 'firebase-admin';
const firestore = admin.firestore();

export const atendimentoSim = chatFlow({
  name: 'simulador_atendimento',
  description: 'Simulador realista de atendimento ao cliente',
  memory,
  async run({ input, userId }) {
    const response = await this.llm.generate({
      system: `Você é um cliente irritado tentando resolver um problema. Avalie respostas (0-10) e forneça feedback.`,
      user: input
    });

    await firestore.collection('simulations').add({
      userId,
      simulatorType: 'atendimento',
      interaction: input,
      response: response.text,
      score: response.meta?.score,
      createdAt: Date.now(),
      updatedAt: Date.now()
    });

    return response.text;
  }
});
