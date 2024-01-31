import OpenAI from "openai";

export default defineEventHandler(async (event) => {
  const openai = new OpenAI();
  const formData = await readFormData(event);
  const file = formData.get("file") as File;

  await openai.files.create({ file: file, purpose: "assistants" });
});
