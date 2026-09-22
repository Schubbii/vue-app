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
        title="Italian Cuisine"
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRdDvE0dZY8P2bWSHV8kYN6KE__Bfc1XALG2YEoTnpHg&s=10"
        description="Pasta, pizza and gelato!"
        @select="selectCuisine('Italian Cuisine')"
      />
    </div>
     <div class="card-container">
      <QuestionCardContent
        title="Asian Cuisine"
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVi-V8SMJfM4mBfnAXyL9HVfvvV8gtY0hjqgCoF1bamw&s=10"
        description="Rice, noodles and spices!"
        @select="selectCuisine('Asian Cuisine')"
      />
    </div>
  </div>

  <div v-if="currentStep === 2">
    <h1>Meat or Vegetarian?</h1>

    <div class="card-container">
      <QuestionCardContent
        title="Meat"
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUtStFf1-fHsTkuHuE8yo2TTbXwSrrh6f27KaeFQ9qVw&s=10"
        description="Meat, stakes and sausages!"
        @select="selectType('Meat')"
      />
    </div>
    <div class="card-container">
      <QuestionCardContent
        title="Vegetarian"
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStZNPUP3lDmlKsX2RYalOuFgD5f4_UVMYP5NECj3kRbQ&s=10"
        description="Fresh vegetables and plant-based proteins!"
        @select="selectType('Vegetarian')"
      />
    </div>
  </div>
</template>
