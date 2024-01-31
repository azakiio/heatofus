import OpenAI from "openai";

export default defineEventHandler(async (event) => {
  const openai = new OpenAI();
  const query = getQuery(event);
  const assistant_id = query.assistant_id as string;
  const deleted = await openai.beta.assistants.del(assistant_id);
  console.log(deleted);
});
