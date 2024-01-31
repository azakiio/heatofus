<script setup lang="ts">
const { data: files, refresh: refreshFiles } = await useFetch(
  "/api/files/list"
);

useSeoMeta({
  title: "Halbelf | Custom ChatGPT for your data",
  description:
    "Build an AI chatbot from your knowledge base and add it to your website",
});

const deleteFile = async (file_id: string) => {
  await $fetch("/api/files/delete", {
    query: {
      file_id,
    },
  });
  refreshFiles();
};

const dragOver = ref(false);

function handleFiles(files: FileList) {
  [...files].forEach(uploadFile);
}

function uploadFile(file: File) {
  let formData = new FormData();

  formData.append("file", file);

  $fetch("/api/files/upload", {
    method: "POST",
    body: formData,
  })
    .then(() => {
      refreshFiles();
    })
    .catch(() => {
      /* Error. Inform the user */
    });
}

function handleDrop(e: DragEvent) {
  dragOver.value = false;
  e.preventDefault();
  e.stopPropagation();
  let files = e.dataTransfer?.files;
  if (files) {
    handleFiles(files);
  }
}

const steps = [
  "Upload your files",
  "Customize behavior & appearance",
  "Embed on your website",
];
</script>

<template>
  <main class="grid p-8 place-content-center pb-20 min-h-screen">
    <h1 class="text-6xl text-center font-bold text-green-500 mb-12">Halbelf</h1>
    <div class="grid md:grid-cols-2 max-w-5xl mb-20 gap-24 w-full">
      <div>
        <h2 class="text-5xl font-bold mb-8">Custom ChatGPT for your website</h2>
        <p class="text-lg font-medium text-black/75 mb-4">
          Build a custom GPT, embed it on your website and let it handle
          customer support, lead generation, engage with your users, and more.
        </p>
        <UButton to="#try-now" size="xl">Try Now!</UButton>
      </div>
      <div>
        <div class="mb-4 font-medium text-xl text-green-500">
          Three easy steps
        </div>

        <div class="grid grid-rows-[auto,auto,auto] gap-8">
          <div
            v-for="(step, i) in steps"
            class="flex items-center gap-2 font-bold"
          >
            <div
              class="bg-green-500 w-10 h-10 p-2 rounded-full grid place-items-center text-white"
            >
              {{ i + 1 }}
            </div>
            <span>{{ step }}</span>
          </div>
        </div>
      </div>
    </div>
  </main>

  <main id="try-now" class="grid p-8 place-content-center pb-20 h-screen">
    <div class="font-bold text-center text-4xl mb-8">
      {{ steps[0] }}
    </div>

    <label
      for="fileElem"
      id="drop-area"
      class="cursor-pointer hover:bg-slate-200 mb-8"
      :class="{ 'bg-red-400': dragOver }"
      @dragenter.prevent.stop="dragOver = true"
      @dragover.prevent.stop="dragOver = true"
      @dragleave.prevent.stop="dragOver = false"
      @drop="handleDrop"
    >
      <form class="grid place-items-center mb-10">
        <UIcon name="i-mdi-tray-upload" class="w-20 h-20" />
        <div class="font-medium text-lg">Drop Files here</div>
        <input
          type="file"
          id="fileElem"
          multiple
          @input="(e) => handleFiles(e.currentTarget.files)"
        />
      </form>
      <div class="flex flex-col gap-2">
        <div v-for="file in files?.data" class="grid grid-cols-[auto,2rem]">
          <b>
            {{ file.filename }}
          </b>
          <UButton
            color="red"
            @click="() => deleteFile(file.id)"
            icon="i-mdi-delete"
          />
        </div>
      </div>
    </label>

    <UButton
      v-if="files?.data.length && files?.data.length > 0"
      size="xl"
      class="place-self-center"
      to="/2"
      >Next</UButton
    >
  </main>
</template>

<style scoped>
main {
  font-family: "Satoshi";
}

#drop-area {
  @apply border-2 border-dashed border-green-500 mx-auto;
  border-radius: 20px;
  width: 480px;
  font-family: sans-serif;
  padding: 20px;
}
.button {
  display: inline-block;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: 1px solid #ccc;
}
.button:hover {
  background: #ddd;
}

#fileElem {
  display: none;
}
</style>
