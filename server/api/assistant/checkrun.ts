import { serverSupabaseServiceRole } from "#supabase/server";
import OpenAI from "openai";
import { Database } from "~/types/supabase";

export default defineEventHandler(async (event) => {
  const openai = new OpenAI();
  const query = getQuery(event);
  const assistant_id = query.assistant_id as string;
  const thread_id = query.thread_id as string;
  const run_id = query.run_id as string;
  const run = await openai.beta.threads.runs.retrieve(thread_id, run_id);

  if (run.usage) {
    const client = serverSupabaseServiceRole<Database>(event);
    let input;
    let output;

    if (run.model === "gpt-4-turbo-preview") {
      console.log(
        run.model,
        "gpt-4 used",
        run.usage.prompt_tokens,
        run.usage.completion_tokens
      );
      input = run.usage.prompt_tokens;
      output = run.usage.completion_tokens;
    } else {
      console.log(run.model, "gpt-3 used", run.usage.total_tokens);
      input = Math.round(run.usage.prompt_tokens / 20);
      output = Math.round(run.usage.completion_tokens / 20);
    }
    const { data, error } = await client.rpc("increment_usage", {
      input,
      output,
      assistant: assistant_id,
    });

    console.log(data, error);
  }

  return { runStepData: run };
});
