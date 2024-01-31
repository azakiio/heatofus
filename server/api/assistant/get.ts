import OpenAI from "openai";

export default defineEventHandler<{ query: { assistant_id: string } }>(
  async (event) => {
    const openai = new OpenAI();
    const { assistant_id } = getQuery(event);

    const assistant = await openai.beta.assistants.retrieve(assistant_id);

    return { assistant_id: assistant.id };
  }
);
