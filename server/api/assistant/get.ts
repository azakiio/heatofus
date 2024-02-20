import OpenAI from "openai";

export default defineEventHandler(async (event) => {
  const openai = new OpenAI();
  const { assistant_id } = getQuery(event);

  try {
    const assistant = await openai.beta.assistants.retrieve(
      assistant_id as string
    );

    return {
      ...assistant,
      suggestions: (assistant.metadata as any)?.suggestions as
        | string
        | undefined,
      initialMessages: (assistant.metadata as any)?.initialMessages as
        | string
        | undefined,
    };
  } catch (err) {
  }
});
