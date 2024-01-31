import OpenAI from "openai";

export default defineEventHandler<{ query: { thread_id: string } }>(
  async (event) => {
    const openai = new OpenAI();
    const { thread_id } = getQuery(event);
    const messages = await openai.beta.threads.messages.list(thread_id, {
      order: "asc",
    });

    return messages.data
  }
);
