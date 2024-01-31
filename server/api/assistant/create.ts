import OpenAI from "openai";

export default defineEventHandler<{
  body: { instructions?: string; model?: string; file_ids: string[] };
}>(async (event) => {
  const openai = new OpenAI();
  const body = await readBody(event);

  const assistant = await openai.beta.assistants.create({
    name: "Customer Support",
    instructions:
      body?.instructions ||
      "You are a customer support chatbot. Use your knowledge base to best respond to customer queries.",
    model: body?.model || "gpt-4-turbo-preview",
    tools: [{ type: "retrieval" }],
    file_ids: body.file_ids,
  });

  return { assistant_id: assistant.id };
});
