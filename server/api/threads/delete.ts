import OpenAI from "openai";
import { serverSupabaseClient } from "#supabase/server";
import { Database } from "~/types/supabase";

export default defineEventHandler<{ query: { thread_id: string } }>(
  async (event) => {
    const openai = new OpenAI();
    const client = await serverSupabaseClient<Database>(event);
    const { thread_id } = getQuery(event);
    const thread = await openai.beta.threads.del(thread_id);
    const { statusText } = await client
      .from("threads")
      .delete()
      .eq("object_id", thread_id);
    console.log(statusText, thread);

    return { thread_id: thread.id };
  }
);
