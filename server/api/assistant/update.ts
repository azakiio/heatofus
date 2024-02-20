import { serverSupabaseClient } from "#supabase/server";
import OpenAI from "openai";
import { Database } from "~/types/supabase";

export default defineEventHandler(async (event) => {
  const openai = new OpenAI();
  const formData = await readFormData(event);
  const assistant_id = formData.get("assistant_id") as string;
  const name = formData.get("name") as string;
  const instructions = formData.get("instructions") as string;
  const model = formData.get("model") as string;
  const initialMessages = formData.get("initialMessages") as string;
  const suggestions = formData.get("suggestions") as string;

  const assistant = await openai.beta.assistants.update(assistant_id, {
    name: name,
    instructions: instructions,
    model: model,
    metadata: {
      initialMessages: initialMessages,
      suggestions: suggestions,
    },
  });

  console.log(assistant);

  const client = await serverSupabaseClient<Database>(event);
  const { statusText } = await client.from("threads").upsert({
    object_id: assistant.id,
    type: assistant.object,
    name: assistant.name,
    meta: {
      model: assistant.model,
      instructions: assistant?.instructions,
      file_ids: assistant?.file_ids,
    },
  });
  console.log(statusText, assistant);

  return { assistant_id: assistant.id };
});
