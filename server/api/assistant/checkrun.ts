import OpenAI from "openai";

export default defineEventHandler(async (event) => {
  const openai = new OpenAI();
  const query = getQuery(event);
  const thread_id = query.thread_id as string;
  const run_id = query.run_id as string;
  const runSteps = await openai.beta.threads.runs.steps.list(thread_id, run_id);

  return { runStepData: runSteps.data };
});
