import OpenAI from "openai";

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

  console.log(result);
});
