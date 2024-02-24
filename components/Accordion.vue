<script setup lang="ts">
const panel = ref<HTMLDivElement>();

const toggleAccordion = () => {
  if (panel.value?.style.maxHeight) {
    panel.value.style.maxHeight = "";
  } else {
    if (panel.value) {
      panel.value.style.maxHeight = panel.value.scrollHeight + "px";
    }
  }
};
</script>

<template>
  <div class="flex flex-col">
    <button @click="toggleAccordion">
      <slot name="trigger"> Section 3 </slot>
    </button>
    <div class="panel" ref="panel">
      <slot></slot>
    </div>
  </div>
</template>

<style>
.accordion {
  background-color: #eee;
  color: #444;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  transition: 0.4s;
}

.panel {
  padding: 0 18px;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.2s;
}
</style>
