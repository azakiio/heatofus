export const useInputs = () => {
  return useState<{
    assistant_id: string;
    instructions: string;
    model: string;
    file_ids?: string[];
  }>("user_inputs", () => ({
    assistant_id: "",
    instructions: "",
    model: "gpt-4-turbo-preview",
    file_ids: [],
  }));
};
