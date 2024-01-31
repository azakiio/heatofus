import OpenAI from "openai";

export default defineEventHandler(async (event) => {
  const openai = new OpenAI();
  const files = await openai.files.list();
  return files;
});
