import OpenAI from "openai";

export default defineEventHandler<{ query: { file_id: string } }>(
  async (event) => {
    const openai = new OpenAI();
    const { file_id } = getQuery(event);
    const deleted = await openai.files.del(file_id);
    console.log(deleted);
  }
);
