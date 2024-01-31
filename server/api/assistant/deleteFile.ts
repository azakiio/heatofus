import OpenAI from "openai";

export default defineEventHandler<{
  query: { assistant_id: string; file_id: string };
}>(async (event) => {
  const openai = new OpenAI();
  const { assistant_id, file_id } = getQuery(event);
  const deleted = await openai.beta.assistants.files.del(assistant_id, file_id);
  console.log(deleted);
});
