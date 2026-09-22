<script setup>
import { ref } from "vue";
import QuestionCardContent from "../components/QuestionCardContent.vue";

const currentStep = ref(1);
const selectedCuisine = ref(null);
const selectedType = ref(null);
const emit = defineEmits(["finished"]);

function selectCuisine(cuisine) {
  selectedCuisine.value = cuisine;
  currentStep.value = 2;
}

function selectType(type) {
  selectedType.value = type;

  emit("finished", {
    cuisine: selectedCuisine.value,
    type: selectedType.value,
  });
}
</script>

<template>
  <div v-if="currentStep === 1">
    <h1>Cuisine?</h1>

    <div class="card-container">
      <QuestionCardContent
        title="String"
        image="String"
        description="String"
        @select="selectCuisine(String)"
      />
    </div>
  </div>

  <div v-if="currentStep === 2">
    <h1>Meat or Vegetarian?</h1>

    <div class="card-container">
      <QuestionCardContent
        title="String"
        image="String"
        description="String"
        @select="selectType(String)"
      />
    </div>
  </div>
</template>
