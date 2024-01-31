import OpenAI from "openai";

export default defineEventHandler(async (event) => {
  const openai = new OpenAI();
  const { thread_id, assistant_id, message } = await readBody(event);

  await openai.beta.threads.messages.create(thread_id, {
    role: "user",
    content: message,
  });

  const run = await openai.beta.threads.runs.create(thread_id, {
    assistant_id: assistant_id,
  });

  return { run_id: run.id };
});
