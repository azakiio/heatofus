<script setup lang="ts">
const { assistant_id } = useRoute().params;

const { data: files, refresh: refreshFiles } = await useLazyFetch(
  "/api/files/list",
  {
    query: {
      assistant_id,
    },
  }
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
      assistant_id,
      file_id,
    },
  });
  refreshFiles();
};

const dragOver = ref(false);

async function handleFiles(files: FileList) {
  [...files].forEach((file) => uploadFile(file));
}

function uploadFile(file: File) {
  let formData = new FormData();
  formData.append("file", file);
  formData.append("assistant_id", assistant_id as string);

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
  <section>
    <div class="font-bold text-3xl mb-4">Assistant Files</div>
    <label
      for="fileElem"
      class="cursor-pointer w-full border-2 border-dashed border-primary mx-auto p-6 rounded-lg grid"
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
        <div v-for="file in files" class="grid grid-cols-[1fr_2rem] gap-4">
          <div
            class="font-medium font-italic whitespace-nowrap overflow-hidden overflow-ellipsis"
          >
            {{ file.name }}
          </div>
          <button
            class="btn variant-red p-2 rounded-full justify-self-end text-lg"
            @click="() => deleteFile(file.object_id || '')"
          >
            <div class="i-mdi-delete"></div>
          </button>
        </div>
      </div>
    </label>
  </section>
</template>
