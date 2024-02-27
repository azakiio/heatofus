<script setup lang="ts">
const { label, name } = defineProps<{ label?: string; name?: string }>();
const checked = defineModel<boolean>({ required: true });
</script>

<template>
  <label class="cursor-pointer">
    {{ label }}
    <input :name="name" type="checkbox" class="hidden" v-model="checked" />
    <div
      :aria-checked="checked"
      class="bg-zinc-200 aria-checked:bg-primary flex h-7 w-12 rounded-full items-center p-1 toggle"
    >
      <span class="h-full w-1/2 block rounded-full bg-white" />
    </div>
  </label>
</template>

<style>
.toggle {
  transition: background-color 0.3s;
}

.toggle span {
  will-change: translate;
  transition: translate 0.3s;
}

.toggle[aria-checked="true"] span {
  translate: 100%;
}
</style>
