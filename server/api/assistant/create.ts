import { serverSupabaseClient } from "#supabase/server";
import OpenAI from "openai";
import { Database } from "~/types/supabase";

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
    file_ids: body?.file_ids,
  });

  const client = await serverSupabaseClient<Database>(event);
  const { statusText } = await client.from("threads").insert({
    object_id: assistant.id,
    type: assistant.object,
    meta: {
      name: assistant.name,
      model: assistant.model,
      instructions: assistant?.instructions,
      file_ids: assistant?.file_ids,
    },
  });
  console.log(statusText, assistant);

  return { assistant_id: assistant.id };
});
