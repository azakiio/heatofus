import { serverSupabaseClient } from "#supabase/server";
import OpenAI from "openai";
import { Database } from "~/types/supabase";

export default defineEventHandler(async (event) => {
  const openai = new OpenAI();
  const formData = await readFormData(event);
  const file = formData.get("file") as File;
  const assistant_id = formData.get("assistant_id")?.toString();

  const fileUpload = await openai.files.create({
    file: file,
    purpose: "assistants",
  });
  
  if (assistant_id) {
    const assistant_file = await openai.beta.assistants.files.create(
      assistant_id,
      {
        file_id: fileUpload.id,
      }
    );

    openai.files.del(assistant_file.id);
  }

  const client = await serverSupabaseClient<Database>(event);

  const { statusText } = await client.from("threads").insert({
    object_id: fileUpload.id,
    type: fileUpload.object,
    name: fileUpload.filename,
    assistant_id,
  });

  return { statusText };
});
