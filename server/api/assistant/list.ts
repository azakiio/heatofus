import OpenAI from "openai";

export default defineEventHandler(async (event) => {
  const openai = new OpenAI();

  const assistants = await openai.beta.assistants.list();
  return assistants.data;
});
