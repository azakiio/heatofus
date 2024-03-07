<script setup lang="ts">
import demo_video from "~/assets/demo_video.mp4";
import poster from "~/assets/demo_poster.png";
const playing = ref<boolean>(false);
const videoEl = ref<HTMLVideoElement>();

const togglePlay = () => {
  if (playing.value) {
    videoEl.value?.pause();
    playing.value = false;
  } else {
    videoEl.value?.play();
    playing.value = true;
  }
};
</script>

<template>
  <section
    id="demo"
    class="layout flex flex-col place-content-center w-full gap-4 max-w-7xl py-20 min-h-dvh"
  >
    <div
      class="relative grid place-items-center max-w-5xl border-2 rounded-lg overflow-hidden mx-auto"
    >
      <video
        ref="videoEl"
        :src="demo_video"
        :poster="poster"
        controls
      ></video>
      <button
        class="absolute z-10 inset-0 bottom-16"
        :class="{ 'bg-black/20': !playing, 'bg-transparent': playing }"
        @play="() => console.log('hello')"
        @click="togglePlay"
      >
        <Icon
          name="mdi:play"
          size="200"
          :class="{ 'opacity-0': playing }"
          class="transition-opacity text-primary"
        />
      </button>
    </div>
  </section>
</template>
