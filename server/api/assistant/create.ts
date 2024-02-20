import { serverSupabaseClient } from "#supabase/server";
import OpenAI from "openai";
import { Database } from "~/types/supabase";

export default defineEventHandler(async (event) => {
  const openai = new OpenAI();
  const body = await readBody(event);

  // TODO: Check if assistant count is below max
  const assistant = await openai.beta.assistants.create({
    name: body?.name || "Customer Support Bot",
    instructions:
      body?.instructions ||
      "You are a customer support chatbot. Use your knowledge base to best respond to customer queries.",
    model: body?.model || "gpt-4-turbo-preview",
    tools: [{ type: "retrieval" }],
    file_ids: body?.file_ids,
    metadata: {
      initialMessages: body?.initialMessages,
      suggestions: body?.suggestions,
    },
  });

  const client = await serverSupabaseClient<Database>(event);
  const { statusText } = await client.from("threads").insert({
    object_id: assistant.id,
    type: assistant.object,
    name: assistant.name,
    meta: {
      model: assistant.model,
      instructions: assistant?.instructions,
    },
  });
  console.log(statusText, assistant);

  return assistant;
});
