<script setup>
import BuildingBlockCard from "./BuildingBlockCard.vue";

defineProps({
  title: String,
  image: String,
  description: String,
});

const emit = defineEmits(["select"]);
</script>

<template>
  <div @click="emit('select')">
    <BuildingBlockCard>
      <template #image>
        <img :src="image" :alt="title" />
      </template>

      <template #title>
        {{ title }}
      </template>

      <p>
        {{ description }}
      </p>
    </BuildingBlockCard>
  </div>
</template>
