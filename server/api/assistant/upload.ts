import { serverSupabaseClient } from "#supabase/server";
import OpenAI from "openai";
import { Database } from "~/types/supabase";

export default eventHandler(async (event) => {
  const openai = new OpenAI();
  const formData = await readFormData(event);
  const assistant_id = formData.get("assistant_id")?.toString() || "";
  const file = formData.get("file") as File;

  const uploadedFile = await openai.files.create({
    file,
    purpose: "assistants",
  });
  console.log(uploadedFile);

  const result = await openai.beta.assistants.files.create(assistant_id, {
    file_id: uploadedFile.id,
  });

  const client = await serverSupabaseClient<Database>(event);
  const { statusText } = await client
    .from("threads")
    .insert({ object_id: uploadedFile.id, type: uploadedFile.object });

  console.log(statusText, result);
});
