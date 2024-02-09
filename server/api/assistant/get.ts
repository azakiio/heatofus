import OpenAI from "openai";

export default defineEventHandler(async (event) => {
  const openai = new OpenAI();
  const { assistant_id } = getQuery(event);

  const assistant = await openai.beta.assistants.retrieve(
    assistant_id as string
  );

  return assistant;
});
