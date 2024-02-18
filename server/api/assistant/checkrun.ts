import { serverSupabaseClient, serverSupabaseServiceRole } from "#supabase/server";
import OpenAI from "openai";
import { Database } from "~/types/supabase";

export default defineEventHandler(async (event) => {
  const openai = new OpenAI();
  const query = getQuery(event);
  const assistant_id = query.assistant_id as string;
  const thread_id = query.thread_id as string;
  const run_id = query.run_id as string;
  const runSteps = await openai.beta.threads.runs.steps.list(thread_id, run_id);

  runSteps.data.forEach(async (item) => {
    if (item.usage) {
      const client = serverSupabaseServiceRole<Database>(event);
      const { data, error } = await client.rpc("increment_usage", {
        x: item.usage.total_tokens,
        assistant: assistant_id,
      });

      console.log(data, error);
    }
  });

  return { runStepData: runSteps.data };
});
