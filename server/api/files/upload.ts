import OpenAI from "openai";
import { serverSupabaseClient } from "#supabase/server";
import { Database } from "~/types/supabase";

export default defineEventHandler(async (event) => {
  const openai = new OpenAI();
  const formData = await readFormData(event);
  const file = formData.get("file") as File;

  const fileOAI = await openai.files.create({
    file: file,
    purpose: "assistants",
  });
  const client = await serverSupabaseClient<Database>(event);

  const { statusText } = await client.from("threads").insert({
    object_id: fileOAI.id,
    type: fileOAI.object,
    meta: { name: fileOAI.filename },
  });

  return statusText;
});
