export const useInputs = () => {
  return useState<{
    instructions: string;
    model: string;
    file_ids?: string[];
  }>("user_inputs", () => ({
    instructions: "",
    model: "gpt-4-turbo-preview",
    file_ids: [],
  }));
};
