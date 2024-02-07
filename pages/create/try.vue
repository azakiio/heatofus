<script setup lang="ts">
const inputs = useInputs();

await useLazyAsyncData("chat", async () => {
  const files = await $fetch("/api/files/list");
  const { assistant_id } = await $fetch("/api/assistant/create", {
    method: "post",
    body: {
      model: inputs.value.model,
      instructions: inputs.value.instructions,
      file_ids: files?.map((file) => file.object_id),
    },
  });
  const { thread_id } = await $fetch("/api/threads/create");
  return navigateTo(`/dashboard/${assistant_id}/${thread_id}`);
});
</script>

<template>
  <div class="grid place-content-center gap-4 place-items-center">
    <h1 class="text-3xl font-bold">We are preparing your assistant...</h1>
    <Icon name="line-md:loading-alt-loop" class="text-7xl" />
    <div class="text-xl font-medium text-gray-700">
      (You will be redirected shortly)
    </div>
  </div>
</template>
