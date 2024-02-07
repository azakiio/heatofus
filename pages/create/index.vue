<script setup lang="ts">
const { data: files, refresh: refreshFiles } = await useFetch(
  "/api/files/list"
);

function handleDrop(e: DragEvent) {
  dragOver.value = false;
  e.preventDefault();
  e.stopPropagation();
  let files = e.dataTransfer?.files;
  if (files) {
    handleFiles(files);
  }
}

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
</script>

<template>
  <section id="try-now" class="layout w-full max-w-xl h-90vh content-center">
    <div class="font-bold text-center text-4xl mb-8">Upload your files</div>

    <label
      for="fileElem"
      id="drop-area"
      class="cursor-pointer mb-8 w-full border-2 border-dashed mx-auto p-6 rounded-lg"
      :class="{ 'bg-red-400': dragOver }"
      @dragenter.prevent.stop="dragOver = true"
      @dragover.prevent.stop="dragOver = true"
      @dragleave.prevent.stop="dragOver = false"
      @drop="handleDrop"
    >
      <form class="grid place-items-center mb-10">
        <div class="i-mdi-tray-upload w-20 h-20 c-green" />
        <div class="font-bold text-lg">Drop Files here</div>
        <input
          type="file"
          class="hidden"
          id="fileElem"
          multiple
          @input="(e) => handleFiles(e.currentTarget?.files)"
        />
      </form>
      <div class="grid gap-2">
        <div v-for="file in files" class="grid grid-cols-[1fr_2rem]">
          <div
            class="font-medium font-italic whitespace-nowrap overflow-hidden overflow-ellipsis"
          >
            {{ file.name || file.object_id }}
          </div>
          <button
            class="btn-red p-2 rounded-full justify-self-end text-lg"
            @click="() => deleteFile(file.object_id || '')"
          >
            <div class="i-mdi-delete"></div>
          </button>
        </div>
      </div>
    </label>

    <NuxtLink
      v-if="files?.length && files?.length > 0"
      size="xl"
      class="btn btn-green place-self-center"
      to="/create/2"
    >
      Next
    </NuxtLink>
  </section>
</template>
