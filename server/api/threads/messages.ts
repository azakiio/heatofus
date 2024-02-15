import OpenAI from "openai";

export default defineEventHandler(async (event) => {
  const openai = new OpenAI();
  const thread_id = getQuery(event).thread_id as string;
  const messages = await openai.beta.threads.messages.list(thread_id, {
    order: "asc",
  });

  const finalMessages = messages.data.map((message) => {
    let content = "";
    message.content.forEach(
      (contentItem) => (content += contentItem?.text?.value || "")
    );

    return { role: message.role, content: content };
  });

  return finalMessages;
});
