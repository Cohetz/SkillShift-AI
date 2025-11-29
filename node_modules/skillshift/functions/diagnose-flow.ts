import { chatFlow } from '@genkit-ai/flow';

export const diagnoseFlowGenkit = chatFlow({
  name: 'diagnose_flow',
  description: 'Fluxo de diagnóstico de habilidades',
  async run({ answers }) {
    const prompt = `Analise respostas e retorne habilidades, gaps e estilo. Respostas: ${JSON.stringify(answers)}`;
    const result = await this.llm.generate(prompt);
    return { raw: result.text };
  }
});
