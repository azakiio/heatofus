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
  <div>
    <button @click="toggleAccordion" class="accordion">Section 3</button>
    <div class="panel" ref="panel">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
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

.active,
.accordion:hover {
  background-color: #ccc;
}

.panel {
  padding: 0 18px;
  background-color: white;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.2s ease-out;
}
</style>
